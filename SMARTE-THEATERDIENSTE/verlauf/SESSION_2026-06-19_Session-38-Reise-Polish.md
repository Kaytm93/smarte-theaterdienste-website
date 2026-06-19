# Session 38 — Spielplan-Reise Orbit-Polish

**Datum:** 2026-06-19  
**Status:** lokal verifiziert, Commit/Push folgt in der Session-Routine  
**Commit-SHA:** `de33eb5`

## Anlass

User-Feedback zur nativen „Interaktiven Reise durch die Spielplanverbreitung": Der pulsierende Kern mit Sternen sollte im Zentrum stehen, nicht oben links. Außerdem sollte die Darstellung heller und besser erkennbar werden; Animationen sollten mehr Feinschliff bekommen. Das repo-lokale/persönliche `website-design-ultra`-Plugin wurde als Designregelwerk genutzt.

## Vorgehen

- Projekt-Vault gelesen: `START_HIER`, `KONTEXT`, `DASHBOARD`, `PROBLEME`, `MUSTER`, `INHALTE`, `CHANGELOG`, `ENTSCHEIDUNGEN`.
- Website-Design-Ultra-Skills gelesen: Core Rules, Style Directions, Color Palettes, Motion System, UI States.
- Bestehende CI beibehalten: Public Sans, Lucent-White/Grau/Purple, eine Akzentfarbe.
- Keine neue Library; bestehendes GSAP-/`useGSAP`-Pattern weiterverwendet.

## Geänderte Bereiche

- `src/components/sections/SpielplanReise.tsx`
  - linke Emblem-Spalte durch zentrierten Orbit-Core ersetzt
  - hellere Stage-Fläche und stärkerer Textkontrast
  - acht Sternpunkte, Purple-Glow, gestrichelter Orbit
  - neue GSAP-Loops für Orbit-Rotation, Core-Puls, Glow-Atmung, Stern-Flimmern
  - `revertOnUpdate` für Infinite-Timelines
  - Prev/Next-Touch-Targets, Focus-Rings, Active-/Disabled-States verfeinert

## Verifikation

- `pnpm typecheck` ✅
- `pnpm lint` ✅
- `pnpm build` ✅ — 35/35 SSG-Seiten
- Playwright `/de/konzeption#zeitstrahl`:
  - Desktop-Screenshot: `output/playwright/spielplanreise-station5-desktop.png`
  - Mobile-Screenshot: `output/playwright/spielplanreise-mobile-core.png`
  - Mobile `docOverflowPx 0`
  - Core-Zentrierung: `panelCenterX=188`, `coreCenterX=188`, `deltaPx=0`
  - Browser-Konsole: 0 Errors, 0 Warnings

## Ergebnis

Der pulsierende Kern sitzt nun optisch und gemessen im Zentrum der Stage-Card. Die Reise wirkt heller, die Text-/Chip-Ebene ist besser lesbar, und die Animation bleibt ruhig genug für die bestehende CI.

## Weitere Designvorschläge

1. Die Reise später als horizontalen „Bühnenlicht"-Narrativblock direkt unter den Konzeption-Hero ziehen, damit sie nicht erst nach dem Event-Zeitstrahl sichtbar wird.
2. Die fünf Stationen mit kleinen, echten Mini-Beispielen ergänzen: ein PDF-Fragment, ein JSON-Snippet, ein ORIF-Badge, ein Konnektor-Status und ein Plattform-Output.
3. Den Progress-Text im Footer der Komponente optional durch eine kompakte „1/5"-Pill ersetzen, weil der gleiche Status im Core bereits sichtbar ist.
