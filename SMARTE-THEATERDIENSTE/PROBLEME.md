# 🐛 Probleme & TODOs

## 🔴 Offen

### Tooling-Lücken (System)
- **`gh` CLI fehlt** auf dem System. GitHub-Repos müssen manuell vom User im Web erstellt werden.
  → Workaround: User legt Repo an, gibt SSH-URL, Claude pusht via vorhandenen SSH-Key.
- **Homebrew fehlt.** Tools wie `gh`, `supabase` CLI müssen über alternative Wege (npm global, Binärdownload, dev-dep).

### Vercel-GitHub-Integration
- **Production läuft, aber GitHub ist noch nicht mit Vercel verbunden.** `vercel link` hat das Projekt angelegt, `vercel git connect https://github.com/Kaytm93/smarte-theaterdienste-website` scheitert aber mit `Failed to connect ... Make sure there aren't any typos and that you have access to the repository if it's private.`
  → Vermutlich fehlt der Vercel-GitHub-App Zugriff auf das persönliche Repo. Workaround: Deploys per `vercel deploy --prod`; dauerhaft im Vercel-Dashboard unter Project → Settings → Git verbinden.

### Externe Abhängigkeiten
- **Bestehende Website war 2026-04-25 mit 503 nicht erreichbar.** Die geplante Orientierung an https://smarte-theaterdienste.de/de für Designsprache und Inhaltsstruktur konnte nur teilweise stattfinden (Plan basiert primär auf Miro-Inhalten + User-Beschreibung).
  → ToDo: Bei nächster Session erneut fetchen, ggf. screenshotten, in INHALTE.md ergänzen.

### Performance-Restposten (Lighthouse Performance 96/100, kein Blocker)
- **Performance bleibt bei 96/100** — die drei Insights `unused-javascript`, `render-blocking-insight`, `network-dependency-tree-insight` ziehen den Score. Typische Next.js-/React-Themen, kein leichter Fix ohne Bundle-Tuning. Optionen für später: per-Page Suspense-Boundaries, dynamische Imports der GSAP-Animation-Primitives, Preload-Hinweise im Layout. Kein Blocker — alle anderen Kategorien 100/100, Core Web Vitals (LCP 2.6 s, CLS 0, TBT 30 ms) sind grün.

### Tooling-Restposten (kein Blocker)
- **`@axe-core/cli` und `pa11y` brauchen Puppeteer-/ChromeDriver-Postinstall**, das pnpm standardmäßig blockiert. Workaround: `PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" CHROME_PATH="..." pnpm dlx pa11y@latest <URL> --runner axe`. Wenn axe-Audits regelmäßig laufen sollen, in `package.json` unter `pnpm.onlyBuiltDependencies` zusätzlich `chromedriver` und/oder `puppeteer` whitelisten.
- **`curl` nicht im Shell-PATH der MCP-Bash-Sessions** (existiert aber unter `/usr/bin/curl`). Im Shell-Skript explizit den vollen Pfad nehmen oder am Anfang `CURL=/usr/bin/curl`.
- **Lighthouse 12.x verlangt Node ≥ 22.19**, lokal läuft 20.19.4. Lighthouse warnt aber, nicht failed — Audits laufen erfolgreich durch.

## 🟡 Offene Fragen / Entscheidungen

- **Newsletter-Signup:** Im Miro nicht erwähnt — User-Wunsch? Falls ja, später.
- **Kontaktformular Empfänger-Adresse:** Aktuell Placeholder in `.env.example`. Echte Adresse vom User.
- **Echte Inhalte vom User benötigt:**
  - Portraits Sophie Moriarty für `public/team/{sina-schmidt,peter-retzlaff,claudia-groenniger,madeleine-scheuerpflug}.jpg` (Fallback aktuell: Initialen)
  - Partner-Logos als SVG für `public/logos/{buehnenverein,akademie,fraunhofer,acatech,nfdi4culture,bkm}.svg` (Footer zeigt aktuell nur Text)
  - Hero-Visual für Landing (optional, sonst bleibt textbasiert)
  - Echte Impressum-/Datenschutz-Texte vom Bühnenverein-Auftraggeber (aktuell sichtbarer TODO-Marker)
  - E-Mails der Ansprechpersonen verifizieren (aktuell vermutet `vorname.nachname@buehnenverein.de`)

## 🟢 Wissenswert (keine Bugs, aber Aufmerksamkeit nötig)

