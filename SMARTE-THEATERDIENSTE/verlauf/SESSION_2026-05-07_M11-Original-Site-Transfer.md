# Session 2026-05-07 — M11 Original-Site-Transfer

## Ziel

Die bestehende Website `https://smarte-theaterdienste.de/de` mit der neuen Next.js-Site vergleichen und fehlende Inhalte nachziehen. Fokus: DACH-/Deutschlandkarte, Inhalte aus Konzeption/Material/FAQ/Jetzt-mitmachen, sichtbare Überarbeitung der Website.

## Gelesener Kontext

- `START_HIER.md`
- `KONTEXT.md`
- `DASHBOARD.md`
- `PROBLEME.md`
- `MUSTER.md`
- `INHALTE.md`
- `API.md` wegen Supabase-FAQ/Termine
- Next.js-16-Docs aus `node_modules/next/dist/docs/01-app/01-getting-started/03-layouts-and-pages.md`
- Next.js-16-Images-Doku aus `node_modules/next/dist/docs/01-app/01-getting-started/12-images.md`
- Playwright-Skill für Browser-Verifikation

## Originalquellen

- `https://smarte-theaterdienste.de/de`
- `https://smarte-theaterdienste.de/de/konzeption`
- `https://smarte-theaterdienste.de/de/material`
- `https://smarte-theaterdienste.de/de/faq`
- `https://smarte-theaterdienste.de/de/jetzt-mitmachen`
- `https://www.buehnenverein.de/en/datenraum-kultur`
- `https://buehnenverein.github.io/open-repertoire/`

## Umsetzung

- Landing erweitert:
  - Nutzenblöcke "Effektivere Arbeitsprozesse", "Höhere Reichweite", "Größeres Netzwerk"
  - DACH-Netzwerkkarte mit 141er-Statistik
  - Netzwerksegmente 51/30/30/30
  - Stakeholder-Vorteile für Theaterleitung, PR/Marketing, Künstlerisches Betriebsbüro, Developer/Agenturen
- Neue Komponenten:
  - `FeatureGrid`
  - `NetworkMapSection`
  - `ResourceLinkGrid`
- Technische Standards erweitert:
  - ORIF präzisiert
  - Schema.org + GND ergänzt
  - Werkdaten/Aufführungsdaten erklärt
  - Comic-Clip, Infomaterial, Musterkalkulation, ORIF-Doku, Validator, Lektoratstool verlinkt
- Mitwirkung erweitert:
  - Drei-Punkte-Plan "Implementieren / Automatisieren / Revolutionieren"
  - Tanzarchiv-Leipzig-Zitat ergänzt
- Team:
  - vier Portraits aus dem alten Sanity-CDN in `team.json` DE/EN eingebunden
  - `ContactCard` rendert echte Bilder via `next/image`
  - A11y-Fallback-Label nur noch ohne Portrait
- Supabase:
  - Migration `20260507153000_m11_original_site_content.sql`
  - 21 veröffentlichte FAQ-Einträge
  - 42 FAQ-Translations
  - 4 alte 2025-Termine als `past` Events
- `next.config.ts`:
  - Sanity-CDN remotePattern ergänzt

## Verifikation

- JSON-Parse: OK
- `pnpm typecheck`: OK
- `pnpm lint`: OK
- `pnpm build`: OK, 37/37 Pages
- Supabase remote:
  - `public.faqs where is_published=true` = 21
  - `public.faq_translations` = 42
  - vier `*2025*` Event-Slugs mit `status='past'`
- Playwright:
  - `/de`
  - `/de/projekt/technische-standards`
  - `/de/faq`
  - `/de/ansprechpersonen`
  - Mobile 375×812 ohne Horizontal-Overflow
  - Console 0 Errors / 0 Warnings
- Curl-Smokes:
  - `/de/termine` enthält alle vier alten Events
  - `/en/project/technical-standards` enthält Resource Cards
  - `/en/faq` enthält neue FAQ-Fragen

## Ergebnis

Die zentralen sichtbaren Inhalte der alten Website sind in die neue Site übertragen. Bewusst offen bleiben finale Legal-Texte, Blog-Cover-Bilder und Custom Domain.
