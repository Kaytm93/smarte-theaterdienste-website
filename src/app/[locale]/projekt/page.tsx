import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/sections/PageHero";
import { TextSection } from "@/components/sections/TextSection";
import { FadeInOnScroll } from "@/components/animations/FadeInOnScroll";
import { loadContent } from "@/lib/content/loader";
import type { Locale } from "@/lib/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.projekt" });
  return { title: t("title") };
}

export default async function ProjektPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.projekt");
  const content = loadContent("projekt", locale);

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

      <FadeInOnScroll className="mx-auto max-w-[var(--container-max)] px-4 pb-24 pt-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-3">
          {content.links.map((link) => (
            <Button
              key={link.href}
              asChild
              variant="outline"
              className="rounded-full"
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
