---
description: Erstellt eine neue Website / Landing-Page / Component nach den website-design-ultra Regeln. Wählt eine ästhetische Direktion, committet vollständig, liefert production-ready Code.
---

# /design

Du wirst eine Website, Landing-Page oder UI-Component bauen.

## Workflow

1. **Reconnaissance** — Falls im Repo: `package.json` lesen für Stack-Check (React/Next, Tailwind v3/v4, vorhandene UI-Lib). Falls `DESIGN.md` oder `tokens.css` existiert: respektieren.

2. **Direction wählen** — Lade `style-directions` Skill. Pick eine Direktion bewusst. Wenn die letzte Generation Direktion X war, wähle eine andere (Variation > Konvergenz).

3. **Palette & Typo** — Lade `color-palettes` + `typography`. Wähle passend zur Direktion.

4. **Motion-Profil** — Lade `motion-system`. Wähle Designer-Bias (Emil/Jakub/Jhey) basierend auf Projekt-Typ.

5. **Pattern wählen** — Lade `component-patterns`. Pick Hero-Variante + Section-Patterns + Card-Archetyp passend zur Direktion.

6. **States** — Lade `ui-states`. Implementiere alle States.

7. **Output-Format**:
   - 1–2 Sätze Direction-Begründung
   - `npm install ...` falls Libraries nötig
   - Working Code
   - States-Notiz (was implementiert)
   - Anpass-Hooks (welche CSS-Vars / Tailwind-Vars leicht änderbar)

## Argumente

Was der User nach `/design` eingibt = Briefing. Beispiele:
- `/design landing page für AI-Code-Editor`
- `/design dashboard hero, dark mode, minimal`
- `/design portfolio site, editorial style`

Wenn nichts angegeben: nachfragen — Was bauen wir? Welcher Kontext?

## Pre-Flight Check vor Output

Pflicht: Lade `core-rules` und gehe die Pre-Flight-Checklist durch. Bei jedem ✗ nachbessern.
