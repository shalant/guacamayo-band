# To Do

Not ordered/prioritized — pull from whichever's relevant.

## Content

- [ ] Real Music section — Spotify/YouTube embeds, replace placeholder text
- [ ] Real Shows section — actual upcoming gig data (venue/date/time), replace placeholder text
- [ ] Booking section — real contact method (email link at minimum; a form needs a backend/service like Formspree since this is a static site)
- [ ] Photo gallery
- [ ] Press/EPK section if the band wants one
- [ ] Confirm exact band-member spelling/instrument credits against the flyer before publishing (Doug Rosenberg/sax, Jack Zará/bass, Manuel Reyes/guitar, Javier Saume Mazzei/drums)

## Build

- [ ] Mobile nav — current nav is a plain flex row; check it actually holds up under 375px width
- [ ] Image optimization pass on the flyer background specifically — check real mobile payload size once Music/Shows content exists (see the Blazor-vs-Astro payload comparison earlier in this project's chat history for why this matters)
- [ ] Decide whether to pull in `GuacamayouFirstVideo.mp4` (the real promo clip) anywhere — explored in `ten-video-backdrops.html` but not in the live build
- [ ] Favicon (currently using Astro's default)
- [x] ~~`astro.config.mjs` — `site` still has a placeholder `your-username` value~~ — fixed, set to `shalant.github.io`

## Infra / deploy

- [x] ~~Decide GH Pages vs. Cloudflare Pages~~ — GH Pages to start (free, no domain needed yet); see `docs/DEPLOYMENT.md` for the Cloudflare move plan
- [x] ~~git init + first commit~~
- [x] ~~Push to GitHub, set up Pages~~ — live at <https://shalant.github.io/guacamayo-band/>, auto-deploys via `.github/workflows/deploy.yml` on merge to `master`
- [x] ~~All future changes must be made on a branch~~ — branch protection enforced on `master` (PR required, including for admins); PR template requires docs to be updated before merge
- [ ] Buy a domain, eventually — no rush, GH Pages subdomain works for now
- [ ] Once a domain exists: move to Cloudflare Pages per `docs/DEPLOYMENT.md` (confirms Brotli, HTTP/3, edge caching)

## Open decisions

- [ ] Waiting on Javier's vote on the overall direction — current build (Full-Bleed Pin) is Doug's pick, not yet confirmed with the rest of the band
- [ ] Whether to mix elements from other explored directions in (e.g. the ticket-stub Shows layout, the split-flap "next show" strip) — see `DESIGN_NOTES.md` for the full exploration trail
