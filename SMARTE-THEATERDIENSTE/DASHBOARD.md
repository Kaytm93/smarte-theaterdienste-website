# 📊 Dashboard — Smarte Theaterdienste

> Letzte Aktualisierung: 2026-04-30

## Status

| Bereich | Status |
|---|---|
| Projekt-Setup | ✅ M1 abgeschlossen |
| Design-System | ✅ M2 abgeschlossen |
| Statische Seiten | ✅ M3 abgeschlossen |
| Dynamische Inhalte (Supabase) | ✅ M4 abgeschlossen — Cloud-Projekt live, Pages rendern echte Daten |
| Partner-Karte | ⏳ M5 wartet |
| Animation-Polish | ⏳ M6 wartet |
| EN-Übersetzungen | ⏳ M7 wartet |
| Production-Polish | ⏳ M8 wartet |
| Vercel-Deployment | ✅ live: https://smarte-theaterdienste-website.vercel.app |
| Supabase-Revalidate | ✅ live via `pg_net`-Trigger auf 6 Tabellen → `/api/revalidate` |
| Vercel-GitHub-Integration | ⏳ User-Action: GitHub-App/Rechte im Vercel-Dashboard verbinden |

## Was gerade läuft

**Nichts** — Session 6 (Production-Deploy) beendet. Die Site ist live auf Vercel, Production-Env-Vars sind gesetzt, Live-Daten aus Supabase rendern auf der Production-Domain und Revalidate läuft per `pg_net`-Trigger. Automatische GitHub-Deployments sind noch nicht aktiv, weil Vercel die GitHub-Repository-Verknüpfung per CLI wegen fehlender oder nicht gewährter GitHub-App-Rechte abgelehnt hat.

## Letzte Aktivität

- **2026-04-30** — Production-Deploy: Vercel-Projekt `kaytm93s-projects/smarte-theaterdienste-website` per CLI angelegt/verlinkt, Production-Env-Vars gesetzt (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `REVALIDATE_SECRET`, `NEXT_PUBLIC_SITE_URL`), Production deployed und auf `https://smarte-theaterdienste-website.vercel.app` aliasiert. `.vercelignore` ergänzt, damit `.env*`, `.vercel/`, `.claude/`, `.next/`, `node_modules/`, Obsidian-Config und `supabase/.temp/` nicht ins Deployment-Bundle gelangen. Supabase-Revalidate direkt in der Cloud-DB eingerichtet: `pg_net` aktiviert, `public.revalidate_nextjs_cache()` angelegt, Trigger auf `posts`, `post_translations`, `events`, `event_translations`, `faqs`, `faq_translations`. Smoke-Test grün: Live-Routen 200, Revalidate mit falschem Secret 401, mit gültigem Secret 200, Trigger-Test via no-op `post_translations`-Update → `net._http_response.status_code = 200`.
- **2026-04-30** — M4 Finalisierung: Supabase-Cloud-Projekt verheiratet (`supabase link --project-ref hyirpaloozcautcxhbqk`), Migration `20260427121400_init.sql` per `db push` gespielt, `seed.sql` per `db query --linked` eingespielt (3 Posts, 2 Events, 5 FAQs, 4 Partners), `pnpm gen:types` schreibt jetzt echte Database-Types mit Relationships (406 Zeilen statt 214 hand-rolled). Build-Fehler `cookies() inside generateStaticParams` durch neuen `getSupabaseAnon()`-Client gelöst (siehe ADR-31), alle Public-Read-Queries auf Anon umgestellt — Pages wieder ● SSG mit 60s ISR. Browser-Test grün auf `/de/blog`, `/de/blog/[slug]` (Markdown-Body), `/de/faq`, `/de/termine`, `/en/blog`. `/api/revalidate` 401/200 wie erwartet.
- **2026-04-27** — M4 Vorbereitung: Supabase-CLI als dev-dep, Schema-Migration + Seed (posts/post_translations, events/event_translations, faqs/faq_translations, partners) mit RLS, hand-rolled `src/types/database.ts`, lib/supabase/{env,server,client,queries}.ts aktiviert, neue Sections (PostCard, PostArticle, EventCard, FaqAccordion), Pages für Blog/FAQ/Termine ersetzt + `/blog/[slug]`, `/api/revalidate` mit Secret-Check + `revalidatePath`. Graceful-Degradation: ohne Env-Vars greift ComingSoonHero. (siehe [[CHANGELOG]])
- **2026-04-26 (Abend)** — M3 Statische Seiten DE: alle Routen aus `routing.ts` als Server-Components, Akzentfarbe Datenraum-Blau gesetzt, Sections-Component-Library (PageHero, TextSection, ContactCard/TeamGrid, UseCaseCard, StepCard, ComingSoonHero, ComicStrip), Content-Loader mit JSON-Bundles pro Locale, Landing erweitert. Coming-Soon-Stubs für Blog/FAQ/Termine. Impressum/Datenschutz mit sichtbaren TODO-Platzhaltern.
- **2026-04-26** — M2 Design-System: shadcn (Radix-Nova) initialisiert, Header/Footer/LanguageSwitcher/MobileNav, Animation-Primitives (FadeInOnScroll, RevealText, ParallaxImage), Tokens ausgebaut, Hero-Page integriert
- **2026-04-25** — M1 Setup & Infra: Next.js 16 Bootstrap, next-intl-Routing, Vault-Struktur, Initial-Push zu GitHub

