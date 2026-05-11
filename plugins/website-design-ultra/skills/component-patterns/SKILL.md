---
name: component-patterns
description: Lade diesen Skill wenn konkrete UI-Patterns gebaut werden — Hero, Bento, Card, Marquee, Spotlight, Tilt, Glass, Magnetic, Sticky-Stack, Modal, Toast, Form. Triggers — hero, bento, card, marquee, spotlight, magnetic, tilt, glass, sticky, scroll-stack, parallax, modal, drawer, toast, form, navigation, nav, footer.
---

# Component Patterns — Anti-Boring-Bibliothek

Konkrete Patterns, copy-paste-fertig. Pattern wählen, an die gewählte Direktion farblich/typografisch anpassen.

## HERO-PATTERNS

### 1. Asymmetric Split (Default für Marketing)
Text 60% links, Asset 40% rechts. Vertikal **nicht** zentriert — Text oben links, Asset unten rechts.
```html
<section class="min-h-[100dvh] grid grid-cols-12 gap-8 px-6 py-24">
  <div class="col-span-12 md:col-span-7 flex flex-col justify-start">
    <h1 class="text-hero tracking-tighter">…</h1>
    <p class="text-body mt-6 max-w-[55ch]">…</p>
  </div>
  <div class="col-span-12 md:col-span-5 md:col-start-8 self-end">
    <!-- Asset -->
  </div>
</section>
```

### 2. Type-First (für Refined Minimalism / Brutalist)
Kein Bild. Massive Display-Typo, Subline, ein CTA. BG ist Mesh-Gradient oder Noise.
```html
<section class="min-h-[100dvh] flex flex-col justify-center px-6 max-w-7xl mx-auto">
  <p class="text-caption uppercase tracking-wider text-muted mb-4">v2.0 — out now</p>
  <h1 class="text-[clamp(3rem,9vw,8rem)] font-semibold leading-[0.95] tracking-tighter">
    Closes 23<br/>browser-tabs<br/>at once.
  </h1>
  <p class="text-subtitle text-muted mt-8 max-w-[50ch]">Restores them tomorrow morning. Without asking.</p>
</section>
```

### 3. Curtain Reveal (Scroll-Hero)
Zwei Halbe des Heros gleiten beim Scrollen auseinander. Hinter ihnen erscheint Asset.

### 4. Editorial Drop-Cap
H1 mit Drop-Cap, Text fließt um Asset. Magazin-Look.

### 5. Floating Bento (für Glassmorphism)
Mehrere kleine Cards „schweben" um den Header. Hero-Text ist relativ klein (Subtitle-Niveau), die Cards machen den Wow-Effekt.

### 6. Terminal/Console (für Retro-Futuristic)
Full-Bleed Terminal mit live-typing System-Output. Buchstaben erscheinen nacheinander.

---

## BENTO 2.0 — vollständiges Pattern

```tsx
'use client';

// Layout: Row 1 = 3 gleiche cols, Row 2 = 70/30 split
// Container: rounded-[2.5rem], p-8 bis p-10
// Background: #f9fafb
// Cards: #ffffff mit border-slate-200/50

export function BentoGrid() {
  return (
    <section className="bg-[#f9fafb] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-display tracking-tight mb-16">Built for builders.</h2>

        <div className="grid grid-cols-12 gap-6">
          {/* Row 1: 3 cards */}
          <BentoCard className="col-span-12 md:col-span-4" title="Intelligent Sort"><IntelligentList /></BentoCard>
          <BentoCard className="col-span-12 md:col-span-4" title="Ask Anything"><CommandInput /></BentoCard>
          <BentoCard className="col-span-12 md:col-span-4" title="Live Status"><LiveStatus /></BentoCard>

          {/* Row 2: 70/30 split */}
          <BentoCard className="col-span-12 md:col-span-8" title="Data Stream"><DataStream /></BentoCard>
          <BentoCard className="col-span-12 md:col-span-4" title="Focus Mode"><ContextualUI /></BentoCard>
        </div>
      </div>
    </section>
  );
}

function BentoCard({ children, className, title }) {
  return (
    <div className={className}>
      <div className="rounded-[2.5rem] bg-white border border-slate-200/50 p-10 h-full shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
        {children}
      </div>
      <h3 className="text-title mt-6">{title}</h3>
    </div>
  );
}
```

