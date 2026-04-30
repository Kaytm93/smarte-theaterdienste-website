# 🐛 Probleme & TODOs

## 🔴 Offen

### Tooling-Lücken (System)
- **`gh` CLI fehlt** auf dem System. GitHub-Repos müssen manuell vom User im Web erstellt werden.
  → Workaround: User legt Repo an, gibt SSH-URL, Claude pusht via vorhandenen SSH-Key.
- **Homebrew fehlt.** Tools wie `gh`, `supabase` CLI müssen über alternative Wege (npm global, Binärdownload, dev-dep).

### Supabase-Webhook im Studio
- **Webhook noch nicht angelegt.** Voraussetzung ist Production-Deployment. Sobald Vercel-URL existiert: Studio → Database → Webhooks → New Hook auf `posts/post_translations/events/event_translations/faqs/faq_translations`, Method POST, URL `https://<vercel-domain>/api/revalidate?secret=<REVALIDATE_SECRET>`.

### Externe Abhängigkeiten
- **Bestehende Website war 2026-04-25 mit 503 nicht erreichbar.** Die geplante Orientierung an https://smarte-theaterdienste.de/de für Designsprache und Inhaltsstruktur konnte nur teilweise stattfinden (Plan basiert primär auf Miro-Inhalten + User-Beschreibung).
  → ToDo: Bei nächster Session erneut fetchen, ggf. screenshotten, in INHALTE.md ergänzen.

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
