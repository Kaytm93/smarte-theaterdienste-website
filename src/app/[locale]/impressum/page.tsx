import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { TextSection } from "@/components/sections/TextSection";
import { loadContent } from "@/lib/content/loader";
import type { Locale } from "@/lib/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.impressum" });
  return { title: t("title") };
}

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.impressum");
  const legal = loadContent("legal", locale);

  return (
    <>
      <PageHero kicker={t("kicker")} title={t("title")} />
      <TextSection
        eyebrow={legal.imprint.todo ? "TODO" : undefined}
        body={legal.imprint.body}
      />
    </>
  );
}
