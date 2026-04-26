import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ComingSoonHero } from "@/components/sections/ComingSoonHero";
import type { Locale } from "@/lib/i18n/routing";

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
  return <ComingSoonHero pageKicker={t("kicker")} pageTitle={t("title")} />;
}
