-- =====================================================================
-- M11 Original-Site-Content: FAQ + Events
-- =====================================================================
-- Transfers the public content structure from smarte-theaterdienste.de
-- into the Supabase-backed pages.

insert into public.events (id, slug, starts_at, ends_at, location, registration_url, status) values
  ('aaaa3333-aaaa-3333-aaaa-333333333333', 'jahrestagung-buehnenverein-chemnitz-2025', '2025-06-05 09:00:00+02', '2025-06-07 18:00:00+02', 'Chemnitz', 'https://www.buehnenverein.de/', 'past'),
  ('aaaa4444-aaaa-4444-aaaa-444444444444', 'dataweek-symposium-leipzig-2025', '2025-06-11 10:00:00+02', '2025-06-11 16:00:00+02', 'Schauspiel Leipzig', 'https://2025.dataweek.de/', 'past'),
  ('aaaa5555-aaaa-5555-aaaa-555555555555', 'theatertreff-berlin-spdata-2025', '2025-06-26 10:00:00+02', null, 'Deutsches Theater Berlin', 'https://www.spdata.de/', 'past'),
  ('aaaa6666-aaaa-6666-aaaa-666666666666', 'abschlussforum-datenraum-kultur-hamburg-2025', '2025-07-03 10:00:00+02', null, 'Kunsthalle Hamburg', 'https://datenraumkultur.de/', 'past')
on conflict (id) do update set
  slug = excluded.slug,
  starts_at = excluded.starts_at,
  ends_at = excluded.ends_at,
  location = excluded.location,
  registration_url = excluded.registration_url,
  status = excluded.status;

insert into public.event_translations (event_id, locale, title, description_md) values
  ('aaaa3333-aaaa-3333-aaaa-333333333333', 'de',
   'Jahrestagung Bühnenverein',
   $$Auch auf der Jahreshauptversammlung des Deutschen Bühnenvereins war der Datenraum Kultur präsent. Weitere Informationen finden sich auf der Website des Deutschen Bühnenvereins.$$),
  ('aaaa3333-aaaa-3333-aaaa-333333333333', 'en',
   'Annual Meeting Bühnenverein',
   $$Data Space Culture was also present at the annual meeting of the Deutscher Bühnenverein. Further information is available on the Bühnenverein website.$$),
  ('aaaa4444-aaaa-4444-aaaa-444444444444', 'de',
   'DataWeek Symposium',
   $$Auf der Veranstaltung der Stadt Leipzig konnten Teilnehmende Probleme aus der Themenwelt Digitalisierung und Kultur einbringen. Sina Schmidt war für Fragen zu Daten im Theater ansprechbar.$$),
  ('aaaa4444-aaaa-4444-aaaa-444444444444', 'en',
   'DataWeek Symposium',
   $$At the event organised by the City of Leipzig, participants could bring in challenges from the fields of digitalisation and culture. Sina Schmidt was available for questions about data in theatre.$$),
  ('aaaa5555-aaaa-5555-aaaa-555555555555', 'de',
   'Theatertreff Berlin',
   $$Die maschinenlesbaren Spielpläne wurden bei der Fachveranstaltung für Theater-Kund:innen des Personalmanagement-Anbieters SP_Data vorgestellt.$$),
  ('aaaa5555-aaaa-5555-aaaa-555555555555', 'en',
   'Theatre Meetup Berlin',
   $$The machine-readable programmes were presented at the specialist event for theatre customers of the HR management provider SP_Data.$$),
  ('aaaa6666-aaaa-6666-aaaa-666666666666', 'de',
   'Abschlussforum Datenraum Kultur',
   $$Die erste Projektphase Datenraum Kultur endete im August 2025. Beim Forum in Hamburg wurden Projektergebnisse präsentiert.$$),
  ('aaaa6666-aaaa-6666-aaaa-666666666666', 'en',
   'Closing Forum Cultural Data Space',
   $$The first phase of the Cultural Data Space project ended in August 2025. Project results were presented at the forum in Hamburg.$$
  )
on conflict (event_id, locale) do update set
  title = excluded.title,
  description_md = excluded.description_md;

