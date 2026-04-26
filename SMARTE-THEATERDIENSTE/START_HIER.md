# SMARTE THEATERDIENSTE — Projektzentrale

> Lies diese Datei zuerst. Sie zeigt dir, wo alles ist.

## Navigation

| Datei                | Für wen   | Zweck                                                     |
| -------------------- | --------- | --------------------------------------------------------- |
| [[DASHBOARD]]        | 👤 Nutzer | Projektstatus, was läuft, was als nächstes                |
| [[KONTEXT]]          | 🤖 Claude | Vollständiger technischer Stand, Architekturregeln        |
| [[PROBLEME]]         | 👥 Beide  | Offene Bugs, Einschränkungen, TODOs                       |
| [[ROADMAP]]          | 👤 Nutzer | Milestones M1–M8, Prioritäten                             |
| [[MUSTER]]           | 🤖 Claude | Code-Patterns die immer korrekt sein müssen (Next.js 16!) |
| [[ENTSCHEIDUNGEN]]   | 👥 Beide  | Warum wurde was so gebaut (ADRs)                          |
| [[CHANGELOG]]        | 👥 Beide  | Was wurde wann gemacht                                    |
| [[INHALTE]]          | 👥 Beide  | Vollständige Inhalts­struktur aus dem Miro-Board          |
| [[API]]              | 🤖 Claude | Supabase-Schema, Server Actions, Endpoints (ab M4)        |

## Schnellzugriff
- [[PROBLEME#🔴 Offen|🔴 Offene Bugs]]
- [[DASHBOARD#📋 Was Claude beim nächsten Mal tun soll|📋 Aufgaben für Claude]]
- [[ROADMAP|💡 Milestones M1–M8]]
- [[INHALTE|📄 Inhalte & Tonality]]
- [[KONTEXT#Wichtigste Dateipfade|📁 Dateipfade]]

---

## 🤖 Anweisung für Claude Code — JEDE SESSION

**Am Anfang jeder Session — bevor du Code anfasst:**
1. Lies `SMARTE-THEATERDIENSTE/KONTEXT.md` vollständig
2. Lies `SMARTE-THEATERDIENSTE/DASHBOARD.md` — besonders „Was Claude beim nächsten Mal tun soll"
3. Lies `SMARTE-THEATERDIENSTE/PROBLEME.md`
4. Lies `SMARTE-THEATERDIENSTE/MUSTER.md` — Next.js 16 hat Breaking Changes!
5. Bei inhaltlicher Arbeit zusätzlich `SMARTE-THEATERDIENSTE/INHALTE.md`

**Am Ende jeder Session — automatisch, ohne explizite Aufforderung:**
1. `DASHBOARD.md` → Projektstatus + „Was gerade läuft" + „Nächste Schritte" aktualisieren
2. `KONTEXT.md` → Dateistatus updaten, falls Strukturänderungen
3. `PROBLEME.md` → Gelöste Bugs abhaken ✅, neue Bugs eintragen
4. `CHANGELOG.md` → Neuen Eintrag mit Datum und Tätigkeiten hinzufügen
5. `ENTSCHEIDUNGEN.md` → Neue Architekturentscheidungen ergänzen
6. Bei größeren Änderungen (≥ 3 Dateien geändert oder grundlegendes Problem gelöst): `verlauf/SESSION_YYYY-MM-DD.md` anlegen
7. **Commit & Push** — siehe `KONTEXT.md → Pflicht-Regel`

---

## Wichtigste Dateipfade (Stand: M1)

```
src/
├── app/[locale]/        → Lokalisierte Routen (DE/EN)
│   ├── layout.tsx       → NextIntlClientProvider, html/body, Fonts
│   └── page.tsx         → Landing (Hero-Skeleton)
├── components/          → ui/, layout/, sections/, animations/, forms/
│                          (alle leer, befüllen ab M2/M3)
├── lib/
│   ├── i18n/            → routing.ts, request.ts, navigation.ts
│   ├── supabase/        → Stub – aktiv ab M4
│   └── gsap/            → registerScrollTrigger.ts
├── messages/            → de.json, en.json (UI-Strings)
├── content/{de,en}/     → Statische Inhalte (MDX/JSON, M3)
├── styles/tokens.css    → Design-Tokens
└── proxy.ts             → next-intl Routing (Next.js 16: heißt PROXY, nicht middleware!)

supabase/migrations/     → DB-Schema (ab M4)
SMARTE-THEATERDIENSTE/   → Dieser Vault
```
