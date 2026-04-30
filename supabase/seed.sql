-- =====================================================================
-- Seed-Daten fuer lokale Entwicklung und initiales Cloud-Befuellen.
-- =====================================================================
-- Hinweis: Wird via `supabase db reset` (lokal) oder manuell auf der
-- Cloud-DB ausgefuehrt. Idempotent durch on conflict do nothing.

-- ---- POSTS -------------------------------------------------------------
insert into public.posts (id, slug, status, published_at, cover_image_url) values
  ('11111111-1111-1111-1111-111111111111', 'kickoff-datenraum-kultur', 'published', '2026-03-15 10:00:00+00', null),
  ('22222222-2222-2222-2222-222222222222', 'erste-pilotpartner-gewonnen', 'published', '2026-04-02 09:00:00+00', null),
  ('33333333-3333-3333-3333-333333333333', 'wip-konnektor-roadmap', 'draft', null, null)
on conflict (id) do nothing;

insert into public.post_translations (post_id, locale, title, excerpt, body_md) values
  ('11111111-1111-1111-1111-111111111111', 'de',
   'Kickoff: Datenraum Kultur Use Case 3 startet',
   'Mit dem Bühnenverein, dem Fraunhofer-Institut und ersten Theaterhäusern haben wir den Use Case 3 offiziell eröffnet.',
   E'## Worum geht es\n\nMaschinenlesbare Spielpläne sollen den Weg vom Theater zur Plattform deutlich verkürzen. Statt PDF-Tabellen wandert ein strukturiertes JSON in den Datenraum.\n\n- Open Standard\n- DSGVO-konform\n- Anschlussfähig an bestehende ERP-Lösungen\n\n*Der Auftakt war herzlich, das Mittagsbüfett ehrlich gut.*'),
  ('11111111-1111-1111-1111-111111111111', 'en',
   'Kickoff: Cultural Data Space Use Case 3 launches',
   'Together with the Bühnenverein, Fraunhofer and the first theatre houses we officially opened Use Case 3.',
   E'## What this is about\n\nMachine-readable programmes shorten the path from theatre to platform. Instead of PDF tables, a structured JSON moves into the data space.\n\n- Open standard\n- GDPR-compliant\n- Compatible with existing ERP\n\n*The kickoff was warm, the lunch buffet honestly good.*'),

  ('22222222-2222-2222-2222-222222222222', 'de',
   'Erste Pilotpartner gewonnen',
   'Drei Häuser starten den Beta-Test der Schnittstelle. Wir berichten, was wir aus den ersten Tagen gelernt haben.',
   E'## Drei Häuser, drei Setups\n\nVon klassischer ERP-Anbindung bis zur händischen Pflege via CMS — die Vielfalt an Theater-Setups ist die größte Stärke und gleichzeitig die größte Herausforderung.\n\nWir freuen uns über das Vertrauen und liefern in den nächsten Wochen den ersten Iterationsstand des Konnektors.')
on conflict (post_id, locale) do nothing;

-- ---- EVENTS ------------------------------------------------------------
insert into public.events (id, slug, starts_at, ends_at, location, registration_url, status) values
  ('aaaa1111-aaaa-1111-aaaa-111111111111', 'meetup-datenraum-berlin-juni', '2026-06-12 18:00:00+00', '2026-06-12 21:00:00+00', 'Berlin, Bühnenverein-Geschäftsstelle', 'https://example.org/anmelden', 'upcoming'),
  ('aaaa2222-aaaa-2222-aaaa-222222222222', 'workshop-konnektor-rueckblick', '2026-02-20 09:00:00+00', '2026-02-20 16:00:00+00', 'Köln, Akademie der Künste', null, 'past')
on conflict (id) do nothing;

insert into public.event_translations (event_id, locale, title, description_md) values
  ('aaaa1111-aaaa-1111-aaaa-111111111111', 'de',
   'Meetup Datenraum Kultur — Berlin',
   E'Offener Austausch für Häuser, die mitlaufen wollen. Inputs aus dem Konnektor-Team, anschließend Networking.\n\n- Wer: alle interessierten Theater\n- Wann: 12. Juni, 18 Uhr\n- Was: Demo + Q&A'),
  ('aaaa1111-aaaa-1111-aaaa-111111111111', 'en',
   'Meetup Cultural Data Space — Berlin',
   E'Open exchange for houses that want to join. Updates from the connector team, then networking.\n\n- Who: any interested theatre\n- When: 12 June, 6pm\n- What: demo + Q&A'),
  ('aaaa2222-aaaa-2222-aaaa-222222222222', 'de',
   'Workshop Konnektor — Rückblick',
   E'Eintägiger Workshop zum Konnektor-Prototypen mit ersten Pilothäusern.'),
  ('aaaa2222-aaaa-2222-aaaa-222222222222', 'en',
   'Connector workshop — recap',
   E'One-day workshop on the connector prototype with first pilot houses.')
