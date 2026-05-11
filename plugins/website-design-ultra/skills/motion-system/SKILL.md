---
name: motion-system
description: Lade diesen Skill wenn Animationen, Transitions, Scroll-Effekte, Hover-States, Micro-Interactions oder Motion-Design benötigt werden. Triggers — animation, motion, scroll, hover, transition, framer-motion, gsap, scrolltrigger, magnetic, parallax, marquee, spring, easing. Enthält Drei-Designer-Filter (Emil/Jakub/Jhey), Easing-Bibliothek, Spring-Presets, Performance-Regeln und Accessibility-Pflichten.
---

# Motion System

## Drei-Designer-Filter

Je nach Projekt-Kontext (siehe core-rules Mapping) primärer Designer:

### Emil Kowalski — Restraint & Speed (Productivity-Bias)
- High-Frequency-Interaktionen (Tab, Toggle, Hover): **unter 200ms**
- Keyboard-initiierte Aktionen: **KEINE Animation** (springt instant — User hat schon kommittet)
- Scale-Ranges: niemals von `scale(0)`. Start bei `scale(0.9)`+
- CSS-Transitions (interruptierbar) > CSS-Keyframes (locked-in)
- Transform-Origin auf Dropdowns/Popovers: vom Trigger ausgehend
- **Emil-Mantra:** „If the user already committed to the action, don't make them wait for animation."

### Jakub Krehel — Production Polish (Default)
- Enter: `opacity` + `translateY(8px → 0)` + `blur(4px → 0)`, 400–600ms, Spring `bounce: 0`
- Exit: subtler oder fehlt ganz (NICHT spiegelbildlich zu Enter)
- Hover: 150–200ms Minimum
- Icon-Swaps: `opacity` + `scale(0.8 → 1)` + `blur(2px → 0)`, niemals instant
- Shadows tinten zur BG-Hue (siehe color-palettes)
- Optical-Alignment (Play-Button-Dreieck leicht rechts, weil visuell mittig wirkt)
- **Jakub-Mantra:** „The polish is in the exits, the optical alignment, the blur on icon swaps."

### Jhey Tompkins — Experimentation & Delight (Creative-Bias)
- `@property` für animierte CSS-Variablen (echte Property-Interpolation)
- `linear(...)` Easing-Curves (CSS-Spec, ersetzt cubic-bezier für organische Motion)
- Scroll-driven Animations via `animation-timeline: scroll()`
- Playful: Bounces erlaubt, Rotation, Squash & Stretch, Particle-Effects
- **Jhey-Mantra:** „CSS can do more than you think — try it before you reach for JS."

---

## Context-to-Designer-Mapping

| Projekt | Primary | Secondary | Selektiv |
|---|---|---|---|
| Productivity-Tool | Emil | Jakub | Jhey (Onboarding) |
| Kids/Education | Jakub | Jhey | Emil (High-Freq) |
| Creative Portfolio | Jakub | Jhey | Emil |
| Marketing/Landing | Jakub | Jhey | Emil (Forms/Nav) |
| SaaS Dashboard | Emil | Jakub | Jhey (Empty States) |
| Mobile App | Jakub | Emil | Jhey |
| E-Commerce | Jakub | Emil | Jhey (Showcase) |
| Editorial | Jhey | Jakub | — |

---

## Easing-Bibliothek (eine Familie pro Projekt!)

```css
:root {
  /* Apple Spring — premium product feel */
  --ease-apple:        cubic-bezier(0.32, 0.72, 0, 1);

  /* Out-Expo — smooth, dramatic */
  --ease-out-expo:     cubic-bezier(0.16, 1, 0.3, 1);

  /* Out-Quart — soft natural */
  --ease-out-quart:    cubic-bezier(0.25, 1, 0.5, 1);

  /* Snappy — sharp UI feedback */
  --ease-snap:         cubic-bezier(0.6, 0.05, 0.01, 1);

  /* Linear-Tier — productivity-grade */
  --ease-linear-prod:  cubic-bezier(0.4, 0, 0.2, 1);

  /* CSS-linear() for organic — modern browsers */
  --ease-organic:      linear(0, 0.1 7.5%, 0.4 18%, 0.8 35%, 1);
}
```

---

## Duration-Defaults

| Pattern | Duration | Context |
|---|---|---|
| Micro (Button, Toggle) | 100–200ms | Emil productivity |
| Transition (Modal, Tab) | 200–400ms | Default |
| Entrance (List-Item) | 300–500ms | Mit Stagger |
| Page-Transitions | 400–700ms | Hero-Moments |
| Hover-Reveal | 150–200ms | |
| Icon-Swap | 200ms | Jakub-Style mit Blur |
| Perpetual (Float, Pulse) | 2000–4000ms | Loop, dezent |

---

## Spring-Physics (Framer Motion)

```ts
// Premium / Default
{ type: "spring", stiffness: 100, damping: 20 }

// Snappy für Productivity
{ type: "spring", stiffness: 400, damping: 30 }

// Playful für Kids/Creative
{ type: "spring", stiffness: 200, damping: 15, mass: 0.8 }

// Overshoot für Notifications
{ type: "spring", stiffness: 300, damping: 12 }

// Glass-Smooth für Glassmorphism
{ type: "spring", stiffness: 80, damping: 25, mass: 1.2 }
```

