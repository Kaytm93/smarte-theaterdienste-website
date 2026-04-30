# 🗺️ Roadmap — Milestones M1 bis M8

| #     | Status        | Milestone                  | Output                                                                                |
| ----- | ------------- | -------------------------- | ------------------------------------------------------------------------------------- |
| **M1**| ✅ done       | Setup & Infra              | Next.js 16, next-intl, Supabase-Skeleton, GitHub-Push, Obsidian-Vault                |
| **M2**| ✅ done       | Design-System              | Tokens, Typo, Header/Footer, LanguageSwitcher, shadcn init, Animation-Primitives     |
| **M3**| ✅ done       | Statische Seiten DE        | Alle SSG-Routen mit Inhalten aus Miro, Akzentfarbe, Coming-Soon-Stubs, EN-Stub        |
| M4    | 🟡 prepared   | Dynamic Content            | Code komplett vorbereitet — wartet auf Supabase-Cloud-Projekt + `.env.local` (User)   |
| M5    | ⏳ pending    | Partner-Deutschlandkarte   | SVG, Hotspots, Side-Panel, GSAP-Polish                                                |
| M6    | ⏳ pending    | Animation-Polish           | Comic-Strip, Parallax, Reveals, Reduced-Motion finalisieren                          |
| M7    | ⏳ pending    | i18n EN                    | Vollständige Übersetzungen, hreflang, Switcher                                        |
| M8    | ⏳ pending    | Production-Polish          | SEO, OG-Images, Sitemap, Lighthouse ≥95, A11y-Audit, Vercel-Deploy                   |

---

## M1 — Setup & Infra ✅

- [x] Tooling-Check (pnpm, supabase als dev-dep später, gh skipped)
- [x] Next.js 16 bootstrappt mit TS/Tailwind/App-Router/src-dir
- [x] Extra-Deps: next-intl, gsap, @supabase/ssr, @supabase/supabase-js, clsx, tailwind-merge, cva, lucide-react
- [x] next-intl Setup: `lib/i18n/{routing,request,navigation}.ts`, `next.config.ts` plugin
- [x] Locale-Routing: `app/[locale]/{layout,page}.tsx`, `proxy.ts`
- [x] Messages-Stub: `messages/de.json`, `en.json`
- [x] Helper: `lib/utils.ts` (cn), `styles/tokens.css`, `lib/gsap/registerScrollTrigger.ts`
- [x] Meta-Files: README, .env.example, .gitignore (Vault-aware)
- [x] Obsidian-Vault `SMARTE-THEATERDIENSTE/` (Nexus-Pattern)
- [x] Git-Init + erster Commit
- [x] GitHub-Repo + Push
- [x] Verifikation: `pnpm dev`, `/de` und `/en` rendern, `prod build` SSG sauber, TS clean

## M2 — Design-System ✅

- [x] Schrift-Entscheidung: Geist Sans (User-Entscheidung gegen Serif)
- [x] Akzentfarben-Slot in `tokens.css` (Wert in M3 gesetzt)
- [x] `pnpm dlx shadcn@latest init -y -b radix -p nova --no-monorepo`
- [x] shadcn components: button, accordion, card, sheet, dialog, input, label
- [x] `tokens.css`: Spacing-Scale, Typo-Scale (fluid), Easings, Container-Max, Header-Height
- [x] `<Header>` (sticky, backdrop-blur)
- [x] `<Footer>` (Logo-Platzhalter + Impressum/DS-Links)
- [x] `<LanguageSwitcher>` (path-preserving)
- [x] `<MobileNav>` (shadcn Sheet)
- [x] `<FadeInOnScroll>` (`useGSAP`, ScrollTrigger, reduced-motion)
- [x] `<RevealText>` (Wort-stagger via eigene Split-Logik)
- [x] `<ParallaxImage>` (gsap.fromTo mit scrub)
- [x] Layout in `[locale]/layout.tsx` mit Header+Footer
- [x] Landing in `[locale]/page.tsx` mit Hero-Animation

## M3 — Statische Seiten DE ✅

