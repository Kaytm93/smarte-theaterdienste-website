---
name: core-rules
description: MASTER-SKILL für alles Website-Design. Aktiviert bei jeder Anfrage zu Web-Komponenten, Landing-Pages, Hero-Sections, Dashboards, Portfolios, UI-Layouts, React/HTML/CSS-Code, Tailwind-Styling. Triggers — website, landing page, hero, dashboard, portfolio, ui design, frontend, react component, tailwind, css, html, design slop, awwwards, premium ui, designen, gestalten. Erzwingt Anti-Slop-Regeln, Direction-Commitment, Pre-Flight-Check. Lädt die anderen Skills (style-directions, motion-system, color-palettes, typography, component-patterns, ui-states) bei Bedarf nach.
---

# Website Design — Core Rules

Du baust Websites/UI auf Awwwards-Level. Diese Regeln gelten IMMER, bei jeder Generation. Wenn du dich gegen sie entscheidest, brauchst du einen expliziten Grund.

## 1. Aktive Basis-Konfiguration

Drei Regler bestimmen den Output. Defaults wenn nichts anderes gesagt wird:

* **DESIGN_VARIANCE: 7** (1=Symmetrie, 10=Asymmetrie)
* **MOTION_INTENSITY: 6** (1=Statisch, 10=Cinematic)
* **VISUAL_DENSITY: 4** (1=Airy/Gallery, 10=Cockpit)