Labels (Titel + Description) **außerhalb und unter** der Card — Gallery-Style.

---

## DIE 5 CARD-ARCHETYPEN (Bento-Pflicht-Repertoire)

### Archetyp 1: The Intelligent List
Vertikaler Stack, infinite auto-sorting Loop via `layoutId`.
```tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { memo, useState, useEffect } from 'react';

export const IntelligentList = memo(function IntelligentList() {
  const [items, setItems] = useState([
    { id: 'a', label: 'Deploy API', priority: 1 },
    { id: 'b', label: 'Fix race condition', priority: 2 },
    { id: 'c', label: 'Review PR #847', priority: 3 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prev => {
        const shuffled = [...prev];
        const i = Math.floor(Math.random() * shuffled.length);
        const j = Math.floor(Math.random() * shuffled.length);
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        return shuffled;
      });
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-2">
      <AnimatePresence>
        {items.map(item => (
          <motion.div
            key={item.id}
            layoutId={item.id}
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50"
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          >
            <span className="text-caption text-slate-500 font-mono">0{item.priority}</span>
            <span className="text-body">{item.label}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
});
```

### Archetyp 2: The Command Input
Search/AI-Bar mit Typewriter-Cycle durch Prompts + Shimmer-Loading.
```tsx
'use client';
import { memo, useState, useEffect } from 'react';

const prompts = [
  'Find all PRs blocked on me',
  'Summarize today\'s standup',
  'Draft reply to the design feedback',
];

export const CommandInput = memo(function CommandInput() {
  const [text, setText] = useState('');
  const [pi, setPi] = useState(0);
  const [ci, setCi] = useState(0);

  useEffect(() => {
    if (ci < prompts[pi].length) {
      const t = setTimeout(() => {
        setText(prompts[pi].slice(0, ci + 1));
        setCi(ci + 1);
      }, 40);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setCi(0);
      setText('');
      setPi((pi + 1) % prompts.length);
    }, 2000);
    return () => clearTimeout(t);
  }, [ci, pi]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-body text-slate-700">{text}<span className="text-emerald-500 animate-pulse">|</span></span>
      </div>
    </div>
  );
});
```

### Archetyp 3: The Live Status
„Breathing" Status-Dots + Overshoot-Notification (3s sichtbar).

### Archetyp 4: The Wide Data Stream
Horizontaler Infinite Carousel `x: ["0%", "-100%"]` seamless.
```tsx
'use client';
import { motion } from 'framer-motion';
import { memo } from 'react';

const metrics = [
  { label: 'Active Users', value: '47,283' },
  { label: 'Avg Response', value: '127ms' },
  { label: 'Uptime', value: '99.94%' },
  { label: 'Deploys/day', value: '23' },
];

export const DataStream = memo(function DataStream() {
  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex gap-6"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        {[...metrics, ...metrics].map((m, i) => (
          <div key={i} className="flex-shrink-0 px-6 py-4 rounded-2xl bg-slate-50 min-w-[200px]">
            <div className="text-caption text-slate-500">{m.label}</div>
            <div className="text-display font-mono tabular-nums mt-1">{m.value}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
});
```

### Archetyp 5: The Contextual UI
Document-View mit staggered Text-Highlight, dann Float-In Floating Toolbar.

---

## CARD-PATTERNS (für nicht-Bento Sections)

### Spotlight Border Card
Border leuchtet unter Cursor (CSS Custom Properties + Pointer-Tracking).
```tsx
'use client';
import { memo, useRef } from 'react';

export const SpotlightCard = memo(function SpotlightCard({ children }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className="group relative rounded-3xl p-px overflow-hidden"
      style={{ background: 'radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.4), transparent 40%)' }}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        ref.current!.style.setProperty('--mx', `${e.clientX - rect.left}px`);
        ref.current!.style.setProperty('--my', `${e.clientY - rect.top}px`);
      }}
    >
      <div className="rounded-3xl bg-slate-950 p-8 h-full">
        {children}
      </div>
    </div>
  );
});
```

