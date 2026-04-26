import { FadeInOnScroll } from "@/components/animations/FadeInOnScroll";
import { RevealText } from "@/components/animations/RevealText";
import { cn } from "@/lib/utils";

type Props = {
  kicker?: string;
  title: string;
  lead?: string;
  className?: string;
};

export function PageHero({ kicker, title, lead, className }: Props) {
  return (
    <section
      className={cn(
        "mx-auto flex max-w-[var(--container-max)] flex-col gap-6 px-4 pt-16 pb-12 sm:px-6 sm:pt-24 lg:px-8",
        className
      )}
    >
      {kicker ? (
        <FadeInOnScroll className="text-xs font-medium uppercase tracking-[0.22em] text-foreground/55">
          {kicker}
        </FadeInOnScroll>
      ) : null}

      <h1 className="max-w-3xl text-balance font-semibold leading-[var(--leading-tight)] tracking-tight text-[length:var(--text-h1)]">
        <RevealText>{title}</RevealText>
      </h1>

      {lead ? (
        <FadeInOnScroll
          delay={0.15}
          className="max-w-2xl text-pretty text-base leading-[var(--leading-relaxed)] text-foreground/75 md:text-lg"
        >
          {lead}
        </FadeInOnScroll>
      ) : null}
    </section>
  );
}
