# 🗺️ Roadmap — Milestones M1 bis M19

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
| **M18**| 🟡 P1+P2(3a/3b)+P3 done | Welle 3 + Go-Live | Welle 1+2 production-live (`dpl_3ADeq7…`); Session 31: Datenfluss-Diagramm + Wortwitz-Eyebrows + ComicStrip-Fix + A11y-Recheck; Session 32: Production-Audit (A11y/SEO 100, BP 96, Perf ~91–94 — #7 komplett) + Event-Foto-Plumbing vorbereitet (defensiv, wartet auf DB-Push + URLs) + 503-Doku korrigiert · offen: Team-Bühnenfotos, 3c Comic-Strip, Legal-Texte, Event-Foto-Assets, Custom-Domain-DNS |
| **M19**| 🟡 in Umsetzung | Sanity-Redaktions-CMS | Lokale Phase 0–2 fertig: Inventur, Studio und vollständiges Inhaltsmodell (65 Soll-Dokumente, 12 Singletons, 86 Schematypen); Phase 3 als nächster Code-Schritt, Zielprojekt-/Account-Entscheidungen weiter offen · Detailplan: [[SANITY_CMS_PLAN]] |

---

## M19 — Sanity-Redaktions-CMS 🟡

**Ziel:** Der Bühnenverein pflegt alle redaktionellen Inhalte in Sanity; die nicht mehr erreichbare Supabase-Instanz wird nicht neu aufgebaut. Das bewährte Sina-Muster (Standalone Studio, Loader-Fallback, Publish→Vercel) wird übernommen und um TypeGen sowie das offizielle Internationalized-Array-Pattern ergänzt.

- [x] Projekt- und Sina-Vault, reales Studio/Frontend-Setup und Sanity-Best-Practices analysiert.
- [x] Zielarchitektur, Inhaltsmodell, Migrationsreihenfolge, Rollback und Definition of Done dokumentiert: [[SANITY_CMS_PLAN]].
- [~] Phase 0: ✅ maschinenlesbare Inventur/Parität + Altprojekt-Audit (auf 65 Soll-Dokumente fortgeschrieben); ⏳ Sanity-Zielprojekt/Account, Dataset-Sichtbarkeit, Studio-Hostname, Editor-Rollen und Vercel-Zugriff festlegen.
- [x] Phase 1–2: Standalone Studio, statische Locales mit Admin-Spiegel, 12 geschützte Singletons, vollständige semantische Seiten-/Entitätsschemas, Ressourcen-/Comic-Wiederverwendung, TypeGen und CI-Gates.
- [ ] Phase 3: TypeGen, GROQ, Fetch-/Mapper-/Loader-Schicht und JSON-Fallback.
- [ ] Phase 4: JSON/Message/SQL/Asset-Migration mit Dry Run und anonymem Readback.
- [ ] Phase 5: Seitenweise Cutover-Reihenfolge DE/EN.
- [ ] Phase 6: Studio-Deploy + Sanity-Webhook → Vercel-Deploy-Hook.
- [ ] Phase 7: vollständige Qualitäts- und Production-Gates.
- [ ] Phase 8: Supabase-Runtime erst nach bewiesener Parität entfernen.
- [ ] Phase 9: Redaktionszugänge und Pflege-/Backup-Runbook übergeben.

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

- [x] **Production-Deploy von Welle 1+2 verifiziert** (Session 30, 2026-06-04). Auto-Deploy hatte nicht funktioniert (4× Canceled hintereinander ohne Logs, Duration `?` — vermutlich Webhook-/Concurrency-Issue). Manueller CLI-Deploy via `pnpm dlx vercel@latest deploy --prod --yes` umging das Problem: `dpl_3ADeq7ZBDpFBJp2ozmERAxjc5ZF2` READY, 31 s Remote-Build. Alias-Smoke grün: 11/11 neue Routen HTTP 200 (DE + EN), 7/7 Redirects HTTP 308 mit korrekten Zielen, `/icon`/`/sitemap.xml`/`/robots.txt`/`/manifest.webmanifest` HTTP 200, `age: 0` belegt frischen Cache. Lokal scheiterte `/icon` diesmal nicht (kein Sandbox-Netz-Problem).
- [ ] **Team-Bühnen-Hover vervollständigen.**
  - 4 Sanity-Bühnenfoto-URLs beim User/Bühnenverein beschaffen (alte Live-Seite zeigt den Team-Block nicht mehr → nicht automatisch auffindbar).
  - Umsetzung: je Member in `src/content/{de,en}/team.json` `"stage": "https://cdn.sanity.io/images/lc7slax2/production/..."`.
  - Akzeptanz: Hover/Focus über ein Portrait blendet das Bühnenfoto ein (`ContactCard`-Cross-Fade ist bereits implementiert, `motion-reduce`-safe). Bis dahin Zoom-Fallback.

### 🟡 P2 — Inhalt & Recht (Assets gesichtet 2026-06-04, Implementierung offen)

**PDF-Sichtung 2026-06-04:** Zwei PDFs vom User vorhanden (`~/Downloads/`):
- `Website DRK.pdf` (5 Seiten) — Workshop-Material, **Seite 1** = „Prozessarchitektur Spielplan-Online-Stellung am Theater Dortmund" (dreispaltiges Flussdiagramm Sparten → KBB → ORIF/Schema.org-Outputs). Vermerk im PDF: „nur zur Recherche, soll so nicht auf die Website" → als Vorlage für Neuzeichnung im CI nutzen.
- `STD-Design-Praesentation-20241028.pdf` (11 Seiten) — Designkonzept von Mikalo × Diesdas. Validiert unsere Welle-1-CI (Public Sans + Black-Gray-Purple). **Seite 4** zeigt Theater-Wortwitz als Headline-Pattern, **Seite 5** zeigt 3 zusätzliche Comic-Sprechblasen-Frames (über die hinaus, die wir bereits nutzen).

Daraus folgende P2-Tasks:

- [x] **3a. „ORIF-Datenflow"-Diagramm** als eigene Komponente `DataFlowDiagram.tsx` auf `/konzeption/technische-standards` (Session 31). CI-Neuzeichnung der `Website DRK.pdf`-Seite-1-Prozessarchitektur (Black/Gray/Purple, Public Sans) — kein Bild-Embed, sondern data-driven Server-Component mit 3 Stage-Cards (01 Sparten → 02 KBB → 03 Veröffentlichung mit Theater-Website[HTML]/Ticketing[API]/Datenraum Kultur[ORIF · Schema.org, highlight]) + Inline-SVG-Konnektor-Pfeilen. Responsive (3 Spalten Desktop, vertikaler Stack mobile). Content in `projekt-technische-standards.json` (`dataFlow`-Block, DE/EN). Reusable — kann später als `/konzeption`-Teaser dienen. Build prerendert clean, axe 0 Fehler auf der Komponente. Siehe ADR-55.
- [x] **3b. Theater-Wortwitz-Pattern systematisieren** (Session 31). `STD-Design-Praesentation` Seite 4 etabliert Theater-Wortwitz als Designprinzip. Umgesetzt als kuratierte Inline-Eyebrow-Edits in `messages/{de,en}.json` (kein eigener `wordplay`-Namespace — die Kicker liegen bereits pro Seite als `pages.*.kicker`, siehe ADR-56): Konzeption/`pages.projekt.kicker` → „Großer Akt" / „Opening act"; Materialien/`pages.materialien.kicker` → „Aus dem Fundus" / „From the prop room"; FAQ/`pages.faq.kicker` + `faq.empty.kicker` → „Vorhang auf für Fragen" / „Curtain up for questions". „Bühne frei für …" (FeatureGrid) bleibt bestehen.
- [ ] **3c. Comic-Strip erweitern (optional, vom Auftraggeber abhängig).** `STD-Design-Praesentation` Seite 5 zeigt mindestens 3 weitere Sprechblasen-Frames von Max Kersting („Yes, wir sind jetzt Veganer", „Und, haben euch die Beilagen geschmeckt?", „Wird ein heim gutes Foto"), die wir aktuell nicht nutzen. Wenn der Bühnenverein die Original-Assets bereitstellt, könnten wir den Strip von 3 auf 5–6 Frames erweitern oder auf Unterseiten zweite Strips einsetzen (z.B. einen für „Effektivere Arbeitsprozesse", einen für „Höhere Reichweite", einen für „Größeres Netzwerk").
- [ ] **Finale Impressum-/Datenschutz-Texte** vom Bühnenverein einpflegen → ersetzt die sichtbaren TODO-Marker (`legal.json`, ADR-25).
- [~] **Event-Fotos für die Timeline — Darstellung + Sanity-Feld fertig, echte Assets offen.** Das historische Supabase-Plumbing aus Session 32 (`events.image_url`, defensiver Query-Fallback, konditionales Timeline-Bild) bleibt als Importquelle dokumentiert, wird aber nicht mehr in das verschwundene Cloud-Projekt gepusht. Phase 2 ergänzt `event.image` mit Alt/Credit. **Offen:** Bilddateien und Credits je Event vom Bühnenverein; Phase 4 lädt sie direkt nach Sanity, danach DE/EN-Timeline prüfen. Siehe [[ENTSCHEIDUNGEN#ADR-59]] + [[ENTSCHEIDUNGEN#ADR-67]].

### 🟢 P3 — Aufräumen & Verfeinerung

- [x] **Dead-Files entfernt** (Session 30): `src/app/[locale]/blog/page.tsx`, `termine/page.tsx`, `src/components/sections/EventCard.tsx`, `PostCard.tsx` raus. `PostArticle.tsx:84` Back-Link auf `/konzeption` umgebogen (eliminiert 308-Hop). `routing.ts`-Einträge `/blog`/`/termine` bewusst behalten (harmlose Konfig-Daten, Risiko eines Aufräumens > Nutzen). 12 Finder-Duplikate `* 2.*` aus `public/` zusätzlich entfernt.
- [x] **A11y-/Performance-Recheck** nach den neuen iframes (Session 31). Lighthouse gegen die lokale Production-Build-Seite: A11y 100 / Best Practices 100 (SEO 92 ist ein localhost-Artefakt — kein canonical/og auf 127.0.0.1). axe-core auf `/de`, `/de/konzeption`, `/de/konzeption/technische-standards`, `/de/materialien`, `/de/faq`: **0 echte Befunde**. Die gemeldeten color-contrast-„Errors" (25–73/Seite) sind False-Positives — axe kann Kontrast hinter dem editorialen `body`-`background-image`-Raster nicht auflösen → `cantTell`; betrifft pures Schwarz (~20:1) und `--accent-brand-ink` (~7:1), die unmöglich real durchfallen. Lighthouse-A11y=100 bestätigt. Filter: `grep -A1 "Error:" report \| grep -vE "color-contrast\|frame-tested"` → leer. Neue `DataFlowDiagram`-Cards (solides bg) = von axe verifiziert, 0 Fehler. Siehe ADR-57 + PROBLEME (🟢 Wissenswert). **Session 32 (2026-06-07) gegen den Live-Vercel-Alias bestätigt:** A11y **100/100 (DE+EN)**, SEO **100/100 (DE+EN)** — die localhost-SEO-92 war wirklich ein Artefakt. Best Practices **96** = ein einzelner YouTube-Third-Party-Cookie (`inspector-issues`), kein Code-Bug. Performance EN 91 / DE 94 (warm); ein DE-Kaltlauf 73 nur durch LCP-Ausreißer (8,1 s, kalter Edge-Cache). Damit ist #7 vollständig (lokal + Production).
- [x] **Mobile-QA der Embeds auf 375 px erledigt** (Session 30): `docOverflowPx: 0` auf `/de/konzeption`, `/de/jetzt-mitmachen`, `/de/konzeption/technische-standards`; kein einziges Element überragt den Viewport; jeder iframe rendert 341 px breit (passend zu 375 px - Padding). Genially-iframe in der Timeline-Section sichtbar (`#zeitstrahl`).
- [x] **Karten-Daten abgeglichen** (Session 30): Bewusst zwei verschiedene Sichten — Google MyMaps (`/jetzt-mitmachen`) zeigt „teilnehmende Theater und Agenturen" (extern kuratiert), Supabase-PartnerMap (`/jetzt-mitmachen/mitwirkung`) zeigt die 4 tragenden Projekt-Institutionen (Bühnenverein/Köln, Fraunhofer/Hamburg, Akademie/Dortmund, NFDI4Culture/Mainz). Keine Redundanz, sie ergänzen sich („wer macht mit" vs. „wer trägt das Projekt"). Konkreten MyMaps-Inhalt pflegt der Bühnenverein.

### ⚪ Langstehend (Infrastruktur)

- [ ] **Custom-Domain `smarte-theaterdienste.de` auf Vercel umstellen** (DNS A/CNAME). Erst danach sind Repo-Pushes/Deploys auf der echten Domain sichtbar (aktuell alte A-Records `167.235.107.225`/`159.69.6.148`). Siehe [[GO_LIVE_CHECKLIST]] + [[PROBLEME]].
- [ ] **Partner-`website_url`/`logo_url` in Supabase nachpflegen** (aktuell nur Geo-Coords) — sonst fehlt der „Zur Website"-Link auf der `PartnerMap`.

> Reihenfolge-Empfehlung: P1 zuerst (Deploy grün + Hover-URLs), dann P2 sobald Auftraggeber-Assets/Texte da sind, P3 als Polish-Pass, Custom-Domain wenn der Auftraggeber den DNS-Wechsel freigibt.
