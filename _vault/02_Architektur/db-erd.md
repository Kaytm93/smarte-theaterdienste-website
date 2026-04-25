---
tags: [architektur, datenbank]
---

# Datenbank ER-Diagramm

Pattern: Parent-Tabelle für Daten, separate `*_translations`-Tabelle pro Locale.

```mermaid
erDiagram
    LOCALE {
        enum value "de | en"
    }

    EVENTS ||--o{ EVENT_TRANSLATIONS : has
    EVENTS {
        uuid id PK
        text slug UK
        timestamptz starts_at
        timestamptz ends_at
        text location
        text url
        text type "meetup|workshop|conference|other"
        bool published
        timestamptz created_at
    }
    EVENT_TRANSLATIONS {
        uuid event_id FK
        enum locale
        text title
        text description
    }

    POSTS ||--o{ POST_TRANSLATIONS : has
    POSTS {
        uuid id PK
        text slug UK
        text cover_image
        text author
        timestamptz published_at
        text status "draft|published"
        timestamptz created_at
    }
    POST_TRANSLATIONS {
        uuid post_id FK
        enum locale
        text title
        text excerpt
        text body_md
    }

    FAQS ||--o{ FAQ_TRANSLATIONS : has
    FAQS {
        uuid id PK
        text category
        int sort_order
        bool published
    }
    FAQ_TRANSLATIONS {
        uuid faq_id FK
        enum locale
        text question
        text answer_md
    }

    PARTNERS ||--o{ PARTNER_TRANSLATIONS : has
    PARTNERS {
        uuid id PK
        text name
        text short_name
        text city
        text state
        numeric lat
        numeric lng
        text type "theater|webagentur|institution|archiv|other"
        text status "beta-tester|kooperation|interessiert"
        text website
        text logo_url
        bool published
    }
    PARTNER_TRANSLATIONS {
        uuid partner_id FK
        enum locale
        text description
        text role
    }
```

## RLS-Policies (Skizze)

- Alle Parent-Tabellen: `select` wenn `published = true`
- Translations: `select` immer (auf Parent-Sicht filtert sich's automatisch via Join)
- `insert/update/delete`: nur `service_role`

## Statisch im Code (kein DB)

- **Ansprechpersonen** (4 Personen) → `src/content/{locale}/team.json`
- **Static Marketing-Texte** (Standards, Anwendungsbeispiele) → `src/content/{locale}/*.mdx`