User kann im Prompt überschreiben („minimaler", „mehr Motion", „dense dashboard"). Niemals diese Datei selbst ändern.

## 2. Schritt 0 — Reconnaissance (PFLICHT vor Code)

1. **Purpose & Audience** — Productivity-Tool, Consumer, Portfolio, E-Commerce, Editorial?
2. **Stack-Check** — `package.json` lesen falls vorhanden. NIEMALS Library annehmen, immer verifizieren. Fehlende Packages → install-Command vorschlagen, BEVOR Code kommt.
3. **Tailwind-Version** — v3 oder v4? Bei v4: `@tailwindcss/postcss`, nicht `tailwindcss`-Plugin.
4. **Existing System** — `tokens.css` / `DESIGN.md` / vorhandene CSS-Variablen? Respektieren, nicht überschreiben.

Wenn nichts klar: **eine ästhetische Direktion bewusst wählen und committen.** „Neutral" ist die Quelle aller AI-Slop.

## 3. Skill-Routing (lade bei Bedarf nach)

Bei jeder Design-Anfrage:

1. **IMMER lesen**: dieser Skill (Core Rules)
2. **Lese style-directions** wenn der User keine konkrete Direktion vorgibt oder eine andere als die letzte ausgewählt werden soll
3. **Lese color-palettes** wenn Farben gewählt werden müssen
4. **Lese typography** wenn Schriften gewählt werden müssen
5. **Lese motion-system** wenn MOTION_INTENSITY > 3 ODER der User Animation, Interaction, Scroll-Effects erwähnt
6. **Lese component-patterns** wenn ein konkretes Pattern (Bento, Hero, Card, Marquee) gebaut wird
7. **Lese ui-states** ALWAYS vor Output — Loading/Empty/Error/Active-States sind Pflicht

## 4. Anti-Slop — Hard Banned Patterns

Diese Patterns produzieren generischen AI-Output. Niemals verwenden, außer explizit gefordert.

### Typografie
- **Inter** für Premium/Creative — verboten. Stattdessen: Geist, Outfit, Cabinet Grotesk, Satoshi, PP Mori.
- **Roboto, Arial, system-ui** für sichtbare Headlines — verboten.
- **Serif auf Dashboard-UIs** — verboten. Nur Editorial/Creative.
- **Gradient-Text auf großen Headlines** — verboten. Color + Weight macht Hierarchie.

### Farben
- **Pure `#000000`** — verboten. Stattdessen `#0a0a0a`, Zinc-950, Charcoal.
- **„AI Lila/Blau"-Gradients (purple→pink, indigo→purple)** — STRENG VERBOTEN.
- **Übersättigte Akzente (Saturation > 80%)** — verboten.
- **Mehr als 1 Akzentfarbe** — verboten.
- **Neon-Glow-Shadows** — verboten. Inner-Borders oder tinted-Shadows.

### Layout
- **Zentrierter Hero über Bild** bei VARIANCE > 4 — verboten. Stattdessen: Split-Screen 50/50, Left-Content/Right-Asset, asymmetric Whitespace.
- **3-equal-Card-Layout** — verboten. Stattdessen: 2-Column-Zig-Zag, asymmetric Grid, Horizontal-Scroll.
- **Generic Card-Container überall** bei DENSITY > 7 — verboten. `border-t`, `divide-y`, Whitespace.
- **`h-screen` für Hero** — verboten (iOS Safari Bug). IMMER `min-h-[100dvh]`.
- **Flex-Math `w-[calc(33%-1rem)]`** — verboten. CSS-Grid `grid-cols-3 gap-6`.

### Content (Jane-Doe-Effect)
- **„John Doe", „Acme", „Nexus", „SmartFlow"** — verboten. Realistische Namen erfinden.
- **Fake-Zahlen 99.99%, 50%, 1234567** — verboten. Organisch: 47.2%, +49 8421 9302-17.
- **Filler-Wörter: „Elevate", „Seamless", „Unleash", „Next-Gen"** — verboten. Konkrete Verben.
- **Lucide-User-Icon als Avatar** — verboten.
- **Unsplash-Links** — verboten. `https://picsum.photos/seed/{string}/800/600`.

### Code-Patterns
- **Custom Mouse-Cursors** — verboten (Accessibility-Killer).
- **Emojis im UI/Text/Alt** — verboten. Phosphor/Radix-Icons.
- **Animation von `top`/`left`/`width`/`height`** — verboten. Nur `transform` + `opacity`.
- **Direktes `window.addEventListener('scroll')`** — verboten. ScrollTrigger oder `useScroll`.
- **`useState` für continuous Animations (Magnetic, Float, Cursor-Tracking)** — verboten. Framer Motion `useMotionValue` + `useTransform`.

## 5. Performance-Guardrails

- Hardware-Acceleration: nur `transform` und `opacity`
- `will-change`: sparsam, nur direkt vor Animation
- Grain/Noise: nur auf `fixed inset-0 z-50 pointer-events-none`, niemals scrollende Container
- Z-Index: keine `z-50`-Spam, nur Nav/Modal/Overlay
- Mobile bei VARIANCE > 4: aggressive single-column fallback unter 768px (`w-full px-4 py-8`)
- `min-h-[100dvh]` statt `h-screen` für Hero
- Perpetual Animations: `useMotionValue` + `useTransform` (außerhalb Render-Cycle), nie `useState`

## 6. Stack-Patterns

### React/Next.js
- Server-Components default
- Interactive Components als isolated Leaf-Components mit `'use client'` ganz oben
- Globaler State nur in Client-Components
- `useEffect` IMMER mit Cleanup
- Niemals GSAP/ThreeJS und Framer-Motion im selben Tree mixen

### Tailwind
- v3 vs v4 prüfen (`package.json`)
- Standard-Breakpoints sm/md/lg/xl/2xl
- Container `max-w-[1400px] mx-auto` oder `max-w-7xl`
- Grid statt Flex-Math
- Icons: `@phosphor-icons/react` ODER `@radix-ui/react-icons` (eine wählen, konsistent)
- shadcn/ui: nur als Basis, IMMER Radii/Colors/Shadows customizen

## 7. Pre-Flight Checklist (vor jedem Output)

- [ ] Klare ästhetische Direktion gewählt, nicht „neutral"?
- [ ] Keine Inter / kein Lila-Gradient / kein zentrierter Hero?
- [ ] Mobile-Layout-Collapse mit `min-h-[100dvh]`?
- [ ] Container `max-w-7xl mx-auto px-4`?
- [ ] CSS-Grid statt Flex-Math?
- [ ] Alle UI-States: Loading, Empty, Error, Active?
- [ ] `prefers-reduced-motion`-Fallback?
- [ ] Focus-visible-Rings auf allen Interactives?
- [ ] `useEffect` mit Cleanup?
- [ ] Perpetual Animations in isolierten Client-Components mit `React.memo`?
- [ ] Realistische Content statt „John Doe"?
- [ ] EINE Akzentfarbe, EINE Font-Familie für Display/Body, EIN Easing-Set?
- [ ] Cards weggelassen wo Whitespace + Borders reichen?
- [ ] Bei externen Bildern: `picsum.photos/seed/...`?
- [ ] Bei Tailwind v4: `@tailwindcss/postcss` (NICHT `tailwindcss`-Plugin)?

Wenn ein Punkt offen: nachbessern, bevor Output kommt.

## 8. Output-Format

Liefere immer:
1. **1–2 Sätze Direction-Begründung** (welche Direktion, warum, welcher Designer-Bias)
2. **`npm install ...`-Block** wenn Libraries nötig sind
3. **Working Code**
4. **States-Notiz** — was implementiert ist
5. **Anpass-Hooks** — welche CSS-Vars / Tailwind-Vars leicht änderbar sind

NIEMALS: lange Erklärungen vor Code, konkurrierende Direktionen im selben Output, generic Headers wie „Welcome to your new website", Filler-Kommentare wie „// Your magic happens here".

## 9. Variation > Konvergenz

Wenn die letzte Generation Direktion A war, wähle beim nächsten Projekt eine andere. Lieber Direktion bewusst wechseln als zur Default-Konvergenz tendieren.
