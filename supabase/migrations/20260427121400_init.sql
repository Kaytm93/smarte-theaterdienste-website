-- =====================================================================
-- Smarte Theaterdienste — Initial Schema (M4)
-- =====================================================================
-- Pattern:
--   Basis-Tabelle (events, posts, faqs, partners) + *_translations
--   für i18n (DE/EN). RLS aktiv, Public-Read-Policies nur auf
--   veroeffentlichten Daten.
-- =====================================================================

-- Locale-Enum (gleiche Quelle der Wahrheit wie next-intl-Routing).
create type public.locale as enum ('de', 'en');

-- updated_at-Trigger-Funktion.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- =====================================================================
-- POSTS (Blog)
-- =====================================================================
create table public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  published_at timestamptz,
  cover_image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index posts_published_at_idx on public.posts (published_at desc) where status = 'published';

create trigger posts_set_updated_at
before update on public.posts
for each row execute function public.set_updated_at();

create table public.post_translations (
  post_id uuid not null references public.posts(id) on delete cascade,
  locale public.locale not null,
  title text not null,
  excerpt text,
  body_md text not null,
  primary key (post_id, locale)
);

-- =====================================================================
-- EVENTS (Termine)
-- =====================================================================
create table public.events (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  starts_at timestamptz not null,
  ends_at timestamptz,
  location text,
  registration_url text,
  status text not null default 'upcoming' check (status in ('upcoming', 'past', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index events_starts_at_idx on public.events (starts_at desc);

create trigger events_set_updated_at
before update on public.events
for each row execute function public.set_updated_at();

create table public.event_translations (
  event_id uuid not null references public.events(id) on delete cascade,
  locale public.locale not null,
  title text not null,
  description_md text,
  primary key (event_id, locale)
);

-- =====================================================================
-- FAQS
-- =====================================================================
create table public.faqs (
  id uuid primary key default gen_random_uuid(),
  position integer not null default 0,
  category text,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index faqs_position_idx on public.faqs (position) where is_published = true;

create trigger faqs_set_updated_at
before update on public.faqs
for each row execute function public.set_updated_at();

create table public.faq_translations (
  faq_id uuid not null references public.faqs(id) on delete cascade,
  locale public.locale not null,
  question text not null,
  answer_md text not null,
  primary key (faq_id, locale)
);

-- =====================================================================
-- PARTNERS (M5-Vorbereitung)
-- =====================================================================
create table public.partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  logo_url text,
  website_url text,
  lat double precision,
  lng double precision,
  status text not null default 'partner' check (status in ('partner', 'pilot', 'interested')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger partners_set_updated_at
before update on public.partners
for each row execute function public.set_updated_at();

-- =====================================================================
-- ROW LEVEL SECURITY
-- =====================================================================
alter table public.posts              enable row level security;
alter table public.post_translations  enable row level security;
alter table public.events             enable row level security;
alter table public.event_translations enable row level security;
alter table public.faqs               enable row level security;
alter table public.faq_translations   enable row level security;
alter table public.partners           enable row level security;

-- Public-Read-Policies (anon + authenticated).
create policy "Public can read published posts"
on public.posts for select to anon, authenticated
using (status = 'published');

create policy "Public can read post translations"
on public.post_translations for select to anon, authenticated
using (
  exists (
    select 1 from public.posts p
    where p.id = post_translations.post_id and p.status = 'published'
  )
);

create policy "Public can read events"
on public.events for select to anon, authenticated
using (true);

create policy "Public can read event translations"
on public.event_translations for select to anon, authenticated
using (true);

create policy "Public can read published faqs"
on public.faqs for select to anon, authenticated
using (is_published = true);

create policy "Public can read faq translations"
on public.faq_translations for select to anon, authenticated
using (
  exists (
    select 1 from public.faqs f
    where f.id = faq_translations.faq_id and f.is_published = true
  )
);

create policy "Public can read partners"
on public.partners for select to anon, authenticated
using (true);
