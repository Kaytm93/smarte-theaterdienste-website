---
name: style-directions
description: Lade diesen Skill wenn eine ästhetische Direktion gewählt werden muss oder der User eine bestimmte Style-Familie nennt (minimalism, editorial, brutalist, glassmorphism, retro, organic, apple, bento, cyberpunk, swiss, y2k, neo-memphis). Enthält 12 vollständig spezifizierte Direktionen mit Palette, Typo, Motion, Layout und Use-Case.
---

# 12 Ästhetische Direktionen

Eine bewusste Direktion wählen und committen. Niemals zwei mixen. Niemals zweimal in Folge dieselbe wählen.

## Direction-Selector (User-Request → Default)

| User-Anfrage | Default-Direktion |
|---|---|
| „Landing-Page für SaaS" | Refined Minimalism oder Bento Engine |
| „Portfolio" | Editorial oder Swiss |
| „Dashboard" | Refined Minimalism, hohe Density |
| „Agentur-Hero" | Brutalist oder Editorial |
| „Mobile App Marketing" | Apple Premium |
| „Premium Brand Site" | Glassmorphism oder Editorial |
| „Kids/Education" | Organic + Neo-Memphis-Akzente |
| „Finance/Enterprise" | Refined Minimalism oder Swiss |
| „Climate/Sustainability" | Organic |
| „Music/Creative Agency" | Brutalist oder Y2K |
| „Newsletter/Magazine" | Editorial |
| „Crypto/Web3/Gaming" | Retro-Futuristic oder Cyberpunk |
| „Luxus/Fashion" | Editorial oder Glassmorphism |
| „Photography/Art" | Swiss oder Editorial |

---

## A) Refined Minimalism (Linear/Stripe-Tier)
**Use:** Productivity, SaaS, B2B-Tools
**Palette:** Zinc-950 BG, Zinc-50 Text, 1 Accent (Emerald `#10b981` / Electric Blue `#0ea5e9` / Deep Rose `#f43f5e`)
**Typo:** Geist Sans + Geist Mono. `tracking-tighter leading-none` für H1.
**Motion:** 150–300ms, Spring `stiffness: 100, damping: 20`. Subtil, schnell.
**Layout:** Asymmetrisch, viel Negativraum. 12-Spalten-Grid mit fraktionalen Einheiten.
**Hero-Pattern:** Type-First mit kleinem Hint-Asset rechts oben
**Signature:** Inline `border-t` statt Cards, Mono für alle Zahlen

---

## B) Editorial/Magazine
**Use:** Portfolio, Newsletter, Premium-Brand-Story, Magazine-Sites
**Palette:** Cream `#f5f0e8` BG, Charcoal `#1a1a1a` Text, gesättigter Akzent (Tuscan Red `#7a3b2e` / Forest `#2d4a2e`)
**Typo:** Display-Serif (Editorial New, Fraunces, PP Editorial Old) + Söhne/Inter-Body. Drop-Caps erlaubt.
**Motion:** Buchstabenweise Reveals, Curtain-Transitions, langsame Kurven `cubic-bezier(.16, 1, .3, 1)`
**Layout:** Multi-Column Magazine-Grid, Drop-Caps, Overlap, Pull-Quotes
**Hero-Pattern:** Editorial Drop-Cap mit fließendem Text um Asset
**Signature:** Italic Serif für Captions, asymmetrische Whitespace-Zonen

---

