# Session 24 — Editorial-QA-Polish (2026-05-11)

**Branch:** `claude/wonderful-lamarr-caa8a0` (Worktree) → `main`
**Modus:** Worktree-Audit + Source-Fix
**Status:** ✅ Lokal validiert, gepusht und production-deployed (siehe DASHBOARD).

## Auftrag

User: „Lese dir die MD Dateien durch in SMARTE-THEATERDIENSTE und du testest die Website visuell, findest Unstimmigkeiten und versuchst dies dann auch zu fixen, davor sagst du mir kurz ob du das Website Design Plugin nutzen kannst…"

## Klärung Website-Design-Plugin

`plugins/website-design-ultra/` ist ein **Codex-Plugin** (`.codex-plugin/plugin.json`) und kein Claude-Code-Skill, lässt sich also nicht auto-laden. Die Skill-Dateien wurden manuell als Referenz konsultiert; native Claude-Skills (`plan-design-review`, `design-taste-frontend`, `design-motion-principles`, `ui-ux-pro-max`, `apple-ui-design`, `awwwards-animations` …) decken laut README dieselbe Substanz ab.

## Audit-Setup

- `pnpm install` im Worktree (`node_modules/` fehlte initial).
- `.env.local` aus dem Hauptrepo in den Worktree kopiert (gitignored), damit Supabase-Pages echte Daten rendern.
- `preview_start` auf Port 3000 via `.claude/launch.json`.
- Viewports: Desktop 1440×900 und Mobile 375×812.

## Befunde (alle ohne neue Bugs, rein Editorial-Polish)

### 1. Hero-Stat-Strip dupliziert FeatureGrid + NetworkMap 1:1

`src/app/[locale]/page.tsx:114–128` rendert am Ende des Hero-`<section>`-Containers einen 3-Spalten-Strip mit:

```tsx
<p><strong>{landing.network.statValue}</strong> {landing.network.statLabel}</p>
{landing.benefits.features.slice(0, 2).map((feature) => (
  <p key={feature.title}>
    <strong>{feature.title}.</strong> {feature.body}
  </p>
))}
```

Direkt darunter rendert `<FeatureGrid features={landing.benefits.features}>` dieselben drei Features (mit allen Bodies) und `<NetworkMapSection statValue={landing.network.statValue}>` denselben 141-Stat mit Karte und Segmenten. → Body-Strings erscheinen 2×, mit 50–200 px Abstand.

### 2. "Use Case 03" steht 3× im Hero-Bereich

- Linker Kicker-Span: `{t("kicker")}` = „Datenraum Kultur · Use Case 3"
- Mittlerer Kicker-Span: statisch `Use Case 03`
- Bild-Caption rechts: statisch `Use Case 03` als Mono-Slug unter dem `<figure>`

Drei sehr ähnliche Strings im selben sichtbaren Hero-Block ohne semantischen Mehrwert.

### 3. EN-Hero zeigt deutschen Eigennamen

Der dritte Hero-Kicker-Span war hartkodiert auf `JSON · ORIF · Datenraum Kultur` und wurde nicht durch `getTranslations` geführt. Im EN-Locale dann inkonsistent zu Header (`Cultural Data Space · Machine-readable programmes`) und Kicker (`Cultural Data Space · Use Case 3`).

## Fixes

### `src/app/[locale]/page.tsx`

Hero-Top-Rail von drei auf zwei `<span>`:

```diff
- <span>{t("kicker")}</span>
- <span>Use Case 03</span>
- <span>JSON · ORIF · Datenraum Kultur</span>
+ <span>{t("kicker")}</span>
+ <span>{t("tags")}</span>
```

Hero-Stat-Strip am Section-Footer von drei Volltext-Paragraphen auf eine kompakte Editorial-ToC `<ol>`:

```tsx
<ol className="m-0 grid list-none gap-x-8 gap-y-3 p-0 sm:grid-cols-3">
  {landing.benefits.features.map((feature, i) => (
    <li key={feature.title} className="flex items-baseline gap-3 text-sm leading-snug text-foreground/75">
      <span className="font-mono text-[11px] font-semibold tabular-nums text-foreground/55">
        {String(i + 1).padStart(2, "0")}
      </span>
      <span className="font-semibold text-foreground">{feature.title}</span>
    </li>
  ))}
</ol>
```

### `src/messages/de.json` und `src/messages/en.json`

Neuer Key `hero.tags`:

| Locale | Wert |
| ------ | ---- |
| `de`   | `JSON · ORIF · Datenraum Kultur` |
| `en`   | `JSON · ORIF · Cultural Data Space` |

## Verifikation

- `pnpm typecheck` ✅
- `pnpm lint` ✅
- `pnpm build` ✅ (37/37 Pages SSG, alle Routen `●` oder `○`)
- Preview-MCP nach Reload:
  - `/de` Top-Rail: `DATENRAUM KULTUR · USE CASE 3` · `JSON · ORIF · DATENRAUM KULTUR`
  - `/en` Top-Rail: `CULTURAL DATA SPACE · USE CASE 3` · `JSON · ORIF · CULTURAL DATA SPACE`
  - Editorial-ToC sichtbar mit `01/02/03` + lokalisierten Feature-Titeln
- Mobile 375×812: Top-Rail bricht nur noch 2-zeilig statt 3-zeilig, ToC einspaltig vertikal
- `fetch('/de')` und `fetch('/en')` liefern HTML mit den neuen Strings (Check beide `true`)
- Console: Server-Errors im Puffer stammen aus initialem Render vor dem `hero.tags`-Add; nach Reload + Build keine MISSING_MESSAGE mehr.

## Was nicht angefasst wurde

Routing, Supabase-Queries, Content-JSONs, restliche Sections (ComicStrip, NetworkMap, PartnerMap, FeatureGrid, FAQ, Events, Cards), Header/Footer, Animations-Pipeline. Keine neuen Abhängigkeiten.

## Bekannte Restposten (kein Blocker)

- Ansprechpersonen-Karten haben unterschiedliche Höhen (zwei mit Quote, zwei ohne) — visuell minimal unausgewogen, aber Inhalt sauber. Kein Fix in dieser Session.
- Custom-Domain-DNS `smarte-theaterdienste.de` weiterhin nicht auf Vercel (siehe `PROBLEME.md`).
