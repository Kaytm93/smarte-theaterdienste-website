-- M18 P2 #5 — Event-Fotos für die Timeline.
--
-- Additives, nullbares Bildfeld auf public.events. Bestehende Zeilen bleiben
-- unberührt (Default NULL); die Timeline rendert das Foto nur, wenn image_url
-- gesetzt ist (Graceful Fallback). Die Query in src/lib/supabase/queries.ts
-- selektiert image_url defensiv und funktioniert daher auch vor dem Push dieser
-- Migration — sobald die Spalte live ist und echte URLs eingepflegt sind,
-- erscheinen die Bilder ohne weitere Code-Änderung.
alter table public.events
  add column if not exists image_url text;

comment on column public.events.image_url is
  'Optionale Event-Foto-URL für die Timeline-Darstellung. NULL = kein Bild (Graceful Fallback).';
