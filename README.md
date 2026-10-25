# ds4cabs.github.io

Landing page for **DS4CABS** — the data science initiative of the
[Chinese American Biopharmaceutical Society](https://www.cabsweb.org/).

Live: **https://ds4cabs.github.io/**

A single-page, static HTML site that showcases the org's 100+ repositories,
organized into meaningful categories: AI agents, RAG, discovery & genomics,
clinical trials, regulatory, market/HEOR, the `ds4*` functional tracks,
workshops, and the 2026 summer intern cohort.

## File layout

```
.
├── index.html                # main page
├── mentor.html               # mentors and administrators directory
├── cohort.html               # current and past mentee cohorts
├── mentor/                   # standalone mentor profile pages
├── admin/                    # admin and program-lead profile pages
├── mentee/                   # standalone mentee profile pages
├── people/                   # legacy redirects for previously shared URLs
├── assets/
│   ├── css/style.css         # all styling, theme variables, light/dark
│   ├── data/people.json      # single source of truth for every person roster
│   └── js/
│       ├── projects.js       # project catalog + cohort schedule metadata
│       ├── people-registry.js# tested roster selectors
│       └── main.js           # renders cards, search, filters, theme toggle
├── scripts/
│   └── generate_people_readmes.py # regenerates role directory tables
└── cabs_workshop_form.html   # (existing) workshop signup form
```

No build step, no dependencies. Push to `main` and GitHub Pages serves it.

## Updating projects

Edit [`assets/js/projects.js`](assets/js/projects.js):

- `featured[]` — the big tiles at the top
- `cohorts` — year-specific dates and application metadata
- `all[]` — the searchable/filterable catalog
- `filters[]` — the category chips

Each entry is just `{ name, desc, url, cat, lang?, stars?, forks?, tag? }`.

## Updating profile pages

Store standalone profiles by role:

- `mentor/<name>.html`
- `admin/<name>.html`
- `mentee/<name>.html`

Add or update the person in [`assets/data/people.json`](assets/data/people.json).
The homepage, Mentors page, and Cohorts page all derive their rosters from this
registry. Use `type` (`leader`, `admin`, `mentor`, or `mentee`), set `year` for
mentees, and set `profile` when a standalone profile exists.

Regenerate the role directory tables after editing the registry:

```bash
python3 scripts/generate_people_readmes.py
node --test tests/people-registry.test.js
```

Keep compatibility redirects under `people/` when moving an existing public URL.

Categories used today:
`agents`, `rag`, `discovery`, `trials`, `regulatory`, `market`,
`ds4`, `workshop`, `infrastructure`, `misc`.

## Local preview

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## Design notes

- **No framework, no CDN JS** — just hand-written CSS + a small vanilla JS file.
  Loads instantly, works on any device, easy for any contributor to edit.
- **Dark by default, light toggleable** — persisted via `localStorage`.
- **One source of truth** for the project list lives in `projects.js`, so
  adding a new repo is a 4-line edit.
- **One source of truth for people** lives in `assets/data/people.json`; every
  roster and generated directory table is derived from it.
- **Accessible**: semantic landmarks, focusable controls, reduced-motion respected.

## License

Site code: MIT. Project content links to the individual repositories,
each under its own license.
