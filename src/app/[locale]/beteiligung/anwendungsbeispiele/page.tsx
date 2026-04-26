import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { UseCaseCard } from "@/components/sections/UseCaseCard";
import { FadeInOnScroll } from "@/components/animations/FadeInOnScroll";
import { loadContent } from "@/lib/content/loader";
import type { Locale } from "@/lib/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "pages.anwendungsbeispiele",
  });
  return { title: t("title") };
}

export default async function AnwendungsbeispielePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.anwendungsbeispiele");
  const content = loadContent("beteiligung-anwendungsbeispiele", locale);

  return (
    <>
      <PageHero kicker={t("kicker")} title={t("title")} lead={t("lead")} />

      <FadeInOnScroll className="mx-auto max-w-[var(--container-max)] px-4 pb-24 pt-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {content.useCases.map((useCase) => (
            <UseCaseCard key={useCase.id} useCase={useCase} />
          ))}
        </div>
      </FadeInOnScroll>
    </>
  );
}
