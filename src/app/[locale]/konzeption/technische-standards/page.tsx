import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/sections/PageHero";
import { ComicStrip } from "@/components/sections/ComicStrip";
import { ResourceLinkGrid } from "@/components/sections/ResourceLinkGrid";
import { TextSection } from "@/components/sections/TextSection";
import { VideoEmbed } from "@/components/sections/VideoEmbed";
import { FadeInOnScroll } from "@/components/animations/FadeInOnScroll";
import { loadContent } from "@/lib/content/loader";
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "pages.technischeStandards",
  });
  return pageMetadata({
    locale,
    href: "/konzeption/technische-standards",
    title: t("title"),
    description: t("lead"),
  });
}

export default async function TechnischeStandardsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.technischeStandards");
  const content = loadContent("projekt-technische-standards", locale);
  const landing = loadContent("landing", locale);
  const sections = content.sections as SectionContent[];

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

      <VideoEmbed
        eyebrow={content.media.video.eyebrow}
        heading={content.media.video.heading}
        caption={content.media.video.caption}
        youtubeId={content.media.video.youtubeId}
        title={content.media.video.title}
      />

      <ComicStrip
        eyebrow={content.media.comic.eyebrow}
        heading={content.media.comic.heading}
        frames={landing.comicStrip.frames}
      />

      <ResourceLinkGrid
        eyebrow={content.resources.eyebrow}
        heading={content.resources.heading}
        lead={content.resources.lead}
        resources={content.resources.items}
      />

      <FadeInOnScroll className="mx-auto max-w-[var(--container-max)] px-4 pb-24 pt-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-3">
          {content.links.map((link) => (
            <Button
              key={link.href}
              asChild
              variant="outline"
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
