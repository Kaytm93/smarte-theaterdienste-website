# 📊 Dashboard — Smarte Theaterdienste

> Letzte Aktualisierung: 2026-07-07 (Session 39 — FAQ-Redesign: statische Inhalte + animiertes Accordion mit Suche)
> Vollständige Session-Historie: [[CHANGELOG]] · Detail-Logs: [[verlauf/INDEX]]

## Status (Kurzüberblick)

| Bereich | Stand |
|---|---|
| Meilensteine **M1–M17** | ✅ abgeschlossen — Setup, Design-System, statische Seiten, Supabase-Content, Partner-Karte, Animation, EN-i18n, SEO/PWA/Lighthouse, Original-Site-Transfer, Editorial→CI-Refresh, Unterseiten-Redesign |
| **M18 Welle 3** | 🟡 P1 + P2(3a/3b) + P3 erledigt — Welle 1+2 production-live. **Offen:** Team-Bühnenfotos (P1), Legal-Texte + Event-Foto-Assets + 3c Comic-Strip (P2, Auftraggeber), Custom-Domain (Infra) |
| **Production** | ✅ live auf `https://smarte-theaterdienste-website.vercel.app`. Auto-Deploy bei Push funktioniert wieder seit [[ENTSCHEIDUNGEN#ADR-58]] (vorher 4× Canceled, Root-Cause `requireVerifiedCommits`). CLI-Deploy bleibt als Fallback. |
| **Custom-Domain** | ⚠️ `smarte-theaterdienste.de` zeigt weiter die **alte Hetzner-Seite** (HTTP 200, aber nicht unser Build); DNS-Switch offen → siehe [[PROBLEME]] + [[GO_LIVE_CHECKLIST]] |
| **Lighthouse (Production, DE+EN)** | A11y **100** · SEO **100** · Best Practices **96** (ein YouTube-Third-Party-Cookie) · Performance **~91–94** warm |
| **Supabase** | 🔴 **Projekt `hyirpaloozcautcxhbqk` existiert nicht mehr** (DNS NXDOMAIN, Session 39) → PartnerMap, Timeline-Events und Blog ohne Daten (graceful degradiert). FAQ ist seit [[ENTSCHEIDUNGEN#ADR-64]] statisch und immun. User-Entscheidung nötig: neues Projekt + Migrationen, oder Rest auch statisch. Siehe [[PROBLEME]]. |

## Was zuletzt lief

**Session 39 (2026-07-07) — FAQ-Redesign: statische Inhalte + animiertes Accordion mit Suche (`fcaf4b8`).** Auftrag: FAQ der alten Website visuell ansprechend mit Animationen, im Site-Design + `website-design-ultra`-Regeln. Beim Start zwei kritische Befunde: (1) **Supabase-Projekt weg** (NXDOMAIN) — Production-FAQ zeigte nur den Empty-State; (2) Git-Index korrupt (stale `index.lock` vom 22.06.) — non-destruktiv repariert. Lösung (User-Entscheidung): 21 M11-FAQs als `src/content/{de,en}/faq.json` (voll SSG, [[ENTSCHEIDUNGEN#ADR-64]]), `FaqAccordion` komplett neu — GSAP-Scroll-Entrance (80-ms-Stagger), CSS-Höhenanimation + Content-Reveal, Plus→X-Rotation, Sticky-Nav mit Scroll-Spy, **Live-Suche** mit animiertem Filtern + Kein-Treffer-State, FAQPage-JSON-LD, Halbgeviertstrich-Typo gefixt. Verifiziert: typecheck/lint/build clean (31/31 SSG), Production-HTML DE+EN je 21 Fragen/JSON-LD. **Achtung:** Interaktions-Check im Browser entfiel (Kernel-Panic während der Session, siehe [[PROBLEME]]) — nach Deploy einmal live prüfen. Details: [[CHANGELOG#2026-07-07 — Session 39: FAQ-Redesign — statische Inhalte, animiertes Accordion + Suche]].

**Session 38 (2026-06-19) — Spielplan-Reise Orbit-Polish (`de33eb5`).** User-Feedback zur nativen Reise: der pulsierende Kern mit Sternen sollte im Zentrum stehen statt oben links, die Darstellung war zu dunkel/zu schwer erkennbar, Animationen sollten sorgfältiger wirken. `SpielplanReise` poliert: zentrierter Orbit-Core im Tabpanel, hellere Stage-Fläche, stärkere Lesbarkeit, acht Sternpunkte, drehender Orbit, pulsierender Core/Glow, GSAP-Cleanup via `revertOnUpdate`, bessere Focus-/Active-/Disabled-States. Verifiziert: `pnpm typecheck`, `pnpm lint`, `pnpm build`, Playwright Desktop + Mobile, Mobile `docOverflowPx 0`, Core-vs-Panel-Mitte `deltaPx 0`, 0 Console-Errors/-Warnings. Details: [[CHANGELOG#2026-06-19 — Session 38: Spielplan-Reise Orbit-Polish]].

**Session 37 (2026-06-19) — Native interaktive „Spielplan-Reise" + Partnerkarte neu (`PENDING`).** Zwei User-Aufträge. (1) Das **Genially-Embed** der „Interaktiven Reise durch die Spielplanverbreitung" (`/konzeption`) zeigte nur einen generischen Lade-Spinner → ersetzt durch die selbstgebaute, animierte `SpielplanReise` (Client+GSAP): 5-Stationen-Stepper mit Icon-Knoten, animierter Fortschrittslinie, Bühnen-Card + Format-Chips, Prev/Next, voll tastatur-/ARIA-/reduced-motion-tauglich. (2) Die **Partnerkarte** (`/jetzt-mitmachen/mitwirkung`) war eine ausgewaschene Hochformat-Rasterkarte mit 4 blassen Punkten → neu aufgebaut: CI-Graustufenkarte, kräftige **nummerierte** animierte Marker, nummerierte klickbare Liste, Netzwerk-Hinweis „Über 140 Institutionen" + CTA zur Startseiten-DACH-Karte. Vorab `node_modules`-Korruption (kaputte JSON-Dateien) per `rm -rf node_modules && pnpm install` repariert. Build 35/35 SSG clean, DE+EN + Mobile verifiziert. Details: [[CHANGELOG#2026-06-19 — Session 37: Native interaktive „Spielplan-Reise" statt Genially-Embed + Partnerkarte neu aufgebaut]] · [[ENTSCHEIDUNGEN#ADR-62]] · [[ENTSCHEIDUNGEN#ADR-63]].

**Session 36 (2026-06-11) — „Use Case 3" aus Hero-Bildunterschrift entfernt (`c6f7a5d`).** Die figcaption unter dem Hero-Theaterbild der Startseite lautete „Use Case 3 · Datenraum Kultur" (DE) / „Use Case 3 · Cultural Data Space" (EN). Auf Userwunsch + Rückfrage nur den „Use Case 3 · "-Präfix entfernt → „Datenraum Kultur" / „Cultural Data Space" bleibt. Die 4 anderen „Use Case 3"-Fundstellen (Meta-Description, OG-Image, Pitch-Fließtext) bewusst unberührt. Preview-verifiziert, 0 Console-Errors. Details: [[CHANGELOG#2026-06-11 — Session 36: „Use Case 3" aus Hero-Bildunterschrift der Startseite entfernt]].

**Session 35 (2026-06-10) — Vault-Aufräumen (kein Code-Change).** Token-Diät der Session-Start-Dateien: DASHBOARD 161→45 Z., PROBLEME 119→73 Z., KONTEXT-Recap-Absatz weg; stale Routing-Map (INHALTE), Dateibaum (`ansprechpersonen`→`team`, gelöschte blog/termine-Pages) und INDEX korrigiert. Vollhistorie liegt unverändert in [[CHANGELOG]] + `verlauf/`. Details: [[CHANGELOG#2026-06-10 — Session 35: Vault-Aufräumen (Token-Diät + Stale-Fixes)]].

**Session 34 (2026-06-10) — Design-Audit + Production-Polish + Deploy (`6a8db83`).** Audit über 13 Routen (DE + EN-Stichproben) auf 375/673/1280 px gegen die `Anmerkungen Entwurf 14.5.2026.md` (alle 14 Punkte umgesetzt ✓), Overflow überall 0, Grid-Spalten exakt vermessen. Fünf Fixes: (1) 🔴 i18n-Karten-figcaption war hartkodiert deutsch → `mapCaption`-Prop aus `landing.json`; (2) 🟡 Hero-Dreifach-Nennung Bühnenverein + verwaister Mobile-Trenner → Text-Kicker raus ([[ENTSCHEIDUNGEN#ADR-61]]); (3) 🟡 Logo-Console-Warning strukturell (intrinsische Maße, `priority`→`preload`); (4) 🟡 „DRK"-Wording raus (Anmerkungen-Compliance); (5) 🟢 Footer `© 2026 Deutscher Bühnenverein`. Build 35/35 SSG clean. Deploy via Auto-Deploy.

→ Alle früheren Sessions stehen in [[CHANGELOG]]; tiefe Logs in [[verlauf/INDEX]].

---

## 📋 Nächste Schritte für Claude

Vollständiger Plan mit Akzeptanzkriterien: [[ROADMAP#🗺️ M18 — Welle 3 + Go-Live (Plan, Stand 2026-05-24)]]. Priorisiert:

**🔴 P1 — Go-Live-kritisch**
0. **Supabase-Entscheidung (NEU, Session 39):** Projekt `hyirpaloozcautcxhbqk` existiert nicht mehr → PartnerMap/Timeline/Blog ohne Daten. Entweder neues Supabase-Projekt anlegen (Migrationen liegen komplett in `supabase/migrations/`, danach `.env.local` + Vercel-Envs umstellen) **oder** Partner/Events wie das FAQ auf statischen Content umstellen ([[ENTSCHEIDUNGEN#ADR-64]] als Blaupause). Blockiert auch #3 (Event-Fotos) und #8 (Partner-URLs). Siehe [[PROBLEME]].
1. **Team-Bühnen-Hover vervollständigen.** 4 Sanity-Bühnenfoto-URLs beschaffen → je Member in `src/content/{de,en}/team.json` als `"stage": "https://cdn.sanity.io/images/lc7slax2/production/…"`. Der `ContactCard`-Cross-Fade (Portrait→Bühne) ist fertig; bis dahin Zoom-Fallback.

**🟡 P2 — Inhalt & Recht (warten auf Auftraggeber-Lieferung)**
2. **Finale Impressum-/Datenschutz-Texte** vom Bühnenverein → ersetzen die TODO-Marker (`legal.json`, [[ENTSCHEIDUNGEN#ADR-25]]).
3. **Event-Fotos für die Timeline.** Plumbing fertig ([[ENTSCHEIDUNGEN#ADR-59]]). Offen: (a) Migration `20260607120000_event_image_url.sql` pushen — braucht das **DB-Passwort** (nicht in `.env.local`); (b) Foto-URLs je Event in `events.image_url` (Host muss in `next.config.ts → images.remotePatterns`; `*.supabase.co` + Sanity sind erlaubt).
4. **3c Comic-Strip erweitern (optional).** 3 weitere Max-Kersting-Frames aus `STD-Design-Praesentation` S.5, falls der Bühnenverein die Original-Assets liefert.

**🟢 P3 — Polish (nice-to-have)**
5. **Startseiten-Performance-Re-Audit** nach dem nächsten Deploy — die Startseite trägt jetzt **zwei** lazy iframes (YouTube-`VideoEmbed` + MyMaps, beide unter dem Fold, [[ENTSCHEIDUNGEN#ADR-60]]); bestätigen, dass das Maps-iframe den LCP nicht antastet.
6. ~~FAQ-Typografie~~ ✅ in Session 39 beim JSON-Export gefixt ([[ENTSCHEIDUNGEN#ADR-64]]).
7. **FAQ-Interaktionen live gegenchecken** (Accordion-Motion, Scroll-Spy, Suche, Mobile 375 px) — der Browser-Check entfiel in Session 39 wegen des Kernel-Panics ([[PROBLEME]]).

**⚪ Infra (langstehend)**
7. **Custom-Domain** `smarte-theaterdienste.de` auf Vercel umstellen (DNS A/CNAME) — erst danach ist die echte Domain auf unserem Build. [[GO_LIVE_CHECKLIST]] + [[PROBLEME]].
8. **Partner-`website_url`/`logo_url` in Supabase** nachpflegen (aktuell nur Geo-Coords) — sonst fehlt der „Zur Website"-Link auf der `PartnerMap`.

> Offene Tooling-Lücken (`gh`/Homebrew fehlen, `curl` nur unter `/usr/bin/`, axe-`color-contrast`-False-Positives) stehen in [[PROBLEME]]. Offene Produktfragen (CMS-Frontend, Newsletter, Analytics) ebenfalls dort bzw. in [[ENTSCHEIDUNGEN#Zukunftige offene ADRs]].
