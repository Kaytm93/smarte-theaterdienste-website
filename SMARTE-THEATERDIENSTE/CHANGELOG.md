# 📝 Changelog

## 2026-04-26 — Session 2: M2 Design-System

**Commits:**
- `<fill-after-commit>` M2: Design-System – Tokens, Header/Footer, shadcn-Init, Animation-Primitives

**User-Entscheidungen vorab:**
- Schrift: Geist Sans behalten (keine Serif-Migration)
- Farben: Tailwind-neutrale Slate-Basis, konkrete Akzentfarbe in M3
- localeDetection: next-intl Default (`true`) bleibt — Browser-Sprache entscheidet

**Was passierte:**
- `pnpm add @gsap/react` (2.1.2) für `useGSAP`-Hook
- `pnpm dlx shadcn@latest init -y -b radix -p nova --no-monorepo` → Tailwind v4 erkannt, `components.json` (radix-nova, neutral baseColor, css-vars), `globals.css` mit OKLCH-Theme-Vars überschrieben, `src/lib/utils.ts` zu shadcn-Standard-`cn()`
- `pnpm dlx shadcn@latest add button accordion card sheet dialog input label` → 7 Primitives nach `src/components/ui/`
- `globals.css` korrigiert: `--font-sans: var(--font-geist-sans)`, `--font-mono: var(--font-geist-mono)`, `--font-heading: var(--font-geist-sans)`, `tokens.css`-Import, `--color-accent-brand`-Bridge in `@theme inline`
- `src/styles/tokens.css` ausgebaut: Spacing-Scale, Typo-Scale (fluid clamp), Easings (`--ease-in-out`, `--ease-spring`), Durations, `--container-max`, `--header-height`, `--container-prose`, `--accent-brand`-Slot
- `src/components/layout/`:
  - `Header.tsx` (Server) — sticky, backdrop-blur, Wortmarke, Desktop-Nav, LanguageSwitcher, MobileNav-Trigger
  - `Footer.tsx` (Server) — dreispaltig, Wortmarke + Förder-Hinweis, Logo-Platzhalter (echte SVGs in M3), Impressum/DS, © Year
  - `LanguageSwitcher.tsx` (Client) — `useRouter`/`usePathname` aus `@/lib/i18n/navigation` + `useParams` aus `next/navigation`, path-preserving Switch, Globe-Icon + Locale-Kürzel
  - `MobileNav.tsx` (Client) — shadcn `Sheet` Slide-In rechts, Auto-Close auf Link-Click
- `src/components/animations/`:
  - `FadeInOnScroll.tsx` — `useGSAP` mit `scope`, `prefers-reduced-motion`-Guard, `gsap.from({ y, opacity })` mit ScrollTrigger
  - `RevealText.tsx` — Wort-Stagger via eigene Split-Logik (kein SplitText-Plugin)
  - `ParallaxImage.tsx` — `gsap.fromTo` mit `scrub: true`, wrappt `next/image`
- `[locale]/layout.tsx` — `<Header />` + `<main className="flex-1">{children}</main>` + `<Footer />` im `<NextIntlClientProvider>`
- `[locale]/page.tsx` — Hero mit `<RevealText>` für Title, `<FadeInOnScroll>` für Kicker/Subtitle/CTA-Group, shadcn `<Button asChild>` statt Inline-Tailwind-Links
- `messages/{de,en}.json` ergänzt: `nav.menu`, `langSwitcher.{label,de,en}`, `footer.logoAlt.{buehnenverein,akademie,fraunhofer,acatech,nfdi4culture,bkm}`
- Verifikation:
  - `pnpm exec tsc --noEmit` clean
  - `pnpm exec eslint .` clean (alt-Prop in `ParallaxImage` explizit destructured)
  - Dev-Server (`smarte-theaterdienste`-launch.json) → `/de` und `/en` rendern, console-Logs sauber, LanguageSwitcher klickt `/de` → `/en` korrekt
  - Mobile Sheet öffnet, alle 5 Nav-Items + Switcher sichtbar; Desktop-Nav ab `md:` (≥768px)
  - `pnpm build` SSG-clean, beide Locales als statische Seiten, Proxy als Middleware registriert

