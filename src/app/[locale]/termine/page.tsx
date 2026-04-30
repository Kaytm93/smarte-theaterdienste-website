import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { EventCard } from "@/components/sections/EventCard";
import { ComingSoonHero } from "@/components/sections/ComingSoonHero";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { listUpcomingEvents, listPastEvents } from "@/lib/supabase/queries";
import type { Locale } from "@/lib/i18n/routing";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.termine" });
  return { title: t("title") };
}

export default async function TerminePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.termine");

  if (!isSupabaseConfigured()) {
    return <ComingSoonHero pageKicker={t("kicker")} pageTitle={t("title")} />;
  }

  const [upcoming, past] = await Promise.all([
    listUpcomingEvents(locale),
    listPastEvents(locale),
  ]);

  if (upcoming.length === 0 && past.length === 0) {
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

      <section className="mx-auto max-w-[var(--container-max)] px-4 pb-12 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-xs font-medium uppercase tracking-[0.22em] text-foreground/55">
          {t("upcomingHeading")}
        </h2>
        {upcoming.length === 0 ? (
          <p className="text-base text-foreground/70">{t("noUpcoming")}</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((event) => (
              <EventCard
                key={event.slug}
                event={event}
                locale={locale}
                registerLabel={t("registerCta")}
              />
            ))}
          </div>
        )}
      </section>

      {past.length > 0 ? (
        <section className="mx-auto max-w-[var(--container-max)] px-4 pb-20 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-xs font-medium uppercase tracking-[0.22em] text-foreground/55">
            {t("pastHeading")}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {past.map((event) => (
              <EventCard
                key={event.slug}
                event={event}
                locale={locale}
                registerLabel={t("registerCta")}
              />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
