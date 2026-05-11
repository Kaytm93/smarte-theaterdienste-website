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
        "relative isolate overflow-hidden border-b border-[var(--rule-strong)]",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-grid-pattern opacity-60"
      />
      <div className="mx-auto max-w-[var(--container-max)] px-4 pb-14 pt-14 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8 lg:pb-24 lg:pt-20">
        {kicker ? (
          <FadeInOnScroll className="editorial-kicker mb-4">
            {kicker}
          </FadeInOnScroll>
        ) : null}

        <div className="grid gap-8 border-t border-[var(--rule-strong)] pt-5 lg:grid-cols-[minmax(0,1fr)_minmax(19rem,0.42fr)] lg:gap-12">
          <h1 className="max-w-5xl text-balance font-serif text-[length:var(--text-h1)] font-semibold leading-[0.96] tracking-[var(--tracking-display)]">
            <RevealText>{title}</RevealText>
          </h1>

          {lead ? (
            <FadeInOnScroll
              delay={0.15}
              className="border-l-4 border-[var(--accent-secondary)] pl-5 text-pretty text-base leading-[var(--leading-relaxed)] text-foreground/76 sm:text-lg"
            >
              {lead}
            </FadeInOnScroll>
          ) : null}
        </div>
      </div>
    </section>
  );
}
