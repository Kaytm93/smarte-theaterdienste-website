import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/sections/PageHero";
import { TextSection } from "@/components/sections/TextSection";
import { MapEmbed } from "@/components/sections/MapEmbed";
import { FadeInOnScroll } from "@/components/animations/FadeInOnScroll";
import { loadContent } from "@/lib/content/loader";
import { MYMAPS_EMBED_URL } from "@/lib/maps";
import type { Locale } from "@/lib/i18n/routing";
import { pageMetadata } from "@/lib/seo/alternates";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.beteiligung" });
  return pageMetadata({
    locale,
    href: "/jetzt-mitmachen",
    title: t("title"),
    description: t("lead"),
  });
}

export default async function BeteiligungPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.beteiligung");
  const content = loadContent("beteiligung", locale);

  return (
    <>
      <PageHero kicker={t("kicker")} title={t("title")} lead={t("lead")} />

      <div className="divide-y divide-border/50">
        {content.sections.map((section, i) => (
          <TextSection
            key={i}
            eyebrow={section.eyebrow}
            heading={section.heading}
            body={section.body}
          />
        ))}
      </div>

      <MapEmbed
        eyebrow={t("map.eyebrow")}
        heading={t("map.heading")}
        caption={t("map.caption")}
        mapUrl={MYMAPS_EMBED_URL}
        title={t("map.title")}
      />

      <FadeInOnScroll className="mx-auto max-w-[var(--container-max)] px-4 pb-24 pt-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-3">
          {content.links.map((link, i) => (
            <Button
              key={link.href}
              asChild
              variant={i === 0 ? "default" : "outline"}
            >
              <Link
                href={link.href as Parameters<typeof Link>[0]["href"]}
              >
                {link.label} →
              </Link>
            </Button>
          ))}
        </div>
      </FadeInOnScroll>
    </>
  );
}
