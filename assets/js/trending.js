// DS4CABS — trending.js
// Fetches "hot" GitHub repositories relevant to pharma & biology from the
// public GitHub Search API (no auth, no backend — works on GitHub Pages).
//
// GitHub has no official "trending" endpoint, so we approximate it: repos
// CREATED inside the selected time window, sorted by stars descending. That
// surfaces genuinely new-and-rising projects rather than long-established ones.
// Results are cached in sessionStorage for 30 min to stay under the
// unauthenticated rate limit (60 requests/hour/IP).

(function () {
  const mount   = document.getElementById("trendingCards");
  if (!mount) return;
  const statusEl = document.getElementById("trendingStatus");
  const topicsEl = document.getElementById("trendingTopics");
  const windowEl = document.getElementById("trendingWindow");
  const updatedEl = document.getElementById("trendingUpdated");

  // ---------- tiny DOM helper (mirrors main.js) ----------
  function el(tag, attrs, ...kids) {
    const node = document.createElement(tag);
    if (attrs) {
      for (const [k, v] of Object.entries(attrs)) {
        if (v == null || v === false) continue;
        if (k === "class") node.className = v;
        else if (k === "html") node.innerHTML = v;
        else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2), v);
        else node.setAttribute(k, v === true ? "" : String(v));
      }
    }
    for (const c of kids.flat(Infinity)) {
      if (c == null || c === false || c === true) continue;
      node.appendChild(c instanceof Node ? c : document.createTextNode(String(c)));
    }
    return node;
  }
  const pill = (text, title) => el("span", { class: "pill", title: title || null }, text);
  const fmt  = (n) => (n >= 1000 ? (n / 1000).toFixed(n >= 10000 ? 0 : 1) + "k" : String(n));

  // ---------- categories ----------
  // Each maps to a GitHub search qualifier. "all" uses a broad keyword OR query;
  // the rest use precise topic: qualifiers.
  const TOPICS = [
    // GitHub Search caps boolean queries at 5 OR operators and applies OR to
    // text only (not topic: qualifiers), so "all" is an unquoted 6-term keyword OR.
    { id: "all",          label: "🔥 All bio + pharma",
      q: "bioinformatics OR genomics OR drug-discovery OR pharma OR proteomics OR cheminformatics" },
    { id: "bioinformatics",       label: "🧬 Bioinformatics",        q: "topic:bioinformatics" },
    { id: "drug-discovery",       label: "💊 Drug discovery",        q: "topic:drug-discovery" },
    { id: "genomics",             label: "🧪 Genomics",              q: "topic:genomics" },
    { id: "computational-biology",label: "🔬 Computational biology", q: "topic:computational-biology" },
    { id: "cheminformatics",      label: "⚗️ Cheminformatics",       q: "topic:cheminformatics" },
    { id: "single-cell",          label: "🦠 Single cell",           q: "topic:single-cell" },
  ];

  const WINDOWS = [
    { id: "7",   label: "This week" },
    { id: "30",  label: "This month" },
    { id: "90",  label: "Last 90 days" },
    { id: "365", label: "This year" },
  ];

  let activeTopic  = TOPICS[0];
  let activeWindow = WINDOWS[1]; // default: this month

  // ---------- date math ----------
  function sinceDate(days) {
    const d = new Date();
    d.setDate(d.getDate() - Number(days));
    return d.toISOString().slice(0, 10); // YYYY-MM-DD
  }

  function buildUrl() {
    const q = `${activeTopic.q} created:>=${sinceDate(activeWindow.id)}`;
    const params = new URLSearchParams({
      q,
      sort: "stars",
      order: "desc",
      per_page: "30",
    });
    return "https://api.github.com/search/repositories?" + params.toString();
  }

  // ---------- render controls ----------
  function renderControls() {
    if (topicsEl) {
      topicsEl.replaceChildren();
      TOPICS.forEach(t => {
        const active = t.id === activeTopic.id;
        topicsEl.appendChild(el("button", {
          class: "filter-pill" + (active ? " is-active" : ""),
          type: "button",
          "aria-pressed": active ? "true" : "false",
          onclick: () => { if (activeTopic.id !== t.id) { activeTopic = t; renderControls(); load(); } }
        }, t.label));
      });
    }
    if (windowEl) {
      windowEl.replaceChildren();
      WINDOWS.forEach(w => {
        const active = w.id === activeWindow.id;
        windowEl.appendChild(el("button", {
          class: "filter-pill" + (active ? " is-active" : ""),
          type: "button",
          "aria-pressed": active ? "true" : "false",
          onclick: () => { if (activeWindow.id !== w.id) { activeWindow = w; renderControls(); load(); } }
        }, w.label));
      });
    }
  }

  // ---------- render cards ----------
  function repoCard(r) {
    const topics = (r.topics || []).slice(0, 4);
    return el("article", { class: "card" },
      el("div", { class: "card-head" },
        el("h3", { class: "card-title" },
          el("a", { href: r.html_url, target: "_blank", rel: "noopener" }, r.full_name)
        ),
        r.language && el("span", { class: "card-lang" }, r.language)
      ),
      el("p", null, r.description || "No description provided."),
      topics.length > 0 && el("div", { class: "person-tags" },
        topics.map(t => el("span", { class: "person-tag" }, t))
      ),
      el("div", { class: "card-meta" },
        pill("★ " + fmt(r.stargazers_count), r.stargazers_count + " stars"),
        r.forks_count > 0 && pill("⑂ " + fmt(r.forks_count), r.forks_count + " forks"),
        el("a", { class: "link-arrow", href: r.html_url, target: "_blank", rel: "noopener" }, "View →")
      )
    );
  }

  function setStatus(msg, isError) {
    if (!statusEl) return;
    statusEl.hidden = !msg;
    statusEl.textContent = msg || "";
    statusEl.classList.toggle("is-error", !!isError);
  }

  // ---------- pre-built snapshot (assets/data/trending.json) ----------
  // Refreshed every few hours by a GitHub Action so visitors don't hit the
  // public 60 req/hr limit. Loaded once and reused across filter changes.
  let snapshotPromise = null;
  function loadSnapshot() {
    if (!snapshotPromise) {
      snapshotPromise = fetch("assets/data/trending.json", { cache: "no-cache" })
        .then(r => (r.ok ? r.json() : null))
        .catch(() => null);
    }
    return snapshotPromise;
  }

  // ---------- fetch (snapshot first, then live API with 30-min cache) ----------
  async function load() {
    const url = buildUrl();
    const cacheKey = "ds4cabs-trending:" + url;
    const setKey = activeTopic.id + "|" + activeWindow.id;
    mount.replaceChildren();
    setStatus("Loading hot repositories from GitHub…", false);
    if (updatedEl) updatedEl.textContent = "";

    // 1) prefer the pre-built snapshot
    const snap = await loadSnapshot();
    if (snap && snap.sets && Array.isArray(snap.sets[setKey])) {
      const when = snap.generated ? new Date(snap.generated) : new Date();
      return render(snap.sets[setKey], when, false, "snapshot");
    }

    // 2) serve a recent live result from cache if fresh (< 30 min)
    try {
      const cached = JSON.parse(sessionStorage.getItem(cacheKey) || "null");
      if (cached && (Date.now() - cached.t) < 30 * 60 * 1000) {
        return render(cached.items, new Date(cached.t), true);
      }
    } catch (_) { /* ignore bad cache */ }

    // 3) fall back to the live GitHub Search API
    try {
      const res = await fetch(url, { headers: { Accept: "application/vnd.github+json" } });
      if (res.status === 403 || res.status === 429) {
        setStatus("GitHub's hourly request limit was reached (the public API allows 60/hour). Please try again in a little while.", true);
        return;
      }
      if (!res.ok) {
        setStatus("Could not load repositories from GitHub (HTTP " + res.status + "). Please try again later.", true);
        return;
      }
      const data = await res.json();
      const items = data.items || [];
      try { sessionStorage.setItem(cacheKey, JSON.stringify({ t: Date.now(), items })); } catch (_) {}
      render(items, new Date(), false);
    } catch (err) {
      setStatus("Network error while contacting GitHub. Check your connection and try again.", true);
    }
  }

  function render(items, when, fromCache, source) {
    mount.replaceChildren();
    if (!items.length) {
      setStatus("No repositories found for this filter in the selected time window.", false);
      return;
    }
    setStatus("", false);
    items.forEach(r => mount.appendChild(repoCard(r)));
    if (updatedEl) {
      const t = when.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
      const note = source === "snapshot" ? " (snapshot)" : (fromCache ? " (cached)" : " (live)");
      updatedEl.textContent = "Showing " + items.length + " repositories · updated " + t + note;
    }
  }

  renderControls();
  load();
})();
