# 📄 Inhalte & Tonality

> Maßstab: **Miro-Board > bestehende Website**. Wo die alte Site fehlt oder anders strukturiert ist, folgt das neue Projekt dem Miro-Board.
>
> **M19-Übergang (2026-08-14):** Bis zum Cutover bleiben `messages/`, `src/content/` und die SQL-Snapshots die prüfbaren Quellen. Das vollständige Sanity-Zielschema steht lokal; nach Migration/Readback wird Sanity die redaktionelle Quelle. Siehe [[SANITY_CMS_PLAN]] und [[ENTSCHEIDUNGEN#ADR-67]].

---

## Abgleich bestehende Website (2026-05-07)

Die alte Website `https://smarte-theaterdienste.de/de` war wieder erreichbar und wurde in Session 18 als Inhaltsquelle gegen die aktuelle Next.js-Site geprüft.

Übernommen:
- Startseite: Nutzenblöcke "Effektivere Arbeitsprozesse", "Höhere Reichweite", "Größeres Netzwerk"; Stakeholder-Nutzen für Theaterleitung, PR/Marketing, Künstlerisches Betriebsbüro, Developer/Agenturen; DACH-Netzwerkkarte mit 141 Institutionen und Segmenten.
- Konzeption/Material: ORIF als Open Repertoire Interchange Format, JSON-Erklärung, Werkdaten/Aufführungsdaten, Links zu Comic-Clip, Infomaterial, Musterkalkulation, ORIF-Dokumentation, Validator und Lektoratstool.
- Jetzt mitmachen: Drei-Punkte-Plan "Implementieren / Automatisieren / Revolutionieren" und Tanzarchiv-Leipzig-Zitat.
- FAQ: 21 Fragen/Antworten in DE/EN; seit Session 39 kanonisch in `src/content/{de,en}/faq.json`, SQL nur historische Metadatenquelle.
- Termine: vier historische 2025-Termine plus zwei weitere deduplizierte SQL-/Seed-Datensätze als Sanity-Importbestand.
- Ansprechpersonen: vier Portraits aus dem alten Sanity-CDN eingebunden.

Nicht übernommen:
- Finale Impressum-/Datenschutztexte bleiben bewusst offen, bis der Auftraggeber sie freigibt.
- Die historische Telefon-/E-Mail-Kontaktfunktion wurde entfernt; alle vier Teammitglieder bleiben als Personenprofile ohne persönliche Kontaktdaten erhalten (ADR-53).

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

Historischer Briefing-Wunsch pro Person: Portraitfoto (Credit: © Sophie Moriarty), E-Mail-Link und optional kurzes Zitat zum Use Case. Ziel damals: nahbar, sympathisch.

→ Aktuelle Runtime-Quelle: `src/content/{locale}/team.json`; M19-Ziel: vier `person`-Dokumente, geordnet von `teamPage` und `conceptPage` referenziert.

> **Einordnung für M19:** Die Tabelle und der E-Mail-Wunsch stammen aus dem historischen Sitemap-/Miro-Briefing. Sie sind kein aktueller Importvertrag: `team.json` enthält bewusst keine Telefon-/E-Mail-Felder, und die Teamseite ist seit ADR-53 keine Kontaktseite mehr. M19 migriert daher Name, Rolle, Bilder/Credits und optionale Zitate, aber keine historischen Kontaktdaten.

### 01.3 — Termine (`/termine` ↔ `/events`)
- Meetup Datenraum Kultur
- Workshops
- Historisch aus `events` + `event_translations`; das Cloud-Projekt ist verschwunden. M19 migriert sechs deduplizierte Datensätze nach Sanity. Dort ist der redaktionelle Status `scheduled|cancelled`, während „bevorstehend/vergangen“ aus dem Datum folgt.

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
- **Interaktive Deutschlandkarte** mit Projektpartner:innen (historisch Supabase, M19-Ziel `partner`-Dokumente in Sanity)
- Logos: Datenraum Kultur, GENESIS, weitere Partner
- Kontaktformular (optional, falls sinnvoll)

### 04 — Blog / Projektfortschritt (`/blog`)
- Wer ist schon dabei
- Nächste Projektschritte, Veranstaltungen, Netzwerkarbeit
- Fotodokumentation
- Historisch aus `posts` + `post_translations`; drei deduplizierte Beiträge werden mit Status und nullbarem Veröffentlichungsdatum nach Sanity migriert.

### 05 — FAQ (`/faq`)
- Wie kann ich mich am DRK beteiligen?
- Was kostet die Implementierung einer Schnittstelle?
- Ist mein Datentransfer sicher?
- Wozu brauche ich einen DRK?
- Was sind offene Daten?

Kurze Antworten mit Links zu entsprechenden Stellen auf der Website. Aktuell vollständig statisch aus `src/content/{de,en}/faq.json`; M19-Ziel sind `faqPage`, vier `faqCategory`- und 21 `faqItem`-Dokumente in Sanity.

### 06 — Footer (alle Seiten)
- Logos: Akademie für Theater und Digitalität Dortmund, acatech, Fraunhofer FIT, NFDI4culture, BKM Hamburg, BKM Bund
- Impressum / Datenschutz

---

## Routing-Map (DE ↔ EN)

> ⚠️ **In M17 (Session 28) umbenannt:** `/projekt`→`/konzeption`, `/beteiligung`→`/jetzt-mitmachen`, neue `/materialien`; `/ansprechpersonen`→`/team`. Alte Pfade leiten per 308 (`next.config.ts`). `/blog` + `/termine` leiten zusätzlich auf `/konzeption` (Inhalte im Zeitstrahl). Die obige Sitemap-/Sektionsbeschreibung nutzt die **alten Miro-Slugs** — Inhalt gilt, Slugs siehe unten.

| Internal Key                          | DE                                    | EN                                |
| ------------------------------------- | ------------------------------------- | --------------------------------- |
| `/`                                   | `/de`                                 | `/en`                             |
| `/team`                               | `/de/team`                            | `/en/team`                        |
| `/konzeption`                         | `/de/konzeption`                      | `/en/concept`                    |
| `/konzeption/technische-standards`    | `/de/konzeption/technische-standards` | `/en/concept/technical-standards` |
| `/konzeption/semantische-standards`   | `/de/konzeption/semantische-standards`| `/en/concept/semantic-standards`  |
| `/jetzt-mitmachen`                    | `/de/jetzt-mitmachen`                 | `/en/join`                       |
| `/jetzt-mitmachen/anwendungsbeispiele`| `/de/jetzt-mitmachen/anwendungsbeispiele` | `/en/join/use-cases`          |
| `/jetzt-mitmachen/mitwirkung`         | `/de/jetzt-mitmachen/mitwirkung`      | `/en/join/contribute`             |
| `/materialien`                        | `/de/materialien`                     | `/en/materials`                  |
| `/blog/[slug]`                        | `/de/blog/[slug]`                     | `/en/blog/[slug]`                 |
| `/faq`                                | `/de/faq`                             | `/en/faq`                        |
| `/impressum`                          | `/de/impressum`                       | `/en/imprint`                    |
| `/datenschutz`                        | `/de/datenschutz`                     | `/en/privacy`                    |

Quelle der Wahrheit: `src/lib/i18n/routing.ts` (Redirects in `next.config.ts`).

---

## Asset-Plan (M3 / M4)

- **Partner-Logos** SVG nach `public/logos/`
- **Portraits** Ansprechpersonen nach `public/team/` (mit Credit „© Sophie Moriarty")
- **Hero-Bild** Landing — TBD, ggf. Theater-Foto oder abstrakte Illustration
- **Comic-Strip-Frames** — vom User zu liefern oder von Designer:in
- **Deutschland-SVG** für Partner-Map (ggf. von d3-geo / svg-maps.com / topojson) — M5
