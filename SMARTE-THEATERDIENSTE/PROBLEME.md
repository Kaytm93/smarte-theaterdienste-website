# 🐛 Probleme & TODOs

## 🔴 Offen

### Tooling-Lücken (System)
- **`gh` CLI fehlt** auf dem System. GitHub-Repos müssen manuell vom User im Web erstellt werden.
  → Workaround: User legt Repo an, gibt SSH-URL, Claude pusht via vorhandenen SSH-Key.
- **Homebrew fehlt.** Tools wie `gh`, `supabase` CLI müssen über alternative Wege (npm global, Binärdownload, dev-dep).
- **`supabase` CLI nicht global installierbar** — postinstall-Script verbietet `npm install -g supabase`.
  → Workaround: ab M4 als `pnpm add -D supabase` im Projekt.

### Externe Abhängigkeiten
- **Bestehende Website war 2026-04-25 mit 503 nicht erreichbar.** Die geplante Orientierung an https://smarte-theaterdienste.de/de für Designsprache und Inhaltsstruktur konnte nur teilweise stattfinden (Plan basiert primär auf Miro-Inhalten + User-Beschreibung).
  → ToDo: Bei nächster Session erneut fetchen, ggf. screenshotten, in INHALTE.md ergänzen.

## 🟡 Offene Fragen / Entscheidungen

- **Akzentfarbe:** Slate-Basis durch shadcn-Init gesetzt (neutral baseColor in `components.json`). Slot `--accent-brand` in `src/styles/tokens.css` zeigt initial auf foreground. Konkreter Hex/OKLCH wird in M3 definiert (User-Vorgabe oder aus alter Site sobald online).
- **Comic-Strip Landing:** Variante A (pinned horizontal scroll) vs. B (vertical stagger). Entscheidung: M6.
- **Newsletter-Signup:** Im Miro nicht erwähnt — User-Wunsch? Falls ja, später.
- **Kontaktformular Empfänger-Adresse:** Aktuell Placeholder in `.env.example`. Echte Adresse vom User.

## 🟢 Wissenswert (keine Bugs, aber Aufmerksamkeit nötig)

- **Next.js 16** statt geplant 15 — Breaking Changes berücksichtigt (proxy.ts, async params, revalidateTag-Profile). Siehe `MUSTER.md`.
- **localeDetection ist standardmäßig `true`** in next-intl. Erste Besucher mit `Accept-Language: en-*` werden auf `/en` geleitet, nicht zwingend auf `/de` (Default-Locale). User-Erwartung klären, ggf. `localeDetection: false` setzen.
- **Tailwind v4** nutzt `@theme inline` in `globals.css` statt `tailwind.config.ts`. Keine separate Config-Datei nötig.
- **`.claude/launch.json`** (Workspace-Root) enthält den Dev-Server-Eintrag auf Port **3030** (nicht 3000, weil Konflikt mit anderen Projekten).

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
