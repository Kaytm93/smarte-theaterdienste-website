---
tags: [komponenten, animation]
---

# Animation-Plan (GSAP, apple-like)

## Tokens

| Token | Wert |
|---|---|
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| `--duration-fast` | `200ms` (hover, micro) |
| `--duration-base` | `400ms` (transitions) |
| `--duration-slow` | `800ms` (reveals) |

## Patterns

### Reveal on Scroll
```tsx
gsap.from(element, {
  y: 30, opacity: 0, duration: 0.8,
  ease: "power2.out",
  scrollTrigger: { trigger: element, start: "top 85%" }
});
```
Bei Listen: `stagger: 0.05`.

### Parallax Hero
```tsx
gsap.to(bgImage, {
  yPercent: -20,
  ease: "none",
  scrollTrigger: { trigger: section, scrub: true }
});
```

### Comic-Strip (Landing)
**Variante A — pinned horizontal scroll** (Desktop):
- Section gepinnt, x-translate via ScrollTrigger scrub
**Variante B — vertical stagger** (Mobile + Reduced Motion):
- panels fade-in nacheinander on scroll

Entscheidung in M6.

### Hover Card
- `scale: 1.02`, `box-shadow: lift`, `transition: 200ms ease-out`
- via Tailwind `hover:scale-[1.02] hover:shadow-lg transition`

## `prefers-reduced-motion`

In jedem Animation-Component:
```tsx
const reduced = useReducedMotion(); // window.matchMedia("(prefers-reduced-motion: reduce)")
if (reduced) {
  gsap.set(element, { y: 0, opacity: 1 });
  return;
}
```

## ScrollTrigger Lifecycle (Next.js 16)

- `registerScrollTrigger()` einmalig im Layout-Client-Boundary
- `useGSAP` Hook (gsap-react) für Cleanup (M6 install, optional)
- ScrollTrigger.refresh() nach Page-Transitions
