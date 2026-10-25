#!/usr/bin/env python3
"""Generate public people data, current-role redirects, and directory tables."""

from __future__ import annotations

import argparse
import json
import re
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BASE_REGISTRY = ROOT / "assets" / "data" / "people-base.json"
PUBLIC_REGISTRY = ROOT / "people.json"
PROFILE_DIR = ROOT / "people"
BASE_URL = "https://ds4cabs.github.io"
ROLE_DIRS = ("mentor", "admin", "mentee")
META_FIELDS = {
    "ds4cabs-name": "name",
    "ds4cabs-role": "role",
    "ds4cabs-type": "type",
    "ds4cabs-year": "year",
    "ds4cabs-major": "major",
    "ds4cabs-affiliation": "affiliation",
    "ds4cabs-github": "github",
    "ds4cabs-github-status": "github_status",
    "ds4cabs-linkedin": "linkedin",
    "ds4cabs-linkedin-status": "linkedin_status",
    "ds4cabs-headshot": "headshot",
    "ds4cabs-email": "email",
    "ds4cabs-interests": "interests",
}


class MetaReader(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.values: dict[str, object] = {}

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag != "meta":
            return
        data = dict(attrs)
        name, content = data.get("name"), data.get("content")
        if name in META_FIELDS and content:
            self.values[META_FIELDS[name]] = content.strip()


def slugify(value: str) -> str:
    value = re.sub(r"\([^)]*\)", "", value.lower())
    return re.sub(r"[^a-z0-9]+", "-", value).strip("-")


def read_profile(path: Path) -> dict:
    reader = MetaReader()
    reader.feed(path.read_text(encoding="utf-8"))
    record = reader.values
    missing = [field for field in ("name", "role", "type") if not record.get(field)]
    if record.get("type") in {"mentee", "applicant"} and not record.get("year"):
        missing.append("year")
    if missing:
        raise ValueError(f"{path.relative_to(ROOT)} missing metadata: {', '.join(missing)}")
    if "year" in record:
        try:
            record["year"] = int(str(record["year"]))
        except ValueError as exc:
            raise ValueError(f"{path.relative_to(ROOT)} has an invalid ds4cabs-year") from exc
    if isinstance(record.get("interests"), str):
        record["interests"] = [item.strip() for item in str(record["interests"]).split(",") if item.strip()]
    record["profile"] = path.relative_to(ROOT).as_posix()
    return record


def same_person(base: dict, discovered: dict) -> bool:
    if base.get("name") != discovered.get("name"):
        return False
    if discovered.get("type") in {"mentee", "applicant"}:
        return base.get("type") == discovered.get("type") and base.get("year") == discovered.get("year")
    return base.get("type") == discovered.get("type")


def build_registry() -> list[dict]:
    baseline = json.loads(BASE_REGISTRY.read_text(encoding="utf-8"))
    discovered: list[dict] = []
    seen_profiles: set[str] = set()
    for path in sorted(PROFILE_DIR.glob("*.html")):
        if path.name == "profile-template.html":
            continue
        record = read_profile(path)
        if record["profile"] in seen_profiles:
            raise ValueError(f"duplicate profile path: {record['profile']}")
        seen_profiles.add(str(record["profile"]))
        discovered.append(record)

    output: list[dict] = []
    used: set[int] = set()
    for base in baseline:
        record = dict(base)
        matches = [(i, profile) for i, profile in enumerate(discovered) if i not in used and same_person(base, profile)]
        if len(matches) > 1:
            raise ValueError(f"multiple profile pages match {base.get('name')}")
        if matches:
            index, profile = matches[0]
            record.update(profile)
            used.add(index)
        else:
            record.pop("profile", None)
        output.append(record)

    for index, record in enumerate(discovered):
        if index in used:
            continue
        identity = slugify(str(record["name"]))
        suffix = str(record["year"]) if record["type"] in {"mentee", "applicant"} else str(record["type"])
        new_record = dict(record)
        new_record["id"] = f"{identity}-{suffix}"
        new_record["active"] = record["type"] != "applicant"
        output.append(new_record)

    # One permanent page represents a person across multiple program years or
    # roles (for example, a former mentee who is now an administrator).
    profiles_by_name: dict[str, str] = {}
    for record in output:
        if record.get("profile"):
            name, profile = str(record["name"]), str(record["profile"])
            if name in profiles_by_name and profiles_by_name[name] != profile:
                raise ValueError(f"multiple permanent profile pages found for {name}")
            profiles_by_name[name] = profile
    for record in output:
        if str(record["name"]) in profiles_by_name:
            record["profile"] = profiles_by_name[str(record["name"])]

    # Carry public identity links across the same person's role/year records so
    # directory rows never lose a GitHub or LinkedIn URL due to record order.
    shared_by_name: dict[str, dict[str, object]] = {}
    for record in output:
        if not record.get("profile"):
            continue
        shared = shared_by_name.setdefault(str(record["name"]), {})
        for field in ("github", "linkedin", "headshot"):
            if record.get(field):
                shared[field] = record[field]
    for record in output:
        for field, value in shared_by_name.get(str(record["name"]), {}).items():
            if not record.get(field):
                record[field] = value

    ids = [p.get("id") for p in output]
    if any(not value for value in ids) or len(ids) != len(set(ids)):
        raise ValueError("people registry contains missing or duplicate ids")
    return output


def current_year(people: list[dict]) -> int:
    years = [int(p["year"]) for p in people if p.get("type") == "mentee" and p.get("active", True) and p.get("year")]
    if not years:
        raise ValueError("no current mentee year found")
    return max(years)


def redirect_html(person: dict, directory: str) -> str:
    profile = str(person["profile"])
    target = f"../{profile}"
    canonical = f"{BASE_URL}/{profile}"
    return f'''<!doctype html>
<html lang="en"><head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>{person['name']} — Profile moved</title>
<meta name="robots" content="noindex" />
<meta http-equiv="refresh" content="0; url={target}" />
<link rel="canonical" href="{canonical}" />
</head><body><p>This current {directory} profile is available at <a href="{target}">{canonical}</a>.</p></body></html>
'''


def role_redirects(people: list[dict]) -> dict[Path, str]:
    year = current_year(people)
    groups = {
        "mentor": [p for p in people if p.get("active", True) and p.get("profile") and p.get("type") in {"mentor", "admin"}],
        "admin": [p for p in people if p.get("active", True) and p.get("profile") and p.get("type") in {"leader", "admin"}],
        "mentee": [p for p in people if p.get("active", True) and p.get("profile") and p.get("type") == "mentee" and p.get("year") == year],
    }
    outputs: dict[Path, str] = {}
    for directory, entries in groups.items():
        for person in entries:
            name = Path(str(person["profile"])).name
            outputs[ROOT / directory / name] = redirect_html(person, directory)
    return outputs


def md_link(label: str, url: str | None, status: str | None = None) -> str:
    return f"[{label}]({url})" if url else (status or "—")


def github_link(url: str | None, status: str | None = None) -> str:
    return md_link("@" + url.rstrip("/").rsplit("/", 1)[-1], url) if url else (status or "—")


def profile_link(profile: str | None) -> str:
    return md_link("View", f"{BASE_URL}/{profile}") if profile else "—"


def table(headers: list[str], rows: list[list[str]], align_right: set[int] | None = None) -> str:
    align_right = align_right or set()
    separators = ["---:" if i in align_right else "---" for i in range(len(headers))]
    lines = ["| " + " | ".join(headers) + " |", "|" + "|".join(separators) + "|"]
    lines.extend("| " + " | ".join(row) + " |" for row in rows)
    return "\n".join(lines)


def role_rows(entries: list[dict]) -> list[list[str]]:
    return [[p["name"], p.get("role") or str(p["type"]).title(), p.get("affiliation") or "—", github_link(p.get("github"), p.get("github_status")), md_link("Profile", p.get("linkedin"), p.get("linkedin_status")), profile_link(p.get("profile"))] for p in entries]


def directory_readme(title: str, description: str, rows: list[list[str]]) -> str:
    return f"""# {title}

{description} Permanent profile pages live in [`people/`](../people/); this folder contains current-year shortcuts.

{table(['Person', 'Role', 'Affiliation', 'GitHub', 'LinkedIn', 'Profile'], rows)}

> Generated from [`people.json`](../people.json) by `python3 scripts/generate_people_readmes.py`.
"""


def generate_readmes(people: list[dict]) -> dict[Path, str]:
    year = current_year(people)
    mentors = [p for p in people if p.get("active", True) and p.get("type") in {"mentor", "admin"}]
    administrators = [p for p in people if p.get("active", True) and p.get("type") in {"leader", "admin"}]
    mentees = [p for p in people if p.get("active", True) and p.get("type") == "mentee" and p.get("year") == year]
    all_profiles = []
    seen_profiles: set[str] = set()
    for person in people:
        profile = person.get("profile")
        if profile and str(profile) not in seen_profiles:
            all_profiles.append(person)
            seen_profiles.add(str(profile))
    people_rows = [[p["name"], p.get("role") or str(p["type"]).title(), str(p.get("year") or "—"), p.get("affiliation") or "—", github_link(p.get("github"), p.get("github_status")), md_link("Profile", p.get("linkedin"), p.get("linkedin_status")), profile_link(p.get("profile"))] for p in all_profiles]
    mentee_rows = [[p["name"], str(p["year"]), p.get("major") or "—", p.get("affiliation") or "—", github_link(p.get("github"), p.get("github_status")), md_link("Profile", p.get("linkedin"), p.get("linkedin_status")), profile_link(p.get("profile"))] for p in mentees]
    return {
        ROOT / "mentor" / "README.md": directory_readme(f"DS4CABS {year} Mentor Profiles", "Current mentor and admin directory.", role_rows(mentors)),
        ROOT / "admin" / "README.md": directory_readme(f"DS4CABS {year} Admin and Program Leadership", "Current program leadership and administrator directory.", role_rows(administrators)),
        ROOT / "mentee" / "README.md": directory_readme(f"DS4CABS {year} Mentee Profiles", "Current mentee directory.", mentee_rows),
        ROOT / "people" / "README.md": f"""# DS4CABS People Directory

Permanent profiles for everyone who has engaged with the program across years and roles. Add a page by copying [`profile-template.html`](./profile-template.html), filling its `ds4cabs-*` metadata, and submitting the single HTML file.

{table(['Person', 'Role', 'Year', 'Affiliation', 'GitHub', 'LinkedIn', 'Profile'], people_rows)}

> Generated from [`people.json`](../people.json). Private emails, locations, CVs, and internal application responses are not published.
""",
    }


def expected_outputs(people: list[dict]) -> dict[Path, str]:
    outputs = generate_readmes(people)
    outputs.update(role_redirects(people))
    outputs[PUBLIC_REGISTRY] = json.dumps(people, ensure_ascii=False, indent=2) + "\n"
    return outputs


def stale_role_files(expected: dict[Path, str]) -> list[Path]:
    expected_paths = set(expected)
    stale: list[Path] = []
    for directory in ROLE_DIRS:
        for path in (ROOT / directory).glob("*.html"):
            if path.name == "profile-template.html":
                continue
            if path not in expected_paths:
                stale.append(path)
    return stale


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true")
    parser.add_argument("--validate", action="store_true")
    args = parser.parse_args()
    try:
        people = build_registry()
        outputs = expected_outputs(people)
    except (ValueError, json.JSONDecodeError) as exc:
        print(f"Profile registry validation failed: {exc}")
        return 1
    if args.validate:
        profile_count = len({str(p["profile"]) for p in people if p.get("profile")})
        print(f"Validated {len(people)} people and {profile_count} permanent profiles.")
        return 0
    stale = [path for path, content in outputs.items() if not path.exists() or path.read_text(encoding="utf-8") != content]
    stale.extend(stale_role_files(outputs))
    if args.check:
        if stale:
            print("Stale generated files: " + ", ".join(str(p.relative_to(ROOT)) for p in stale))
            return 1
        return 0
    for path in stale_role_files(outputs):
        path.unlink()
    for path, content in outputs.items():
        path.write_text(content, encoding="utf-8")
    profile_count = len({str(p["profile"]) for p in people if p.get("profile")})
    print(f"Generated {len(people)} people, {profile_count} permanent profiles, and current-year role redirects.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
