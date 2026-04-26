# 📊 Dashboard — Smarte Theaterdienste

> Letzte Aktualisierung: 2026-04-26

## Status

| Bereich | Status |
|---|---|
| Projekt-Setup | ✅ M1 abgeschlossen |
| Design-System | ✅ M2 abgeschlossen |
| Statische Seiten | ⏳ M3 next |
| Dynamische Inhalte (Supabase) | ⏳ M4 wartet |
| Partner-Karte | ⏳ M5 wartet |
| Animation-Polish | ⏳ M6 wartet |
| EN-Übersetzungen | ⏳ M7 wartet |
| Production-Polish | ⏳ M8 wartet |
| Vercel-Deployment | ⏳ noch nicht eingerichtet |
| Supabase-Projekt | ⏳ noch nicht angelegt |

## Was gerade läuft

**Nichts** — Session 2 (M2) beendet, alles auf `main` gepusht. Dev-Server kann via Preview-MCP `smarte-theaterdienste` neu gestartet werden.

## Letzte Aktivität

- **2026-04-26** — M2 Design-System: shadcn (Radix-Nova) initialisiert, Header/Footer/LanguageSwitcher/MobileNav, Animation-Primitives (FadeInOnScroll, RevealText, ParallaxImage), Tokens ausgebaut, Hero-Page integriert (siehe [[CHANGELOG]])
- **2026-04-25** — M1 Setup & Infra: Next.js 16 Bootstrap, next-intl-Routing, Vault-Struktur, Initial-Push zu GitHub

---

## 📋 Was Claude beim nächsten Mal tun soll

**Default-Nächster-Schritt: M3 — Statische Seiten DE**

Reihenfolge:
1. Routen-Stubs anlegen (Server-Component-Page-Files) für alle statischen Routen aus `lib/i18n/routing.ts`:
   - `/ansprechpersonen`, `/projekt`, `/projekt/technische-standards`, `/projekt/semantische-standards`
   - `/beteiligung`, `/beteiligung/anwendungsbeispiele`, `/beteiligung/mitwirkung`
   - `/impressum`, `/datenschutz`
2. `src/content/{de,en}/team.json` mit den 4 Ansprechpersonen aus `INHALTE.md` (Sina, Peter, Claudia, Madeleine) + Portrait-Pfade `public/team/*.jpg`
3. `<ContactCard>`, `<TeamGrid>` als Sections-Components
4. Comic-Strip-Section auf Landing als Server-Component-Skeleton (Animation kommt in M6)
5. Inhalts-Texte aus `INHALTE.md` einpflegen — DE primär, EN-Stubs (M7 finalisiert)
6. `<FadeInOnScroll>`/`<RevealText>` an passenden Stellen einsetzen
7. **Akzentfarbe entscheiden** — Slot `--accent-brand` in `src/styles/tokens.css` ist vorbereitet
8. Bilder & Logos vom User anfragen (Portraits Sophie Moriarty, Partner-Logos für Footer)

**Verifikation am Ende von M3:**
- Alle Routen aus `routing.ts` rendern (kein 404 mehr)
- LanguageSwitcher funktioniert auf jeder Route mit Slug-Mapping
- `pnpm build` SSG-clean für alle Seiten × beide Locales

**Falls User andere Prioritäten setzt:**
- Vercel-Deployment vorziehen (jetzt sinnvoll möglich, Site rendert sauber)
- Supabase-Projekt anlegen lassen → M4 vorbereiten

---

## Bekannte offene Fragen für M3+

- **Akzentfarbe:** noch nicht definiert. CSS-Slot `--accent-brand` zeigt initial auf foreground.
- **Comic-Strip auf Landing:** pinned horizontal scroll (mehr Wow) vs. vertical stagger (mobile-friendlich)? Entscheidung in M6.
- **Reference-Site sniffen:** Sobald https://smarte-theaterdienste.de/de wieder up ist, kurz screenshotten und in `INHALTE.md` ablegen.
- **Echte Asset-Lieferung:** Portrait-Fotos (© Sophie Moriarty), Partner-Logos als SVG.

## Bekannte Tooling-Lücken (siehe [[PROBLEME]])

- `gh` CLI fehlt — GitHub-Repo wurde manuell vom User erstellt
- `supabase` CLI nicht global (npm-Postinstall verbietet es) — wird in M4 als dev-dep installiert
- Homebrew nicht installiert
