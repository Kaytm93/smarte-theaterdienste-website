# Session 2026-05-11 — M14 Editorial-Redesign

## Anlass

User wollte die gesamte Website kreativer und zeitungshaftiger gestalten, mit smooth Animationen. Zusätzlich wurde das angehängte Design-Regelwerk `website-design-ultra.zip` als Orientierung geliefert.

## Vorgehen

1. Projektregeln und Vault gelesen: `AGENTS.md`, `START_HIER.md`, `KONTEXT.md`, `DASHBOARD.md`, `PROBLEME.md`, `MUSTER.md`, `INHALTE.md`, zusätzlich `API.md`.
2. Relevante Next.js-16-Dokumente gelesen: Layouts/Pages, CSS, Font Optimization, View Transitions.
3. Design-Zip geprüft und die Skills `core-rules`, `style-directions`, `color-palettes`, `typography`, `motion-system`, `component-patterns`, `ui-states` ausgewertet.
4. Direktion festgelegt: Editorial/Magazine, aber nicht beige-dominiert. Papier/Tinte/Datenraum-Blau/Rubrik-Rot, Zeitungskopf, Linienraster, Serif-Hierarchie.
5. Globales Design-System angepasst, danach Header/Footer/Landing und alle wiederverwendbaren Sections/Cards auf den Editorial-Look übertragen.
6. Lokal production-like validiert und Browser-Checks via Playwright durchgeführt.

## Geänderte Bereiche

- `src/styles/tokens.css` — Editorial-Palette, Breakpoint-Typografie, Linien/Raster, Motion-Tokens.
- `src/app/globals.css` — Font-Bridge, Papierhintergrund, Reduced-Motion, Editorial-Utilities.
- `src/app/[locale]/layout.tsx` — `Newsreader` via `next/font/google`.
- `src/components/layout/{Header,Footer,MobileNav,LanguageSwitcher}.tsx` — Zeitungskopf, Mobile-Menü, Footer-Masthead.
- `src/app/[locale]/page.tsx` — Landing als Editorial-Frontpage.
- `src/components/sections/*` — PageHero, TextSection, FeatureGrid, ComicStrip, Cards, FAQ, PartnerMap, Blog-Artikel und Empty-State auf Linienraster/Serif/kleinere Radien umgestellt.
- `src/messages/{de,en}.json` — `nav.edition` und `nav.dateline`.
- `eslint.config.mjs` — `.vercel/**` in `globalIgnores`.
- Vault-Dateien: `DASHBOARD.md`, `KONTEXT.md`, `PROBLEME.md`, `CHANGELOG.md`, `ENTSCHEIDUNGEN.md`.

## Verifikation

- `pnpm typecheck`
- `pnpm lint`
- `pnpm build`
- `pnpm start --port 3030`
- Playwright:
  - Desktop 1440×1000 `/de`: kein Horizontal-Overflow, Console 0 Errors/Warnings.
  - Mobile 390×844 `/de`: kein Horizontal-Overflow, Console 0 Errors/Warnings, Mobile-Menü funktioniert.
  - Routencheck `/de/blog`, `/de/beteiligung/mitwirkung`, `/de/faq`, `/de/termine`, `/en`: H1 sichtbar, kein Horizontal-Overflow.

## Commit / Deploy

- Commit: `be7a9cc`
- Deploy: nach Commit/Push.

## Ergebnis

Die Website wirkt jetzt wie eine Kulturzeitung: Serif-Masthead, Frontpage-Hero, klare Rubriklinien, Zeitungskarten, Bildstrecken und Pull-Quote-Anmutung. Inhalte, Routing, Supabase-Queries und i18n-Struktur bleiben stabil.
