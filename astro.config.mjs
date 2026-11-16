import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://time-series-modeling.github.io',
  vite: {
    plugins: [tailwindcss()],
  },
  // The Day 2 pages moved under the named workshop (packt-2026-11); keep the old public URLs working.
  redirects: Object.fromEntries(
    ['', '/data', '/methods', '/models', '/results'].flatMap((p) => [
      [`/workshops/day2${p}`, `/workshops/packt-2026-11/day2${p}`],
      [`/zh/workshops/day2${p}`, `/zh/workshops/packt-2026-11/day2${p}`],
    ]),
  ),
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