- **Vault existiert an zwei Orten** — Projekt (`SMARTE-THEATERDIENSTE/`, in Git) und User-Obsidian (`~/Documents/SMARTE-THEATERDIENSTE/`, mit `.obsidian/` Config). Beide müssen am Sessionende identisch sein. Sync-Befehl + Verifikation in `CLAUDE.md` Schritt 3. Niemals `.obsidian/` syncen.
- **Next.js 16** statt geplant 15 — Breaking Changes berücksichtigt (proxy.ts, async params, revalidateTag-Profile). Siehe `MUSTER.md`.
- **localeDetection ist standardmäßig `true`** in next-intl. Erste Besucher mit `Accept-Language: en-*` werden auf `/en` geleitet — bewusste Entscheidung (ADR-19), bleibt so.
- **Tailwind v4** nutzt `@theme inline` in `globals.css` statt `tailwind.config.ts`. Keine separate Config-Datei nötig.
- **`.claude/launch.json`** (Workspace-Root) enthält den Dev-Server-Eintrag auf Port **3030** (nicht 3000, weil Konflikt mit anderen Projekten). Preview-MCP überschreibt manchmal auf Port 3000 — funktional irrelevant.

## ✅ Gelöst

| Datum | Problem | Lösung |
|---|---|---|
| 2026-05-07 | M8-Sitemap-Restposten: `lastmod` wurde in `src/app/sitemap.ts` pauschal mit `new Date()` gesetzt; Blog-URLs zeigten dadurch Build-Zeit statt Inhaltsdatum. Außerdem wurde die Sitemap bei Post-Revalidate nicht gezielt invalidiert. | Neuer Query-Helper `listPublishedPostSitemapEntries()` liefert `slug` + `published_at`; Sitemap nutzt fuer statische Seiten `STATIC_CONTENT_LAST_MODIFIED` und fuer Blog-Liste/-Details echte `published_at`-Werte. `/api/revalidate` invalidiert bei `posts` und `post_translations` jetzt zusätzlich `/sitemap.xml`. Lokal verifiziert via `pnpm typecheck`, `pnpm lint`, `pnpm build`, `curl /sitemap.xml` und Revalidate-Smoke; production-live mit Deploy `dpl_FH5hja9zd9E81kigJt7vZYi5q5yw`. |
| 2026-05-07 | M7 EN-Translation-Lücke in Supabase: `wip-konnektor-roadmap` hatte keine Übersetzungen; zusätzlich fehlte live auch EN für den veröffentlichten Post `erste-pilotpartner-gewonnen` | Neue Migration `20260507120000_m7_english_post_translations.sql` ergänzt/aktualisiert Blog-Translations (`kickoff-datenraum-kultur` EN geglättet, `erste-pilotpartner-gewonnen` EN ergänzt, Draft `wip-konnektor-roadmap` DE/EN ergänzt). `supabase db push --yes` erfolgreich; Kontrollquery zeigt für alle drei Posts `{de,en}`. `seed.sql` synchronisiert denselben Stand für lokale Resets. Production-Smoke: `/en/blog` und `/en/blog/erste-pilotpartner-gewonnen` HTTP 200 mit neuen Texten. |
| 2026-05-07 | M6 Animation-Polish war lokal grün, aber noch nicht production-live | `pnpm typecheck`, `pnpm lint`, `pnpm build` clean; Production-Deploy per `pnpm dlx vercel@latest deploy --prod --yes` erfolgreich (`dpl_5fe7wA8PULdKp8UT8JodihG5YXv2`). Smoke-Test: 13 Routen/Assets alle HTTP 200. Playwright-Check: ComicStrip-Stagger live, Mobile ohne Horizontal-Overflow, Blog-Soft-Navigation ohne Console-Errors. ViewTransition-Morphs bleiben bis zu echten `cover_image_url`-Werten strukturell statt visuell validiert. |
| 2026-05-07 | M6 Animation-Polish offen, Comic-Strip-Variante als Designentscheidung blockierend | Variante B (vertical stagger reveal) entschieden — mobile-friendly, keine Pinning-Komplexität. ComicStrip in Server-Wrapper + Client-`ComicStripFrames` (GSAP-Stagger 0.12 s, `useGSAP` + `prefers-reduced-motion`-Gate) gesplittet. Hero-Stagger via `STAGGER=0.08` konsolidiert + statischer Akzent-Blob (kein Parallax bis Hero-Visual da). Alle Cards auf einheitliches Hover-Schema. View Transitions API verdrahtet (`experimental.viewTransition` + `<ViewTransition name="post-cover-${slug}">`). Layout-globaler `ScrollTriggerRefresher` für Soft-Nav-Refresh. `globals.css` Reduced-Motion-Regel auf `::view-transition-{old,new,group}(*)`. ADR-37 / ADR-38 / ADR-39. |
| 2026-05-07 | TypeScript kannte `<ViewTransition>`-Export von `react` nicht (Symbol nur in `@types/react/canary.d.ts`, nicht im Default-Export) | `src/types/react-canary.d.ts` mit `/// <reference types="react/canary" />` zieht die Canary-Typen projektweit ins TS-Programm. Runtime ist über Nexts gebundeltes `react` in `node_modules/next/dist/compiled/react/cjs/react.production.js` ohnehin verfügbar (exportiert `ViewTransition = REACT_VIEW_TRANSITION_TYPE`). |
| 2026-05-07 | `pnpm typecheck` brach mit Konflikten in `.next/types/cache-life.d 2.ts` und `.next/types/routes.d 2.ts` | macOS-Finder-Style "duplicate" Dateien aus dem `.next`-Cache. `find .next/types -name "* 2.ts" -delete`. Cache wird beim nächsten Build neu generiert. |
| 2026-05-07 | Preview-Dev-Server crashte direkt nach `pnpm build` mit `Failed to open SST file …/00000954.sst` | Turbopack-Cache aus `pnpm build` und Dev-Server kollidieren bei gemischter Nutzung. `rm -rf .next` vor dem Dev-Start löst das; permanent: nur `pnpm dev` ODER `pnpm build` pro Session. |
| 2026-05-06 | `/de/opengraph-image` und `/en/opengraph-image` lieferten 500 in Production (lokal `pnpm start` HTTP 200, aber stream broken) | Satori (das Engine hinter `next/og`'s `ImageResponse`) unterstützt kein `display: inline-block`. Der 14×14-Akzent-Punkt im Kicker hatte genau das. Fix in `src/app/[locale]/opengraph-image.tsx:58` von `inline-block` auf `flex`. ADR-36. Beide Endpoints liefern jetzt valide 1200×630 PNGs. |
| 2026-05-06 | Lighthouse-Accessibility 96/100, axe-core-Run zeigt 8 Color-Contrast-Errors im Footer (`text-foreground/55` → 4.41:1, `text-foreground/50` → 4.30:1, Ziel 4.5:1) | Drei Stellen in `src/components/layout/Footer.tsx` von `/55` und `/50` auf `/65` angehoben. axe-clean nach Redeploy, A11y-Score 100/100. Andere `text-foreground/55`-Vorkommen (PageHero, EventCard, etc.) bewusst unangetastet — sie liegen entweder auf farbigen Backgrounds oder in größeren Schriften und wurden weder von Lighthouse noch axe als Verstoß markiert. |
| 2026-05-06 | Twitter-Card fiel auf Default `summary` zurück, obwohl Layout `summary_large_image` setzt | `pageMetadata`-Helper überschrieb das `twitter`-Object komplett ohne `card`. Helper setzt jetzt selbst `card: "summary_large_image"`. Verifiziert via curl auf `/de/projekt`. |
| 2026-05-06 | Top-Level `/icon` redirected auf `/de/icon` → 500 (`InvariantError: client reference manifest`) | i18n-Proxy-Matcher in `src/proxy.ts` erweitert um Convention-Files-Exclude: `icon|apple-icon|opengraph-image|twitter-image|manifest`. `/sitemap.xml` und `/robots.txt` waren schon durch `.*\..*`-Pattern abgedeckt. |
| 2026-04-25 | `pnpm` nicht installiert | `npm install -g pnpm` (geht ohne sudo via nvm-Prefix) |
| 2026-04-25 | Workspace-Pfad in User-Anweisung war Windows (`D:/...`) | macOS-Pfad mit User abgestimmt |
| 2026-04-25 | Reference-Website 503 | Plan basiert auf Miro-Inhalten + User-Beschreibung; Site bei nächster Session erneut prüfen |
| 2026-04-25 | Next.js 16 Breaking Changes | `proxy.ts` statt `middleware.ts`, `await params`, `revalidateTag(tag, 'max')` — dokumentiert in MUSTER.md |
| 2026-04-26 | Schriftart-Entscheidung (Geist vs. Serif) | User-Entscheidung: Geist Sans behalten. Headlines + Body via `--font-geist-sans` |
| 2026-04-26 | `body` font-family hartcodiert auf `Arial, Helvetica` (Create-Next-App-Default) | shadcn-Init überschrieb `globals.css`, `html` nutzt jetzt `@apply font-sans`; `--font-sans` an `--font-geist-sans` gebridge'd |
| 2026-04-26 | shadcn `--font-sans: var(--font-sans)` zirkulär nach init | In `globals.css` `@theme inline` auf `var(--font-geist-sans)` umgebogen |
| 2026-04-26 | LanguageSwitcher TS-Fehler bei dynamischem `/blog/[slug]` | Pattern `{ pathname, params }` mit `useParams()` aus `next/navigation` + lokalisiertem `@ts-expect-error` |
| 2026-04-26 | Akzentfarbe noch nicht definiert (M2-Offen) | M3: User-Entscheidung Datenraum-Blau `oklch(0.55 0.16 250)` + `--accent-brand-foreground` für Text auf Akzent. Bridge in `globals.css` `@theme inline`. ADR-22 |
| 2026-04-26 | Header-Nav führt teils ins Leere (Blog/FAQ/Termine 404) | M3: Coming-Soon-Stubs unter denselben Routen via `<ComingSoonHero>`-Component. M4 ersetzt mit Supabase-Pages. ADR-24 |
| 2026-04-26 | JSON-Parser-Fehler durch ASCII-Quote im DE-String | „…" mit U+0022 schloss JSON-String. Fix: U+201C („…") als typografisch korrektes Schlusszeichen verwenden. |
| 2026-04-27 | `supabase` CLI als pnpm-dev-dep installiert kein Binär (postinstall blockiert) | `pnpm.onlyBuiltDependencies: ["supabase"]` in `package.json` ergänzt → `pnpm install` lädt das Go-Binär (`darwin_arm64.tar.gz`), `pnpm exec supabase --version` liefert `2.95.5`. |
| 2026-04-27 | Typed Supabase-Joins kollabierten auf `never` ohne `Relationships`-Feld im hand-rolled `Database`-Type | `.returns<RowType[]>()`-Cast pro Query in `lib/supabase/queries.ts` — bypasst Inferenz, bleibt kompatibel mit `supabase gen types --linked`-Output. Cast kann später entfernt werden. |
| 2026-04-30 | Supabase-Cloud-Projekt + `.env.local` fehlten | User legte Projekt `hyirpaloozcautcxhbqk` (EU-Frankfurt) an, lieferte URL + anon-key + service-role-key + PAT. Claude generierte `REVALIDATE_SECRET` lokal, schrieb `.env.local`, lief `supabase login --token`, `supabase link`, `supabase db push`, `db query --linked -f seed.sql`. Pages rendern jetzt Live-Daten. |
| 2026-04-30 | `supabase db seed` zielt nur auf lokale DB, nicht auf Cloud | Stattdessen `pnpm exec supabase db query --linked -f supabase/seed.sql` — pipet die SQL via Management API ein. Verifiziert mit count-Query (3/3/2/4/5/10/4 wie erwartet). |
| 2026-04-30 | `pnpm exec next build` brach mit "cookies() inside generateStaticParams" | `getSupabaseServer()` ruft `cookies()`. In Next.js 16 ist das in `generateStaticParams` (Build-Zeit ohne HTTP-Request) verboten. Lösung: neuer `getSupabaseAnon()`-Helper (`@supabase/supabase-js` `createClient` ohne Session). Siehe [[ENTSCHEIDUNGEN#ADR-31]]. |
| 2026-04-30 | Pages wechselten von ● SSG auf ƒ Dynamic, sobald Supabase-Env gesetzt war | Cookie-Lesen in den Queries triggert Dynamic-Switch. Alle Public-Read-Queries auf `getSupabaseAnon()` umgestellt → Pages wieder ● SSG mit 60s ISR. Cookie-Server-Client bleibt für spätere Auth-Features. |
| 2026-04-30 | Vercel-Deployment fehlte | Vercel-CLI per Device-Login authentifiziert, Projekt `kaytm93s-projects/smarte-theaterdienste-website` angelegt, Production-Env-Vars gesetzt, finaler Production-Deploy auf `https://smarte-theaterdienste-website.vercel.app` erfolgreich. |
| 2026-04-30 | Lokale Env-Dateien konnten beim Vercel-CLI-Deploy ins Upload-Bundle geraten | `.vercelignore` ergänzt: `.env*`, `.vercel/`, `.claude/`, `.next/`, `node_modules/`, Obsidian-Config und `supabase/.temp/` werden nicht hochgeladen. Finaler Redeploy lief ohne `.env`-Warnung. |
| 2026-04-30 | Supabase-Revalidate-Webhook fehlte | Statt Studio-Hook direkt in der Cloud-DB eingerichtet: `pg_net` aktiviert, `public.revalidate_nextjs_cache()` angelegt, Trigger auf `posts`, `post_translations`, `events`, `event_translations`, `faqs`, `faq_translations`. Test-Update erzeugte `net._http_response.status_code = 200`. |
| 2026-05-04 | M5 Partner-Karte war nur lokal verifiziert, nicht in Production | `pnpm dlx vercel@latest deploy --prod --yes` aus dem Projekt-Root: Build remote in 28s, Deploy in 48s, Production-Alias automatisch umgezogen. Smoke-Test gegen `https://smarte-theaterdienste-website.vercel.app/de/beteiligung/mitwirkung` 200, alle 4 Partner aus Seed im SSG-HTML. Vercel-GitHub-Integration bleibt unverbunden — Deploys weiterhin per CLI. |
