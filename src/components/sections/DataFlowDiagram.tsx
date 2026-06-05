import { FadeInOnScroll } from "@/components/animations/FadeInOnScroll";
import { cn } from "@/lib/utils";

type OutputItem = {
  label: string;
  format?: string;
  highlight?: boolean;
};

type Stage = {
  step: string;
  heading: string;
  subheading?: string;
  items: Array<string | OutputItem>;
};

type Props = {
  eyebrow?: string;
  heading: string;
  lead?: string;
  stages: Stage[];
  caption?: string;
};

function ConnectorArrow() {
  return (
    <div
      aria-hidden
      className="flex items-center justify-center self-center py-1 md:py-0"
    >
      <svg
        viewBox="0 0 48 24"
        className="h-7 w-12 rotate-90 text-[var(--ink-muted)] md:h-8 md:w-16 md:rotate-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        focusable="false"
      >
        <path d="M2 12 H40" />
        <path d="M34 5 L42 12 L34 19" />
      </svg>
    </div>
  );
}

function StageCard({ stage }: { stage: Stage }) {
  return (
    <article className="flex h-full flex-col border border-[var(--rule-strong)] bg-[var(--surface-elevated)] p-5 sm:p-6">
      <header className="mb-4 border-b border-[var(--rule)] pb-3">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-brand-ink)]">
          {stage.step}
        </p>
        <h3 className="mt-1 font-serif text-xl font-semibold leading-snug tracking-[var(--tracking-heading)]">
          {stage.heading}
        </h3>
        {stage.subheading ? (
          <p className="mt-2 text-sm leading-[var(--leading-relaxed)] text-foreground/65">
            {stage.subheading}
          </p>
        ) : null}
      </header>

      <ul className="mt-1 flex flex-1 flex-col gap-2">
        {stage.items.map((item) => {
          if (typeof item === "string") {
            return (
              <li
                key={item}
                className="flex items-baseline gap-2 text-sm leading-[var(--leading-relaxed)] text-foreground/85"
              >
                <span
                  aria-hidden
                  className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--ink-muted)]"
                />
                <span>{item}</span>
              </li>
            );
          }
          return (
            <li
              key={item.label}
              className={cn(
                "flex flex-col gap-1 border-l-2 py-1.5 pl-3 transition-colors",
                item.highlight
                  ? "border-[var(--accent-brand)] bg-[color-mix(in_srgb,var(--accent-brand-pale)_45%,transparent)]"
                  : "border-[var(--rule)]"
              )}
            >
              <span className="text-sm font-semibold text-foreground">
                {item.label}
              </span>
              {item.format ? (
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/60">
                  {item.format}
                </span>
              ) : null}
            </li>
          );
        })}
      </ul>
    </article>
  );
}

export function DataFlowDiagram({
  eyebrow,
  heading,
  lead,
  stages,
  caption,
}: Props) {
  const gridColsClass =
    stages.length === 3
      ? "md:grid-cols-[1fr_auto_1fr_auto_1fr]"
      : stages.length === 2
        ? "md:grid-cols-[1fr_auto_1fr]"
        : undefined;

  return (
    <section className="border-y border-[var(--rule-strong)] bg-[var(--paper)]">
      <FadeInOnScroll className="mx-auto max-w-[var(--container-max)] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mb-10 grid gap-6 border-t border-[var(--rule-strong)] pt-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(18rem,0.45fr)] lg:items-end">
          <div className="space-y-3">
            {eyebrow ? <p className="editorial-kicker">{eyebrow}</p> : null}
            <h2 className="text-balance font-serif text-[length:var(--text-h2)] font-semibold leading-[var(--leading-snug)] tracking-[var(--tracking-heading)]">
              {heading}
            </h2>
          </div>
          {lead ? (
            <p className="border-l-4 border-[var(--accent-brand)] pl-5 text-base leading-[var(--leading-relaxed)] text-foreground/72 md:text-lg">
              {lead}
            </p>
          ) : null}
        </div>

        <div
          role="group"
          aria-label={heading}
          className={cn("grid gap-4 md:gap-2 lg:gap-4", gridColsClass)}
        >
          {stages.flatMap((stage, i) => {
            const nodes = [<StageCard key={stage.step} stage={stage} />];
            if (i < stages.length - 1) {
              nodes.push(<ConnectorArrow key={`arrow-${i}`} />);
            }
            return nodes;
          })}
        </div>

        {caption ? (
          <p className="mt-6 max-w-3xl text-xs leading-[var(--leading-relaxed)] text-foreground/55">
            {caption}
          </p>
        ) : null}
      </FadeInOnScroll>
    </section>
  );
}
