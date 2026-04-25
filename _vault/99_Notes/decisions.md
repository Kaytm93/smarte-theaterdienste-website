---
tags: [adr, entscheidungen]
---

# Entscheidungsprotokoll

## 2026-04-25 — M1 Kickoff

| ADR | Entscheidung | Begründung |
|---|---|---|
| ADR-01 | Next.js **16** (nicht 15 wie initial geplant) | `create-next-app` lieferte 16.2.4; Breaking Changes berücksichtigt |
| ADR-02 | `pnpm` (via `npm install -g pnpm`) | User-prefix nvm, kein sudo nötig |
| ADR-03 | Supabase-CLI als **dev-dep**, nicht global | npm-global wird vom Postinstall-Script verboten |
| ADR-04 | GitHub-Repo **manuell** im Web-UI anlegen | `gh` CLI nicht installiert, Homebrew-Install interaktiv; SSH-Key existiert bereits → `git push` reicht |
| ADR-05 | Locale-Prefix für **beide** Sprachen (`/de`, `/en`) | SEO + hreflang sauber, kein „naked default" |
| ADR-06 | Statisches Team in `content/{locale}/team.json` statt DB | Nur 4 Personen, kein CMS-Bedarf |
| ADR-07 | `proxy.ts` (nicht `middleware.ts`) | Next.js 16 Pflicht-Rename |
| ADR-08 | Tailwind v4 + Token-CSS-File | Keine PostCSS-Config nötig, Tokens via CSS Custom Properties |

## Offene Fragen für M2/M3

- Custom Schriftart (Headlines)? Optionen: Geist (vorhanden), Inter, oder Serif wie Söhne/IBM Plex Serif
- Comic-Strip auf Landing: pinned horizontal scroll (mehr Wow) vs. vertical stagger (mobile-friendlier)?
- Branding-Farben: Bestehende Website wird als Referenz herangezogen, sobald wieder erreichbar (war beim Plan-Erstellen 503)
