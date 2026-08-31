# Design Notes

**Status (2026-08-30):** hero direction chosen and built (Full-Bleed Pin). Music/Shows/Book sections are placeholders — real content not written yet. See `TODO.md`.

## Why this project exists

Doug plays saxophone in Guacamayo, a real, currently-gigging Chicago Latin/funk band ("Funky Latin Groove"). This is a personal project, not client work — partly to give the band an actual site, partly to see how fast/awesome a site can get built with Claude Code end to end.

## The band's real assets — use these, don't reinvent

Guacamayo already has a consistent, professionally-made visual identity from designer/drummer Javier Saume Mazzei (`@javchisau`), seen across 7 promo YouTube shorts and shared directly as source files:

- `src/assets/logo.png` — the real wordmark lockup (chunky rounded "GUACAMAYO" bubble lettering, gold fill, black outline, red-orange bevel) with the circular macaw-head icon mark above it.
- `src/assets/flyer.jpg` — the real Reggies Chicago show flyer: a painted macaw (teal/turquoise face, orange-red-yellow wing gradient) on dark charcoal with a warm sunburst glow, "GUACAMAYO / FUNKY / LATIN / GROOVE" in groovy 70s-funk bubble lettering (gold/orange/teal/cream), aged paper texture.

Real lineup (from the flyer): Doug Rosenberg — saxophone, Jack Zará — bass, Manuel Reyes — guitar, Javier Saume Mazzei — drums.

There's also a real promo video (`GuacamayouFirstVideo.mp4`, an animated logo-reveal/intro clip) used in some exploration passes — not yet pulled into the actual site build.

## Design tokens — locked

`src/styles/tokens.css`, defined via Tailwind v4's `@theme` (so every value below is also a Tailwind utility — `bg-ink`, `text-gold`, `font-display`, etc. — change the file, everything updates):

- **Color**, sampled directly from the real flyer: `--color-ink #1c1712` (charcoal ground), `--color-paper #e9daaf` / `--color-paper-2 #f4ebd2` (aged paper, two warmths), `--color-gold #d9a441` ("GUACAMAYO"), `--color-orange #e2622c` ("FUNKY" / macaw wing), `--color-teal #2c8c87` / `--color-teal-deep #1b5551` ("LATIN" / macaw face), `--color-rust #b8431f`, `--color-red #c23b22`.
- **Type**: `--font-display` = Luckiest Guy (the groovy bubble face, matches the flyer lettering), `--font-display-alt` = Passion One (secondary bubble weight, used for section headings), `--font-body` = Archivo, `--font-mono` = Space Mono (labels, dates, utility text).

No serif anywhere, deliberately — this is a loud, playful, mascot-brand identity, not an editorial one.

## How we got here — the exploration trail

Chronological, all archived in the sibling `ui-lab` repo (`ui-lab/artifacts/guacamayo-band/`) so rejected ideas aren't lost:

1. **`ten-directions.html`** — first pass, 10 unrelated aesthetic universes (city pop, faceted-shatter, arcade neon, hanko-stamp, Japanese-design-trend crossovers, etc.), checked against Doug's other 4 sites for differentiation. **Rejected** — Doug wanted the band's own existing loud flyer palette instead of an invented identity.
2. **`ten-flyer-variations.html`** — 10 compositions locked to the real flyer's own palette/lettering (screen-print, marquee, ticket stub, wall-of-flyers, split-flap, etc.) instead of new palettes.
3. **`ten-hero-openings.html`** — same 10 rebuilt using the *real* logo PNG and flyer JPG (not recreated approximations), identical copy across all ten so only composition was being compared.
4. **`ten-full-page-backdrops.html`** — the real design problem: a photographic background behind real body text hurts legibility. 10 different solutions (tile-and-dim, fade-to-flat, duotone, ghost watermark, vignette window, vertical spine, bleed-past-nav, progressive-duotone-fade), built as scrollable previews using a sticky-background CSS technique so the backdrop persists past the hero into real content sections.
5. **`ten-video-backdrops.html`** — same problem, with the real promo clip in motion. Two ideas here don't exist in the image set: a freeze-frame-until-hover hero (mobile-data-conscious by design) and a real split-screen with footage on one side.

**Chosen: No. 02 from set 4, Full-Bleed Pin** — one full-bleed print of the flyer pinned behind the whole page via `position: sticky`, with a dark gradient scrim for legibility. Implemented in `src/components/PageBackdrop.astro`.

Doug's other four sites (dougrosenberg.com, dougrosenbergdev.com, haxbyte.com, arborkin.com) are all fairly restrained/moody — this project was explicitly built to be loud and maximalist instead, so it doesn't rhyme with any of them.

## Concrete choices — locked and built (2026-08-30)