---

## 📋 Was Claude beim nächsten Mal tun soll

**Default-Nächster-Schritt: M5 Partner-Karte** — Hosting und Revalidate sind live; die nächste Produktlücke im Milestone-Plan ist die interaktive Deutschlandkarte auf `/beteiligung/mitwirkung`.

Vor M5 optional erledigen:
1. **Vercel-GitHub-Integration manuell verbinden:** Vercel Dashboard → Project → Settings → Git → Connected Git Repository. CLI-Connect scheiterte mit `Failed to connect Kaytm93/smarte-theaterdienste-website to project`, vermutlich weil die Vercel-GitHub-App noch keinen Repo-Zugriff hat.
2. **Custom Domain planen:** Falls `smarte-theaterdienste.de` auf das neue Projekt zeigen soll, Domain in Vercel hinzufügen und DNS umstellen.
3. **Preview-Env-Vars ergänzen:** Production ist gesetzt. Preview kann im Dashboard für alle Branches oder branch-spezifisch ergänzt werden, sobald GitHub-Integration aktiv ist.

**Alternative Pfade:**
- **Echte Assets ziehen** — Portraits Sophie Moriarty, Partner-Logos als SVG, Hero-Visual.
- **M6 Animation-Polish** — Comic-Strip-Variante (pinned scroll vs. vertical), GSAP-Feinschliff.
- **Echte Inhalte einpflegen** — über Supabase-Studio Posts/Events/FAQs erweitern; Webhook revalidiert automatisch sobald live.

**Bekannte Restposten in M4 (kein Blocker):**
- `.returns<T>()`-Casts in `queries.ts` bewusst behalten als explizite Row-Annotation (siehe Header-Kommentar). Können bei Bedarf entfernt werden.
- `getSupabaseServer()` (cookie-bewusst) liegt unbenutzt — wird für Forms/Auth ab M5+ relevant.

---

## Bekannte offene Fragen für M5+

- **CMS-Frontend für Inhalte:** Direkt Supabase-Studio reicht für Bühnenverein-Team? Oder leichtgewichtiger Admin-Bereich später
- **Comic-Strip auf Landing:** pinned horizontal scroll (mehr Wow) vs. vertical stagger (mobile-friendlich)? Entscheidung in M6 (aktuell statisches 4-Card-Grid als Skeleton)
- **Echte Asset-Lieferung:** Portrait-Fotos (© Sophie Moriarty), Partner-Logos als SVG, Hero-Visual

## Bekannte Tooling-Lücken (siehe [[PROBLEME]])

- `gh` CLI fehlt — GitHub-Repo wurde manuell vom User erstellt
- `supabase` CLI nicht global (npm-Postinstall verbietet es) — als dev-dep installiert ✅
- Homebrew nicht installiert
