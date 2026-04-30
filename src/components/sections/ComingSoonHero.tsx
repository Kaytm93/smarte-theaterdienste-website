import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { FadeInOnScroll } from "@/components/animations/FadeInOnScroll";
import { RevealText } from "@/components/animations/RevealText";

type Props = {
  pageKicker: string;
  pageTitle: string;
  body?: string;
};

export async function ComingSoonHero({ pageKicker, pageTitle, body }: Props) {
  const t = await getTranslations("comingSoon");

  return (
    <section className="mx-auto flex min-h-[60vh] max-w-[var(--container-max)] flex-col justify-center gap-6 px-4 py-24 sm:px-6 lg:px-8">
      <FadeInOnScroll className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--accent-brand)]">
        {pageKicker} · {t("kicker")}
      </FadeInOnScroll>

      <h1 className="text-balance font-semibold leading-[var(--leading-tight)] tracking-tight text-[length:var(--text-h1)]">
        <RevealText>{pageTitle}</RevealText>
      </h1>

      <FadeInOnScroll
        delay={0.15}
        className="max-w-2xl text-pretty text-base leading-[var(--leading-relaxed)] text-foreground/75 md:text-lg"
      >
        {body ?? t("body")}
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.3} className="pt-2">
        <Button asChild variant="outline" className="rounded-full">
          <Link href="/">← {t("backToHome")}</Link>
        </Button>
      </FadeInOnScroll>
    </section>
  );
}
