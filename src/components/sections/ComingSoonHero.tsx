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
    <section className="relative isolate overflow-hidden border-b border-[var(--rule-strong)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-grid-pattern opacity-60"
      />
      <div className="mx-auto flex min-h-[60vh] max-w-[var(--container-max)] flex-col justify-center gap-6 px-4 py-24 sm:px-6 lg:px-8">
        <FadeInOnScroll className="editorial-kicker">
          {pageKicker} · {t("kicker")}
        </FadeInOnScroll>

        <h1 className="max-w-3xl border-t border-[var(--rule-strong)] pt-5 text-balance font-serif text-[length:var(--text-h1)] font-semibold leading-[var(--leading-tight)] tracking-[var(--tracking-display)]">
          <RevealText>{pageTitle}</RevealText>
        </h1>

        <FadeInOnScroll
          delay={0.15}
          className="max-w-2xl border-l-4 border-[var(--accent-brand)] pl-5 text-pretty text-base leading-[var(--leading-relaxed)] text-foreground/72 md:text-lg"
        >
          {body ?? t("body")}
        </FadeInOnScroll>

        <FadeInOnScroll delay={0.3} className="pt-2">
          <Button asChild variant="outline">
            <Link href="/">← {t("backToHome")}</Link>
          </Button>
        </FadeInOnScroll>
      </div>
    </section>
  );
}
