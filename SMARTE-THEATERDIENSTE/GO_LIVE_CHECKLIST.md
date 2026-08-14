# Go-live-Checkliste — Assets, Domain, Vercel, Rechtstexte

> Stand: 2026-08-14. Diese Datei ist der konkrete Handoff fuer alles, was Kay/Projektteam noch liefern oder im Dashboard erledigen muss, bevor Sanity-Cutover und finale Domain live gehen. Seit Session 17/18 erledigt: Hero-Visual, Partner-Logos, Team-Portraits via altem Sanity-CDN, Vercel-GitHub-Integration und Original-Site-Content-Abgleich. Seit Session 42 ist das lokale Sanity-Inhaltsmodell fertig; Zielprojekt und Zugriffe sind noch offen.

## 1. Assets liefern

Alle Dateien bitte ohne Text-Overlay, mit Nutzungsrechten fuer Web/Marketing und mit Credit-/Lizenzhinweis liefern. Wenn Dateinamen abweichen, vorher nicht umbenennen muessen — Codex kann sie nach Lieferung sauber einsortieren.

### Hero-Visual

Status: erledigt in Session 17. Der Hero nutzt das Theater-Parade-Bild unter `public/hero/theater-parade.jpg`.

Zielpfad im Projekt:

```text
public/hero/theater-parade.jpg
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
- Alt-Text, Credit/Lizenz und Zuordnung zum jeweiligen Post-Slug mitliefern.
- M19-Ziel: Originaldateien als Sanity-Assets in `post.cover` hochladen; das verschwundene Supabase-Projekt wird nicht mehr gepflegt.

Nach Lieferung:
- Bilder in Phase 4 als Sanity-Assets den passenden `post`-Dokumenten zuordnen.
- Blog-Detailseite DE/EN und View-Transition/CSS-Fallback testen.

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
- Aktuelle Partner-Websites mitliefern, damit `partner.website` und `partner.logo` beim Sanity-Import vollstaendig sind.

Nach Lieferung:
- Erledigt: Footer rendert echte Logos.
- Erledigt: Partner-Karte kann Logo/Website-Link anzeigen.

## 2. Sanity-Zielbetrieb festlegen

Die lokale Phase 0–2 ist ohne Zielprojekt und ohne Secrets abgeschlossen. Vor Content-Lake-Writes braucht Codex/Kay:

1. bewusst gewaehltes Sanity-Projekt im richtigen Organisations-/Projektkonto;
2. Dataset-Sichtbarkeit: public (fuer diese oeffentlichen Inhalte empfohlen) oder private mit Vercel-Read-Token;
3. gewuenschten `*.sanity.studio`-Hostname;
4. E-Mail-Adressen und Rollen der Redakteur:innen;
5. Vercel-Zugriff fuer Production-Envs und Deploy Hook.

Keine Tokens, Hook-URLs oder Einladungsdaten in Git/Vault ablegen. Vollstaendige Reihenfolge und Akzeptanz: [[SANITY_CMS_PLAN]].

## 3. Vercel-GitHub-Integration verbinden

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

## 4. Custom Domain entscheiden und DNS setzen

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
- Sanity-Publish-Webhook/Deploy-Hook nach dem CMS-Cutover end-to-end testen; die geheime Hook-URL bleibt ausserhalb von Git/Vault.
- `/sitemap.xml`, Canonicals, OG-Images und `robots.txt` gegen die finale Domain testen.

Quelle:
- Vercel Custom Domain Setup: https://vercel.com/docs/domains/set-up-custom-domain

## 5. Finale Impressum-/Datenschutztexte liefern

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
  - Sanity fuer CMS/Content/Assets nach dem M19-Cutover.
  - Supabase nur dann nennen, wenn der Dienst zum Freigabezeitpunkt noch tatsaechlich im Runtime-Pfad verwendet wird; das alte Projekt existiert nicht mehr und soll entfernt werden.
- Drittlandtransfer/geeignete Garantien fuer Vercel, falls relevant, inkl. DPA/SCC-Bewertung.
- Speicherdauer oder Kriterien.
- Betroffenenrechte nach DSGVO, Beschwerderecht bei Aufsichtsbehoerde.
- Hinweis: aktuell keine Analytics-/Tracking-Tools im Projekt; falls spaeter Analytics/Newsletter/Kontaktformular kommen, muss die Erklaerung erweitert werden.
- Optional: funktionale Locale-Cookies/technische Cookies pruefen und benennen, falls gesetzt.

Quellen fuer Pflichtpunkte:
- `§ 5 DDG`: https://www.gesetze-im-internet.de/ddg/BJNR0950B0024.html
- Art. 13 DSGVO: https://dsgvo-gesetz.de/art-13-dsgvo/

## 6. Allgemeine Kontaktadressen bestaetigen

Die Teamseite ist seit ADR-53 bewusst keine Kontaktseite mehr; aktuelle
`team.json`-Inhalte und das Sanity-`person`-Schema enthalten deshalb keine
persoenlichen Telefon-/E-Mail-Felder. Historische Miro-Annahmen zu einzelnen
Team-Adressen werden nicht ungeprueft migriert.

Fuer die finalen Rechtstexte benoetigt werden:
- bestaetigte allgemeine Kontaktadresse fuer das Impressum;
- Datenschutzkontakt, falls abweichend;
- Empfaenger-Adresse nur dann, wenn spaeter ein Kontaktformular beauftragt wird.

## 7. Reihenfolge ab jetzt

1. Kay legt Sanity-Zielprojekt, Dataset-Sichtbarkeit, Studio-Hostname, Rollen/Grants und Vercel-Zugriff fest; eingeschraenkte Credentials werden gegen API/CLI getestet, weil Studio-UI-Schutz keine Dataset-ACL ist.
2. Codex setzt Phase 3 (GROQ/Mapper/Loader) lokal um und baut danach Dry-Run/Write/Readback fuer das gewaehlte Ziel.
3. Kay liefert Blog-/Event-/Buehnenbilder mit Alt/Credit sowie finale Rechts-/Kontakttexte.
4. Codex migriert nach Sanity, verifiziert 65 Dokumente/Medien und schaltet die Seiten paketweise um.
5. `pnpm typecheck`, `pnpm lint`, `pnpm build`, Studio-Gates, DE/EN-Smokes und echter Publish→Deploy-Test.
6. Erst nach Paritaet Supabase-Runtime entfernen; danach Production-Deploy.
7. Domain/Canonical/Sitemap/OG-Smoke und Lighthouse/Accessibility final gegen die echte Domain.
