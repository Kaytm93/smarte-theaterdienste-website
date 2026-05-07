# Session 12 — 2026-05-07: M6 Production-Validation

## Ausgangslage

Session 11 hatte M6 lokal fertiggestellt: ComicStrip vertical stagger, Hero-Stagger + Akzent-Blob, einheitliche Card-Hover, View Transitions API und Layout-globaler `ScrollTriggerRefresher`. Lokal waren Typecheck, Lint, Build und Browser-Checks grün. Offen war der Production-Deploy.

## Phase 1 — Lokale Gates

- `pnpm typecheck` clean
- `pnpm lint` clean
- `pnpm build` clean

Build-Details:
- Next.js 16.2.4 mit Turbopack
- `experimental.viewTransition` aktiv
- 36/36 statische Pages generiert
- Blog/FAQ/Termine/Mitwirkung weiter ISR mit `1m / 1y`

## Phase 2 — Production-Deploy

Befehl:

```bash
pnpm dlx vercel@latest deploy --prod --yes
```

Ergebnis:
- Deploy-ID: `dpl_5fe7wA8PULdKp8UT8JodihG5YXv2`
- Build-URL: `https://smarte-theaterdienste-website-ikpqd33d9-kaytm93s-projects.vercel.app`
- Alias: `https://smarte-theaterdienste-website.vercel.app`
- Remote-Build clean; 36/36 statische Pages generiert; `experimental.viewTransition` auch remote aktiv

Deployment-Basis:
- `7f3ad43` docs(vault): CHANGELOG mit Session-11-Commit-SHA verlinken
- M6-Code darin enthalten über Parent-Commit `860a761`

## Phase 3 — Production-Smoke

Über `/usr/bin/curl` geprüft:

```text
200 /de
200 /en
200 /de/blog
200 /en/blog
200 /de/blog/kickoff-datenraum-kultur
200 /en/blog/kickoff-datenraum-kultur
200 /de/beteiligung/mitwirkung
200 /en/participation/contribute
200 /de/opengraph-image
200 /en/opengraph-image
200 /icon
200 /sitemap.xml
200 /robots.txt
```

## Phase 4 — Browser-Check

Playwright-CLI gegen Production:

- `/de` rendert Hero mit Titel `Smarte Theaterdienste`, Akzent-Blob und 4 ComicStrip-Frames.
- Nach Scroll + 1500 ms sind alle `[data-comic-frame]`-Elemente sichtbar: `opacity: 1`, `transform: matrix(1, 0, 0, 1, 0, 0)`.
- CSSOM enthält Reduced-Motion-Regel für `::view-transition`.
- Mobile 375×812: Comic-Frames gestapelt, Frame-Breite 328 px, kein Horizontal-Overflow.
- `/de/blog → /de/blog/erste-pilotpartner-gewonnen` per Link-Klick funktioniert.
- Detailseite rendert `Erste Pilotpartner gewonnen`.
- Console nach Navigation: 0 Errors, 0 Warnings.

## Einschränkung

ViewTransition-Morphs sind live weiterhin nur strukturell prüfbar, nicht visuell. Grund: Die Live-Posts haben noch keine `cover_image_url`; damit rendert kein Cover-Pair für `post-cover-${slug}`. Sobald Cover-Bilder gepflegt sind, kann das Morph-Verhalten real geprüft und ggf. gefilmt werden.

## Geänderte Dateien

Nur Vault-/Dokumentationsdateien:

```text
SMARTE-THEATERDIENSTE/DASHBOARD.md
SMARTE-THEATERDIENSTE/KONTEXT.md
SMARTE-THEATERDIENSTE/PROBLEME.md
SMARTE-THEATERDIENSTE/CHANGELOG.md
SMARTE-THEATERDIENSTE/verlauf/SESSION_2026-05-07_M6-Production-Validation.md
```

Keine Code-Dateien wurden geändert.

