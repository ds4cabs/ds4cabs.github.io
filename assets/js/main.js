// DS4CABS — main.js
// Renders featured / intern / project cards from window.DS4CABS_PROJECTS,
// powers search + category filtering, mobile nav, and theme toggle.

(function () {
  const data = window.DS4CABS_PROJECTS || { featured: [], interns: [], all: [], filters: [] };

  // ---------- helpers ----------
  const $ = (sel, ctx = document) => ctx.querySelector(sel);

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

  // ---------- featured cards ----------
  const featuredEl = $("#featuredCards");
  if (featuredEl) {
    data.featured.forEach(p => {
      featuredEl.appendChild(
        el("article", { class: "card" },
          p.tag && el("span", { class: "card-tag" }, p.tag),
          el("div", { class: "card-head" },
            el("h3", { class: "card-title" },
              el("a", { href: p.url, target: "_blank", rel: "noopener" }, p.name)
            ),
            p.lang && el("span", { class: "card-lang" }, p.lang)
          ),
          el("p", null, p.desc || ""),
          el("div", { class: "card-meta" },
            p.stars && pill("★ " + p.stars, p.stars + " stars"),
            p.forks && pill("⑂ " + p.forks, p.forks + " forks"),
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
          el("p", null, p.desc || ""),
          el("div", { class: "card-author" }, "👤 " + p.author)
        )
      );
    });
  }

  // ---------- filters + project cards ----------
  const filtersEl = $("#filters");
  const cardsEl   = $("#projectCards");
  const emptyEl   = $("#emptyState");
  const searchEl  = $("#searchInput");

  let activeFilter = "all";
  let activeQuery  = "";

  function catLabel(id) {
    const f = data.filters.find(x => x.id === id);
    return f ? f.label : id;
  }

  function renderFilters() {
    if (!filtersEl) return;
    filtersEl.replaceChildren();
    data.filters.forEach(f => {
      const count = f.id === "all"
        ? data.all.length
        : data.all.filter(p => p.cat === f.id).length;
      const pressed = f.id === activeFilter;
      filtersEl.appendChild(
        el("button", {
          class: "filter-pill",
          type: "button",
          role: "tab",
          "aria-pressed": pressed ? "true" : "false",
          onclick: () => {
            if (activeFilter === f.id) return;
            activeFilter = f.id;
            renderFilters();
            renderCards();
          }
        },
          f.label,
          el("span", { class: "count" }, "· " + count)
        )
      );
    });
  }

  function renderCards() {
    if (!cardsEl) return;
    cardsEl.replaceChildren();

    const q = activeQuery.trim().toLowerCase();
    const list = data.all.filter(p => {
      if (activeFilter !== "all" && p.cat !== activeFilter) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        (p.desc || "").toLowerCase().includes(q) ||
        (p.lang || "").toLowerCase().includes(q) ||
        (p.cat  || "").toLowerCase().includes(q) ||
        catLabel(p.cat).toLowerCase().includes(q)
      );
    });

    if (emptyEl) emptyEl.hidden = list.length !== 0;

    list.forEach(p => {
      cardsEl.appendChild(
        el("article", { class: "card" },
          el("div", { class: "card-head" },
            el("h3", { class: "card-title" },
              el("a", { href: p.url, target: "_blank", rel: "noopener" }, p.name)
            ),
            p.lang && el("span", { class: "card-lang" }, p.lang)
          ),
          el("p", null, p.desc || ""),
          el("div", { class: "card-meta" },
            p.stars && pill("★ " + p.stars, p.stars + " stars"),
            pill(catLabel(p.cat)),
            el("a", { class: "link-arrow", href: p.url, target: "_blank", rel: "noopener" }, "Open →")
          )
        )
      );
    });
  }

  if (searchEl) {
    searchEl.addEventListener("input", (e) => {
      activeQuery = e.target.value;
      renderCards();
    });
  }

  renderFilters();
  renderCards();

  // ---------- hero stats from data ----------
  const setStat = (id, text) => { const n = $("#" + id); if (n) n.textContent = text; };
  setStat("statRepos",   data.all.length + "+");
  setStat("statInterns", String(data.interns.length));
  const ds4Count = new Set(
    data.all
      .filter(p => p.cat === "ds4" || /^ds4[A-Z]/.test(p.name))
      .map(p => p.name)
  ).size;
  setStat("statDs4", ds4Count + "+");

  // ---------- theme toggle ----------
  const root = document.documentElement;
  const themeBtn = $("#themeToggle");
  if (localStorage.getItem("ds4cabs-theme") === "light") {
    root.setAttribute("data-theme", "light");
  }
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const isLight = root.getAttribute("data-theme") === "light";
      if (isLight) {
        root.removeAttribute("data-theme");
        localStorage.setItem("ds4cabs-theme", "dark");
      } else {
        root.setAttribute("data-theme", "light");
        localStorage.setItem("ds4cabs-theme", "light");
      }
    });
  }

  // ---------- mobile nav drawer ----------
  const navBtn  = $("#navToggle");
  const navMenu = $("#navMenu");

  function closeMenu() {
    if (!navBtn || !navMenu) return;
    navMenu.classList.remove("is-open");
    navBtn.setAttribute("aria-expanded", "false");
    navBtn.setAttribute("aria-label", "Open menu");
  }
  function openMenu() {
    if (!navBtn || !navMenu) return;
    navMenu.classList.add("is-open");
    navBtn.setAttribute("aria-expanded", "true");
    navBtn.setAttribute("aria-label", "Close menu");
  }

  if (navBtn && navMenu) {
    navBtn.addEventListener("click", () => {
      navMenu.classList.contains("is-open") ? closeMenu() : openMenu();
    });
    navMenu.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (a && navMenu.classList.contains("is-open")) closeMenu();
    });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 820) closeMenu();
    });
  }

  // ---------- footer year ----------
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
