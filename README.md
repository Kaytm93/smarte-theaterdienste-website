# Smarte Theaterdienste – Website

Mehrsprachige Marketing- und Info-Website für den Datenraum-Kultur-Use-Case
**„Smarte Theaterdienste"** des Deutschen Bühnenvereins. Thema: maschinenlesbare
Theaterspielpläne via JSON/ORIF-Schnittstelle.

## Tech-Stack

- **Next.js 16** (App Router, RSC, Server Actions, Turbopack)
- **TypeScript strict**, **Tailwind CSS v4**
- **next-intl** für i18n (DE/EN)
- **GSAP + ScrollTrigger** für subtile, apple-like Animationen
- **Supabase** (Postgres) für Blog, Termine, FAQ, Partner-Karte
- **shadcn/ui** Komponentenbasis (Radix-Primitives)
- Hosting: **Vercel**

## Quickstart

```bash
pnpm install
cp .env.example .env.local   # und Werte eintragen
pnpm dev                     # http://localhost:3000 → redirect /de
```

Wegen Next.js 16: Turbopack ist Default für `dev` und `build` – keine Flags nötig.

## Verzeichnisstruktur

```
src/
  app/[locale]/   – lokalisierte Routen (DE/EN)
  components/     – ui/, layout/, sections/, animations/, forms/
  lib/i18n/       – routing, request, navigation
  lib/supabase/   – Browser- & Server-Client (M4)
  lib/gsap/       – ScrollTrigger-Setup
  messages/       – de.json, en.json (statische UI-Strings)
  content/        – statische Inhalte pro Locale
  styles/         – Design-Tokens
src/proxy.ts      – next-intl Routing-Proxy (Next.js 16: ersetzt middleware.ts)
supabase/         – Migrations + Seed
_vault/           – Obsidian Vault als Projektplaner
```

## Sprachen & Routing

`/de` (Default) und `/en` sind beide URL-prefixed. Slug-Übersetzungen über
`next-intl/routing` (`pathnames`-Map). Navigation immer via
`@/lib/i18n/navigation` (`Link`, `redirect`, `useRouter`).

## Wichtig (Next.js 16)

- **`proxy.ts` statt `middleware.ts`** – bei Erweiterungen Funktion `proxy` exportieren
- **`params` und `searchParams` sind Promises** – immer `await`
- **`revalidateTag(tag, profile)`** – zweites Argument verpflichtend
- Vor jeder Doku-Lektüre: `node_modules/next/dist/docs/` ist die autoritative Quelle für diese Version

## Projektplan & Vault

Vollständiger Kontext, Roadmap, Architektur, Inhalte, Patterns:
**`SMARTE-THEATERDIENSTE/`** (Obsidian-Vault) – im Repo versioniert.

Frische Claude-Code-Sessions: lies zuerst `SMARTE-THEATERDIENSTE/START_HIER.md`.
Die `CLAUDE.md` im Repo-Root verweist automatisch dorthin.

## Lizenz

TBD – wird mit dem Projektträger geklärt.
