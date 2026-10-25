# ds4cabs.github.io

[![Live website](https://img.shields.io/website?url=https%3A%2F%2Fds4cabs.github.io&label=website&logo=github)](https://ds4cabs.github.io/)
[![Sync people registry](https://github.com/ds4cabs/ds4cabs.github.io/actions/workflows/sync-people.yml/badge.svg)](https://github.com/ds4cabs/ds4cabs.github.io/actions/workflows/sync-people.yml)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-live-2ea44f?logo=github)](https://ds4cabs.github.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](#license)

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
├── people-data.js            # generated registry mirror for direct file previews
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

Every permanent profile lives in [`people/`](people/), regardless of year or
role. **Do not manually edit profile files in `admin/`, `mentor/`, or `mentee/`**;
those folders are generated current-year shortcuts.

### Which profile type should I use?

| Your program responsibility | Edit or create | `ds4cabs-type` | `ds4cabs-role` | Where the site displays you |
|---|---|---|---|---|
| Program leader with overall responsibility | `people/firstname-lastname.html` | `leader` | `Program Lead` | **Program leadership** section |
| Mentor who also owns an administrative workstream | `people/firstname-lastname.html` | `admin` | `Admin & Mentor` | **Admin & mentors** section |
| Mentor without an administrative assignment | `people/firstname-lastname.html` | `mentor` | `Mentor` | **Mentors** section |
| Current or historical intern/mentee | `people/firstname-lastname.html` | `mentee` | `Intern` | Homepage current cohort and the corresponding cohort year |

Use `admin` only when the person owns a defined operational function, such as
admissions, mentor matching, cohort operations, technical systems,
communications, or evaluation. Someone who only advises interns should use
`mentor`.

### Add a new person

| Step | What to do |
|---:|---|
| 1 | Copy [`people/profile-template.html`](people/profile-template.html). |
| 2 | Rename the copy to `firstname-lastname.html`, using lowercase letters and hyphens. |
| 3 | Set `ds4cabs-name`, `ds4cabs-role`, `ds4cabs-type`, and `ds4cabs-year`. |
| 4 | Add the current professional affiliation, GitHub, LinkedIn, and approved headshot path. |
| 5 | Replace the visible title, affiliation, biography, and program-contribution text. Metadata and visible content must agree. |
| 6 | Create a branch, commit the one profile file (and headshot when needed), and submit a pull request. |

### Update an existing person

| Change needed | File and field to update |
|---|---|
| Move between Program leadership, Admin & mentors, and Mentors | Change `ds4cabs-type` and `ds4cabs-role` in the person's permanent `people/*.html` file. |
| Update employer or school | Change `ds4cabs-affiliation` and the visible affiliation text. Use the person's current LinkedIn information. |
| Update program year | Change `ds4cabs-year` to the year of participation or service. |
| Update GitHub or LinkedIn | Change `ds4cabs-github` or `ds4cabs-linkedin` and the matching visible button. |
| Update biography or contribution | Edit the visible **About** and **Program contribution or interests** sections. |
| Replace a headshot | Add the approved image under `assets/img/people/` and update `ds4cabs-headshot`. |

### Required metadata example

```html
<meta name="ds4cabs-name" content="Jane Doe" />
<meta name="ds4cabs-role" content="Admin & Mentor" />
<meta name="ds4cabs-type" content="admin" />
<meta name="ds4cabs-year" content="2027" />
<meta name="ds4cabs-affiliation" content="Example Biopharma" />
<meta name="ds4cabs-github" content="https://github.com/janedoe" />
<meta name="ds4cabs-linkedin" content="https://www.linkedin.com/in/janedoe" />
<meta name="ds4cabs-headshot" content="assets/img/people/jane-doe.jpg" />
```

Do not publish private email addresses, home locations, résumés/CVs, application
answers, or private Drive links.

The generator discovers each page, reads its `ds4cabs-type` and year metadata, merges
it with records that do not yet have pages, and rebuilds the root
[`people.json`](people.json) registry. The homepage, Mentors page, Cohorts page,
and role README tables all derive from that generated registry.

The GitHub workflow performs this generation automatically after merge. It
regenerates `people.json`, `people-data.js`, the role shortcuts, and the README
tables. Do not edit those generated files manually. To preview and validate locally:

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
