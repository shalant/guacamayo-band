// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages (no custom domain yet) serves this from a subpath:
  // https://<your-username>.github.io/guacamayo-band/ — adjust the repo
  // name below if it ends up different on GitHub. Delete `site`/`base`
  // entirely once a custom domain is pointed at whatever host you land on.
  site: 'https://shalant.github.io',
  base: '/guacamayo-band',
  vite: {
    plugins: [tailwindcss()]
  }
});