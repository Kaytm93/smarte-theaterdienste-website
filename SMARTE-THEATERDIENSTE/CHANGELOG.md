# 📝 Changelog

## 2026-08-06 — Session 41: M19 Phase 0 + eigenständiges Sanity-Studio-Grundgerüst

**Commit-SHA (Implementierung):** `PENDING`

**Auftrag:** Projekt-Vault und inhaltliche/API-Dokumentation lesen und mit der Umsetzung des dokumentierten [[SANITY_CMS_PLAN]] beginnen.

**Phase 0 — Inventur und Zugriffsaudit:** Alle 47 lokalen Quellfiles einschließlich `src/lib/i18n/routing.ts` wurden in `migration/reports/phase-0-inventory.json` mit JSON-Schema, Zielzuordnung, Sollzahlen und Qualitätsrisiken erfasst. Der schreibfreie Checker unter `studio/scripts/check-source-inventory.mjs` verifiziert 12 strukturgleiche DE/EN-Paare, stabile Schlüssel, Routing-Locales/Basissprache, 4 Personen, 4 FAQ-Kategorien/21 Einträge, 6 Events, 4 Partner, 3 Posts, 2 Locale-Dokumente und damit 55 erwartete Erstimport-Dokumente. Die historische SQL-Kette wird als Snapshot behandelt, weil M7 Übersetzungen vor den Seed-Posts referenziert. Das alte `lc7slax2/production` ist anonym lesbar (88 Inhaltsdokumente + 72 Bild-Assets), aber mit dem vorhandenen Account nicht verwaltbar und daher nur Importquelle. Keine externen Daten wurden geschrieben.

**Phase 1 — Studio-Fundament:** Neues eigenständiges `studio/` mit Sanity `5.31.1`, Structure Tool, Vision, Internationalized Arrays, statischem DE/EN-Setup und eigener pnpm-/TypeScript-/ESLint-Grenze. Implementiert sind 11 geschützte Singletons, die Sammlungen Person/FAQ/Event/Partner/Post/Locale, fünf gemeinsame Objekttypen, DE-Pflicht-/EN-Warnvalidierung, redaktionell gruppierte Navigation und TypeGen nach `src/types/sanity.types.ts`. Singleton-Templates sowie Delete/Duplicate/Unpublish sind im Studio unterbunden; normale Dokumente behalten generierte IDs und optionale `sourceKey`-/`legacyId`-Felder. Root-Skripte `cms:{dev,validate,typegen,migrate,verify}`, separate CI-Gates sowie Root-/Vercel-Ausschlüsse halten Website und Studio getrennt.

