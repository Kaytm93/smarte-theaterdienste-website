# Go-live-Checkliste — Assets, Domain, Vercel, Rechtstexte

> Stand: 2026-05-07. Diese Datei ist der konkrete Handoff fuer alles, was Kay/Projektteam noch liefern oder im Dashboard erledigen muss, bevor die Seite final unter eigener Domain laufen kann. Seit Session 17/18 erledigt: Hero-Visual, Partner-Logos, Team-Portraits via Sanity-CDN, Vercel-GitHub-Integration und Original-Site-Content-Abgleich.

## 1. Assets liefern

Alle Dateien bitte ohne Text-Overlay, mit Nutzungsrechten fuer Web/Marketing und mit Credit-/Lizenzhinweis liefern. Wenn Dateinamen abweichen, vorher nicht umbenennen muessen — Codex kann sie nach Lieferung sauber einsortieren.

### Hero-Visual

Status: erledigt in Session 17. Der Hero nutzt jetzt das finale Theaterraum-Bild unter `public/hero/theaterdatenraum-hero.jpg`.

Zielpfad im Projekt:

```text
public/hero/theaterdatenraum-hero.jpg
```

Anforderung:
- Querformat, ideal 2400 x 1600 px oder groesser.
- Motiv: Theater-/Buehnenkontext, Daten-/Netzwerkmetapher oder echtes Projektfoto; keine Stock-Optik, keine eingebrannte Schrift.
- Rechte/Credit mitliefern.
- Alt-Text-Vorschlag mitliefern oder kurz beschreiben, was zu sehen ist.

Nach Lieferung:
- Erledigt: Hero-Blob auf der Landing wurde durch `ParallaxImage` ersetzt.
- Erledigt: Production-Build + visueller Check Desktop/Mobile.

### Blog-Cover-Bilder

Zielpfade im Projekt:

```text
public/blog/kickoff-datenraum-kultur.jpg
public/blog/erste-pilotpartner-gewonnen.jpg
public/blog/wip-konnektor-roadmap.jpg
```

Anforderung:
- 16:9, ideal 1600 x 900 px oder groesser.
- Fuer sichtbare View-Transition-Morphs muessen die Bilder in Supabase als `cover_image_url` stehen.
- Fuer Repo-Dateien reicht als Wert z. B. `/blog/kickoff-datenraum-kultur.jpg`.
- Alternativ Supabase Storage / anderes CDN: vollstaendige `https://...` URL liefern. `*.supabase.co` und `images.unsplash.com` sind aktuell in `next.config.ts` erlaubt; andere Domains muessen dort ergaenzt werden.

Nach Lieferung:
- Bilder nach `public/blog/`.
- Supabase `posts.cover_image_url` fuer die passenden Slugs setzen.
- `/de/blog -> Detailseite` im Browser testen, damit der Cover-Morph sichtbar ist.

### Team-Portraits

Status: erledigt in Session 18 via Original-Site-Bilder aus dem Sanity-CDN. Lokale Kopien unter `public/team/` sind optional, falls das Projekt die Bilder spaeter unabhaengig vom alten CDN ausliefern soll.

Zielpfade im Projekt:

```text
public/team/sina-schmidt.jpg
public/team/peter-retzlaff.jpg
public/team/claudia-groenniger.jpg
public/team/madeleine-scheuerpflug.jpg
```

Anforderung:
- 4:5 Portrait-Crop, ideal 1200 x 1500 px oder groesser.
- Einheitlicher Look, Gesicht nicht zu nah beschnitten.
- Credit: `© Sophie Moriarty`, plus bestaetigte Web-Nutzungsrechte.

Nach Lieferung:
- Erledigt: `ContactCard` rendert echte Portraits, wenn `portrait` gesetzt ist.
- Erledigt: Alt-Texte/Portrait-Credits sind im Content hinterlegt.

### Partner-Logos

Status: erledigt in Session 17 mit PNG-Assets in `public/logos/`. SVG-Versionen bleiben optional, falls druck- oder designseitig gewuenscht.

Footer-Zielpfade:

```text
public/logos/buehnenverein.svg
public/logos/akademie.svg
public/logos/fraunhofer.svg
public/logos/acatech.svg
public/logos/nfdi4culture.svg
public/logos/bkm.svg
```

Fuer die Partner-Karte zusaetzlich relevant:

```text
public/logos/buehnenverein.svg
public/logos/fraunhofer.svg
public/logos/akademie.svg
public/logos/nfdi4culture.svg
```

Anforderung:
- SVG bevorzugt, transparent, ohne feste weisse Box.
- Wenn nur PNG verfuegbar: mindestens 1200 px Breite, transparenter Hintergrund.
- Aktuelle Partner-Websites mitliefern, damit `partners.website_url` und `partners.logo_url` in Supabase gesetzt werden koennen.

Nach Lieferung:
- Erledigt: Footer rendert echte Logos.
- Erledigt: Partner-Karte kann Logo/Website-Link anzeigen.

## 2. Vercel-GitHub-Integration verbinden

Aktueller Stand: erledigt. Das GitHub-Repo `Kaytm93/smarte-theaterdienste-website` ist mit Vercel verbunden; `git push origin main` triggert Production-Deployments automatisch.

Was Kay im Browser tun muss:

1. Kein aktueller Browser-Schritt offen.
2. Production Branch bleibt `main`.

Wichtig:
- Bei persoenlichen GitHub-Repos muss laut Vercel die verbindende Person Repo-Owner sein, nicht nur Collaborator.
- Nach erfolgreicher Verbindung reicht `git push origin main`; Vercel erstellt dann automatisch Production-Deployments.

