# Smarte Theaterdienste — Vollständiger Projektkontext

> Letzte Aktualisierung: 2026-05-08 | Stand: M5–M9 production-validiert, M10 Design-Refresh production-live, M11 Original-Site-Transfer umgesetzt, Session 19 Website-QA/UX-Polish production-build-validiert, Session 20 Miro-/Deutschlandkarten-QA umgesetzt (Nutzenblock, Webagentur-Checkliste, Kartenlegende/Standortliste). Nächster sinnvoller Schritt: Vercel-Alias nach Push/Redeploy prüfen, Custom-Domain-DNS auf Vercel umstellen und finale Rechtstexte einpflegen.

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
- Apple-like minimal mit subtilen GSAP-Animationen
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

**Hosting:** Vercel — Production live unter `https://smarte-theaterdienste-website.vercel.app` (Projekt `kaytm93s-projects/smarte-theaterdienste-website`, letzter validierter M10-Deploy `dpl_CdZyBYew1ESqpqqASWwnoxmE1xLB`). GitHub-Integration ist verbunden; Push auf `main` triggert Auto-Deploy. Achtung Session 20: `https://smarte-theaterdienste.de/de` zeigt noch auf alte Nicht-Vercel-A-Records und alte Inhalte; Repo-Pushes werden dort erst nach Domain-/DNS-Umstellung sichtbar.

