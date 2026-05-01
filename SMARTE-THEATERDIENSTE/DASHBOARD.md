# 📊 Dashboard — Smarte Theaterdienste

> Letzte Aktualisierung: 2026-05-01

## Status

| Bereich | Status |
|---|---|
| Projekt-Setup | ✅ M1 abgeschlossen |
| Design-System | ✅ M2 abgeschlossen |
| Statische Seiten | ✅ M3 abgeschlossen |
| Dynamische Inhalte (Supabase) | ✅ M4 abgeschlossen — Cloud-Projekt live, Pages rendern echte Daten |
| Partner-Karte | ✅ M5 abgeschlossen — interaktive Karte auf `/beteiligung/mitwirkung` |
| Animation-Polish | ⏳ M6 wartet |
| EN-Übersetzungen | ⏳ M7 wartet |
| Production-Polish | 🟡 M8 partial — Hosting + Revalidate live, SEO/OG/Sitemap/Lighthouse offen |
| Vercel-Deployment | ✅ live: https://smarte-theaterdienste-website.vercel.app |
| Supabase-Revalidate | ✅ live via `pg_net`-Trigger auf 6 Tabellen → `/api/revalidate` |
| Vercel-GitHub-Integration | ⏳ User-Action: GitHub-App/Rechte im Vercel-Dashboard verbinden |

## Was gerade läuft

**Nichts** — Session 7 (M5 Partner-Karte) beendet. Auf `/beteiligung/mitwirkung` rendert eine interaktive Deutschlandkarte mit den 4 seed-Partnern aus Supabase. Hotspots pulsieren per GSAP, Klick auf einen Pin aktualisiert ein Side-Panel mit Status-Badge, Koordinaten und (optional) Website-Link. Lokal verifiziert in DE und EN; Production-Deploy steht noch aus, weil die Vercel-GitHub-Integration weiterhin nicht verbunden ist — Deploy passiert beim nächsten Bedarf per `pnpm dlx vercel@latest deploy --prod`.

## Letzte Aktivität

- **2026-05-01** — M5 Partner-Karte: Wikimedia-Public-Domain-SVG (`Germany_location_map.svg`, NordNordWest) als statisches Asset unter `public/maps/germany.svg` (463 KB). Neue Components `PartnerMap` (Server-Wrapper) und `PartnerMapClient` (Client mit GSAP-Pulse, State-Management, Side-Panel). Lineares Equirectangular-Mapping `x=(lng-W)/(E-W)`, `y=(N-lat)/(N-S)` über Bounding-Box N=55.1°, S=47.2°, W=5.5°, E=15.5° platziert die 4 Partner aus Supabase als Prozent-Hotspots. `listPartners()` in `lib/supabase/queries.ts` (kein i18n-Join — Partner-Namen sind Eigennamen, Status wird via Messages lokalisiert). Status-Labels DE: Partner/Pilot-Theater/Interessiert; EN: Partner/Pilot theatre/Interested. Page-File ersetzt den alten Static-Placeholder-Block + `mapPlaceholder` und `partners` aus `content/{de,en}/beteiligung-mitwirkung.json` entfernt. Verifikation: tsc + eslint + `next build` clean (alle Pages SSG mit ISR), Browser-Test in DE und EN — Hotspot-Click aktualisiert das Panel, Empty-State (Initial-Zustand) listet Partner als Buttons. ADR-34 dokumentiert die SVG-/Mapping-Wahl. Vorab kleiner Docs-Commit (`134b442`): Codex' uncommittete Vault-Routine in `AGENTS.md` gespiegelt, damit beide Agenten dieselbe Pflicht-Routine kennen.
- **2026-04-30** — Production-Deploy: Vercel-Projekt `kaytm93s-projects/smarte-theaterdienste-website` per CLI angelegt/verlinkt, Production-Env-Vars gesetzt (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `REVALIDATE_SECRET`, `NEXT_PUBLIC_SITE_URL`), Production deployed und auf `https://smarte-theaterdienste-website.vercel.app` aliasiert. `.vercelignore` ergänzt, damit `.env*`, `.vercel/`, `.claude/`, `.next/`, `node_modules/`, Obsidian-Config und `supabase/.temp/` nicht ins Deployment-Bundle gelangen. Supabase-Revalidate direkt in der Cloud-DB eingerichtet: `pg_net` aktiviert, `public.revalidate_nextjs_cache()` angelegt, Trigger auf `posts`, `post_translations`, `events`, `event_translations`, `faqs`, `faq_translations`. Smoke-Test grün: Live-Routen 200, Revalidate mit falschem Secret 401, mit gültigem Secret 200, Trigger-Test via no-op `post_translations`-Update → `net._http_response.status_code = 200`.
- **2026-04-30** — M4 Finalisierung: Supabase-Cloud-Projekt verheiratet (`supabase link --project-ref hyirpaloozcautcxhbqk`), Migration `20260427121400_init.sql` per `db push` gespielt, `seed.sql` per `db query --linked` eingespielt (3 Posts, 2 Events, 5 FAQs, 4 Partners), `pnpm gen:types` schreibt jetzt echte Database-Types mit Relationships (406 Zeilen statt 214 hand-rolled). Build-Fehler `cookies() inside generateStaticParams` durch neuen `getSupabaseAnon()`-Client gelöst (siehe ADR-31), alle Public-Read-Queries auf Anon umgestellt — Pages wieder ● SSG mit 60s ISR. Browser-Test grün auf `/de/blog`, `/de/blog/[slug]` (Markdown-Body), `/de/faq`, `/de/termine`, `/en/blog`. `/api/revalidate` 401/200 wie erwartet.
- **2026-04-27** — M4 Vorbereitung: Supabase-CLI als dev-dep, Schema-Migration + Seed (posts/post_translations, events/event_translations, faqs/faq_translations, partners) mit RLS, hand-rolled `src/types/database.ts`, lib/supabase/{env,server,client,queries}.ts aktiviert, neue Sections (PostCard, PostArticle, EventCard, FaqAccordion), Pages für Blog/FAQ/Termine ersetzt + `/blog/[slug]`, `/api/revalidate` mit Secret-Check + `revalidatePath`. Graceful-Degradation: ohne Env-Vars greift ComingSoonHero. (siehe [[CHANGELOG]])
- **2026-04-26 (Abend)** — M3 Statische Seiten DE: alle Routen aus `routing.ts` als Server-Components, Akzentfarbe Datenraum-Blau gesetzt, Sections-Component-Library (PageHero, TextSection, ContactCard/TeamGrid, UseCaseCard, StepCard, ComingSoonHero, ComicStrip), Content-Loader mit JSON-Bundles pro Locale, Landing erweitert. Coming-Soon-Stubs für Blog/FAQ/Termine. Impressum/Datenschutz mit sichtbaren TODO-Platzhaltern.
- **2026-04-26** — M2 Design-System: shadcn (Radix-Nova) initialisiert, Header/Footer/LanguageSwitcher/MobileNav, Animation-Primitives (FadeInOnScroll, RevealText, ParallaxImage), Tokens ausgebaut, Hero-Page integriert
- **2026-04-25** — M1 Setup & Infra: Next.js 16 Bootstrap, next-intl-Routing, Vault-Struktur, Initial-Push zu GitHub