Quellen:
- Vercel GitHub-Integration: https://vercel.com/docs/git/vercel-for-github
- Vercel KB bei fehlendem Repo: https://vercel.com/kb/guide/unable-to-find-github-repository

## 3. Custom Domain entscheiden und DNS setzen

Zuerst entscheiden:

```text
Empfohlen: https://smarte-theaterdienste.de
Optional: https://www.smarte-theaterdienste.de -> Redirect auf Apex
Alternative Subdomain: https://usecase3.smarte-theaterdienste.de
```

Was Kay im Browser tun muss:

1. Domain-Inhaber/DNS-Provider klaeren: Wo liegt die Domain gerade? Beispiel: IONOS, Strato, Cloudflare, Vercel, anderer Provider.
2. In Vercel: `Project -> Settings -> Domains`.
3. Gewaehlte Domain eintragen, z. B. `smarte-theaterdienste.de`.
4. Wenn auch `www` genutzt werden soll, `www.smarte-theaterdienste.de` ebenfalls eintragen und in Vercel einen Redirect auf die Hauptdomain setzen.
5. Vercel zeigt die benoetigten DNS-Records an. Typisch:
   - Apex/root Domain `smarte-theaterdienste.de`: `A` Record `@` -> `76.76.21.21`
   - Subdomain `www`: `CNAME` -> Vercel-CNAME, im Dashboard exakt ablesen
6. DNS-Records beim DNS-Provider setzen, falls Nameserver nicht bei Vercel liegen.
7. In Vercel warten, bis Domain verified ist und SSL automatisch provisioniert wurde.

Danach durch Codex:
- Vercel Env Var `NEXT_PUBLIC_SITE_URL` fuer Production auf die finale Domain setzen.
- Production redeployen.
- Supabase-Revalidate-Funktion bei Bedarf auf die finale Domain umstellen.
- `/sitemap.xml`, Canonicals, OG-Images und `robots.txt` gegen die finale Domain testen.

Quelle:
- Vercel Custom Domain Setup: https://vercel.com/docs/domains/set-up-custom-domain

## 4. Finale Impressum-/Datenschutztexte liefern

Codex kann Platzhalter technisch einbauen, aber keine finale Rechtsfreigabe ersetzen. Bitte finale Texte vom Deutschen Buehnenverein oder juristisch geprueft liefern.

### Impressum

Aktuell im Code:

```text
src/content/de/legal.json
src/content/en/legal.json
```

Bitte liefern:
- Diensteanbieter nach `§ 5 DDG`: Name, Rechtsform, ladungsfaehige Anschrift.
- Vertretungsberechtigte Person(en).
- E-Mail und Telefonnummer fuer schnelle Kontaktaufnahme.
- Register/Vereinsregister, Registergericht, Registernummer, falls vorhanden.
- USt-IdNr. oder Hinweis, falls nicht vorhanden.
- Verantwortlich fuer journalistisch-redaktionelle Inhalte nach `§ 18 Abs. 2 MStV`, falls Blog/News redaktionell bewertet werden.
- Haftungs-/Urheberrechtshinweise, falls gewuenscht.

Hinweis: Die alte Referenz `§ 5 TMG` sollte nicht mehr verwendet werden; seit 2024 ist fuer diese Pflichtangaben `§ 5 DDG` der relevante Verweis.

### Datenschutzerklaerung

Bitte liefern:
- Verantwortliche Stelle nach DSGVO.
- Datenschutzbeauftragte:r inkl. Kontakt, falls vorhanden/erforderlich.
- Zwecke und Rechtsgrundlagen der Verarbeitung.
- Hosting/Empfaenger:
  - Vercel fuer Hosting/Serverlogs.
  - Supabase fuer Datenbank/Content-Daten, Projektregion EU-Central/Frankfurt.
- Drittlandtransfer/geeignete Garantien fuer Vercel, falls relevant, inkl. DPA/SCC-Bewertung.
- Speicherdauer oder Kriterien.
- Betroffenenrechte nach DSGVO, Beschwerderecht bei Aufsichtsbehoerde.
- Hinweis: aktuell keine Analytics-/Tracking-Tools im Projekt; falls spaeter Analytics/Newsletter/Kontaktformular kommen, muss die Erklaerung erweitert werden.
- Optional: funktionale Locale-Cookies/technische Cookies pruefen und benennen, falls gesetzt.

Quellen fuer Pflichtpunkte:
- `§ 5 DDG`: https://www.gesetze-im-internet.de/ddg/BJNR0950B0024.html
- Art. 13 DSGVO: https://dsgvo-gesetz.de/art-13-dsgvo/

## 5. Kontaktadresse bestaetigen

Aktuell sind Team-E-Mails im Content als `vorname.nachname@buehnenverein.de` eingetragen.

Bitte bestaetigen oder korrigieren:

```text
sina.schmidt@buehnenverein.de
peter.retzlaff@buehnenverein.de
claudia.groenniger@buehnenverein.de
madeleine.scheuerpflug@buehnenverein.de
```

Ausserdem benoetigt:
- Allgemeine Kontaktadresse fuer Impressum/Datenschutz, falls nicht die Personen-E-Mails genutzt werden sollen.
- Datenschutzkontakt, falls abweichend.

## 6. Reihenfolge ab jetzt

1. Kay liefert Blog-Cover-Bilder + Rechts-/Kontakttexte.
2. Codex baut Blog-Cover ein, setzt Supabase-URLs und ersetzt Legal-TODOs.
3. `pnpm typecheck`, `pnpm lint`, `pnpm build`.
4. Production-Deploy ueber Git-Integration oder CLI.
5. Domain/Canonical/Sitemap/OG-Smoke gegen finale Domain.
6. Lighthouse/axe final gegen finale Domain.
