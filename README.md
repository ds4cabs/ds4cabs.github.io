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
├── assets/
│   ├── css/style.css         # all styling, theme variables, light/dark
│   └── js/
│       ├── projects.js       # editable project catalog (data)
│       └── main.js           # renders cards, search, filters, theme toggle
└── cabs_workshop_form.html   # (existing) workshop signup form
```

No build step, no dependencies. Push to `main` and GitHub Pages serves it.

## Updating projects

Edit [`assets/js/projects.js`](assets/js/projects.js):

- `featured[]` — the big tiles at the top
- `interns[]` — the 2026 summer cohort grid
- `all[]` — the searchable/filterable catalog
- `filters[]` — the category chips

Each entry is just `{ name, desc, url, cat, lang?, stars?, forks?, tag? }`.

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
- **Accessible**: semantic landmarks, focusable controls, reduced-motion respected.

## License

Site code: MIT. Project content links to the individual repositories,
each under its own license.
