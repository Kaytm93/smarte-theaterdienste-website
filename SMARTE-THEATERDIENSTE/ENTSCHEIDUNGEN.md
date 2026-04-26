# 🧠 Architekturentscheidungen (ADRs)

| ADR    | Datum       | Entscheidung | Begründung |
|--------|-------------|--------------|------------|
| ADR-01 | 2026-04-25  | **Next.js 16** statt geplant 15 | `create-next-app` lieferte 16.2.4. Breaking Changes (proxy.ts, async params, revalidateTag-Profile) berücksichtigt. |
| ADR-02 | 2026-04-25  | **pnpm** als Package Manager | Schnell, disk-effizient, keine sudo nötig dank nvm-Prefix. Installation via `npm install -g pnpm`. |
| ADR-03 | 2026-04-25  | **Supabase CLI als dev-dep**, nicht global | npm-global wird vom Postinstall-Script verboten. Wird in M4 als `pnpm add -D supabase` ergänzt. |
| ADR-04 | 2026-04-25  | **GitHub-Repo manuell** im Web anlegen | `gh` CLI nicht installiert, Homebrew-Install interaktiv. SSH-Key existiert bereits → `git push` reicht. |
| ADR-05 | 2026-04-25  | **Locale-Prefix für beide Sprachen** (`/de`, `/en`) | SEO + hreflang sauber, kein „naked default", konsistent. |
| ADR-06 | 2026-04-25  | **Statisches Team in `content/{locale}/team.json`** statt DB | Nur 4 Personen, kein CMS-Bedarf, keine RLS nötig. |
| ADR-07 | 2026-04-25  | **`proxy.ts` statt `middleware.ts`** | Next.js 16 Pflicht-Rename. Funktion heißt `proxy`, nur nodejs-runtime. |
| ADR-08 | 2026-04-25  | **Tailwind v4 ohne tailwind.config.ts** | Tokens via `@theme inline` in CSS. Modernster Ansatz, weniger Boilerplate. |
| ADR-09 | 2026-04-25  | **shadcn/ui als Komponentenbasis** (statt Material/Mantine/Antd) | Copy-Paste-Architektur, volle Kontrolle, kein Lock-in, ideal für Custom-Design. Radix unter der Haube. |
| ADR-10 | 2026-04-25  | **next-intl statt eigenem i18n** | RSC-native, type-safe Messages, pathnames-Map, Mehrwochen-Sparen. |
| ADR-11 | 2026-04-25  | **SVG-Karte für Partner statt Leaflet** | ~20–50 Partner, keine Geo-Search nötig, GSAP-animierbar, top Performance. |
| ADR-12 | 2026-04-25  | **ISR + on-demand Revalidate** statt SSR für dynamische Inhalte | CDN-Cache, schnelle TTFB, bei Pflege via Supabase-Webhook sofort frisch. |
| ADR-13 | 2026-04-25  | **Server Actions statt API-Routes** für Forms | Kein eigenes API-Layer, server-only secrets, type-safe. |
| ADR-14 | 2026-04-25  | **Obsidian-Vault als `SMARTE-THEATERDIENSTE/`** im Projekt-Root, Nexus-Pattern | Plan und Code synchron, single source of truth, frische Sessions können sich orientieren. |
| ADR-15 | 2026-04-25  | **Port 3030** für Dev-Server | Konflikt vermeidet mit aether (5173) und nexus (5174). Konfiguriert in `.claude/launch.json` Workspace-Root. |

---

## Zukunftige offene ADRs

- **ADR-?? Schriftart Headlines** — Geist vs. kulturaffin Serif. M2.
- **ADR-?? Branding-Farben** — Tailwind-Default vs. eigene Palette. M2.
- **ADR-?? Comic-Strip Variante** — pinned horizontal scroll vs. vertical stagger. M6.
- **ADR-?? Newsletter** — überhaupt? M3+.
- **ADR-?? Analytics** — Vercel Analytics, Plausible, oder gar nichts? M8.
