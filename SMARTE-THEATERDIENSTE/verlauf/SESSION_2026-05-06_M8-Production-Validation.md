# Session 10 — M8 Production-Validation

> 2026-05-06, Folge-Session zu Session 9 (M8 Restpolish)

## Ziel

M8 in Production validieren: Redeploy auf Vercel, Lighthouse-Audit ≥ 95 in allen vier Kategorien, axe-core clean.

## Was lief

1. **Pre-Deploy-Gates clean.** `pnpm typecheck`, `pnpm lint`, `pnpm build` — alle ohne Output. Build-Manifest wie erwartet (alle Pages SSG, `/icon` und `/sitemap.xml` und `/robots.txt` Static, `/[locale]/opengraph-image` Dynamic).

2. **Production-Redeploy 1** — `dpl_DyvfbCWXoauUGNBx9zV6NDDG6ZC4`. Build remote in 29s, Deploy in 53s. Alias auf neuen Build umgezogen.

3. **Smoke-Test entdeckte Production-Bug.** 12 von 14 Routen 200, aber `/de/opengraph-image` und `/en/opengraph-image` lieferten 500. Lokal mit `pnpm start --port 3030` hatte vorher HTTP 200 mit Content-Type `image/png` geantwortet — irreführend, weil Status-Header geschrieben wird, bevor Satori rendert; der Body-Stream bricht dann ab.

4. **Bug-Reproduktion lokal.** `pnpm build && pnpm start` + curl mit längerem Timeout zeigte `Error: failed to pipe response`, cause: `Invalid value for CSS property "display". Allowed values: "flex" | "block" | "contents" | "none" | "-webkit-box". Received: "inline-block".` Der Übeltäter: `display: "inline-block"` am 14×14-Akzent-Span im OG-Kicker.

5. **OG-Fix.** `src/app/[locale]/opengraph-image.tsx:58` — `display: "inline-block"` → `display: "flex"`. Lokaler Re-Test: beide OG-Endpoints liefern 1200×630 PNGs (~87/90 KB, `8-bit/color RGBA, non-interlaced`).

6. **Production-Redeploy 2** — `dpl_29eiYsNZFNzbSQyfZtxnwWjmDXSn`. Re-Smoke gegen Production: alle 14 Routen 200, OG-Endpoints jetzt `image/png`. Meta-Tags-Check via curl + grep: canonical, hreflang DE/EN/x-default, og:title/description/url/image/type/width/height/alt, twitter:card=`summary_large_image`, twitter:image — alles wie spezifiziert.

7. **Lighthouse-Audit Run 1.** `pnpm dlx lighthouse@latest` gegen `/de` und `/en`:
   - DE: Performance **91**, A11y **96**, BP 100, SEO 100.
   - EN: Performance **95**, A11y **96**, BP 100, SEO 100.
   - A11y-Finding: `color-contrast` 0.00 (Footer-Captions/Liste).
   - Perf-Top-Findings: `unused-javascript`, `render-blocking-insight`, `network-dependency-tree-insight`.

8. **axe-core via pa11y.** `@axe-core/cli` und `pa11y` brauchen Puppeteer-/ChromeDriver-Postinstall, das pnpm blockiert. Workaround: `PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" CHROME_PATH="..." pnpm dlx pa11y@latest <URL> --runner axe`. Ergebnis: 8 Color-Contrast-Errors, alle im Footer:
   - `<p class="text-xs ... text-foreground/55">Gefördert von</p>` → 4.41:1
   - 6× `<span class="block truncate">` mit ererbtem `text-foreground/55`
   - `<p class="mt-4 text-xs text-foreground/50">© 2026</p>` → 4.30:1

9. **A11y-Fix in Footer.** `src/components/layout/Footer.tsx`: drei Stellen `text-foreground/55` und `text-foreground/50` → `text-foreground/65`. Andere Vorkommen (PageHero, EventCard, PostArticle, PartnerMap, termine/page.tsx, PostCard, PartnerMapClient) bewusst unangetastet — sie liegen entweder auf farbigen Backgrounds oder größeren Schriftgrößen und wurden weder von Lighthouse noch axe als Verstoß markiert.

10. **Production-Redeploy 3** — `dpl_Fa2MYm6iZJYfPygJHaADhsyPYzcf`. Re-axe gegen DE und EN: `No issues found!` Re-Lighthouse:
    - **DE: Performance 96, A11y 100, BP 100, SEO 100.**
    - **EN: Performance 96, A11y 100, BP 100, SEO 100.**
    - Core Web Vitals: LCP 2.6/2.7s, FCP 1.2/1.3s, CLS 0, TBT 30 ms, Speed-Index 3.0/3.1s.

11. **`.gitignore`** um `audits/` ergänzt — Lighthouse-HTML-Reports sind 550 KB pro Run und gehören nicht ins Repo.

## Was nicht lief

- **`vercel logs`** liefert in der MCP-Bash-Session keine Ausgabe (vermutlich Auth-Prompt-Detection oder Pipe-Buffering). Workaround: lokal reproduzieren.
- **`curl`** ist im PATH der MCP-Sessions nicht erreichbar; existiert aber unter `/usr/bin/curl`. In Skripten den vollen Pfad nehmen.
- **Lighthouse 12.x verlangt Node ≥ 22.19**, lokal 20.19.4. Warning, kein Failure.

## Nächste Schritte

Default: **M6 Animation-Polish** — Comic-Strip-Variante entscheiden (User-Entscheidung nötig: pinned-horizontal vs. vertical-stagger), Hero-Parallax, Hover-States, View-Transitions. Alternativ M7 EN-Übersetzungen oder M8-Erweiterungen (Per-Post-OG, Lighthouse-CI als Action).

## Geänderte Dateien

- `src/app/[locale]/opengraph-image.tsx` — Satori-Display-Fix
- `src/components/layout/Footer.tsx` — Color-Contrast-Fix
- `.gitignore` — `audits/` ergänzt
- `SMARTE-THEATERDIENSTE/{DASHBOARD,PROBLEME,CHANGELOG,ENTSCHEIDUNGEN,MUSTER}.md` — Doku
- `SMARTE-THEATERDIENSTE/verlauf/SESSION_2026-05-06_M8-Production-Validation.md` — diese Datei
