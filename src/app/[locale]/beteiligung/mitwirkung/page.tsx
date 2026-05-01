import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { StepCard } from "@/components/sections/StepCard";
import { PartnerMap } from "@/components/sections/PartnerMap";
import { FadeInOnScroll } from "@/components/animations/FadeInOnScroll";
import { loadContent } from "@/lib/content/loader";
import type { Locale } from "@/lib/i18n/routing";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.mitwirkung" });
  return { title: t("title") };
}

export default async function MitwirkungPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.mitwirkung");
  const content = loadContent("beteiligung-mitwirkung", locale);

  return (
    <>
      <PageHero kicker={t("kicker")} title={t("title")} lead={content.intro} />

      <FadeInOnScroll className="mx-auto max-w-[var(--container-max)] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2">
          {content.steps.map((step) => (
            <StepCard
              key={step.step}
              step={step.step}
              title={step.title}
              body={step.body}
            />
          ))}
        </div>
      </FadeInOnScroll>

      <FadeInOnScroll className="mx-auto max-w-[var(--container-max)] px-4 pb-24 sm:px-6 lg:px-8">
        <PartnerMap />
      </FadeInOnScroll>
    </>
  );
}