- **Backdrop:** `PageBackdrop.astro` — flyer image pinned via sticky positioning + negative-margin content trick, so it stays visible through the hero and only gets covered once a section with its own opaque background (`bg-ink`) scrolls over it.
- **Hero:** real logo (large — bigger than the original prototype sizing, per direct feedback), "FUNKY LATIN GROOVE" in the flyer's own three colors, evergreen tagline ("Live in Chicago" only). **Deliberately no specific show info (venue/date) in the hero** — that goes stale and belongs in the Shows section instead.
- **Nav:** as of 2026-08-31, a real global persistent nav — `Nav.astro` renders once from `Layout.astro` (not per-page, not nested in Hero anymore) as `position: fixed`, so it stays visible across the whole scroll instead of leaving with the hero. Restrained glassmorphism (`bg-ink/40` + `backdrop-blur-md`, no bright frosted panel/glow border) — a deliberate ask despite glassmorphism being named in `career-development`'s own checklist as a generic AI-site tell; kept tied to the real palette instead of a generic default. Real logo (not just text) top-left, linking home. All link hrefs are prefixed with the home path (`/guacamayo-band/#about`, not bare `#about`) so they still resolve correctly from non-index pages like `404.astro`. `html { scroll-padding-top }` in `global.css` keeps anchor-jump targets from landing hidden under the fixed bar. **Mobile note:** adding the real logo image pushed the link row past fitting at 375px on the original spacing; tightened mobile-only gap/tracking/logo-size to fit comfortably ≥375px, with the existing `overflow-x-auto` handling the rare <375px case gracefully (a few px short at 320px, not a hard break).
- **Shows:** `Shows.astro` — a chronological ticket-stub list grouped by month, deliberately **not** a literal calendar grid. Fans scan for "what's the next show," not "what does September look like," so a scannable list wins on usability even though the section is conceptually a calendar. As of PR #7, `src/data/shows.ts` fetches real gig data from the GigSync backend (a separate SaaS project, `https://gigsync-backend.doug-rosenberg.workers.dev/gigs?client=guacamayo`) **at build time**, falling back to a static placeholder array if the fetch fails/times out (5s)/returns nothing — this repo never needed to change `Shows.astro` itself, since the data shape was designed for exactly this swap back when it was still dummy data. **Known gap:** GigSync's current schema has no ticket-URL field, so every real (non-fallback) show renders "Ask about tickets" linking to `#book` instead of a dead label (fixed alongside a real contrast/touch-target failure on that element in PR #9) — not a bug, GigSync just doesn't have that field yet.
- **About:** `About.astro`, placed right after Hero (establishes who the band is before Music/Shows). Short bio paragraph plus a member/instrument grid mirroring the flyer's own name-then-instrument credit format. Bio copy is a first draft built only from verified facts — no invented formation story, influences, or history — flagged in `TODO.md` to be replaced with the band's actual voice.
- **Music:** `Music.astro` — a chained YouTube playlist embed (`?playlist=id2,id3,...` on one iframe) rather than a saved channel playlist, since that needs no YouTube login to set up and gives the native player's next/prev + autoplay chaining for free. Embed is `aspect-[9/16]`, not the default 16:9, because the source videos are Shorts — a 16:9 frame would letterbox them. Swapping to a real saved playlist later (if the band makes one) is a one-line `src` change.
- **Press:** `Press.astro` — pitch line + real downloadable assets (`public/press/`, original-quality copies of the logo/flyer, not the resized versions `astro:assets` generates for on-page use) + the same booking email repeated in context. Deliberately no press quotes/reviews — none exist yet, and fabricating them would violate the no-invented-facts rule already applied to the About bio and Shows dummy data. The repeated email isn't treated as a second competing CTA (see the Content/Launch Basics checklist item) since it's the same action in a different context (a press kit is often shared/downloaded standalone from the rest of the page), not a different ask.
- **404 page:** `src/pages/404.astro` — same pinned-backdrop treatment as the real page, not a bare default. Astro auto-routes any file at `src/pages/404.astro` to the 404 handler; GitHub Pages independently needs a `404.html` present in the published output to serve it for unmatched paths, which the build already produces — verified with `astro preview`, not just assumed from the file existing.
- **og:image:** `public/og-image.jpg`, a real 1200×630 crop of the actual flyer (not the logo stretched to fit, not a placeholder) — same macaw/lettering the rest of the brand uses, so a shared link looks recognizably *this band* in a social preview, not generic.

## Essential sections for a musician/band site — the review that's driving what gets built next

Objective pass done mid-project (see chat history for the full reasoning): cross-referencing Bandzoogle's own template taxonomy against Doug's solo site's real structure. Priority order for *this* band specifically (already gigging, so booker-facing content matters more than for a hobbyist): Hero → Music/Listen → Shows → **Press/EPK** → About → Photo gallery → Booking/contact. Press/EPK was ranked above About and Gallery specifically because it's the tool that gets a working band booked, not a generic nice-to-have.

**Status (2026-08-31): every section above is built except Photo gallery**, which is genuinely blocked on having real photos — see `TODO.md`. All content is basic/first-draft by design (dummy show dates, draft bio copy, placeholder booking inbox) per the "get basic content in place tonight, heavy revisions later" instruction — not a signal anything here is final.

**The "spice" answer, for future reference:** don't add sections beyond that standard list to make the site feel distinctive — get spice from *how* the standard sections are executed, using the exploration trail above (ticket-stub, split-flap, wall-of-flyers, etc.), not by inventing new site sections. Also decided against infinite scroll (wrong pattern for finite curated content), against adding more parallax beyond the one pinned-backdrop moment, and in favor of official platform embeds (Spotify/YouTube) over a custom-built audio player for the eventual Music section.

## Reference

- `ui-lab` repo — archived exploration artifacts, see above. Check there before re-exploring a direction from scratch.
- `career-development/docs/SITE_QUALITY_CHECKLIST.md` — the canonical 66-item pre-launch checklist; `docs/QUALITY_CHECKLIST.md` in this repo tracks Guacamayo's actual status against it.
- [[doug-project-ecosystem]] (Claude memory) — sibling repos, shared conventions (no-commits-during-work-hours, avoid-AI-tells design philosophy).
