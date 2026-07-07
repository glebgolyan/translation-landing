# Babylon Translation Agency — Website

Production-ready, SEO-optimized single-page website built with **Next.js 16 (App Router)**,
**React 19** and **TypeScript**. Fully server-rendered, statically prerendered in
10 languages, with light/dark themes and RTL support.

## Quick start

```bash
npm install
npm run dev     # development, http://localhost:3000
npm run build   # production build (prerenders all 10 locales)
npm start       # serve the production build
```

## Architecture

```
app/
  [locale]/
    layout.tsx           Root layout (html/body, fonts, metadata, JSON-LD, theme script)
    page.tsx             The landing page (Server Component)
    opengraph-image.tsx  OG image generated at build time (1200×630)
    twitter-image.tsx    Twitter image (reuses the OG design)
  sitemap.ts             Sitemap with per-locale hreflang alternates
  robots.ts              robots.txt
  manifest.ts            Web app manifest
  icon.svg               Favicon (vector)
  apple-icon.tsx         Apple touch icon (generated PNG)
components/              Reusable UI + SEO components (JsonLd, Header, MapEmbed, …)
lib/
  site.ts                ★ Single source of truth: domain, phone, email, address, hours
  i18n/config.ts         Locales, default locale, RTL set, native names
  i18n/dictionaries.ts   Lazy per-locale dictionary loader
  i18n/locales/*.json    Translations (uk default + 9 more)
proxy.ts                 Locale detection & redirect (Next 16 convention, ex-middleware)
styles/globals.css       Design tokens, themes, layout
```

## How it works

- **i18n** — every locale lives at its own URL (`/uk`, `/en`, `/zh`, …). `proxy.ts`
  detects the visitor's language on first visit (cookie → `Accept-Language` → `uk`)
  and 307-redirects the bare `/`. The language switcher navigates between real
  routes and persists the choice in the `NEXT_LOCALE` cookie. `hreflang`
  alternates (+ `x-default`) are emitted on every page and in the sitemap.
  Arabic and Urdu render with `dir="rtl"`; the layout uses CSS logical
  properties so it mirrors automatically.
- **Rendering** — everything is a Server Component except two tiny widgets:
  the language switcher and the theme toggle. All 10 pages are prerendered
  as static HTML at build time (SSG).
- **Themes** — an inline pre-paint script applies the stored theme or the
  system preference (no flash); the toggle persists to `localStorage`.
- **SEO** — one `H1`, logical `H2` hierarchy, semantic HTML, canonical URLs,
  Open Graph + Twitter cards, generated OG/Twitter images, JSON-LD
  (`Organization`/`LocalBusiness` with address, geo, opening hours, services),
  sitemap.xml, robots.txt, manifest, favicon set, `theme-color`.
- **Performance** — no client-side data fetching, ~0 unnecessary hydration,
  keyless lazy-loaded Google Maps iframe (no Maps JS API), self-hosted
  subsetted variable fonts, fixed aspect ratios (no CLS).

## Common changes

| What                      | Where                                          |
| ------------------------- | ---------------------------------------------- |
| Domain, phone, email, address, hours | `lib/site.ts`                       |
| Texts / translations      | `lib/i18n/locales/*.json`                      |
| Add/remove a language     | `lib/i18n/config.ts` + a new locale JSON + entry in `lib/i18n/dictionaries.ts` |
| Colors, spacing, fonts    | `styles/globals.css` (token variables at top)  |
| Logo                      | `components/Logo.tsx` and `app/icon.svg`       |
| Opening-hours display     | `components/WorkingHours.tsx` (+ `lib/site.ts` for schema) |

## Notes

- The logo is a deliberate placeholder (a minimal ziggurat mark) designed to be
  swapped in one place.
- Translations were machine-authored and are launch-ready; a native-speaker
  review is recommended for maximum polish.
- Deploy anywhere Next.js runs (Vercel, Node server, Docker). No environment
  variables or API keys are required.
