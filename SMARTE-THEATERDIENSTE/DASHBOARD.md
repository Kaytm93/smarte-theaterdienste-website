# 📊 Dashboard — Smarte Theaterdienste

> Letzte Aktualisierung: 2026-06-10 (Session 35 — Vault-Aufräumen)
> Vollständige Session-Historie: [[CHANGELOG]] · Detail-Logs: [[verlauf/INDEX]]

## Status (Kurzüberblick)

| Bereich | Stand |
|---|---|
| Meilensteine **M1–M17** | ✅ abgeschlossen — Setup, Design-System, statische Seiten, Supabase-Content, Partner-Karte, Animation, EN-i18n, SEO/PWA/Lighthouse, Original-Site-Transfer, Editorial→CI-Refresh, Unterseiten-Redesign |
| **M18 Welle 3** | 🟡 P1 + P2(3a/3b) + P3 erledigt — Welle 1+2 production-live. **Offen:** Team-Bühnenfotos (P1), Legal-Texte + Event-Foto-Assets + 3c Comic-Strip (P2, Auftraggeber), Custom-Domain (Infra) |
| **Production** | ✅ live auf `https://smarte-theaterdienste-website.vercel.app`. Auto-Deploy bei Push funktioniert wieder seit [[ENTSCHEIDUNGEN#ADR-58]] (vorher 4× Canceled, Root-Cause `requireVerifiedCommits`). CLI-Deploy bleibt als Fallback. |
| **Custom-Domain** | ⚠️ `smarte-theaterdienste.de` zeigt weiter die **alte Hetzner-Seite** (HTTP 200, aber nicht unser Build); DNS-Switch offen → siehe [[PROBLEME]] + [[GO_LIVE_CHECKLIST]] |
| **Lighthouse (Production, DE+EN)** | A11y **100** · SEO **100** · Best Practices **96** (ein YouTube-Third-Party-Cookie) · Performance **~91–94** warm |
| **Supabase** | Cloud `hyirpaloozcautcxhbqk` (EU-Frankfurt) live; Revalidate via `pg_net`-Trigger auf 6 Tabellen. DB-Passwort liegt **nicht** in `.env.local` → blockiert Event-Foto-Migration + FAQ-Typo-Fix. |

## Was zuletzt lief

**Session 35 (2026-06-10) — Vault-Aufräumen (kein Code-Change).** Token-Diät der Session-Start-Dateien: DASHBOARD 161→45 Z., PROBLEME 119→73 Z., KONTEXT-Recap-Absatz weg; stale Routing-Map (INHALTE), Dateibaum (`ansprechpersonen`→`team`, gelöschte blog/termine-Pages) und INDEX korrigiert. Vollhistorie liegt unverändert in [[CHANGELOG]] + `verlauf/`. Details: [[CHANGELOG#2026-06-10 — Session 35: Vault-Aufräumen (Token-Diät + Stale-Fixes)]].

**Session 34 (2026-06-10) — Design-Audit + Production-Polish + Deploy (`6a8db83`).** Audit über 13 Routen (DE + EN-Stichproben) auf 375/673/1280 px gegen die `Anmerkungen Entwurf 14.5.2026.md` (alle 14 Punkte umgesetzt ✓), Overflow überall 0, Grid-Spalten exakt vermessen. Fünf Fixes: (1) 🔴 i18n-Karten-figcaption war hartkodiert deutsch → `mapCaption`-Prop aus `landing.json`; (2) 🟡 Hero-Dreifach-Nennung Bühnenverein + verwaister Mobile-Trenner → Text-Kicker raus ([[ENTSCHEIDUNGEN#ADR-61]]); (3) 🟡 Logo-Console-Warning strukturell (intrinsische Maße, `priority`→`preload`); (4) 🟡 „DRK"-Wording raus (Anmerkungen-Compliance); (5) 🟢 Footer `© 2026 Deutscher Bühnenverein`. Build 35/35 SSG clean. Deploy via Auto-Deploy.

→ Alle früheren Sessions stehen in [[CHANGELOG]]; tiefe Logs in [[verlauf/INDEX]].

---

## 📋 Nächste Schritte für Claude

Vollständiger Plan mit Akzeptanzkriterien: [[ROADMAP#🗺️ M18 — Welle 3 + Go-Live (Plan, Stand 2026-05-24)]]. Priorisiert:

**🔴 P1 — Go-Live-kritisch**
1. **Team-Bühnen-Hover vervollständigen.** 4 Sanity-Bühnenfoto-URLs beschaffen → je Member in `src/content/{de,en}/team.json` als `"stage": "https://cdn.sanity.io/images/lc7slax2/production/…"`. Der `ContactCard`-Cross-Fade (Portrait→Bühne) ist fertig; bis dahin Zoom-Fallback.

**🟡 P2 — Inhalt & Recht (warten auf Auftraggeber-Lieferung)**
2. **Finale Impressum-/Datenschutz-Texte** vom Bühnenverein → ersetzen die TODO-Marker (`legal.json`, [[ENTSCHEIDUNGEN#ADR-25]]).
3. **Event-Fotos für die Timeline.** Plumbing fertig ([[ENTSCHEIDUNGEN#ADR-59]]). Offen: (a) Migration `20260607120000_event_image_url.sql` pushen — braucht das **DB-Passwort** (nicht in `.env.local`); (b) Foto-URLs je Event in `events.image_url` (Host muss in `next.config.ts → images.remotePatterns`; `*.supabase.co` + Sanity sind erlaubt).
4. **3c Comic-Strip erweitern (optional).** 3 weitere Max-Kersting-Frames aus `STD-Design-Praesentation` S.5, falls der Bühnenverein die Original-Assets liefert.

**🟢 P3 — Polish (nice-to-have)**
5. **Startseiten-Performance-Re-Audit** nach dem nächsten Deploy — die Startseite trägt jetzt **zwei** lazy iframes (YouTube-`VideoEmbed` + MyMaps, beide unter dem Fold, [[ENTSCHEIDUNGEN#ADR-60]]); bestätigen, dass das Maps-iframe den LCP nicht antastet.
6. **FAQ-Typografie** — eine Cloud-DB-FAQ nutzt Bindestrich statt Halbgeviertstrich; beim nächsten DB-Zugriff mitfixen (DB-Passwort-Gate, gleiche Schranke wie #3). Siehe [[PROBLEME]].

**⚪ Infra (langstehend)**
7. **Custom-Domain** `smarte-theaterdienste.de` auf Vercel umstellen (DNS A/CNAME) — erst danach ist die echte Domain auf unserem Build. [[GO_LIVE_CHECKLIST]] + [[PROBLEME]].
8. **Partner-`website_url`/`logo_url` in Supabase** nachpflegen (aktuell nur Geo-Coords) — sonst fehlt der „Zur Website"-Link auf der `PartnerMap`.

> Offene Tooling-Lücken (`gh`/Homebrew fehlen, `curl` nur unter `/usr/bin/`, axe-`color-contrast`-False-Positives) stehen in [[PROBLEME]]. Offene Produktfragen (CMS-Frontend, Newsletter, Analytics) ebenfalls dort bzw. in [[ENTSCHEIDUNGEN#Zukunftige offene ADRs]].
