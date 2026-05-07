# Session 16 — 2026-05-07 — M9: PWA-Manifest, Per-Post-OG, Lighthouse-CI

## Auslöser

User bestätigte, Vercel-GitHub-Integration im Dashboard wiederhergestellt zu haben. Aufgabe: nächsten Schritt finden, der ohne User-Assets/Texte machbar ist. Aus drei DASHBOARD-Optionen Kombi gewählt.

## Scope

Drei optionale M8-Erweiterungen aus dem DASHBOARD, die alle ohne User-Lieferungen umsetzbar sind:

1. PWA-Manifest (`/manifest.webmanifest`)
2. Per-Post OG-Images für Blog-Details
3. Lighthouse-CI als GitHub-Action

## Umsetzung

### 1. PWA-Manifest

- **Neu:** `src/app/manifest.ts`
- Default-Export liefert `MetadataRoute.Manifest`.
- `name`/`short_name`/`description` aus `messages/de.json` (`meta.siteName` / `meta.siteDescription`). Manifest ist Top-Level (nicht locale-prefixed), darum Default-Locale `de` als Sprache (`lang: "de"`).
- `theme_color: "#2660d8"` (Datenraum-Blau, ADR-22), `background_color: "#ffffff"`, `display: "standalone"`, `scope: "/"`, `start_url: "/"`.
- Icons: `[{ src: "/icon", sizes: "32x32", type: "image/png" }, { src: "/favicon.ico", sizes: "any", type: "image/x-icon" }]`. Re-Use des existierenden `src/app/icon.tsx` (32×32 ImageResponse, M8).
- Routing: `manifest` ist im Proxy-Matcher (`src/proxy.ts`) bereits als Top-Level-Convention-File ausgeschlossen, daher kein Locale-Redirect-Loop.

### 2. Per-Post-OG-Image

- **Neu:** `src/app/[locale]/blog/[slug]/opengraph-image.tsx`
- Liest `params.locale` und `params.slug` (Promise, Next.js 16). Locale-Validierung via `hasLocale(routing.locales, locale)`, sonst Fallback auf `routing.defaultLocale`.
- Lädt Post via `getPostBySlug(slug, safeLocale)` aus `lib/supabase/queries.ts`. Bei nicht-konfiguriertem Supabase oder unbekanntem Slug Fallback auf `siteName`.
- Layout: derselbe Datenraum-Blau-Verlauf wie Top-Level-OG, Title (fontSize 80, max 1040px, line-height 1.05), darunter lokalisiertes `published_at` (`toLocaleDateString` mit `de-DE`/`en-US`), unten siteName + Locale-Badge.
- Satori-Patterns gemäss MUSTER.md eingehalten: alle `display: "flex"` (kein `inline-block`), nur Hex-Farben (kein OKLCH), keine Mixed-Children. Body-Stream-Validierung verwendet (Satori reportet 200 auch bei broken Stream).
- Metadata-Pfad: Page `[locale]/blog/[slug]/page.tsx` setzt `openGraph.images` nur wenn `coverImageUrl` vorhanden ist. Ohne Cover greift Next.js automatisch das hier generierte File-Convention-OG.

### 3. Lighthouse-CI

- **Neu:** `.github/workflows/lighthouse.yml` und `.github/lighthouserc.json`.
- Trigger: `workflow_dispatch` (manuell) + `schedule: cron "0 6 * * 1"` (Mo 06:00 UTC). **Bewusst kein Push-Trigger** — würde mit Vercel-Auto-Deploy in Race-Condition geraten und gegen alten Stand laufen.
- Action: `treosh/lighthouse-ci-action@v12`.
- URLs: 6 Production-Routen (DE-Landing, EN-Landing, DE-Blog-Liste, DE-Blog-Detail, DE-Mitwirkung, DE-FAQ).
- Asserts in `lighthouserc.json` (Preset `desktop`):
  - `categories:performance`: warn bei <0.9
  - `categories:accessibility`: error bei <0.95
  - `categories:best-practices`: warn bei <0.9
  - `categories:seo`: error bei <0.95
- `temporaryPublicStorage: true` hostet Reports öffentlich für 7 Tage, kein eigener LHCI-Server nötig.

### Nebenfund + Fix

- **Bug:** `src/app/[locale]/blog/[slug]/page.tsx` setzte ein `twitter`-Object ohne `card`-Field. Da Page-`twitter` das Layout-`twitter` komplett überschreibt (kein Field-Merge), fiel `twitter:card` auf Next.js-Default `summary` zurück.
- **Fix:** `card: "summary_large_image"` explizit in der Page gesetzt.
- **Verifikation:** `<meta name="twitter:card" content="summary_large_image"/>` im gerenderten HTML.

## Verifikation

- `pnpm typecheck` clean
- `pnpm lint` clean
- `pnpm build` clean — neue Routen: `/manifest.webmanifest` ○ Static, `/-/opengraph-image` ƒ Dynamic, `/-/blog/-/opengraph-image` ƒ Dynamic
- Dev-Server (Port 3000):
  - `GET /manifest.webmanifest` → 200, `application/manifest+json`, valides JSON mit `name: "Smarte Theaterdienste"`, `theme_color: "#2660d8"`
  - `GET /de/blog/erste-pilotpartner-gewonnen/opengraph-image` → 200 PNG 1200×630 RGBA, 66.5 kB Body
  - `GET /en/blog/kickoff-datenraum-kultur/opengraph-image` → 200 PNG 1200×630 RGBA, 83.7 kB Body
  - `GET /de/opengraph-image` → 200 PNG 1200×630 RGBA, 86.9 kB Body (Bestand)
- HTML der Blog-Detail enthält:
  - `<link rel="manifest" href="/manifest.webmanifest"/>`
  - `og:image` zeigt auf Per-Post-Pfad mit `og:image:width=1200`/`og:image:height=630`
  - `twitter:card=summary_large_image`
- Keine Server-Errors in Preview-Logs.

## Restposten / Folgeschritte

- Lighthouse-CI ist erst nutzbar, sobald die Action gegen die Production-URL gelaufen ist. Ein erster manueller `workflow_dispatch` validiert den Workflow.
- Vercel-GitHub-Auto-Deploy wird mit dem nächsten Push erstmals real validiert.
- Per-Post-OG ist nur sichtbar, solange Posts kein echtes `cover_image_url` in Supabase haben. Sobald echte Cover-Bilder gesetzt sind, gewinnt das `images:[coverImageUrl]`-Override im Page-`generateMetadata` — gewünschtes Verhalten, dokumentiert.
- User-Restposten gemäss `GO_LIVE_CHECKLIST.md` bleiben unverändert: Hero-Visual, Blog-Cover, Portraits, Partner-Logos, Custom-Domain-DNS, finale Impressum-/Datenschutztexte.

## Geänderte Dateien

- `src/app/manifest.ts` (neu)
- `src/app/[locale]/blog/[slug]/opengraph-image.tsx` (neu)
- `src/app/[locale]/blog/[slug]/page.tsx` (twitter.card-Fix)
- `.github/workflows/lighthouse.yml` (neu)
- `.github/lighthouserc.json` (neu)
- `SMARTE-THEATERDIENSTE/DASHBOARD.md`
- `SMARTE-THEATERDIENSTE/KONTEXT.md`
- `SMARTE-THEATERDIENSTE/CHANGELOG.md`
- `SMARTE-THEATERDIENSTE/PROBLEME.md`
- `SMARTE-THEATERDIENSTE/verlauf/SESSION_2026-05-07_M9-PWA-OG-Lighthouse.md` (diese Datei)
