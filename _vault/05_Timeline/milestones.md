---
tags: [timeline, milestones]
---

# Milestones M1 – M8

| # | Status | Milestone | Output |
|---|---|---|---|
| **M1** | 🟡 *in progress* | Setup & Infra | Repo, Next.js 16, pnpm, next-intl, Supabase-Skeleton, Vercel-Preview, GitHub-Push |
| M2 | ⏳ pending | Design-System | Tokens, Typo, Farben, Header/Footer, Animation-Primitives, shadcn-Setup |
| M3 | ⏳ pending | Statische Seiten DE | Alle SSG-Seiten mit Inhalten aus Miro/Referenz |
| M4 | ⏳ pending | Dynamic Content | Supabase Schema + Migrations + Seed + Termine/Blog/FAQ-UI |
| M5 | ⏳ pending | Partner-Deutschlandkarte | SVG, Hotspots, Side-Panel, GSAP-Polish |
| M6 | ⏳ pending | Animation-Polish | Comic-Strip, Parallax, Reveals, Reduced-Motion |
| M7 | ⏳ pending | i18n EN | Übersetzungen, hreflang, Switcher |
| M8 | ⏳ pending | Production-Polish | SEO, OG, Sitemap, Lighthouse ≥95, A11y-Audit |

## M1 – Detail-Status

- [x] Tooling-Check (pnpm installed, supabase als dev-dep später, gh skipped)
- [x] Next.js 16 bootstrappt mit TS/Tailwind/App-Router/src-dir
- [x] Extra-Deps installed: next-intl, gsap, @supabase/ssr, @supabase/supabase-js, clsx, tailwind-merge, cva, lucide-react
- [x] next-intl Setup: `src/lib/i18n/{routing,request,navigation}.ts`, `next.config.ts` plugin
- [x] Locale-Routing: `src/app/[locale]/{layout,page}.tsx`, `src/proxy.ts`
- [x] Messages-Stub: `src/messages/de.json`, `en.json`
- [x] Helper: `src/lib/utils.ts` (cn), `src/styles/tokens.css`, `src/lib/gsap/registerScrollTrigger.ts`
- [x] Meta-Files: README, .env.example, .gitignore (Obsidian-aware)
- [x] Obsidian-Vault Skeleton
- [ ] Git-Init + erster Commit
- [ ] GitHub-Repo (manuell via Web) + Push
- [ ] Verifikation: `pnpm dev` läuft, `/de` rendert, Locale-Switch funktioniert
- [ ] Vercel-Preview-Deploy

## M2 – Vorschau

- Custom Tailwind theme tokens (Farben, Spacing-Scale, Typo)
- Font-Auswahl (vermutlich Geist + Serif für Headlines, kulturaffin)
- shadcn init + erste Components: Button, Accordion, Sheet, Card
- `<Header>` mit sticky-translucent + `<LanguageSwitcher>`
- `<Footer>` mit Logo-Grid
- `<FadeInOnScroll>`, `<ParallaxImage>`, `<RevealText>` als Primitives