- [x] Akzentfarbe `--accent-brand: oklch(0.55 0.16 250)` (Datenraum-Blau, ADR-22)
- [x] `messages/{de,en}.json` erweitert um `comingSoon`, `team`, `pages.*`
- [x] Content-JSONs in `src/content/{de,en}/` (team, projekt, projekt-{technische,semantische}-standards, beteiligung, beteiligung-{anwendungsbeispiele,mitwirkung}, legal, landing) — DE primär, EN-Stubs vorbereitet
- [x] Content-Loader-Helper `src/lib/content/loader.ts` (statische Bundle-Registry, Locale-Fallback)
- [x] Sections-Component-Library: PageHero, TextSection, ContactCard, TeamGrid, UseCaseCard, StepCard, ComingSoonHero, ComicStrip
- [x] `/ansprechpersonen` (Team-Grid mit 4 ContactCards)
- [x] `/projekt` (PageHero + 6 TextSections + 2 CTA-Links)
- [x] `/projekt/technische-standards`
- [x] `/projekt/semantische-standards`
- [x] `/beteiligung` (Pitch + 3 CTA-Links)
- [x] `/beteiligung/anwendungsbeispiele` (3 UseCaseCards mit Lucide-Icons)
- [x] `/beteiligung/mitwirkung` (2 StepCards + Map-Platzhalter für M5)
- [x] `/impressum` (sichtbarer TODO-Marker, ADR-25)
- [x] `/datenschutz` (sichtbarer TODO-Marker, ADR-25)
- [x] Coming-Soon-Stubs für `/blog`, `/faq`, `/termine` (ADR-24)
- [x] Landing erweitert: ComicStrip-Skeleton (4 Frames) + Pitch-TextSection
- [x] Verifikation: `pnpm exec tsc --noEmit` clean, `pnpm exec eslint .` clean, `pnpm build` clean (29 SSG-Pages), Routen + Slug-Mapping + Coming-Soon im Browser geprüft

## M4 — Dynamic Content 🟡 prepared

**Offline (✅ erledigt 2026-04-27):**
- [x] `pnpm add -D supabase` (CLI als dev-dep, mit `pnpm.onlyBuiltDependencies`)
- [x] `supabase init` → `supabase/config.toml`
- [x] Migration `20260427121400_init.sql` mit Schema (posts/events/faqs/partners + translations + RLS + Trigger)
- [x] `supabase/seed.sql` mit Beispiel-Daten
- [x] `lib/supabase/{env,client,server}.ts` aktiviert
- [x] `lib/supabase/queries.ts` mit i18n-Joins + `.returns<T>()`
- [x] `src/types/database.ts` hand-rolled
- [x] `app/[locale]/{blog,faq,termine}/page.tsx` ersetzen Coming-Soon-Stubs (Graceful-Degradation-Fallback)
- [x] `app/[locale]/blog/[slug]/page.tsx` mit `generateStaticParams` + `dynamicParams`
- [x] `app/api/revalidate/route.ts` mit `REVALIDATE_SECRET`-Check + `revalidatePath`
- [x] Sections: PostCard, PostArticle, EventCard, FaqAccordion
- [x] Messages erweitert (`pages.{blog,faq,termine}.empty.*` + Listen-Labels)

**Wartet auf User-Action:**
- [ ] Supabase-Projekt im Web anlegen (EU-Central), URL+Keys in `.env.local`
- [ ] `pnpm exec supabase login`
- [ ] `pnpm exec supabase link --project-ref <ref>`
- [ ] `pnpm exec supabase db push` (spielt Migration ein)
- [ ] `pnpm exec supabase db seed` (optional)
- [ ] `pnpm gen:types` (überschreibt hand-rolled Types)
- [ ] Webhook in Supabase Studio einrichten → `/api/revalidate?secret=…`
- [ ] Verifikation: Test-Insert in `posts` → `/de/blog` zeigt frische Liste innerhalb 60 s

## M5 — Partner-Deutschlandkarte ⏳

- [ ] SVG Deutschland-Karte als Asset
- [ ] `<PartnerMap>` Component mit Hotspot-Pins (lat/lng → SVG-Coords)
- [ ] Side-Panel mit Partner-Details (Slide-In)
- [ ] GSAP: pulsing Hotspots, Panel-Transition
- [ ] Auf `/beteiligung/mitwirkung` einbauen

## M6 — Animation-Polish ⏳

- [ ] Comic-Strip: Variante A (pinned horizontal) oder B (vertical stagger) — Entscheidung
- [ ] Hero-Parallax
- [ ] Hover-States Cards (`scale 1.02` + shadow)
- [ ] View Transitions API (progressive)
- [ ] Reduced-Motion: alle Animationen sofort End-State
- [ ] ScrollTrigger.refresh() nach Page-Transitions

## M7 — i18n EN ⏳

- [ ] Vollständige `messages/en.json`
- [ ] EN-Content in `content/en/`
- [ ] Supabase-Translations für DB-Inhalte (Translate-Helper oder manuell)
- [ ] hreflang in `generateMetadata` pro Page
- [ ] LanguageSwitcher final testen

## M8 — Production-Polish ⏳

- [ ] OG-Images per Locale (Next.js `opengraph-image.tsx`, async params!)
- [ ] `sitemap.ts` (Async `id` für `generateSitemaps` falls nötig)
- [ ] `robots.ts`
- [ ] Lighthouse-Audit ≥ 95 (alle 4 Kategorien)
- [ ] axe-core / WAVE: keine kritischen Issues
- [ ] Vercel-Projekt anlegen, Domains konfigurieren
- [ ] CI: GitHub Actions mit `pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm build`
