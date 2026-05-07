import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { FadeInOnScroll } from "@/components/animations/FadeInOnScroll";
import { RevealText } from "@/components/animations/RevealText";
import { ComicStrip } from "@/components/sections/ComicStrip";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { NetworkMapSection } from "@/components/sections/NetworkMapSection";
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
      <section className="relative isolate overflow-hidden">
        {/* Layered Background: Surface-Tint + Grid + zwei Glow-Blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[var(--surface-1)] via-background to-background"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[80%] bg-grid-pattern opacity-60"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-[-10%] top-[-15%] -z-10 h-[60vh] w-[60vh] rounded-full blur-3xl"
          style={{ backgroundColor: "var(--glow-blue)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-[-12%] top-[35%] -z-10 h-[45vh] w-[45vh] rounded-full blur-3xl"
          style={{ backgroundColor: "var(--glow-magenta)" }}
        />

        <div className="mx-auto grid max-w-[var(--container-max)] gap-12 px-4 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-8 lg:pb-32 lg:pt-28">
          <div className="flex flex-col justify-center gap-7">
            <FadeInOnScroll className="inline-flex items-center gap-2 self-start text-xs font-medium uppercase tracking-[0.22em] text-[var(--accent-brand)]">
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent-brand)]"
              />
              {t("kicker")}
            </FadeInOnScroll>

            <h1 className="text-balance font-semibold leading-[var(--leading-tight)] tracking-[var(--tracking-display)] text-[length:var(--text-display)]">
              <RevealText>{t("title")}</RevealText>
            </h1>

            <FadeInOnScroll
              delay={STAGGER * 2}
              className="max-w-xl text-pretty text-base leading-[var(--leading-relaxed)] text-foreground/70 sm:text-lg md:text-xl"
            >
              {t("subtitle")}
            </FadeInOnScroll>

            <FadeInOnScroll delay={STAGGER * 3} className="flex flex-wrap items-center gap-3 pt-2">
              <Button asChild size="lg" className="rounded-full px-7 shadow-[var(--shadow-sm)]">
                <Link href="/beteiligung">{t("ctaPrimary")}</Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="rounded-full px-6">
                <Link href="/projekt">
                  {t("ctaSecondary")}
                  <span aria-hidden className="ml-1 transition-transform duration-300 group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              </Button>
            </FadeInOnScroll>
          </div>

          <FadeInOnScroll
            delay={STAGGER * 2}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <div className="relative">
              {/* Akzentrand hinter dem Polaroid – sehr dezenter Magenta-Hauch. */}
              <div
                aria-hidden
                className="absolute -inset-3 -z-10 rounded-[28px] bg-gradient-to-br from-[var(--glow-magenta)] via-transparent to-[var(--glow-blue)] blur-2xl"
              />
              <figure className="relative bg-noise overflow-hidden rounded-[20px] border border-border bg-[var(--surface-elevated)] shadow-[var(--shadow-lg)]">
                <div className="relative aspect-[4/3] sm:aspect-[3/2]">
                  <Image
                    src="/hero/theater-parade.jpg"
                    alt={t("heroImageAlt")}
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, 540px"
                    className="object-cover"
                  />
                </div>
                <figcaption className="flex items-center justify-between gap-3 border-t border-border/70 px-5 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-foreground/55">
                  <span>{t("heroImageCaption")}</span>
                  <span aria-hidden className="font-mono">
                    Use Case 03
                  </span>
                </figcaption>
              </figure>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      <FeatureGrid
        eyebrow={landing.benefits.eyebrow}
        heading={landing.benefits.heading}
        lead={landing.benefits.lead}
        features={landing.benefits.features}
      />

      <NetworkMapSection
        eyebrow={landing.network.eyebrow}
        heading={landing.network.heading}
        lead={landing.network.lead}
        statValue={landing.network.statValue}
        statLabel={landing.network.statLabel}
        image={landing.network.image}
        imageAlt={landing.network.imageAlt}
        segments={landing.network.segments}
      />

      <ComicStrip
        eyebrow={landing.comicStrip.eyebrow}
        heading={landing.comicStrip.heading}
        frames={landing.comicStrip.frames}
      />

      <FeatureGrid
        eyebrow={landing.stakeholders.eyebrow}
        heading={landing.stakeholders.heading}
        lead={landing.stakeholders.lead}
        features={landing.stakeholders.features}
      />

      <TextSection
        eyebrow={landing.pitch.eyebrow}
        heading={landing.pitch.heading}
        body={landing.pitch.body}
      />
    </>
  );
}
