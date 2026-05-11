# 📝 Changelog

## 2026-05-11 — Session 23: Editorial-Redesign der gesamten Website

**Commits / Deploy-Basis:**
- `be7a9cc` M14: Editorial-Redesign im Zeitungsstil
- Production-Deploy nach Commit/Push.

**Was passierte:**

- **Vault + Design-Plugin gelesen:** Pflichtdateien `START_HIER`, `KONTEXT`, `DASHBOARD`, `PROBLEME`, `MUSTER`, `INHALTE` und zusätzlich `API.md` gelesen. Relevante Next.js-16-Dokumente aus `node_modules/next/dist/docs/` geprüft (`Layouts and Pages`, `CSS`, `Font Optimization`, `View Transitions`). Das User-Zip `website-design-ultra.zip` wurde als Design-Regelwerk gelesen: `core-rules`, `style-directions`, `color-palettes`, `typography`, `motion-system`, `component-patterns`, `ui-states`.
- **Design-Entscheidung:** Direktion `Editorial/Magazine`, aber nicht beige-dominiert: Papier/Tinte, Datenraum-Blau und Rubrik-Rot. Ziel: Kulturzeitung statt SaaS-Landingpage, mit smooth Reveals über bestehendes GSAP und Reduced-Motion-Fallback.
- **Globales Editorial-System:** `src/styles/tokens.css` ersetzt die bisherige Glow-/Surface-Sprache durch Papier/Tinte/Raster/Linien, Breakpoint-basierte Typografie ohne viewport-skalierte Fontgrößen und ohne negative Laufweite. `src/app/globals.css` bindet `font-serif`, reduziert Motion bei `prefers-reduced-motion`, ergänzt `.editorial-kicker`, `.editorial-rule`, `.editorial-copy` mit Drop-Cap und `.paper-panel`.
- **Typografie:** `src/app/[locale]/layout.tsx` lädt zusätzlich `Newsreader` via `next/font/google` als Display-Serif. Body bleibt Geist Sans, Headlines/Masthead/Editorial-Cover nutzen die Serif.
- **Website-weite UI-Umstellung:** Header wird zum Zeitungskopf mit Ausgabe/Dateline; Footer zum Zeitungsabschluss. Landing wird zur Frontpage mit Masthead-Rule, Lead-Story, Bildkasten und Infostreifen. `PageHero`, `TextSection`, `FeatureGrid`, `NetworkMapSection`, `ComicStrip`, `PostCard`, `EventCard`, `UseCaseCard`, `StepCard`, `ContactCard`, `FaqAccordion`, `PartnerMap`, `ResourceLinkGrid`, `PostArticle`, `PostCoverVisual` und `ComingSoonHero` wurden auf Linienraster, kleinere Radien, Serif-Hierarchie, Rubriklabels und weniger Card-Glow umgestellt.
- **Tooling-Fix:** `eslint.config.mjs` ignoriert `.vercel/**`, weil lokale Vercel-Build-Artefakte sonst den Projekt-Lint verschmutzen.
- **Verifikation:** `pnpm typecheck`, `pnpm lint`, `pnpm build` clean. Production-like Server `pnpm start --port 3030`; Playwright Desktop 1440×1000 und Mobile 390×844: `/de` ohne Horizontal-Overflow, Console 0 Errors/Warnings, Mobile-Menü funktioniert. Routencheck auf `/de/blog`, `/de/beteiligung/mitwirkung`, `/de/faq`, `/de/termine`, `/en`: jeweils H1 sichtbar, kein Horizontal-Overflow, Console 0 Warnings/Errors.

**Status am Ende:** Editorial-Redesign ist lokal production-validiert. Inhalte, Routing, Supabase-Queries und i18n-Keys bleiben kompatibel; nur `nav.edition` und `nav.dateline` wurden ergänzt. Nächster Projektschritt bleibt Custom-Domain-DNS oder finale Rechtstexte.

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
