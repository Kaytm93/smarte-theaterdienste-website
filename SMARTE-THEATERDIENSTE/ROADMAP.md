# 🗺️ Roadmap — Milestones M1 bis M8

| #     | Status        | Milestone                  | Output                                                                                |
| ----- | ------------- | -------------------------- | ------------------------------------------------------------------------------------- |
| **M1**| ✅ done       | Setup & Infra              | Next.js 16, next-intl, Supabase-Skeleton, GitHub-Push, Obsidian-Vault                |
| **M2**| ✅ done       | Design-System              | Tokens, Typo, Header/Footer, LanguageSwitcher, shadcn init, Animation-Primitives     |
| **M3**| ✅ done       | Statische Seiten DE        | Alle SSG-Routen mit Inhalten aus Miro, Akzentfarbe, Coming-Soon-Stubs, EN-Stub        |
| **M4**| ✅ done       | Dynamic Content            | Supabase Cloud live, echte Daten, Types generiert, ISR + Revalidate aktiv             |
| **M5**| ✅ done       | Partner-Deutschlandkarte   | Wikimedia-SVG, 4 Hotspots aus Supabase, Side-Panel mit Detail-State, GSAP-Pulse       |
| M6    | ⏳ pending    | Animation-Polish           | Comic-Strip, Parallax, Reveals, Reduced-Motion finalisieren                          |
| M7    | ⏳ pending    | i18n EN                    | Vollständige Übersetzungen, hreflang, Switcher                                        |
| M8    | 🟡 partial    | Production-Polish          | Vercel live; SEO, OG-Images, Sitemap, Lighthouse ≥95 und A11y-Audit offen            |

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

## M4 — Dynamic Content ✅

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

**Cloud-Finalisierung (✅ erledigt 2026-04-30):**
- [x] Supabase-Projekt im Web angelegt (EU-Central), URL+Keys in `.env.local`
- [x] `pnpm exec supabase login`
- [x] `pnpm exec supabase link --project-ref hyirpaloozcautcxhbqk`
- [x] `pnpm exec supabase db push` (Migration live)
- [x] `pnpm exec supabase db query --linked -f supabase/seed.sql` (Seed live)
- [x] `pnpm gen:types` (echte Database-Types mit Relationships)
- [x] Revalidate-Webhook per `pg_net`-Trigger auf 6 Tabellen eingerichtet
- [x] Verifikation: Live-Routen 200, `/api/revalidate` 401/200, Trigger-Test → `net._http_response.status_code = 200`

## M5 — Partner-Deutschlandkarte ✅

- [x] SVG Deutschland-Karte als Asset (`public/maps/germany.svg`, Wikimedia public domain, 463 KB)
- [x] `<PartnerMap>` Server-Wrapper + `<PartnerMapClient>` mit Hotspot-Pins (lat/lng → Prozent-Coords linear gemappt)
- [x] Side-Panel mit Partner-Details (sticky on `lg:`, Status-Badge + Coords + Website-Link)
- [x] GSAP: pulsing Hotspots (random stagger, scale+fade ring), Selected-Highlight via Tailwind
- [x] Auf `/beteiligung/mitwirkung` einbauen (alter `mapPlaceholder`-Block ersetzt, `revalidate=60`)
- [x] Graceful Degradation: kein Supabase oder leere Tabelle → Empty-State (siehe ADR-27)
- [x] EN-Locale: Status-Labels lokalisiert (Partner / Pilot theatre / Interested), Slug `/en/participation/contribute`

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
- [x] Vercel-Projekt anlegen + Production-Deploy (`https://smarte-theaterdienste-website.vercel.app`)
- [ ] Vercel-GitHub-Integration im Dashboard verbinden (CLI scheitert an GitHub-App/Rechten)
- [ ] Custom Domain konfigurieren
- [ ] CI: GitHub Actions mit `pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm build`
