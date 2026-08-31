# To Do

Not ordered/prioritized — pull from whichever's relevant.

## Content

- [x] ~~Real Music section~~ — built (`src/components/Music.astro`), YouTube playlist-chain embed of the real 6 promo shorts from Javier's channel (9:16 aspect, matches the Shorts format instead of letterboxing in 16:9). No Spotify link yet — add if/when the band has music on Spotify.
- [x] ~~Real Shows section~~ — built (`src/components/Shows.astro`, ticket-stub list grouped by month). As of PR #7, `src/data/shows.ts` fetches real gigs from the GigSync backend at build time (falls back to placeholder dates if unreachable) — see `DESIGN_NOTES.md`. Real data is already flowing: one confirmed gig as of 2026-08-31 (Constellation, Nov 20). GigSync has no ticket-URL field, so those shows now show an "Ask about tickets" link to `#book` instead of a dead-end label — fixed alongside a real contrast failure and touch-target failure on that same element, see `QUALITY_CHECKLIST.md`.
- [x] ~~Booking section~~ — built (`src/components/Booking.astro`), real `mailto:` with pre-filled subject. `hello@guacamayoband.com` is a **placeholder inbox**, not live — swap once a real address exists. A real form still needs a backend/service like Formspree if wanted later.
- [ ] Photo gallery — blocked on having real photos beyond the flyer/logo; not faking this one with placeholder images
- [x] ~~Press/EPK section~~ — built (`src/components/Press.astro`): pitch line, contact, and real downloadable logo/flyer (original quality, served from `public/press/`, not the resized web versions). No press quotes/reviews included — none exist yet, not inventing any. Add real ones as they come in.
- [x] ~~About/bio~~ — built (`src/components/About.astro`), placed right after Hero. Bio copy is a **first draft using only verified facts** (lineup, instruments, genre, city) — no invented backstory. Swap for the band's own voice before launch.
- [ ] Confirm exact band-member spelling/instrument credits against the flyer before publishing (Doug Rosenberg/sax, Jack Zará/bass, Manuel Reyes/guitar, Javier Saume Mazzei/drums)

## Build

- [x] ~~Mobile nav~~ — nav is now fixed/global with a real logo (2026-08-31), which pushed it past fitting at 375px on the original spacing. Tightened mobile-only sizing to fit comfortably ≥375px; `overflow-x-auto` now genuinely earns its keep below that (a few px short at 320px). Verified via direct DOM measurement of the real mobile CSS values, not the visual resize tool — `resize_window` wasn't actually changing the rendered viewport in this environment tonight, worth knowing if it recurs.
- [ ] Image optimization pass on the flyer background specifically — check real mobile payload size once Music/Shows content exists (see the Blazor-vs-Astro payload comparison earlier in this project's chat history for why this matters)
- [ ] Decide whether to pull in `GuacamayouFirstVideo.mp4` (the real promo clip) anywhere — explored in `ten-video-backdrops.html` but not in the live build
- [x] ~~Favicon~~ — replaced with the real macaw-head icon, see `QUALITY_CHECKLIST.md`
- [x] ~~Broken favicon + Press download links in production~~ — `BASE_URL` doesn't end in a slash on this project; the favicon links (PR #4) and Press download links (PR #6) were silently malformed and 404ing live. Fixed with an explicit-slash join helper — see `DEPLOYMENT.md` lessons-learned.
- [x] ~~Open Graph/Twitter/og:image, robots.txt/sitemap.xml, custom 404, WCAG contrast audit, touch-target audit~~ — all built/fixed in one pass, see `QUALITY_CHECKLIST.md` for specifics on what was actually wrong and how each was verified (not just implemented and assumed correct)
- [x] ~~`astro.config.mjs` — `site` still has a placeholder `your-username` value~~ — fixed, set to `shalant.github.io`
- [x] ~~Sticky/persistent nav~~ — nav was only ever inside `Hero.astro`, scrolling away with it; moved to `Layout.astro`, `position: fixed`, glassmorphism (restrained, tied to the real palette — see `DESIGN_NOTES.md`), real logo linking home. All link hrefs now home-prefixed so they still work from `404.astro`.
- [x] ~~Split-flap tiles + subtle backdrop animation~~ — split-flap treatment (from `ten-flyer-variations.html`) applied to the real Shows date badges, flapping in once via IntersectionObserver, not looping. Backdrop now has a slow (28s) Ken Burns drift. Both `motion-safe:`/`prefers-reduced-motion`-aware. This also resolves the scroll-triggered-reveal item from the canonical checklist (`QUALITY_CHECKLIST.md` didn't call it out explicitly as deferred, but it was never actually built anywhere until now).

## Infra / deploy

- [x] ~~Decide GH Pages vs. Cloudflare Pages~~ — GH Pages to start (free, no domain needed yet); see `docs/DEPLOYMENT.md` for the Cloudflare move plan
- [x] ~~git init + first commit~~
- [x] ~~Push to GitHub, set up Pages~~ — live at <https://shalant.github.io/guacamayo-band/>, auto-deploys via `.github/workflows/deploy.yml` on merge to `master`
- [x] ~~All future changes must be made on a branch~~ — branch protection enforced on `master` (PR required, including for admins); PR template requires docs to be updated before merge
- [ ] Buy a domain, eventually — no rush, GH Pages subdomain works for now
- [ ] Once a domain exists: move to Cloudflare Pages per `docs/DEPLOYMENT.md` (confirms Brotli, HTTP/3, edge caching)

## Open decisions

- [ ] Waiting on Javier's vote on the overall direction — current build (Full-Bleed Pin) is Doug's pick, not yet confirmed with the rest of the band
- [x] ~~Whether to mix elements from other explored directions in~~ — split-flap tiles now integrated into Shows (2026-08-31), see above. Ticket-stub Shows layout is effectively already the chosen approach (the whole section is ticket-stub styled). Full "next show" flap strip in the Hero is still open — now that Shows data is live/build-time-fresh (not stale hardcoded info), the original "no specific show info in hero" concern from `DESIGN_NOTES.md` no longer fully applies; worth revisiting if wanted.
