import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { loadContent } from "@/lib/content/loader";
import type { Locale } from "@/lib/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.ansprechpersonen" });
  return { title: t("title") };
}

export default async function AnsprechpersonenPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.ansprechpersonen");
  const team = loadContent("team", locale);

  return (
    <>
      <PageHero kicker={t("kicker")} title={t("title")} lead={t("lead")} />
      <TeamGrid members={team.members} />
    </>
  );
}
