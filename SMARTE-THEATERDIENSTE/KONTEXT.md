# Smarte Theaterdienste — Vollständiger Projektkontext

> Diese Datei beschreibt den **stabilen technischen Stand** (Tech-Stack, Architekturregeln, Dateipfade, Routing). Den laufenden Projektstatus + „was als Nächstes" findest du in [[DASHBOARD]], die Session-Historie in [[CHANGELOG]].
>
> Letzte Strukturaktualisierung: 2026-06-10 (Session 34).

---

## ⚠️ Pflicht-Regel für Claude: Commit & Push nach jeder Session

Nach **jedem abgeschlossenen Workflow** (egal ob Bugfix, Feature, Refactor) gilt zwingend:

1. `git add` — nur die tatsächlich geänderten Dateien (keine `.claude/`, `.env.local`, Binaries)
2. `git commit -m "..."` — aussagekräftige Message, ggf. Hinweise auf Milestone (M2, M3, …)
3. `git push` — auf `origin/main`

Ohne Push ist die Session **nicht abgeschlossen**. Der Schritt kommt immer ganz am Ende, nach dem Build-Check und nach dem Eintrag in `CHANGELOG.md`.

Der Repo-Owner ist **Kaytm93**, SSH-Auth via vorhandenen Key. Remote: `git@github.com:Kaytm93/smarte-theaterdienste-website.git`.

---

## Was ist „Smarte Theaterdienste"?

Marketing- und Info-Website für den **Datenraum-Kultur-Use-Case 3** des **Deutschen Bühnenvereins**. Thema: maschinenlesbare Theaterspielpläne via JSON/ORIF-Schnittstelle.

**Zielgruppen:**
1. Theater-Intendant:innen & Dramaturgie → strategischer Nutzen, einfache Sprache
2. Webagenturen & technische Verantwortliche → konkrete Implementierung (JSON, Konnektor)
3. Kulturinteressierte Öffentlichkeit → Verständnis für offenen Datenraum
4. Projektpartner & Förderer → Status, Beteiligung, Ergebnisse

**Charakter:**
- Mehrsprachig (DE primär, EN sekundär)
- Zeitungshaft/editorial mit subtilen GSAP-Animationen
- Bildhaft/metaphorisch, kulturaffin („Besteckkasten", „Leitung legen")
- Sympathisch, nahbar (echte Menschen hinter dem Projekt)
- Mobile-first, accessible

**Quelle der Wahrheit für Inhalte:** Miro-Board > bestehende Website. Siehe `INHALTE.md`.

---

## Tech-Stack

| Tech                  | Version   | Zweck                                                  |
| --------------------- | --------- | ------------------------------------------------------ |
| Next.js               | **16.2.4**| App Router, RSC, Turbopack default                     |
| React / React-DOM     | 19.2.4    | Mit Canary-Features (View Transitions, useEffectEvent) |
| TypeScript            | 5.9.3     | strict                                                 |
| Tailwind CSS          | 4.2.4     | Tokens via `@theme inline` + CSS Custom Properties     |
| next-intl             | 4.9.1     | i18n DE/EN, pathnames-Map                              |
| GSAP + ScrollTrigger  | 3.15.0    | Animationen (kein WebGL)                               |
| @supabase/ssr         | latest    | Server- & Browser-Client für RSC                       |
| @supabase/supabase-js | latest    | Core Supabase                                          |
| clsx + tailwind-merge | latest    | shadcn `cn()`-Helper (`src/lib/utils.ts`)              |
| class-variance-authority | latest | shadcn variants                                        |
| lucide-react          | latest    | Icons                                                  |
| @gsap/react           | 2.1.2     | `useGSAP`-Hook mit auto-cleanup (M2)                   |
| shadcn/ui             | radix-nova | UI-Primitives (button/sheet/dialog/etc., M2)          |
| radix-ui              | 1.4.3     | Combined Radix-Primitives-Paket (von shadcn genutzt)   |
| tw-animate-css        | 1.4.0     | shadcn-Animation-Utilities (Tailwind v4)               |
| pnpm                  | 10.33.2   | Package Manager (via `~/.nvm/...`)                     |
| Node.js               | 20.19.4   | nvm-installiert                                        |