### Parallax Tilt Card
3D-Tilt zur Mouse-Position (via Framer Motion `useMotionValue`, NICHT `useState`).

### Glassmorphism Panel
`backdrop-blur-2xl` + Inner-Border + Inner-Shadow:
```css
.glass {
  backdrop-filter: blur(40px);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
}
```

### Holographic Foil
Iridescent Rainbow auf Hover. CSS `conic-gradient` mit Mouse-Tracking.

### Morphing Modal
Button expandiert via `layoutId` zu Modal.

---

## TYPOGRAFIE-PATTERNS

### Kinetic Marquee
Endless Text-Bands, reverse-on-scroll. Mit Framer Motion `useScroll` + `useTransform`:
```tsx
'use client';
import { motion, useScroll, useTransform } from 'framer-motion';

export function Marquee({ children }) {
  const { scrollY } = useScroll();
  const x = useTransform(scrollY, [0, 1000], ['0%', '-30%']);

  return (
    <motion.div className="flex gap-12 text-hero whitespace-nowrap" style={{ x }}>
      {children}
    </motion.div>
  );
}
```

### Text Mask Reveal
Massive Typo als transparentes Fenster zu Video/Image (`background-clip: text`).

### Text Scramble
Matrix-Decode on Load/Hover. Plain JS, kein Library nötig.

### Animated SVG Line Drawing
`<path>` mit `stroke-dasharray` + `stroke-dashoffset` Animation.

---

## SCROLL-PATTERNS

### Sticky-Scroll-Stack
Cards stacken sich beim Scrollen physisch übereinander.
```tsx
<div className="space-y-[-200px]">
  {sections.map((s, i) => (
    <div key={i} className="sticky top-24 rounded-3xl p-12 bg-white shadow-xl">
      {s.content}
    </div>
  ))}
</div>
```

### Horizontal Scroll Hijack
Vertikales Scrollen → horizontaler Pan via GSAP ScrollTrigger.

### Zoom Parallax
Background zoomt seamless rein/raus, Foreground bleibt still.

### Scroll-Progress-Path
SVG-Vector zeichnet sich beim Scrollen.

---

## MICRO-INTERACTIONS

### Magnetic Button
Siehe motion-system Skill.

### Directional Hover Aware
Fill kommt von der Seite, von der die Maus reinkommt.

### Ripple Click
Wellen genau von Click-Koordinaten.

### Skeleton Shimmer
```css
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

---

## NAVIGATION-PATTERNS

### Floating Nav (für Marketing)
Sticky, mit Backdrop-Blur, mittig im Viewport:
```html
<nav class="fixed top-6 left-1/2 -translate-x-1/2 z-50 backdrop-blur-xl bg-white/70 border border-white/20 rounded-full px-6 py-3 flex items-center gap-6 shadow-lg">
  <!-- Logo + Links -->
</nav>
```

### Linear-Style Top-Nav
Edge-to-Edge, ultra-dünn (40–48px Höhe), Border-Bottom statt Shadow.

### Brutalist Side-Nav
Fixed left, full-height, harte Borders, große Numbers.

---

## FORM-PATTERNS

```html
<form class="space-y-6">
  <div class="space-y-2">
    <label for="email" class="text-caption uppercase tracking-wide text-muted">Email</label>
    <input id="email" type="email" required
           class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition" />
    <p class="text-small text-muted">We never share your address.</p>
  </div>

  <button class="w-full py-3 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 active:scale-[0.98] transition">
    Continue
  </button>
</form>
```

**Pflicht:**
- Label **über** Input
- Helper-Text optional, immer im Markup
- Error-Text **unter** Input, in Rot, mit `role="alert"`
- `:active` mit `scale-[0.98]` für tactile Feedback
- Focus-Ring sichtbar (`focus:ring-2`)
