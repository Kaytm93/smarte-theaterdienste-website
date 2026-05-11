# Session 2026-05-11 — M15 Production-Deploy

## Anlass

User-Wunsch: „Website neu deployen und pushen und so".

## Vorgehen

- Git-Status geprüft: `main` lag bereits auf `origin/main`; nur bekannte untracked lokale Artefakte waren vorhanden (`.claude/worktrees/`, `.playwright-cli/`, `output/`, Finder-Duplikate in `public/`).
- `git push origin main` erneut ausgeführt; Ergebnis: `Everything up-to-date`.
- Manuellen Vercel-Production-Deploy aus dem Hauptrepo gestartet:
  - Befehl: `pnpm dlx vercel@latest deploy --prod --yes`
  - Deploy: `dpl_A36wKwjUuXfMgNbRsXvoCHM3sWEf`
  - Status: READY
  - Basis-HEAD vor dieser Doku-Session: `f34353e`
  - Direkte URL: `https://smarte-theaterdienste-website-rmphiht5x-kaytm93s-projects.vercel.app`
  - Öffentlicher Alias: `https://smarte-theaterdienste-website.vercel.app`

## Verifikation

Remote-Build:

- Next.js 16.2.4 erkannt.
- TypeScript abgeschlossen.
- Static Generation: 37/37 Pages.
- Build completed in 30 s; Deployment completed nach 53 s.

Production-Smoke gegen `https://smarte-theaterdienste-website.vercel.app`:

- `/de` → HTTP 200
- `/de/ansprechpersonen` → HTTP 200
- `/de/blog` → HTTP 200
- `/de/beteiligung/mitwirkung` → HTTP 200
- `/en` → HTTP 200
- `/sitemap.xml` → HTTP 200
- `/robots.txt` → HTTP 200

HTML-Freshness-Checks:

- `/de` enthält `lg:grid-cols-3`.
- `/de` enthält `theater-parade`.
- `/de` enthält `JSON · ORIF · Datenraum Kultur`.
- `/de/ansprechpersonen` enthält `loading="eager"`.

## Ergebnis

M15 ist production-live. Die in Session 25 behobenen visuellen und Image-Ladepfad-Fixes sind auf dem öffentlichen Vercel-Alias sichtbar. Offene Projektschritte bleiben Custom-Domain-DNS auf Vercel und finale Impressum-/Datenschutztexte.
