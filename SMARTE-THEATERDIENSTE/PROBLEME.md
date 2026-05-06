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

### Production-Validation für M8 (offen)
- **Lighthouse-Audit gegen Production fehlt.** M8-Layer (SEO/OG/Sitemap/Robots/Icon/CI) ist lokal verifiziert, aber noch nicht auf `https://smarte-theaterdienste-website.vercel.app` deployed und gemessen. Nächster Schritt: `pnpm dlx vercel@latest deploy --prod --yes`, danach `pnpm dlx lighthouse https://smarte-theaterdienste-website.vercel.app/de --only-categories=performance,accessibility,best-practices,seo`. Ziel ≥ 95.
- **axe-core-Run ausstehend.** Erst gegen Production sinnvoll: `pnpm dlx @axe-core/cli https://smarte-theaterdienste-website.vercel.app/de https://smarte-theaterdienste-website.vercel.app/en`.

## 🟡 Offene Fragen / Entscheidungen

- **Comic-Strip Landing:** Variante A (pinned horizontal scroll) vs. B (vertical stagger). Aktuell statisches 4-Card-Grid als Skeleton in `<ComicStrip>`. Entscheidung: M6.
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
