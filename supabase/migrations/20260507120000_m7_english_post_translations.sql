-- M7: complete English post translations and keep the draft roadmap bilingual.

insert into public.post_translations (post_id, locale, title, excerpt, body_md)
values
  (
    '11111111-1111-1111-1111-111111111111',
    'en',
    'Kickoff: Cultural Data Space Use Case 3 launches',
    'Together with the Bühnenverein, Fraunhofer and the first theatres, we officially opened Use Case 3.',
    $md$## What this is about

Machine-readable programmes shorten the path from theatre to platform. Instead of PDF tables, structured JSON moves into the data space.

- Open standard
- GDPR-compliant
- Compatible with existing ERP systems

*The kickoff was warm, and the lunch buffet was honestly good.*$md$
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'en',
    'First pilot partners confirmed',
    'Three theatres are starting the beta test for the interface. We report what we learned in the first few days.',
    $md$## Three theatres, three setups

From a classic ERP connection to manual maintenance through a CMS, the range of theatre setups is both the project's greatest strength and its biggest challenge.

We appreciate the trust and will deliver the first iteration of the connector over the coming weeks.$md$
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'de',
    'Konnektor-Roadmap: Was als Nächstes kommt',
    'Ein Arbeitsstand zu den nächsten Iterationen des Konnektors, von Validierung bis Dokumentation.',
    $md$## In Arbeit

Der Konnektor wird in kurzen Iterationen mit Pilotpartnern weiterentwickelt. Im Fokus stehen aktuell Datenvalidierung, Authentifizierung und die Dokumentation für Webagenturen.

Dieser Beitrag bleibt als Entwurf, bis Roadmap und Zeitplan final abgestimmt sind.$md$
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'en',
    'Connector roadmap: what comes next',
    'A working note on the next connector iterations, from validation to documentation.',
    $md$## In progress

The connector is being developed in short iterations with pilot partners. Current priorities are data validation, authentication and documentation for web agencies.

This post stays in draft until the roadmap and timeline are final.$md$
  )
on conflict (post_id, locale) do update
set
  title = excluded.title,
  excerpt = excluded.excerpt,
  body_md = excluded.body_md;
