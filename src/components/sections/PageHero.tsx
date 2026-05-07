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
        "relative isolate overflow-hidden",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[var(--surface-1)] via-background to-background"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-12%] top-[-30%] -z-10 h-[55vh] w-[55vh] rounded-full blur-3xl"
        style={{ backgroundColor: "var(--glow-blue)" }}
      />
      <div className="mx-auto flex max-w-[var(--container-max)] flex-col gap-6 px-4 pb-14 pt-16 sm:px-6 sm:pb-20 sm:pt-24 lg:px-8 lg:pb-24 lg:pt-28">
        {kicker ? (
          <FadeInOnScroll className="inline-flex items-center gap-2 self-start text-xs font-medium uppercase tracking-[0.22em] text-[var(--accent-brand)]">
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent-brand)]"
            />
            {kicker}
          </FadeInOnScroll>
        ) : null}

        <h1 className="max-w-3xl text-balance font-semibold leading-[var(--leading-tight)] tracking-[var(--tracking-display)] text-[length:var(--text-h1)]">
          <RevealText>{title}</RevealText>
        </h1>

        {lead ? (
          <FadeInOnScroll
            delay={0.15}
            className="max-w-2xl text-pretty text-base leading-[var(--leading-relaxed)] text-foreground/70 sm:text-lg md:text-xl"
          >
            {lead}
          </FadeInOnScroll>
        ) : null}
      </div>
    </section>
  );
}
