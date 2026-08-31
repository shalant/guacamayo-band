# Quality Checklist Status

Tracks this project against the canonical checklist in `career-development/docs/SITE_QUALITY_CHECKLIST.md` (66 items, evidence-sourced from Doug's real projects). Not duplicated here — that's a living doc that updates independently of this one. This file records what applies to Guacamayo, what genuinely doesn't, and why — this is a personal band site, not a client deliverable, so some categories get lighter judgment than the checklist's original freelance-client context, noted explicitly rather than silently skipped.

## N/A for this project, with reasoning

- Auth / rate-limiting / CSRF / tenant-scoping (Security) — no auth, no user data, no server-handled forms anywhere on the site.
- CSP / custom security response headers (Security) — GitHub Pages doesn't support custom HTTP response headers at all. Revisit once on Cloudflare Pages — see `DEPLOYMENT.md`.
- Dual-theme / flash-of-wrong-theme (Design System, Interaction & Polish) — single-theme by design, not bolted on. See `DESIGN_NOTES.md`.
- PWA service worker (Performance) — not a real use case for a band marketing site.
- File/blob storage permissions (Security) — static site, no storage backend.
- Full automated test suite / CI test gate (Testing) — a static content site with no business logic; the real QA is the manual golden-path check below.

## Done

- [x] Branch protection on `master`, PR required
- [x] HTTPS enforced (GH Pages default)
- [x] Compression/caching — gzip via GH Pages (Brotli pending the Cloudflare move)
- [x] Design-token doc exists and stays in sync — `tokens.css` + `DESIGN_NOTES.md`
- [x] Font loading is deliberate — self-hosted `@fontsource`, only the weights actually used
- [x] Distinctive visual signature — the pinned flyer backdrop + real brand assets, not a generic template
- [x] Docs kept in sync with code — this whole `docs/` folder, enforced by the PR template

## Doing tonight (basic content pass)

- [x] Meta description — already real (`Guacamayo is a Chicago-based Funky Latin Groove band.`), not generic
- [x] Favicon — replaced Astro's default with the real macaw-head icon mark, cropped from `logo.png`, checked at actual 32px tab size before shipping (favicon.ico multi-size + apple-touch-icon). Raster-sourced, not vector — the source lockup PNG doesn't have a separate vector icon file; noted here rather than silently skipped.
- [x] Contact path — Booking section now has a real `mailto:` with a pre-filled subject line. Email address (`hello@guacamayoband.com`) is a placeholder inbox, not yet live — flagged in `TODO.md`.
- [x] No stale dates — N/A, no footer/copyright date is displayed anywhere yet, so nothing to go stale
- [x] One clear primary CTA per page — audited: Hero has two content-navigation CTAs (Listen/Tour Dates, not competing contact asks), Booking is the single deliberate contact/booking path, nothing duplicates it
- [x] Alt text — both real images already had it right (`logo.png` has meaningful alt text, the decorative flyer backdrop has empty `alt=""` + `role="presentation"`, which is the correct pattern for a decorative image, not an oversight)
- [x] Single `<main>` landmark, sensible heading order — `PageBackdrop`'s content wrapper is now a `<main>`; Hero's "Funky Latin Groove" is now a real `<h1>` (was a styled `<p>`), every section below uses `<h2>`

## Done (second pass, 2026-08-31)

- [x] Open Graph / Twitter card / `og:image` at proper 1200×630 — real image cropped/composited from the actual flyer (`public/og-image.jpg`), not a reused logo asset. `canonical`/`og:url`/`og:image` all built as absolute URLs via `new URL(path, Astro.site)`, not string-concatenated (the base-path bug from `TODO.md` was exactly this kind of string-concat mistake — used the robust pattern this time).
- [x] `robots.txt` / `sitemap.xml` — hand-written static files in `public/`, not the `@astrojs/sitemap` integration (overkill for one URL). **Note:** both hardcode the live `shalant.github.io` URL — update them when the Cloudflare/custom-domain move happens (see `DEPLOYMENT.md`).
- [x] Custom 404 page — `src/pages/404.astro`, on-brand (same pinned backdrop, real nav), not GitHub's generic default. Verified via `astro preview` that GH Pages' 404 fallback actually serves it.
- [x] WCAG AA contrast check — computed real ratios (not eyeballed) for every text/background pair in the palette. One real failure found and fixed: the old `text-paper-2/40` "Info soon" label was 3.41:1 against a 4.5:1 requirement. Fixed as part of the ticket-link rework below (now full-opacity `text-paper-2`, same treatment as the Tickets button, 7.9:1). Everything else already passed, including the Hero `<h1>`'s teal span — apparent 4.41:1 "failure" isn't one once large-text sizing rules (3:1 threshold at 24px+) are applied correctly.
- [x] Touch-target sizing audit (44×44px) — measured real rendered sizes via `getBoundingClientRect()`, not estimated from padding math. Found genuine failures across nav links (16px), Hero CTAs (38px), Press download buttons (34px), and the Shows ticket/no-ticket button (16-38px) — fixed all of them with a consistent `inline-flex min-h-11 items-center` pattern. One deliberate exception: the inline `mailto:` link inside the Press section's running-text paragraph (182×15) — WCAG 2.5.5 explicitly exempts links inline within a sentence from the target-size criterion; forcing it to 44px would mean re-writing that as a standalone button, which isn't how that link is meant to be used.

## Deferred — real, not started

- [ ] Full Lighthouse audit against the production URL
- [ ] Analytics — deliberately not installed. Personal site, not a client project needing funnel data; revisit only if a real question comes up that analytics would answer.
- [ ] Golden-path manual walkthrough immediately before any future "launch" milestone
