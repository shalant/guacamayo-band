# guacamayo-band

Site for Guacamayo, a real Chicago Funky Latin Groove band Doug plays saxophone in. Built in Astro + Tailwind v4, using the band's own real logo and show-flyer art as the design system rather than an invented one.

**Status (2026-08-30):** hero direction chosen and built. Music/Shows/Book sections exist as placeholders — no real content yet. See `docs/TODO.md`.

## Structure

- `src/pages/index.astro` — the site, currently one page.
- `src/components/` — `Nav`, `Hero`, `PageBackdrop` (the sticky full-bleed background technique).
- `src/styles/tokens.css` — design tokens (color/type), defined via Tailwind v4's `@theme` — edit here to change the whole site's look.
- `src/assets/` — the band's real logo (`logo.png`) and show flyer (`flyer.jpg`).
- `docs/` — `DESIGN_NOTES.md` (design decisions and the full exploration trail) and `TODO.md`.

## Commands

| Command | Action |
| :--- | :--- |
| `npm install` | Install dependencies |
| `npx astro dev --background` | Start the dev server in the background (see `CLAUDE.md`) |
| `npm run build` | Build to `./dist/` |
| `npm run preview` | Preview the production build locally |

## Docs

Read `docs/DESIGN_NOTES.md` before proposing a new visual direction — it records what's already been explored and explicitly rejected, so it doesn't get re-litigated from scratch. `docs/TODO.md` tracks what's left.
