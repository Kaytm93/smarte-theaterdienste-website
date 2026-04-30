import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PostArticle } from "@/components/sections/PostArticle";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { getPostBySlug, listAllPostSlugs } from "@/lib/supabase/queries";
import type { Locale } from "@/lib/i18n/routing";
import { routing } from "@/lib/i18n/routing";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  if (!isSupabaseConfigured()) return [];
  const slugs = await listAllPostSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isSupabaseConfigured()) return {};
  const post = await getPostBySlug(slug, locale);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  if (!isSupabaseConfigured()) notFound();

  const post = await getPostBySlug(slug, locale);
  if (!post) notFound();

  const t = await getTranslations("pages.blog");

  return (
    <PostArticle
      post={post}
      locale={locale}
      publishedAtLabel={t("publishedAt")}
      backToListLabel={t("backToList")}
    />
  );
}
