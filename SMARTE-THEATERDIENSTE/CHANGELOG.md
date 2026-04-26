# 📝 Changelog

## 2026-04-26 (Abend) — Session 3: M3 Statische Seiten DE

**Commits:**
- (folgt am Ende der Session)

**User-Entscheidungen vorab (via AskUserQuestion):**
- Akzentfarbe: Datenraum-Blau (kühl) → `oklch(0.55 0.16 250)`
- Blog/FAQ/Termine: Coming-Soon-Stubs anlegen (statt 404 oder Nav-Entfernung)
- Impressum/Datenschutz: sichtbare TODO-Platzhalter (Auftraggeber liefert Texte)
- EN-Übersetzungen: EN-Stubs zulässig, M7 finalisiert

**Was passierte:**
- `src/styles/tokens.css`: `--accent-brand: oklch(0.55 0.16 250)` + `--accent-brand-foreground: oklch(0.985 0 0)` für Text-auf-Akzent
- `src/app/globals.css` `@theme inline`: zusätzliche Bridge `--color-accent-brand-foreground` für Tailwind-Utilities
- `src/messages/{de,en}.json` erweitert: `comingSoon.{kicker,title,body,backToHome}`, `team.{phoneLabel,mailLabel,photoCredit,portraitFallback}`, `pages.{ansprechpersonen,projekt,technischeStandards,semantischeStandards,beteiligung,anwendungsbeispiele,mitwirkung,impressum,datenschutz,blog,faq,termine}.{kicker,title,lead?}`
- `src/content/{de,en}/` neu (10 JSONs pro Locale):
  - `team.json` — 4 Personen aus INHALTE.md (Sina/Peter/Claudia/Madeleine), inkl. Quote-Felder, Fallback-Email-Pattern `vorname.nachname@buehnenverein.de`
  - `projekt.json` — 6 Sections + 2 CTA-Links
  - `projekt-technische-standards.json` — 5 Sections (JSON, Transformation, Konnektor, Datenfluss, Vertiefung)
  - `projekt-semantische-standards.json` — 4 Sections (Datenmodell, Übersetzen, Standards-Liste, Vertiefung)
  - `beteiligung.json` — Pitch-Aufruf + 3 CTA-Links
  - `beteiligung-anwendungsbeispiele.json` — 3 Use Cases mit Lucide-Icon-Keys
  - `beteiligung-mitwirkung.json` — 2 Steps + Map-Platzhalter + Partner-Liste
  - `legal.json` — `imprint`/`privacy` mit `todo: true` und Hinweistext
  - `landing.json` — Comic-Strip-Frames (4 Captions + Hue-Werte) + Pitch-Section
- `src/lib/content/loader.ts` — typisierte Bundle-Registry (`loadContent(key, locale)`), statische Imports (Turbopack-friendly), DE-Fallback wenn EN fehlt
- `src/components/sections/` neu (8 Components):
  - `PageHero` — wiederverwendbarer Page-Header mit RevealText + FadeInOnScroll
  - `TextSection` — zweispaltiges Layout (Eyebrow/Heading links, Body rechts) mit FadeIn
  - `ContactCard` — shadcn `<Card>`, Initialen-Portrait-Fallback, Quote, Tel/Mail-Links
  - `TeamGrid` — `<ContactCard>` × N im responsive Grid (1/2/4 cols)
  - `UseCaseCard` — Icon (lucide) + Title + Body, Akzentfarbe-Hintergrund am Icon
  - `StepCard` — Step-Number-Badge in Akzentfarbe
  - `ComingSoonHero` — wiederverwendbar für Stubs, mit Page-Kicker + Back-to-Home-Button
  - `ComicStrip` — 4 Frames als Cards mit Hue-Gradient-Backgrounds (Animation in M6)
- `src/app/[locale]/` neu (10 Routen + 1 erweitert):
  - 10 neue `page.tsx` (ansprechpersonen, projekt + 2 Standards, beteiligung + 2 Sub-Routen, impressum, datenschutz, blog, faq, termine)
  - alle als `async` Server-Component, `await params`, `setRequestLocale`, `generateMetadata` mit Page-Titel
  - `[locale]/page.tsx` (Landing) erweitert um ComicStrip + Pitch-TextSection unter Hero
- Verifikation:
  - `pnpm exec tsc --noEmit` clean (Bug zwischendurch: deutsche Anführungszeichen `„…"` mit ASCII-Quote als Schluss zerschossen JSON-Parser; Fix: `„…“` mit U+201C)
  - `pnpm exec eslint .` clean (`react/no-unescaped-entities` in ContactCard durch typografisch korrektes „…“ behoben)
  - `pnpm build` SSG-clean: 29 statische Pages (14 Routen × 2 Locales + _not-found), keine "Dynamic at runtime"-Warning
  - Browser-Test (Preview-MCP `smarte-theaterdienste`):
    - `/de` Landing: Hero + Comic-Strip + Pitch rendern, Akzentfarbe-Blau am Kicker sichtbar
    - `/de/ansprechpersonen`: alle 4 ContactCards mit Initialen-Fallback (SS/PR/CG/MS), Quotes, Tel/Mail-Links
    - `/de/blog`: ComingSoonHero mit korrektem Text und Back-Link
    - `/en/contact-persons`: EN-Slug-Mapping rewritet zu `/[locale]/ansprechpersonen` mit englischem Inhalt
    - `/en/project/technical-standards`: tiefer-verschachtelte EN-Slug-Map funktioniert, 5 H2-Sections rendern
    - Keine Console-Errors

**Status am Ende:** M3 abgeschlossen. Site ist navigierbar, alle 14 Routen rendern, Slug-Mapping in beide Richtungen funktional, Akzentfarbe live. Coming-Soon-Stubs markieren M4-Lücken (Blog/FAQ/Termine). Echte Assets (Portraits, Logos) und Legal-Texte stehen offen — User-/Auftraggeber-Lieferung.
**Nächster Schritt:** M4 — Dynamic Content (Supabase). Voraussetzung: User legt Supabase-Cloud-Projekt an und liefert ENV-Vars.

---

## 2026-04-26 — Session 2: M2 Design-System

**Commits:**
- `a8572b8` M2: Design-System – Tokens, Header/Footer, shadcn-Init, Animation-Primitives

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
