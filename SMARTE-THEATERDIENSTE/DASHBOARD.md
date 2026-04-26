# 📊 Dashboard — Smarte Theaterdienste

> Letzte Aktualisierung: 2026-04-25

## Status

| Bereich | Status |
|---|---|
| Projekt-Setup | ✅ M1 abgeschlossen |
| Design-System | ⏳ M2 wartet |
| Statische Seiten | ⏳ M3 wartet |
| Dynamische Inhalte (Supabase) | ⏳ M4 wartet |
| Partner-Karte | ⏳ M5 wartet |
| Animation-Polish | ⏳ M6 wartet |
| EN-Übersetzungen | ⏳ M7 wartet |
| Production-Polish | ⏳ M8 wartet |
| Vercel-Deployment | ⏳ noch nicht eingerichtet |
| Supabase-Projekt | ⏳ noch nicht angelegt |

## Was gerade läuft

**Nichts** — Session beendet nach M1. Kein Dev-Server aktiv, keine offenen Branches, alles auf `main` gepusht (Stand `a994cd5`).

## Letzte Aktivität

- **2026-04-25** — M1 Setup & Infra: Next.js 16 Bootstrap, next-intl-Routing, Vault-Struktur, Initial-Push zu GitHub (siehe [[CHANGELOG]])

---

## 📋 Was Claude beim nächsten Mal tun soll

**Default-Nächster-Schritt: M2 — Design-System**

Reihenfolge:
1. **Schriftarten-Entscheidung** mit User klären (Geist behalten? Serif für Headlines?)
2. **Branding-Farben** klären — bestehende Website war beim Plan-Erstellen 503; ggf. erneut prüfen oder User fragen
3. `pnpm dlx shadcn@latest init` — wählt Slate-Default oder ggf. eigene Farb-Tokens
4. shadcn components hinzufügen: `button`, `accordion`, `card`, `sheet`, `dialog`
5. `src/components/layout/Header.tsx` — sticky, translucent, mit `<LanguageSwitcher>`
6. `src/components/layout/Footer.tsx` — Logo-Grid + Impressum/DS-Links
7. `src/components/layout/LanguageSwitcher.tsx` — nutzt `useRouter` + `usePathname` aus `@/lib/i18n/navigation`
8. `src/components/animations/FadeInOnScroll.tsx` — GSAP + ScrollTrigger, respekt `prefers-reduced-motion`
9. `src/components/animations/RevealText.tsx`
10. `src/components/animations/ParallaxImage.tsx`
11. `src/styles/tokens.css` ausbauen mit Farb-Tokens, Typo-Scale, Spacing
12. Landing-Page in `src/app/[locale]/page.tsx` mit Header+Footer einbetten und Hero-Animation hinzu

**Verifikation am Ende von M2:**
- `pnpm dev` → `/de` und `/en` rendern mit Header+Footer und Switcher
- Locale-Switch über `<LanguageSwitcher>` behält Pfad
- Mobile + Desktop screenshots
- `prefers-reduced-motion: reduce` → keine Animationen

**Falls User andere Prioritäten setzt:**
- Vercel-Deployment vorziehen → `vercel.json`-Skeleton + Deploy-Doku in `KONTEXT.md`
- Supabase-Projekt vorziehen → User legt im Web an, gibt URL/Keys, Stub aktivieren
- Inhalts-Arbeit (M3) ohne Design vorziehen → Macht weniger Sinn, weil Design-Tokens noch fehlen

---

## Bekannte offene Fragen für M2/M3

- **Schrift Headlines:** Geist behalten (clean-modern) oder kulturaffin Serif (Söhne / IBM Plex Serif / Cormorant)?
- **Comic-Strip auf Landing:** pinned horizontal scroll (mehr Wow) vs. vertical stagger (mobile-friendlich)? Entscheidung in M6.
- **Branding-Farben:** Die alte Website https://smarte-theaterdienste.de/de war 2026-04-25 mit 503 down. Beim nächsten Versuch erneut fetchen oder User fragen.
- **Reference-Site sniffen:** Sobald Site wieder up ist, kurz screenshotten und in `INHALTE.md` ablegen.

## Bekannte Tooling-Lücken (siehe [[PROBLEME]])

- `gh` CLI fehlt — GitHub-Repo wurde manuell vom User erstellt
- `supabase` CLI nicht global (npm-Postinstall verbietet es) — wird in M4 als dev-dep installiert
- Homebrew nicht installiert
