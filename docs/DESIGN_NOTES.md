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
- **Nav:** minimal text nav, not the flyer's own type — Music / Shows / Book.

## Reference

- `ui-lab` repo — archived exploration artifacts, see above. Check there before re-exploring a direction from scratch.
- [[doug-project-ecosystem]] (Claude memory) — sibling repos, shared conventions (no-commits-during-work-hours, avoid-AI-tells design philosophy).
