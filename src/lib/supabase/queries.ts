import { getSupabaseServer } from "./server";
import type { Locale } from "@/lib/i18n/routing";

// =============================================================================
// Query-Helper fuer Server-Components.
// i18n-Pattern: !inner-Join auf *_translations + .eq(locale).
// .returns<T>() umgeht die Relationship-Inferenz, bis `supabase gen types
// --linked` die echten Relationships in src/types/database.ts schreibt.
// =============================================================================

export type PostListItem = {
  slug: string;
  title: string;
  excerpt: string | null;
  publishedAt: string | null;
  coverImageUrl: string | null;
};

export type PostDetail = PostListItem & {
  bodyMd: string;
};

export type EventListItem = {
  slug: string;
  title: string;
  descriptionMd: string | null;
  startsAt: string;
  endsAt: string | null;
  location: string | null;
  registrationUrl: string | null;
  status: "upcoming" | "past" | "cancelled";
};

export type FaqItem = {
  id: string;
  position: number;
  category: string | null;
  question: string;
  answerMd: string;
};

// ----------------------------------------------------------------------------
// Posts
// ----------------------------------------------------------------------------

type PostListRow = {
  slug: string;
  published_at: string | null;
  cover_image_url: string | null;
  post_translations: Array<{ title: string; excerpt: string | null }>;
};

export async function listPublishedPosts(locale: Locale): Promise<PostListItem[]> {
  const supabase = await getSupabaseServer();
  const { data, error } = await supabase
    .from("posts")
    .select("slug, published_at, cover_image_url, post_translations!inner(title, excerpt, locale)")
    .eq("status", "published")
    .eq("post_translations.locale", locale)
    .order("published_at", { ascending: false })
    .returns<PostListRow[]>();

  if (error || !data) return [];

  return data.map((row) => ({
    slug: row.slug,
    title: row.post_translations[0]?.title ?? row.slug,
    excerpt: row.post_translations[0]?.excerpt ?? null,
    publishedAt: row.published_at,
    coverImageUrl: row.cover_image_url,
  }));
}

type PostDetailRow = {
  slug: string;
  published_at: string | null;
  cover_image_url: string | null;
  post_translations: Array<{ title: string; excerpt: string | null; body_md: string }>;
};

export async function getPostBySlug(slug: string, locale: Locale): Promise<PostDetail | null> {
  const supabase = await getSupabaseServer();
  const { data, error } = await supabase
    .from("posts")
    .select("slug, published_at, cover_image_url, post_translations!inner(title, excerpt, body_md, locale)")
    .eq("status", "published")
    .eq("slug", slug)
    .eq("post_translations.locale", locale)
    .returns<PostDetailRow[]>()
    .maybeSingle();

  if (error || !data) return null;

  const translation = data.post_translations[0];
  if (!translation) return null;

  return {
    slug: data.slug,
    title: translation.title,
    excerpt: translation.excerpt ?? null,
    bodyMd: translation.body_md,
    publishedAt: data.published_at,
    coverImageUrl: data.cover_image_url,
  };
}

export async function listAllPostSlugs(): Promise<string[]> {
  const supabase = await getSupabaseServer();
  const { data, error } = await supabase
    .from("posts")
    .select("slug")
    .eq("status", "published")
    .returns<Array<{ slug: string }>>();

  if (error || !data) return [];
  return data.map((row) => row.slug);
}

// ----------------------------------------------------------------------------
// Events
// ----------------------------------------------------------------------------

type EventRow = {
  slug: string;
  starts_at: string;
  ends_at: string | null;
  location: string | null;
  registration_url: string | null;
  status: "upcoming" | "past" | "cancelled";
  event_translations: Array<{ title: string; description_md: string | null }>;
};

async function listEventsByStatus(
  locale: Locale,
  statuses: Array<"upcoming" | "past">,
): Promise<EventListItem[]> {
  const supabase = await getSupabaseServer();
  const ascending = statuses.includes("upcoming");
  const { data, error } = await supabase
    .from("events")
    .select(
      "slug, starts_at, ends_at, location, registration_url, status, event_translations!inner(title, description_md, locale)",
    )
    .in("status", statuses)
    .eq("event_translations.locale", locale)
    .order("starts_at", { ascending })
    .returns<EventRow[]>();

  if (error || !data) return [];

  return data.map((row) => ({
    slug: row.slug,
    title: row.event_translations[0]?.title ?? row.slug,
    descriptionMd: row.event_translations[0]?.description_md ?? null,
    startsAt: row.starts_at,
    endsAt: row.ends_at,
    location: row.location,
    registrationUrl: row.registration_url,
    status: row.status,
  }));
}

export function listUpcomingEvents(locale: Locale): Promise<EventListItem[]> {
  return listEventsByStatus(locale, ["upcoming"]);
}

export function listPastEvents(locale: Locale): Promise<EventListItem[]> {
  return listEventsByStatus(locale, ["past"]);
}

// ----------------------------------------------------------------------------
// FAQs
// ----------------------------------------------------------------------------

type FaqRow = {
  id: string;
  position: number;
  category: string | null;
  faq_translations: Array<{ question: string; answer_md: string }>;
};

export async function listPublishedFaqs(locale: Locale): Promise<FaqItem[]> {
  const supabase = await getSupabaseServer();
  const { data, error } = await supabase
    .from("faqs")
    .select("id, position, category, faq_translations!inner(question, answer_md, locale)")
    .eq("is_published", true)
    .eq("faq_translations.locale", locale)
    .order("position", { ascending: true })
    .returns<FaqRow[]>();

  if (error || !data) return [];

  return data.map((row) => ({
    id: row.id,
    position: row.position,
    category: row.category,
    question: row.faq_translations[0]?.question ?? "",
    answerMd: row.faq_translations[0]?.answer_md ?? "",
  }));
}
