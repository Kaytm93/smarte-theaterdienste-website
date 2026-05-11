---
name: typography
description: Lade diesen Skill wenn Schriften gewählt werden müssen, oder wenn der User nach Typografie, Font-Pairings, Display-Fonts, Body-Fonts fragt. Enthält 14 Font-Pairings nach Direktion, vollständige Hierarchie-Defaults, und Anti-Slop-Regeln.
---

# Typography System

## Banned Defaults

- **Inter** für Premium/Creative — banned
- **Roboto, Arial, system-ui** für sichtbare Headlines — banned
- **Serif auf Dashboard-UI** — banned
- **Gradient-Text auf großen Headlines** — banned (Hierarchie durch Weight + Color)
- **Comic-Sans, Papyrus** — always banned

Ausnahme: Body-Inter ist in Brutalist okay (passt zur „raw"-Ästhetik). Inter als Display-Hero im Premium-Kontext bleibt banned.

---

## Font-Pairings nach Direktion

| Direktion | Display | Body | Mono |
|---|---|---|---|
| **Refined Minimalism** | Geist Sans | Geist Sans | Geist Mono |
| **Editorial** | PP Editorial New | Söhne / Inter Tight | Söhne Mono |
| **Brutalist** | Helvetica Now Display 900 | Inter | Space Mono |
| **Apple Premium** | SF Pro Display | SF Pro Text | SF Mono |
| **Organic** | Recoleta | Mona Sans | PP Neue Bit |
| **Bento Engine** | Cabinet Grotesk | Satoshi | JetBrains Mono |
| **Retro-Futuristic** | Berkeley Mono Bold | Berkeley Mono | Berkeley Mono |
| **Swiss** | Helvetica Now / Inter Tight | Söhne | Söhne Mono |
| **Y2K** | VAG Rounded / Bubble Boddy | Arial Rounded | Courier New |
| **Cyberpunk** | Eurostile / Bank Gothic | JetBrains Mono | JetBrains Mono |
| **Neo-Memphis** | Druk / F37 Bella | Mona Sans | (rare) |
| **Glassmorphism** | Satoshi Light | Satoshi | JetBrains Mono |
| **Magazine-Tech** | Fraunces | Inter Tight | IBM Plex Mono |
| **Luxury Fashion** | Bodoni 72 / Didot | Söhne | (rare) |

---

## Hierarchie-Defaults

```css
:root {
  --text-hero:     600 clamp(2.5rem, 6vw, 4.5rem) / 1.05;
  --text-display:  600 clamp(2rem, 4.5vw, 3rem) / 1.1;
  --text-title:    600 clamp(1.75rem, 3vw, 2.25rem) / 1.15;
  --text-subtitle: 500 1.25rem / 1.4;
  --text-body:     400 1rem / 1.55;       /* max-w-[65ch] */
  --text-small:    400 0.875rem / 1.5;
  --text-caption:  500 0.8125rem / 1.4;   /* uppercase, tracking-wide */
  --text-micro:    500 0.75rem / 1.3;
}
```

### Tailwind-Mapping

```js
// tailwind.config
fontSize: {
  'hero':     ['clamp(2.5rem, 6vw, 4.5rem)',   { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '600' }],
  'display':  ['clamp(2rem, 4.5vw, 3rem)',     { lineHeight: '1.1',  letterSpacing: '-0.02em', fontWeight: '600' }],
  'title':    ['clamp(1.75rem, 3vw, 2.25rem)', { lineHeight: '1.15', letterSpacing: '-0.015em', fontWeight: '600' }],
  'subtitle': ['1.25rem',                       { lineHeight: '1.4',  fontWeight: '500' }],
  'body':     ['1rem',                          { lineHeight: '1.55' }],
  'small':    ['0.875rem',                      { lineHeight: '1.5' }],
  'caption':  ['0.8125rem',                     { lineHeight: '1.4',  letterSpacing: '0.05em', fontWeight: '500' }],
  'micro':    ['0.75rem',                       { lineHeight: '1.3',  fontWeight: '500' }],
}
```

---

## Layout-Regeln

- H1 darf nicht schreien. Hierarchie via Weight + Color, nicht Skalierung allein.
- Body-Text max-width **`max-w-[65ch]`** (typografisch optimal)
- Numerische Daten in Dashboards: **zwingend Monospace** mit `tabular-nums`
- Optical-Alignment: Icon-Center auf x-Höhe, nicht baseline
- Caption: `uppercase tracking-wide` (0.05em letter-spacing)
- Display-Fonts: `tracking-tighter` oder `-0.03em` letter-spacing
- Display-Hero auf Mobile: kein Inline-Wrap, manuelle `<br>` für Rhythm

---

## Loading-Strategie

```html
<!-- Google-Fonts (für Geist, Inter Tight, Cabinet Grotesk via Fontshare) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@300..900&display=swap" rel="stylesheet">

<!-- Self-hosted (production-empfohlen für Premium-Fonts) -->
<link rel="preload" href="/fonts/CabinetGrotesk-Variable.woff2" as="font" type="font/woff2" crossorigin>
```

```css
@font-face {
  font-family: 'Cabinet Grotesk';
  src: url('/fonts/CabinetGrotesk-Variable.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-display: swap;
}
```

`font-display: swap` zwingend — FOUT > FOIT.

---

## Fluid-Type-Defaults

Niemals fixed `text-5xl`. Immer `clamp()` für Hero/Display:

```css
font-size: clamp(MIN, PREFERRED, MAX);
/* Hero: */     clamp(2.5rem, 6vw, 4.5rem)
/* Display: */  clamp(2rem, 4.5vw, 3rem)
/* Title: */    clamp(1.75rem, 3vw, 2.25rem)
```

Body bleibt fixed (1rem = 16px) für Konsistenz.