---

## MOTION_INTENSITY-Skala

### 1–3 Static
Nur `:hover` und `:active` CSS-Transitions. Nichts auto-animiertes.

### 4–7 Fluid CSS
```css
transition: all 300ms var(--ease-out-expo);
```
- `animation-delay`-Cascades für Page-Load
- Strikt nur `transform` + `opacity`
- `will-change: transform` sparsam (nur direkt vor Animation)

### 8–10 Advanced Choreography
- Framer Motion + GSAP ScrollTrigger
- Komplexe Choreographien, Pin-Sections, Horizontal-Hijack
- NIEMALS direkter Scroll-Listener (`window.addEventListener('scroll')`)
- Library-Trennung: GSAP/ThreeJS ODER Framer-Motion pro Component-Tree, nie beides

---

## Stagger-Pattern (Page-Load)

### CSS-Only (Refined Minimalism / Apple)
```css
.stagger > * {
  opacity: 0;
  transform: translateY(8px);
  animation: rise 600ms var(--ease-out-expo) forwards;
}
.stagger > *:nth-child(1) { animation-delay: 0ms; }
.stagger > *:nth-child(2) { animation-delay: 80ms; }
.stagger > *:nth-child(3) { animation-delay: 160ms; }
.stagger > *:nth-child(4) { animation-delay: 240ms; }

@keyframes rise {
  to { opacity: 1; transform: translateY(0); }
}
```

### Framer Motion (für Bento/Interaktive Listen)
```tsx
'use client';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const item = {
  hidden: { opacity: 0, y: 8, filter: 'blur(4px)' },
  show: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 100, damping: 20 }
  }
};

export function StaggerList({ children }) {
  return (
    <motion.div variants={container} initial="hidden" animate="show">
      {Children.map(children, c => <motion.div variants={item}>{c}</motion.div>)}
    </motion.div>
  );
}
```

**CRITICAL:** Parent (`variants`) und Children müssen im identischen Client-Component-Tree liegen. Bei async-Daten: Daten als Props in zentrale Parent-Motion-Wrapper geben.

---

## Magnetic Hover (für Buttons/Icons)

```tsx
'use client';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, memo } from 'react';

export const MagneticButton = memo(function MagneticButton({ children, strength = 0.3 }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const ySpring = useSpring(y, { stiffness: 150, damping: 15 });

  return (
    <motion.button
      ref={ref}
      style={{ x: xSpring, y: ySpring }}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) * strength);
        y.set((e.clientY - centerY) * strength);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.button>
  );
});
```

**CRITICAL:** `memo` zwingend. Niemals `useState` für Cursor-Tracking — `useMotionValue` operiert außerhalb des React-Render-Cycles.

---

## ScrollTrigger-Pattern (GSAP)

```tsx
'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ParallaxSection({ children }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.parallax-bg', {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, ref);

    return () => ctx.revert(); // CRITICAL: Cleanup
  }, []);

  return <div ref={ref}>{children}</div>;
}
```

**CRITICAL:** `gsap.context()` für strict-cleanup. Niemals GSAP-Animations ohne `revert()` in `useEffect`-cleanup.

---

## Accessibility (NON-NEGOTIABLE)

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Funktionale Animationen (Loading-Indikatoren) behalten ihre Funktion, nur Dekoratives wird statisch. Bei Framer Motion `useReducedMotion()` hook checken.

```tsx
import { useReducedMotion } from 'framer-motion';

const shouldReduce = useReducedMotion();
const variant = shouldReduce
  ? { opacity: 1 }
  : { opacity: 1, y: 0, filter: 'blur(0px)' };
```

---

## Motion-Gap-Analysis

Vor jedem Output: suche conditional renders ohne Animation:

```bash
# In existing codebase (Codex)
grep -rn "&&\s*(" --include="*.tsx" .
grep -rn "?\s*<" --include="*.tsx" .
```

Für jeden gefundenen Conditional Render checken:
- Ist er in `<AnimatePresence>`?
- Hat das Component Enter/Exit-Animations?
- Wenn nein → **Motion-Gap**, muss gefixt werden

Häufige Gaps:
- `{isOpen && <Modal />}` — appears/disappears instant
- `{mode === "a" && <ControlsA />}` — Mode-Swap ohne Transition
- `{isLoading ? <Spinner /> : <Content />}` — Loading-Snap
- `style={{ height: isExpanded ? 200 : 0 }}` ohne transition

---

## Library-Standard-Set

- **Default-Animation:** Framer Motion
- **Scroll-Telling / Canvas:** GSAP mit ScrollTrigger
- **Smooth-Scroll:** Lenis (immer mit Framer-Motion-`useScroll` koppeln, nie selbst rAF schreiben)
- **3D:** Three.js / React Three Fiber
- **NIEMALS** im selben Component-Tree mixen