**Datenbank:** Supabase Cloud — Projekt `hyirpaloozcautcxhbqk`, EU-Central (Frankfurt). Migrationen `20260427121400_init.sql`, `20260507120000_m7_english_post_translations.sql` und `20260507153000_m11_original_site_content.sql` sind live. `.env.local` enthält URL + anon-key + service-role-key + REVALIDATE_SECRET. Revalidate läuft in der Cloud-DB über `pg_net` + `public.revalidate_nextjs_cache()` mit Triggern auf `posts`, `post_translations`, `events`, `event_translations`, `faqs`, `faq_translations`. M11-Check: 21 veröffentlichte FAQs, 42 FAQ-Translations, 4 Original-Website-Termine als `past`.

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
│   │   ├── page.tsx                            ← Landing: Hero + Benefits + DACH-Netzwerkkarte + ComicStrip + Stakeholder-Benefits + Pitch
│   │   ├── ansprechpersonen/page.tsx           ← PageHero + TeamGrid (4 Personen, Portraits via Sanity-CDN aus alter Website)
│   │   ├── projekt/page.tsx                    ← PageHero + 6 TextSections + CTA-Links
│   │   ├── projekt/technische-standards/page.tsx
│   │   ├── projekt/semantische-standards/page.tsx
│   │   ├── beteiligung/page.tsx                ← PageHero + 2 TextSections + 3 CTA-Links
│   │   ├── beteiligung/anwendungsbeispiele/page.tsx ← 3 UseCaseCards
│   │   ├── beteiligung/mitwirkung/page.tsx     ← Nutzenkarten + 3 StepCards + Tanzarchiv-Zitat + Webagentur-Checkliste + <PartnerMap> (M5, Session 20 Kartenpolish), revalidate=60
│   │   ├── impressum/page.tsx                  ← TODO-Platzhalter mit sichtbarem Lead (Legal-Referenz auf § 5 DDG)
│   │   ├── datenschutz/page.tsx                ← TODO-Platzhalter mit sichtbarem Lead
│   │   ├── blog/page.tsx                       ← Liste (Supabase) mit ComingSoonHero-Fallback, revalidate=60
│   │   ├── blog/[slug]/page.tsx                ← Detail (Supabase) mit generateStaticParams + dynamicParams; Session 16: twitter.card=summary_large_image
│   │   ├── blog/[slug]/opengraph-image.tsx     ← M9 (Session 16): Per-Post 1200×630 OG mit Title + lokalisiertem published_at
│   │   ├── faq/page.tsx                        ← Accordion (Supabase; M11: 21 Original-FAQ-Einträge) mit ComingSoonHero-Fallback
│   │   └── termine/page.tsx                    ← Bevorstehend/Vergangen (Supabase; M11: 4 Original-Events als past) mit ComingSoonHero-Fallback
│   ├── app/api/revalidate/route.ts             ← POST-Webhook-Endpoint, Secret-Check, revalidatePath; Post-Änderungen invalidieren auch `/sitemap.xml`
│   ├── app/globals.css                         ← Tailwind v4 + shadcn theme + tokens.css-Import + accent-brand-foreground-Bridge
│   ├── components/
│   │   ├── ui/                                 ← shadcn (radix-nova) Primitives
│   │   ├── layout/                             ← Header.tsx, Footer.tsx, LanguageSwitcher.tsx, MobileNav.tsx
│   │   ├── sections/                           ← PageHero, TextSection, ContactCard, TeamGrid,
│   │   │                                          UseCaseCard, StepCard, ComingSoonHero (jetzt mit body-Prop),
│   │   │                                          ComicStrip (Server-Wrapper) + ComicStripFrames (Client, GSAP-Stagger, M6),
│   │   │                                          PostCard, PostArticle (mit ViewTransition-Wrap, M6),
│   │   │                                          PostCoverVisual (Session 19: CSS-Cover-Fallback fuer Posts ohne cover_image_url),
│   │   │                                          EventCard, FaqAccordion (M4),
│   │   │                                          PartnerMap (Server) + PartnerMapClient (Client, GSAP, M5; Session 20: Status-Legende, Standortzähler, Liste, kompaktere Desktop-Karte),
│   │   │                                          FeatureGrid, NetworkMapSection, ResourceLinkGrid (M11 Original-Site-Transfer)
│   │   ├── animations/                         ← FadeInOnScroll, RevealText, ParallaxImage,
│   │   │                                          ScrollTriggerRefresher (Layout-globaler usePathname-Listener, M6)
│   │   └── forms/                              ← LEER (Newsletter/Beta-Anmeldung später)
│   ├── lib/
│   │   ├── i18n/{routing,request,navigation}.ts
│   │   ├── content/loader.ts                   ← `loadContent(key, locale)` — typisierte JSON-Bundle-Registry
│   │   ├── seo/                                ← M8: site.ts (`getSiteUrl()`), alternates.ts (`buildAlternates`, `pageMetadata`)
│   │   ├── supabase/                           ← env.ts, server.ts (cookie-Server + getSupabaseAnon), client.ts, queries.ts (`listPublishedPostSitemapEntries` fuer Sitemap)
│   │   ├── gsap/registerScrollTrigger.ts
│   │   └── utils.ts                            ← cn(), shadcn helper
│   ├── messages/{de,en}.json                   ← UI-Strings: nav, hero, footer, comingSoon, team, pages.* (M7: EN reviewt + strukturgleich)
│   ├── types/database.ts                       ← Generated Supabase types (`pnpm gen:types`, mit Relationships)
│   ├── types/react-canary.d.ts                 ← M6: `/// <reference types="react/canary" />` für `<ViewTransition>`-Typen
│   ├── content/{de,en}/                        ← Page-Content (umfangreich, M7: EN reviewt + strukturgleich):
│   │   ├── team.json                            ←   4 Ansprechpersonen mit Sanity-CDN-Portraits aus alter Website
│   │   ├── projekt.json                         ←   6 Sections + 2 Links
│   │   ├── projekt-technische-standards.json     ←   ORIF-Erklärung + Ressourcen/Tools (Comic, Doku, Validator, Lektorat)
│   │   ├── projekt-semantische-standards.json
│   │   ├── beteiligung.json                     ←   Pitch + 3 Links
│   │   ├── beteiligung-anwendungsbeispiele.json ←   3 Use Cases
│   │   ├── beteiligung-mitwirkung.json          ←   Nutzenargumente, 3 Schritte, Tanzarchiv-Zitat, Webagentur-/IT-Checkliste
│   │   ├── legal.json                           ←   imprint/privacy mit todo-Flag; Impressum-Hinweis nutzt § 5 DDG
│   │   └── landing.json                         ←   Benefits + DACH-Netzwerkkarte + Comic-Strip-Frames + Stakeholder-Benefits + Pitch
│   ├── styles/tokens.css                       ← Spacing/Typo/Easings/Container; --accent-brand: Datenraum-Blau
│   ├── types/                                  ← Generated Supabase types ab M4
│   └── proxy.ts                                ← next-intl Routing-Proxy (Next.js 16!); Matcher excluded `icon|apple-icon|opengraph-image|twitter-image|manifest` (Top-Level Convention Files)
│
├── supabase/                                   ← config.toml (project_id=smarte-theaterdienste-website),
│   ├── migrations/
│   │   ├── 20260427121400_init.sql             ← M4 Schema + RLS
│   │   ├── 20260507120000_m7_english_post_translations.sql ← M7 Blog-Translations
│   │   └── 20260507153000_m11_original_site_content.sql ← M11 Original-FAQ + 2025-Events
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
├── SMARTE-THEATERDIENSTE/                      ← Dieser Vault
│   └── GO_LIVE_CHECKLIST.md                    ← Asset-/Domain-/Vercel-/Legal-Handoff fuer den User
│
├── next.config.ts                              ← withNextIntl + remotePatterns (Supabase/Unsplash/Sanity) + experimental.viewTransition (M6)
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

Slug-Übersetzungen über `pathnames`-Map in `src/lib/i18n/routing.ts`:
- `/projekt/technische-standards` ↔ `/project/technical-standards`
- `/beteiligung/anwendungsbeispiele` ↔ `/participation/use-cases`
- `/impressum` ↔ `/imprint`

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

Siehe `DASHBOARD.md → Was Claude beim nächsten Mal tun soll`.

Aktuell offen: **Custom Domain** und **finale Impressum-/Datenschutztexte**. Echte Blog-Cover-Bilder bleiben ein finaler Asset-Polish, aber die Blog-Liste und Blog-Details haben seit Session 19 sichtbare CSS-Cover-Fallbacks und ViewTransition-Elemente auch ohne `cover_image_url`. Die konkrete User-Handoff-Liste liegt in `SMARTE-THEATERDIENSTE/GO_LIVE_CHECKLIST.md`. M5 + M6 + M7 + M8 sind production-validiert; M10 ist production-live; M11/M12 warten nach Push auf Auto-Deploy-Validierung.
