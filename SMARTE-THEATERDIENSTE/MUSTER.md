# 🎯 Code-Patterns — IMMER korrekt anwenden

> **Dies ist Next.js 16 + next-intl 4 + React 19. Vieles ist anders als in Trainings-Wissen.**
> Im Zweifel: `node_modules/next/dist/docs/01-app/` lesen.

---

## Next.js 16 Pflicht-Patterns

### `params` und `searchParams` sind Promises

❌ **Falsch (Next.js 15):**
```tsx
export default function Page({ params }: { params: { locale: string } }) {
  const locale = params.locale;
}
```

✅ **Richtig (Next.js 16):**
```tsx
export default async function Page({
  params,
}: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
}
```

Gilt auch für `searchParams`, `cookies()`, `headers()`, `draftMode()`.

### `proxy.ts` statt `middleware.ts`

❌ **Falsch:**
```ts
// src/middleware.ts
export function middleware(request: NextRequest) { ... }
```

✅ **Richtig:**
```ts
// src/proxy.ts
export function proxy(request: NextRequest) { ... }
// Edge-Runtime NICHT erlaubt – bleibt nodejs.
```

`skipMiddlewareUrlNormalize` heißt jetzt `skipProxyUrlNormalize`.

### `revalidateTag` mit Profile

❌ **Falsch:**
```ts
revalidateTag('posts');
```

✅ **Richtig:**
```ts
import { revalidateTag, updateTag } from 'next/cache';

// Stale-while-revalidate (Blog, Katalog)
revalidateTag('posts', 'max');

// Read-your-writes (Forms, Settings)
updateTag(`user-${userId}`);
```

### `images.remotePatterns` statt `images.domains`

```ts
// next.config.ts
images: {
  remotePatterns: [
    { protocol: 'https', hostname: '*.supabase.co' },
  ],
}
```

### Turbopack Default

`next dev` und `next build` nutzen Turbopack ohne Flag. Kein `--turbopack` mehr nötig in `package.json`.

---

## next-intl Patterns

### Navigation IMMER über lokalisiertes Modul

❌ **Falsch:**
```tsx
import Link from 'next/link';
<Link href="/projekt">…</Link>  // bricht Locale-Routing
```

✅ **Richtig:**
```tsx
import { Link } from '@/lib/i18n/navigation';
<Link href="/projekt">…</Link>  // wird zu /de/projekt oder /en/project
```

Gilt analog für `useRouter`, `usePathname`, `redirect`, `getPathname`.

### Server Component holt Translations

```tsx
import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);          // wichtig für Static Rendering
  const t = await getTranslations('hero');
  return <h1>{t('title')}</h1>;
}
```

### Client Component holt Translations

```tsx
'use client';
import { useTranslations } from 'next-intl';

export function MyClientThing() {
  const t = useTranslations('hero');
  return <p>{t('subtitle')}</p>;
}
```

`NextIntlClientProvider` ist bereits in `[locale]/layout.tsx` gewrappt.

### Slug-Übersetzung

In `src/lib/i18n/routing.ts` `pathnames`-Map ergänzen wenn neue Route mit DE/EN-Variante. Internal Key (z. B. `/projekt`) bleibt überall im Code, das Module mappt automatisch.

---

## Tailwind v4 Patterns

Keine `tailwind.config.ts`! Tokens kommen via `@theme inline` in `globals.css`:

```css
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
}
```

Custom Tokens (Easings, Durations) in `src/styles/tokens.css` und an passender Stelle importiert.

---

## GSAP + ScrollTrigger Pattern

```tsx
'use client';
import { useGSAP } from '@gsap/react';   // installieren in M2
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { registerScrollTrigger } from '@/lib/gsap/registerScrollTrigger';

export function FadeInOnScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    registerScrollTrigger();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(ref.current, { y: 0, opacity: 1 });
      return;
    }
    gsap.from(ref.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: ref.current, start: 'top 85%' },
    });
  }, { scope: ref });

  return <div ref={ref}>{children}</div>;
}
```

**Wichtig:** `useGSAP` (aus `@gsap/react`) übernimmt Cleanup automatisch. Kein manuelles `useEffect` mit `return () => st.kill()`.

---

## Supabase Pattern (ab M4)

### Server (RSC, Server Action, Route Handler)

```ts
// src/lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function getSupabaseServer() {
  const cookieStore = await cookies();          // Next.js 16 async!
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) =>
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)),
      },
    }
  );
}
```

### Client Component

```ts
// src/lib/supabase/client.ts
'use client';
import { createBrowserClient } from '@supabase/ssr';

export const supabaseBrowser = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
```

### i18n Join für lokalisierten Content

```ts
const { data } = await supabase
  .from('posts')
  .select('*, post_translations!inner(title, excerpt, body_md)')
  .eq('post_translations.locale', locale)
  .eq('status', 'published');
```

---

## Commit-Message Style

Format: `<Milestone-Tag>: <kurzer Titel>` + freie Body-Beschreibung.

```
M2: Design-System – Tokens, Header/Footer, Animation-Primitives

- shadcn init mit Slate-Variant + Custom-Farben
- <Header> sticky-translucent mit <LanguageSwitcher>
- <Footer> Logo-Grid + Impressum/DS-Links
- <FadeInOnScroll>, <RevealText>, <ParallaxImage>
- Tokens.css ausgebaut: Farben, Typo-Scale, Spacing
```

Keine `Co-Authored-By: Claude` Zeilen — der Repo-Owner führt die Commits.
