---
tags: [komponenten]
---

# Komponenten-Hierarchie

## Layout (alle Seiten)
- `<RootLayout>` (`src/app/[locale]/layout.tsx`)
  - `<NextIntlClientProvider>`
    - `<Header>` (M2)
      - Logo
      - Nav-Links
      - `<LanguageSwitcher>`
    - `{children}` ← Page
    - `<Footer>` (M2)
      - Logo-Grid (Akademie Dortmund, acatech, Fraunhofer FIT, NFDI4culture, BKM)
      - Impressum / Datenschutz Links

## Sections (per Page)

### Landing (`01`)
- `<Hero>` (kicker, title, subtitle, CTAs)
- `<ComicStrip>` „Problem → Perspektive"
- `<PartnerLogos>` (grayscale grid)

### Ansprechpersonen (`01.2`)
- `<TeamGrid>` mit `<ContactCard>` × 4

### Termine (`01.3`)
- `<EventList>` ← Supabase ISR

### Projekt (`02`)
- Text-Sections + `<TimelineGraphic>`

### Standards (`02.2` / `02.3`)
- MDX-Content-Block + Code-Snippets + `<Diagram>` (z. B. JSON-Beispiel)

### Beteiligung (`03`) + Mitwirkung (`03.2`)
- `<Hero>` + `<StepFlow>` + `<PartnerMap>` (SVG-Karte M5)

### Anwendungsbeispiele (`03.3`)
- `<UseCaseCard>` × 3

### Blog (`04`)
- `<BlogList>` (Karten) + `<BlogPost>` (MDX/Markdown render)

### FAQ (`05`)
- `<FaqAccordion>` (Radix Accordion)

## Shared (`components/animations/`)
- `<FadeInOnScroll>` – y:30→0, opacity 0→1, ease power2.out
- `<RevealText>` – Wort-für-Wort stagger
- `<ParallaxImage>` – background y-shift via ScrollTrigger
- `<ScrollProgress>` (optional)

## Shared (`components/ui/` via shadcn)
- Button, Accordion, Sheet, Card, Dialog, Input, Label