on conflict (event_id, locale) do nothing;

-- ---- FAQS --------------------------------------------------------------
insert into public.faqs (id, position, category, is_published) values
  ('cccc1111-cccc-1111-cccc-111111111111', 10, 'beteiligung', true),
  ('cccc2222-cccc-2222-cccc-222222222222', 20, 'kosten', true),
  ('cccc3333-cccc-3333-cccc-333333333333', 30, 'sicherheit', true),
  ('cccc4444-cccc-4444-cccc-444444444444', 40, 'grundlagen', true),
  ('cccc5555-cccc-5555-cccc-555555555555', 50, 'grundlagen', true)
on conflict (id) do nothing;

insert into public.faq_translations (faq_id, locale, question, answer_md) values
  ('cccc1111-cccc-1111-cccc-111111111111', 'de',
   'Wie kann ich mich am Datenraum Kultur beteiligen?',
   E'Schreib uns über das Kontaktformular oder direkt an Sina Schmidt. Wir besprechen das passende Setup für euer Haus — Pilot, Beobachter oder Konnektor-Tester.'),
  ('cccc1111-cccc-1111-cccc-111111111111', 'en',
   'How can I join the Cultural Data Space?',
   E'Reach out via our contact form or directly to Sina Schmidt. We will pick the right setup for your house — pilot, observer or connector tester.'),

  ('cccc2222-cccc-2222-cccc-222222222222', 'de',
   'Was kostet die Implementierung der Schnittstelle?',
   E'Während der Förderphase kostenfrei für Pilothäuser. Webagenturen erhalten Implementierungs-Hinweise und Open-Source-Bausteine.'),
  ('cccc2222-cccc-2222-cccc-222222222222', 'en',
   'What does implementing the interface cost?',
   E'Free of charge for pilot houses during the funded phase. Web agencies receive implementation notes and open source building blocks.'),

  ('cccc3333-cccc-3333-cccc-333333333333', 'de',
   'Ist mein Datentransfer sicher?',
   E'Ja. Daten fließen nur über autorisierte Konnektoren mit signierten Tokens. Es werden nur die Daten geteilt, die du explizit freigibst.'),
  ('cccc3333-cccc-3333-cccc-333333333333', 'en',
   'Is my data transfer secure?',
   E'Yes. Data flows only through authorised connectors using signed tokens. Only the data you explicitly release is shared.'),

  ('cccc4444-cccc-4444-cccc-444444444444', 'de',
   'Wozu brauche ich einen Datenraum?',
   E'Damit Spielpläne dort ankommen, wo Publikum sie sucht — ohne dass jedes Haus jede Plattform separat beliefern muss. Einmal sauber aufbereiten, viele Anwendungen profitieren.'),
  ('cccc4444-cccc-4444-cccc-444444444444', 'en',
   'Why do I need a data space?',
   E'So programmes reach the audience where they look — without each house feeding every platform separately. Prepare data once, many applications benefit.'),

  ('cccc5555-cccc-5555-cccc-555555555555', 'de',
   'Was sind offene Daten?',
   E'Daten, die unter klaren Lizenzbedingungen frei genutzt und weiterverarbeitet werden dürfen. Die Quelle bleibt nachvollziehbar, die Nutzung ist aber nicht eingeschränkt.'),
  ('cccc5555-cccc-5555-cccc-555555555555', 'en',
   'What is open data?',
   E'Data that may be used and processed freely under clear licence terms. The source stays traceable, the use is not restricted.')
on conflict (faq_id, locale) do nothing;

-- ---- PARTNERS ----------------------------------------------------------
insert into public.partners (id, name, slug, lat, lng, status) values
  ('dddd1111-dddd-1111-dddd-111111111111', 'Deutscher Bühnenverein',           'buehnenverein',     50.94,  6.96, 'partner'),
  ('dddd2222-dddd-2222-dddd-222222222222', 'Fraunhofer-Institut',              'fraunhofer',        53.55, 10.00, 'partner'),
  ('dddd3333-dddd-3333-dddd-333333333333', 'Akademie für Theater und Digitalität', 'akademie',     51.51,  7.47, 'pilot'),
  ('dddd4444-dddd-4444-dddd-444444444444', 'NFDI4Culture',                     'nfdi4culture',      50.12,  8.69, 'partner')
on conflict (id) do nothing;