**Hosting:** Vercel, Projekt `kaytm93s-projects/smarte-theaterdienste-website`. Production-Alias `https://smarte-theaterdienste-website.vercel.app`. GitHub-Integration verbunden; **Push auf `main` triggert Auto-Deploy** (funktioniert seit [[ENTSCHEIDUNGEN#ADR-58]] — `requireVerifiedCommits` war die Ursache der zuvor abgebrochenen Auto-Deploys). Manueller Fallback: `pnpm dlx vercel@latest deploy --prod --yes`. `NEXT_PUBLIC_SITE_URL` in Vercel Production = der Alias. **Achtung:** `smarte-theaterdienste.de` zeigt noch auf alte Hetzner-A-Records (`167.235.107.225`/`159.69.6.148`) und alte Inhalte — erst nach DNS-Umstellung ist die echte Domain auf unserem Build (siehe [[PROBLEME]] + [[GO_LIVE_CHECKLIST]]).

**Datenbank:** Supabase Cloud — Projekt `hyirpaloozcautcxhbqk`, EU-Central (Frankfurt). Schema/Content: [[API]]. Live-Migrationen: `20260427121400_init.sql`, `20260507120000_m7_english_post_translations.sql`, `20260507153000_m11_original_site_content.sql`. Migration `20260607120000_event_image_url.sql` (`events.image_url`) liegt **committed, aber un-gepusht** — der Push braucht das DB-Passwort, das **nicht** in `.env.local` liegt (`.env.local` hat nur URL + anon-key + service-role-key + REVALIDATE_SECRET); die Query selektiert `image_url` defensiv und funktioniert auch ohne Push (Fallback, [[ENTSCHEIDUNGEN#ADR-59]]). Revalidate läuft über `pg_net` + `public.revalidate_nextjs_cache()` mit Triggern auf 6 Tabellen.

---

## Next.js 16 — Pflicht-Wissen

**Lies `MUSTER.md` für Code-Patterns.** Schnell-Übersicht:

- `middleware.ts` heißt jetzt **`proxy.ts`** (Funktion `proxy`); nur `nodejs`-Runtime
- `params`/`searchParams`/`cookies()`/`headers()` sind **Promises** → immer `await`
- `revalidateTag(tag, profile)` — zweites Argument verpflichtend (`'max'`, …) oder `updateTag` für read-your-writes
- `next lint` entfernt → ESLint-CLI direkt (`pnpm exec eslint .`)
- `images.domains` deprecated → `images.remotePatterns`
- Turbopack ist Default für `dev` und `build`, kein Flag nötig

Autoritative Quelle für diese Version: `node_modules/next/dist/docs/` im Projektordner. **Niemals auf Trainings-Wissen über Next.js verlassen.**

---

## Wichtigste Dateipfade

```
smarte-theaterdienste-website/
├── eslint.config.mjs                           ← Session 25: ignoriert lokale Agenten-/Output-Artefakte (`.claude/**`, `.playwright-cli/**`, `output/**`) zusätzlich zu `.next/**`/`.vercel/**`
├── .agents/
│   └── plugins/marketplace.json               ← Session 22: lokaler Codex-Marketplace, verweist auf ./plugins/website-design-ultra
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                              ← M8: lint + typecheck + build auf push/PR (pnpm 10, Node 20)
│   │   └── lighthouse.yml                      ← M9 (Session 16): treosh/lighthouse-ci-action@v12 gegen 6 Production-URLs, manuell + Cron Mo 06:00 UTC
│   └── lighthouserc.json                       ← M9: Asserts (A11y/SEO ≥0.95 error · Performance/BP ≥0.9 warn), preset desktop, temporaryPublicStorage
├── src/
│   ├── app/
│   │   ├── sitemap.ts                          ← M8: STATIC_HREFS × Locales + xhtml:link-Alternates + Blog-Slugs (graceful); Session 14: stabile lastModified-Werte, Blog aus `published_at`
│   │   ├── robots.ts                           ← M8: Allow / · Disallow /api/ · Sitemap-Pointer
│   │   ├── icon.tsx                            ← M8: 32×32 ImageResponse mit „ST"-Initial
│   │   └── manifest.ts                         ← M9 (Session 16): MetadataRoute.Manifest, siteName/description aus Default-Locale, theme_color #2660d8, Icons via /icon
│   ├── app/[locale]/
│   │   ├── layout.tsx                          ← Root html/body, NextIntlClientProvider, Header+Footer, Fonts; M8: metadataBase, OG/Twitter-Defaults, robots
│   │   ├── opengraph-image.tsx                 ← M8: 1200×630 ImageResponse pro Locale (DE/EN), Datenraum-Blau, siteName/siteDescription
│   │   ├── page.tsx                            ← Landing: Hero + Benefits + NetworkMapSection (MyMaps-iframe) + ComicStrip + Stakeholder-Benefits + VideoEmbed + QuoteGallery + Pitch
│   │   ├── team/page.tsx                       ← PageHero + TeamGrid (4 Personen, Sanity-CDN-Portraits); Route /ansprechpersonen→/team 308-Redirect (Session 29)
│   │   ├── konzeption/page.tsx                 ← PageHero + 6 TextSections + Team-Block + Zeitstrahl (#zeitstrahl) + CTA-Links (Session 28: aus /projekt umgezogen)
│   │   ├── konzeption/technische-standards/page.tsx
│   │   ├── konzeption/semantische-standards/page.tsx
│   │   ├── jetzt-mitmachen/page.tsx            ← PageHero + 2 TextSections + 3 CTA-Links (Session 28: aus /beteiligung umgezogen)
│   │   ├── jetzt-mitmachen/anwendungsbeispiele/page.tsx ← 3 UseCaseCards
│   │   ├── jetzt-mitmachen/mitwirkung/page.tsx ← Nutzenkarten + 3 StepCards + Tanzarchiv-Zitat + Webagentur-Checkliste + <PartnerMap> (M5, Session 20 Kartenpolish), revalidate=60
│   │   ├── materialien/page.tsx                ← Session 28: PageHero + ResourceLinkGrid mit 8 ORIF-Werkzeugen (Comic, Image-Video, Infomaterial, Musterkalkulation, Doku, Validator, Lektoratstool, GitHub)
│   │   ├── impressum/page.tsx                  ← TODO-Platzhalter mit sichtbarem Lead (Legal-Referenz auf § 5 DDG)
│   │   ├── datenschutz/page.tsx                ← TODO-Platzhalter mit sichtbarem Lead
│   │   ├── blog/[slug]/page.tsx                ← Detail (Supabase) mit generateStaticParams + dynamicParams; twitter.card=summary_large_image
│   │   ├── blog/[slug]/opengraph-image.tsx     ← M9: Per-Post 1200×630 OG mit Title + lokalisiertem published_at
│   │   └── faq/page.tsx                        ← FaqAccordion nach category gruppiert (Supabase; M11: 21 Original-FAQ) mit ComingSoonHero-Fallback
│   │     (Session 30: blog/page.tsx + termine/page.tsx gelöscht — Inhalte leben im Konzeption-Zeitstrahl; /blog + /termine 308 auf /konzeption)
│   ├── app/api/revalidate/route.ts             ← POST-Webhook-Endpoint, Secret-Check, revalidatePath; Post-Änderungen invalidieren auch `/sitemap.xml`
│   ├── app/globals.css                         ← Tailwind v4 + shadcn theme + tokens.css-Import + accent-brand-foreground-Bridge; Session 27: Drop-Cap-Metrik ruhiger gesetzt
│   ├── components/
│   │   ├── ui/                                 ← shadcn (radix-nova) Primitives
│   │   ├── layout/                             ← Header.tsx (Session 28: Bühnenverein-Logo + 4-Item-Nav), Footer.tsx, LanguageSwitcher.tsx, MobileNav.tsx (4 Items)
│   │   ├── sections/                           ← PageHero, TextSection, ContactCard, TeamGrid,
│   │   │                                          BuehnenvereinLockup (Session 28 NEU), VideoEmbed (Session 28 NEU), QuoteGallery (Session 28 NEU),
│   │   │                                          MapEmbed (Session 29 NEU: Google MyMaps), Timeline (Session 29 NEU: Events + Genially-Embed),
│   │   │                                          DataFlowDiagram (Session 31 NEU: ORIF-Datenflow, data-driven Server-Component, 3 Stage-Cards + Inline-SVG-Pfeile, CI-Neuzeichnung Website-DRK-S.1),
│   │   │                                          UseCaseCard, StepCard, ComingSoonHero (jetzt mit body-Prop),
│   │   │                                          ComicStrip (Server-Wrapper) + ComicStripFrames (Client, GSAP-Stagger, M6; Session 31: width/height statt fill),
│   │   │                                          PostArticle (mit ViewTransition-Wrap, M6; Session 30: PostCard entfernt),
│   │   │                                          PostCoverVisual (Session 19: CSS-Cover-Fallback fuer Posts ohne cover_image_url),
│   │   │                                          FaqAccordion (M4; Session 29: nach category gruppiert; Session 30: EventCard entfernt),
│   │   │                                          PartnerMap (Server) + PartnerMapClient (Client, GSAP, M5; Session 20: Status-Legende, Standortzähler, Liste, kompaktere Desktop-Karte),
│   │   │                                          FeatureGrid (Session 25: Desktop-Spalten nach Feature-Anzahl), NetworkMapSection, ResourceLinkGrid (M11 Original-Site-Transfer);
│   │   │                                          ContactCard (Session 27: Portrait-Crop, Fotocredit-Ribbon, natürliche E-Mail-Breakpoints)
│   │   ├── animations/                         ← FadeInOnScroll, RevealText (Session 27: vertikaler Masken-Puffer gegen Serif-Clipping), ParallaxImage,
│   │   │                                          ScrollTriggerRefresher (Layout-globaler usePathname-Listener, M6)
│   │   └── forms/                              ← LEER (Newsletter/Beta-Anmeldung später)
│   ├── lib/
│   │   ├── i18n/{routing,request,navigation}.ts
│   │   ├── content/loader.ts                   ← `loadContent(key, locale)` — typisierte JSON-Bundle-Registry
│   │   ├── seo/                                ← M8: site.ts (`getSiteUrl()`), alternates.ts (`buildAlternates`, `pageMetadata`)
│   │   ├── supabase/                           ← env.ts, server.ts (cookie-Server + getSupabaseAnon), client.ts, queries.ts (`listPublishedPostSitemapEntries` fuer Sitemap)
│   │   ├── gsap/registerScrollTrigger.ts
│   │   ├── maps.ts                             ← Session 33: MYMAPS_EMBED_URL-Konstante (Google MyMaps, von Startseite + /jetzt-mitmachen genutzt)
│   │   └── utils.ts                            ← cn(), shadcn helper
│   ├── messages/{de,en}.json                   ← UI-Strings: nav, hero, footer, comingSoon, team, pages.* (M7: EN reviewt + strukturgleich)
│   ├── types/database.ts                       ← Generated Supabase types (`pnpm gen:types`, mit Relationships)
│   ├── types/react-canary.d.ts                 ← M6: `/// <reference types="react/canary" />` für `<ViewTransition>`-Typen
│   ├── content/{de,en}/                        ← Page-Content (Session 28: hrefs auf neue Routen migriert):
│   │   ├── materialien.json                     ← Session 28: 8 ORIF-Werkzeuge + 2 interne Folge-Links
│   │   ├── team.json                            ←   4 Ansprechpersonen mit Sanity-CDN-Portraits aus alter Website
│   │   ├── projekt.json                         ←   6 Sections + 2 Links
│   │   ├── projekt-technische-standards.json     ←   ORIF-Erklärung + Ressourcen/Tools (Comic, Doku, Validator, Lektorat)
│   │   ├── projekt-semantische-standards.json
│   │   ├── beteiligung.json                     ←   Pitch + 3 Links
│   │   ├── beteiligung-anwendungsbeispiele.json ←   3 Use Cases
│   │   ├── beteiligung-mitwirkung.json          ←   Nutzenargumente, 3 Schritte, Tanzarchiv-Zitat, Webagentur-/IT-Checkliste
│   │   ├── legal.json                           ←   imprint/privacy mit todo-Flag; Impressum-Hinweis nutzt § 5 DDG
│   │   └── landing.json                         ←   Benefits + DACH-Netzwerkkarte + Comic-Strip-Frames + Stakeholder-Benefits + Pitch
│   ├── styles/tokens.css                       ← Session 28: CI-Tokens (Lucent White / Black / Grays 80-10 / Purple Dark/Medium/Light), Public Sans als einzige Schrift, einzelne Akzentfarbe
│   ├── types/                                  ← Generated Supabase types ab M4
│   └── proxy.ts                                ← next-intl Routing-Proxy (Next.js 16!); Matcher excluded `icon|apple-icon|opengraph-image|twitter-image|manifest` (Top-Level Convention Files)
│
├── supabase/                                   ← config.toml (project_id=smarte-theaterdienste-website),
│   ├── migrations/
│   │   ├── 20260427121400_init.sql             ← M4 Schema + RLS
│   │   ├── 20260507120000_m7_english_post_translations.sql ← M7 Blog-Translations
│   │   ├── 20260507153000_m11_original_site_content.sql ← M11 Original-FAQ + 2025-Events
│   │   └── 20260607120000_event_image_url.sql  ← Session 32: events.image_url (NOCH NICHT gepusht — DB-Passwort fehlt)
│   ├── seed.sql                                ← Beispiel-Daten inkl. M7 Blog-Translations
│   ├── config.toml                            │
│   └── .gitignore                             │
├── public/                                     ← Logos, Bilder
│   ├── maps/germany.svg                        ← Wikimedia public-domain Locator-Map (M5)
│   ├── hero/theater-parade.jpg                 ← M10: Theater-Parade-Foto (Schwarzweiss, alte Website)
│   ├── comic-strip/                            ← M10: 3 Schwarzweiss-Telefon-Frames mit lila Sprechblasen
│   │   ├── frame-1-zeit.jpg
│   │   ├── frame-2-bescheid.jpg
│   │   └── frame-3-verbindungen.jpg
│   ├── logos/                                  ← M10: Echte Partner-Logos (PNG, aus alter Website)
│   │   ├── buehnenverein.png
│   │   ├── akademie.png
│   │   ├── fraunhofer.png
│   │   ├── acatech.png
│   │   ├── nfdi4culture.png
│   │   ├── bkm.png
│   │   └── hamburg.png
│   └── team/                                   ← Optional fuer lokale Portrait-Kopien; aktuell rendert Team remote via Sanity-CDN
├── plugins/
│   └── website-design-ultra/                   ← Session 22: repo-lokales Codex-Plugin aus User-ZIP
│       ├── .codex-plugin/plugin.json           ← Codex-Manifest, `skills: ./skills/`
│       ├── README.md                           ← Codex-Installations-/Nutzungshinweise
│       ├── skills/                             ← 7 Design-Skills: Core, Style, Farben, Typo, Motion, Patterns, UI-States
│       └── commands/                           ← 3 uebernommene Workflow-Vorlagen: design, audit, refresh
├── SMARTE-THEATERDIENSTE/                      ← Dieser Vault
│   └── GO_LIVE_CHECKLIST.md                    ← Asset-/Domain-/Vercel-/Legal-Handoff fuer den User
│
├── next.config.ts                              ← Session 28: withNextIntl + remotePatterns (Supabase/Unsplash/Sanity/i.ytimg.com) + experimental.viewTransition (M6) + 12 permanente 308-Redirects von alten Pfaden (`/projekt`→`/konzeption`, `/beteiligung`→`/jetzt-mitmachen` jeweils DE+EN inkl. Sub-Routes)
├── components.json                             ← shadcn config (radix-nova, neutral baseColor, css-vars)
├── tsconfig.json                               ← @/* → ./src/*
├── package.json
├── pnpm-lock.yaml
├── .env.example                                ← Supabase, Resend, Revalidate-Secret
├── .gitignore                                  ← Vault-aware
├── .vercelignore                               ← schließt lokale Env-/Tooling-/Vault-Cache-Dateien vom CLI-Deploy aus
├── README.md
├── CLAUDE.md → @AGENTS.md + Vault-Hinweis
└── AGENTS.md                                   ← Next.js 16 Warnung
```

---

## Sprache & Routing

Beide Locales mit Pfad-Prefix:
- `/de` (Default) → `de.json`
- `/en` → `en.json`

`localeDetection` ist next-intl-Default = `true` → Browser-Accept-Language wählt Locale beim ersten Besuch von `/`.

Slug-Übersetzungen über `pathnames`-Map in `src/lib/i18n/routing.ts` (Stand Session 28):
- `/konzeption` ↔ `/concept`
- `/konzeption/technische-standards` ↔ `/concept/technical-standards`
- `/konzeption/semantische-standards` ↔ `/concept/semantic-standards`
- `/jetzt-mitmachen` ↔ `/join`
- `/jetzt-mitmachen/anwendungsbeispiele` ↔ `/join/use-cases`
- `/jetzt-mitmachen/mitwirkung` ↔ `/join/contribute`
- `/materialien` ↔ `/materials`
- `/impressum` ↔ `/imprint`

Alte Pfade `/projekt`, `/beteiligung` (DE) und `/project`, `/participation` (EN) werden in `next.config.ts` permanent (HTTP 308) auf die neuen Pfade umgeleitet.

**Navigation immer via `@/lib/i18n/navigation`**, niemals `next/link` direkt — sonst kein Locale-Routing.

---

## Lokal entwickeln

```bash
cd "/Users/kaygewinner/Desktop/Claude code/smarte-theaterdienste-website"
pnpm install            # nur einmal
pnpm dev                # http://localhost:3030 (oder via preview MCP)
pnpm build              # Production-SSG-Test
pnpm exec tsc --noEmit  # Typecheck
```

PNPM-Pfad falls nicht auf PATH:
`/Users/kaygewinner/.nvm/versions/node/v20.19.4/bin/pnpm`

Preview-Server-Config: `.claude/launch.json` (Workspace-Root) hat den Eintrag `smarte-theaterdienste` auf Port 3030.

---

## Nächste Schritte

Priorisierte Aufgaben mit Akzeptanzkriterien: [[DASHBOARD#📋 Nächste Schritte für Claude]] bzw. [[ROADMAP]]. Konkrete User-Handoff-Liste (Assets, Domain, Legal): [[GO_LIVE_CHECKLIST]].
