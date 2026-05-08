import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { CheckCircle2, Clock3, Repeat2, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { StepCard } from "@/components/sections/StepCard";
import { PartnerMap } from "@/components/sections/PartnerMap";
import { FadeInOnScroll } from "@/components/animations/FadeInOnScroll";
import { loadContent } from "@/lib/content/loader";
import type { Locale } from "@/lib/i18n/routing";
import { pageMetadata } from "@/lib/seo/alternates";

export const revalidate = 60;

const BENEFIT_ICONS = [Repeat2, Clock3, ShieldCheck] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.mitwirkung" });
  return pageMetadata({
    locale,
    href: "/beteiligung/mitwirkung",
    title: t("title"),
    description: t("lead"),
  });
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
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)] lg:items-start">
          <div className="space-y-3">
            <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-[var(--accent-brand)]">
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent-brand)]"
              />
              {content.benefits.eyebrow}
            </p>
            <h2 className="max-w-xl text-balance font-semibold leading-[var(--leading-snug)] tracking-[var(--tracking-heading)] text-[length:var(--text-h2)]">
              {content.benefits.heading}
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {content.benefits.items.map((item, index) => {
              const Icon = BENEFIT_ICONS[index % BENEFIT_ICONS.length];

              return (
                <article
                  key={item.title}
                  className="rounded-2xl border border-border/70 bg-[var(--surface-elevated)] p-5 shadow-[var(--shadow-xs)]"
                >
                  <div className="mb-4 inline-flex size-9 items-center justify-center rounded-full bg-[var(--accent-brand)]/10 text-[var(--accent-brand)]">
                    <Icon aria-hidden className="size-4" />
                  </div>
                  <h3 className="text-base font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-[var(--leading-relaxed)] text-foreground/70">
                    {item.body}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </FadeInOnScroll>

      <FadeInOnScroll className="mx-auto max-w-[var(--container-max)] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {content.steps.map((step) => (
            <StepCard
              key={step.step}
              step={step.step}
              title={step.title}
              body={step.body}
            />
          ))}
        </div>
        {"quote" in content && content.quote ? (
          <figure className="mt-8 rounded-2xl border border-border/70 bg-[var(--surface-elevated)] p-6 shadow-[var(--shadow-xs)]">
            <blockquote className="max-w-4xl text-pretty text-lg leading-[var(--leading-relaxed)] text-foreground/75">
              „{content.quote.body}“
            </blockquote>
            <figcaption className="mt-4 text-sm font-medium text-foreground/60">
              {content.quote.source}
            </figcaption>
          </figure>
        ) : null}
      </FadeInOnScroll>

      <FadeInOnScroll className="mx-auto max-w-[var(--container-max)] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 rounded-2xl border border-border/70 bg-[var(--surface-elevated)] p-6 shadow-[var(--shadow-xs)] sm:p-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:items-start">
          <div className="space-y-3">
            <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-[var(--accent-secondary)]">
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent-secondary)]"
              />
              {content.implementation.eyebrow}
            </p>
            <h2 className="text-balance text-2xl font-semibold leading-[var(--leading-snug)] tracking-[var(--tracking-heading)] sm:text-3xl">
              {content.implementation.heading}
            </h2>
            <p className="max-w-prose text-sm leading-[var(--leading-relaxed)] text-foreground/70 sm:text-base">
              {content.implementation.body}
            </p>
          </div>

          <ol className="grid gap-3">
            {content.implementation.items.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-xl border border-border/60 bg-background/70 p-4 text-sm leading-[var(--leading-relaxed)] text-foreground/75"
              >
                <CheckCircle2
                  aria-hidden
                  className="mt-0.5 size-4 shrink-0 text-[var(--accent-brand)]"
                />
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </FadeInOnScroll>

      <FadeInOnScroll className="mx-auto max-w-[var(--container-max)] px-4 pb-24 pt-8 sm:px-6 lg:px-8">
        <PartnerMap />
      </FadeInOnScroll>
    </>
  );
}
