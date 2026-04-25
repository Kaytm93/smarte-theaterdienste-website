---
tags: [architektur, adr]
---

# Tech-Stack & Architekturentscheidungen

| Bereich | Wahl | Warum |
|---|---|---|
| Framework | **Next.js 16** (App Router, RSC) | Turbopack default, native i18n-Patterns, top SEO, Vercel-First |
| Sprache | **TypeScript strict** | Type-Safety end-to-end, Supabase generated types |
| Styling | **Tailwind v4** + Tokens | Speed, atomic, design-system-friendly |
| UI-Basis | **shadcn/ui** (Radix unter der Haube) | Copy-Paste statt Library, volle Kontrolle, kein Lock-in |
| i18n | **next-intl** | App-Router-native, RSC-fähig, type-safe Messages, pathnames-Map |
| Animation | **GSAP + ScrollTrigger** | apple-like reveals, performant, kein WebGL-Overkill |
| Datenbank | **Supabase (Postgres)** | RLS, generierte Types, Studio als Admin-UI, Webhooks für ISR |
| Forms | **Server Actions** (+ Resend) | kein eigenes API-Layer, server-only secrets |
| Hosting | **Vercel** | Preview pro Branch, ISR + on-demand revalidate, edge cache |
| Package Manager | **pnpm** | schnell, disk-effizient |

## Rendering-Strategie

| Bereich | Strategie |
|---|---|
| Landing, Projekt, Standards, Beteiligung, Ansprechpersonen, Impressum, DS | **SSG** |
| Termine, Blog, FAQ, Partner-Map | **ISR** (revalidate: 3600 + on-demand via Webhook) |

## Next.js 16 Besonderheiten (Pflicht-Wissen)

- `middleware.ts` heißt jetzt **`proxy.ts`** (Funktion `proxy`); nur `nodejs`-Runtime
- `params`/`searchParams`/`cookies()`/`headers()` sind **Promises** → `await`
- `revalidateTag(tag, profile)` – zweites Argument verpflichtend (`'max'`, …)
- `next lint` entfernt → ESLint-CLI direkt
- `images.domains` deprecated → `images.remotePatterns`

## ADRs (kurz)

- **shadcn statt Material/Ant**: Wir wollen ein eigenes Design (apple-like, kulturaffin), nicht ein Stock-Look
- **next-intl statt eigenem i18n**: Spart Wochen, deckt Pluralisierung/Datumsformat/RSC ab
- **SVG-Karte statt Leaflet**: ~20–50 Partner, keine Geo-Search nötig, Performance + GSAP-Hooks
- **Obsidian-Vault im Repo**: Plan und Code bleiben synchron, single source of truth

## Verwandte
- [[02_Architektur/db-erd]]
- [[02_Architektur/i18n]]
- [[03_Komponenten/animation-plan]]
