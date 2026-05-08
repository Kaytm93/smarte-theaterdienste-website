# Session 2026-05-08 — M13 Miro-Board-QA und Deutschlandkarten-Polish

## Auftrag

Die Website als Tester prüfen, besonders die Deutschlandkarte, Inhalte, Orientierung, Animationen und Logik. Das Miro-Board hat höhere Priorität als der aktuelle Website-Stand; Miro-Ideen sollen in die Website übertragen werden.

## Gelesen

- `AGENTS.md`
- `SMARTE-THEATERDIENSTE/START_HIER.md`
- `SMARTE-THEATERDIENSTE/KONTEXT.md`
- `SMARTE-THEATERDIENSTE/DASHBOARD.md`
- `SMARTE-THEATERDIENSTE/PROBLEME.md`
- `SMARTE-THEATERDIENSTE/MUSTER.md`
- `SMARTE-THEATERDIENSTE/INHALTE.md`
- Relevante Next.js-16-Dokumente aus `node_modules/next/dist/docs/`
- Miro-Board `Website DRK`

## Miro-Befunde

- Die interaktive Deutschlandkarte mit beteiligten Institutionen ist ausdrücklich wichtig.
- Die Mitwirkung muss schneller beantworten: Was bringt mir die Schnittstelle konkret?
- Wichtiges Nutzenargument: weniger stundenlanges Copy-and-paste; einmal implementieren, dann automatisiert weiterverwenden.
- Zielgruppen brauchen getrennte Orientierung: KBB/Kommunikation und IT/Webagentur.
- Schritt-für-Schritt-Anleitung und Anforderungen für Webagenturen sind Miro-Priorität.

## Live-/Domain-Befund

- `https://smarte-theaterdienste.de/de` zeigt noch alte Inhalte und DNS-A-Records außerhalb von Vercel.
- Repo-Pushes werden auf dieser Domain erst sichtbar, wenn `smarte-theaterdienste.de` im Vercel-Projekt hinterlegt und DNS umgestellt ist.
- Der Vercel-Alias muss nach Push/Redeploy erneut geprüft werden, weil er beim Test noch stale Stände gegenüber Session 19/20 ausgeliefert hat.

## Umsetzung

- `src/content/de/beteiligung-mitwirkung.json` und `src/content/en/beteiligung-mitwirkung.json`
  - Neuer Nutzenblock `Warum mitmachen?`
  - Neue Implementierungs-/Webagentur-Checkliste
- `src/app/[locale]/beteiligung/mitwirkung/page.tsx`
  - Drei Nutzenkarten mit Icons
  - Neuer Implementierungsblock für KBB, Kommunikation, IT und Webagenturen
- `src/components/sections/PartnerMapClient.tsx`
  - Kompakteres Desktop-Layout
  - Statusfarbige Marker
  - Sichtbare Legende
  - Standortzähler
  - Klickbare Standortliste im Initialzustand
- `src/messages/de.json` und `src/messages/en.json`
  - Labels für Standortzählung und Legende ergänzt

## Verifikation

- `pnpm typecheck` — clean
- `pnpm lint` — clean
- `pnpm build` — clean, 37/37 Pages
- Production-like Smoke auf `pnpm start --port 3032`
  - `/de` 200
  - `/de/beteiligung/mitwirkung` 200
  - `/en/participation/contribute` 200
  - `/de/faq` 200
  - `/de/termine` 200
  - `/de/blog` 200
  - `/de/impressum` 200
  - `/de/datenschutz` 200
- Playwright Desktop/Mobile auf der Kartenansicht: Karte, Marker, Legende und Standortliste sichtbar; Console 0 Errors/Warnings.

## Commit

- `pending` M13: Miro-QA und Deutschlandkarten-Polish

## Nächste Schritte

1. Vercel-Alias nach Push/Redeploy auf die neuen Session-20-Inhalte prüfen.
2. `smarte-theaterdienste.de` als Custom Domain in Vercel anbinden und DNS umstellen.
3. Finale Impressum-/Datenschutztexte einpflegen.
