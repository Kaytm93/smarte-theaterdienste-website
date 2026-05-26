# 🗺️ Roadmap — Milestones M1 bis M18

| #     | Status        | Milestone                  | Output                                                                                |
| ----- | ------------- | -------------------------- | ------------------------------------------------------------------------------------- |
| **M1**| ✅ done       | Setup & Infra              | Next.js 16, next-intl, Supabase-Skeleton, GitHub-Push, Obsidian-Vault                |
| **M2**| ✅ done       | Design-System              | Tokens, Typo, Header/Footer, LanguageSwitcher, shadcn init, Animation-Primitives     |
| **M3**| ✅ done       | Statische Seiten DE        | Alle SSG-Routen mit Inhalten aus Miro, Akzentfarbe, Coming-Soon-Stubs, EN-Stub        |
| **M4**| ✅ done       | Dynamic Content            | Supabase Cloud live, echte Daten, Types generiert, ISR + Revalidate aktiv             |
| **M5**| ✅ done       | Partner-Deutschlandkarte   | Wikimedia-SVG, 4 Hotspots aus Supabase, Side-Panel mit Detail-State, GSAP-Pulse       |
| **M6**| ✅ done       | Animation-Polish           | Comic-Strip-Stagger, Hero-Choreografie, Card-Hover, View Transitions, Reduced-Motion |
| **M7**| ✅ done       | i18n EN                    | EN-Copy-Review, vollständige statische EN-Struktur, Supabase-Blog-Translations       |
| **M8**| ✅ done       | Production-Polish          | SEO, OG-Images, Sitemap, Robots, CI, Lighthouse/A11y production-validiert            |
| **M9**| ✅ done       | PWA + OG + Lighthouse-CI   | Manifest, Per-Post-OG-Images, wöchentlicher Lighthouse-CI-Workflow                    |
| **M10**| ✅ done      | Design-Refresh + Assets    | Echte Hero-/Comic-/Logo-Assets, Card-Polish                                           |
| **M11**| ✅ done      | Original-Site-Transfer     | DACH-Netzwerkkarte, 141er-Statistik, ORIF-Materialien, Portraits, 21 FAQ + 4 Events   |
| **M12–M16**| ✅ done  | QA-/UX-/Editorial-Polish   | Miro-QA, Deutschlandkarte, Editorial-Redesign + Feinschliff, mehrere Production-Deploys |
| **M17 W1**| ✅ done   | CI-Refresh + Nav + Landing | Public Sans, Black-Gray-Purple-CI, 4-Item-Menü, neue Slugs + 308-Redirects, `/materialien`, Bühnenverein-Lockup, Video, Zitate |
| **M17 W2**| ✅ done   | Unterseiten nach Feedback  | Konzeption bebildert + Team + Zeitstrahl, Comic/Video eingebettet, MyMaps, FAQ-Kategorien, Team-Umzug, Blog+Termine→Timeline |
| **M18**| 📋 geplant   | Welle 3 + Go-Live          | Deploy-Verifikation, Team-Bühnenfotos, Grafiken/Rechtstexte, Aufräumen, A11y-Recheck, Custom-Domain |

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

## M6 — Animation-Polish ✅

- [x] Comic-Strip: Variante B (vertical stagger) entschieden und umgesetzt
- [x] Hero-Choreografie mit Stagger-Konstante + statischem Akzent-Blob (Hero-Parallax erst mit echtem Hero-Visual)
- [x] Hover-States Cards projektweit standardisiert
- [x] View Transitions API progressiv für Blog-Cover verdrahtet
- [x] Reduced-Motion: ViewTransition-CSS + Animations-End-State
- [x] ScrollTrigger.refresh() nach Page-Transitions über Layout-globalen Refresher

## M7 — i18n EN ✅

- [x] Vollständige `messages/en.json` strukturgleich zu DE und copy-reviewt
- [x] EN-Content in `content/en/` strukturgleich zu DE und copy-reviewt
- [x] Supabase-Translations für Blog-Inhalte vollständig: alle drei Posts `{de,en}`
- [x] hreflang in `generateMetadata` pro Page (M8 SEO-Layer)
- [x] LanguageSwitcher path-preserving und production-validiert aus früheren M8/M6-Smokes

## M8 — Production-Polish ✅

- [x] OG-Images per Locale (Next.js `opengraph-image.tsx`, async params!)
- [x] `sitemap.ts` mit Locale-Alternates und Blog-Slugs
- [x] `robots.ts`
- [x] Lighthouse-Audit ≥ 95 (DE/EN: Performance 96, A11y 100, Best Practices 100, SEO 100)
- [x] axe-core / WAVE: keine kritischen Issues (pa11y axe clean)
- [x] Vercel-Projekt anlegen + Production-Deploy (`https://smarte-theaterdienste-website.vercel.app`)
- [ ] Vercel-GitHub-Integration im Dashboard verbinden (CLI scheitert an GitHub-App/Rechten)
- [ ] Custom Domain konfigurieren
- [x] CI: GitHub Actions mit `pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm build`

---

## 🗺️ M18 — Welle 3 + Go-Live (Plan, Stand 2026-05-24)

