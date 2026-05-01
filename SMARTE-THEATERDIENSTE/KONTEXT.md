# Smarte Theaterdienste — Vollständiger Projektkontext

> Letzte Aktualisierung: 2026-05-01 | Stand: M5 lokal abgeschlossen (Partner-Karte), Production-Redeploy steht aus

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

**Hosting:** Vercel — Production live unter `https://smarte-theaterdienste-website.vercel.app` (Projekt `kaytm93s-projects/smarte-theaterdienste-website`). CLI-Deploy funktioniert. GitHub-Integration ist noch nicht verbunden, weil `vercel git connect` an GitHub-App/Rechten scheitert.

**Datenbank:** Supabase Cloud — Projekt `hyirpaloozcautcxhbqk`, EU-Central (Frankfurt). Migration `20260427121400_init.sql` und Seed live. `.env.local` enthält URL + anon-key + service-role-key + REVALIDATE_SECRET. Revalidate läuft in der Cloud-DB über `pg_net` + `public.revalidate_nextjs_cache()` mit Triggern auf `posts`, `post_translations`, `events`, `event_translations`, `faqs`, `faq_translations`.

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
├── src/
│   ├── app/[locale]/
│   │   ├── layout.tsx                          ← Root html/body, NextIntlClientProvider, Header+Footer, Fonts
│   │   ├── page.tsx                            ← Landing: Hero + ComicStrip-Skeleton + Pitch-TextSection
│   │   ├── ansprechpersonen/page.tsx           ← PageHero + TeamGrid (4 Personen)
│   │   ├── projekt/page.tsx                    ← PageHero + 6 TextSections + CTA-Links
│   │   ├── projekt/technische-standards/page.tsx
│   │   ├── projekt/semantische-standards/page.tsx
│   │   ├── beteiligung/page.tsx                ← PageHero + 2 TextSections + 3 CTA-Links
│   │   ├── beteiligung/anwendungsbeispiele/page.tsx ← 3 UseCaseCards
│   │   ├── beteiligung/mitwirkung/page.tsx     ← 2 StepCards + <PartnerMap> (M5), revalidate=60
│   │   ├── impressum/page.tsx                  ← TODO-Platzhalter
│   │   ├── datenschutz/page.tsx                ← TODO-Platzhalter
│   │   ├── blog/page.tsx                       ← Liste (Supabase) mit ComingSoonHero-Fallback, revalidate=60
│   │   ├── blog/[slug]/page.tsx                ← Detail (Supabase) mit generateStaticParams + dynamicParams
│   │   ├── faq/page.tsx                        ← Accordion (Supabase) mit ComingSoonHero-Fallback
│   │   └── termine/page.tsx                    ← Bevorstehend/Vergangen (Supabase) mit ComingSoonHero-Fallback
│   ├── app/api/revalidate/route.ts             ← POST-Webhook-Endpoint, Secret-Check, revalidatePath
│   ├── app/globals.css                         ← Tailwind v4 + shadcn theme + tokens.css-Import + accent-brand-foreground-Bridge
│   ├── components/
│   │   ├── ui/                                 ← shadcn (radix-nova) Primitives
│   │   ├── layout/                             ← Header.tsx, Footer.tsx, LanguageSwitcher.tsx, MobileNav.tsx
│   │   ├── sections/                           ← PageHero, TextSection, ContactCard, TeamGrid,
│   │   │                                          UseCaseCard, StepCard, ComingSoonHero (jetzt mit body-Prop), ComicStrip,
│   │   │                                          PostCard, PostArticle, EventCard, FaqAccordion (M4),
│   │   │                                          PartnerMap (Server) + PartnerMapClient (Client, GSAP, M5)
│   │   ├── animations/                         ← FadeInOnScroll, RevealText, ParallaxImage
│   │   └── forms/                              ← LEER (Newsletter/Beta-Anmeldung später)
│   ├── lib/
│   │   ├── i18n/{routing,request,navigation}.ts
│   │   ├── content/loader.ts                   ← `loadContent(key, locale)` — typisierte JSON-Bundle-Registry
│   │   ├── supabase/                           ← env.ts, server.ts (cookie-Server + getSupabaseAnon), client.ts, queries.ts
│   │   ├── gsap/registerScrollTrigger.ts
│   │   └── utils.ts                            ← cn(), shadcn helper
│   ├── messages/{de,en}.json                   ← UI-Strings: nav, hero, footer, comingSoon, team, pages.* (inkl. blog/faq/termine empty.* und Listen-Labels)
│   ├── types/database.ts                       ← Generated Supabase types (`pnpm gen:types`, mit Relationships)
│   ├── content/{de,en}/                        ← Page-Content (umfangreich):
│   │   ├── team.json                            ←   4 Ansprechpersonen
│   │   ├── projekt.json                         ←   6 Sections + 2 Links
│   │   ├── projekt-technische-standards.json
│   │   ├── projekt-semantische-standards.json
│   │   ├── beteiligung.json                     ←   Pitch + 3 Links
│   │   ├── beteiligung-anwendungsbeispiele.json ←   3 Use Cases
│   │   ├── beteiligung-mitwirkung.json          ←   2 Schritte + Map-Platzhalter
│   │   ├── legal.json                           ←   imprint/privacy mit todo-Flag
│   │   └── landing.json                         ←   Comic-Strip-Frames + Pitch
│   ├── styles/tokens.css                       ← Spacing/Typo/Easings/Container; --accent-brand: Datenraum-Blau
│   ├── types/                                  ← Generated Supabase types ab M4
│   └── proxy.ts                                ← next-intl Routing-Proxy (Next.js 16!)
│
├── supabase/                                   ← config.toml (project_id=smarte-theaterdienste-website),
│   ├── migrations/20260427121400_init.sql     │   migrations/ (Schema-SQL für Push), seed.sql (Beispiel-Daten)
│   ├── seed.sql                               │
│   ├── config.toml                            │
│   └── .gitignore                             │
├── public/                                     ← Logos, Bilder (Assets folgen vom User)
│   ├── maps/germany.svg                        ← Wikimedia public-domain Locator-Map (M5)
│   └── team/                                   ← (Portraits folgen, © Sophie Moriarty)
├── SMARTE-THEATERDIENSTE/                      ← Dieser Vault
│
├── next.config.ts                              ← withNextIntl + remotePatterns
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

Aktuell offen: **M6 Animation-Polish**, **M7 EN-Übersetzungen**, **M8-Restpolish** (SEO/OG/Sitemap/Lighthouse) und ein **Production-Redeploy**, damit die Partner-Karte aus M5 auch unter `https://smarte-theaterdienste-website.vercel.app` läuft. Vor dauerhaftem CI/CD sollte der User im Vercel-Dashboard die GitHub-Integration für `Kaytm93/smarte-theaterdienste-website` freigeben/verbinden; bis dahin deployt man per `pnpm dlx vercel@latest deploy --prod`.
