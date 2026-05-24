// DS4CABS — main.js
// Renders featured / intern / project cards from window.DS4CABS_PROJECTS
// and powers search + category filtering.

(function () {
  const data = window.DS4CABS_PROJECTS || { featured: [], interns: [], all: [], filters: [] };

  // ---------- helpers ----------
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const el = (tag, attrs = {}, ...children) => {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") node.className = v;
      else if (k === "html") node.innerHTML = v;
      else if (k.startsWith("on")) node.addEventListener(k.slice(2), v);
      else node.setAttribute(k, v);
    }
    for (const c of children.flat()) {
      if (c == null || c === false) continue;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    }
    return node;
  };

  const star = (n) => n ? el("span", { class: "pill", title: `${n} stars` },
    el("span", { html: "★" }), ` ${n}`) : null;

  // ---------- featured cards ----------
  const featuredEl = $("#featuredCards");
  if (featuredEl) {
    data.featured.forEach(p => {
      featuredEl.appendChild(
        el("article", { class: "card" },
          p.tag ? el("span", { class: "card-tag" }, p.tag) : null,
          el("div", { class: "card-head" },
            el("h3", { class: "card-title" },
              el("a", { href: p.url, target: "_blank", rel: "noopener" }, p.name)
            ),
            p.lang ? el("span", { class: "card-lang" }, p.lang) : null
          ),
          el("p", {}, p.desc || ""),
          el("div", { class: "card-meta" },
            star(p.stars),
            p.forks ? el("span", { class: "pill", title: `${p.forks} forks` }, `⑂ ${p.forks}`) : null,
            el("a", { class: "link-arrow", href: p.url, target: "_blank", rel: "noopener" }, "View →")
          )
        )
      );
    });
  }

  // ---------- intern cards ----------
  const internEl = $("#internCards");
  if (internEl) {
    data.interns.forEach(p => {
      internEl.appendChild(
        el("article", { class: "card" },
          el("span", { class: "card-tag" }, "2026 Cohort"),
          el("div", { class: "card-head" },
            el("h3", { class: "card-title" },
              el("a", { href: p.url, target: "_blank", rel: "noopener" }, p.name)
            )
          ),
          el("p", {}, p.desc || ""),
          el("div", { class: "card-author" }, `👤 ${p.author}`)
        )
      );
    });
  }

  // ---------- filters + cards ----------
  const filtersEl = $("#filters");
  const cardsEl   = $("#projectCards");
  const emptyEl   = $("#emptyState");
  const searchEl  = $("#searchInput");

  let activeFilter = "all";
  let activeQuery  = "";

  function renderFilters() {
    if (!filtersEl) return;
    filtersEl.innerHTML = "";
    data.filters.forEach(f => {
      const count = f.id === "all" ? data.all.length : data.all.filter(p => p.cat === f.id).length;
      const btn = el("button", {
        class: "filter-pill" + (f.id === activeFilter ? " active" : ""),
        type: "button",
        onclick: () => { activeFilter = f.id; renderFilters(); renderCards(); }
      }, `${f.label} `, el("span", { html: `<span style="opacity:.6">·${count}</span>` }));
      filtersEl.appendChild(btn);
    });
  }

  function renderCards() {
    if (!cardsEl) return;
    cardsEl.innerHTML = "";

    const q = activeQuery.trim().toLowerCase();
    const list = data.all.filter(p => {
      if (activeFilter !== "all" && p.cat !== activeFilter) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        (p.desc || "").toLowerCase().includes(q) ||
        (p.lang || "").toLowerCase().includes(q) ||
        (p.cat || "").toLowerCase().includes(q)
      );
    });

    emptyEl.hidden = list.length !== 0;

    list.forEach(p => {
      cardsEl.appendChild(
        el("article", { class: "card" },
          el("div", { class: "card-head" },
            el("h3", { class: "card-title" },
              el("a", { href: p.url, target: "_blank", rel: "noopener" }, p.name)
            ),
            p.lang ? el("span", { class: "card-lang" }, p.lang) : null
          ),
          el("p", {}, p.desc || ""),
          el("div", { class: "card-meta" },
            star(p.stars),
            el("span", { class: "pill" }, catLabel(p.cat)),
            el("a", { class: "link-arrow", href: p.url, target: "_blank", rel: "noopener" }, "Open →")
          )
        )
      );
    });
  }

  function catLabel(id) {
    const f = data.filters.find(x => x.id === id);
    return f ? f.label : id;
  }

  if (searchEl) {
    searchEl.addEventListener("input", (e) => {
      activeQuery = e.target.value;
      renderCards();
    });
  }

  renderFilters();
  renderCards();

  // ---------- stat: total repos ----------
  const statRepos = $("#statRepos");
  if (statRepos) {
    statRepos.textContent = `${data.all.length}+`;
  }

  // ---------- theme toggle ----------
  const root = document.documentElement;
  const themeBtn = $("#themeToggle");
  const stored = localStorage.getItem("ds4cabs-theme");
  if (stored) root.setAttribute("data-theme", stored);
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const cur = root.getAttribute("data-theme") === "light" ? "" : "light";
      if (cur) root.setAttribute("data-theme", "light");
      else root.removeAttribute("data-theme");
      localStorage.setItem("ds4cabs-theme", cur);
    });
  }

  // ---------- footer year ----------
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