**Status am Ende:** M2 abgeschlossen. Layout-Chrome, Tokens, Animation-Primitives, shadcn-Primitives bereit. Alle Routen außer `/de` und `/en` rendern noch 404 (M3-Aufgabe).
**Nächster Schritt:** M3 — Statische Seiten DE.

---

## 2026-04-25 — Session 1: M1 Setup & Infra

**Commits:**
- `e712aea` Initial commit from Create Next App
- `a994cd5` M1: Setup & Infra – Next.js 16, next-intl, Supabase-Skeleton

**Was passierte:**
- Plan in `/Users/kaygewinner/.claude/plans/projekt-smarte-theaterdienste-breezy-moth.md` erstellt und vom User genehmigt
- Tooling-Check: pnpm via npm-global installiert; gh und supabase CLI fehlen, Workarounds dokumentiert
- Next.js 16 Bootstrap unter `smarte-theaterdienste-website/` mit TS, Tailwind v4, App Router, src/-Dir, pnpm
- Extra-Deps installiert: next-intl 4.9.1, gsap 3.15, @supabase/ssr, @supabase/supabase-js, clsx, tailwind-merge, cva, lucide-react
- Next.js-16-Docs aus `node_modules/next/dist/docs/` gelesen — Breaking Changes notiert (proxy.ts, async params, revalidateTag)
- i18n-Setup: `lib/i18n/{routing,request,navigation}.ts`, `next.config.ts` mit `withNextIntl`, `proxy.ts` für Locale-Routing
- Layout in `src/app/[locale]/layout.tsx` umstrukturiert: html/body, NextIntlClientProvider, Geist-Fonts, generateMetadata
- Landing-Skeleton in `src/app/[locale]/page.tsx`: Kicker, Title, Subtitle, 2× CTA, Inline-Nav
- Messages-Stub `de.json` + `en.json` mit nav, hero, footer, meta-Namespaces
- Helper: `lib/utils.ts` (cn), `styles/tokens.css` (Easings/Durations), `lib/gsap/registerScrollTrigger.ts`, `lib/supabase/{client,server}.ts` (Stubs)
- Meta-Files: README, .env.example, .gitignore (Vault- und Supabase-aware)
- Verifikation:
  - `pnpm exec tsc --noEmit` clean
  - Dev-Server auf Port 3030, `/de` und `/en` rendern korrekt, Locale-Detection-Redirect klappt
  - Mobile + Desktop screenshots ok
  - `pnpm build` produziert beide Locales als SSG, Proxy als Middleware registriert
- GitHub-Repo `Kaytm93/smarte-theaterdienste-website` (public) vom User im Web angelegt; via SSH gepusht
- Obsidian-Vault `SMARTE-THEATERDIENSTE/` nach Nexus-Pattern aufgebaut: START_HIER, KONTEXT, DASHBOARD, PROBLEME, ROADMAP, MUSTER, ENTSCHEIDUNGEN, CHANGELOG, INHALTE, API + verlauf/
- Altes `_vault/` (Obsidian-Substruktur) gelöscht, Inhalte in flache Vault-Struktur migriert
- CLAUDE.md aktualisiert: zeigt jetzt auf Vault + AGENTS.md

**Status am Ende:** Beide Locales lokal lauffähig, Skeleton-Hero rendert, Repo gepusht, Vault gefüllt. Nächster Schritt M2.

---

## Template für zukünftige Sessions

```
## YYYY-MM-DD — Session N: <Milestone> <kurzer Titel>

**Commits:**
- `<sha>` <message>

**Was passierte:**
- ...

**Status am Ende:** ...
**Nächster Schritt:** ...
```