insert into public.faqs (id, position, category, is_published) values
  ('cccc1111-cccc-1111-cccc-111111111111', 10, 'grundwissen', true),
  ('cccc6666-cccc-6666-cccc-666666666666', 20, 'grundwissen', true),
  ('cccc7777-cccc-7777-cccc-777777777777', 30, 'grundwissen', true),
  ('cccc8888-cccc-8888-cccc-888888888888', 40, 'grundwissen', true),
  ('cccc9999-cccc-9999-cccc-999999999999', 50, 'grundwissen', true),
  ('cccca111-cccc-a111-cccc-aaaaaaaaa111', 110, 'technik-sicherheit', true),
  ('cccc3333-cccc-3333-cccc-333333333333', 120, 'technik-sicherheit', true),
  ('cccca222-cccc-a222-cccc-aaaaaaaaa222', 130, 'technik-sicherheit', true),
  ('cccca333-cccc-a333-cccc-aaaaaaaaa333', 140, 'technik-sicherheit', true),
  ('cccca444-cccc-a444-cccc-aaaaaaaaa444', 150, 'technik-sicherheit', true),
  ('cccc2222-cccc-2222-cccc-222222222222', 210, 'umsetzung-kosten', true),
  ('cccca555-cccc-a555-cccc-aaaaaaaaa555', 220, 'umsetzung-kosten', true),
  ('cccca666-cccc-a666-cccc-aaaaaaaaa666', 230, 'umsetzung-kosten', true),
  ('cccca777-cccc-a777-cccc-aaaaaaaaa777', 240, 'umsetzung-kosten', true),
  ('cccc4444-cccc-4444-cccc-444444444444', 310, 'datenraum-kultur', true),
  ('cccca888-cccc-a888-cccc-aaaaaaaaa888', 320, 'datenraum-kultur', true),
  ('cccca999-cccc-a999-cccc-aaaaaaaaa999', 330, 'datenraum-kultur', true),
  ('ccccb111-cccc-b111-cccc-bbbbbbbbb111', 340, 'datenraum-kultur', true),
  ('ccccb222-cccc-b222-cccc-bbbbbbbbb222', 350, 'datenraum-kultur', true),
  ('ccccb333-cccc-b333-cccc-bbbbbbbbb333', 360, 'datenraum-kultur', true),
  ('cccc5555-cccc-5555-cccc-555555555555', 370, 'datenraum-kultur', true)
on conflict (id) do update set
  position = excluded.position,
  category = excluded.category,
  is_published = excluded.is_published;