**Runtime-Entscheidung:** [[ENTSCHEIDUNGEN#ADR-66]] — Sanity 5.31.1 bleibt für Node 20 exakt gepinnt und Studio-Auto-Updates sind aus. Das Node-22-/Sanity-6-Upgrade folgt kontrolliert als eigener Tooling-Schritt.

**Verifikation:** `pnpm --dir studio install --frozen-lockfile`, Studio-Typecheck/Lint/Schema-Validation/Build, zweimal deterministisches TypeGen, `pnpm cms:migrate`, `pnpm cms:verify`, Root-Typecheck/Lint/Build (**31/31 SSG**) und `git diff --check` grün. Die Migrationsbefehle melden ausdrücklich, dass Phase 0/1 weder Content-Lake-Writes noch Sanity-Readback ausführt.

**Offen:** Sanity-Zielprojekt/Account, Dataset-Sichtbarkeit, Studio-Hostname, Editor:innen/Rollen und Vercel-Zugriff; danach vollständige fachliche Phase-2-Seitenfelder, echte idempotente Schreibmigration und Readback.

## 2026-08-06 — Session 40: Sanity-CMS-Zielarchitektur und M19-Umsetzungsplan

**Commit-SHA (Doku):** `cd1e27b`

**Auftrag:** Bestehenden Smarte-Theaterdienste-Vault lesen, das Sanity-Setup der `sina-schmidt-website` inklusive ihres Obsidian-Vaults analysieren, geeignete Umsetzungsschritte ableiten und den Plan im Projekt-Vault dokumentieren.

**Analyse:** Gelesen wurden die Pflichtdateien des Smarte-Theaterdienste-Vaults (`START_HIER`, `KONTEXT`, `DASHBOARD`, `PROBLEME`, `MUSTER`, `INHALTE`, `API`), die Sina-CMS-ADRs 20–25 und Sessions S33–S41 sowie das reale Standalone-Studio, Schema, GROQ-/Mapper-/Loader-Setup und die Migrations-/Deploy-Kette. Zusätzlich wurden die Sanity-Best-Practices zu Next.js, Schema, TypeGen und Lokalisierung herangezogen.

**Ergebnis:** Neuer [[SANITY_CMS_PLAN]] für M19 mit Zielarchitektur, Inhaltsmatrix, neun Umsetzungsphasen, Akzeptanzkriterien, Rollback und Definition of Done. Bewährtes Sina-Muster: eigenständiges Studio, geschützte Singletons, gemeinsame DE/EN-Pflege, JSON-Fallback, Sanity-Assets und Publish→Vercel. Verbesserungen für dieses Projekt: offizielles Internationalized-Array-Pattern, `defineQuery` + TypeGen als Pflicht-Gate, Sanity-generierte IDs für normale Dokumente und klare Import-/Readback-Gates.

**Entscheidung:** [[ENTSCHEIDUNGEN#ADR-65]] — Sanity wird das zentrale Redaktions-CMS. Das verschwundene Supabase-Projekt wird nicht neu aufgebaut; SQL-Migrationen/Seed dienen als Importquelle, Runtime-Code/Envs werden erst nach vollständiger Sanity-Parität entfernt.

**Vault-Integration:** `START_HIER`, `ROADMAP` (M19), `DASHBOARD`, `KONTEXT`, `PROBLEME`, `API`, `ENTSCHEIDUNGEN`, `CHANGELOG` und Verlauf aktualisiert. Kein Website-Code, keine Dependencies und keine externen Sanity-/Vercel-Einstellungen wurden in dieser Planungssession geändert.

**Verifikation:** Markdown-Link-/Strukturprüfung, `git diff --check`, expliziter Git-Status nur für projektrelevante Vault-Dateien; danach Commit/Push und verifizierter Obsidian-Sync gemäß Projektpflicht.

## 2026-07-07 — Session 39: FAQ-Redesign — statische Inhalte, animiertes Accordion + Suche

**Commit-SHA (Code):** `fcaf4b8`

**Auftrag:** Die FAQ-Inhalte der alten Website (smarte-theaterdienste.de/de/faq) visuell ansprechend mit Animationen präsentieren, im Design der neuen Site und nach den `website-design-ultra`-Plugin-Regeln.

**Kritischer Befund beim Start:** Das Supabase-Projekt `hyirpaloozcautcxhbqk` **existiert nicht mehr** (DNS NXDOMAIN, per curl/nslookup verifiziert) — die Production-FAQ zeigte auf DE **und** EN nur den „In Vorbereitung"-Fallback. Betrifft auch PartnerMap, Timeline-Events und Blog (degradieren graceful, bleiben aber leer). Details + Handlungsoptionen in [[PROBLEME]]. Zweiter Befund: Der lokale Git-Index war korrupt (stale 22-KB-`index.lock` vom 22.06., alle 199 Dateien als gelöscht gestaged) — non-destruktiv per Lock-Entfernung + `git reset` repariert, Working Tree blieb unberührt.

**Umsetzung (User-Entscheidungen: statische JSON + Live-Suche):**
- **Content:** `src/content/{de,en}/faq.json` NEU — 21 FAQs in 4 Kategorien aus der M11-Migration extrahiert (Kategorie-Labels im JSON, sprechende Slug-IDs identisch in DE/EN, Halbgeviertstrich-Typo aus [[PROBLEME]] in DE+EN gefixt). `loader.ts` um `faq`-Eintrag + Typen erweitert; Seite voll SSG ([[ENTSCHEIDUNGEN#ADR-64]]).
- **`FaqAccordion` komplett neu** (Radix direkt + GSAP): Scroll-Entrance mit 80-ms-Stagger pro Kategorie (`once`, transform/opacity), CSS-Höhenanimation (tw-animate, `--tw-duration` 320 ms) mit nachziehendem Content-Reveal (75 ms Delay), Plus→X-Icon-Rotation mit Spring-Easing, Sticky-Kategorie-Nav mit IntersectionObserver-Scroll-Spy + Treffer-Countern, **Live-Suche** (filtert Frage+Antwort, `faq-rise`-CSS-Stagger für neue Treffer, gestalteter Kein-Treffer-State, `aria-live`-Ergebniszeile), reduced-motion-Guards, Focus-Ringe, 44-px-Touch-Targets.
- **SEO:** FAQPage-JSON-LD (schema.org) mit allen 21 Fragen in `faq/page.tsx` (erstes JSON-LD im Projekt, `<`-escaped).
- **Aufräumen:** `listPublishedFaqs`/`FaqItem`/`FaqRow` aus `queries.ts`, FAQ-Einträge aus der Revalidate-Map, `pages.faq.categories`+`empty` aus den Messages (dafür `nav`/`stats`/`search.*`).
- **Dev-Fix:** `turbopack.root` in `next.config.ts` — ein verwaistes `~/package-lock.json` zog Turbopacks Root-Inferenz aufs Home-Verzeichnis und brach die Dev-CSS-Resolution.

**Verifikation:** `pnpm typecheck` + `lint` + `build` clean — **31/31 SSG** (vorher 35: die 4 Blog-Slug-Seiten entfallen erwartbar, weil die tote DB keine Slugs liefert; `/[locale]/faq` jetzt ● SSG ohne Revalidate). Production-Server (`pnpm start`) + curl auf DE+EN: je 21 `data-faq-row`, 4 Sektionen, 4 Nav-Pills, Suchfeld, JSON-LD `FAQPage`/21, Halbgeviertstrich vorhanden, 0 Server-Errors. **Interaktive Browser-Prüfung entfiel bewusst:** Während der Session trat ein macOS-Kernel-Panic auf (siehe [[PROBLEME]]) — auf weitere Preview-/Chrome-Läufe wurde verzichtet; Accordion-/Spy-/Such-Interaktionen bitte nach dem Deploy einmal live gegenchecken.

## 2026-06-19 — Session 38: Spielplan-Reise Orbit-Polish

**Commit-SHA (Code):** `de33eb5`

**Auftrag:** User-Feedback zur nativen „Interaktiven Reise durch die Spielplanverbreitung": Der pulsierende Kern mit Sternen sollte im Zentrum stehen und nicht oben links; außerdem sollte die Darstellung heller/lesbarer werden und die Animationen mehr Feinschliff bekommen. Umsetzung mit `website-design-ultra`-Regeln: CI-Palette beibehalten, eine Akzentfarbe, transform/opacity-only Motion, reduced-motion respektiert.

**Fix.** `src/components/sections/SpielplanReise.tsx` wurde gezielt überarbeitet: Die alte linke Emblem-Spalte im Tabpanel ist durch einen zentrierten Orbit-Core ersetzt. Der Core steht in einer helleren Stage-Fläche, hat einen klaren weißen Kern, Purple-Glow, gestrichelten Orbit und acht kleine Sternpunkte. Text, Tags und Chips bleiben darunter mittig ausgerichtet, sodass der Fokus nicht mehr oben links hängt. Die Stage-Card nutzt eine hellere Surface-Mischung und stärkeren Schatten; Body-Text ist kontrastreicher (`foreground/82` statt `foreground/75`).

**Animation.** Zusätzlich zum vorhandenen Fortschritts- und Content-Reveal laufen jetzt vier dezente GSAP-Loops: langsame Orbit-Rotation, Core-Puls, Glow-Atmung und gestaffeltes Stern-Flimmern. Alles animiert nur `transform`/`opacity`; `prefers-reduced-motion` bleibt Guard. Der aktive Stepper-Puls und der neue Orbit-Effekt nutzen `revertOnUpdate`, damit beim Stationswechsel keine alten Infinite-Timelines weiterlaufen.

**Controls/States.** Prev/Next haben jetzt 44px-Touch-Targets, sichtbare Focus-Rings, Active-Feedback (`translate-y-px`) und sauberere Disabled-States. ARIA-Struktur (`tablist/tab/tabpanel`, `aria-live` für Progress) bleibt unverändert.

**Verifikation:** `pnpm typecheck` clean, `pnpm lint` clean, `pnpm build` clean (35/35 SSG). Playwright auf `/de/konzeption#zeitstrahl`: Desktop-Screenshot `output/playwright/spielplanreise-station5-desktop.png`, Mobile-Screenshot `output/playwright/spielplanreise-mobile-core.png`; Mobile `docOverflowPx 0`; gemessene Zentrierung `panelCenterX=188`, `coreCenterX=188`, `deltaPx=0`; Browser-Konsole 0 Errors / 0 Warnings.

## 2026-06-19 — Session 37: Native interaktive „Spielplan-Reise" statt Genially-Embed + Partnerkarte neu aufgebaut

**Commit-SHA (Code):** `PENDING`

**Auftrag:** User: Vault lesen, dann zwei Dinge: (1) „Interaktive Reise durch die Spielplanverbreitung" — das eingebettete Genially sieht schlecht aus, alles selbst bauen, animiert (Website-Design-Ultra-Referenz). (2) „Wer schon dabei ist"-Abschnitt aktualisieren — die Karte „passt nicht, ist nicht vollständig".

**0 — Reparatur vorab: `node_modules`-Korruption.** Der Dev-Server crashte beim Boot (`SyntaxError: Unexpected end of JSON input` in `next/dist/compiled/semver/package.json`, danach `_picocolors.bold is not a function`). Diagnose: mehrere abgeschnittene/leere JSON-Dateien verstreut im `node_modules`-Baum + fehlende pnpm-Store-Index-Dateien (`pnpm store status` ENOENT) — reine Installations-Korruption, kein Code-Bug. `pnpm install` allein half nicht („Lockfile up to date", Crash erst beim Lesen der kaputten Datei). Fix: `rm -rf node_modules && pnpm install` (8,1 s, folgt Lockfile). Danach Dev-Boot sauber (`✓ Ready`).

**1 — Genially-iframe → native `SpielplanReise` (Task 1).** Das Genially-Embed in `Timeline.tsx` zeigte nur einen generischen Lade-Spinner (schwarzes Genially-Logo auf weißer Box), null CI-Bezug. Neu: `src/components/sections/SpielplanReise.tsx` (Client, GSAP) — ein interaktiver 5-Stationen-Stepper (Status quo → Standards → ORIF-Schnittstelle → Konnektor/Datenraum → Verbreitung). Features: Fortschrittsschiene mit Lucide-Icon-Knoten + animierter Füllung (von Knoten 1 bis 5), Bühnen-Card mit großem Index/Tag/Phase/Titel/Body + Format-Chips (Station 1 „gestrichelt-muted" für die Handarbeit, sonst Akzent), Prev/Next-Buttons, klickbare Knoten, ARIA-`tablist`/`tab`/`tabpanel` + Pfeil/Home/End-Tastatur, `prefers-reduced-motion`-sicher, dezenter Dauer-Puls am aktiven Knoten. Inhalt in `messages/{de,en}.json` unter `timeline.journey` (Heading/Lead/Stationen-Array); `konzeption/page.tsx` reicht es via `tTimeline.raw("journey.stations")` durch (Roh-String für `progressLabel`, damit kein ICU-`FORMATTING_ERROR` serverseitig). `Timeline.tsx` entkoppelt von Genially (Typen `geniallyHeading/Caption/Title` + `geniallyUrl`-Prop raus, `TimelineJourney`-Prop rein); `GENIALLY_URL`-Konstante gelöscht.

**2 — Partnerkarte neu aufgebaut (Task 2).** Die `PartnerMap` auf `/jetzt-mitmachen/mitwirkung` war eine riesige, ausgewaschene Hochformat-Rasterkarte (Wikimedia-Locator mit blauem Meer) mit 4 blassen, kaum sichtbaren Punkten → „passt nicht / nicht vollständig". Neuer `PartnerMapClient.tsx`: Basiskarte CI-getönt (`filter: grayscale(1) contrast .9 brightness 1.03` + `opacity-70` → neutrale Graustufenkarte, kein Off-Brand-Blau), kompaktere Breite (`max-w-[420px]`), **kräftige nummerierte Marker** (1–4, Purple-Pille mit weißem Rand + Schatten, Pilot hell / Partner dunkel / Interessiert grau), GSAP-`back.out`-Eindrop mit Stagger, `animate-ping`-Ring auf dem aktiven Marker, **nummerierte klickbare Liste** (Marker ↔ Liste teilen denselben Index; aktive Zeile blendet Koordinaten + Website-Link ein). Dazu Netzwerk-Hinweis-Box „Über 140 Institutionen im DACH-Netzwerk" + CTA-Link `/` „Zur DACH-Netzwerkkarte auf der Startseite" (ehrliche Trennung: tragende Partner hier, vollständiges DACH-Netz auf der Startseite). Lead-Text in `messages` präzisiert (DE/EN), Keys `networkNote`/`networkCta` ergänzt. Daten bleiben Supabase-getrieben (keine erfundenen Partner).

**3 — Mobile-Fix.** Auf 375 px erzeugte die Karte 20 px Horizontal-Overflow: die einzelne `auto`-Grid-Spalte blähte sich durch den `aspect-ratio`-Karten-Container auf 378 px (klassisches aspect-in-grid-Problem). Fix: explizite `grid-cols-1` (= `minmax(0,1fr)`) auf Mobile + `min-w-0` an beiden Grid-Kindern → `docOverflowPx 0`.

**Verifikation:** Preview (Port 3000) auf `/de/konzeption` + `/en/concept` (Reise: 5 Tabs, Stationswechsel, Progress „Station x von 5"/„x of 5", Fortschrittsfüllung 0→100 %, EN-Texte) und `/de/jetzt-mitmachen/mitwirkung` + `/en/join/contribute` (4 nummerierte Marker, Selektion mit Ping + Koordinaten, Netzwerk-Hinweis DE/EN). Mobile 375 px: beide `docOverflowPx 0`, Stepper passt (Knoten 29→346 px). `tsc --noEmit` clean, ESLint clean, `pnpm build` „✓ Compiled successfully", 35/35 SSG-Seiten, 0 Fehler/Warnings.

## 2026-06-11 — Session 36: „Use Case 3" aus Hero-Bildunterschrift der Startseite entfernt

**Commit-SHA (Code):** `c6f7a5d`

**Auftrag:** User: Vault lesen, dann „Use Case 3 muss weg bei dem Bild darunter auf der Startseite".

**Lokalisierung.** Projektweiter grep nach „Use Case 3" zeigte 5 Fundstellen: Hero-figcaption (DE/EN messages, je Z. 31), `meta.siteDescription` (DE/EN), `opengraph-image.tsx` (Landing + Blog), `landing.json` `pitch.body` (DE/EN). Nur die **figcaption direkt unter dem Hero-Theaterbild** passt zu „bei dem Bild darunter" — sie lautete „Use Case 3 · Datenraum Kultur" (DE) / „Use Case 3 · Cultural Data Space" (EN).

**Fix (nach Rückfrage).** User-Entscheidung: „nur Use Case 3 raus, Rest bleibt". `hero.heroImageCaption` → „Datenraum Kultur" (DE) / „Cultural Data Space" (EN). Die übrigen 4 Fundstellen (Meta-Description, OG-Image, Pitch-Fließtext) bewusst **unberührt** — inhaltlich korrekt und nicht „beim Bild".

**Verifikation:** Preview (Port 3000, `/de`): erste figcaption jetzt „Datenraum Kultur" (vorher „Use Case 3 · …"), Netzwerk-Karten-Caption „DACH-Netzwerk · Datenraum Kultur" unverändert, 0 Console-Errors. Hero-Screenshot bestätigt „DATENRAUM KULTUR" (CSS-Uppercase) unter dem Bild. Gleiche figcaption-Klasse wie Session 34 Punkt 2 (dort die Karten-Caption lokalisiert).

## 2026-06-10 — Session 35: Vault-Aufräumen (Token-Diät + Stale-Fixes)

**Kein Code-Change — reine Vault-Wartung.** User: „Lese die MD-Dateien, sortiere irrelevante Infos aus, lösche was nur Tokens kostet, bringe Ordnung hinein." Leitprinzip: Die bei **jedem** Session-Start gelesenen Dateien (DASHBOARD/KONTEXT/PROBLEME/MUSTER) müssen schlank + aktuell sein; die Vollhistorie lebt in CHANGELOG + `verlauf/`.

- **DASHBOARD.md 161→45 Z.:** „Was gerade läuft" (volle Absätze Session 20–34) und „Letzte Aktivität" (Einträge zurück bis April) entfernt — beides CHANGELOG-Dopplung. Status-Tabelle (31 Zeilen mit alten Deploy-IDs) auf 7 aussagekräftige Zeilen verdichtet. „Nächste Schritte" behalten + erledigte ✅-Punkte zu Einzeilern getrimmt (stale ComicStrip-Warning-TODO raus, war seit Session 31 gefixt).
- **KONTEXT.md:** Riesen-Recap-Absatz (Zeile 3, Sessions 29–33) → ein Pointer-Satz; Hosting-/Supabase-Absätze entschlackt (stale Deploy-IDs raus). **Dateibaum korrigiert:** `ansprechpersonen/`→`team/`, gelöschte `blog/page.tsx` + `termine/page.tsx` raus (waren seit Session 30 weg).
- **PROBLEME.md 119→73 Z.:** „✅ Gelöst"-Tabelle (~60 Einträge zurück bis April) auf die jüngsten + eine Sammelzeile mit den wiederverwendbaren Lehren (Git-Lock-Recovery, Turbopack-Reset, Satori) eingedampft. Offene Abschnitte (🔴/🟡/🟢) unverändert.
- **INHALTE.md:** Routing-Map zeigte noch die **alten** Routen (`/projekt`, `/beteiligung`, `/ansprechpersonen`) — auf die echten M17-Slugs aus `routing.ts` korrigiert + M17-Rename-Hinweis.
- **START_HIER.md:** „Stand: M1"-Dateibaum (alle Komponenten „leer") → Pointer auf KONTEXT; Anker/Labels nachgezogen.
- **verlauf/INDEX.md:** fehlende Sessions 30/31/32/34 ergänzt.
- **API.md:** Hinweis ergänzt, dass das Revalidate-Mapping (`/blog`, `/termine`) seit M18 auf 308-Redirect-Routen zeigt statt auf `/konzeption` (Code-Fix als separater Task geflaggt, kein Vault-Thema).

**Verifikation:** Anker referenzierter Überschriften geprüft (`Nächste Schritte für Claude`, ROADMAP-M18-Plan existieren); verbliebene Alt-Routen-Treffer sind alle bewusst (Redirect-Beschreibungen). Kein Build nötig (keine Code-Änderung).

## 2026-06-10 — Session 34: Design-Audit + Production-Polish + Deploy

**Commit-SHA (Code):** `6a8db83`

**Auftrag:** User: Vault lesen, „die ganze Website auf Design und Perfektion untersuchen" (Website-Design-Ultra-Plugin als Referenz), alle Bedingungen aus `Anmerkungen Entwurf 14.5.2026.md` prüfen, Fokus auf Platzierung/Abstände, Production-Polish mit anschließendem Deploy.

**0 — Git-Reparatur vorab.** `git status -sb` zeigte `origin/main [gone]` — ein verwaister `.git/refs/remotes/origin/main.lock` (vom Session-33-Abbruch, Jun 8) blockierte das Update der Remote-Tracking-Ref; dazu ein Finder-Duplikat `index 2.lock` im Worktree. Read-only verifiziert (`git ls-remote`): Remote-`main` = lokale HEAD (`8c2b661`), keine Divergenz. Beide Locks entfernt (kein git-Prozess aktiv), `git fetch` stellt die Tracking-Ref non-destruktiv wieder her. Gleiche Lock-Klasse wie 2026-05-10/2026-06-08.

**1 — Audit.** Alle 13 Routen (DE, EN-Stichproben) auf 375/673/1280 px durchgesehen: Anmerkungen-Abgleich (alle 14 Punkte aus dem Entwurfs-Feedback umgesetzt ✓), Overflow-Messung (überall `docOverflowPx 0`), Grid-Vermessung per JS (FeatureGrid 3×400, Stakeholder 4×300, Quotes 3×387, Segmente 2×2 — alle Spalten exakt), Bild-Ladezustände, Console. Fünf Befunde, alle gefixt:

**2 — i18n-Bug: Karten-figcaption hartkodiert deutsch (🔴).** `NetworkMapSection.tsx` hatte „DACH-Netzwerk · Datenraum Kultur" als Literal im JSX — `/en` zeigte deutschen Text unter der interaktiven Karte (gleiche Bug-Klasse wie der Session-24-Hero-Tag-Fix). Neu: `mapCaption`-Prop, lokalisiert in `landing.json` (DE „DACH-Netzwerk · Datenraum Kultur" / EN „DACH network · Cultural Data Space").

**3 — Hero-Redundanz + verwaister Trenner-Punkt (🟡).** Seit dem Welle-1-`BuehnenvereinLockup` stand „Ein Projekt des Deutschen Bühnenvereins" **dreifach** im ersten Viewport (Header-Logo, Lockup mit Logo, Text-Kicker in der Meta-Zeile) — der Text-Kicker wortgleich ~200 px unter dem Lockup. Auf Mobile brach die Meta-Zeile zudem so um, dass der Trenner-„·" verwaist am Zeilenende hing. Fix: Kicker + Punkt aus der Hero-Meta-Zeile entfernt, Mono-Tag-Zeile `Schema.org + GND + JSON = ORIF` bleibt; ungenutzter `hero.kicker`-Key aus beiden Message-Files entfernt. Siehe [[ENTSCHEIDUNGEN#ADR-61]].

**4 — Logo-Console-Warning strukturell behoben (🟡).** Das Bühnenverein-PNG ist intrinsisch 1043×368 (Ratio 2,83), Header deklarierte aber 88×32 (2,75) und Lockup 180×48 (3,75). Sobald die CSS-Höhe (`sm:h-8` = 32 px) zufällig dem `height`-Attribut entsprach, feuerte Nexts XOR-Check („width or height modified, but not the other") — 8× pro Session. Fix wie beim ComicStrip (Session 31): intrinsische Maße deklarieren, Anzeigegröße bleibt bei CSS (`h-7 w-auto sm:h-8`), `sizes`-Hint für effizientes srcset; dabei deprecated `priority` → `preload` (Next-16-Deprecation, Rest der Codebase war schon umgestellt).

**5 — DRK-Wording raus (🟡, Anmerkungen-Compliance).** `projekt-technische-standards.json` (DE) hatte noch „Senden und empfangen über den DRK" als Überschrift + „Der Datenraum Kultur (DRK)" im Body — die Anmerkungen verbieten die Abkürzung explizit (Verwechslung mit Deutschem Roten Kreuz). Jetzt „… über den Datenraum Kultur", Klammer-Abkürzung entfernt; EN war schon sauber. Damit ist der Seitentext DRK-frei.

**6 — Footer-Copyright (🟢).** Nacktes `© 2026` → `© {year} Deutscher Bühnenverein` via neuem i18n-Key `footer.copyright` (DE/EN identisch, Eigenname).

**Nicht fixbar (notiert):** FAQ-Frage „… Schnittstelle - brauchen wir dennoch ORIF?" nutzt Bindestrich statt Halbgeviertstrich — Text liegt in der Cloud-DB (Migration `20260507153000`), DB-Push braucht das fehlende DB-Passwort. In PROBLEME ergänzt.

**Verifikation:** `pnpm typecheck`, `pnpm lint`, `pnpm build` clean (35/35 SSG). Preview nach `rm -rf .next` (stale-Turbopack-Klassiker: Message-JSON-Edit wurde im laufenden Dev-Server nicht aufgenommen → MISSING_MESSAGE): DE+EN Hero ohne Dopplung, Karten-Caption lokalisiert, `© 2026 Deutscher Bühnenverein` im Footer, „DRK" nirgends mehr im Seitentext, 0 Console-Warnings/-Errors.

## 2026-06-08 — Session 33: Interaktive Karte auf der Startseite + Git-Recovery

**Commit-SHA (Code):** `6399562`

**Auftrag:** User (mit Obsidian-Zitat): „hier muss unbedingt die Landkarte noch einmal auftauchen … ein interaktives Element, wo man reinscrollen und einzelne Theater und Agenturen anklicken kann, wie auf dieser Google-Maps, aber halt in unserem Design" + die Google-MyMaps-iframe-URL. Plan-Phase-Klärung ergab zwei User-Entscheidungen: **Karten-Look = „Google-iframe einfach einbetten"** (nicht in eigener CI nachbauen) und **Umfang = „Auch die Startseiten-Karte"**.

**1 — Interaktive Karte auf die Startseite.** Auf `/jetzt-mitmachen` war die Google-MyMaps-Karte (`mid=1WQiyQkmVpOG9CNYfLoEj3qNlGg52xo8`, 141 reale Standorte in 4 Ebenen: 52 Bühnenverein-Theater · 33 Kommunen/Länder/Verbände · 37 Opera Europa/OperaBook · 19 Plattformen — exakt die „141 Institutionen" der Startseiten-Statistik) bereits als iframe eingebettet. Die Startseite zeigte dagegen nur ein **statisches DACH-Bild** (Sanity-CDN-JPG) im `NetworkMapSection`. Jetzt rendert `NetworkMapSection` statt des Bildes dasselbe interaktive iframe im bestehenden `paper-panel`-Rahmen — die editoriale Umgebung (Heading, Lead, große „141"-Zahl, 4 DACH-Segmente) bleibt erhalten, nur das Bild rechts wird zur klickbaren Karte. Neue geteilte Konstante `src/lib/maps.ts` (`MYMAPS_EMBED_URL`) gegen Magic-String-Duplikat, von Startseite **und** `/jetzt-mitmachen` genutzt; `landing.json` (DE/EN) um lokalisierten `mapTitle` ergänzt, tote `image`/`imageAlt` entfernt. Siehe [[ENTSCHEIDUNGEN#ADR-60]].

**2 — Git-Recovery (verwaister Lock + ungeborene `main`).** Vor dem Routine-Commit zeigte das lokale Repo **null Commits**, alle 197 Dateien als initialer Add gestaged („ungeborene" `main`) — obwohl `origin/main` die volle Historie trägt. Read-only-Prüfung (`git fetch` + `git diff --stat origin/main`) belegte: der lokale Baum ist **inhaltlich identisch mit `origin/main`**, nur die bearbeiteten Dateien weichen ab; das `.git` hatte lediglich HEAD/Index verloren. Ein verwaister `.git/refs/heads/main.lock` (vom abgebrochenen Session-32-Vorgang, Jun 7) blockierte zusätzlich jeden Ref-Update — gleiche Klasse wie der `index.lock`-Crash 2026-05-10. **Non-destruktive Reparatur** (kein Force, keine Datenverluste): Lock-Files entfernt (kein git-Prozess aktiv), `git update-ref refs/heads/main origin/main` hängt die lokale `main` an die echte Historie an, Working Tree unberührt. Danach saubere Fast-Forward-Commits. Siehe [[PROBLEME#✅ Gelöst]].

**Verifikation:** `pnpm exec tsc --noEmit`, `pnpm lint`, `pnpm build` clean (alle Seiten prerendered inkl. `/icon`/`/sitemap.xml`). Preview-MCP: `/de` Netzwerk-Abschnitt rendert das Maps-iframe (Titel „Interaktive Karte des DACH-Netzwerks…", `loading=lazy`), „141" + alle 4 Segmente bleiben sichtbar; `/en` zeigt den englischen Titel; `/de/jetzt-mitmachen` unverändert (Konstanten-Refactor ohne Regress); 2 iframes auf der Startseite (YouTube + Maps), `docOverflowPx 0` auf 374 px und 1280 px, 0 Console-Fehler. Screenshot des Abschnitts bestätigt Karte mit Markern + Bildunterschrift „DACH-Netzwerk · Datenraum Kultur".

## 2026-06-07 — Session 32: Production-Audit + Event-Foto-Plumbing + Vault-Korrektur

**Commit-SHA (Code):** `e1e7d6b`

**Auftrag:** User: „Lese dir die MD-Dateien durch und schau dir an, was du noch alles machen kannst" → nach Vault-Sichtung + Live-Statusprüfung Auswahl „Alles autonom Machbare". Drei ohne fremde Assets umsetzbare Tasks am Stück.

**1 — Production-Audit (Lighthouse gegen den Live-Vercel-Alias).** Schließt die offene P3-#7-Lücke „Lighthouse gegen Production steht noch aus" (Session 31 hatte nur localhost geprüft → SEO 92 war ein localhost-Artefakt). Ergebnis: **A11y 100/100 (DE+EN), SEO 100/100 (DE+EN), Best Practices 96/96, Performance EN 91 / DE 94 (warm)**. Der erste DE-Lauf zeigte Perf 73 — Ursache war ein einmaliger **LCP-Ausreißer (8,1 s, kalter Edge-Cache)**; der Warmlauf liegt bei LCP 3,1 s / Perf 94, also **kein Embed-Regress**. Best-Practices-96 = genau **ein** `inspector-issues`-Befund: ein Third-Party-Cookie der YouTube-Einbettung (`youtube-nocookie`), kein Code-Bug. Damit bestätigt: die in Session 31 vermutete localhost-SEO-92 ist auf Production tatsächlich 100; A11y-100 hält auch live (Bestätigung von ADR-57). Reports unter `audits/` (gitignored).

**2 — Event-Foto-Plumbing (P2 #5), deploy-sicher mit defensivem Fallback.** `events` hatte kein Bildfeld. Neu: Migration `supabase/migrations/20260607120000_event_image_url.sql` (`image_url text` nullbar/additiv); `EventListItem`/`EventRow` + `events`-Typ in `database.ts` um `image_url`/`imageUrl` ergänzt; `listEventsByStatus` selektiert `image_url` defensiv via `runQuery`-Helper und fällt bei fehlender Spalte auf die Basis-Spalten zurück; `Timeline` rendert das Foto konditional (`next/image`, explizites `width/height`, `aspect-[16/9]`-figure). **Warum defensiv:** Das DB-Passwort zum Pushen der Migration liegt nicht in `.env.local`, und Auto-Deploy greift wieder (ADR-58) — ein naiver `image_url`-Select hätte die Live-Timeline gebrochen. Verifiziert gegen die echte, noch un-migrierte Cloud-DB: `pnpm build` prerendert `/de/konzeption` SSG clean, vergangenes Event bleibt sichtbar (Fallback greift), 0 Foto-`figure`. Offen bis zu Assets: Migration pushen (braucht DB-Passwort) + Foto-URLs eintragen → Bilder erscheinen ohne Code-Änderung. Siehe [[ENTSCHEIDUNGEN#ADR-59]].

**3 — Vault-Korrektur + Doku.** Live-Check ergab: der in PROBLEME als „KOMPLETT DOWN (HAProxy 503)" geführte Custom-Domain-Zustand ist **veraltet** — `smarte-theaterdienste.de/de` liefert wieder HTTP 200, zeigt aber weiter die **alte Hetzner-Seite** (keine `x-vercel-*`-Header, DNS unverändert `167.235.107.225`/`159.69.6.148`, Alt-Slug „Projekt"). Eintrag korrigiert (Dringlichkeit hoch → mittel, Kernproblem „nicht auf Vercel" unverändert), Performance-Restposten auf die frischen Production-Zahlen gehoben, Event-Foto-Bereitschaft in „Echte Inhalte benötigt" dokumentiert. Verifikation gesamt: `pnpm typecheck`, `pnpm lint`, `pnpm build` clean.

## 2026-06-05 — Session 31: M18 Welle 3 P2 — Datenfluss-Diagramm + Wortwitz-Eyebrows + ComicStrip-Fix + A11y-Recheck

**Commit-SHA (Code):** `6cbd615`

**Auftrag:** User wählte „Alles aus ‚sofort möglich' hintereinander" — die in Session 30 aus der PDF-Sichtung abgeleiteten, sofort umsetzbaren Tasks am Stück: 3a (ORIF-Datenfluss-Diagramm), 3b (Theater-Wortwitz-Eyebrows), #10 (ComicStrip-Console-Warning) und #7 (Lighthouse-+-axe-Recheck).

**3a — `DataFlowDiagram` (neue Komponente).** `src/components/sections/DataFlowDiagram.tsx` zeichnet die Theater-Dortmund-Prozessarchitektur (Website-DRK.pdf S.1, „nur zur Recherche") CI-konform neu statt sie einzubetten: drei Stage-Cards (`01 Sparten → 02 KBB → 03 Veröffentlichung`) mit Mono-Step-Nummern, Bullet-Items bzw. Output-Items mit Format-Badge (`HTML` / `API` / `ORIF · Schema.org`), Datenraum-Output `highlight`-markiert (Purple-Pale-Mix + Akzent-Border), Inline-SVG-Connector-Pfeile (per CSS `rotate-90` für den Mobile-Vertikal-Stack). Reine Server-Component, `FadeInOnScroll`-Reveal. Inhalt locale-getrennt in `projekt-technische-standards.json.dataFlow` (DE „Prozessarchitektur / Vom Spielplan zum Datenraum" + EN „Process architecture / From programme to data space"), keine Binärdatei. Eingehängt in `konzeption/technische-standards/page.tsx` zwischen TextSections und `VideoEmbed`. Siehe [[ENTSCHEIDUNGEN#ADR-55]].

**3b — Theater-Wortwitz-Eyebrows.** Statt eines `wordplay`-Namespaces (ROADMAP-Vorschlag) drei bestehende `pages.*.kicker` direkt auf den Bühnen-Wortwitz aus STD-Design-Praesentation S.4 gehoben (DE+EN): Konzeption „Konzeption"→„Großer Akt"/„Opening act"; Materialien „Zum Mitnehmen"→„Aus dem Fundus"/„From the prop room"; FAQ (inkl. `empty.kicker`) „Antworten"→„Vorhang auf für Fragen"/„Curtain up for questions". Tote `pages.termine.*`-Keys (308-Route) bewusst unangetastet. Siehe [[ENTSCHEIDUNGEN#ADR-56]].

**#10 — ComicStrip-Console-Warning gefixt.** `ComicStripFrames.tsx`: `Image` von `fill` auf explizite `width={800} height={600}` umgestellt, `aspect-[4/3] w-full object-cover` vom Parent auf das `<img>` selbst verschoben. Ohne `fill`-Prop kann die Next-16-Warnung „Image with fill and a height value of 0" strukturell nicht mehr feuern; Layout (4:3-Crop, Hover-Zoom, Badge-Overlay) bleibt pixelgleich. In Session 30 noch wegen Regressionsrisiko offengelassen — jetzt aufgelöst.

**#7 — Lighthouse + axe Recheck (gegen lokalen Prod-Build mit den neuen Changes).** `pnpm build` clean (35/35 SSG, `technische-standards` prerendert mit dem neuen Diagramm fehlerfrei). Lighthouse auf `/de/konzeption/technische-standards`: **Accessibility 100, Best Practices 100, SEO 92** (der einzige SEO-Abzug ist der `canonical`-Audit, der lokal auf `localhost:3030` statt den Serving-Port zeigt — in Production mit echter Domain = 100; kein Code-Defekt). axe/pa11y über 5 Seiten (DE-Home, Konzeption, Materialien, FAQ, EN-Home): **0 echte Befunde** — jeder gemeldete „Fehler" ist entweder `color-contrast` (cantTell-Artefakt des `body`-Grid-`background-image`, siehe ADR-57) oder `frame-tested` (cross-origin-YouTube, informativ). Das `DataFlowDiagram` ist wegen seiner soliden Card-Backgrounds der **einzige** Block, dessen Kontrast axe auflösen konnte — 0 Fehler. Kein Regress ggü. M8-Baseline (A11y/BP 100).

**Infra-Befund (wichtig):** Die Custom-Domain `https://smarte-theaterdienste.de` liefert jetzt durchgängig **HTTP 503** (HAProxy „No server is available", DNS weiter auf Hetzner) — eskaliert von „alte Inhalte" (Session 20) zu komplettem Ausfall. Die Vercel-Deployment selbst ist gesund (200). In PROBLEME hochgestuft, DNS-Switch dringlicher. Kein Code-Bezug.

**Verifikation:** `pnpm typecheck` + `pnpm lint` + `pnpm build` clean; JSON beider Content-/Message-Dateien valide. Tooling-Hinweis: pa11y/lighthouse laufen nur im Vordergrund (Background-Bash hat minimalen PATH ohne `pnpm`/`tail`), mit `PUPPETEER_EXECUTABLE_PATH`/`CHROME_PATH` auf System-Chrome.

## 2026-06-05 — Session 31 Nachtrag: Auto-Deploy-Mysterium endgültig gelöst (`requireVerifiedCommits=false`)

**Commit-SHAs:** `d78027a` (Verify-Trigger, leerer Commit) → Auto-Deploy `dpl_F6TYxwn7…` (source=git, BUILDING→READY 42 s).

**Auslöser:** Der Session-31-Code-Push (`6cbd615`) erzeugte erneut einen sofort abgebrochenen Auto-Deploy (`Canceled [0ms]`). User: „Da steht mal wieder deploy fehlgeschlagen, fixe." — das vierte Mal seit M16, in Session 30 noch fälschlich als „Webhook-/Concurrency-Issue" geraten.

**Wahre Ursache (per Vercel-API bewiesen):** Die Projekt-Einstellung `gitProviderOptions.requireVerifiedCommits` stand auf `true` (Vercel-Default ist `false`). Damit bricht Vercel **jeden** Deployment ab, dessen Git-Commit GitHub als „unverified" führt (also jeden nicht GPG-/SSH-signierten Commit) — `alwaysRefuseToBuild: true`, `readyStateReason = "The Deployment was canceled because it was created with an unverified commit"`, Dauer `0ms`. Erklärt rückwirkend **alle** bisherigen Canceled-Auto-Deploys; manuelle CLI-Deploys (`vercel deploy --prod`) liefen durch, weil sie die Git-Integration umgehen.

**Fix (User wählte „Verified-Commits-Pflicht aus"):** `PATCH /v9/projects/{id}` mit `{"gitProviderOptions":{"createDeployments":"enabled","requireVerifiedCommits":false}}`. Sofort-Stopgap zuvor: ein manueller CLI-Prod-Deploy, damit die Live-Site nicht auf dem alten Stand hängt.

**Verifikation end-to-end:** Leerer Commit `d78027a` gepusht → der dadurch ausgelöste Git-Auto-Deploy `dpl_F6TYxwn7…` lief sauber **BUILDING→READY** (42 s, source=git), Public-Alias serviert den neuen Stand (HTTP 200, `age:1`). Re-Fetch bestätigt `requireVerifiedCommits=false`. Reversibel jederzeit (zurück auf `true` + Commit-Signing). Siehe [[ENTSCHEIDUNGEN#ADR-58]] und den ✅-Eintrag in [[PROBLEME]].

## 2026-06-04 — Session 30 Nachtrag: P2-Asset-Sichtung (Mikalo×Diesdas + Theater-Dortmund-Workshop)

User lieferte zwei PDFs (`~/Downloads/Website DRK.pdf`, `~/Downloads/STD-Design-Praesentation-20241028.pdf`). Da `pdftoppm` (poppler) fehlte und Homebrew-Install sudo verlangt (im non-interaktiven Bash nicht möglich), Fallback über ein eigenes Swift-Script (`/tmp/pdf-preview/pdf2png.swift`) mit macOS-nativen Quartz-APIs — kein Software-Install nötig. Alle 16 PDF-Seiten als PNG nach `/tmp/pdf-preview/{website-drk,std-design}/` exportiert und gesichtet.

**Befund:**
- **STD-Design-Praesentation (11 Seiten)** ist das offizielle Designkonzept von Mikalo × Diesdas. Validiert unsere Welle-1-CI 1:1 (Public Sans + Black-Gray-Purple). Seite 4 etabliert Theater-Wortwitz als Headline-Pattern („Theaterreif!", „Bühne frei", „Was für ein Theater!"), Seite 5 zeigt 3 weitere Comic-Sprechblasen-Frames von Max Kersting (über die 3 schon eingebauten hinaus), Seite 8 ist fast 1:1 unser aktuelles Landing-Layout.
- **Website DRK.pdf (5 Seiten)** ist Recherche-/Workshop-Material. Seite 1 zeigt „Prozessarchitektur Spielplan-Online-Stellung am Theater Dortmund" (dreispaltig: Sparten → KBB → ORIF/Schema.org-Outputs) — explizit „nur zur Recherche, soll so nicht auf die Website" markiert, also als Vorlage für eine eigene CI-konforme Neuzeichnung nutzbar. Seite 5 zeigt ein Wireframe-Board mit 6 Page-Mockups, das unsere Welle-1-Sitemap validiert. Seiten 2+4 sind leer.

**Ableitung für P2** (in `ROADMAP.md` + `DASHBOARD.md` konkretisiert): drei Bau-Tasks
- 3a. SVG-Diagramm „ORIF-Datenflow" auf `/konzeption/technische-standards` (Vorlage Website-DRK Seite 1, neu in CI gezeichnet).
- 3b. Theater-Wortwitz-Pattern systematisieren als `wordplay`-Namespace in den Messages und an passenden Eyebrows einsetzen.
- 3c. Comic-Strip um 3 weitere Frames erweitern, falls der Bühnenverein die Original-Assets liefert.

Keine Code-Änderungen in diesem Nachtrag — nur Vault-Doku.

## 2026-06-04 — Session 30: M18 Welle 3 P1+P3 — Cleanup + Production-Deploy

**Deployment-ID:** `dpl_3ADeq7ZBDpFBJp2ozmERAxjc5ZF2` (READY, 31 s remote build, target=production)

**Ausgangslage:** Welle 1+2 (`b7ade71` + `86dc4d8`) waren seit ~10 Tagen auf `origin/main`, aber die Live-Site `https://smarte-theaterdienste-website.vercel.app` hing weiter auf M16 (`age: 975261`, M16-Nav). `vercel ls` zeigte 4× Canceled-Auto-Deploys ohne Logs (Duration `?`) — vermutlich Webhook-/Concurrency-Issue, kein Build-Fehler. User-Auftrag: Erst Cleanup+QA, dann Deploy.

**P3 Cleanup — Dead-Files entfernt.** Vier seit Welle 2 unerreichbare Dateien gelöscht (Redirect via `next.config.ts` greift vor dem Routing):
- `src/app/[locale]/blog/page.tsx` (Index — `blog/[slug]` bleibt aktiv)
- `src/app/[locale]/termine/page.tsx`
- `src/components/sections/EventCard.tsx` (nur von termine genutzt; Timeline rendert Events direkt)
- `src/components/sections/PostCard.tsx` (nur von blog-Index genutzt; `PostArticle` bleibt)

**`PostArticle.tsx` Back-Link.** Zeile 84: `Link href="/blog"` → `href="/konzeption"`. Eliminiert den 308-Hop; Label „Zur Übersicht" / „Back to overview" passt weiter (zeigt jetzt direkt auf den Konzeption-Zeitstrahl, wo Blog+Events leben).

**P3 iframe-QA grün.** curl-Inventur + Browser-Layout-Check auf 375 px für alle vier neuen Embeds (Landing-YouTube, Konzeption-Genially, Jetzt-mitmachen-MyMaps, Technische-Standards-Comic-Clip-YouTube): jeder iframe hat aussagekräftiges `title`, `loading="lazy"`, `referrerpolicy="strict-origin-when-cross-origin"`; YouTube nutzt `youtube-nocookie`. Mobile-Smoke: `docOverflowPx: 0` für alle drei iframe-Seiten, kein einziges überragendes Element, jeder Embed 341 px breit. Nebenbefund (pre-existing): `ComicStripFrames` wirft beim Mount Next-16-Warnung „Image with fill and a height value of 0" — Bilder rendern final korrekt (244 px), kosmetisch, in PROBLEME notiert.

**P3 Karten-Daten-Abgleich.** Zwei bewusst verschiedene Sichten, kein Konsolidierungsbedarf: Google MyMaps (`/jetzt-mitmachen`) = teilnehmende Theater & Agenturen (extern in Google kuratiert); Supabase-PartnerMap (`/jetzt-mitmachen/mitwirkung`) = die 4 tragenden Projekt-Institutionen (Bühnenverein, Fraunhofer, Akademie, NFDI4Culture). Finaler MyMaps-Inhalt liegt beim Bühnenverein.

**Working-Tree-Sauberkeit.** 12 Finder-Duplikate (`* 2.jpg/png/svg`) aus `public/comic-strip/`, `public/hero/`, `public/logos/`, `public/maps/` entfernt (untracked, nicht referenziert, durch macOS-Finder beim Asset-Verschieben entstanden).

**P1 Deploy.** Lokal `pnpm typecheck` + `lint` + `build` clean (35/35 SSG inklusive `/icon` — anders als bei Welle 2, wo Sandbox ohne Netz das `@vercel/og`-`/icon` brach, ging hier mit Netz alles durch). Direkter CLI-Deploy `pnpm dlx vercel@latest deploy --prod --yes` umgeht GitHub-Webhook. Build erfolgreich in 31 s. Production-URL: `https://smarte-theaterdienste-website-h10hnqktv-kaytm93s-projects.vercel.app`, aliased auf den Primär-Alias plus auto-Alias `https://www.smarte-theaterdienste-website-1.de`.

**Live-Smoke gegen Primär-Alias** (`age: 0`, frischer Cache):
- Welle-1-Nav (`Konzeption · Jetzt mitmachen · Materialien · FAQ`) auf `/de` 6× sichtbar.
- 11/11 neue Routen HTTP 200 (DE + EN, inkl. `/team`, `/materialien`, `/konzeption/technische-standards`, `/jetzt-mitmachen/mitwirkung`).
- 7/7 Redirects HTTP 308 mit korrekten Zielen (`/de/ansprechpersonen`→`/de/team`, `/de/termine`+`/de/blog`+`/de/projekt`→`/de/konzeption`, `/de/beteiligung`→`/de/jetzt-mitmachen`, EN-Pendants).
- `/sitemap.xml`, `/robots.txt`, `/icon`, `/manifest.webmanifest` alle 200.

**Offen / weiter:** Team-Bühnen-Hover (4 Sanity-URLs ausstehend), Auftraggeber-Lieferungen (Grafiken/Legal/Event-Fotos), Custom-Domain-DNS-Switch.

## 2026-05-24 — Session 29: M17 Welle 2 — Unterseiten nach Feedback 14.5.2026

**Commit-SHA:** `86dc4d8`

**Quelle:** dieselbe User-Lieferung wie Welle 1 (`Anmerkungen Entwurf 14.5.2026.md` + CI aus `Design-Vorlage.md`/`STD-Colors+Fonts.pdf`). Welle 2 arbeitet den noch offenen Unterseiten-Backlog ab. Zu Beginn wurde der ungemergte Welle-1-Commit `b7ade71` per Fast-Forward auf `main` gezogen (vorher lag `main` noch auf M16 `f109bf2`).

**Bildmaterial:** Echte Schwarzweiß-Fotos aus dem alten Sanity-CDN (`lc7slax2/production`, bereits in `next.config.ts` erlaubt), per `grayscale` gerendert.

- **Schritt 1 — Konzeption (`/konzeption`).** `TextSection` um optionale `image`/`imageAlt`/`imageCaption` erweitert (Figur mit `grayscale`, Caption-Leiste). Drei CI-Fotos in `projekt.json` (DE/EN): Vorhang (`a282b057…`), effizientere Prozesse (`dba1d1e8…`), größere Reichweite (`67a55bce…`). Team-Block (`<TeamGrid>`) als Abschnitt „Hinter dem Projekt" unten eingebettet. Neuer Zeitstrahl-Abschnitt (siehe Schritt 6). Seite holt jetzt `listPastEvents` (Supabase, `revalidate=60`).
- **Schritt 2 — Technische Standards.** Comic + Video direkt eingebettet statt hinter Buttons: `<VideoEmbed>` für den Comic-Clip (`cCCa7Yuzaf0`) + `<ComicStrip>` (Frames aus `landing.json` wiederverwendet). Comic-Clip aus den `ResourceLinkGrid`-Karten entfernt (nur noch echte Downloads/Tools: Infomaterial, Musterkalkulation, ORIF-Doku, Validator, Lektoratstool). Zwei Datenmodell-/Prozess-Fotos (`21915b7e…`, `6f9d0107…`) in die Sektionen.
- **Schritt 3 — Jetzt mitmachen.** Neue Komponente `MapEmbed.tsx` bettet die Google-MyMaps-Karte (`mid=1WQiyQkmVpOG9CNYfLoEj3qNlGg52xo8`) als lazy iframe im CI-Rahmen ein. Bestehende Marken-`PartnerMap` auf `…/mitwirkung` bleibt unverändert.
- **Schritt 4 — FAQ.** `FaqAccordion` gruppiert jetzt nach `category` (Supabase-Spalte) mit Zwischenüberschriften + Quick-Jump-Nav. Vier lokalisierte Kategorien in `messages` (`pages.faq.categories`): Grundwissen, Technik & Sicherheit, Umsetzung & Kosten, Datenraum Kultur.
- **Schritt 5 — Team.** Route `ansprechpersonen` → `team` (DE+EN `/team`), 308-Redirects `/ansprechpersonen`→`/team`, `/contact-persons`→`/team`. Telefon/E-Mail aus `ContactCard` + `team.json` entfernt. `ContactCard` cross-fadet Portrait → optionales Bühnenfoto (`stage`-Feld) bei Hover/Focus, `motion-reduce`-safe; Fallback = verfeinerter Zoom-Hover. Footer-Nav: Blog/Termine raus, `/team` rein. `messages` `pages.ansprechpersonen` → `pages.team`, `team.stageAlt` ergänzt, Phone/Mail-Labels entfernt.
- **Schritt 6 — Blog + Termine → Zeitstrahl.** Neue Komponente `Timeline.tsx`: vertikaler CI-Zeitstrahl aus `events` (Supabase) + eingebettetes Genially (`view.genially.com/67531f7a9e5b6c42deba21f3`) als Vertiefung. Eingebunden als Abschnitt `#zeitstrahl` in Konzeption. Alt-Routen `/blog` + `/termine` per 308 auf `/konzeption` umgeleitet (DE) bzw. `/concept` (EN); `sitemap.ts` listet `/team` statt `/ansprechpersonen` und nicht mehr `/blog`/`/termine` (Blog-Detailseiten bleiben über `postEntries`).

**Abweichungen vom Backlog:** Zeitstrahl als Abschnitt in `/konzeption` (nicht eigene Route `/konzeption/zeitstrahl`) — entspricht der User-Entscheidung „Beides kombinieren". Team-Hover als JS-Cross-Fade mit optionalem `stage`-Bild (nicht reines CSS-Curtain), da keine Bühnenfotos auffindbar.

**Offen:** 4 Bühnen-Foto-URLs (Sanity) für den vollen Team-Hover fehlen — Mechanik liegt bereit, aktuell Zoom-Fallback. Alt-Page-Files `blog/page.tsx` + `termine/page.tsx` bleiben als (per Redirect unerreichbare) Dead-Files liegen; können später entfernt werden.

**Verifikation:** `pnpm exec tsc --noEmit` clean (nur stale `.next/types`-Altlasten, durch frischen Build behoben). `pnpm build`: TypeScript ✓ (23,6 s), Compile ✓ (63 s); Build bricht nur bei `/icon` ab — `@vercel/og` `ETIMEDOUT` (kein Netz in der Sandbox, kein Code-Fehler; auf Vercel unkritisch). Dev-Server-Smoke: `/de/konzeption`, `/de/team`, `/de/faq`, `/de/jetzt-mitmachen`, `/de/konzeption/technische-standards` HTTP 200; Redirects `/de/ansprechpersonen`→`/de/team`, `/de/termine`+`/de/blog`→`/de/konzeption`, `/en/contact-persons`→`/en/team` alle 308. HTML-/DOM-Checks: Team-Seite ohne `tel:`/`mailto:`, 4 FAQ-Kategorien + Quick-Nav, MyMaps-iframe, Comic-Clip-iframe + 3 Comic-Frames, Konzeption mit 3 `grayscale(1)`-Fotos + Timeline (5 Events) + Genially. Top-Screenshot `/de/konzeption` bestätigt CI (Bühnenverein-Logo, 4-Item-Nav, Public Sans, Purple-Akzent).

## 2026-05-19 — Session 28: M17 Welle 1 — CI-Refresh + Nav-Restructure + Landing-Redesign

**Quellen:**
- User-Lieferung `~/Downloads/smarte-theaterdienste/Smarte Theaterdienste/Anmerkungen Entwurf 14.5.2026.md` — redaktionelle Anmerkungen pro Seite.
- User-Lieferung `~/Downloads/smarte-theaterdienste/Smarte Theaterdienste/Design-Vorlage.md` + `STD-Colors+Fonts.pdf` — verbindliche Corporate Identity des Deutschen Bühnenvereins.

**Welle 1 — drei Phasen:**

- **Phase A — Corporate-Identity-Foundation.** `src/app/[locale]/layout.tsx` lädt jetzt nur noch `Public_Sans` (variable, italic) als CI-Schriftart plus `Geist_Mono` als Mono-Akzent. `Newsreader`/`Geist`-Imports raus. `src/styles/tokens.css` ist komplett auf die CI-Hex-Palette umgestellt: Lucent White `#FAFAFF`, Black `#000000`, Grays 80/60/40/20/10 sowie Purple Dark `#BF93E1` / Medium `#E1B9FF` / Light `#EFDAFF`. Neuer Helper-Token `--accent-brand-ink #6B4A9A` als AA-konformer Purple-Ton für Text auf Lucent White. `src/app/globals.css` Font-Bridges (`--font-sans`/`--font-heading`/`--font-serif`) zeigen alle auf `--font-public-sans`. Drop-Cap und `editorial-kicker::before` von Rubrik-Rot auf Purple Dark umgestellt; Dark-Mode-Surface auf Schwarz-Grau-Schema kalibriert. Bulk-Replacement aller `var(--accent-secondary)` → `var(--accent-brand)` und aller Text-only `text-[var(--accent-brand)]` → `text-[var(--accent-brand-ink)]` (Kontrastfix).
- **Phase B — Navigation & Routing-Restructure.** URLs ziehen permanent um:
  - `/projekt` → `/konzeption` (DE) / `/project` → `/concept` (EN)
  - `/beteiligung` → `/jetzt-mitmachen` (DE) / `/participation` → `/join` (EN)
  - Beide Sub-Routes (`technische-standards`, `semantische-standards`, `anwendungsbeispiele`, `mitwirkung`) mitgezogen.
  - Neue Route `/materialien` (DE) / `/materials` (EN) mit `ResourceLinkGrid` aus den ORIF-Werkzeugen (Comic, Image-Video, Infomaterial, Musterkalkulation, ORIF-Doku, Validator, Lektoratstool, GitHub).
  - `next.config.ts` setzt 12 permanente 308-Redirects von alten Pfaden.
  - `src/lib/i18n/routing.ts`, `Header.tsx`, `MobileNav.tsx`, `Footer.tsx`, `src/app/sitemap.ts`, alle Content-JSON-`href`-Werte synchronisiert.
  - Header-Menü von 6 auf 4 Items: **Konzeption · Jetzt mitmachen · Materialien · FAQ**. Editorial-Top-Rail („AUSGABE 03 · Datenraum Kultur · JSON / ORIF / DRK") komplett raus.
  - Header zeigt jetzt Bühnenverein-Logo aus `public/logos/buehnenverein.png` als Trust-Signal links neben dem Sitenamen.
- **Phase C — Landing-Redesign.** Hero in `src/app/[locale]/page.tsx` neu choreografiert:
  - Editorial-Top-Rail mit „AUSGABE 03" raus.
  - Hero-Tag-Slug `"JSON · ORIF · Datenraum Kultur"` → `"Schema.org + GND + JSON = ORIF"` (DE+EN).
  - `hero.kicker` deemphasized auf eine kleine Caption-Zeile unter dem Subtitle („Ein Projekt des Deutschen Bühnenvereins" · Schema-Tag).
  - `figcaption` „USE CASE 03"-Doppelung bereinigt; Polaroid trägt jetzt `"USE CASE 3 · DATENRAUM KULTUR"`.
  - Neue Sektion `<BuehnenvereinLockup>` direkt oberhalb der Headline mit echtem `buehnenverein.png` + Purple-Pale-Halo.
  - Neue Sektion `<VideoEmbed>` (lazy YouTube-Nocookie-Iframe) zwischen FeatureGrid und NetworkMapSection eingebaut, embeddet das Image-Video `B4vQwW5ICk8`.
  - Neue Sektion `<QuoteGallery>` zwischen Stakeholder-FeatureGrid und Pitch-TextSection mit 3 statischen Zitaten aus `landing.json`.
  - `src/content/{de,en}/landing.json` um `imageVideo`, `trust` und `quotes` erweitert.
  - `next.config.ts.images.remotePatterns` ergänzt um `i.ytimg.com` für Video-Poster.

**Welle-2-Backlog (NICHT in dieser Session):**
- Konzeption mehr Bilder, Technische Standards mit direkt eingebettetem Comic+Video, FAQ-Kategorien, Mitwirkung mit Google-Maps-iframe.
- Team-Relocation unter Konzeption mit Theater-Bühnen-CSS-Hover (Purple-Wash + Curtain), Phone/Mail aus ContactCard.
- Zeitstrahl-Route unter `/konzeption/zeitstrahl` kombiniert Blog+Termine, Genially-Embed.

**Verifikation:**
- `pnpm typecheck`, `pnpm lint`, `pnpm build` clean — 37 Pages SSG (alte Slugs raus, neue Slugs `/konzeption`, `/jetzt-mitmachen`, `/materialien` drin).
- Preview-MCP auf Port 3000: `/de` Hero zeigt prominent „EIN PROJEKT DES Deutscher Bühnenverein"-Lockup, headline „Smarte Theaterdienste" in Public Sans bold black, Tag-Zeile „Schema.org + GND + JSON = ORIF", CTAs „Jetzt mitmachen" + „So funktioniert's". Header rendert Bühnenverein-Logo + 4-Item-Menü.
- HTTP-Smoke: `/de`, `/de/konzeption`, `/de/jetzt-mitmachen`, `/de/materialien`, `/de/faq`, `/en`, `/en/concept`, `/en/join`, `/en/materials` jeweils HTTP 200.
- 308-Redirect-Smoke: `/de/projekt` → `/de/konzeption`, `/de/projekt/technische-standards` → `/de/konzeption/technische-standards`, `/de/beteiligung` → `/de/jetzt-mitmachen`, `/de/beteiligung/mitwirkung` → `/de/jetzt-mitmachen/mitwirkung`, EN-Pendants analog.
- `/de/materialien` rendert `PageHero` mit Title „Materialien" und Lead, danach `ResourceLinkGrid` mit 8 Karten (Comic, Image-Video, Infomaterial, Musterkalkulation, ORIF-Doku, Validator, Lektoratstool, GitHub).
- Headerausgabe via JS: `[Smarte Theaterdienste, Konzeption, Jetzt mitmachen, Materialien, FAQ]` — exakt das vom User gewünschte 4-Item-Menü.

**Status am Ende:** Welle-1 lokal production-validiert. Welle-2 (Page-Redesigns, Team-Relocation, Zeitstrahl) bleibt für eine spätere Session offen.

## 2026-05-15 — Session 27: M16 Editorial-Visual-Polish

**Commits / Deploy-Basis:**
- `6982932` M16: Editorial visual polish
- `4975019` docs(vault): M16 visual polish commit SHA
- Production-Deploy: `dpl_8E57VeoNYrbQBWeJg3Kma936iWXZ` READY via `pnpm dlx vercel@latest deploy --prod --yes`. Direkte URL: `https://smarte-theaterdienste-website-jeg5uepng-kaytm93s-projects.vercel.app`; öffentlicher Alias: `https://smarte-theaterdienste-website.vercel.app`.

**Was passierte:**

- **Plugin-/Tooling-Befund:** Das Website-Design-Plugin ist in dieser Codex-Session nicht als aktives Plugin geladen. Das repo-lokale `plugins/website-design-ultra` existiert und wurde als Design-Referenz gelesen.
- **Vault + Next.js-16-Doku gelesen:** `START_HIER`, `KONTEXT`, `DASHBOARD`, `PROBLEME`, `MUSTER`, `INHALTE`, `API`, `ROADMAP`, `GO_LIVE_CHECKLIST`, `CHANGELOG`, `ENTSCHEIDUNGEN`; außerdem Next.js-16-Dokumente zu Layouts/Pages, CSS und Images.
- **Visuelles Audit:** Lokale Website auf `http://localhost:3030` und production-like auf Port 3031 geprüft. Fokus: Landing-Hero („Smarte Theaterdienste" darf nicht angeschnitten wirken), Drop-Caps/erste Satzbuchstaben und Ansprechpersonen-Cards.
- **Fix 1 — RevealText:** `src/components/animations/RevealText.tsx` gibt jedem Wort-Maskenwrapper vertikalen Puffer (`py` mit negativem `my`), damit Serif-Glyphen bei `overflow-hidden` nicht oben/unten abgeschnitten werden. Playwright misst danach auf Mobile/Desktop sichtbaren Puffer (ca. 3–7 px).
- **Fix 2 — Drop-Caps:** `src/app/globals.css` reduziert Drop-Cap-Größe und rechten Abstand in `.editorial-copy`, damit erste Buchstaben ruhiger in die Zeile greifen und der Zeitungsflair erhalten bleibt.
- **Fix 3 — Ansprechpersonen:** `src/components/sections/ContactCard.tsx` nutzt personenspezifischen Portrait-Zoom, sichtbaren Fotocredit-Ribbon, flexiblere Kontaktzeilen und `<wbr>`-Breakpoints nach `@`/`.` für lange E-Mails.
- **Verifikation:** `pnpm typecheck` ✅, `pnpm lint` ✅, `pnpm build` ✅ (37/37 Pages SSG). Production-like Smoke mit `pnpm start --port 3031`: `/de`, `/de/ansprechpersonen`, `/de/blog`, `/de/faq`, `/de/termine`, `/de/beteiligung/mitwirkung`, `/en`, `/sitemap.xml`, `/robots.txt` jeweils HTTP 200. Playwright-Checks auf 390/768/1440 px zeigen keinen Horizontal-Overflow; RevealText hat messbaren Puffer.
- **Production-Deploy:** Vercel Remote-Build clean (Next.js 16.2.4, 37/37 statische Pages). Alias-Smoke gegen `https://smarte-theaterdienste-website.vercel.app`: `/de`, `/de/ansprechpersonen`, `/de/blog`, `/de/faq`, `/de/termine`, `/de/beteiligung/mitwirkung`, `/en`, `/sitemap.xml`, `/robots.txt` jeweils HTTP 200. HTML-Freshness-Checks bestätigen `-my-[0.08em]`, `py-[0.08em]`, `origin-[50%_45%]`, `bg-background/85` und `<wbr>` im Production-HTML.

**Status am Ende:** Editorial-Feinschliff ist production-live auf dem Vercel-Alias. Nächster Projektschritt bleibt Custom-Domain-DNS oder finale Impressum-/Datenschutztexte.

## 2026-05-11 — Session 26: M15 Production-Deploy

**Commits / Deploy-Basis:**
- `f34353e` docs(vault): add verlauf index
- `da505db` docs(vault): M15 visual QA session
- `ee15d40` M15: Visual QA grid and image loading
- Production-Deploy: `dpl_A36wKwjUuXfMgNbRsXvoCHM3sWEf` READY via `pnpm dlx vercel@latest deploy --prod --yes` aus dem Hauptrepo. Direkte Deployment-URL: `https://smarte-theaterdienste-website-rmphiht5x-kaytm93s-projects.vercel.app`; öffentlicher Alias: `https://smarte-theaterdienste-website.vercel.app`.

**Was passierte:**

- **Push geprüft:** `main` war bereits auf `origin/main`; `git push origin main` meldete `Everything up-to-date`.
- **Production-Deploy:** Vercel Remote-Build lief erfolgreich (Next.js 16.2.4, 37/37 statische Pages generiert). Build completed in 30 s, Deployment completed nach 53 s.
- **Production-Smoke:** `/de`, `/de/ansprechpersonen`, `/de/blog`, `/de/beteiligung/mitwirkung`, `/en`, `/sitemap.xml`, `/robots.txt` liefern auf dem Vercel-Alias jeweils HTTP 200.
- **HTML-Freshness-Checks:** `/de` enthält `lg:grid-cols-3`, `theater-parade` und `JSON · ORIF · Datenraum Kultur`; `/de/ansprechpersonen` enthält `loading="eager"` für das erste Portrait. Damit sind die Session-25-Visual-QA-Fixes live sichtbar.

**Status am Ende:** M15 ist production-live. Nächster Projektschritt bleibt Custom-Domain-DNS oder finale Impressum-/Datenschutztexte.

## 2026-05-11 — Session 25: Visual-QA-Polish (FeatureGrid, Image-Ladepfade, Lint-Ignores)

**Commits / Deploy-Basis:**
- `ee15d40` M15: Visual QA grid and image loading
- Kein manueller Vercel-Deploy in dieser Session; Push auf `main` triggert den verbundenen Vercel-Auto-Deploy.

**Was passierte:**

- **Plugin-/Tooling-Befund:** Das Website-Design-Plugin ist in dieser Codex-Session nicht als aktives Plugin geladen. Das repo-lokale `plugins/website-design-ultra` existiert und wurde als Design-Referenz gelesen (`README`, `core-rules`, `ui-states`).
- **Vault + Next.js-16-Doku gelesen:** Pflichtdateien `START_HIER`, `KONTEXT`, `DASHBOARD`, `PROBLEME`, `MUSTER`, zusätzlich `INHALTE` sowie Next-Dokumente zu CSS/Layout/Images und die Image-API-Hinweise zu `preload`, `priority` und `loading`.
- **Visuelles Audit:** Lokale Seite auf Port 3030 mit dem Codex-Browser geprüft: Desktop und Mobile für `/de`, `/de/blog`, `/de/faq`, `/de/termine`, `/de/beteiligung/mitwirkung`, `/de/ansprechpersonen`, `/en`; zusätzlich Mobile-Menü.
- **Fix 1 — FeatureGrid:** `src/components/sections/FeatureGrid.tsx` rendert Desktop-Spalten jetzt nach `features.length`. Der Landing-Nutzenblock mit drei Features nutzt `lg:grid-cols-3` statt pauschal `lg:grid-cols-4`, sodass rechts keine leere Editorial-Spalte mehr stehen bleibt. Vierer-FeatureGrids bleiben vier-spaltig.
- **Fix 2 — Next Image:** `src/app/[locale]/page.tsx` ersetzt beim Hero-Bild das in Next 16 deprecierte `priority` durch `preload`. `TeamGrid` markiert das erste Mitglied als eager, `ContactCard` setzt für dieses erste Portrait `loading="eager"`; dadurch ist das above-the-fold-LCP-Portrait nicht mehr lazy.
- **Fix 3 — ESLint-Ignores:** `eslint.config.mjs` ignoriert jetzt `.claude/**`, `.playwright-cli/**` und `output/**`, weil lokale Agenten-/Playwright-Artefakte sonst beim globalen `pnpm lint` mitgeprüft werden.
- **Verifikation:** `pnpm typecheck` ✅, `pnpm lint` ✅, `pnpm build` ✅ (37/37 Pages SSG). Production-like Smoke mit `pnpm start --port 3031`: `/de`, `/de/ansprechpersonen`, `/de/blog`, `/de/beteiligung/mitwirkung`, `/en` jeweils HTTP 200. HTML-Smokes bestätigen `lg:grid-cols-3`, Hero-Image-Preload und erstes Portrait `loading="eager"`.

**Status am Ende:** Visual-QA-Fixes sind lokal production-validiert. Nächster Projektschritt bleibt Custom-Domain-DNS oder finale Impressum-/Datenschutztexte.

## 2026-05-11 — Session 24: Editorial-QA-Polish (Hero-Doppelungen aufgelöst, EN-Lokalisierung)

**Commits / Deploy-Basis:**
- `c39e69a` Session 24: Editorial-QA-Polish — Hero-Doppelungen + EN-Tags-Lokalisierung
- `d5eec0c` docs(vault): Session 24 Commit-SHA nachtragen
- Production-Deploy: `dpl_Bun3ouvV7wiDWL4uvj9TT2d8FrpH` READY via `pnpm dlx vercel@latest deploy --prod --yes` aus dem Hauptrepo (Remote-Build 30 s, Deploy 49 s). Öffentlicher Alias `https://smarte-theaterdienste-website.vercel.app` smoke-getestet auf `/de`, `/de/blog`, `/de/faq`, `/de/termine`, `/de/beteiligung/mitwirkung`, `/en`, `/en/faq`, `/sitemap.xml`, `/robots.txt` — alle HTTP 200; HTML zeigt die neuen lokalisierten Hero-Tags und die Editorial-ToC.

**Was passierte:**

- **Vault gelesen:** `START_HIER`, `DASHBOARD`, `PROBLEME`, `MUSTER`. Plugin-Skills `plugins/website-design-ultra/skills/{core-rules,ui-states}/SKILL.md` als Editorial-Referenz manuell konsultiert (Codex-Plugin lädt nicht als Claude-Skill, Inhalte aber lesbar).
- **Preview-Server im Worktree gestartet:** `pnpm install`, `.env.local` aus dem Hauptrepo kopiert (gitignored), `preview_start` auf Port 3000. Desktop 1440×900 und Mobile 375×812 für `/de`, `/de/blog`, `/de/faq`, `/de/termine`, `/de/beteiligung/mitwirkung`, `/de/ansprechpersonen`, `/en` durchgegangen.
- **Drei Editorial-Befunde identifiziert:**
  1. **Hero-Stat-Strip dupliziert Body-Copy 1:1** zu den direkt darunter folgenden Sections (`FeatureGrid` mit 3 Karten und `NetworkMapSection` mit 141er-Stat). Strip zeigte komplette Texte von „141 Institutionen …", „Effektivere Arbeitsprozesse. Einmal implementieren …" und „Höhere Reichweite. Maschinenlesbare …" — und dieselben Strings erschienen 50–200 px tiefer noch einmal mit eigener Headline.
  2. **„Use Case 03" stand 3× im Hero-Bereich**: linker Kicker `Datenraum Kultur · Use Case 3`, mittlerer Span `Use Case 03`, Bild-Caption-Mono `Use Case 03`.
  3. **EN-Hero zeigte deutschen Eigennamen** im zweiten Kicker-Span — `JSON · ORIF · Datenraum Kultur` war hartkodiert und wurde nicht über die Messages geführt.
- **Fixes in `src/app/[locale]/page.tsx`:**
  - Hero-Top-Rail von drei `<span>`-Slugs auf zwei reduziert (mittleres `Use Case 03` entfernt). Verbleibende Spans: `{t("kicker")}` links und `{t("tags")}` rechts.
  - Hero-Stat-Strip am Section-Footer komplett umgebaut: aus drei Volltext-Paragraphen wurde eine kompakte Editorial-ToC `<ol>` mit Mono-`01/02/03` und Feature-Titeln. Inhalt jetzt: `01 Effektivere Arbeitsprozesse`, `02 Höhere Reichweite`, `03 Größeres Netzwerk` (DE) bzw. `01 More efficient workflows`, `02 Greater reach`, `03 A larger network` (EN). Keine Body-Doppelung mehr mit `FeatureGrid` darunter.
- **Fix in i18n:**
  - `src/messages/de.json` und `src/messages/en.json` jeweils um den neuen Key `hero.tags` ergänzt. DE: `JSON · ORIF · Datenraum Kultur`, EN: `JSON · ORIF · Cultural Data Space`.
- **Verifikation:**
  - `pnpm typecheck` ✅, `pnpm lint` ✅, `pnpm build` ✅ (37/37 Pages SSG).
  - Preview-MCP-Snapshot zeigt auf `/de` Top-Rail `DATENRAUM KULTUR · USE CASE 3` + `JSON · ORIF · DATENRAUM KULTUR` und ToC `01/02/03 + Feature-Titel`. Auf `/en` zeigt Top-Rail `CULTURAL DATA SPACE · USE CASE 3` + `JSON · ORIF · CULTURAL DATA SPACE`.
  - `fetch('/de')` und `fetch('/en')` aus der Preview liefern HTML mit den neuen lokalisierten Strings (`includes`-Check beide `true`).
  - Mobile 375×812: Hero-Kicker bricht nur noch 2-zeilig statt 3-zeilig; ToC einspaltig vertikal.
- **Was NICHT geändert wurde:** Routing, Supabase-Queries, Content-JSONs, restliche Sections, ComicStrip, NetworkMap, PartnerMap, Cards. Keine neuen Abhängigkeiten, keine neuen Routen.

**Status am Ende:** Editorial-QA-Polish lokal production-validiert. Pflicht-Routine läuft anschließend (Push, Documents-Sync, Production-Deploy).

## 2026-05-11 — Session 23: Editorial-Redesign der gesamten Website

**Commits / Deploy-Basis:**
- `be7a9cc` M14: Editorial-Redesign im Zeitungsstil
- `05c1187` docs(vault): M14 Commit-SHA nachtragen
- Production-Deploy `dpl_9Rgyirirvb1tiyLXoAszvHTpZnav` READY via `pnpm dlx vercel@latest deploy --prod --yes`; öffentlicher Alias `https://smarte-theaterdienste-website.vercel.app` smoke-getestet (`/de`, `/de/blog`, `/de/faq`, `/de/termine`, `/en` HTTP 200). Direkte Deployment-URL ist geschützt und antwortet ohne Vercel-Auth mit 401.

**Was passierte:**

- **Vault + Design-Plugin gelesen:** Pflichtdateien `START_HIER`, `KONTEXT`, `DASHBOARD`, `PROBLEME`, `MUSTER`, `INHALTE` und zusätzlich `API.md` gelesen. Relevante Next.js-16-Dokumente aus `node_modules/next/dist/docs/` geprüft (`Layouts and Pages`, `CSS`, `Font Optimization`, `View Transitions`). Das User-Zip `website-design-ultra.zip` wurde als Design-Regelwerk gelesen: `core-rules`, `style-directions`, `color-palettes`, `typography`, `motion-system`, `component-patterns`, `ui-states`.
- **Design-Entscheidung:** Direktion `Editorial/Magazine`, aber nicht beige-dominiert: Papier/Tinte, Datenraum-Blau und Rubrik-Rot. Ziel: Kulturzeitung statt SaaS-Landingpage, mit smooth Reveals über bestehendes GSAP und Reduced-Motion-Fallback.
- **Globales Editorial-System:** `src/styles/tokens.css` ersetzt die bisherige Glow-/Surface-Sprache durch Papier/Tinte/Raster/Linien, Breakpoint-basierte Typografie ohne viewport-skalierte Fontgrößen und ohne negative Laufweite. `src/app/globals.css` bindet `font-serif`, reduziert Motion bei `prefers-reduced-motion`, ergänzt `.editorial-kicker`, `.editorial-rule`, `.editorial-copy` mit Drop-Cap und `.paper-panel`.
- **Typografie:** `src/app/[locale]/layout.tsx` lädt zusätzlich `Newsreader` via `next/font/google` als Display-Serif. Body bleibt Geist Sans, Headlines/Masthead/Editorial-Cover nutzen die Serif.
- **Website-weite UI-Umstellung:** Header wird zum Zeitungskopf mit Ausgabe/Dateline; Footer zum Zeitungsabschluss. Landing wird zur Frontpage mit Masthead-Rule, Lead-Story, Bildkasten und Infostreifen. `PageHero`, `TextSection`, `FeatureGrid`, `NetworkMapSection`, `ComicStrip`, `PostCard`, `EventCard`, `UseCaseCard`, `StepCard`, `ContactCard`, `FaqAccordion`, `PartnerMap`, `ResourceLinkGrid`, `PostArticle`, `PostCoverVisual` und `ComingSoonHero` wurden auf Linienraster, kleinere Radien, Serif-Hierarchie, Rubriklabels und weniger Card-Glow umgestellt.
- **Tooling-Fix:** `eslint.config.mjs` ignoriert `.vercel/**`, weil lokale Vercel-Build-Artefakte sonst den Projekt-Lint verschmutzen.
- **Verifikation:** `pnpm typecheck`, `pnpm lint`, `pnpm build` clean. Production-like Server `pnpm start --port 3030`; Playwright Desktop 1440×1000 und Mobile 390×844: `/de` ohne Horizontal-Overflow, Console 0 Errors/Warnings, Mobile-Menü funktioniert. Routencheck auf `/de/blog`, `/de/beteiligung/mitwirkung`, `/de/faq`, `/de/termine`, `/en`: jeweils H1 sichtbar, kein Horizontal-Overflow, Console 0 Warnings/Errors.

**Status am Ende:** Editorial-Redesign ist lokal production-validiert und auf dem öffentlichen Vercel-Alias live. Inhalte, Routing, Supabase-Queries und i18n-Keys bleiben kompatibel; nur `nav.edition` und `nav.dateline` wurden ergänzt. Nächster Projektschritt bleibt Custom-Domain-DNS oder finale Rechtstexte.

## 2026-05-11 — Session 22: Codex-Plugin Website Design Ultra

**Commits / Deploy-Basis:**
- `031bce9` Tooling: Codex-Plugin Website Design Ultra
- Kein Vercel-Deploy nötig: reine Tooling-/Plugin-Änderung, kein Website-Runtime-Code.

**Was passierte:**

- **ZIP geprüft:** User lieferte `/Users/kaygewinner/Library/Mobile Documents/com~apple~CloudDocs/Downloads/website-design-ultra.zip`. Inhalt war ein Claude-Plugin mit `.claude-plugin/plugin.json`, 7 Skills und 3 Commands.
- **Codex-Plugin angelegt:** Mit dem Codex-`plugin-creator`-Skill wurde ein repo-lokales Plugin-Skelett unter `plugins/website-design-ultra/` erzeugt. Die ZIP-Dateien wurden übernommen, `.claude-plugin` wurde nicht übernommen.
- **Manifest konvertiert:** Neues `plugins/website-design-ultra/.codex-plugin/plugin.json` mit `skills: "./skills/"`, echten Metadaten, Interface-Block, Default-Prompts und Kategorie `Design`.
- **Marketplace ergänzt:** Neue `.agents/plugins/marketplace.json` mit lokalem Marketplace `smarte-theaterdienste-local` und Plugin-Eintrag `website-design-ultra` (`source.path: "./plugins/website-design-ultra"`, `installation: AVAILABLE`, `authentication: ON_INSTALL`).
- **README angepasst:** Installation und Nutzung von Claude-spezifischen Pfaden auf Codex-Konventionen umgeschrieben. Die übernommenen `commands/*.md` sind als Workflow-Vorlagen dokumentiert.
- **Verifikation:** `python3 -m json.tool` validierte Plugin-Manifest und Marketplace. `find plugins/website-design-ultra -maxdepth 3 -type f` zeigt alle erwarteten Plugin-Dateien. Website-Code blieb unberührt; bestehende unstaged Website-Änderungen im Working Tree wurden nicht gestaged.

**Status am Ende:** `website-design-ultra` ist als repo-lokales Codex-Plugin vorbereitet. Nächster Website-Schritt bleibt Custom-Domain-DNS oder finale Rechtstexte.

## 2026-05-10 — Session 21: Supabase-Content-Audit + Production-Redeploy

**Commits / Deploy-Basis:**
- Kein neuer Code-Commit (Hauptrepo-Index war stale, kein Worktree-Diff).
- Production-Redeploy `dpl_27RdEi5zQuwELQLAUMZEM65rAvVs` (READY, target=production), Alias `https://smarte-theaterdienste-website.vercel.app`.

**Was passierte:**

- **Supabase-Content-Audit gegen alte Website:** User wollte Termine, Blog und FAQ aus `https://smarte-theaterdienste.de/de` in die Supabase einspielen. Live-Sitemap der alten Website + Crawls von `/de/faq`, `/de` und `/de/jetzt-mitmachen` zeigen, dass alle 21 FAQ-Einträge und alle vier 2025-Termine bereits in Session 18 (Migration `20260507153000_m11_original_site_content.sql`) übertragen wurden. Die alte Website hat keinen Blog (Sitemap listet nur `/`, `/konzeption`, `/material`, `/faq`, `/jetzt-mitmachen`, `/impressum`, `/datenschutz`, `/zugaenglichkeit`). Aktueller DB-Stand bestätigt per `supabase db query --linked`: 21 FAQs/42 FAQ-Translations, 6 Events (4 Original-2025-Events + 2 fiktive Seed-Demos), 3 fiktive Seed-Posts (`kickoff-datenraum-kultur`, `erste-pilotpartner-gewonnen`, `wip-konnektor-roadmap`).
- **Hauptrepo-Index repariert:** Vor dem User-Wunsch „commiten/pushen" lag im Hauptrepo `/Users/kaygewinner/Desktop/Claude code/smarte-theaterdienste-website` ein gefährlicher Zustand: 184 staged-deletions für quasi alle Projektdateien (`src/`, `SMARTE-THEATERDIENSTE/`, `package.json`, `next.config.ts`, alle Migrationen) durch eine verwaiste `.git/index.lock` von 2026-05-09 13:51. Working Directory war intakt; nur der Index war desynchron. Lock entfernt, `git restore --staged .` non-destruktiv gegen HEAD ausgeführt. Status danach clean (nur erwartete untracked-Items: `.claude/worktrees/`, `.playwright-cli/`, `output/`, ein paar Finder-Duplikate `* 2.ext`).
- **Production-Redeploy:** `pnpm dlx vercel@latest deploy --prod --yes` aus dem Hauptrepo. Remote-Build clean, Deploy `dpl_27RdEi5zQuwELQLAUMZEM65rAvVs` READY auf target=production.
- **Production-Smoke:** `/usr/bin/curl` gegen Vercel-Alias zeigt HTTP 200 für `/de`, `/de/blog`, `/de/faq`, `/de/termine`, `/en`, `/en/faq`, `/sitemap.xml`, `/robots.txt`. Inhalts-Check: FAQ-Seite zeigt „Wie werden unsere Spielpläne maschinenlesbar", „Wozu maschinenlesbare Theaterspielpläne", „Was ist der Datenraum Kultur"; Termine-Seite zeigt alle vier Original-Events („Jahrestagung Bühnenverein", „DataWeek Symposium", „Theatertreff Berlin", „Abschlussforum"). Custom Domain `https://smarte-theaterdienste.de/de` zeigt weiterhin alte Inhalte (DNS-A-Records nicht auf Vercel).

**Status am Ende:** Supabase-Stand ist gegenüber alter Website vollständig (FAQ + Termine in M11 erledigt, Blog existiert auf alter Site nicht). Drei fiktive Seed-Posts und zwei fiktive Seed-Events bleiben in der DB als Demo-Inhalte stehen — Entscheidung User offen, ob sie raus sollen oder durch echte Rückblick-Posts zu den 2025-Events ersetzt werden. Hauptrepo-Index repariert, Production-Redeploy `dpl_27RdEi5zQuwELQLAUMZEM65rAvVs` live.

## 2026-05-08 — Session 20: M13 Miro-Board-QA und Deutschlandkarten-Polish

**Commits / Deploy-Basis:**
- `724b3c7` M13: Miro-QA und Deutschlandkarten-Polish
- `6f9e2ba` docs(vault): M13 Live-Deploy-Status dokumentieren
- Production-Deploy `dpl_Cok3G8hfHbU7kDvf4k8HHHj6MYX3` via prebuilt output, Alias `https://smarte-theaterdienste-website.vercel.app`

**Was passierte:**

- **Vault + Miro gelesen:** Pflichtdateien `START_HIER`, `KONTEXT`, `DASHBOARD`, `PROBLEME`, `MUSTER`, `INHALTE` und relevante Next.js-16-Dokumente geprüft. Das Miro-Board `Website DRK` als höhere Inhaltspriorität ausgewertet: interaktive Deutschlandkarte, klarere Nutzenargumente, Schritt-für-Schritt-Orientierung für KBB/Kommunikation/IT und Webagentur-Anforderungen.
- **Live-/Domain-Befund:** `https://smarte-theaterdienste.de/de` zeigt aktuell noch alte Inhalte und DNS-A-Records außerhalb von Vercel. Änderungen aus diesem Repo werden dort erst sichtbar, wenn die Custom Domain auf das Vercel-Projekt zeigt. Der Vercel-Alias war beim Test außerdem noch stale gegenüber Session 19/20 und muss nach Push/Redeploy erneut geprüft werden.
- **Mitwirkungsseite geschärft:** `src/content/{de,en}/beteiligung-mitwirkung.json` um einen Nutzenblock gegen manuelles Copy-and-paste und eine konkrete Webagentur-/IT-Checkliste ergänzt. `src/app/[locale]/beteiligung/mitwirkung/page.tsx` rendert die neuen Inhalte als drei Icon-Nutzenkarten und einen Implementierungsblock.
- **Deutschlandkarte verbessert:** `src/components/sections/PartnerMapClient.tsx` macht die Karte auf Desktop kompakter, färbt Marker nach Status, ergänzt eine sichtbare Legende, Standortzähler und eine klickbare Standortliste im Initialzustand. `src/messages/{de,en}.json` ergänzt die nötigen Labels.
- **Verifikation:** `pnpm typecheck`, `pnpm lint`, `pnpm build` clean (37/37 Pages). Production-like Smoke auf `pnpm start --port 3032`: `/de`, `/de/beteiligung/mitwirkung`, `/en/participation/contribute`, `/de/faq`, `/de/termine`, `/de/blog`, `/de/impressum`, `/de/datenschutz` HTTP 200. Playwright Desktop/Mobile: Deutschlandkarte sichtbar, Marker/Legende/Liste funktionieren, Console 0 Errors/Warnings.
- **Production-Deploy:** `main` wurde bis `6f9e2ba` gepusht. Vercel Production hatte `NEXT_PUBLIC_SITE_URL` leer gesetzt; das verursachte lokal bei `vercel build --prod` `TypeError: Invalid URL`. Variable per CLI auf `https://smarte-theaterdienste-website.vercel.app` korrigiert, dann `pnpm dlx vercel@latest build --prod --yes` und `pnpm dlx vercel@latest deploy --prebuilt --prod --yes` erfolgreich. Deploy `dpl_Cok3G8hfHbU7kDvf4k8HHHj6MYX3` ist READY.
- **Production-Smoke:** Vercel-Alias `/de`, `/de/beteiligung/mitwirkung`, `/de/blog`, `/de/termine`, `/en/participation/contribute` jeweils HTTP 200. `/de/beteiligung/mitwirkung` enthält `Warum mitmachen?`, `Was die Webagentur konkret braucht`, `Termine` und die Kartenlegende. Custom Domain `https://smarte-theaterdienste.de/de` liefert weiterhin die alte Website von den alten A-Records.

**Status am Ende:** Miro-Prioritäten für die Mitwirkungsseite sind umgesetzt und auf dem Vercel-Alias production-live. Offen bleiben Custom-Domain-DNS und finale Impressum-/Datenschutztexte.

## 2026-05-08 — Session 19: M12 Website-QA und UX-Polish

**Commits / Deploy-Basis:**
- `e927a90` M12: Website-QA und UX-Polish

**Was passierte:**

- **Vault + Next.js-16-Docs gelesen:** `START_HIER`, `KONTEXT`, `DASHBOARD`, `PROBLEME`, `MUSTER`, `INHALTE` und wegen Live-Daten/FAQ/Termine zusätzlich `API.md`. Relevante Next.js-16-Dokumente aus `node_modules/next/dist/docs/` gelesen: Linking/Navigating, Images, View Transitions, Accessibility und Production Checklist.
- **Website als Tester geprüft:** Playwright-CLI gegen lokale Site und production-like Build. Geprüft wurden 28 DE/EN-Routen auf HTTP-Status, H1, Console, Horizontal-Overflow, sichtbare TODOs und Bildzustände; zusätzlich Hero-CTA, LanguageSwitcher mit lokalisierten Slugs, Blog-Liste → Detail → zurück, FAQ-Accordion, PartnerMap-Auswahl, ComicStrip-Animation und Mobile-Menü.
- **Navigation/Orientierung verbessert:** `Termine` ist jetzt in Desktop-Header und MobileNav sichtbar. Header-/LanguageSwitcher-Breakpoints wurden von `md` auf `lg` verschoben, damit die erweiterte Navigation auf Tabletbreiten nicht gedrängt wirkt. Footer hat jetzt eine echte Sitemap-Navigation (Projekt, Beteiligung, Blog, Termine, FAQ, Ansprechpersonen) plus Legal-Links.
- **Mobile-Menü-A11y gefixt:** Radix meldete im Test `Missing Description or aria-describedby`. `MobileNav` importiert und rendert jetzt eine `SheetDescription` mit i18n-Text (`nav.menuDescription`) als `sr-only`. Production-like Smoke danach: Console 0 Warnings/Errors.
- **Blog optisch stabilisiert:** Neuer `PostCoverVisual`-Fallback für Posts ohne `cover_image_url`. Blogkarten und Blogdetails bekommen jetzt ein visuelles CSS-Cover mit Datum, ORIF-Marker, Grid/Glow-Hintergrund und demselben `ViewTransition`-Namen pro Slug. Echte Blog-Cover-Bilder bleiben optionaler Asset-Polish, aber die Seiten wirken nicht mehr textlastig.
- **Legal-Seiten vervollständigt:** `impressum/page.tsx` und `datenschutz/page.tsx` geben die vorhandenen `pages.*.lead`-Texte wieder an `PageHero` weiter. Die TODO-Platzhalter bleiben bewusst sichtbar, bis finale Rechtstexte vom Auftraggeber geliefert werden.
- **Verifikation:** `pnpm typecheck`, `pnpm lint`, `pnpm build` clean (37/37 Pages). `pnpm start --port 3032` Smoke: `/de`, `/de/blog`, `/de/blog/erste-pilotpartner-gewonnen`, `/de/termine`, `/de/impressum`, `/en/events` HTTP 200, kein Horizontal-Overflow. Header/Mobile/Footer enthalten `Termine`; Blog-Fallbacks sichtbar (`ORIF` x2 auf Liste); Mobile-Sheet 0 Console-Warnings/Errors.
- **Post-Push-Production-Smoke:** `https://smarte-theaterdienste-website.vercel.app/{de,de/blog,de/termine,en/events}` jeweils HTTP 200; neue Navigation (`Termine`) sichtbar. Beobachtung: `/de/blog` blieb zuletzt als `x-vercel-cache: HIT` ohne `PostCoverVisual`-Fallback im Production-HTML. Revalidate-POST fuer `posts` lieferte `revalidated: true` mit Blog- und Sitemap-Pfaden, der CDN/ISR-HTML-Cache zeigte direkt danach aber weiter den alten Blog-Card-HTML-Stand. Als Restposten in `PROBLEME.md` eingetragen.

**Status am Ende:** Website-QA-Funde sind umgesetzt. Offen bleiben finale Impressum-/Datenschutztexte, Custom-Domain-DNS und optional echte Blog-Cover-Bilder als Asset-Finish.

## 2026-05-07 — Session 18: M11 Original-Site-Transfer – DACH-Karte, ORIF-Materialien, FAQ

**Commits / Deploy-Basis:**
- `c3a2245` M11: Original-Site-Inhalte uebertragen

**Was passierte:**

- **Vault + Originalseite gelesen:** Pflichtdateien `START_HIER`, `KONTEXT`, `DASHBOARD`, `PROBLEME`, `MUSTER`, `INHALTE` gelesen; wegen Supabase-FAQ/Termine zusätzlich `API.md`. Next.js-16-Docs zu App-Router Pages und Images geprüft. Alte Website `https://smarte-theaterdienste.de/de` war wieder erreichbar und wurde über `/de`, `/de/konzeption`, `/de/material`, `/de/faq`, `/de/jetzt-mitmachen` gecrawlt; zusätzlich Bühnenverein-Seite und ORIF-Doku geprüft.
- **Landing erweitert:** Neue `FeatureGrid`-Sektionen für die alten Nutzenblöcke ("Effektivere Arbeitsprozesse", "Höhere Reichweite", "Größeres Netzwerk") und Stakeholder-Vorteile (Theaterleitung, PR/Marketing, Künstlerisches Betriebsbüro, Developer/Agenturen). Neue `NetworkMapSection` zeigt die DACH-Netzwerkkarte aus dem alten Sanity-CDN mit 141er-Statistik und Segmenten (51 interessierte Theater/Opernhäuser, 30 erweitertes Netzwerk, 30 Länder/Kommunen/Verbände, 30 Archive/Software/Ticketing/Plattformen).
- **Technische Standards ergänzt:** ORIF als Open Repertoire Interchange Format präzisiert, Schema.org + GND ergänzt, Werkdaten/Aufführungsdaten erklärt. Neue `ResourceLinkGrid` mit Comic-Clip, Infomaterial, Musterkalkulation, ORIF-Dokumentation, Validator und Lektoratstool.
- **Mitwirkung erweitert:** Zwei-Step-Ansatz durch alten Drei-Punkte-Plan "Implementieren / Automatisieren / Revolutionieren" ersetzt und Tanzarchiv-Leipzig-Zitat ergänzt.
- **Portraits aus alter Website:** `ContactCard` rendert jetzt echte Portraits via `<Image>`; vier Ansprechpersonen-Portraits aus dem alten Sanity-CDN in `team.json` DE/EN eingebunden. Accessibility-Fix: `aria-label="Foto folgt"` bleibt nur beim Fallback, nicht bei echten Bildern.
- **Supabase-Content-Migration:** Neue Migration `20260507153000_m11_original_site_content.sql` live gepusht. Ergebnis: 21 veröffentlichte FAQ-Einträge, 42 FAQ-Translations, 4 Original-Website-Termine von 2025 als `past` Events (`Jahrestagung Bühnenverein`, `DataWeek Symposium`, `Theatertreff Berlin`, `Abschlussforum Datenraum Kultur`). Kontrollqueries direkt gegen Remote-DB grün.
- **Next Image RemotePattern:** `next.config.ts` erlaubt das alte Sanity-CDN (`cdn.sanity.io/images/lc7slax2/production/**`) für DACH-Karte und Portraits, ohne neue Binärdateien ins Repo zu legen.
- **Verifikation:** JSON-Parse OK, `pnpm typecheck`, `pnpm lint`, `pnpm build` clean (37/37 Pages). Playwright: `/de`, `/de/projekt/technische-standards`, `/de/faq`, `/de/ansprechpersonen`, Mobile 375×812 ohne Horizontal-Overflow, Console 0 Errors/Warnings. Curl-Smokes: `/de/termine` enthält alle 4 alten Events, `/en/project/technical-standards` enthält Ressourcen, `/en/faq` enthält neue FAQ-Fragen.

**Status am Ende:** Original-Website-Inhalte sind in den wichtigsten sichtbaren Bereichen nachgezogen. Offen bleiben finale Legal-Texte, Blog-Cover-Bilder und Custom Domain. M11 wartet nach Push auf Vercel-Auto-Deploy-Validierung.

## 2026-05-07 — Session 17: M10 Design-Refresh – Tokens, Hero-Visual, ComicStrip mit echten Bildern, Footer-Logos

**Commits / Deploy-Basis:**
- `6435528` M10: Design-Refresh – Hero-Visual, ComicStrip mit echten Bildern, Footer-Logos, Tokens
- `bfb3c06` docs(vault): Session-17 Commit-SHA nachtragen
- Production-Deploy `dpl_CdZyBYew1ESqpqqASWwnoxmE1xLB` (manuell, weil Auto-Deploys mehrfach „Canceled" wurden — vermutlich durch nachfolgende Pushes auto-cancelled). Smoke-Test gegen `https://smarte-theaterdienste-website.vercel.app`: 14 Pfade/Assets alle HTTP 200, HTML enthält die neuen Referenzen auf `theater-parade.jpg`, `comic-strip/frame-{1-zeit,2-bescheid,3-verbindungen}.jpg` und `logos/*.png`.

**Was passierte:**

- **Asset-Lieferung vom User**: 50er-Jahre-Schwarzweiß-Comic-Frames (Mann am Telefon, lila Sprechblasen „Ja, ich habe Zeit." / „Alle wissen Bescheid." / „Ich hab Verbindungen ohne Ende."), Theater-Parade-Foto und 7 Partner-Logos (Bühnenverein, Akademie, Fraunhofer, acatech, NFDI4Culture, BKM, Hamburg) aus dem alten Smarte-Theaterdienste-Site.
- **Asset-Pfade:** `public/comic-strip/frame-{1-zeit,2-bescheid,3-verbindungen}.jpg`, `public/hero/theater-parade.jpg` (AVIF→JPG via `sips`), `public/logos/{buehnenverein,akademie,fraunhofer,acatech,nfdi4culture,bkm,hamburg}.png`.
- **Tokens-Refresh** (`src/styles/tokens.css`): Sekundärakzent „Bühnen-Magenta" `oklch(0.58 0.20 345)` (von Bühnenverein-Logo + Comic-Sprechblasen), Surface-Skala `--surface-{base,1,2,elevated}`, Glow-Tinten `--glow-{blue,magenta}` via `color-mix(in oklch, ...)`, Schatten-System `--shadow-{xs,sm,md,lg}`, Letter-Spacing-Tokens `--tracking-{display,heading}`. Display-Typo skaliert jetzt bis 5.5rem (vorher 5rem), `--space-5xl: 12rem` ergänzt.
- **Tailwind-Bridge** (`globals.css`): `--color-accent-secondary*` und `--color-surface-{1,2,elevated}` an `@theme inline` gebunden. Neue Utility-Klassen `.bg-grid-pattern` (radial-mask Grid 64×64 px) und `.bg-noise` (data-uri SVG turbulence) für dekorative Hintergründe.
- **Hero komplett neu** (`src/app/[locale]/page.tsx`): Layered Background mit Surface-Wash + Grid-Pattern + zwei Glow-Blobs (Datenraum-Blau rechts oben, Magenta links unten, beide `blur-3xl`). Zwei-Spalten-Layout (Text links / Theater-Parade-Polaroid rechts) auf `lg`, gestackt auf Mobile. Polaroid hat dezenten Magenta/Blau-Gradient-Glow im Hintergrund, Caption-Footer mit „Use Case 03". Bullet-Kicker, größere Display-Typo mit `--tracking-display`. Ghost-Variant für „So funktioniert's"-CTA mit `→`-Pfeil. Neue Messages `hero.heroImageAlt` / `hero.heroImageCaption` in DE+EN.
- **ComicStrip mit echten Bildern** (`src/components/sections/ComicStrip{,Frames}.tsx`): 3 statt 4 Frames (passend zu den 3 Telefon-Szenen). `landing.json` umgestellt auf `{image, alt, title, caption}`-Schema. Frames sind jetzt `rounded-2xl` Cards mit echtem `<Image>` (`fill`, optimiert), Frame-Number-Pill (01/02/03) als white-bg Badge im Bild, Title + Caption-Body, sanftes Bild-Zoom (1.04) on Hover. Magenta-Eyebrow mit Bullet, Surface-1-Wash am Section-Top.
- **PageHero/TextSection-Refresh**: PageHero bekommt dasselbe Layered-Background-Pattern wie der Landing-Hero (Surface-Wash + Glow-Blob), Bullet-Kicker. TextSection nutzt Sticky-Sidebar-Heading (`lg:sticky lg:top-[calc(var(--header-height)+2rem)]`), klarere Hierarchie zwischen Eyebrow, Heading und Body.
- **Cards einheitlich** (`PostCard`/`EventCard`/`UseCaseCard`/`StepCard`/`ContactCard`): `rounded-2xl`, `bg-[var(--surface-elevated)]`, `border-border/70`, `shadow-[var(--shadow-xs)]`, einheitliche Hover-Lift (`-translate-y-0.5` + `hover:shadow-[var(--shadow-md)]` + `hover:border-foreground/20`), `motion-reduce:`-Modifier konsequent. Pro Card-Type:
  - **PostCard**: Cover-Image mit `1.04`-Zoom auf Hover, Lese-Mehr-Pfeil mit `translate-x-0.5`-Animation.
  - **EventCard**: neuer Date-Badge (Day + Month-Short als kleines, eingerahmtes Quadrat in Akzent-Tint).
  - **UseCaseCard**: Icon-Container mit Glow-Halo (subtle blur-md hinter dem `rounded-2xl`-Icon-Bg), `ring-1 ring-[var(--accent-brand)]/15`.
  - **StepCard**: ersetzt runde Step-Number-Badge durch Mono-Label „Step 01" — minimalistischer und besser zur Schnittstellen-Sprache passend.
  - **ContactCard**: `Phone`/`Mail`-Icons aus `lucide-react`, Magenta-Quote-Border (`border-l-2 border-[var(--accent-secondary)]/60`), Surface-Gradient-Fallback statt grauer Box für fehlende Portraits.
- **Footer mit echten Logos** (`src/components/layout/Footer.tsx`): Text-Fallback durch echte `<Image>`-Komponenten ersetzt (6 Logos im Grid, `object-contain`, `opacity-70 hover:opacity-100`-Schema). Surface-1-Background, dezenter Top-Gradient als visuelle Trennung. Bullet-Eyebrow „Gefördert von".
- **Header polish** (`src/components/layout/Header.tsx`): ST-Initial-Badge im Logo (`rounded-md` Akzent-Bg mit Mono-Schrift), `backdrop-blur-md` (statt `backdrop-blur`).
- **ComingSoonHero** (`src/components/sections/ComingSoonHero.tsx`): dasselbe Layered-Background-Pattern wie PageHero/Landing-Hero, Bullet-Kicker. Konsistente Visual-Sprache projektweit.
- **Verifikation:** `pnpm typecheck` clean, `pnpm lint` clean, `pnpm build` clean (37/37 Pages SSG/ISR). Preview-MCP grün auf `/de` (Hero mit Theater-Parade, ComicStrip mit 3 echten Bildern + lila Sprechblasen, Pitch-Section), `/de/beteiligung/anwendungsbeispiele` (3 UseCaseCards), `/de/beteiligung/mitwirkung` (StepCards 01/02 mit Mono-Labels), `/en` (alle EN-Strings rendern, „CULTURAL DATA SPACE · USE CASE 3"-Kicker). Mobile (375×812): kein Horizontal-Overflow, Stacked-Layout sauber, Glow-Blobs sichtbar. Console 0 Errors / 0 Warnings. Cache-Reset (`rm -rf .next`) war nötig zwischendrin, weil Turbopack vom Vortag stale-Cache hatte und nested-Routes als 404 zurückgab.

**Status am Ende:** Design-Refresh komplett — die Site hat jetzt eine modern-cleane, kulturaffine Visual-Sprache mit echten Bildern statt Platzhaltern: Theater-Parade als Hero-Visual, 3 Schwarzweiß-Telefon-Frames als ComicStrip-Story, 6 Partner-Logos im Footer. Tokens-System ist erweitert und konsistent. Mobile responsive ohne Overflow. Restposten aus [[GO_LIVE_CHECKLIST]] bleiben: Portraits Sophie Moriarty, Blog-Cover-Bilder, Custom-Domain-DNS, finale Impressum-/Datenschutz-Texte.

## 2026-05-07 — Session 16: M9 PWA-Manifest, Per-Post-OG, Lighthouse-CI

**Commits / Deploy-Basis:**
- `1e3f325` M9: PWA-Manifest, Per-Post-OG-Images, Lighthouse-CI — erster Push nach reaktivierter Vercel-GitHub-Integration, Auto-Deploy erwartet.

**Was passierte:**

- **Vercel-GitHub-Integration:** User hat im Vercel-Dashboard die Verbindung wiederhergestellt. Restposten aus DASHBOARD damit erledigt; Push auf `main` triggert ab jetzt automatischen Production-Build.
- **Scope-Entscheidung:** Kombi aus drei optionalen M8-Erweiterungen, die ohne User-Assets/Texte umsetzbar sind: PWA-Manifest, Per-Post-OG-Images, Lighthouse-CI als GitHub-Action.
- **PWA-Manifest:** Neuer Top-Level-Handler `src/app/manifest.ts` rendert `/manifest.webmanifest` als `MetadataRoute.Manifest`. `name`/`short_name`/`description` aus `messages/de.json` (Default-Locale, da Manifest nicht locale-prefixed ist), `theme_color: #2660d8` (Datenraum-Blau), `background_color: #ffffff`, Icons aus existierendem `/icon` (32×32) + `/favicon.ico`. `display: standalone`. Layout fügt `<link rel="manifest">` automatisch ein (Next.js Metadata Convention).
- **Per-Post-OG-Image:** Neuer Handler `src/app/[locale]/blog/[slug]/opengraph-image.tsx` mit denselben Satori-Patterns wie Top-Level-OG (`display: flex`, Hex-Farben statt OKLCH, siehe MUSTER.md). Liest Post via `getPostBySlug(slug, locale)`, rendert Title (max 1040px-Breite, fontSize 80) + lokalisiertes `published_at` (Locale-Format `de-DE` / `en-US`). Bei fehlender Supabase-Env oder unbekanntem Slug Fallback auf `siteName`. `coverImageUrl`-Override im `generateMetadata` der Page bleibt: hat ein Post ein echtes Cover, gewinnt das; sonst nimmt Next.js automatisch das hier generierte Per-Post-OG.
- **Twitter-Card-Bug-Fix:** Beim Verifizieren entdeckt — `[locale]/blog/[slug]/page.tsx` setzte `twitter`-Object ohne `card`, daher fiel die Page auf Layout-Default zurück, der wiederum von Next.js auf `summary` reduziert wurde (Layout-`twitter` wird von Page-`twitter` komplett überschrieben). Fix: `card: "summary_large_image"` explizit auch in der Page setzen. Verifiziert über curl: `<meta name="twitter:card" content="summary_large_image"/>`.
- **Lighthouse-CI:** Neuer Workflow `.github/workflows/lighthouse.yml` (Trigger: `workflow_dispatch` + Cron Mo 06:00 UTC) plus Config `.github/lighthouserc.json`. Läuft `treosh/lighthouse-ci-action@v12` gegen 6 Production-URLs (DE-Landing/Blog/Blog-Detail/Mitwirkung/FAQ + EN-Landing). Asserts: Performance ≥0.9 warn, Accessibility ≥0.95 error, Best-Practices ≥0.9 warn, SEO ≥0.95 error. `temporaryPublicStorage: true` hostet Reports öffentlich für 7 Tage, kein eigener LHCI-Server nötig. Bewusste Entscheidung gegen Push-Trigger: würde mit Vercel-Auto-Deploy in Race-Condition geraten und gegen alten Stand laufen.
- **Verifikation:** `pnpm typecheck` clean, `pnpm lint` clean, `pnpm build` clean — neue Routen `/manifest.webmanifest` (○ Static), `/-/opengraph-image` (ƒ Dynamic), `/-/blog/-/opengraph-image` (ƒ Dynamic). Dev-Server (Port 3000): `/manifest.webmanifest` → 200 mit `application/manifest+json`, valides JSON; `/de/blog/erste-pilotpartner-gewonnen/opengraph-image` → 200 PNG 1200×630 (66.5 kB, Body-Stream sauber); `/en/blog/kickoff-datenraum-kultur/opengraph-image` → 200 PNG 1200×630 (83.7 kB); Top-Level `/de/opengraph-image` → 200 PNG 1200×630 (86.9 kB). HTML der Blog-Detail enthält `<link rel="manifest">`, `og:image` zeigt auf Per-Post-Pfad mit `og:image:width=1200`/`og:image:height=630`, `twitter:card=summary_large_image`. Keine Server-Errors.

**Status am Ende:** Drei M8-Erweiterungen umgesetzt. Auto-Deploy via Vercel-GitHub-Integration soll beim nächsten Push starten — wird mit dieser Session direkt validiert.

## 2026-05-07 — Session 15: Asset-/Go-live-Handoff

**Commits / Deploy-Basis:**
- `9abdbe0` M9: Asset- und Go-live-Handoff

**Was passierte:**

- **Vault- und Projektcheck:** `START_HIER`, `KONTEXT`, `DASHBOARD`, `PROBLEME`, `MUSTER`, `INHALTE`, `CHANGELOG` und `ENTSCHEIDUNGEN` gelesen. Zusaetzlich Projektstruktur, `public/`, Team-/Legal-Content, Blog-Cover-Pfade, Footer-Logo-Fallback, Supabase-Seed und `next.config.ts` geprueft.
- **Aktuelle externe Quellen verifiziert:** Vercel-Dokumentation zu GitHub-Integration, fehlenden GitHub-Repos, Custom Domains/DNS und Environment Variables geprueft; fuer Legal-Hinweise `§ 5 DDG` und Art. 13 DSGVO gegen aktuelle Quellen abgeglichen.
- **Go-live-Handoff:** Neue `GO_LIVE_CHECKLIST.md` im Vault angelegt. Sie dokumentiert konkrete Lieferpfade und Anforderungen fuer Hero-Visual, Blog-Cover-Bilder, Team-Portraits und Partner-Logos; ausserdem Schritte fuer Vercel-GitHub-Integration, Custom Domain/DNS, `NEXT_PUBLIC_SITE_URL`-Folgearbeiten, Supabase-`cover_image_url`-Pflege und finale Impressum-/Datenschutztexte.
- **Legal-Platzhalter aktualisiert:** `src/content/de/legal.json` und `src/content/en/legal.json` verweisen im Impressum-Hinweis jetzt auf `§ 5 DDG` statt `§ 5 TMG`. Die Seiten bleiben bewusst TODO-Platzhalter, bis der Auftraggeber finale Texte liefert.
- **Vault aktualisiert:** `START_HIER.md` verlinkt die neue Checkliste; `KONTEXT.md`, `DASHBOARD.md` und `PROBLEME.md` dokumentieren den neuen Handoff-Stand.
- **Verifikation:** JSON-Parse, `pnpm typecheck`, `pnpm lint`, `pnpm build`.

**Status am Ende:** Technischer Produktionsstand bleibt unveraendert live. Naechster echter Umsetzungsschritt ist blockiert durch User-Lieferungen: Assets, Vercel-GitHub-Freigabe, Domain-Entscheidung/DNS und finale Rechtstexte.

## 2026-05-07 — Session 14: M8 Sitemap-Lastmod-Polish

**Commits / Deploy-Basis:**
- `37d80ca` M8: Sitemap-Lastmod und Sitemap-Revalidate
- Production-Deploy: `dpl_FH5hja9zd9E81kigJt7vZYi5q5yw`

**Was passierte:**

- **Vault- und Pattern-Check:** `START_HIER`, `KONTEXT`, `DASHBOARD`, `PROBLEME`, `MUSTER`, `INHALTE`, `API` gelesen. Zusätzlich relevante Next.js-16-Dokumentation aus `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/sitemap.md`, `01-app/03-api-reference/04-functions/revalidatePath.md` und `01-app/02-guides/how-revalidation-works.md` geprüft.
- **Scope-Entscheidung:** Der Dashboard-Default bleibt echte Assets/Cover-Bilder. Da im Repo aktuell keine gelieferten Assets vorhanden sind (`public/` enthält nur Standard-SVGs + `maps/germany.svg`), wurde der kleinste unblockierte technische Restposten aus den optionalen M8-Erweiterungen umgesetzt.
- **Sitemap-Lastmod:** `src/app/sitemap.ts` nutzt nicht mehr pauschal `new Date()`. Statische Seiten bekommen ein stabiles `STATIC_CONTENT_LAST_MODIFIED`, Blog-Liste und Blog-Detail-URLs bekommen echte `published_at`-Werte aus Supabase. Blog-Detail-URLs werden über `getPathname()` erzeugt, damit die i18n-Routing-Schicht Quelle der Wahrheit bleibt.
- **Supabase-Query:** `src/lib/supabase/queries.ts` ergänzt `PostSitemapEntry` und `listPublishedPostSitemapEntries()` (`slug`, `published_at`, `status='published'`, sortiert absteigend).
- **Revalidate:** `src/app/api/revalidate/route.ts` nutzt strukturierte Revalidate-Targets statt Tupeln und invalidiert bei `posts` / `post_translations` zusätzlich `/sitemap.xml`. Ein gültiger Revalidate-Smoke für `posts` liefert jetzt `["/[locale]/blog:page","/[locale]/blog/[slug]:page","/sitemap.xml"]`.
- **Verifikation lokal:** `pnpm typecheck`, `pnpm lint`, `pnpm build` clean. `pnpm start --port 3030` + `/usr/bin/curl /sitemap.xml` zeigt Blog-`lastmod` aus Supabase: `erste-pilotpartner-gewonnen` → `2026-04-02T09:00:00+00:00`, `kickoff-datenraum-kultur` → `2026-03-15T10:00:00+00:00`; `/de/blog` HTTP 200; falsches Revalidate-Secret bleibt HTTP 401.
- **Production-Deploy + Smoke:** `pnpm dlx vercel@latest deploy --prod --yes` erfolgreich: Deploy `dpl_FH5hja9zd9E81kigJt7vZYi5q5yw`, Alias `https://smarte-theaterdienste-website.vercel.app`. Production-`/sitemap.xml` zeigt dieselben Blog-`lastmod`-Werte; `/de/blog` und `/en/blog/erste-pilotpartner-gewonnen` HTTP 200; Revalidate-POST fuer `posts` liefert `"/sitemap.xml"` in `paths`.

**Status am Ende:** Sitemap-Lastmod-Polish ist production-live. Nächster sinnvoller Schritt bleibt Asset-Lieferung/-Einbau: Hero-Visual, Blog-Cover-Bilder, Portraits und Partner-Logos.

## 2026-05-07 — Session 13: M7 EN-Quality-Review

**Commits / Deploy-Basis:**
- `84b743b` M7: EN-Quality-Review und Blog-Translations

**Was passierte:**

- **Vault- und Pattern-Check:** `START_HIER`, `KONTEXT`, `DASHBOARD`, `PROBLEME`, `MUSTER`, `INHALTE`, `API` gelesen. Zusätzlich relevante Next.js-16-Docs aus `node_modules/next/dist/docs/01-app/02-guides/internationalization.md` und `01-getting-started/06-fetching-data.md` geprüft.
- **Strukturvergleich i18n:** Node-Check auf `messages/{de,en}.json` und alle `src/content/{de,en}/*.json`: keine fehlenden oder zusätzlichen Keys. JSON-Parse für `src/messages/en.json` und 9 EN-Content-Dateien OK.
- **EN-Copy-Review:** Punktuelle Glättungen in `src/messages/en.json` und `src/content/en/{landing,projekt,projekt-technische-standards,projekt-semantische-standards,beteiligung,beteiligung-anwendungsbeispiele,beteiligung-mitwirkung,team}.json`. Keine Routing-/Komponentenänderungen.
- **Supabase-Translations:** Live-DB-Check zeigte `{de}` für `erste-pilotpartner-gewonnen` und `{NULL}` für `wip-konnektor-roadmap`. Neue Migration `supabase/migrations/20260507120000_m7_english_post_translations.sql` ergänzt/aktualisiert `post_translations`: `kickoff-datenraum-kultur` EN geglättet, `erste-pilotpartner-gewonnen` EN ergänzt, Draft `wip-konnektor-roadmap` DE/EN ergänzt. `supabase/seed.sql` synchronisiert denselben Stand.
- **Cloud-Migration:** `pnpm exec supabase db push --yes` erfolgreich. Kontrollquery danach: alle drei Posts `kickoff-datenraum-kultur`, `erste-pilotpartner-gewonnen`, `wip-konnektor-roadmap` haben `{de,en}`.
- **Verifikation lokal:** `pnpm typecheck`, `pnpm lint`, `pnpm build` clean. Build generiert 36/36 Pages und jetzt auch `/en/blog/erste-pilotpartner-gewonnen`.
- **Production-Deploy:** `pnpm dlx vercel@latest deploy --prod --yes` erfolgreich:
  - Deploy-ID: `dpl_Cqvw9ssuYNY1eiFjSfwMMifE4ibe`
  - Build-URL: `https://smarte-theaterdienste-website-bs6r7bz5q-kaytm93s-projects.vercel.app`
  - Alias: `https://smarte-theaterdienste-website.vercel.app`
- **Production-Smoke:** `/en/contact-persons`, `/en/participation/contribute`, `/en/blog`, `/en/blog/erste-pilotpartner-gewonnen` jeweils HTTP 200 über `/usr/bin/curl`; HTML enthält die neuen EN-Texte und den zweiten EN-Blogpost.

**Status am Ende:** M7 ist production-validiert. Nächster sinnvoller Schritt: echte Assets und Cover-Bilder einpflegen, damit Hero/Team/Footer und ViewTransition-Morphs visuell final werden.

## 2026-05-07 — Session 12: M6 Production-Validation

**Commits / Deploy-Basis:**
- `7f3ad43` docs(vault): CHANGELOG mit Session-11-Commit-SHA verlinken (Production-Deploy-Basis; enthält M6-Code über `860a761`)
- `17a7155` M6 deploy: Animation-Polish production-validiert

**Was passierte:**

- **Pre-Deploy-Gates:** `pnpm typecheck`, `pnpm lint`, `pnpm build` jeweils clean. Build lokal mit Next.js 16.2.4 / Turbopack; `experimental.viewTransition` aktiv; 36/36 statische Pages generiert, Blog/FAQ/Termine/Mitwirkung weiter ISR (`1m / 1y`).
- **Production-Deploy:** `pnpm dlx vercel@latest deploy --prod --yes` aus dem Projekt-Root. Remote-Build clean in Vercel (`iad1`), Build-Cache aus Deploy `dpl_Fa2MYm6iZJYfPygJHaADhsyPYzcf` wiederverwendet. Neuer Deploy:
  - Deploy-ID: `dpl_5fe7wA8PULdKp8UT8JodihG5YXv2`
  - Build-URL: `https://smarte-theaterdienste-website-ikpqd33d9-kaytm93s-projects.vercel.app`
  - Alias: `https://smarte-theaterdienste-website.vercel.app`
- **HTTP-Smoke gegen Production:** `/de`, `/en`, `/de/blog`, `/en/blog`, `/de/blog/kickoff-datenraum-kultur`, `/en/blog/kickoff-datenraum-kultur`, `/de/beteiligung/mitwirkung`, `/en/participation/contribute`, `/de/opengraph-image`, `/en/opengraph-image`, `/icon`, `/sitemap.xml`, `/robots.txt` jeweils HTTP 200 über `/usr/bin/curl`.
- **Browser-Check via Playwright-CLI:** `/de` rendert Hero mit Titel `Smarte Theaterdienste`, Akzent-Blob und 4 `[data-comic-frame]`-Frames. Nach Scroll + 1500 ms sind alle Frames `opacity: 1`, `transform: matrix(1, 0, 0, 1, 0, 0)` und sichtbar. CSSOM enthält die Reduced-Motion-Regel für `::view-transition`.
- **Mobile-Check:** Viewport 375×812, Comic-Frames gestapelt mit Breite 328 px, kein Horizontal-Overflow.
- **Soft-Navigation:** `/de/blog → /de/blog/erste-pilotpartner-gewonnen` per Link-Klick funktioniert; Detailseite rendert `Erste Pilotpartner gewonnen`; Console: 0 Errors / 0 Warnings.
- **Einschränkung:** Der ViewTransition-Morph ist live weiterhin nur strukturell prüfbar, nicht visuell, weil die Live-Posts keine `cover_image_url` haben (`coverImages: 0`). Sobald Cover-Bilder gepflegt werden, kann der Morph real sichtbar verifiziert werden.

**Status am Ende:** M6 ist production-validiert. Nächster sinnvoller Schritt: M7 EN-Quality-Review oder Cover-/Hero-Asset-Pflege für sichtbare ViewTransition-Morphs.

## 2026-05-07 — Session 11: M6 Animation-Polish

**Commits:**
- `860a761` M6: Animation-Polish – ComicStrip stagger, Hero-Choreografie, Card-Hover, View Transitions, ScrollTrigger refresh

**Was passierte:**

- **User-Entscheidung:** M6 jetzt, Comic-Strip-Variante "egal — du entscheidest" → Variante B (vertical stagger reveal) gewählt. Mobile-friendly + pragmatischer als pinned-horizontal.
- **Plan-Agent validierte drei Risiko-Punkte:**
  1. View Transitions in Next.js 16 sind offiziell hinter `experimental.viewTransition: true` (Schema-Eintrag in `node_modules/next/dist/server/config-schema.js:316`, vollständige Doc unter `node_modules/next/dist/docs/01-app/02-guides/view-transitions.md`). Reacts `<ViewTransition>` aus `react` ist der Pfad — kein manueller `document.startViewTransition`.
  2. Hero ohne Image: kein Text-Scrub (kollidiert mit `RevealText`), kein parallaxer Blob (zieht Aufmerksamkeit auf sich selbst), sondern Stagger-Konstante + statischer Akzent-Blob.
  3. ScrollTrigger-Refresh nach Soft-Navigation: zentrale Client-Component im Layout, die `usePathname()` beobachtet — `revertOnUpdate` aus `@gsap/react` löst das nicht.

- **Implementierung (13 Files berührt + 3 neue):**
  - `src/components/sections/ComicStripFrames.tsx` (NEU): Client-Component, `useGSAP` + `registerScrollTrigger` + `prefers-reduced-motion`-Gate. `gsap.from` auf `[data-comic-frame]` mit `y: 24, opacity: 0 → 1, duration 0.7, stagger 0.12, ease "power2.out"`.
  - `ComicStrip.tsx`: Server-Wrapper, der bisherige `<FadeInOnScroll>`-Wrap entfällt, delegiert an `ComicStripFrames`.
  - `src/app/[locale]/page.tsx`: Hero-Section mit `STAGGER = 0.08`-Konstante, Delays kaskadieren Kicker 0 → Title 0 → Subtitle 0.16 → CTA 0.24. Section bekommt `relative overflow-hidden`. Neuer `<div aria-hidden>` mit `bg-[oklch(0.55_0.16_250/_0.10)] blur-3xl` als statischer Akzent-Blob rechts oben. Hero-Children alle `relative`.
  - `PostCard.tsx` (klickbar): `transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0`.
  - `UseCaseCard`, `EventCard`, `StepCard`, `ContactCard` (statisch): `transition-all duration-300 ease-out hover:border-border hover:shadow-sm motion-reduce:transition-none`. StepCard hatte vorher gar keinen Hover.
  - `ComicStrip-Figure`: `hover:shadow-sm` zusätzlich, mit `motion-reduce:transition-none`.
  - `next.config.ts`: `experimental: { viewTransition: true }` ergänzt.
  - `src/types/react-canary.d.ts` (NEU): `/// <reference types="react/canary" />` — bringt die `ViewTransition`-Typen aus `@types/react/canary.d.ts` projektweit ins TS-Programm.
  - `PostCard.tsx`: Cover-Image in `<ViewTransition name={`post-cover-${post.slug}`}>` aus `react`.
  - `PostArticle.tsx`: identisch (selber Slug-basierter Name) — bildet das Morph-Pair.
  - `globals.css`: `@media (prefers-reduced-motion: reduce)`-Regel auf `::view-transition-{old,new,group}(*)` mit `animation-duration: 0s !important; animation-delay: 0s !important;`.
  - `src/components/animations/ScrollTriggerRefresher.tsx` (NEU): Client-Component, `usePathname()` aus `@/lib/i18n/navigation`, `useEffect([pathname])` ruft `requestAnimationFrame` → `ScrollTrigger.refresh()`. Render `null`.
  - `src/app/[locale]/layout.tsx`: `ScrollTriggerRefresher` direkt nach `NextIntlClientProvider` eingehängt.

- **Verifikation:**
  - `pnpm typecheck` initial mit Konflikten in `.next/types/*\ 2.ts` (macOS-Finder-Duplikate) — nach `find .next/types -name "* 2.ts" -delete` clean.
  - `pnpm lint` clean.
  - `pnpm build` clean. Alle Pages weiter ● SSG. View-Transition-Flag löste keinen Dynamic-Switch aus.
  - Preview-MCP (Port 3000): erster Start scheiterte am Turbopack-Cache-Konflikt (`Failed to open SST file`); nach `rm -rf .next` + Restart sauber.
  - `/de`: Hero rendert mit Akzent-Blob, 4 ComicStrip-Frames mit `[data-comic-frame]`. Nach Scroll-into-View + 1500 ms wait alle bei `opacity:1, transform:matrix(1,0,0,1,0,0)` — Stagger lief vollständig durch.
  - Desktop 1280×800: 4-Spalten-Grid; Mobile 375×812: vertikal gestapelt.
  - `/de/blog`: PostCards `transitionDuration: 0.3s, transitionProperty: all, group`-Class.
  - Soft-Navigation `/de/blog → /de/blog/<slug> → zurück` funktioniert; ScrollTriggerRefresher feuert.
  - View-Transition-Pfad nur strukturell verifiziert: alle drei Posts in `seed.sql` haben `cover_image_url=null`. Build-/Type-Sauberkeit + offizielle Next.js-Doc als Validierung.
  - Reduced-Motion-CSS aktiv (CSSOM-Check über `document.styleSheets`-Iteration).
  - `/en` rendert identisch (Title "Smart Theatre Services").
  - Console-Logs: keine Errors.

- **Neue ADRs:** ADR-37 (View Transitions API), ADR-38 (Hero ohne Image — Stagger + statischer Blob), ADR-39 (Layout-globaler ScrollTriggerRefresher).

---

## 2026-05-06 — Session 10: M8 Production-Validation (Redeploy + Lighthouse + a11y-Fix)

**Commits:**
- `57f59b7` M8 deploy: SEO-Layer in Production + OG-Bug-Fix + Footer-Kontrast

**Was passierte:**

- **Production-Redeploy 1** (`dpl_DyvfbCWXoauUGNBx9zV6NDDG6ZC4`): Pre-Deploy-Gates (`pnpm typecheck`, `pnpm lint`, `pnpm build`) clean, `pnpm dlx vercel@latest deploy --prod --yes` aus dem Projekt-Root. Build remote in 29s, Deploy in 53s. Alias auf neuen Build umgezogen.
- **Smoke-Test gegen Production** über `/usr/bin/curl` (System-PATH hatte `curl` nicht — voller Pfad reicht). 12 von 14 Routen 200, aber **`/de/opengraph-image` und `/en/opengraph-image` lieferten 500** (`x-matched-path: /500`). Lokal hatte vorher `pnpm start --port 3030` mit `image/png` 200 geantwortet — der Status-Header war aber irreführend, weil das ImageResponse-Streaming intern bricht.
- **Bug-Diagnose lokal:** `pnpm build && pnpm start` + curl → Logs zeigen `Error: Invalid value for CSS property "display". Allowed values: "flex" | "block" | "contents" | "none" | "-webkit-box". Received: "inline-block".` Satori (das ImageResponse-Engine in `next/og`) unterstützt `display: inline-block` schlicht nicht. Der Kicker-Dot in `src/app/[locale]/opengraph-image.tsx` (Zeile 56–64) hatte `display: "inline-block"` für einen 14×14-Akzent-Punkt.
- **Fix:** `display: "inline-block"` → `display: "flex"` für den Akzent-Span. Lokal verifiziert: beide OG-Endpoints liefern jetzt valide 1200×630 PNGs (~87/90 KB, `8-bit/color RGBA, non-interlaced`).
- **Production-Redeploy 2** (`dpl_29eiYsNZFNzbSQyfZtxnwWjmDXSn`): Re-Smoke gegen `/usr/bin/curl`-Suite — alle 14 Routen 200, OG-Endpoints jetzt `image/png`. Meta-Tags-Inspektion: canonical, hreflang DE/EN/x-default, og:title/description/url/image/type/width/height/alt, twitter:card=`summary_large_image`, twitter:image — alles wie spezifiziert. Sitemap und Robots korrekt.
- **Lighthouse-Audit Run 1** gegen `https://smarte-theaterdienste-website.vercel.app/de` und `/en` über `pnpm dlx lighthouse@latest --headless`:
  - DE: Performance 91, Accessibility 96, Best-Practices 100, SEO 100.
  - EN: Performance 95, Accessibility 96, Best-Practices 100, SEO 100.
  - Top-Findings A11y: `color-contrast` 0.00 (Footer-Captions/Liste). Top-Findings Perf: `unused-javascript`, `render-blocking-insight`, `network-dependency-tree-insight`, LCP 0.80–0.86 (DE schlechter wegen mehr Hero-Inhalt).
- **axe-core via pa11y --runner axe** mit System-Chrome (`PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"`, weil `pnpm dlx @axe-core/cli` und `pa11y` ohne Override Puppeteer/ChromeDriver-Postinstall brauchen, das pnpm blockt): 8 Color-Contrast-Errors, alle im Footer:
  - `<p class="text-xs ... text-foreground/55">Gefördert von</p>` → 4.41:1 statt 4.5:1
  - 6× `<span class="block truncate">` Partner-Liste mit ererbtem `text-foreground/55`
  - `<p class="mt-4 text-xs text-foreground/50">© 2026</p>` → 4.30:1
- **A11y-Fix in `src/components/layout/Footer.tsx`:** drei Stellen `text-foreground/55` und `text-foreground/50` auf `text-foreground/65` angehoben. Andere Vorkommen (`PageHero`, `PostArticle`, `EventCard`, `PartnerMap`, `termine/page.tsx`, `PostCard`, `PartnerMapClient`) bewusst unangetastet — die haben Lighthouse + axe nicht als Verstoß markiert (sie liegen entweder auf farbigen Backgrounds oder in größeren Schriftgrößen).
- **Production-Redeploy 3** (`dpl_Fa2MYm6iZJYfPygJHaADhsyPYzcf`): Re-Smoke axe → `No issues found!` für DE und EN. Re-Lighthouse:
  - **DE: Performance 96, Accessibility 100, Best-Practices 100, SEO 100.**
  - **EN: Performance 96, Accessibility 100, Best-Practices 100, SEO 100.**
  - Core Web Vitals: LCP 2.6/2.7s, FCP 1.2/1.3s, CLS 0, TBT 30 ms, Speed-Index 3.0/3.1s.
- **`.gitignore`** um `audits/` ergänzt — Lighthouse-HTML-Reports sind 550 KB pro Run und gehören nicht versioniert.

**Was bewusst NICHT lief:**
- Lighthouse-CI als GitHub-Action — kommt erst, wenn die Custom-Domain live ist (sonst sind die Werte gegen die Vercel-Domain inkonsistent).
- Per-Post-OG-Images für Blog-Detail (jetzt nur Default-Locale-OG).
- Pa11y-/axe-CLI-Postinstall-Approval persistent in `package.json` — die einmalige `PUPPETEER_EXECUTABLE_PATH`-Umgehung reicht für ad-hoc-Audits.

**Status am Ende:** M8 vollständig in Production validiert. Alle vier Lighthouse-Kategorien ≥ 95 in DE und EN, axe-core clean. SEO-Layer + Sitemap + Robots + OG + Icon + CI live; Production-Smoke und A11y-Audit dokumentiert in `audits/lighthouse-{de,en}.html` (lokal, gitignored).

**Nächster Schritt (Default):** M6 Animation-Polish (Comic-Strip-Variante entscheiden, Hero-Parallax, Hover-States, View-Transitions). Erfordert eine User-Entscheidung zwischen pinned-horizontal-scroll vs. vertical-stagger für die Comic-Strip auf der Landing-Page. Alternativ M7 EN-Übersetzungen.

---

## 2026-05-06 — Session 9: M8 Restpolish (SEO + Sitemap + Robots + lokalisiertes OG + CI)

**Commits:**
- `b85490a` M8: SEO-Layer + Sitemap + Robots + lokalisiertes OG + CI

**Was passierte:**

- **Phase 1 — SEO-Foundation:**
  - `src/lib/seo/site.ts` mit `getSiteUrl()` (liest `NEXT_PUBLIC_SITE_URL`, trimmt trailing slashes, Fallback `http://localhost:3030`).
  - `src/lib/seo/alternates.ts` mit `buildAlternates(locale, href)` (Wrapper um `getPathname` aus `lib/i18n/navigation`) und High-Level-Helper `pageMetadata({ locale, href, title?, titleAbsolute?, description? })` der `title`/`description`/`alternates`/`openGraph`/`twitter` in einem Rutsch erzeugt.
  - `src/app/[locale]/layout.tsx` setzt `metadataBase`, `title.template = "%s · ${siteName}"`, `openGraph.{type,siteName,locale,alternateLocale,title,description}`, Twitter-Card-Default `summary_large_image`, `robots.{index,follow}`. Layout-Default-Alternates werden bewusst weggelassen — jede Page setzt ihre eigenen.

- **Phase 2 — Pro-Page-Metadata:**
  - Alle 13 statischen Pages auf `pageMetadata({ locale, href, title: t("title"), description: t("lead") })` migriert: Home (`titleAbsolute: siteName`, `description: hero.subtitle`), Ansprechpersonen, Projekt + Technische/Semantische Standards, Beteiligung + Anwendungsbeispiele/Mitwirkung, Blog-Liste, FAQ, Termine, Impressum, Datenschutz.
  - Blog-Detail (`/blog/[slug]/page.tsx`) nutzt direkt `buildAlternates(locale, { pathname: "/blog/[slug]", params: { slug } })` und baut OpenGraph mit `type: "article"`, `publishedTime`, `images: post.coverImageUrl ? [coverImageUrl] : undefined`, identisches Twitter-Image.

- **Phase 3 — Sitemap + Robots:**
  - `src/app/sitemap.ts` (Site-weit, **außerhalb** `[locale]/`): STATIC_HREFS × beide Locales mit pro-Eintrag `xhtml:link rel="alternate"`-Sprachen, `priority` 1 für Root, sonst 0.7, `changeFrequency` `weekly` für Blog, sonst `monthly`. Blog-Slugs werden gracefully geladen wenn `isSupabaseConfigured()` true ist; ohne Supabase nur Static-Pages.
  - `src/app/robots.ts`: `User-Agent: *` allow `/`, disallow `/api/`, Sitemap-Pointer auf `${site}/sitemap.xml`.

- **Phase 4 — Lokalisierte OG-Images + Icon:**
  - `src/app/[locale]/opengraph-image.tsx`: `ImageResponse` 1200×630, Datenraum-Blau-Gradient (`#0b0f1a → #14213d`, ACCENT `#2660d8` als Hex statt OKLCH weil `ImageResponse` OKLCH unzuverlässig rendert), Locale-spezifischer Kicker („Datenraum Kultur · Use Case 3" / „Cultural Data Space · Use Case 3"), `siteName` und `siteDescription` aus `getTranslations({ locale, namespace: "meta" })`. Footer-Zeile mit Domain links und Locale-Kürzel rechts.
  - `src/app/icon.tsx`: 32×32 ImageResponse mit „ST"-Initial auf Akzentfarbe.

- **Phase 5 — Messages-Erweiterung:**
  - `pages.impressum.lead` und `pages.datenschutz.lead` in `src/messages/de.json` und `src/messages/en.json` ergänzt — DE: „Rechtliche Angaben zum Projekt …", EN: „Legal information about the Smart Theatre Services project …" / „How we handle personal data …". Ohne diese Keys hätte `t("lead")` undefined zurückgegeben und die Description wäre leer geblieben.

- **Phase 6 — CI:**
  - `package.json`: neuer Script-Eintrag `"typecheck": "tsc --noEmit"`.
  - `.github/workflows/ci.yml`: Trigger `push` auf `main` + alle `pull_request`, ubuntu-latest, pnpm/action-setup@v4 (v10), actions/setup-node@v4 (Node 20, pnpm-Cache), `pnpm install --frozen-lockfile`, `pnpm lint`, `pnpm typecheck`, `pnpm build` mit `NEXT_PUBLIC_SITE_URL=https://smarte-theaterdienste-website.vercel.app` und absichtlich **ohne Supabase-Env** — der Build fällt graceful auf den ComingSoonHero-Fallback (siehe ADR-31), bleibt SSG-clean und prüft strukturell durch.

- **Bugs beim Verifizieren entdeckt + behoben:**
  - **Twitter-Card-Override:** `pageMetadata` erzeugte ein neues `twitter`-Object ohne `card` → Pro-Page-Twitter fiel auf Next.js-Default `summary` zurück, obwohl das Layout `summary_large_image` setzt. Fix: Helper setzt jetzt selbst `card: "summary_large_image"`.
  - **Proxy-Matcher fängt Top-Level Convention Files:** `/icon` (kein Punkt im Pfad) wurde von `createMiddleware`-Matcher gematched und auf `/de/icon` redirected → 500 (`InvariantError: client reference manifest for route "/[locale]" does not exist`). Matcher in `src/proxy.ts` jetzt `(?!api|_next|_vercel|icon|apple-icon|opengraph-image|twitter-image|manifest|.*\\..*)` — Top-Level-Convention-Pfade ohne Extension werden ausgeschlossen, damit Next.js sie direkt rendern kann. Sitemap.xml und robots.txt waren schon durch `.*\..*` abgedeckt.

- **Verifikation:**
  - `pnpm typecheck`, `pnpm lint`, `pnpm build` clean. Build-Output zeigt `/sitemap.xml` und `/robots.txt` als ○ Static, `/icon` als ○ Static, `/[locale]/opengraph-image` als ƒ Dynamic.
  - `pnpm start --port 3030`:
    - `curl /sitemap.xml` → XML mit allen 13 Static-Hrefs × 2 Locales + xhtml:link-Alternates DE/EN, plus `/<locale>/blog/<slug>` (zwei Slugs aus dem Seed: `kickoff-datenraum-kultur`, `erste-pilotpartner-gewonnen`).
    - `curl /robots.txt` → `User-Agent: *`, `Allow: /`, `Disallow: /api/`, `Host`, `Sitemap`.
    - `curl /de` → `<title>Smarte Theaterdienste</title>`, `<link rel="canonical">`, drei `<link rel="alternate" hreflang="...">` (de/en/x-default), `og:title/url/image/type`, `twitter:card="summary_large_image"`.
    - `curl /en/contact-persons` → canonical + alternates korrekt mit Slug-Übersetzung (`/de/ansprechpersonen` ↔ `/en/contact-persons`).
    - `curl /de/blog/kickoff-datenraum-kustur` → `og:type="article"`, alternates.
    - `curl -I /de/opengraph-image` und `/en/opengraph-image` → 200, Content-Type `image/png`.
    - `curl /icon` → 200, 528 Byte PNG (`32x32 RGBA`).
    - HTML enthält `<link rel="icon" href="/icon?...">` korrekt verlinkt.

**Was bewusst NICHT lief:**
- Production-Redeploy auf Vercel — separate Mini-Aufgabe für die nächste Session.
- Lighthouse-Audit + axe-core gegen Production — sinnvoll erst nach Redeploy, sonst misst man den letzten M5-Stand ohne den neuen Meta-Layer.
- Per-Post-OG-Images im Blog-Detail (jeder Post mit eigenem Titel-Bild) — Default-Locale-OG reicht für M8-Erstwurf.
- Lighthouse-CI als GitHub-Action (`treosh/lighthouse-ci-action`) — bringt Werte mit, lohnt erst nach Custom-Domain.
- M7 EN-Übersetzungen für Blog-Posts (zwei Posts haben nur DE-Translations) — Sitemap listet beide Locales als Best-Effort, EN-Pfade rendern bei fehlender Translation `notFound()`.

**Status am Ende:** M8 Kern abgeschlossen — Suchmaschinen können Site indexieren mit hreflang DE/EN, Social-Shares zeigen lokalisiertes OG-Image (1200×630), CI prüft jeden Push auf main + jeden PR. Lokal alles grün; Production-Validation steht aus.
**Nächster Schritt:** Production-Redeploy + Lighthouse-Audit ≥ 95 (Performance/Accessibility/Best-Practices/SEO), Findings nach `PROBLEME.md`. Alternativ M6 Animation-Polish.

---

## 2026-05-04 — Session 8: M5 Production-Deploy

**Commits:**
- `a8045fb` M5 deploy: Partner-Karte production-live

**Was passierte:**
- Vault-Routine angestoßen, Plan via ExitPlanMode genehmigt (Pfad „Production-Redeploy + M5 live").
- Pre-Deploy: `git status` clean, `pnpm exec tsc --noEmit` und `pnpm exec eslint .` jeweils ohne Output (= grün), `pnpm build` erfolgreich — alle Pages SSG/ISR, `/beteiligung/mitwirkung` weiterhin ● mit `1m / 1y` revalidate.
- Deploy: `pnpm dlx vercel@latest deploy --prod --yes` aus dem Projekt-Root. Build remote in 28s, gesamter Deploy in 48s. Production-Alias automatisch auf den neuen Build umgezogen.
  - Deploy-ID: `dpl_EEYezucGpDjM74fE3cwFY36DuqEj`
  - Build-URL: `https://smarte-theaterdienste-website-2j4ft8p95-kaytm93s-projects.vercel.app`
  - Aliased: `https://smarte-theaterdienste-website.vercel.app`
- Smoke-Test in Production:
  - `/de`, `/de/beteiligung/mitwirkung`, `/en/participation/contribute`, `/de/blog`, `/de/faq`, `/de/termine` jeweils HTTP 200.
  - `/de/beteiligung/mitwirkung` enthält im SSG-HTML alle vier Partner aus dem Supabase-Seed (Bühnenverein, Akademie für Darstellende Künste, Fraunhofer, acatech) — bestätigt, dass die Karten-Hotspots Live-Daten aus der Cloud-DB rendern.
- Vault aktualisiert (DASHBOARD/CHANGELOG/PROBLEME/KONTEXT), Commit + Push, Obsidian-Sync.

**Was bewusst NICHT lief:**
- Vercel-GitHub-Integration im Dashboard: weiterhin offen — `vercel git connect` schlägt an GitHub-App-Rechten fehl. Workaround unverändert: Production-Deploys per CLI.
- Kein neuer Migration-/Seed-Push (DB-Stand identisch zur letzten Session).

**Status am Ende:** M5 ist live in Production. Die Partner-Deutschlandkarte ist unter `https://smarte-theaterdienste-website.vercel.app/de/beteiligung/mitwirkung` und `/en/participation/contribute` öffentlich erreichbar; Hotspots, GSAP-Pulse und Side-Panel rendern aus Supabase-Daten.
**Nächster Schritt:** M6 Animation-Polish (Comic-Strip-Variante entscheiden, Hover-States, View Transitions, Reduced-Motion) oder M8-Restpolish (SEO/OG-Images/Sitemap/Lighthouse). M7 EN-Übersetzungen ist parallel möglich.

---

## 2026-05-01 — Session 7: M5 Partner-Deutschlandkarte

**Commits:**
- `134b442` docs(agents): Vault-Routine auch in AGENTS.md spiegeln (Codex-Diff aufgeräumt)
- `66e2bb5` M5: Partner-Deutschlandkarte – Wikimedia-SVG + Hotspots aus Supabase

**Was passierte:**
- Codex-Resultate gesichtet: M8-Production-Deploy (Vercel + `pg_net`-Revalidate) ist live, alle Routen rendern HTTP 200, Vaults waren in Sync. Codex hatte einen uncommitteten Diff in `AGENTS.md` hinterlassen (Vault-Routine 1:1 wie in `CLAUDE.md`, damit nicht-Claude-Agenten dieselben Pflichten kennen). Sauber als kleinen Docs-Commit gepusht.
- **SVG-Asset:** `Germany_location_map.svg` (NordNordWest, Wikimedia Commons, public domain) via `curl` aus `https://upload.wikimedia.org/wikipedia/commons/0/0d/...` nach `public/maps/germany.svg` (463 KB). Bounding-Box laut Wikimedia: N=55.1°, S=47.2°, W=5.5°, E=15.5°, Equirectangular mit "150% N/S-Stretch" (im Asset bereits eingebacken — lineares Mapping über Bounding-Box trifft die Position korrekt).
- **Query:** `listPartners()` in `src/lib/supabase/queries.ts` ergänzt (kein i18n-Join — Partner-Namen sind Eigennamen, Status wird via Messages lokalisiert). Returnt `Partner[]` mit `id, slug, name, lat, lng, status, websiteUrl, logoUrl`.
- **Components:**
  - `src/components/sections/PartnerMap.tsx` (Server-Wrapper) — `isSupabaseConfigured()`-Gate, Empty-State falls keine Partner, sonst delegiert an Client.
  - `src/components/sections/PartnerMapClient.tsx` (Client) — `useGSAP` mit `prefers-reduced-motion`-Guard, Pulse-Ring (random stagger), Linear-Mapping-Funktion `projectLatLng`, State-Management für `selectedId`, Side-Panel als `<aside>` (sticky auf `lg:`). Hotspots als `<button>`-Layer absolut über dem `<img>`, mit Status-Badge in Akzentfarbe, Coordinates und optionalem Website-Link.
  - Layout: `lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]`, mobile stacked.
- **Page:** `src/app/[locale]/beteiligung/mitwirkung/page.tsx` — alter `mapPlaceholder`-Block entfernt, durch `<PartnerMap />` ersetzt, `export const revalidate = 60` ergänzt (analog zu Blog/FAQ/Termine). Obsolete `mapPlaceholder` und `partners`-Felder aus `src/content/{de,en}/beteiligung-mitwirkung.json` entfernt.
- **i18n:** `pages.mitwirkung.map.{heading,lead,imageAlt,statusLabel,statuses.{partner,pilot,interested},viewWebsite,noLocation,empty,selectHint}` in DE und EN.
- **ADR-34** dokumentiert die Wahl der Wikimedia-Karte und das lineare Equirectangular-Mapping.
- Verifikation:
  - `pnpm exec tsc --noEmit` clean
  - `pnpm exec eslint .` clean
  - `pnpm exec next build` clean: alle Pages SSG/ISR, `/beteiligung/mitwirkung` bleibt ● mit 1m/1y revalidate.
  - Browser-Test (Preview-MCP `smarte-theaterdienste`):
    - `/de/beteiligung/mitwirkung`: 4 Hotspots an erwarteten Prozent-Coords (Bühnenverein 14.6/52.7, Fraunhofer 45/19.6, Akademie 19.7/45.4, NFDI4Culture 31.9/63.0). Initial-Panel zeigt "Wähle einen Punkt" + Partner-Liste als Buttons. Klick auf Fraunhofer-Hotspot → Panel: PARTNER · Fraunhofer-Institut · 53.55° N · 10.00° E.
    - `/en/participation/contribute`: Status-Labels lokalisiert (Partner / Pilot theatre / Interested), Hint "Pick a marker on the map".
    - Console error-frei in beiden Locales.
- Initial wurde `[filter:saturate(0)_brightness(0.95)] opacity-80` an die Karte gehängt — auf JPEG-Screenshots (Preview-MCP) wurde das Asset zu Weiß komprimiert, weil die Wikimedia-Karte ohnehin nur pale-yellow Germany / pale-blue Wasser / dünne graue Grenzen verwendet. Filter und niedrige Opacity entfernt; SVG rendert jetzt im Container mit `bg-muted/40` und voller Sichtbarkeit der Original-Farben.

**Was bewusst NICHT lief:**
- Kein Production-Redeploy auf Vercel — kommt beim nächsten Bedarf per `pnpm dlx vercel@latest deploy --prod`. Lokal verifiziert reicht für diese Session.
- Kein Webhook-Trigger auf `partners` — die Karte ist mit `revalidate=60` ohnehin aktuell genug; falls feinere Reaktion gewünscht, später analog zu posts/events/faqs nachziehen.

**Status am Ende:** M5 abgeschlossen. Site ist lokal voll funktionsfähig mit interaktiver Partner-Karte; Hotspots aus Live-Daten, GSAP-Pulse, Side-Panel mit Detail-State, beide Locales. Production-Deploy steht aus.
**Nächster Schritt:** M6 Animation-Polish (Comic-Strip-Variante entscheiden, Hover-States, View-Transitions) oder M8-Restpolish (SEO/OG/Sitemap/Lighthouse). Optional vorab: Production-Redeploy.

---

## 2026-04-30 — Session 6: Production-Deploy + Revalidate live

**Commits:**
- `ee34c65` M8: Vercel Production-Deploy und Revalidate live

**Was passierte:**
- Vercel-CLI per Device-Login authentifiziert (`kaytm93`), Projekt `kaytm93s-projects/smarte-theaterdienste-website` angelegt/verlinkt.
- Production-Env-Vars in Vercel gesetzt: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `REVALIDATE_SECRET`, `NEXT_PUBLIC_SITE_URL=https://smarte-theaterdienste-website.vercel.app`.
- Production deployed und aliasiert auf `https://smarte-theaterdienste-website.vercel.app`.
- `.vercelignore` ergänzt, damit lokale `.env*`, `.vercel/`, `.claude/`, `.next/`, `node_modules/`, Obsidian-Config und `supabase/.temp/` nicht ins Vercel-CLI-Deployment-Bundle gelangen. Nach Entfernen von `.env.example` aus dem Bundle war der finale Build ohne `.env`-Warnung.
- Vercel-GitHub-Integration versucht (`vercel git connect https://github.com/Kaytm93/smarte-theaterdienste-website`), aber Vercel lehnt mit fehlendem Zugriff/App-Rechten ab. Production-Deploys funktionieren bis zur Dashboard-Verknüpfung per CLI.
- Supabase-Revalidate direkt in der Cloud-DB eingerichtet:
  - `pg_net` aktiviert
  - `public.revalidate_nextjs_cache()` angelegt
  - Trigger auf `posts`, `post_translations`, `events`, `event_translations`, `faqs`, `faq_translations`
- Verifikation:
  - Lokal: `pnpm exec tsc --noEmit`, `pnpm exec eslint .`, `pnpm exec next build` clean
  - Vercel: finaler `vercel deploy --prod --force` clean, alle Pages ● SSG/ISR, `/api/revalidate` ƒ Dynamic
  - Live-Smoke: `/de`, `/en`, `/de/blog`, `/de/blog/kickoff-datenraum-kultur`, `/de/faq`, `/de/termine`, `/en/blog`, `/api/revalidate` jeweils HTTP 200
  - Revalidate-Auth: POST mit falschem Secret HTTP 401, POST mit gültigem Secret HTTP 200 (`paths.length = 2`)
  - Trigger-Test: no-op `UPDATE` in `post_translations` erzeugte `net._http_response.status_code = 200`, `timed_out = false`

**Status am Ende:** Site ist live in Production, Supabase-Content rendert auf der Production-Domain, On-Demand-Revalidate ist aktiv. Offen bleibt nur die automatische Vercel-GitHub-Integration im Dashboard.
**Nächster Schritt:** M5 Partner-Karte oder M8-Restpolish (SEO, OG-Images, Sitemap, Lighthouse, A11y).

---

## 2026-04-30 — Session 5: M4 finalisiert (Cloud verheiratet)

**Commits:**
- `3a31b05` M4 final: Supabase Cloud verheiratet, Pages live mit echten Daten

**User-Lieferung vorab:**
- Supabase-Cloud-Projekt `hyirpaloozcautcxhbqk` (EU-Central / Frankfurt) angelegt
- Project URL, anon-key, service-role-key + Personal Access Token (PAT) geliefert

**Was passierte:**
- `.env.local` geschrieben (gitignored): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `REVALIDATE_SECRET` (lokal `openssl rand -hex 32`), `NEXT_PUBLIC_SITE_URL=http://localhost:3030`
- `pnpm exec supabase login --token <pat>` (kein Browser-Flow nötig dank `--token`-Flag)
- `pnpm exec supabase link --project-ref hyirpaloozcautcxhbqk` — config.toml verheiratet mit Cloud
- `pnpm exec supabase db push` — Migration `20260427121400_init.sql` eingespielt
- `pnpm exec supabase db query --linked -f supabase/seed.sql` — Seed via Management API (regulärer `supabase db seed` zielt nur auf lokale DB). Counts verifiziert: posts 3, post_translations 3, events 2, event_translations 4, faqs 5, faq_translations 10, partners 4
- `pnpm gen:types` — `src/types/database.ts` regeneriert (406 Zeilen statt 214 hand-rolled, mit `Relationships`-Feldern pro Tabelle)
- Build-Fehler entdeckt: `Route /[locale]/blog/[slug] used cookies() inside generateStaticParams.` — der cookie-bewusste Server-Client funktioniert in `generateStaticParams` nicht, weil dort kein HTTP-Request existiert
- **Refactor**: neuer `getSupabaseAnon()` in `src/lib/supabase/server.ts` (`@supabase/supabase-js` `createClient` ohne Session). Alle Public-Read-Queries in `src/lib/supabase/queries.ts` auf Anon umgestellt — Pages bleiben dadurch ● SSG mit 60s ISR statt ƒ Dynamic. ADR-31.
- `queries.ts` Header-Kommentar aktualisiert (Casts bleiben als explizite Row-Annotation)
- Verifikation:
  - `pnpm exec tsc --noEmit` clean
  - `pnpm exec eslint .` clean
  - `pnpm exec next build` clean: alle Pages ● SSG, `/blog/[slug]` prerendert 4 Routen (kickoff-datenraum-kultur DE+EN, erste-pilotpartner-gewonnen DE+EN — letzte ohne EN-Translation rendert auf Anfrage 404 via `notFound()`)
  - Browser-Tests (Preview-MCP `smarte-theaterdienste`):
    - `/de/blog`: 2 Posts mit Kicker AKTUELLES, Datum, Excerpt, Weiterlesen-Link
    - `/de/blog/kickoff-datenraum-kultur`: PageHero + ReactMarkdown (H2, Bullet-Liste, Italic), Back-Link
    - `/de/faq`: 5 Accordion-Items in `position`-Reihenfolge
    - `/de/termine`: BEVORSTEHEND (12. Juni) mit Anmelden-Button + VERGANGEN (20. Februar), DE-Datumsformat, Markdown-Body
    - `/en/blog`: nur 1 Post (Kickoff) — post2 ohne EN-Translation korrekt gefiltert
    - `/api/revalidate`: HTTP 401 ohne/falsches Secret, HTTP 200 mit `?secret=...`, Response listet matched paths
    - Console-Logs error-frei

**Deltas in queries.ts:**
- Import: `getSupabaseServer` → `getSupabaseAnon`
- Alle 4 Helper (`listPublishedPosts`, `getPostBySlug`, `listAllPostSlugs`, `listEventsByStatus`, `listPublishedFaqs`) nutzen jetzt `getSupabaseAnon()` statt `await getSupabaseServer()` (kein await mehr nötig)
- `listAllPostSlugs` Kommentar warnt vor Build-Zeit-Kontext

**Was bewusst NICHT lief:**
- Vercel-Deployment (User-Action, nächste Session)
- Webhook im Supabase-Studio (braucht Production-URL erst)
- Hand-rolled `.returns<T>()`-Casts entfernt — bewusst behalten als explizite Row-Annotation, Header-Kommentar angepasst

**Status am Ende:** M4 abgeschlossen. Site ist lokal voll funktionsfähig mit Live-Daten aus Supabase Cloud. Build clean, alle Routen prerendert. EN-Locale-Filter funktioniert sauber (post2 ohne EN-Translation wird korrekt aus `/en/blog` ausgeblendet, würde auf `/en/blog/erste-pilotpartner-gewonnen` einen 404 zeigen).
**Nächster Schritt:** Vercel-Deployment + Webhook im Supabase-Studio. Alternativ M5 (Partner-Karte) oder M6 (Animation-Polish).

---

## 2026-04-27 — Session 4: M4 (Vorbereitung) Dynamic Content

**Commits:**
- `2aad962` M4 prep: Schema, Supabase-Helper, Page-Skeletons, Revalidate-Endpunkt

**User-Entscheidungen vorab (via AskUserQuestion):**
- Pfad: „M4 vorbereiten – Projekt kommt später" — alle offline-möglichen Schritte erledigen, Cloud-Projekt + `.env.local` legt der User parallel an

**Was passierte:**
- `pnpm add -D supabase` (CLI v2.95.5, dev-dep) + `pnpm.onlyBuiltDependencies: ["supabase"]` in `package.json`, damit der postinstall-Download des Go-Binärs durchläuft (siehe PROBLEME.md)
- `pnpm add react-markdown` für Beitrags-Body-Rendering
- `pnpm exec supabase init` → `supabase/config.toml`, `supabase/.gitignore`, `supabase/migrations/` scaffolded
- Schema-Migration `supabase/migrations/20260427121400_init.sql`:
  - `locale`-Enum (`'de' | 'en'`) als Quelle der Wahrheit auch in der DB
  - `posts` (slug-unique, status-Enum draft/published/archived, published_at, cover_image_url) + `post_translations((post_id, locale))`
  - `events` (slug-unique, starts_at, ends_at, location, registration_url, status upcoming/past/cancelled) + `event_translations`
  - `faqs` (position, category, is_published) + `faq_translations`
  - `partners` (für M5: name, slug, lat, lng, status partner/pilot/interested)
  - `set_updated_at()`-Trigger pro Tabelle
  - Indizes: `posts(published_at desc)` partial, `events(starts_at desc)`, `faqs(position)` partial
  - RLS aktiv auf allen 7 Tabellen + Public-Read-Policies (Posts/Faqs nur veröffentlicht, Translations über Parent-Existenz, Events/Partners offen)
- `supabase/seed.sql` mit 3 Posts (2 published DE+EN, 1 draft), 2 Events (1 upcoming, 1 past), 5 FAQs DE+EN, 4 Partners — idempotent via `on conflict do nothing`
- `src/types/database.ts` hand-rolled, Shape-kompatibel mit `supabase gen types --linked` (überschreibt sich später bei `pnpm gen:types`)
- `src/lib/supabase/`:
  - `env.ts` — `isSupabaseConfigured()` + `getSupabaseEnv()` (throws bei fehlenden Public-Keys)
  - `server.ts` — `getSupabaseServer()` mit `await cookies()` + `createServerClient<Database>` + `getAll`/`setAll`-Pattern; setAll fängt RSC-Schreibversuch silent ab
  - `client.ts` — `getSupabaseBrowser()` mit `'use client'` + `createBrowserClient<Database>`
  - `queries.ts` — typisierte Helper: `listPublishedPosts`, `getPostBySlug`, `listAllPostSlugs`, `listUpcomingEvents`, `listPastEvents`, `listPublishedFaqs`. i18n-Pattern: `post_translations!inner(...).eq('post_translations.locale', locale)`. `.returns<RowType[]>()`-Cast wegen fehlender Relationship-Inferenz im hand-rolled Schema
- `src/components/sections/`:
  - `PostCard` (RSC) — Cover-Image via `next/image`, lokalisiertes Datum, Card-Hover, Link via i18n-Navigation `{ pathname: '/blog/[slug]', params: { slug } }`
  - `PostArticle` (RSC) — PageHero-Pattern + ReactMarkdown-Body mit Tailwind-prose-Klassen
  - `EventCard` (RSC) — `<time dateTime>` mit `toLocaleDateString(locale)`, Register-CTA wenn `upcoming` und `registration_url`, Markdown-Beschreibung
  - `FaqAccordion` (Client) — shadcn `<Accordion>` + `<ReactMarkdown>` für Antworten
  - `ComingSoonHero` erweitert um optionale `body`-Prop (Empty-State-Variante)
- `src/app/[locale]/blog/page.tsx` (ersetzt Stub) — `revalidate = 60`, dreistufige Logik: `!isSupabaseConfigured()` → ComingSoonHero; `posts.length === 0` → ComingSoonHero mit `empty.*`-Texten; sonst `<PageHero>` + 3-spaltiges Grid mit `<PostCard>`
- `src/app/[locale]/blog/[slug]/page.tsx` (neu) — `generateStaticParams` returned `[]` ohne Supabase, sonst alle Slugs × Locales; `dynamicParams = true` für ISR; `notFound()` ohne Supabase oder bei unbekanntem Slug; `generateMetadata` mit Post-Title + Excerpt
- `src/app/[locale]/faq/page.tsx` (ersetzt Stub) — gleiche Fallback-Logik, sonst `<PageHero>` + `<FaqAccordion>` in 3xl-Container
- `src/app/[locale]/termine/page.tsx` (ersetzt Stub) — zwei Sections (Bevorstehend / Vergangen), `noUpcoming`-Hinweis wenn `upcoming.length === 0` aber `past` existiert
- `src/app/api/revalidate/route.ts` (neu) — POST-Endpunkt für Supabase-DB-Webhook: Secret-Check über `?secret=` oder `x-revalidate-secret`-Header gegen `REVALIDATE_SECRET`; `runtime = 'nodejs'`, `dynamic = 'force-dynamic'`. Mappt Tabelle → Pages: posts/post_translations → `/[locale]/blog` + `/[locale]/blog/[slug]`, events → `/[locale]/termine`, faqs → `/[locale]/faq`. Webhook ohne Body revalidiert alle bekannten Pfade. GET liefert Hilfetext.
- `src/messages/{de,en}.json`: `pages.blog.{lead,readMore,publishedAt,backToList,empty.*}`, `pages.faq.{lead,empty.*}`, `pages.termine.{lead,upcomingHeading,pastHeading,registerCta,noUpcoming,empty.*}`
- `package.json` Scripts: `db:push`, `db:diff`, `db:reset`, `gen:types`
- Verifikation:
  - `pnpm exec tsc --noEmit` clean
  - `pnpm exec eslint .` clean
  - `pnpm exec next build` clean: 29 Static + 1 Dynamic (`/api/revalidate`), Routen `/blog`, `/faq`, `/termine` zeigen ISR-Revalidate `1m / 1y`, `/blog/[slug]` als ● (SSG mit dynamicParams)
  - Browser-Test (Preview-MCP `smarte-theaterdienste`):
    - `/de/blog`: ComingSoonHero "AKTUELLES · IN VORBEREITUNG · Blog" — env vars fehlen, Fallback greift wie geplant
    - `/de/faq`, `/de/termine`: 200, ComingSoonHero
    - `/de/blog/some-slug`: 404 (notFound() ohne Supabase) — korrektes Verhalten
    - `/en/faq`: "ANSWERS · IN PREPARATION · Frequently asked questions" — EN-Lokalisierung greift
    - `/api/revalidate` GET: 200 mit Hilfetext; POST ohne `REVALIDATE_SECRET` env: 500 mit klarer Fehlermeldung — erwartet ohne `.env.local`
    - Console-Logs clean

**Was bewusst NICHT lief (User-Entscheidung „später"):**
- Kein `supabase login`, `supabase link`, `supabase db push` (Cloud-Projekt fehlt)
- Kein Webhook-Setup im Studio
- Keine Vercel-Deployment-Schritte

**Status am Ende:** M4-Code vollständig vorbereitet. Sobald User `.env.local` mit Supabase-Keys + `REVALIDATE_SECRET` füllt, `pnpm exec supabase login`, `pnpm exec supabase link --project-ref <ref>`, `pnpm exec supabase db push`, dann optional `pnpm gen:types` — Pages rendern Daten ohne Code-Change.
**Nächster Schritt:** User legt Supabase-Cloud-Projekt an (EU-Region). Danach 3-Befehle-Push + Webhook im Studio. Alternativ Vercel-Deployment vorziehen.

---

## 2026-04-26 (Abend) — Session 3: M3 Statische Seiten DE

**Commits:**
- `dbf76a5` M3: Statische Seiten DE + Coming-Soon-Stubs

**User-Entscheidungen vorab (via AskUserQuestion):**
- Akzentfarbe: Datenraum-Blau (kühl) → `oklch(0.55 0.16 250)`
- Blog/FAQ/Termine: Coming-Soon-Stubs anlegen (statt 404 oder Nav-Entfernung)
- Impressum/Datenschutz: sichtbare TODO-Platzhalter (Auftraggeber liefert Texte)
- EN-Übersetzungen: EN-Stubs zulässig, M7 finalisiert

**Was passierte:**
- `src/styles/tokens.css`: `--accent-brand: oklch(0.55 0.16 250)` + `--accent-brand-foreground: oklch(0.985 0 0)` für Text-auf-Akzent
- `src/app/globals.css` `@theme inline`: zusätzliche Bridge `--color-accent-brand-foreground` für Tailwind-Utilities
- `src/messages/{de,en}.json` erweitert: `comingSoon.{kicker,title,body,backToHome}`, `team.{phoneLabel,mailLabel,photoCredit,portraitFallback}`, `pages.{ansprechpersonen,projekt,technischeStandards,semantischeStandards,beteiligung,anwendungsbeispiele,mitwirkung,impressum,datenschutz,blog,faq,termine}.{kicker,title,lead?}`
- `src/content/{de,en}/` neu (10 JSONs pro Locale):
  - `team.json` — 4 Personen aus INHALTE.md (Sina/Peter/Claudia/Madeleine), inkl. Quote-Felder, Fallback-Email-Pattern `vorname.nachname@buehnenverein.de`
  - `projekt.json` — 6 Sections + 2 CTA-Links
  - `projekt-technische-standards.json` — 5 Sections (JSON, Transformation, Konnektor, Datenfluss, Vertiefung)
  - `projekt-semantische-standards.json` — 4 Sections (Datenmodell, Übersetzen, Standards-Liste, Vertiefung)
  - `beteiligung.json` — Pitch-Aufruf + 3 CTA-Links
  - `beteiligung-anwendungsbeispiele.json` — 3 Use Cases mit Lucide-Icon-Keys
  - `beteiligung-mitwirkung.json` — 2 Steps + Map-Platzhalter + Partner-Liste
  - `legal.json` — `imprint`/`privacy` mit `todo: true` und Hinweistext
  - `landing.json` — Comic-Strip-Frames (4 Captions + Hue-Werte) + Pitch-Section
- `src/lib/content/loader.ts` — typisierte Bundle-Registry (`loadContent(key, locale)`), statische Imports (Turbopack-friendly), DE-Fallback wenn EN fehlt
- `src/components/sections/` neu (8 Components):
  - `PageHero` — wiederverwendbarer Page-Header mit RevealText + FadeInOnScroll
  - `TextSection` — zweispaltiges Layout (Eyebrow/Heading links, Body rechts) mit FadeIn
  - `ContactCard` — shadcn `<Card>`, Initialen-Portrait-Fallback, Quote, Tel/Mail-Links
  - `TeamGrid` — `<ContactCard>` × N im responsive Grid (1/2/4 cols)
  - `UseCaseCard` — Icon (lucide) + Title + Body, Akzentfarbe-Hintergrund am Icon
  - `StepCard` — Step-Number-Badge in Akzentfarbe
  - `ComingSoonHero` — wiederverwendbar für Stubs, mit Page-Kicker + Back-to-Home-Button
  - `ComicStrip` — 4 Frames als Cards mit Hue-Gradient-Backgrounds (Animation in M6)
- `src/app/[locale]/` neu (10 Routen + 1 erweitert):
  - 10 neue `page.tsx` (ansprechpersonen, projekt + 2 Standards, beteiligung + 2 Sub-Routen, impressum, datenschutz, blog, faq, termine)
  - alle als `async` Server-Component, `await params`, `setRequestLocale`, `generateMetadata` mit Page-Titel
  - `[locale]/page.tsx` (Landing) erweitert um ComicStrip + Pitch-TextSection unter Hero
- Verifikation:
  - `pnpm exec tsc --noEmit` clean (Bug zwischendurch: deutsche Anführungszeichen `„…"` mit ASCII-Quote als Schluss zerschossen JSON-Parser; Fix: `„…“` mit U+201C)
  - `pnpm exec eslint .` clean (`react/no-unescaped-entities` in ContactCard durch typografisch korrektes „…“ behoben)
  - `pnpm build` SSG-clean: 29 statische Pages (14 Routen × 2 Locales + _not-found), keine "Dynamic at runtime"-Warning
  - Browser-Test (Preview-MCP `smarte-theaterdienste`):
    - `/de` Landing: Hero + Comic-Strip + Pitch rendern, Akzentfarbe-Blau am Kicker sichtbar
    - `/de/ansprechpersonen`: alle 4 ContactCards mit Initialen-Fallback (SS/PR/CG/MS), Quotes, Tel/Mail-Links
    - `/de/blog`: ComingSoonHero mit korrektem Text und Back-Link
    - `/en/contact-persons`: EN-Slug-Mapping rewritet zu `/[locale]/ansprechpersonen` mit englischem Inhalt
    - `/en/project/technical-standards`: tiefer-verschachtelte EN-Slug-Map funktioniert, 5 H2-Sections rendern
    - Keine Console-Errors

**Status am Ende:** M3 abgeschlossen. Site ist navigierbar, alle 14 Routen rendern, Slug-Mapping in beide Richtungen funktional, Akzentfarbe live. Coming-Soon-Stubs markieren M4-Lücken (Blog/FAQ/Termine). Echte Assets (Portraits, Logos) und Legal-Texte stehen offen — User-/Auftraggeber-Lieferung.
**Nächster Schritt:** M4 — Dynamic Content (Supabase). Voraussetzung: User legt Supabase-Cloud-Projekt an und liefert ENV-Vars.

---

## 2026-04-26 — Session 2: M2 Design-System

**Commits:**
- `a8572b8` M2: Design-System – Tokens, Header/Footer, shadcn-Init, Animation-Primitives

**User-Entscheidungen vorab:**
- Schrift: Geist Sans behalten (keine Serif-Migration)
- Farben: Tailwind-neutrale Slate-Basis, konkrete Akzentfarbe in M3
- localeDetection: next-intl Default (`true`) bleibt — Browser-Sprache entscheidet

**Was passierte:**
- `pnpm add @gsap/react` (2.1.2) für `useGSAP`-Hook
- `pnpm dlx shadcn@latest init -y -b radix -p nova --no-monorepo` → Tailwind v4 erkannt, `components.json` (radix-nova, neutral baseColor, css-vars), `globals.css` mit OKLCH-Theme-Vars überschrieben, `src/lib/utils.ts` zu shadcn-Standard-`cn()`
- `pnpm dlx shadcn@latest add button accordion card sheet dialog input label` → 7 Primitives nach `src/components/ui/`
- `globals.css` korrigiert: `--font-sans: var(--font-geist-sans)`, `--font-mono: var(--font-geist-mono)`, `--font-heading: var(--font-geist-sans)`, `tokens.css`-Import, `--color-accent-brand`-Bridge in `@theme inline`
- `src/styles/tokens.css` ausgebaut: Spacing-Scale, Typo-Scale (fluid clamp), Easings (`--ease-in-out`, `--ease-spring`), Durations, `--container-max`, `--header-height`, `--container-prose`, `--accent-brand`-Slot
- `src/components/layout/`:
  - `Header.tsx` (Server) — sticky, backdrop-blur, Wortmarke, Desktop-Nav, LanguageSwitcher, MobileNav-Trigger
  - `Footer.tsx` (Server) — dreispaltig, Wortmarke + Förder-Hinweis, Logo-Platzhalter (echte SVGs in M3), Impressum/DS, © Year
  - `LanguageSwitcher.tsx` (Client) — `useRouter`/`usePathname` aus `@/lib/i18n/navigation` + `useParams` aus `next/navigation`, path-preserving Switch, Globe-Icon + Locale-Kürzel
  - `MobileNav.tsx` (Client) — shadcn `Sheet` Slide-In rechts, Auto-Close auf Link-Click
- `src/components/animations/`:
  - `FadeInOnScroll.tsx` — `useGSAP` mit `scope`, `prefers-reduced-motion`-Guard, `gsap.from({ y, opacity })` mit ScrollTrigger
  - `RevealText.tsx` — Wort-Stagger via eigene Split-Logik (kein SplitText-Plugin)
  - `ParallaxImage.tsx` — `gsap.fromTo` mit `scrub: true`, wrappt `next/image`
- `[locale]/layout.tsx` — `<Header />` + `<main className="flex-1">{children}</main>` + `<Footer />` im `<NextIntlClientProvider>`
- `[locale]/page.tsx` — Hero mit `<RevealText>` für Title, `<FadeInOnScroll>` für Kicker/Subtitle/CTA-Group, shadcn `<Button asChild>` statt Inline-Tailwind-Links
- `messages/{de,en}.json` ergänzt: `nav.menu`, `langSwitcher.{label,de,en}`, `footer.logoAlt.{buehnenverein,akademie,fraunhofer,acatech,nfdi4culture,bkm}`
- Verifikation:
  - `pnpm exec tsc --noEmit` clean
  - `pnpm exec eslint .` clean (alt-Prop in `ParallaxImage` explizit destructured)
  - Dev-Server (`smarte-theaterdienste`-launch.json) → `/de` und `/en` rendern, console-Logs sauber, LanguageSwitcher klickt `/de` → `/en` korrekt
  - Mobile Sheet öffnet, alle 5 Nav-Items + Switcher sichtbar; Desktop-Nav ab `md:` (≥768px)
  - `pnpm build` SSG-clean, beide Locales als statische Seiten, Proxy als Middleware registriert

**Status am Ende:** M2 abgeschlossen. Layout-Chrome, Tokens, Animation-Primitives, shadcn-Primitives bereit. Alle Routen außer `/de` und `/en` rendern noch 404 (M3-Aufgabe).
**Nächster Schritt:** M3 — Statische Seiten DE.

---

## 2026-04-25 — Session 1: M1 Setup & Infra

**Commits:**
- `e712aea` Initial commit from Create Next App
- `a994cd5` M1: Setup & Infra – Next.js 16, next-intl, Supabase-Skeleton

**Was passierte:**
- Plan in `/Users/kaygewinner/.claude/plans/projekt-smarte-theaterdienste-breezy-moth.md` erstellt und vom User genehmigt
- Tooling-Check: pnpm via npm-global installiert; gh und supabase CLI fehlen, Workarounds dokumentiert
- Next.js 16 Bootstrap unter `smarte-theaterdienste-website/` mit TS, Tailwind v4, App Router, src/-Dir, pnpm
- Extra-Deps installiert: next-intl 4.9.1, gsap 3.15, @supabase/ssr, @supabase/supabase-js, clsx, tailwind-merge, cva, lucide-react
- Next.js-16-Docs aus `node_modules/next/dist/docs/` gelesen — Breaking Changes notiert (proxy.ts, async params, revalidateTag)
- i18n-Setup: `lib/i18n/{routing,request,navigation}.ts`, `next.config.ts` mit `withNextIntl`, `proxy.ts` für Locale-Routing
- Layout in `src/app/[locale]/layout.tsx` umstrukturiert: html/body, NextIntlClientProvider, Geist-Fonts, generateMetadata
- Landing-Skeleton in `src/app/[locale]/page.tsx`: Kicker, Title, Subtitle, 2× CTA, Inline-Nav
- Messages-Stub `de.json` + `en.json` mit nav, hero, footer, meta-Namespaces
- Helper: `lib/utils.ts` (cn), `styles/tokens.css` (Easings/Durations), `lib/gsap/registerScrollTrigger.ts`, `lib/supabase/{client,server}.ts` (Stubs)
- Meta-Files: README, .env.example, .gitignore (Vault- und Supabase-aware)
- Verifikation:
  - `pnpm exec tsc --noEmit` clean
  - Dev-Server auf Port 3030, `/de` und `/en` rendern korrekt, Locale-Detection-Redirect klappt
  - Mobile + Desktop screenshots ok
  - `pnpm build` produziert beide Locales als SSG, Proxy als Middleware registriert
- GitHub-Repo `Kaytm93/smarte-theaterdienste-website` (public) vom User im Web angelegt; via SSH gepusht
- Obsidian-Vault `SMARTE-THEATERDIENSTE/` nach Nexus-Pattern aufgebaut: START_HIER, KONTEXT, DASHBOARD, PROBLEME, ROADMAP, MUSTER, ENTSCHEIDUNGEN, CHANGELOG, INHALTE, API + verlauf/
- Altes `_vault/` (Obsidian-Substruktur) gelöscht, Inhalte in flache Vault-Struktur migriert
- CLAUDE.md aktualisiert: zeigt jetzt auf Vault + AGENTS.md

**Status am Ende:** Beide Locales lokal lauffähig, Skeleton-Hero rendert, Repo gepusht, Vault gefüllt. Nächster Schritt M2.

---

## Template für zukünftige Sessions

```
## YYYY-MM-DD — Session N: <Milestone> <kurzer Titel>

**Commits:**
- `<sha>` <message>

**Was passierte:**
- ...

**Status am Ende:** ...
**Nächster Schritt:** ...
```
