# Deployment

**Current host: GitHub Pages** (free, no domain purchased yet). Deploys automatically via GitHub Actions on every merge to `master`.

## How it works now

- `.github/workflows/deploy.yml` builds the site with `withastro/action` (pinned to **Node 22** — Astro 7 requires `>=22.12`, and the Actions runner defaults to Node 20, which fails silently-ish with a version error) and publishes it via `actions/deploy-pages`.
- The workflow triggers on `push: branches: [master]`. Since branch protection now requires all changes to land via PR, in practice this means: **merging a PR is what deploys**, not any individual commit.
- `astro.config.mjs` sets `site: 'https://shalant.github.io'` and `base: '/guacamayo-band'` because GitHub Pages serves a repo without a custom domain from a subpath (`shalant.github.io/guacamayo-band/`), not the root. Every internal link/asset needs that base path folded in, which Astro handles automatically as long as `base` is set correctly.
- Live at: <https://shalant.github.io/guacamayo-band/>
- Compression: GitHub Pages serves gzip only, not Brotli (verified directly against a sibling live site during this project's design phase — see `docs/DESIGN_NOTES.md` history). Not worth fixing now; it's a hosting-level thing, not a code change.

## Moving to Cloudflare Pages later

This is a **swap, not a migration** — Cloudflare Pages has its own git-integration build system, so the plan is to *replace* the GitHub Actions workflow, not adapt it:

1. Buy the domain (whenever that happens).
2. In the Cloudflare dashboard, connect this GitHub repo directly (Pages → Create project → Connect to Git). Cloudflare auto-detects Astro and runs `npm run build`, publishing `dist/` — no workflow file needed on Cloudflare's side.
3. Delete `.github/workflows/deploy.yml` and remove `site`/`base` from `astro.config.mjs` (a custom domain serves from the root, not a subpath — see the comment already in that file).
4. Point the domain's DNS at Cloudflare per their setup flow.
5. Brotli, HTTP/3, and edge caching come free at that point with zero code changes — see the Blazor-vs-Astro payload comparison earlier in this project's chat history for why that matters.

Nothing about the component code, tokens, or content changes in this move — only the two files above.

## Lessons learned (so the next deploy doesn't repeat them)

- **Node version**: always pin `node-version` explicitly in `withastro/action` — don't rely on the runner default.
- Enabling GitHub Pages in repo settings (Settings → Pages → Source → GitHub Actions) is a one-time manual step; the workflow can't do that part of itself.
