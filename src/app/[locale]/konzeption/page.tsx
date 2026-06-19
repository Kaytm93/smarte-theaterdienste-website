import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/sections/PageHero";
import { TextSection } from "@/components/sections/TextSection";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { Timeline } from "@/components/sections/Timeline";
import type { ReiseStation } from "@/components/sections/SpielplanReise";
import { FadeInOnScroll } from "@/components/animations/FadeInOnScroll";
import { loadContent } from "@/lib/content/loader";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { listPastEvents, type EventListItem } from "@/lib/supabase/queries";
import type { Locale } from "@/lib/i18n/routing";
import { pageMetadata } from "@/lib/seo/alternates";

type SectionContent = {
  eyebrow?: string;
  heading?: string;
  body: string | string[];
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
};

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.projekt" });
  return pageMetadata({
    locale,
    href: "/konzeption",
    title: t("title"),
    description: t("lead"),
  });
}

export default async function KonzeptionPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.projekt");
  const tTeam = await getTranslations("pages.team");
  const tTimeline = await getTranslations("timeline");
  const content = loadContent("projekt", locale);
  const team = loadContent("team", locale);
  const sections = content.sections as SectionContent[];

  const pastEvents: EventListItem[] = isSupabaseConfigured()
    ? await listPastEvents(locale)
    : [];

  return (
    <>
      <PageHero kicker={t("kicker")} title={t("title")} lead={t("lead")} />

      <div className="divide-y divide-border/50">
        {sections.map((section, i) => (
          <TextSection
            key={i}
            eyebrow={section.eyebrow}
            heading={section.heading}
            body={section.body}
            image={section.image}
            imageAlt={section.imageAlt}
            imageCaption={section.imageCaption}
          />
        ))}
      </div>

      <FadeInOnScroll className="mx-auto max-w-[var(--container-max)] px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-3">
          {content.links.map((link) => (
            <Button key={link.href} asChild variant="outline">
              <Link href={link.href as Parameters<typeof Link>[0]["href"]}>
                {link.label} →
              </Link>
            </Button>
          ))}
        </div>
      </FadeInOnScroll>

      <Timeline
        events={pastEvents}
        labels={{
          eyebrow: tTimeline("eyebrow"),
          heading: tTimeline("heading"),
          lead: tTimeline("lead"),
          locationLabel: tTimeline("locationLabel"),
          sourceLabel: tTimeline("sourceLabel"),
        }}
        locale={locale}
        journey={{
          heading: tTimeline("journey.heading"),
          lead: tTimeline("journey.lead"),
          hint: tTimeline("journey.hint"),
          prev: tTimeline("journey.prev"),
          next: tTimeline("journey.next"),
          progressLabel: tTimeline.raw("journey.progressLabel") as string,
          stations: tTimeline.raw("journey.stations") as ReiseStation[],
        }}
      />

      <section className="border-t border-[var(--rule-strong)]">
        <FadeInOnScroll className="mx-auto max-w-[var(--container-max)] px-4 pb-2 pt-16 sm:px-6 sm:pt-20 lg:px-8">
          <div className="space-y-3">
            <p className="editorial-kicker">{tTeam("kicker")}</p>
            <h2 className="max-w-3xl text-balance font-serif text-[length:var(--text-h2)] font-semibold leading-[var(--leading-snug)] tracking-[var(--tracking-heading)]">
              {tTeam("title")}
            </h2>
            <p className="max-w-2xl text-pretty text-base leading-[var(--leading-relaxed)] text-foreground/72 md:text-lg">
              {tTeam("lead")}
            </p>
          </div>
        </FadeInOnScroll>
        <TeamGrid members={team.members} />
      </section>
    </>
  );
}
