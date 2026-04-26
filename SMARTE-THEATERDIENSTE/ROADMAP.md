# 🗺️ Roadmap — Milestones M1 bis M8

| #     | Status        | Milestone                  | Output                                                                                |
| ----- | ------------- | -------------------------- | ------------------------------------------------------------------------------------- |
| **M1**| ✅ done       | Setup & Infra              | Next.js 16, next-intl, Supabase-Skeleton, GitHub-Push, Obsidian-Vault                |
| M2    | ⏳ next       | Design-System              | Tokens, Typo, Header/Footer, LanguageSwitcher, shadcn init, Animation-Primitives     |
| M3    | ⏳ pending    | Statische Seiten DE        | Alle SSG-Routen mit Inhalten aus Miro/Referenz                                       |
| M4    | ⏳ pending    | Dynamic Content            | Supabase-Schema, Migrations, Seed, Termine/Blog/FAQ-UI                                |
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

## M2 — Design-System ⏳

- [ ] Schrift-Entscheidung mit User (Geist vs. Serif)
- [ ] Branding-Farben aus alter Site (sobald wieder erreichbar) oder User-Vorgabe
- [ ] `pnpm dlx shadcn@latest init` (Slate-Default oder Custom-Farben)
- [ ] shadcn components: `button`, `accordion`, `card`, `sheet`, `dialog`, `input`, `label`
- [ ] `tokens.css` ausbauen: Farb-Tokens, Typo-Scale, Spacing-Scale
- [ ] `<Header>` (sticky, translucent)
- [ ] `<Footer>` (Logo-Grid + Impressum/DS)
- [ ] `<LanguageSwitcher>` (path-preserving via next-intl navigation)
- [ ] `<FadeInOnScroll>` (GSAP + ScrollTrigger + reduced-motion)
- [ ] `<RevealText>` (Wort-stagger)
- [ ] `<ParallaxImage>` (background y-shift)
- [ ] Layout in `[locale]/layout.tsx` mit Header+Footer
- [ ] Landing in `[locale]/page.tsx` mit Hero-Animation einbauen

## M3 — Statische Seiten DE ⏳

Routen aus `lib/i18n/routing.ts`:
- [ ] `/ansprechpersonen` (Team-Grid mit ContactCards × 4)
- [ ] `/projekt` (Projektbeschreibung, Zeitplan)
- [ ] `/projekt/technische-standards` (JSON, Konnektor, Schema.org)
- [ ] `/projekt/semantische-standards` (Datenmodell, GND, NFDI4culture)
- [ ] `/beteiligung` (Pitch + Verlinkungen)
- [ ] `/beteiligung/anwendungsbeispiele` (Use Cases × 3)
- [ ] `/beteiligung/mitwirkung` (Schritt 1 JSON, Schritt 2 DRK-Konnektor)
- [ ] `/impressum`
- [ ] `/datenschutz`

Inhalte aus `INHALTE.md`. Comic-Strip auf Landing als Section ergänzen.

## M4 — Dynamic Content ⏳

- [ ] Supabase-Projekt im Web anlegen (User), URL+Keys in `.env.local`
- [ ] `pnpm add -D supabase` (CLI als dev-dep)
- [ ] `supabase init` → `supabase/config.toml`
- [ ] Migration `20XXXXXX_init.sql` mit Schema (siehe `KONTEXT.md` oder ER-Diagramm)
- [ ] `supabase gen types typescript --linked > src/types/database.ts`
- [ ] `lib/supabase/{client,server}.ts` aktivieren (createBrowserClient / createServerClient)
- [ ] `lib/supabase/queries.ts` mit i18n-Joins
- [ ] `app/[locale]/termine/page.tsx`, `app/[locale]/faq/page.tsx`
- [ ] `app/[locale]/blog/page.tsx` + `[slug]/page.tsx`
- [ ] `app/api/revalidate/route.ts` mit `REVALIDATE_SECRET`
- [ ] Supabase-Webhook auf relevante Tabellen → Revalidate-Endpunkt
- [ ] Seed-Daten in `supabase/seed.sql`

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
