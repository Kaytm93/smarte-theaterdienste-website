import { FadeInOnScroll } from "@/components/animations/FadeInOnScroll";

type Frame = {
  caption: string;
  hue: number;
};

type Props = {
  eyebrow: string;
  heading: string;
  frames: Frame[];
};

export function ComicStrip({ eyebrow, heading, frames }: Props) {
  return (
    <section className="mx-auto max-w-[var(--container-max)] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 space-y-2">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--accent-brand)]">
          {eyebrow}
        </p>
        <h2 className="max-w-2xl text-balance font-semibold leading-[var(--leading-snug)] tracking-tight text-[length:var(--text-h2)]">
          {heading}
        </h2>
      </div>

      <FadeInOnScroll>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {frames.map((frame, i) => (
            <figure
              key={i}
              className="group flex flex-col gap-3 overflow-hidden rounded-lg border border-border/60 bg-card/50 p-4 transition-colors hover:border-border"
            >
              <div
                className="aspect-[4/3] rounded-md"
                style={{
                  background: `linear-gradient(135deg, oklch(0.92 0.04 ${frame.hue}), oklch(0.78 0.08 ${frame.hue}))`,
                }}
                aria-hidden
              />
              <figcaption className="flex items-baseline gap-2 text-sm text-foreground/80">
                <span className="font-mono text-xs text-foreground/40">
                  0{i + 1}
                </span>
                <span>{frame.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </FadeInOnScroll>
    </section>
  );
}
