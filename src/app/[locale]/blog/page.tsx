import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { PostCard } from "@/components/sections/PostCard";
import { ComingSoonHero } from "@/components/sections/ComingSoonHero";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { listPublishedPosts } from "@/lib/supabase/queries";
import type { Locale } from "@/lib/i18n/routing";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.blog" });
  return { title: t("title") };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.blog");

  if (!isSupabaseConfigured()) {
    return <ComingSoonHero pageKicker={t("kicker")} pageTitle={t("title")} />;
  }

  const posts = await listPublishedPosts(locale);

  if (posts.length === 0) {
    return (
      <ComingSoonHero
        pageKicker={t("empty.kicker")}
        pageTitle={t("empty.title")}
        body={t("empty.body")}
      />
    );
  }

  return (
    <>
      <PageHero kicker={t("kicker")} title={t("title")} lead={t("lead")} />
      <section className="mx-auto grid max-w-[var(--container-max)] gap-6 px-4 pb-20 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
        {posts.map((post) => (
          <PostCard
            key={post.slug}
            post={post}
            locale={locale}
            readMoreLabel={t("readMore")}
          />
        ))}
      </section>
    </>
  );
}
