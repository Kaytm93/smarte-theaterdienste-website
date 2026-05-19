import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/sections/PageHero";
import { ResourceLinkGrid } from "@/components/sections/ResourceLinkGrid";
import { FadeInOnScroll } from "@/components/animations/FadeInOnScroll";
import { loadContent } from "@/lib/content/loader";
import type { Locale } from "@/lib/i18n/routing";
import { pageMetadata } from "@/lib/seo/alternates";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.materialien" });
  return pageMetadata({
    locale,
    href: "/materialien",
    title: t("title"),
    description: t("lead"),
  });
}

export default async function MaterialienPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.materialien");
  const content = loadContent("materialien", locale);

  return (
    <>
      <PageHero kicker={t("kicker")} title={t("title")} lead={t("lead")} />

      <ResourceLinkGrid
        eyebrow={content.resources.eyebrow}
        heading={content.resources.heading}
        lead={content.resources.lead}
        resources={content.resources.items}
      />

      <FadeInOnScroll className="mx-auto max-w-[var(--container-max)] px-4 pb-24 pt-2 sm:px-6 lg:px-8">
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
    </>
  );
}
