# 📚 Verlauf — Session-Index

> Detailliertes Session-Log mit Befunden, Verifikationen, Commits und Deploys.
> Kurzform pro Session steht im [[../CHANGELOG]].
>
> **Naming-Konvention:** `SESSION_YYYY-MM-DD[_<milestone-kurzbeschreibung>].md`

---

## Sessions chronologisch (neueste oben)

| Datum       | Milestone / Thema                             | Datei                                                              |
| ----------- | --------------------------------------------- | ------------------------------------------------------------------ |
| 2026-08-06  | Session 40 — Sanity-CMS-Plan (M19)            | [[SESSION_2026-08-06]]                                             |
| 2026-07-07  | Session 39 — FAQ statisch + Accordion + Suche | [[SESSION_2026-07-07]]                                             |
| 2026-06-19  | Session 38 — Spielplan-Reise Orbit-Polish     | [[SESSION_2026-06-19_Session-38-Reise-Polish]]                    |
| 2026-06-19  | Session 37 — Native Reise + Partnerkarte neu  | [[SESSION_2026-06-19]]                                             |
| 2026-06-10  | Session 34 — Design-Audit + Production-Polish | [[SESSION_2026-06-10]]                                             |
| 2026-06-08  | Session 33 — Interaktive Karte auf Startseite | [[SESSION_2026-06-08]]                                             |
| 2026-06-07  | Session 32 — Production-Audit + Event-Plumbing| [[SESSION_2026-06-07]]                                             |
| 2026-06-05  | Session 31 — M18 W3 P2: Datenfluss + Wortwitz | [[SESSION_2026-06-05]]                                             |
| 2026-06-04  | Session 30 — M18 W3 P1+P3: Cleanup + Deploy   | [[SESSION_2026-06-04]]                                             |
| 2026-05-24  | M17 Welle 2 — Unterseiten nach Feedback       | [[SESSION_2026-05-24]]                                             |
| 2026-05-19  | M17 Welle 1 — CI + Nav + Landing              | [[SESSION_2026-05-19]]                                             |
| 2026-05-15  | M16 Editorial-Visual-Polish                   | [[SESSION_2026-05-15_M16-Editorial-Visual-Polish]]                 |
| 2026-05-11  | M15 Production-Deploy                         | [[SESSION_2026-05-11_M15-Production-Deploy]]                       |
| 2026-05-11  | M15 Visual-QA-Polish                          | [[SESSION_2026-05-11_M15-Visual-QA-Polish]]                        |
| 2026-05-11  | Session 24 Editorial-QA-Polish                | [[SESSION_2026-05-11_session-24]]                                  |
| 2026-05-11  | M14 Editorial-Redesign                        | [[SESSION_2026-05-11_M14-Editorial-Redesign]]                      |
| 2026-05-11  | Codex-Plugin Website Design Ultra             | [[SESSION_2026-05-11]]                                             |
| 2026-05-08  | M13 Miro-QA + Deutschlandkarte                | [[SESSION_2026-05-08_M13-Miro-Map-QA]]                             |
| 2026-05-08  | M12 Website-QA + UX-Polish                    | [[SESSION_2026-05-08]]                                             |
| 2026-05-07  | M11 Original-Site-Transfer                    | [[SESSION_2026-05-07_M11-Original-Site-Transfer]]                  |
| 2026-05-07  | M10 Design-Refresh + Asset-Einarbeitung       | [[SESSION_2026-05-07]]                                             |
| 2026-05-07  | M9 PWA + Per-Post-OG + Lighthouse-CI          | [[SESSION_2026-05-07_M9-PWA-OG-Lighthouse]]                        |
| 2026-05-07  | M9 Go-Live-Handoff (GO_LIVE_CHECKLIST.md)     | [[SESSION_2026-05-07_M9-Go-Live-Handoff]]                          |
| 2026-05-07  | M8 Sitemap-Lastmod-Polish                     | [[SESSION_2026-05-07_M8-Sitemap-Lastmod]]                          |
| 2026-05-07  | M7 EN-Quality-Review                          | [[SESSION_2026-05-07_M7-EN-Quality-Review]]                        |
| 2026-05-07  | M6 Production-Validation                      | [[SESSION_2026-05-07_M6-Production-Validation]]                    |
| 2026-05-06  | M8 Production-Validation (Lighthouse-Final)   | [[SESSION_2026-05-06_M8-Production-Validation]]                    |
| 2026-05-06  | M8 SEO-Layer komplett                         | [[SESSION_2026-05-06]]                                             |
| 2026-05-01  | M5 Partner-Karte                              | [[SESSION_2026-05-01]]                                             |
| 2026-04-30  | M4 Cloud-Finalisierung + Vercel-Deploy        | [[SESSION_2026-04-30]]                                             |
| 2026-04-26  | M3 Statische Seiten DE                        | [[SESSION_2026-04-26b]]                                            |
| 2026-04-26  | M2 Design-System                              | [[SESSION_2026-04-26]]                                             |
| 2026-04-25  | M1 Setup & Infra                              | [[SESSION_2026-04-25]]                                             |

---

## Wann wird ein Verlauf-File angelegt?

Pro CLAUDE.md Pflichtregel: Wenn ≥ 3 Dateien geändert wurden oder ein grundlegendes Problem gelöst wurde, ein eigenes File `SESSION_YYYY-MM-DD_<milestone>.md` mit:

- **Anlass** (was wollte der User)
- **Vorgehen** (welche Vault-/Doku-Quellen, welche Entscheidungen)
- **Geänderte Bereiche** (Dateipfade)
- **Verifikation** (typecheck, lint, build, Playwright, Production-Smoke)
- **Commit / Deploy** (SHAs + Deploy-IDs)
- **Ergebnis** (Status nach der Session)
