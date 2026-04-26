# 📄 Inhalte & Tonality

> Maßstab: **Miro-Board > bestehende Website**. Wo die alte Site fehlt oder anders strukturiert ist, folgt das neue Projekt dem Miro-Board.

---

## Tonality

- **bildhaft, metaphorisch** („Besteckkasten", „Leitung legen", „Schnittstelle verpflanzen")
- **kulturaffin**, nicht techbroish
- **nahbar, sympathisch** — hinter dem Projekt stehen reale Menschen (siehe Ansprechpersonen)
- **knapp, präzise** — nicht überladen
- **Gendergerecht** mit Doppelpunkt (z. B. „Intendant:innen", „Beta-Tester:in")

## Inhaltlicher Einstieg pro Seite

Universelles Schema:
1. User abholen (Problem)
2. Mehrwert/Nutzen für User
3. Schnittstelle als Lösung
4. Details zum Use Case
5. Details zum Datenraum Kultur

---

## Sitemap & Sektionen (aus Miro)

### 01 — Landing Page (`/`)
- Titel: „Datenraum Kultur, Use Case 3: Smarte Theaterdienste"
- Projektziel: „Entwicklung maschinenlesbarer Theaterspielpläne als Teil der Digitalstrategie des Bundes"
- Partner-Logos: Akademie für Theater und Digitalität Dortmund, Fraunhofer FIT, acatech, NFDI4culture, BKM
- **Comic-Strip-Einstieg:** „Das Problem" → „Perspektive" (visuell ansprechend)

### 01.2 — Ansprechpersonen (`/ansprechpersonen` ↔ `/contact-persons`)
| Name                    | Rolle                       | Tel                  |
| ----------------------- | --------------------------- | -------------------- |
| Sina Schmidt            | Projektkoordination         | +49 (0)151 65 02 60 84 |
| Peter Retzlaff          | Technical Advisor           | +49 (0)151 11 13 18 47 |
| Claudia Grönniger       | Projektreferentin           | +49 (0)151 61 02 18 81 |
| Madeleine Scheuerpflug  | Studentische Mitarbeiterin  | +49 (0)170 102 54 73   |

Pro Person: Portraitfoto (Credit: © Sophie Moriarty), E-Mail-Link, optional kurzes Zitat zum Use Case. Ziel: nahbar, sympathisch.

→ Daten in `src/content/{locale}/team.json` (statisch, kein CMS).

### 01.3 — Termine (`/termine` ↔ `/events`)
- Meetup Datenraum Kultur
- Workshops
- Dynamisch aus Supabase-Tabelle `events` + `event_translations`.

### 02 — Projektbeschreibung (`/projekt` ↔ `/project`)
Kurze, verständliche Texte zu:
- Was sind maschinenlesbare Spielpläne?
- Etablierung technischer und semantischer Standards
- Entwicklung einer automatisierten Datentransfer-Schnittstelle
- Anwendungsmöglichkeiten
- Zeitplan
- Beteiligte Institutionen (Steuerkreis, Beirat)

### 02.3 — Technische Standards (`/projekt/technische-standards` ↔ `/project/technical-standards`)
- Was ist eine JSON-Datei?
- Wie wird ein Spielplan von einer Theaterwebsite in eine JSON-Schnittstelle verwandelt?
- Was ist ein Konnektor zur Anbindung an den Datenraum Kultur?
- Wie sendet und empfängt man Daten über den DRK?
- Schema.org, technische Doku auf GitHub und der Akademie-Dortmund-Website
- Verlinkung zu Anwendungsbeispielen
- Grafiken/Beispiele: Schema.org, Stadttheater Augsburg, Theaterstücke FRECARO

### 02.2 — Semantische Standards (`/projekt/semantische-standards` ↔ `/project/semantic-standards`)
- Was ist ein Datenmodell?
- Beschreibung: eigene Website-Begriffe in Standards „übersetzen", ohne sichtbare Begriffe zu verändern
- Links: GND-Explorer, NFDI4culture, Schema.org, CIDOC-Explorer, GitHub-Doku

### 03 — Aufruf zur Beteiligung (`/beteiligung` ↔ `/participation`)
- „Beta-Tester:innen gesucht"
- Pitch: Kein mühseliges Copy'n'Pasten mehr, automatische Datenübertragung an Archive, Plattformen und Dienste
- Verlinkung zu Unterseiten „Schnittstelle" und „Datenraum"

### 03.3 — Anwendungsbeispiele (`/beteiligung/anwendungsbeispiele` ↔ `/participation/use-cases`)
1. **Öffentlichkeitsarbeit:** Online-Veranstaltungsplattformen, Anzeigetafeln, automatisierte Medien-Datenübertragung
2. **Archivierung:** Automatisierte Übertragung an Archive
3. **Jobbörsen und Castingplattformen**

Verlinkungen zu konkreten Projektpartner:innen wo sinnvoll.

### 03.2 — Mitwirkung (`/beteiligung/mitwirkung` ↔ `/participation/contribute`)
- Schritt 1: JSON-Schnittstelle implementieren
- Schritt 2: Anschluss an DRK-Konnektor
- **Interaktive Deutschlandkarte** mit Projektpartner:innen (Daten aus Supabase)
- Logos: Datenraum Kultur, GENESIS, weitere Partner
- Kontaktformular (optional, falls sinnvoll)

### 04 — Blog / Projektfortschritt (`/blog`)
- Wer ist schon dabei
- Nächste Projektschritte, Veranstaltungen, Netzwerkarbeit
- Fotodokumentation
- Dynamisch aus Supabase `posts` + `post_translations`.

### 05 — FAQ (`/faq`)
- Wie kann ich mich am DRK beteiligen?
- Was kostet die Implementierung einer Schnittstelle?
- Ist mein Datentransfer sicher?
- Wozu brauche ich einen DRK?
- Was sind offene Daten?

Kurze Antworten mit Links zu entsprechenden Stellen auf der Website. Dynamisch aus Supabase `faqs` + `faq_translations`.

### 06 — Footer (alle Seiten)
- Logos: Akademie für Theater und Digitalität Dortmund, acatech, Fraunhofer FIT, NFDI4culture, BKM Hamburg, BKM Bund
- Impressum / Datenschutz

---

## Routing-Map (DE ↔ EN)

| Internal Key                          | DE                                    | EN                                       |
| ------------------------------------- | ------------------------------------- | ---------------------------------------- |
| `/`                                   | `/de`                                 | `/en`                                    |
| `/ansprechpersonen`                   | `/de/ansprechpersonen`                | `/en/contact-persons`                    |
| `/termine`                            | `/de/termine`                         | `/en/events`                             |
| `/projekt`                            | `/de/projekt`                         | `/en/project`                            |
| `/projekt/technische-standards`       | `/de/projekt/technische-standards`    | `/en/project/technical-standards`        |
| `/projekt/semantische-standards`      | `/de/projekt/semantische-standards`   | `/en/project/semantic-standards`         |
| `/beteiligung`                        | `/de/beteiligung`                     | `/en/participation`                      |
| `/beteiligung/anwendungsbeispiele`    | `/de/beteiligung/anwendungsbeispiele` | `/en/participation/use-cases`            |
| `/beteiligung/mitwirkung`             | `/de/beteiligung/mitwirkung`          | `/en/participation/contribute`           |
| `/blog`                               | `/de/blog`                            | `/en/blog`                               |
| `/blog/[slug]`                        | `/de/blog/[slug]`                     | `/en/blog/[slug]`                        |
| `/faq`                                | `/de/faq`                             | `/en/faq`                                |
| `/impressum`                          | `/de/impressum`                       | `/en/imprint`                            |
| `/datenschutz`                        | `/de/datenschutz`                     | `/en/privacy`                            |

Quelle der Wahrheit: `src/lib/i18n/routing.ts`.

---

## Asset-Plan (M3 / M4)

- **Partner-Logos** SVG nach `public/logos/`
- **Portraits** Ansprechpersonen nach `public/team/` (mit Credit „© Sophie Moriarty")
- **Hero-Bild** Landing — TBD, ggf. Theater-Foto oder abstrakte Illustration
- **Comic-Strip-Frames** — vom User zu liefern oder von Designer:in
- **Deutschland-SVG** für Partner-Map (ggf. von d3-geo / svg-maps.com / topojson) — M5
