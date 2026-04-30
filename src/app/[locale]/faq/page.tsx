import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { ComingSoonHero } from "@/components/sections/ComingSoonHero";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { listPublishedFaqs } from "@/lib/supabase/queries";
import type { Locale } from "@/lib/i18n/routing";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.faq" });
  return { title: t("title") };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.faq");

  if (!isSupabaseConfigured()) {
    return <ComingSoonHero pageKicker={t("kicker")} pageTitle={t("title")} />;
  }

  const faqs = await listPublishedFaqs(locale);

  if (faqs.length === 0) {
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
      <section className="mx-auto max-w-3xl px-4 pb-20 sm:px-6 lg:px-8">
        <FaqAccordion faqs={faqs} />
      </section>
    </>
  );
}
