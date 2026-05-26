// DS4CABS — main.js
// Renders featured / intern / project cards from window.DS4CABS_PROJECTS,
// powers search + category filtering, mobile nav, and theme toggle.

(function () {
  const data = window.DS4CABS_PROJECTS || { featured: [], cohorts: {}, all: [], filters: [] };

  // ---------- current cohort ----------
  // The "current" cohort is simply the highest year-key in data.cohorts.
  // To roll the site over to a new year, add cohorts[year+1] in projects.js.
  function pickCohort(cohorts) {
    const years = Object.keys(cohorts || {}).map(n => +n).filter(Number.isFinite);
    if (years.length === 0) return { year: new Date().getFullYear(), dates: {}, mentors: [], interns: [], leadership: [] };
    const latest = Math.max(...years);
    return cohorts[latest];
  }
  const cohort = pickCohort(data.cohorts);

  // Resolve a dotted path like "dates.window" against the current cohort.
  function resolvePath(obj, path) {
    return path.split(".").reduce((o, k) => (o == null ? o : o[k]), obj);
  }

  // Walk the DOM and fill in template attributes:
  //   <span data-year>…</span>                  → cohort.year
  //   <span data-cohort="dates.window">…</span> → resolved value
  //   <a    data-tpl-href="…{year}…">           → href with {year} replaced
  function applyTemplates(root = document) {
    root.querySelectorAll("[data-year]").forEach(n => { n.textContent = String(cohort.year); });
    root.querySelectorAll("[data-cohort]").forEach(n => {
      const v = resolvePath(cohort, n.getAttribute("data-cohort"));
      if (v != null) n.textContent = String(v);
    });
    root.querySelectorAll("[data-tpl-href]").forEach(n => {
      const tpl = n.getAttribute("data-tpl-href");
      if (tpl) n.setAttribute("href", tpl.replace(/\{year\}/g, String(cohort.year)));
    });
  }

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

  // ---------- person card helpers ----------
  function initials(name) {
    return (name || "")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(p => p[0])
      .join("")
      .toUpperCase();
  }

  function avatar(person) {
    const wrap = person.linkedin
      ? el("a", {
          class: "avatar avatar-link",
          href: person.linkedin,
          target: "_blank",
          rel: "noopener",
          "aria-label": person.name + " on LinkedIn"
        })
      : el("div", { class: "avatar", "aria-hidden": "true" });
    if (person.headshot) {
      const img = el("img", {
        class: "avatar-img",
        src: person.headshot,
        alt: "",
        loading: "lazy",
        onerror: function () {
          // graceful fallback if the file 404s
          this.replaceWith(el("span", { class: "avatar-initials" }, initials(person.name)));
        }
      });
      wrap.appendChild(img);
    } else {
      wrap.appendChild(el("span", { class: "avatar-initials" }, initials(person.name)));
    }
    return wrap;
  }

  // tiny inline icons for social links (no external deps)
  function iconLinkedIn() {
    return el("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true",
      html: '<path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.99 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>' });
  }
  function iconGitHub() {
    return el("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true",
      html: '<path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.73-1.53-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.83 1.18 3.09 0 4.42-2.7 5.39-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/>' });
  }
  function iconMail() {
    return el("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", "aria-hidden": "true",
      html: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>' });
  }

  function personCard(person) {
    const metaParts = [person.role, person.org_role, person.major, person.affiliation].filter(Boolean);
    const tagList = (person.interests || person.expertise || []);

    const links = [];
    if (person.linkedin) links.push(el("a", {
      class: "person-link", href: person.linkedin, target: "_blank", rel: "noopener", "aria-label": person.name + " on LinkedIn"
    }, iconLinkedIn()));
    if (person.github) links.push(el("a", {
      class: "person-link", href: person.github, target: "_blank", rel: "noopener", "aria-label": person.name + " on GitHub"
    }, iconGitHub()));
    if (person.email) links.push(el("a", {
      class: "person-link", href: "mailto:" + person.email, "aria-label": "Email " + person.name
    }, iconMail()));

    return el("article", { class: "card person-card" },
      avatar(person),
      el("div", { class: "person-body" },
        el("h3", { class: "person-name" }, person.name),
        metaParts.length > 0 && el("p", { class: "person-meta" }, metaParts.join(" · ")),
        tagList.length > 0 && el("div", { class: "person-tags" },
          tagList.map(t => el("span", { class: "person-tag" }, t))
        ),
        person.project && el("a", {
          class: "person-project",
          href: person.project.url || "#",
          target: "_blank",
          rel: "noopener"
        },
          el("span", { class: "person-project-icon" }, "🔧"),
          el("span", { class: "person-project-text" },
            el("strong", null, person.project.name),
            person.project.desc && el("em", null, person.project.desc)
          )
        ),
        links.length > 0 && el("div", { class: "person-links" }, links)
      )
    );
  }

  function renderPeople(list, mountId, emptyId) {
    const mount = $("#" + mountId);
    if (!mount) return;
    mount.replaceChildren();
    const empty = emptyId ? $("#" + emptyId) : null;
    if (!list || list.length === 0) {
      if (empty) empty.hidden = false;
      return;
    }
    if (empty) empty.hidden = true;
    list.forEach(p => mount.appendChild(personCard(p)));
  }

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

  // ---------- people grids (mentors / interns / leadership) ----------
  renderPeople(cohort.mentors,    "mentorCards",     "mentorsEmpty");
  renderPeople(cohort.interns,    "internCards",     "internsEmpty");
  renderPeople(cohort.leadership, "leadershipCards", "leadershipEmpty");

  // ---------- team page grids (rendered only if mount points exist) ----------
  const team = data.team || {};
  renderPeople(team.leaders,         "teamLeaderCards");
  renderPeople(team.mentors_admin,   "teamMentorCards");
  renderPeople(team.interns_mentees, "teamInternCards");

  // ---------- past cohort page (/cohort.html?year=YYYY) ----------
  const cohortMount = $("#pastCohortCards");
  if (cohortMount) {
    const archive = (team.archive) || {};
    const years = Object.keys(archive).map(n => +n).filter(Number.isFinite).sort((a, b) => b - a);
    const params = new URLSearchParams(window.location.search);
    const requested = +params.get("year");
    const activeYear = years.includes(requested) ? requested : (years[0] || null);

    // year selector
    const picker = $("#cohortYearPicker");
    if (picker) {
      picker.replaceChildren();
      years.forEach(y => {
        const active = y === activeYear;
        picker.appendChild(el("a", {
          class: "filter-pill" + (active ? " is-active" : ""),
          href: "?year=" + y,
          "aria-pressed": active ? "true" : "false"
        }, String(y)));
      });
    }

    // heading text
    const heading = $("#cohortYearHeading");
    if (heading && activeYear) heading.textContent = activeYear + " intern cohort";

    // render the chosen cohort
    const entry = activeYear ? archive[activeYear] : null;
    const interns = entry ? (entry.interns || []) : [];
    renderPeople(interns, "pastCohortCards", "pastCohortEmpty");
  }

  // ---------- year / date template substitution ----------
  applyTemplates(document);

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
  // count distinct intern projects in the current cohort
  const internProjects = new Set(
    (cohort.interns || []).map(p => p.project && p.project.name).filter(Boolean)
  ).size;
  setStat("statInterns", String(internProjects || (cohort.interns || []).length));
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
