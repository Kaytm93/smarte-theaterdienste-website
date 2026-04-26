import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { FadeInOnScroll } from "@/components/animations/FadeInOnScroll";
import { RevealText } from "@/components/animations/RevealText";
import { ComicStrip } from "@/components/sections/ComicStrip";
import { TextSection } from "@/components/sections/TextSection";
import { loadContent } from "@/lib/content/loader";
import type { Locale } from "@/lib/i18n/routing";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("hero");
  const landing = loadContent("landing", locale);

  return (
    <>
      <section className="mx-auto flex min-h-[80vh] max-w-[var(--container-max)] flex-col justify-center gap-8 px-4 py-24 sm:px-6 lg:px-8">
        <FadeInOnScroll className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--accent-brand)]">
          {t("kicker")}
        </FadeInOnScroll>

        <h1 className="text-balance font-semibold leading-[var(--leading-tight)] tracking-tight text-[length:var(--text-display)]">
          <RevealText>{t("title")}</RevealText>
        </h1>

        <FadeInOnScroll
          delay={0.15}
          className="max-w-2xl text-pretty text-lg leading-[var(--leading-relaxed)] text-foreground/75 md:text-xl"
        >
          {t("subtitle")}
        </FadeInOnScroll>

        <FadeInOnScroll delay={0.3} className="flex flex-wrap gap-3 pt-4">
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
