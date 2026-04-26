# 📊 Dashboard — Smarte Theaterdienste

> Letzte Aktualisierung: 2026-04-26

## Status

| Bereich | Status |
|---|---|
| Projekt-Setup | ✅ M1 abgeschlossen |
| Design-System | ✅ M2 abgeschlossen |
| Statische Seiten | ✅ M3 abgeschlossen |
| Dynamische Inhalte (Supabase) | ⏳ M4 next |
| Partner-Karte | ⏳ M5 wartet |
| Animation-Polish | ⏳ M6 wartet |
| EN-Übersetzungen | ⏳ M7 wartet |
| Production-Polish | ⏳ M8 wartet |
| Vercel-Deployment | ⏳ noch nicht eingerichtet |
| Supabase-Projekt | ⏳ noch nicht angelegt |

## Was gerade läuft

**Nichts** — Session 3 (M3) beendet, alles auf `main` gepusht. Alle 14 Routen × 2 Locales rendern als SSG. Dev-Server kann via Preview-MCP `smarte-theaterdienste` neu gestartet werden.

## Letzte Aktivität

- **2026-04-26 (Abend)** — M3 Statische Seiten DE: alle Routen aus `routing.ts` als Server-Components, Akzentfarbe Datenraum-Blau gesetzt, Sections-Component-Library (PageHero, TextSection, ContactCard/TeamGrid, UseCaseCard, StepCard, ComingSoonHero, ComicStrip), Content-Loader mit JSON-Bundles pro Locale, Landing erweitert. Coming-Soon-Stubs für Blog/FAQ/Termine. Impressum/Datenschutz mit sichtbaren TODO-Platzhaltern. (siehe [[CHANGELOG]])
- **2026-04-26** — M2 Design-System: shadcn (Radix-Nova) initialisiert, Header/Footer/LanguageSwitcher/MobileNav, Animation-Primitives (FadeInOnScroll, RevealText, ParallaxImage), Tokens ausgebaut, Hero-Page integriert
- **2026-04-25** — M1 Setup & Infra: Next.js 16 Bootstrap, next-intl-Routing, Vault-Struktur, Initial-Push zu GitHub

---

## 📋 Was Claude beim nächsten Mal tun soll

**Default-Nächster-Schritt: M4 — Dynamic Content (Supabase)**

Voraussetzungen vor M4:
1. **User legt Supabase-Projekt an** (Web-Console, EU-Region empfohlen) und liefert `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` + `SUPABASE_SERVICE_ROLE_KEY` für `.env.local`.

Reihenfolge in M4:
1. `pnpm add -D supabase` (CLI als dev-dep, Workaround dokumentiert in PROBLEME.md)
2. `supabase init` → `supabase/config.toml`
3. `supabase link --project-ref <ref>` mit Access-Token
4. Migration `supabase/migrations/20XXXXXX_init.sql` mit Schema:
   - `events` + `event_translations`
   - `posts` + `post_translations`
   - `faqs` + `faq_translations`
   - `partners` (für M5-Map: name, lat, lng, logo_url, status)
5. `supabase db push` → Schema in Cloud
6. `supabase gen types typescript --linked > src/types/database.ts`
7. `lib/supabase/{client,server}.ts` aus Stub aktivieren (siehe MUSTER.md Pattern)
8. `lib/supabase/queries.ts` mit i18n-Joins (`.eq('post_translations.locale', locale)`)
9. Coming-Soon-Stubs in `app/[locale]/{blog,faq,termine}/page.tsx` durch echte Server-Component-Listen + Detail-Pages ersetzen
10. `app/api/revalidate/route.ts` mit `REVALIDATE_SECRET`-Check + `revalidateTag(tag, 'max')`
11. Supabase-Webhook (Database → Webhooks) auf `events`/`posts`/`faqs` POST → `/api/revalidate`
12. Seed-Daten in `supabase/seed.sql` (paar realistische Beispiele für lokale Entwicklung)

**Verifikation am Ende von M4:**
- `pnpm dev` zeigt echte Daten auf `/de/blog`, `/de/blog/[slug]`, `/de/faq`, `/de/termine`
- Update in Supabase → Webhook → `/api/revalidate` → frische Page innerhalb Sekunden
- `pnpm build` baut clean (Server-Components mit `fetch` zur DB werden statisch / ISR)

**Falls User andere Prioritäten setzt:**
- **Vercel-Deployment vorziehen** — sehr sinnvoll: Site ist M3-komplett, Coming-Soon-Stubs zeigen Roadmap, Akzentfarbe live
- **Echte Assets nachziehen** — Portraits Sophie Moriarty, Partner-Logos als SVG, Hero-Bild für Landing
- **M5 Partner-Karte** — könnte vor M4 als statische Variante (Daten in JSON statt DB) gemacht werden

---

## Bekannte offene Fragen für M4+

- **Supabase-Region:** EU-Central (Frankfurt) wegen DSGVO
- **CMS-Frontend für Inhalte:** Direkt Supabase-Studio reicht für Bühnenverein-Team? Oder leichtgewichtiger Admin-Bereich später
- **Comic-Strip auf Landing:** pinned horizontal scroll (mehr Wow) vs. vertical stagger (mobile-friendlich)? Entscheidung in M6 (aktuell statisches 4-Card-Grid als Skeleton)
- **Echte Asset-Lieferung:** Portrait-Fotos (© Sophie Moriarty), Partner-Logos als SVG, Hero-Visual

## Bekannte Tooling-Lücken (siehe [[PROBLEME]])

- `gh` CLI fehlt — GitHub-Repo wurde manuell vom User erstellt
- `supabase` CLI nicht global (npm-Postinstall verbietet es) — wird in M4 als dev-dep installiert
- Homebrew nicht installiert
