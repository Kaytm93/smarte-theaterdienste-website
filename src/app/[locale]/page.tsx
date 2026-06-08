import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { FadeInOnScroll } from "@/components/animations/FadeInOnScroll";
import { RevealText } from "@/components/animations/RevealText";
import { BuehnenvereinLockup } from "@/components/sections/BuehnenvereinLockup";
import { ComicStrip } from "@/components/sections/ComicStrip";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { NetworkMapSection } from "@/components/sections/NetworkMapSection";
import { QuoteGallery } from "@/components/sections/QuoteGallery";
import { TextSection } from "@/components/sections/TextSection";
import { VideoEmbed } from "@/components/sections/VideoEmbed";
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
  const tFooter = await getTranslations("footer");
  const landing = loadContent("landing", locale);

  const STAGGER = 0.08;

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-[var(--rule-strong)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full bg-grid-pattern opacity-60"
        />

        <div className="mx-auto max-w-[var(--container-max)] px-4 pb-10 pt-10 sm:px-6 sm:pb-14 sm:pt-12 lg:px-8 lg:pb-20 lg:pt-16">
          <FadeInOnScroll className="mb-8">
            <BuehnenvereinLockup
              label={landing.trust.label}
              buehnenvereinAlt={tFooter("logoAlt.buehnenverein")}
            />
          </FadeInOnScroll>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)] lg:gap-10">
            <div className="flex flex-col justify-between gap-8">
              <div className="space-y-6">
                <h1 className="max-w-5xl text-balance text-[length:var(--text-display)] font-bold leading-[0.95] tracking-[var(--tracking-display)]">
                  <RevealText>{t("title")}</RevealText>
                </h1>

                <FadeInOnScroll
                  delay={STAGGER * 2}
                  className="max-w-2xl text-pretty border-l-4 border-[var(--accent-brand)] pl-5 text-lg leading-[var(--leading-relaxed)] text-foreground/80 sm:text-xl"
                >
                  {t("subtitle")}
                </FadeInOnScroll>

                <FadeInOnScroll
                  delay={STAGGER * 3}
                  className="flex flex-wrap items-baseline gap-x-4 gap-y-1 pt-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-foreground/60"
                >
                  <span>{t("kicker")}</span>
                  <span aria-hidden className="text-foreground/35">·</span>
                  <span className="font-mono normal-case tracking-[0.04em] text-foreground/70">
                    {t("tags")}
                  </span>
                </FadeInOnScroll>
              </div>

              <FadeInOnScroll delay={STAGGER * 4} className="flex flex-wrap items-center gap-3">
                <Button asChild size="lg" className="px-7">
                  <Link href="/jetzt-mitmachen">{t("ctaPrimary")}</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="px-6">
                  <Link href="/konzeption">
                    {t("ctaSecondary")}
                    <span aria-hidden className="ml-1 transition-transform duration-300 group-hover/button:translate-x-0.5">
                      →
                    </span>
                  </Link>
                </Button>
              </FadeInOnScroll>
            </div>

            <FadeInOnScroll
              delay={STAGGER * 2}
              className="relative mx-auto w-full max-w-lg lg:max-w-none"
            >
              <figure className="paper-panel bg-noise relative overflow-hidden p-3">
                <div className="relative aspect-[4/3] sm:aspect-[3/2]">
                  <Image
                    src="/hero/theater-parade.jpg"
                    alt={t("heroImageAlt")}
                    fill
                    preload
                    sizes="(max-width: 1024px) 90vw, 540px"
                    className="object-cover grayscale"
                  />
                </div>
                <figcaption className="mt-3 border-t border-[var(--rule)] pt-3 text-[11px] font-semibold uppercase tracking-[0.06em] text-foreground/60">
                  {t("heroImageCaption")}
                </figcaption>
              </figure>
            </FadeInOnScroll>
          </div>

          <FadeInOnScroll
            delay={STAGGER * 5}
            className="mt-10 border-t border-[var(--rule-strong)] pt-5"
          >
            <ol className="m-0 grid list-none gap-x-8 gap-y-3 p-0 sm:grid-cols-3">
              {landing.benefits.features.map((feature, i) => (
                <li
                  key={feature.title}
                  className="flex items-baseline gap-3 text-sm leading-snug text-foreground/80"
                >
                  <span className="font-mono text-[11px] font-semibold tabular-nums text-[var(--accent-brand-ink)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-semibold text-foreground">{feature.title}</span>
                </li>
              ))}
            </ol>
          </FadeInOnScroll>
        </div>
      </section>

      <FeatureGrid
        eyebrow={landing.benefits.eyebrow}
        heading={landing.benefits.heading}
        lead={landing.benefits.lead}
        features={landing.benefits.features}
      />

      <VideoEmbed
        eyebrow={landing.imageVideo.eyebrow}
        heading={landing.imageVideo.heading}
        caption={landing.imageVideo.caption}
        youtubeId={landing.imageVideo.youtubeId}
        title={landing.imageVideo.title}
      />

      <NetworkMapSection
        eyebrow={landing.network.eyebrow}
        heading={landing.network.heading}
        lead={landing.network.lead}
        statValue={landing.network.statValue}
        statLabel={landing.network.statLabel}
        mapUrl={MYMAPS_EMBED_URL}
        mapTitle={landing.network.mapTitle}
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

      <QuoteGallery
        eyebrow={landing.quotes.eyebrow}
        heading={landing.quotes.heading}
        quotes={landing.quotes.items}
      />

      <TextSection
        eyebrow={landing.pitch.eyebrow}
        heading={landing.pitch.heading}
        body={landing.pitch.body}
      />
    </>
  );
}
