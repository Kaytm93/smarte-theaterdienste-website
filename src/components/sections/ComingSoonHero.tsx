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
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[var(--surface-1)] via-background to-background"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-[-25%] -z-10 h-[55vh] w-[55vh] rounded-full blur-3xl"
        style={{ backgroundColor: "var(--glow-blue)" }}
      />
      <div className="mx-auto flex min-h-[60vh] max-w-[var(--container-max)] flex-col justify-center gap-6 px-4 py-24 sm:px-6 lg:px-8">
        <FadeInOnScroll className="inline-flex items-center gap-2 self-start text-xs font-medium uppercase tracking-[0.22em] text-[var(--accent-brand)]">
          <span
            aria-hidden
            className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent-brand)]"
          />
          {pageKicker} · {t("kicker")}
        </FadeInOnScroll>

        <h1 className="max-w-3xl text-balance font-semibold leading-[var(--leading-tight)] tracking-[var(--tracking-display)] text-[length:var(--text-h1)]">
          <RevealText>{pageTitle}</RevealText>
        </h1>

        <FadeInOnScroll
          delay={0.15}
          className="max-w-2xl text-pretty text-base leading-[var(--leading-relaxed)] text-foreground/70 md:text-lg"
        >
          {body ?? t("body")}
        </FadeInOnScroll>

        <FadeInOnScroll delay={0.3} className="pt-2">
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/">← {t("backToHome")}</Link>
          </Button>
        </FadeInOnScroll>
      </div>
    </section>
  );
}
