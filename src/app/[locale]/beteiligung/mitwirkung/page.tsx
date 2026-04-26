import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { StepCard } from "@/components/sections/StepCard";
import { FadeInOnScroll } from "@/components/animations/FadeInOnScroll";
import { loadContent } from "@/lib/content/loader";
import type { Locale } from "@/lib/i18n/routing";

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
        <div className="rounded-2xl border border-dashed border-border/70 bg-muted/30 p-8">
          <div className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--accent-brand)]">
              {content.mapPlaceholder.heading}
            </p>
            <p className="max-w-2xl text-base leading-[var(--leading-relaxed)] text-foreground/70">
              {content.mapPlaceholder.body}
            </p>
            <ul className="flex flex-wrap gap-2 pt-2">
              {content.partners.map((partner) => (
                <li
                  key={partner}
                  className="rounded-full border border-border/60 bg-background px-3 py-1 text-xs text-foreground/65"
                >
                  {partner}
                </li>
              ))}
            </ul>
          </div>
          <div
            className="mt-6 flex aspect-[3/2] max-w-md items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent-brand)]/10 to-[var(--accent-brand)]/5 text-xs uppercase tracking-[0.2em] text-foreground/40"
            aria-hidden
          >
            Karte folgt in M5
          </div>
        </div>
      </FadeInOnScroll>
    </>
  );
}
