## Docs

Read `docs/DESIGN_NOTES.md` before proposing a new visual direction or design tokens — it records what's already locked and what's already been explored and rejected. `docs/TODO.md` tracks open work. `docs/DEPLOYMENT.md` covers hosting/CI-CD, including the planned Cloudflare move.

**Every PR must update relevant docs before it's considered ready to merge** — if a change affects design decisions, deployment, or open work, the corresponding doc gets updated in the same PR, not after.

## Workflow

**All changes go on a branch — no direct commits to `master`.** Branch protection enforces this on GitHub (including for the repo owner), so a direct push will simply be rejected. Open a PR, update docs as needed, merge via `gh pr merge` (no required approvals — it's a solo project, the PR is the checkpoint, not a review gate). Merging to `master` is what triggers the GitHub Pages deploy — see `docs/DEPLOYMENT.md`.

## Git constraint

**No commits 8:30am–5pm CT, Monday–Friday** — Doug's day-job hours. Same rule as the `haxbyte` and `dougrosenbergmusic` repos. Stage/work freely during the day; hold commits until after 5pm CT or on weekends.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