Welle 1 (CI/Nav/Landing) und Welle 2 (Unterseiten nach Feedback 14.5.2026) sind auf `origin/main` (`fc77adf`). M18 schließt die Inhalts-/Asset-Lücken und bringt das Projekt live. Priorisiert; Akzeptanzkriterien je Punkt.

### 🔴 P1 — Go-Live-kritisch

- [ ] **Production-Deploy von Welle 1+2 verifizieren.**
  - Der `main`-Push sollte den Vercel-Auto-Deploy ausgelöst haben (GitHub-Integration verbunden).
  - Akzeptanz: Alias-Smoke auf `https://smarte-theaterdienste-website.vercel.app` → `/de/konzeption`, `/de/team`, `/de/faq`, `/de/jetzt-mitmachen`, `/de/konzeption/technische-standards` HTTP 200; Redirects `/de/ansprechpersonen`→`/de/team`, `/de/termine`+`/de/blog`→`/de/konzeption` 308; EN-Pendants 200/308.
  - ⚠️ Lokal scheiterte nur `/icon`/OG-Build an fehlendem Sandbox-Netz (`@vercel/og` `ETIMEDOUT`). Auf Vercel (mit Netz) muss der Build durchlaufen — falls der Deploy fehlschlägt, die Vercel-Build-Logs prüfen.
- [ ] **Team-Bühnen-Hover vervollständigen.**
  - 4 Sanity-Bühnenfoto-URLs beim User/Bühnenverein beschaffen (alte Live-Seite zeigt den Team-Block nicht mehr → nicht automatisch auffindbar).
  - Umsetzung: je Member in `src/content/{de,en}/team.json` `"stage": "https://cdn.sanity.io/images/lc7slax2/production/..."`.
  - Akzeptanz: Hover/Focus über ein Portrait blendet das Bühnenfoto ein (`ContactCard`-Cross-Fade ist bereits implementiert, `motion-reduce`-safe). Bis dahin Zoom-Fallback.

### 🟡 P2 — Inhalt & Recht (vom Auftraggeber abhängig)

- [ ] **Erklärende Grafiken** aus `STD-Design-Praesentation-20241028.pdf` (User liefert PDF/Assets) auf Konzeption + Technische Standards einbauen. Umsetzung über das neue `TextSection.image`-Feld oder eine eigene Diagramm-Komponente (z. B. Schema.org→GND→JSON→ORIF-Flow). Feedback: „erklärende Grafik" + „trockenes, technisches Thema".
- [ ] **Finale Impressum-/Datenschutz-Texte** vom Bühnenverein einpflegen → ersetzt die sichtbaren TODO-Marker (`legal.json`, ADR-25).
- [ ] **Event-Fotos für die Timeline.** Schema `events.image_url` ergänzen (Migration + `gen:types`), `listPastEvents`/`EventListItem` + `Timeline` um das Bildfeld erweitern (Layout-Platz vorgesehen). Feedback: „Fotos von den Events".

### 🟢 P3 — Aufräumen & Verfeinerung

- [ ] **Dead-Files entfernen:** `src/app/[locale]/{blog,termine}/page.tsx` sind seit Welle 2 nur noch 308-Redirect-Ziele. Prüfen, ob `EventCard`/`PostCard` danach noch verwendet werden (`blog/[slug]` bleibt aktiv → Routing-Key `/blog` behalten).
- [ ] **A11y-/Performance-Recheck** nach den neuen iframes (Google MyMaps, Genially, YouTube): Lighthouse + axe auf `/de/konzeption` und `/de/jetzt-mitmachen`. Embeds haben bereits `title` + `loading="lazy"`; Performance-Impact der drei Embeds messen, ggf. „Click-to-load"-Pattern erwägen.
- [ ] **Mobile-QA** der Embeds auf 375 px: MyMaps, Genially und Timeline ohne Horizontal-Overflow; Timeline-Dots/Linie sauber.
- [ ] **Karten-Daten abgleichen:** Zeigt die Google-MyMaps-Karte (`/jetzt-mitmachen`) dieselben Standorte wie die Supabase-`PartnerMap` (`/jetzt-mitmachen/mitwirkung`)? Konsolidieren oder bewusst zwei Sichten (kuratierte MyMaps vs. Marken-SVG) behalten und das im Copy erklären.

### ⚪ Langstehend (Infrastruktur)

- [ ] **Custom-Domain `smarte-theaterdienste.de` auf Vercel umstellen** (DNS A/CNAME). Erst danach sind Repo-Pushes/Deploys auf der echten Domain sichtbar (aktuell alte A-Records `167.235.107.225`/`159.69.6.148`). Siehe [[GO_LIVE_CHECKLIST]] + [[PROBLEME]].
- [ ] **Partner-`website_url`/`logo_url` in Supabase nachpflegen** (aktuell nur Geo-Coords) — sonst fehlt der „Zur Website"-Link auf der `PartnerMap`.

> Reihenfolge-Empfehlung: P1 zuerst (Deploy grün + Hover-URLs), dann P2 sobald Auftraggeber-Assets/Texte da sind, P3 als Polish-Pass, Custom-Domain wenn der Auftraggeber den DNS-Wechsel freigibt.
