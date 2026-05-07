# Session 2026-05-07 — M9 Go-live-Handoff

## Ausgangslage

M5, M6, M7 und M8 sind production-validiert. Die naechsten Schritte sind nicht mehr primaer technische Bugs, sondern externe Lieferungen und Dashboard-Aktionen:

- echte Assets fuer Hero, Blog-Cover, Team und Partner
- Vercel-GitHub-Integration
- Custom Domain / DNS
- finale Impressum-/Datenschutztexte und Kontaktadresse

## Durchgefuehrt

- Projekt-Vault gelesen: `START_HIER.md`, `KONTEXT.md`, `DASHBOARD.md`, `PROBLEME.md`, `MUSTER.md`, `INHALTE.md`, `CHANGELOG.md`, `ENTSCHEIDUNGEN.md`.
- Projektstruktur geprueft:
  - `public/` enthaelt aktuell nur Standard-SVGs und `maps/germany.svg`.
  - Team-Content referenziert bereits Portraitpfade unter `/team/*.jpg`, `ContactCard` rendert aktuell aber bewusst Initialen-Fallback.
  - Footer kennt Logo-Zielpfade unter `/logos/*.svg`, rendert aber Text-Fallback.
  - Blog-Posts haben `cover_image_url = null`; ViewTransition-Morphs sind deshalb strukturell, aber nicht sichtbar.
  - Impressum/Datenschutz sind sichtbare TODO-Platzhalter.
- Aktuelle externe Quellen geprueft:
  - Vercel GitHub-Integration und Repo-Permissions.
  - Vercel Custom-Domain-/DNS-Ablauf.
  - Vercel Environment Variables.
  - Legal-Hinweise zu `§ 5 DDG` und Art. 13 DSGVO.
- Neue `GO_LIVE_CHECKLIST.md` angelegt:
  - exakte Asset-Dateinamen und Zielpfade
  - Bildformat-/Groessenanforderungen
  - Supabase-`cover_image_url`-Pflege
  - Vercel-GitHub-Verbindung
  - Custom Domain/DNS
  - `NEXT_PUBLIC_SITE_URL` und Revalidate-Folgearbeiten
  - Legal-/Kontakt-Lieferumfang
- `src/content/{de,en}/legal.json` aktualisiert:
  - `§ 5 TMG` -> `§ 5 DDG`
- Vault aktualisiert:
  - `START_HIER.md`
  - `KONTEXT.md`
  - `DASHBOARD.md`
  - `PROBLEME.md`
  - `CHANGELOG.md`

## Verifikation

- JSON-Parse fuer `src/content/{de,en}/legal.json`
- `pnpm typecheck`
- `pnpm lint`
- `pnpm build`

## Offener naechster Schritt

Kay liefert gemaess `GO_LIVE_CHECKLIST.md`:

1. Hero-Visual, Blog-Cover, Portraits, Partner-Logos inkl. Rechte/Credits.
2. Vercel-GitHub-App-Zugriff auf `Kaytm93/smarte-theaterdienste-website`.
3. Domain-Entscheidung und DNS-Zugriff.
4. Finale Impressum-/Datenschutztexte und bestaetigte Kontaktadressen.

Danach kann Codex Assets einbauen, Supabase-URLs setzen, Legal-TODOs ersetzen, Domain-Env aktualisieren, deployen und gegen die finale Domain testen.