## C) Brutalist/Raw
**Use:** Creative Agency, Music-Label, Streetwear, Experimentelles
**Palette:** Off-White `#ededed` + Off-Black `#0f0f0f` + Schock-Akzent (Toxic Green `#a7f432` / Construction Orange `#ff5e3a`)
**Typo:** Massive Display-Sans Bold (Space Mono, Helvetica Now Display, Suisse Int'l). Kein Tracking.
**Motion:** Hart, instant, oder gar nicht. Glitch/Scramble erlaubt. Keine Springs.
**Layout:** Asymmetrische Blocks, harte Overlaps, sichtbare 2–4px Borders, Rotation. Sichtbare Grid-Lines.
**Hero-Pattern:** Massive Typo, kein Bild, Background ist solide oder Noise-Texture
**Signature:** `border-4 border-black`, harte `box-shadow: 8px 8px 0 #0f0f0f`

---

## D) Glassmorphism/Liquid
**Use:** Premium Consumer, Crypto, Luxury, AI-Products
**Palette:** Animated Mesh-Gradient BG (Slate-900 → Indigo-900 → Purple-900 OHNE klassisches AI-Lila, eher Teal-Verlauf), frosted Surfaces `backdrop-blur-2xl`
**Typo:** Geist oder Satoshi, Display-Light, präzises Tracking
**Motion:** Magnetic Hover, parallaxe Layers, perpetual Float-Animationen
**Layout:** Floating Bento-Cards, Sticky-Stack-Scroll
**Hero-Pattern:** Floating Bento mit kleinem Hero-Headline links oben
**Signature:** Inner-Border `border-white/10` + `shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]` für echten Glass-Effekt

---

## E) Retro-Futuristic
**Use:** Tech-Launch, Gaming, Sci-Fi-Branding, Web3-mit-Substanz
**Palette:** Deep-Indigo `#001d3d` + Off-White `#f5f5f5` + Cyber-Yellow `#ffc300` ODER Magenta `#ff006e`
**Typo:** Mono-Display (Berkeley Mono, JetBrains Mono, IBM Plex Mono) + Serif (PP Editorial) für Akzente
**Motion:** Scan-Lines, dezenter CRT-Glow (NICHT Neon-Schreien), Terminal-Typewriter, ASCII-Art-Animations
**Layout:** Dense Cockpit-Grid, Border-Lines statt Cards, Box-Drawing-Chars
**Hero-Pattern:** Terminal/Console-Look mit Live-Typing-Effekt
**Signature:** Monospace-Numbers überall, Subtle-Noise-Overlay

---

## F) Organic/Natural
**Use:** Climate/ESG, Wellness, Outdoor-Brands, Slow-Food, Bio
**Palette:** Stone `#dad7cd` + Sand `#e9c46a` + Sage `#a3b18a` + Clay `#bc6c25` (alle entsättigt <60%)
**Typo:** Humanist-Serif (Cooper, Recoleta, Söhne Buch) + handgemachter Sans (PP Mori, Mona Sans)
**Motion:** Slow, ease-out-quart, organic-Blobs als Backgrounds, Pendulum-Easings
**Layout:** Rundungen `rounded-[2.5rem]`+, asymmetrische Whitespace, runde Bento-Cells
**Hero-Pattern:** Soft-Image-Hero mit Drop-Cap, organische SVG-Forms als Akzent
**Signature:** Animated Blob-Backgrounds, runde Surfaces, weiche Schatten

---

## G) Apple-Tier Premium
**Use:** Mobile-App-Marketing, Premium-Consumer, Wearables
**Palette:** System-Light `#ffffff` / `#f5f5f7` / `#1d1d1f` / `#86868b` + Accent `#0071e3` ODER System-Dark `#000000` / `#1d1d1f` / `#f5f5f7`
**Typo:** SF Pro Display / SF Pro Text Hierarchie. Hero 48px Semibold, Title 32px Semibold, Body 17px Regular, Caption 13px Medium
**Motion:** Spring präzise `cubic-bezier(0.32, 0.72, 0, 1)`, 300–500ms. Keine Bounces, keine Overshoots.
**Layout:** Mathematisch perfektes 4/8/16/24/48/96-Spacing. Centered & symmetrisch ist HIER erlaubt.
**Hero-Pattern:** Product-Hero centered, massive Typo darüber, perfekt zentriert
**Signature:** Pixel-perfect Spacing, kein Element ist random platziert

---

## H) Bento 2.0 Motion-Engine
**Use:** SaaS-Feature-Showcase, AI-Products, Dev-Tools
**Palette:** BG `#f9fafb`, Cards `#ffffff` mit `border-slate-200/50`, Diffusion-Shadow `shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]`
**Typo:** Geist / Satoshi / Cabinet Grotesk, `tracking-tight`
**Motion:** Perpetual Micro-Interactions in JEDER Karte. Pulse, Typewriter, Float, Carousel. Spring `stiffness:100, damping:20`.
**Layout:** Row1: 3 cols, Row2: 70/30 split. `rounded-[2.5rem]`, `p-8` bis `p-10`
**Labels:** Titel + Description **außerhalb und unter** der Card (Gallery-Style)
**Hero-Pattern:** Massive H1 oben, darunter sofort der Bento-Grid

### Die 5 Card-Archetypen (Pflicht-Repertoire)
1. **The Intelligent List** — vertikaler Stack, infinite auto-sorting via `layoutId`
2. **The Command Input** — Search/AI-Bar mit Typewriter-Cycle + Shimmer-Loading
3. **The Live Status** — „breathing" Status-Dots, Overshoot-Notification (3s sichtbar)
4. **The Wide Data Stream** — horizontaler Infinite Carousel `x: ["0%", "-100%"]`
5. **The Contextual UI** — Document mit staggered Text-Highlight, Float-In-Toolbar

---

## I) Swiss/International Style
**Use:** Photography, Art, Architecture, B2B-Premium, Editorial-Tier
**Palette:** Pure-White `#ffffff` + True-Black `#000000` (HIER OK weil Print-Heritage) + 1 Primärfarbe (Helvetica-Red `#ed1c24` / IBM-Blue `#0530ad`)
**Typo:** Helvetica Now (oder Inter Tight als digital-Stand-In) + Söhne. Strenge modulare Skalen.
**Motion:** Minimal. Nur funktional. Subtile Fades 200ms.
**Layout:** Strenges Modular-Grid, alles linksbündig oder mathematisch aligned. Akira-Kurosawa-Disziplin.
**Hero-Pattern:** Massive Number/Type linksbündig, sehr klares Modular-Grid sichtbar
**Signature:** Sichtbare Grid-Lines als Design-Feature, perfekte Vertical-Rhythm

---

## J) Y2K/Web 1.0 Revival
**Use:** Music, Fashion, Gen-Z-Targeting, Nostalgia-Brands
**Palette:** Chrome-Silver `#c0c0c0` + Hot-Pink `#ff1493` + Lime `#bfff00` + Blueberry `#0066ff`
**Typo:** Display-Bubble (Arial Rounded, VAG Rounded, Bubble-Boddy) + sehr generisch
**Motion:** Bouncy, übertrieben, Squash & Stretch
**Layout:** Mehrere Layer-Stacks mit Inset-Shadows, Beveled-Edges, Pixel-Borders
**Hero-Pattern:** Maximalistisch, mehrere Elemente Layered, Sparkle-Decorationen
**Signature:** Chrome-Gradients (nicht Lila!), Pixel-Borders, Beveled-Buttons mit Inset-Shadow

---

## K) Cyberpunk/Dense Tech
**Use:** Gaming, Hardcore-Tech, Bio-Hacking, Underground
**Palette:** Pure-Black `#050505` + Cyan `#00f0ff` + Magenta-Glow `#ff00aa` + entsättigtes Grün `#5fff5f`
**Typo:** Mono-Heavy (Berkeley Mono, JetBrains Mono Bold) + sehr techy-Sans (Eurostile, Bank-Gothic-Style)
**Motion:** Glitch-Reveals, RGB-Splits, Scan-Lines, Datenstrom-Effekte (Matrix-Rain-style)
**Layout:** Sehr dense Cockpit, Border-Lines überall, Box-Drawing-Chars, sichtbare Coordinates
**Hero-Pattern:** Full-Bleed Terminal mit live-typing System-Output, HUD-Elements drumherum
**Signature:** RGB-Channel-Splits bei Hover, animierte Coordinate-Displays, Audio-Wave-Visualizer

---

## L) Neo-Memphis/Playful Chaos
**Use:** Kids, Education, Festivals, Bold-Brands, Pop-Culture
**Palette:** Mehrere flache leuchtende Farben — Sun-Yellow `#ffd23f` + Tomato `#ee4266` + Sky `#1ea7fd` + Mint `#7fffd4` + Black-Lines
**Typo:** Custom-Display (Druk, Big Caslon, F37 Bella) + handgemachter Sans
**Motion:** Verspielt, Squash, Rotation, übertrieben, Spring `stiffness:200, damping:15`
**Layout:** Chaotisch-organisiert, Pattern-Overlays (Dots, Stripes, Squiggles), Sticker-Style
**Hero-Pattern:** Multi-Element-Collage, dekorative Shapes drumherum, „Sticker"-Buttons
**Signature:** Squiggle-Underlines, Pattern-Fills, sichtbare Black-Lines als Outlines

---

## Wahl-Algorithmus

```
IF user_specified_direction:
    USE user_specified
ELIF project_type in selector_table:
    USE selector_default
    IF selector_default == last_used:
        USE selector_alternative
ELSE:
    PICK based_on_purpose AND vary_from_last
```

Beim Output 1 Satz Begründung schreiben: „Direktion: [Name] — gewählt weil [Grund]."
