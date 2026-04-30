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
| Vercel-Deployment | ⏳ noch nicht eingerichtet |
| Supabase-Webhook im Studio | ⏳ User-Action: Hook auf 7 Tabellen → `/api/revalidate` |

## Was gerade läuft

**Nichts** — Session 5 (M4-Finalisierung) beendet, alles auf `main` gepusht. Live-Daten aus Supabase Cloud (Projekt `hyirpaloozcautcxhbqk`, EU-Frankfurt) rendern auf `/de/blog`, `/de/faq`, `/de/termine`, `/en/blog`. Locale-Filter sauber: post2 hat keine EN-Translation und wird auf `/en/blog` korrekt ausgeblendet.

## Letzte Aktivität

- **2026-04-30** — M4 Finalisierung: Supabase-Cloud-Projekt verheiratet (`supabase link --project-ref hyirpaloozcautcxhbqk`), Migration `20260427121400_init.sql` per `db push` gespielt, `seed.sql` per `db query --linked` eingespielt (3 Posts, 2 Events, 5 FAQs, 4 Partners), `pnpm gen:types` schreibt jetzt echte Database-Types mit Relationships (406 Zeilen statt 214 hand-rolled). Build-Fehler `cookies() inside generateStaticParams` durch neuen `getSupabaseAnon()`-Client gelöst (siehe ADR-31), alle Public-Read-Queries auf Anon umgestellt — Pages wieder ● SSG mit 60s ISR. Browser-Test grün auf `/de/blog`, `/de/blog/[slug]` (Markdown-Body), `/de/faq`, `/de/termine`, `/en/blog`. `/api/revalidate` 401/200 wie erwartet.
- **2026-04-27** — M4 Vorbereitung: Supabase-CLI als dev-dep, Schema-Migration + Seed (posts/post_translations, events/event_translations, faqs/faq_translations, partners) mit RLS, hand-rolled `src/types/database.ts`, lib/supabase/{env,server,client,queries}.ts aktiviert, neue Sections (PostCard, PostArticle, EventCard, FaqAccordion), Pages für Blog/FAQ/Termine ersetzt + `/blog/[slug]`, `/api/revalidate` mit Secret-Check + `revalidatePath`. Graceful-Degradation: ohne Env-Vars greift ComingSoonHero. (siehe [[CHANGELOG]])
- **2026-04-26 (Abend)** — M3 Statische Seiten DE: alle Routen aus `routing.ts` als Server-Components, Akzentfarbe Datenraum-Blau gesetzt, Sections-Component-Library (PageHero, TextSection, ContactCard/TeamGrid, UseCaseCard, StepCard, ComingSoonHero, ComicStrip), Content-Loader mit JSON-Bundles pro Locale, Landing erweitert. Coming-Soon-Stubs für Blog/FAQ/Termine. Impressum/Datenschutz mit sichtbaren TODO-Platzhaltern.
- **2026-04-26** — M2 Design-System: shadcn (Radix-Nova) initialisiert, Header/Footer/LanguageSwitcher/MobileNav, Animation-Primitives (FadeInOnScroll, RevealText, ParallaxImage), Tokens ausgebaut, Hero-Page integriert
- **2026-04-25** — M1 Setup & Infra: Next.js 16 Bootstrap, next-intl-Routing, Vault-Struktur, Initial-Push zu GitHub

---

## 📋 Was Claude beim nächsten Mal tun soll

**Default-Nächster-Schritt: Vercel-Deployment einrichten** — Site funktioniert vollständig (Supabase live, Daten rendern), nur Hosting fehlt.

Schritte:
1. Vercel-Account verheiraten mit GitHub-Repo `Kaytm93/smarte-theaterdienste-website`
2. Env-Vars in Vercel-Project-Settings setzen (gleiche Werte wie `.env.local`):
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`, `REVALIDATE_SECRET`
   - `NEXT_PUBLIC_SITE_URL` auf Production-URL setzen
3. Deploy → Production-URL notieren
4. **Supabase-Webhook nachträglich anlegen** (Studio → Database → Webhooks → New Hook):
   - Method: POST · URL: `https://<vercel-domain>/api/revalidate?secret=<REVALIDATE_SECRET>`
   - Tabellen aktivieren: `posts`, `post_translations`, `events`, `event_translations`, `faqs`, `faq_translations`
   - Events: insert/update/delete
   - Test: Insert in `posts` → `/de/blog` zeigt frische Liste innerhalb 60s

**Alternative Pfade:**
- **M5 Partner-Karte** — Daten liegen in `partners`-Tabelle (lat/lng), SVG-Komponente fehlt. Pure Frontend, keine Cloud-Blocker.
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
