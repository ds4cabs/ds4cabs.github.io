#!/usr/bin/env python3
"""Generate people.json and role README files from profile HTML metadata."""

from __future__ import annotations

import argparse
import json
import re
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BASE_REGISTRY = ROOT / "assets" / "data" / "people-base.json"
PUBLIC_REGISTRY = ROOT / "people.json"
BASE_URL = "https://ds4cabs.github.io"
ROLE_FOLDERS = {"mentor": "mentor", "admin": "admin", "mentee": "mentee"}
META_FIELDS = {
    "ds4cabs-name": "name",
    "ds4cabs-role": "role",
    "ds4cabs-type": "type",
    "ds4cabs-year": "year",
    "ds4cabs-major": "major",
    "ds4cabs-affiliation": "affiliation",
    "ds4cabs-github": "github",
    "ds4cabs-linkedin": "linkedin",
    "ds4cabs-headshot": "headshot",
    "ds4cabs-email": "email",
}


class MetaReader(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.values: dict[str, object] = {}

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag != "meta":
            return
        data = dict(attrs)
        name = data.get("name")
        content = data.get("content")
        if name in META_FIELDS and content:
            self.values[META_FIELDS[name]] = content.strip()


def slugify(value: str) -> str:
    value = re.sub(r"\([^)]*\)", "", value.lower())
    return re.sub(r"[^a-z0-9]+", "-", value).strip("-")


def read_profile(path: Path, inferred_type: str) -> dict:
    reader = MetaReader()
    reader.feed(path.read_text(encoding="utf-8"))
    record = reader.values
    missing = [field for field in ("name", "role") if not record.get(field)]
    if inferred_type == "mentee" and not record.get("year"):
        missing.append("year")
    if missing:
        raise ValueError(f"{path.relative_to(ROOT)} missing metadata: {', '.join(missing)}")
    record["type"] = record.get("type") or inferred_type
    if "year" in record:
        try:
            record["year"] = int(str(record["year"]))
        except ValueError as exc:
            raise ValueError(f"{path.relative_to(ROOT)} has an invalid ds4cabs-year") from exc
    record["profile"] = path.relative_to(ROOT).as_posix()
    return record


def build_registry() -> list[dict]:
    baseline = json.loads(BASE_REGISTRY.read_text(encoding="utf-8"))
    by_profile = {p["profile"]: dict(p) for p in baseline if p.get("profile")}
    discovered: dict[str, dict] = {}

    for folder, inferred_type in ROLE_FOLDERS.items():
        for path in sorted((ROOT / folder).glob("*.html")):
            if path.name == "profile-template.html":
                continue
            record = read_profile(path, inferred_type)
            profile = record["profile"]
            if profile in discovered:
                raise ValueError(f"duplicate profile path: {profile}")
            discovered[profile] = record

    missing_files = sorted(set(by_profile) - set(discovered))
    if missing_files:
        raise ValueError("registered profile files are missing: " + ", ".join(missing_files))

    output: list[dict] = []
    used_profiles: set[str] = set()
    for base in baseline:
        record = dict(base)
        profile = record.get("profile")
        if profile and profile in discovered:
            record.update(discovered[profile])
            used_profiles.add(profile)
        output.append(record)

    for profile, record in discovered.items():
        if profile in used_profiles:
            continue
        identity = slugify(record["name"])
        suffix = str(record["year"]) if record["type"] == "mentee" else record["type"]
        record["id"] = f"{identity}-{suffix}"
        record["active"] = True
        output.append(record)

    ids = [p.get("id") for p in output]
    if any(not value for value in ids) or len(ids) != len(set(ids)):
        raise ValueError("people registry contains missing or duplicate ids")
    return output


def md_link(label: str, url: str | None) -> str:
    return f"[{label}]({url})" if url else "—"


def github_link(url: str | None) -> str:
    if not url:
        return "—"
    return md_link("@" + url.rstrip("/").rsplit("/", 1)[-1], url)


def profile_link(profile: str | None) -> str:
    return md_link("View", f"{BASE_URL}/{profile}") if profile else "—"


def table(headers: list[str], rows: list[list[str]], align_right: set[int] | None = None) -> str:
    align_right = align_right or set()
    separators = ["---:" if i in align_right else "---" for i in range(len(headers))]
    lines = ["| " + " | ".join(headers) + " |", "|" + "|".join(separators) + "|"]
    lines.extend("| " + " | ".join(row) + " |" for row in rows)
    return "\n".join(lines)


def role_rows(entries: list[dict]) -> list[list[str]]:
    return [[
        p["name"], p.get("role") or p["type"].title(), p.get("affiliation") or "—",
        github_link(p.get("github")), md_link("Profile", p.get("linkedin")), profile_link(p.get("profile")),
    ] for p in entries]


def directory_readme(title: str, description: str, rows: list[list[str]], folder: str) -> str:
    extra = " Add a profile by copying [`profile-template.html`](./profile-template.html), filling its `ds4cabs-*` metadata, and submitting the single HTML file."
    return f"""# {title}

{description}{extra}

{table(['Person', 'Role', 'Affiliation', 'GitHub', 'LinkedIn', 'Profile'], rows)}

> Generated from [`people.json`](../people.json). Profile HTML metadata is registered automatically by `python3 scripts/generate_people_readmes.py`.

## Add your profile

1. Copy `profile-template.html` in this `{folder}/` folder.
2. Rename it to `firstname-lastname.html`.
3. Fill the `ds4cabs-*` metadata and page content.
4. Submit the one HTML file in a pull request.

The automation validates and registers the page after merge.
"""


def generate_readmes(people: list[dict]) -> dict[Path, str]:
    mentors = [p for p in people if p.get("active", True) and p.get("type") in {"mentor", "admin"}]
    administrators = [p for p in people if p.get("active", True) and p.get("type") in {"leader", "admin"}]
    mentees = sorted([p for p in people if p.get("type") == "mentee"], key=lambda p: -int(p["year"]))
    mentee_rows = [[
        p["name"], str(p["year"]), p.get("major") or "—", p.get("affiliation") or "—",
        github_link(p.get("github")), md_link("Profile", p.get("linkedin")), profile_link(p.get("profile")),
        "[`people.json`](../people.json)",
    ] for p in mentees]
    profile_entries = [p for p in people if p.get("profile")]
    legacy_rows = [[p["name"], p["type"].title(), profile_link(p["profile"]), f"[`../{p['profile']}`](../{p['profile']})"] for p in profile_entries]
    return {
        ROOT / "mentor" / "README.md": directory_readme("DS4CABS Mentor Profiles", "Evergreen DS4CABS mentor and admin directory.", role_rows(mentors), "mentor"),
        ROOT / "admin" / "README.md": directory_readme("DS4CABS Admin and Program Leadership", "Evergreen DS4CABS program leadership and administrator directory.", role_rows(administrators), "admin"),
        ROOT / "mentee" / "README.md": f"""# DS4CABS Mentee Profiles

Mentee and intern records grouped automatically by program year. Add a profile by copying [`profile-template.html`](./profile-template.html), completing its metadata, and submitting the single HTML file.

{table(['Person', 'Program year', 'Major / field', 'Affiliation', 'GitHub', 'LinkedIn', 'Profile', 'Source'], mentee_rows, {1})}

> Generated from [`people.json`](../people.json). An em dash (—) indicates unavailable information.

## Add your profile

1. Copy `profile-template.html` and rename it to `firstname-lastname.html`.
2. Fill every required `ds4cabs-*` metadata field, including `ds4cabs-year`.
3. Complete the visible profile content and submit the one HTML file in a pull request.
""",
        ROOT / "people" / "README.md": f"""# Legacy People Profile URLs

Current profiles are registered in [`people.json`](../people.json). The HTML files in this directory are compatibility redirects for previously shared links.

{table(['Person', 'Role', 'Current URL', 'Current source'], legacy_rows)}
""",
    }


def expected_outputs(people: list[dict]) -> dict[Path, str]:
    outputs = generate_readmes(people)
    outputs[PUBLIC_REGISTRY] = json.dumps(people, ensure_ascii=False, indent=2) + "\n"
    return outputs


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true", help="fail if generated outputs are stale")
    parser.add_argument("--validate", action="store_true", help="validate profile metadata without writing")
    args = parser.parse_args()
    try:
        people = build_registry()
    except (ValueError, json.JSONDecodeError) as exc:
        print(f"Profile registry validation failed: {exc}")
        return 1
    if args.validate:
        print(f"Validated {len(people)} people and all profile metadata.")
        return 0
    outputs = expected_outputs(people)
    if args.check:
        stale = [str(path.relative_to(ROOT)) for path, content in outputs.items() if not path.exists() or path.read_text(encoding="utf-8") != content]
        if stale:
            print("Stale generated files: " + ", ".join(stale))
            return 1
        return 0
    for path, content in outputs.items():
        path.write_text(content, encoding="utf-8")
    print(f"Generated people.json and {len(outputs) - 1} README files from {len(people)} records.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
