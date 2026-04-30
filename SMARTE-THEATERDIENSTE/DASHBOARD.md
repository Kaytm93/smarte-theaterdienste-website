# 📊 Dashboard — Smarte Theaterdienste

> Letzte Aktualisierung: 2026-04-27

## Status

| Bereich | Status |
|---|---|
| Projekt-Setup | ✅ M1 abgeschlossen |
| Design-System | ✅ M2 abgeschlossen |
| Statische Seiten | ✅ M3 abgeschlossen |
| Dynamische Inhalte (Supabase) | 🟡 M4 vorbereitet — wartet auf Cloud-Projekt + `.env.local` |
| Partner-Karte | ⏳ M5 wartet |
| Animation-Polish | ⏳ M6 wartet |
| EN-Übersetzungen | ⏳ M7 wartet |
| Production-Polish | ⏳ M8 wartet |
| Vercel-Deployment | ⏳ noch nicht eingerichtet |
| Supabase-Projekt | ⏳ User-Action erforderlich (Cloud-Projekt anlegen) |

## Was gerade läuft

**Nichts** — Session 4 (M4-Vorbereitung) beendet, alles auf `main` gepusht. Code rendert Pages mit Daten, sobald `.env.local` + Cloud-DB live sind. Ohne Env-Vars zeigen Blog/FAQ/Termine weiter ComingSoonHero.

## Letzte Aktivität

- **2026-04-27** — M4 Vorbereitung: Supabase-CLI als dev-dep, Schema-Migration + Seed (posts/post_translations, events/event_translations, faqs/faq_translations, partners) mit RLS, hand-rolled `src/types/database.ts`, lib/supabase/{env,server,client,queries}.ts aktiviert, neue Sections (PostCard, PostArticle, EventCard, FaqAccordion), Pages für Blog/FAQ/Termine ersetzt + `/blog/[slug]`, `/api/revalidate` mit Secret-Check + `revalidatePath`. Graceful-Degradation: ohne Env-Vars greift ComingSoonHero. (siehe [[CHANGELOG]])
- **2026-04-26 (Abend)** — M3 Statische Seiten DE: alle Routen aus `routing.ts` als Server-Components, Akzentfarbe Datenraum-Blau gesetzt, Sections-Component-Library (PageHero, TextSection, ContactCard/TeamGrid, UseCaseCard, StepCard, ComingSoonHero, ComicStrip), Content-Loader mit JSON-Bundles pro Locale, Landing erweitert. Coming-Soon-Stubs für Blog/FAQ/Termine. Impressum/Datenschutz mit sichtbaren TODO-Platzhaltern.
- **2026-04-26** — M2 Design-System: shadcn (Radix-Nova) initialisiert, Header/Footer/LanguageSwitcher/MobileNav, Animation-Primitives (FadeInOnScroll, RevealText, ParallaxImage), Tokens ausgebaut, Hero-Page integriert
- **2026-04-25** — M1 Setup & Infra: Next.js 16 Bootstrap, next-intl-Routing, Vault-Struktur, Initial-Push zu GitHub

---

## 📋 Was Claude beim nächsten Mal tun soll

**Default-Nächster-Schritt: M4 finalisieren — Cloud-Projekt verheiraten**

Vorbedingung: User legt **Supabase-Cloud-Projekt** an (https://supabase.com/dashboard, EU-Central Frankfurt) und schreibt in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL="https://<ref>.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJ..."
SUPABASE_SERVICE_ROLE_KEY="eyJ..."
REVALIDATE_SECRET="<openssl rand -hex 32>"
```

Dann 3 Befehle (User erledigt selbst oder Claude in nächster Session):
```bash
pnpm exec supabase login                              # einmalig, opens browser
pnpm exec supabase link --project-ref <ref>           # verheiratet config.toml mit Cloud
pnpm exec supabase db push                            # spielt 20260427121400_init.sql ein
```

Empfohlen direkt danach:
```bash
pnpm exec supabase db seed                            # spielt seed.sql ein (3 Posts, 2 Events, 5 FAQs, 4 Partners)
pnpm gen:types                                        # generiert echte src/types/database.ts (mit Relationships)
```

Nach Cloud-Setup:
1. **Supabase Studio → Database → Webhooks → New Hook**
   - Tabellen: `posts`, `post_translations`, `events`, `event_translations`, `faqs`, `faq_translations`
   - Method: POST, URL: `https://<deployment>/api/revalidate?secret=<REVALIDATE_SECRET>`
   - Test-Insert in `posts` → `/de/blog` zeigt frische Liste innerhalb 60s
2. `pnpm dev` → `/de/blog`, `/de/blog/[slug]`, `/de/faq`, `/de/termine` zeigen Daten
3. `pnpm build` muss clean bleiben

**Falls User andere Prioritäten setzt:**
- **Vercel-Deployment vorziehen** — sinnvoll: Site funktioniert auch ohne Supabase (graceful degradation)
- **Echte Assets nachziehen** — Portraits Sophie Moriarty, Partner-Logos als SVG, Hero-Bild für Landing
- **M5 Partner-Karte** — Daten liegen schon in `partners`-Tabelle (lat/lng), Komponente fehlt

**Was in M4-Restschritten passiert (nach Cloud-Setup):**
- Echte `src/types/database.ts` via `pnpm gen:types` → ersetzt hand-rolled Version, bringt Relationships
- `.returns<T>()`-Casts in `queries.ts` können entfernt werden, sobald Relationships da sind (optional)

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
