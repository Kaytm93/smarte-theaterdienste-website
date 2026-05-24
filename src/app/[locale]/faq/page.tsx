import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { FaqAccordion, type FaqGroup } from "@/components/sections/FaqAccordion";
import { ComingSoonHero } from "@/components/sections/ComingSoonHero";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { listPublishedFaqs, type FaqItem } from "@/lib/supabase/queries";
import type { Locale } from "@/lib/i18n/routing";
import { pageMetadata } from "@/lib/seo/alternates";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.faq" });
  return pageMetadata({
    locale,
    href: "/faq",
    title: t("title"),
    description: t("lead"),
  });
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

  const tCat = await getTranslations("pages.faq.categories");
  const CATEGORY_LABELS: Record<string, string> = {
    grundwissen: tCat("grundwissen"),
    "technik-sicherheit": tCat("technik-sicherheit"),
    "umsetzung-kosten": tCat("umsetzung-kosten"),
    "datenraum-kultur": tCat("datenraum-kultur"),
  };

  const order: string[] = [];
  const byCategory = new Map<string, FaqItem[]>();
  for (const faq of faqs) {
    const key = faq.category ?? "_other";
    if (!byCategory.has(key)) {
      byCategory.set(key, []);
      order.push(key);
    }
    byCategory.get(key)!.push(faq);
  }
  const groups: FaqGroup[] = order.map((key) => ({
    key,
    label: CATEGORY_LABELS[key] ?? null,
    items: byCategory.get(key)!,
  }));

  return (
    <>
      <PageHero kicker={t("kicker")} title={t("title")} lead={t("lead")} />
      <section className="mx-auto max-w-4xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <FaqAccordion groups={groups} />
      </section>
    </>
  );
}
