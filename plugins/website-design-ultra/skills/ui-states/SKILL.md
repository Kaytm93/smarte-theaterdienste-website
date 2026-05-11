---
name: ui-states
description: Lade diesen Skill VOR dem Output bei jeder Component-Generierung. Enthält Pflicht-Patterns für Loading, Empty, Error, Active States und Accessibility-Requirements. LLMs generieren standardmäßig nur den Happy-Path — dieser Skill erzwingt vollständige State-Coverage.
---

# UI-States — Pflicht-Patterns

LLMs generieren standardmäßig nur den „Happy Path". Du MUSST alle States liefern. Vor jedem Output: gehe alle States durch.

## 1. LOADING

### Skeleton-Loader (Default — nicht Spinner!)
Skeletons matchen das Layout. Niemals generic Circular-Spinner für Content-Loading.

```tsx
function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200 p-6 space-y-4">
      <div className="skeleton h-4 w-1/3 rounded" />
      <div className="skeleton h-8 w-2/3 rounded" />
      <div className="skeleton h-20 w-full rounded" />
      <div className="flex gap-2">
        <div className="skeleton h-3 w-16 rounded" />
        <div className="skeleton h-3 w-20 rounded" />
      </div>
    </div>
  );
}
```

```css
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

### Dark-Mode-Skeleton
```css
.skeleton-dark {
  background: linear-gradient(90deg, #1a1a1a 25%, #262626 50%, #1a1a1a 75%);
}
```

### Wann doch Spinner?
- Button-Loading (within Button, <40px)
- Inline-Aktion (z.B. „Saving..." beim Auto-Save)
- Initial-App-Boot (full-screen, sehr kurz)

```tsx
<button disabled={isLoading} className="…">
  {isLoading ? (
    <span className="flex items-center gap-2">
      <Spinner className="w-4 h-4" />
      Saving…
    </span>
  ) : 'Save'}
</button>
```

---

## 2. EMPTY

Niemals „No data" als einsamer Text. Empty-State ist ein Design-Element.

```tsx
function EmptyInbox() {
  return (
    <div className="flex flex-col items-center text-center py-16 px-6">
      {/* Dekoratives SVG-Element — keine Lucide-Stock-Icons */}
      <div className="w-24 h-24 rounded-2xl bg-slate-100 grid place-items-center mb-6">
        <CustomIllustration />
      </div>

      <h3 className="text-title mb-2">Inbox-Zero, achieved.</h3>
      <p className="text-body text-muted max-w-md mb-6">
        Nothing pending right now. New messages will appear here.
      </p>

      <button className="text-caption uppercase tracking-wide hover:text-emerald-600 transition">
        Browse archived →
      </button>
    </div>
  );
}
```

**Pflicht:**
- Dekoratives visuelles Element (Illustration, Pattern, oder generative Shape — NICHT Standard-Lucide-User-Icon)
- Klare Headline (vermeidet „No data", lieber „Inbox-Zero, achieved.")
- Beschreibung was passieren wird
- Optionaler Call-to-Action (Browse-Link, Tutorial-Link)

---

## 3. ERROR

Inline und klar. `role="alert"` zwingend für Screen-Reader.

```tsx
function FormFieldError({ message }) {
  return (
    <p role="alert" className="flex items-center gap-2 mt-2 text-small text-rose-600">
      <WarningIcon className="w-4 h-4 flex-shrink-0" />
      <span>{message}</span>
    </p>
  );
}

function NetworkError({ onRetry }) {
  return (
    <div role="alert" className="rounded-2xl border border-rose-200 bg-rose-50 p-6">
      <div className="flex items-start gap-3">
        <WarningIcon className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-medium text-rose-900">Couldn't reach the server.</h3>
          <p className="text-small text-rose-700 mt-1">
            Check your connection, then try again.
          </p>
          <button
            onClick={onRetry}
            className="mt-3 text-caption uppercase tracking-wide font-medium text-rose-900 hover:text-rose-700 transition"
          >
            Retry →
          </button>
        </div>
      </div>
    </div>
  );
}
```

**Pflicht:**
- `role="alert"` für Screen-Reader
- Klare Beschreibung WAS passiert ist (NICHT „Something went wrong")
- Was kann der User tun? (Retry-Button, Helper-Text)
- Inline bei Forms (unter dem Input)
- Form-Field-Errors: Input bekommt `border-rose-500` zusätzlich

---

## 4. ACTIVE / TACTILE FEEDBACK

`:active`-State signalisiert physischen Push.

```css
/* Default für alle Buttons */
button:active {
  transform: scale(0.98);
  transition-duration: 50ms;
}

/* Premium-Variante mit Translate */
button.premium:active {
  transform: translateY(1px);
}
```

Tailwind:
```html
<button class="active:scale-[0.98] transition">…</button>
```

---

## 5. SUCCESS

Nicht overlooked. User braucht Bestätigung.

```tsx
function SuccessToast({ message }) {
  return (
    <div role="status" className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 shadow-lg">
      <CheckIcon className="w-5 h-5 text-emerald-600" />
      <span className="text-body text-emerald-900">{message}</span>
    </div>
  );
}
```

Mit Overshoot-Spring rein (Jakub-Style):
```tsx
<motion.div
  initial={{ opacity: 0, y: 20, scale: 0.9 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  exit={{ opacity: 0, scale: 0.95 }}
  transition={{ type: 'spring', stiffness: 300, damping: 12 }}
>
  <SuccessToast message="Saved." />
</motion.div>
```

---

## 6. ACCESSIBILITY — NON-NEGOTIABLE

### Pflicht-Checks

| Requirement | Standard |
|---|---|
| Body-Text-Kontrast | min 4.5:1 (AA), 7:1 (AAA) |
| UI-Element-Kontrast | min 3:1 |
| Focus-States | sichtbarer Focus-Ring auf ALLEN interactives |
| Touch-Targets | min 44×44px |
| Keyboard-Nav | Tab-Order matcht visuelle Order |
| Alt-Text | deskriptiv für meaningful Images, `alt=""` für dekorative |
| Form-Labels | `<label for="...">` zwingend |
| Helper-Text | `aria-describedby` |
| Error | `role="alert"`, dynamische Errors `aria-live="polite"` |
| Icon-only Buttons | `aria-label` zwingend |

### Focus-Ring-Defaults

```css
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-radius: 4px;
}

/* Tailwind */
.focusable {
  @apply focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2;
}
```

### prefers-reduced-motion

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

In React (Framer Motion):
```tsx
import { useReducedMotion } from 'framer-motion';
const shouldReduce = useReducedMotion();
const variant = shouldReduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' };
```

---

## State-Coverage-Checklist (vor Output)

Pro Component:
- [ ] **Happy** — Component mit Daten ✓
- [ ] **Loading** — Skeleton (NICHT Spinner) das das Layout matcht
- [ ] **Empty** — beautifully composed, mit CTA
- [ ] **Error** — klare Message + Retry, `role="alert"`
- [ ] **Active** — `:active` mit `scale-[0.98]` oder `translate-y-[1px]`
- [ ] **Success** — Toast mit Overshoot-Spring
- [ ] **Disabled** — visuell und semantisch (`aria-disabled`)
- [ ] **Focus** — sichtbarer Focus-Visible-Ring

Pro Page:
- [ ] **prefers-reduced-motion** Fallback
- [ ] Color-Contrast AA für Body, AAA wenn möglich
- [ ] Touch-Targets min 44×44 auf Mobile
- [ ] Keyboard-Navigation testbar (Tab-Reihenfolge stimmt)
