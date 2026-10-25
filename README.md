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
├── people.json               # generated public registry used by the website
├── people/                   # permanent profiles across every year and role
├── mentor/                   # generated current-year mentor shortcuts
├── admin/                    # generated current-year admin shortcuts
├── mentee/                   # generated current-year mentee shortcuts
├── assets/
│   ├── css/style.css         # all styling, theme variables, light/dark
│   ├── data/people-base.json # records that do not yet have standalone pages
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

Store every permanent profile in `people/`, regardless of year or role.
Contributors copy [`people/profile-template.html`](people/profile-template.html),
rename it to `firstname-lastname.html`, fill its visible content and
`ds4cabs-*` metadata, and submit that one HTML file.

The generator discovers each page, reads its `ds4cabs-type` and year metadata, merges
it with records that do not yet have pages, and rebuilds the root
[`people.json`](people.json) registry. The homepage, Mentors page, Cohorts page,
and role README tables all derive from that generated registry.

The GitHub workflow performs this generation automatically after merge. To preview and validate locally:

```bash
python3 scripts/generate_people_readmes.py
node --test tests/people-registry.test.js
```

The `mentor/`, `admin/`, and `mentee/` folders are generated current-year views.
Historical participants remain permanently available under `people/`.

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
- **One-file profile contributions** use standardized HTML metadata in
  `people/`; automation generates `people.json` and current-year role shortcuts.
- **Accessible**: semantic landmarks, focusable controls, reduced-motion respected.

## License

Site code: MIT. Project content links to the individual repositories,
each under its own license.
