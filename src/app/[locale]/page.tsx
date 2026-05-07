import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { FadeInOnScroll } from "@/components/animations/FadeInOnScroll";
import { RevealText } from "@/components/animations/RevealText";
import { ComicStrip } from "@/components/sections/ComicStrip";
import { TextSection } from "@/components/sections/TextSection";
import { loadContent } from "@/lib/content/loader";
import type { Locale } from "@/lib/i18n/routing";
import { pageMetadata } from "@/lib/seo/alternates";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: "meta" });
  const tHero = await getTranslations({ locale, namespace: "hero" });
  return pageMetadata({
    locale,
    href: "/",
    titleAbsolute: tMeta("siteName"),
    description: tHero("subtitle"),
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("hero");
  const landing = loadContent("landing", locale);

  const STAGGER = 0.08;

  return (
    <>
      <section className="relative mx-auto flex min-h-[80vh] max-w-[var(--container-max)] flex-col justify-center gap-8 overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
        <div
          aria-hidden
          className="pointer-events-none absolute right-[-15%] top-[-10%] h-[55vh] w-[55vh] rounded-full bg-[oklch(0.55_0.16_250/_0.10)] blur-3xl"
        />
        <FadeInOnScroll className="relative text-xs font-medium uppercase tracking-[0.22em] text-[var(--accent-brand)]">
          {t("kicker")}
        </FadeInOnScroll>

        <h1 className="relative text-balance font-semibold leading-[var(--leading-tight)] tracking-tight text-[length:var(--text-display)]">
          <RevealText>{t("title")}</RevealText>
        </h1>

        <FadeInOnScroll
          delay={STAGGER * 2}
          className="relative max-w-2xl text-pretty text-lg leading-[var(--leading-relaxed)] text-foreground/75 md:text-xl"
        >
          {t("subtitle")}
        </FadeInOnScroll>

        <FadeInOnScroll delay={STAGGER * 3} className="relative flex flex-wrap gap-3 pt-4">
          <Button asChild size="lg" className="rounded-full px-6">
            <Link href="/beteiligung">{t("ctaPrimary")}</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full px-6">
            <Link href="/projekt">{t("ctaSecondary")}</Link>
          </Button>
        </FadeInOnScroll>
      </section>

      <ComicStrip
        eyebrow={landing.comicStrip.eyebrow}
        heading={landing.comicStrip.heading}
        frames={landing.comicStrip.frames}
      />

      <TextSection
        eyebrow={landing.pitch.eyebrow}
        heading={landing.pitch.heading}
        body={landing.pitch.body}
      />
    </>
  );
}
