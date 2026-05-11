# website-design-ultra

> Premium Website-Design-Plugin für Codex. 12 ästhetische Direktionen, 20 kalibrierte Paletten, Drei-Designer-Motion-Filter, Anti-Slop-Regeln und Bento-2.0-Patterns für hochwertige Frontend-Arbeit.

Konsolidiert aus den Skills: `frontend-design`, `design-taste-frontend`, `design-motion-principles`, `apple-ui-design`, `color-font-skill`, `animation-systems`, `awwwards-animations`, `interaction-design`, `ui-ux-pro-max`, `data-viz-2025`, `apple-ui-design`, `gsap`.

---

## Was drin ist

```
website-design-ultra/
├── .codex-plugin/plugin.json
├── README.md
├── skills/
│   ├── core-rules/         ← Master-Skill, triggert immer
│   ├── style-directions/   ← 12 ästhetische Direktionen
│   ├── color-palettes/     ← 20 production-ready Paletten
│   ├── typography/         ← 14 Font-Pairings + Hierarchie
│   ├── motion-system/      ← Easings, Springs, 3-Designer-Filter
│   ├── component-patterns/ ← Hero, Bento, Cards, Marquee, Forms
│   └── ui-states/          ← Loading/Empty/Error/A11y Pflicht
└── commands/
    ├── design.md           ← Workflow-Vorlage: neues Design bauen
    ├── audit.md            ← Workflow-Vorlage: Frontend auditieren
    └── refresh.md          ← Workflow-Vorlage: Design refreshen
```

---

## Installation

### Repo-lokal in Codex verwenden

Dieses Repo enthält bereits:

- `plugins/website-design-ultra/.codex-plugin/plugin.json`
- `.agents/plugins/marketplace.json`

Der Marketplace-Eintrag verweist auf `./plugins/website-design-ultra` und markiert das Plugin als `AVAILABLE`. Nach einem Codex-Neustart kann der lokale Marketplace das Plugin erkennen.

### Home-lokal verwenden

Wenn das Plugin projektübergreifend genutzt werden soll, kopiere den Ordner nach `~/plugins/website-design-ultra/` und trage ihn in `~/.agents/plugins/marketplace.json` mit `source.path: "./plugins/website-design-ultra"` ein.

### Via Marketplace

Wenn du ein eigenes Marketplace-Repo aufsetzt, kann es später über den Marketplace installiert werden:

```bash
/plugin install website-design-ultra@<dein-marketplace-name>
```

---

## Command-Vorlagen

Die Dateien unter `commands/` sind aus dem Ausgangs-ZIP übernommen und dienen als Workflow-Vorlagen:

- `commands/design.md` — Neue Website/Component bauen
- `commands/audit.md` — Bestehenden Code auditieren
- `commands/refresh.md` — Bestehendes Design in neue Direktion bringen

Die automatische Aktivierung läuft in Codex über die Skill-Descriptions in `skills/*/SKILL.md`.

---

## Wie es funktioniert

**Auto-Activation:** Die Skill-Descriptions sind so geschrieben, dass Codex sie automatisch laden kann, wenn relevante Keywords auftauchen. Beispiele:

- „Bau mir eine Landing-Page" → `core-rules` + `style-directions` triggern
- „Mach das Hero animiert" → `motion-system` triggert dazu
- „Welche Farben für ein Fintech?" → `color-palettes` triggert

**Progressive Disclosure:** Nur der `core-rules` Master-Skill ist permanent geladen. Die anderen werden bei Bedarf nachgeladen — spart Context.

---

## Anpassen

Jeder Skill ist eine eigene `SKILL.md`. Wenn du z.B. eine neue Palette ergänzen willst, editiere `skills/color-palettes/SKILL.md`. Neue Direktion: `skills/style-directions/SKILL.md`. Beim nächsten Codex-Start ist die Änderung aktiv.

---

## Was dieses Plugin BESSER macht als deine vorhandenen Einzel-Skills

1. **Konsolidiert**: 11 deiner Skills → 1 Plugin mit klarer Hierarchie. Keine widersprüchlichen Empfehlungen mehr.
2. **Marketplace-Boilerplate entfernt**: deine LobeHub-Skills hatten ~200 Zeilen Install/Rate-Boilerplate pro Datei. Hier komplett rausgeflogen.
3. **Direction-Commitment erzwungen**: keine „neutralen" Defaults mehr. Variation > Konvergenz.
4. **Progressive Disclosure**: spart Context-Tokens vs. „alle Skills immer laden".
5. **Drei Workflow-Vorlagen** für die häufigsten Design-Aufgaben.
6. **State-Coverage erzwingen**: `ui-states` triggert vor jedem Output, kein „Loading vergessen" mehr.

---

## Maintenance

Wenn ein Skill in deiner normalen Skill-Sammlung ein relevantes Update bekommt, migriere die Änderung in dieses Plugin. Sonst läufst du Gefahr, dass zwei Quellen widersprüchliche Regeln geben.

**Empfehlung:** Doppelte Design-Skills deaktivieren oder entfernen, sobald du dieses Plugin nutzt. Sonst hat Codex mehrere Quellen für dasselbe Thema.

---

## Version

1.0.0 — Initial Release, 7 Skills, 3 Commands, 12 Directions, 20 Palettes.
