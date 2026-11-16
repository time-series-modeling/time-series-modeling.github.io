# Time Series with PyTorch — Book Landing Page

A professional landing page for the book *Time Series with PyTorch* by Graeme Davidson and Lei Ma.

## Stack

- **[Astro 5](https://astro.build)** — Static site generator
- **[Tailwind CSS v4](https://tailwindcss.com)** — Utility-first CSS (Starwind UI-compatible design)
- Multi-language: **English** and **Chinese** (易于扩展 / easily extensible)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, book introduction, purchase links, author teasers, feedback CTA |
| `/authors` | Full author bios for Graeme Davidson and Lei Ma |
| `/erratum` | Dedicated erratum page with correction table |
| `/feedback` | Feedback channels (GitHub issues, discussions, email) and social links |
| `/workshops/day2` | Day 2 workshop hub: four looping explainer videos and links to the interactive pages |
| `/workshops/day2/data`, `/methods`, `/results` | Interactive Day 2 figures (dataset, method widgets, lab results), rendered by `src/scripts/day2-widgets.js` from `src/data/day2.json` |
| `/workshops/day2/models` | One interactive widget per Day 2 model (baselines, AutoETS, LightGBM, N-BEATS, NHITS, DLinear, covariates, Chronos-2), rendered by `src/scripts/day2-models.js` |
| `/zh/` | Chinese home |
| `/zh/authors` | Chinese authors page |
| `/zh/erratum` | Chinese erratum page |
| `/zh/feedback` | Chinese feedback page |

## Development

```bash
npm install
npm run dev       # dev server at http://localhost:4321
npm run build     # production build → dist/
npm run preview   # preview production build
```

## Adding a New Language

1. Create `src/i18n/<locale>.ts` following the `Translations` type from `src/i18n/en.ts`.
2. Import and register it in `src/i18n/index.ts` (`translations` map + `SUPPORTED_LOCALES`).
3. Create `src/pages/<locale>/` and copy the pages from `src/pages/zh/`, updating the locale variable.

## Deployment

Automatically deployed to GitHub Pages via `.github/workflows/deploy.yml` on every push to `main`.