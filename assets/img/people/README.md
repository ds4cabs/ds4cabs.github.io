# Headshots — DS4CABS people

Drop mentor / intern / leadership headshots in this folder. The site reads
filenames referenced from `assets/js/projects.js` (the `headshot:` field on
each person entry).

## Filename convention

- Lowercase, kebab-case: `firstname-lastname.jpg`
  - `jane-doe.jpg`
  - `reuben-addison.jpg`
  - For names with diacritics, drop the diacritics: `francois` not `françois`.
- One-name entries: just the given name: `shucheng.jpg`.
- If two people share a first name, disambiguate with last initial:
  `kening-l.jpg`.

## Image specs

- **Aspect ratio:** 1:1 (square). The card crops to a circle so off-center
  faces will look odd.
- **Size:** 400 × 400 px is plenty (cards render at 64 px). Don't ship
  multi-megabyte originals.
- **Format:** JPEG preferred (smaller); WebP also fine. PNG only if you need
  transparency, which you don't for a headshot.
- **Target file size:** 60–120 KB per image.

## Quick resize / crop with ImageMagick

```bash
# square-crop and resize to 400px, JPEG quality 82
magick input.jpg -resize 800x800^ -gravity center -extent 800x800 \
        -resize 400x400 -quality 82 firstname-lastname.jpg
```

## No photo yet?

Leave the `headshot:` field unset in `projects.js`. The card will draw a
gradient initials avatar from the person's name — the site stays presentable.