insert into public.faq_translations (faq_id, locale, question, answer_md) values
  ('cccc1111-cccc-1111-cccc-111111111111', 'de',
   'Wie werden unsere Spielpläne maschinenlesbar?',
   $$Ein Theaterspielplan wird in ein digitales Format übersetzt, das Computer zuverlässig verarbeiten können. Diese Version wird über eine Schnittstelle bereitgestellt; bei ORIF ist das eine JSON-Schnittstelle, die eine Webagentur in wenigen Arbeitsstunden in Betrieb nehmen kann.$$),
  ('cccc1111-cccc-1111-cccc-111111111111', 'en',
   'How do we make our programmes machine-readable?',
   $$A theatre programme is translated into a digital format that computers can process reliably. This version is provided through an interface; with ORIF, that means a JSON interface that a web agency can put into operation in a few development hours.$$),

  ('cccc6666-cccc-6666-cccc-666666666666', 'de',
   'Wozu maschinenlesbare Theaterspielpläne?',
   $$Maschinenlesbare Spielpläne machen Veranstaltungen im Internet leichter auffindbar, vereinfachen Aktualisierungen auf verschiedenen Plattformen in Echtzeit und unterstützen bessere Datenanalysen für eine nachhaltige Programmplanung.$$),
  ('cccc6666-cccc-6666-cccc-666666666666', 'en',
   'Why machine-readable theatre programmes?',
   $$Machine-readable programmes make events easier to find online, simplify real-time updates across platforms and support better data analysis for sustainable programme planning.$$),

  ('cccc7777-cccc-7777-cccc-777777777777', 'de',
   'Was haben maschinenlesbare Spielpläne mit dem Datenraum Kultur zu tun?',
   $$Automatisch übermittelbare Spielpläne sind die Grundlage für eine Teilnahme am Datenraum Kultur. Gleichzeitig erleichtert ORIF schon heute den Datentransfer zu Veranstaltungsplattformen, Archiven und Museen.$$),
  ('cccc7777-cccc-7777-cccc-777777777777', 'en',
   'What do machine-readable programmes have to do with the Cultural Data Space?',
   $$Programmes that can be transmitted automatically are the basis for participation in the Cultural Data Space. At the same time, ORIF already simplifies data transfer to event platforms, archives and museums.$$),

  ('cccc8888-cccc-8888-cccc-888888888888', 'de',
   'Enthalten Theaterspielpläne geschütztes Material?',
   $$Spielpläne enthalten größtenteils offene Daten wie Zeiten, Stücktitel und Besetzungen. Pressefotos und Videotrailer können urheberrechtlich geschützt sein; dafür können Copyright- und Lizenzangaben in den Daten hinterlegt werden.$$),
  ('cccc8888-cccc-8888-cccc-888888888888', 'en',
   'Do theatre programmes contain copyrighted material?',
   $$Most programme data is open information such as performance times, titles and casts. Press photos and video trailers may be protected by copyright; copyright and licence information can be stored with that data.$$),

  ('cccc9999-cccc-9999-cccc-999999999999', 'de',
   'Besteht die Gefahr, dass nicht freigegebene Daten veröffentlicht werden?',
   $$Über ORIF werden nur Informationen übertragen, die bereits auf der Website veröffentlicht sind. Der Transfer geschützter Datensätze wird erst in erweiterten Entwicklungsphasen über spezielle Datenraum-Technologie relevant.$$),
  ('cccc9999-cccc-9999-cccc-999999999999', 'en',
   'Could non-approved data be published through the interface?',
   $$ORIF transfers only information that is already published on the website. The transfer of protected data sets becomes relevant only in later development phases using dedicated data space technology.$$),

  ('cccca111-cccc-a111-cccc-aaaaaaaaa111', 'de',
   'Muss die implementierte Schnittstelle regelmäßig gewartet werden?',
   $$Nach der einmaligen Integration ist keine regelmäßige technische Betreuung nötig. Die Spielplandaten werden wie gewohnt im CMS, in der Dispositionssoftware oder im Ticketsystem gepflegt und in der Schnittstelle automatisch aktualisiert.$$),
  ('cccca111-cccc-a111-cccc-aaaaaaaaa111', 'en',
   'Does the implemented interface require regular maintenance?',
   $$After one-time integration, no regular technical maintenance is required. Programme data continues to be maintained in the CMS, planning software or ticketing system and is automatically updated in the interface.$$),

  ('cccc3333-cccc-3333-cccc-333333333333', 'de',
   'Ist mein Datentransfer sicher? Wer hat Zugriff auf die Daten?',
   $$Wer Zugriff auf die JSON-Schnittstelle hat, bestimmen Haus und Webagentur gemeinsam. Da Spielplandaten in der Regel bereits öffentlich sind, sind keine besonderen Sicherheitsmaßnahmen nötig; bei Bedarf kann der Link zusätzlich geschützt werden.$$),
  ('cccc3333-cccc-3333-cccc-333333333333', 'en',
   'Is my data transfer secure? Who has access to the data?',
   $$The theatre and its web agency decide who has access to the JSON interface. Since programme data is usually already public, special security measures are generally not required; if needed, the link can be additionally protected.$$),

  ('cccca222-cccc-a222-cccc-aaaaaaaaa222', 'de',
   'Wir haben bereits eine Schnittstelle - brauchen wir dennoch ORIF?',
   $$Viele bestehende Schnittstellen sind auf einzelne Anwendungen zugeschnitten. ORIF übersetzt verschiedene Datenformate in einen gemeinsamen Standard und macht Spielplandaten dadurch für viele Plattformen, Archive und Dienste kompatibel.$$),
  ('cccca222-cccc-a222-cccc-aaaaaaaaa222', 'en',
   'We already have an interface - do we still need ORIF?',
   $$Many existing interfaces are tailored to individual use cases. ORIF translates different data formats into one shared standard, making programme data compatible with many platforms, archives and services.$$),

  ('cccca333-cccc-a333-cccc-aaaaaaaaa333', 'de',
   'Wie kann ich überprüfen, welche Daten in der Schnittstelle stehen?',
   $$Nach der Implementierung erhalten Sie einen Link zur JSON-Ansicht des Spielplans. Dieser Link kann im Lektoratstool geprüft werden; dort erscheinen die Daten in einer menschenlesbaren Tabelle.$$),
  ('cccca333-cccc-a333-cccc-aaaaaaaaa333', 'en',
   'How can I check which data is in the interface?',
   $$After implementation, you receive a link to the JSON view of the programme. This link can be checked in the data viewer, where the data appears in a human-readable table.$$),

  ('cccca444-cccc-a444-cccc-aaaaaaaaa444', 'de',
   'Was passiert mit der Schnittstelle bei einem Website-Relaunch?',
   $$Bei einem reinen Design-Relaunch bleibt die Funktionalität bestehen. Wenn die gesamte Seitenarchitektur erneuert wird, muss die Schnittstelle erneut eingebaut oder angepasst werden.$$),
  ('cccca444-cccc-a444-cccc-aaaaaaaaa444', 'en',
   'What happens to the interface when we relaunch our website?',
   $$If only the design changes, the interface can continue to work. If the entire site architecture is renewed, the interface has to be implemented or adapted again.$$),

  ('cccc2222-cccc-2222-cccc-222222222222', 'de',
   'Wie lange dauert die Implementierung und welche Kosten entstehen?',
   $$Die Dauer hängt vom technischen Stand der Website ab. Wenige Stunden bis einige Tage sind realistisch. Für die Beauftragung einer Webagentur fallen einmalige Kosten an; eine Musterkalkulation liegt auf der Materialseite.$$),
  ('cccc2222-cccc-2222-cccc-222222222222', 'en',
   'How long does implementation take and what does it cost?',
   $$The duration depends on the technical state of the website. A few hours to a few days are realistic. Commissioning a web agency creates one-off costs; a sample cost calculation is linked on the resources page.$$),

  ('cccca555-cccc-a555-cccc-aaaaaaaaa555', 'de',
   'Brauche ich technische Fachkenntnisse, um die Schnittstelle zu nutzen?',
   $$Nein. Nach der Implementierung erhalten Sie den Schnittstellen-Link von Ihrer Webagentur und können ihn an Plattformen, Archive oder andere Partner:innen weitergeben. Der weitere Datenaustausch läuft automatisiert.$$),
  ('cccca555-cccc-a555-cccc-aaaaaaaaa555', 'en',
   'Do I need technical expertise to use the interface?',
   $$No. After implementation, your web agency gives you the interface link, which you can pass on to platforms, archives or other partners. The subsequent data exchange runs automatically.$$),

  ('cccca666-cccc-a666-cccc-aaaaaaaaa666', 'de',
   'Kann die Schnittstelle in jedes CMS implementiert werden?',
   $$Da die JSON-Schnittstelle an einer technischen Stelle der Website-Architektur eingebunden wird, ist das konkret verwendete CMS für den Vorgang in der Regel nicht entscheidend.$$),
  ('cccca666-cccc-a666-cccc-aaaaaaaaa666', 'en',
   'Can the interface be implemented in any CMS?',
   $$Because the JSON interface is connected at a technical point in the website architecture, the specific CMS is usually not decisive.$$),

  ('cccca777-cccc-a777-cccc-aaaaaaaaa777', 'de',
   'Sind wir automatisch an den Datenraum Kultur angeschlossen, sobald ORIF implementiert ist?',
   $$ORIF bereitet die Teilnahme am Datenraum Kultur vor und macht Spielpläne maschinenlesbar. Um künftig alle Dienste des Datenraums zu nutzen, ist zusätzlich eine Registrierung im Datenraum-Portal nötig.$$),
  ('cccca777-cccc-a777-cccc-aaaaaaaaa777', 'en',
   'Are we automatically connected to the Cultural Data Space once ORIF is implemented?',
   $$ORIF prepares participation in the Cultural Data Space and makes programmes machine-readable. To use the full range of data space services in future, registration in the data space portal is also required.$$),

  ('cccc4444-cccc-4444-cccc-444444444444', 'de',
   'Was ist der Datenraum Kultur?',
   $$Ein Datenraum ist eine digitale Infrastruktur für sicheren und standardisierten Datenaustausch. Die Daten bleiben dezentral bei den anbietenden Systemen und werden über Schnittstellen sowie Konnektoren vernetzt.$$),
  ('cccc4444-cccc-4444-cccc-444444444444', 'en',
   'What is the Cultural Data Space?',
   $$A data space is digital infrastructure for secure, standardised data exchange. Data remains decentralised in the providing systems and is connected through interfaces and connectors.$$),

  ('cccca888-cccc-a888-cccc-aaaaaaaaa888', 'de',
   'Wer steht hinter dem Datenraum Kultur?',
   $$Der Datenraum Kultur ist eines von 18 Leuchtturmprojekten der Digitalstrategie des Bundes und Teil von Gaia-X. Entwickelt wurde er unter anderem von acatech und Fraunhofer FIT; seit März 2025 betreut Orbiter die technische Wartung.$$),
  ('cccca888-cccc-a888-cccc-aaaaaaaaa888', 'en',
   'Who is behind the Cultural Data Space?',
   $$The Cultural Data Space is one of 18 lighthouse projects in Germany's digital strategy and part of Gaia-X. It was developed with partners including acatech and Fraunhofer FIT; since March 2025, Orbiter has handled technical maintenance.$$),

  ('cccca999-cccc-a999-cccc-aaaaaaaaa999', 'de',
   'Wer kann den Datenraum Kultur nutzen?',
   $$Öffentliche und private Institutionen, Unternehmen und Organisationen können Daten austauschen: Theater, Orchester, freie Gruppen, Museen, Archive, Plattformen, Jobbörsen, Softwareanbieter, Tourismusverbände, Ticketanbieter und viele weitere.$$),
  ('cccca999-cccc-a999-cccc-aaaaaaaaa999', 'en',
   'Who can use the Cultural Data Space?',
   $$Public and private institutions, companies and organisations can exchange data: theatres, orchestras, independent groups, museums, archives, platforms, job boards, software providers, tourism associations, ticket providers and many others.$$),

  ('ccccb111-cccc-b111-cccc-bbbbbbbbb111', 'de',
   'Wie kann ich mit meiner Institution am Datenraum Kultur teilnehmen?',
   $$Die Teilnahme ist direkt über den Datenraum Kultur oder über Software-Partner:innen möglich. Für die direkte Teilnahme ist eine standardisierte Schnittstelle wie ORIF die Grundlage, damit Spielpläne sofort verarbeitet werden können.$$),
  ('ccccb111-cccc-b111-cccc-bbbbbbbbb111', 'en',
   'How can my institution participate in the Cultural Data Space?',
   $$Participation is possible either directly through the Cultural Data Space or through software partners. For direct participation, a standardised interface such as ORIF is the basis for processing programme data immediately.$$),

  ('ccccb222-cccc-b222-cccc-bbbbbbbbb222', 'de',
   'Wann steht der Datenraum Kultur zur Nutzung bereit?',
   $$Der Datenraum Kultur befindet sich noch in der prototypischen Entwicklung. ORIF kann bereits genutzt werden, um maschinenlesbare Spielpläne zwischen Teilnehmenden auszutauschen.$$),
  ('ccccb222-cccc-b222-cccc-bbbbbbbbb222', 'en',
   'When will the Cultural Data Space be available for use?',
   $$The Cultural Data Space is still in prototype development. ORIF can already be used to exchange machine-readable programmes between participants.$$),

  ('ccccb333-cccc-b333-cccc-bbbbbbbbb333', 'de',
   'Wie grenzt sich der Datenraum Kultur von anderen Plattformen ab?',
   $$Durch seine dezentrale Struktur bleiben Teilnehmende souverän über ihre Daten. Der Datenraum Kultur verfolgt keine kommerziellen Ziele, sondern einen gemeinschaftlichen Nutzen nach europäischen Rechtsstandards.$$),
  ('ccccb333-cccc-b333-cccc-bbbbbbbbb333', 'en',
   'How does the Cultural Data Space differ from common platforms?',
   $$Its decentralised structure keeps participants sovereign over their data. The Cultural Data Space does not pursue commercial goals; it is designed for shared benefit under European legal standards.$$),

  ('cccc5555-cccc-5555-cccc-555555555555', 'de',
   'Unterstützt der Datenraum Kultur Open-Access-Strategien?',
   $$Der Datenraum Kultur macht zunächst offene Daten zugänglich, wobei die Dateneigner:innen die Nutzungsregeln definieren. Perspektivisch können auch geschützte Datenangebote unter klaren Lizenzbedingungen eingebunden werden.$$),
  ('cccc5555-cccc-5555-cccc-555555555555', 'en',
   'Does the Cultural Data Space support open-access strategies?',
   $$The Cultural Data Space initially makes open data accessible, with data owners defining the rules of use. In future, protected data offerings can also be integrated under clear licensing conditions.$$
  )
on conflict (faq_id, locale) do update set
  question = excluded.question,
  answer_md = excluded.answer_md;