---

## 📋 Was Claude beim nächsten Mal tun soll

**Default-Nächster-Schritt: M6 Animation-Polish oder M8-Restpolish** — die Produkt-Funktion ist mit M5 vollständig, was fehlt ist Feinschliff.

**Pfade nach Wahl:**
1. **M6 Animation-Polish** — Comic-Strip-Variante entscheiden (pinned horizontal vs. vertical stagger), Hero-Parallax, Hover-States, View-Transitions, ScrollTrigger-Refresh nach Page-Transitions. Erfordert User-Entscheidung zur Comic-Strip-Variante.
2. **M8 Restpolish (SEO/A11y/Lighthouse)** — `opengraph-image.tsx` pro Locale, `sitemap.ts`, `robots.ts`, Lighthouse-Audit ≥95, axe-core-Check, GitHub-Actions-CI mit lint/typecheck/build.
3. **M7 EN-Übersetzungen** — vollständige `messages/en.json`, EN-Content in `content/en/`, Supabase-Translations für DB-Inhalte (zwei Posts haben aktuell nur DE-Translations), `hreflang` in `generateMetadata` pro Page.
4. **Production-Redeploy** — M5 ist nur lokal verifiziert; das nächste `pnpm dlx vercel@latest deploy --prod` bringt die Karte live.

**Optionale Mini-Tasks vor dem nächsten Milestone:**
- **Vercel-GitHub-Integration manuell verbinden:** Vercel Dashboard → Project → Settings → Git → Connected Git Repository. CLI-Connect scheiterte mit `Failed to connect Kaytm93/smarte-theaterdienste-website to project`, vermutlich weil die Vercel-GitHub-App noch keinen Repo-Zugriff hat.
- **Custom Domain planen:** Falls `smarte-theaterdienste.de` auf das neue Projekt zeigen soll, Domain in Vercel hinzufügen und DNS umstellen.
- **Echte Assets ziehen** — Portraits Sophie Moriarty, Partner-Logos als SVG, Hero-Visual, Partner-`website_url`/`logo_url` in Supabase nachpflegen (aktuell nur Geo-Coords gesetzt).

**Bekannte Restposten in M4 (kein Blocker):**
- `.returns<T>()`-Casts in `queries.ts` bewusst behalten als explizite Row-Annotation (siehe Header-Kommentar). Können bei Bedarf entfernt werden.
- `getSupabaseServer()` (cookie-bewusst) liegt unbenutzt — wird für Forms/Auth ab späteren Milestones relevant.

**Bekannte Restposten in M5 (kein Blocker):**
- Partner haben in seed.sql keine `website_url`/`logo_url` — der "Zur Website"-Link erscheint daher nicht. Nachpflegen, sobald Asset-/URL-Lieferung steht.
- Mobile-Layout der Karte ist 1-spaltig (Map über Panel); auf sehr kleinen Screens kann das Panel weit unten landen. Ggf. später als Drawer/Sheet auf Mobile umbauen, falls Stakeholder das möchten.

---

## Bekannte offene Fragen für M5+

- **CMS-Frontend für Inhalte:** Direkt Supabase-Studio reicht für Bühnenverein-Team? Oder leichtgewichtiger Admin-Bereich später
- **Comic-Strip auf Landing:** pinned horizontal scroll (mehr Wow) vs. vertical stagger (mobile-friendlich)? Entscheidung in M6 (aktuell statisches 4-Card-Grid als Skeleton)
- **Echte Asset-Lieferung:** Portrait-Fotos (© Sophie Moriarty), Partner-Logos als SVG, Hero-Visual

## Bekannte Tooling-Lücken (siehe [[PROBLEME]])

- `gh` CLI fehlt — GitHub-Repo wurde manuell vom User erstellt
- `supabase` CLI nicht global (npm-Postinstall verbietet es) — als dev-dep installiert ✅
- Homebrew nicht installiert
