import { ComicStripFrames } from "./ComicStripFrames";

type Frame = {
  image: string;
  alt: string;
  title: string;
  caption: string;
};

type Props = {
  eyebrow: string;
  heading: string;
  frames: Frame[];
};

export function ComicStrip({ eyebrow, heading, frames }: Props) {
  return (
    <section className="relative isolate border-y border-[var(--rule-strong)] bg-[var(--surface-1)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-grid-pattern opacity-45"
      />
      <div className="mx-auto max-w-[var(--container-max)] px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="mb-10 grid gap-4 border-y border-[var(--rule-strong)] py-4 sm:mb-14 lg:grid-cols-[minmax(0,0.35fr)_1fr] lg:items-end">
          <p className="editorial-kicker">{eyebrow}</p>
          <h2 className="max-w-4xl text-balance font-serif text-[length:var(--text-h2)] font-semibold leading-[var(--leading-snug)] tracking-[var(--tracking-heading)]">
            {heading}
          </h2>
        </div>

        <ComicStripFrames frames={frames} />
      </div>
    </section>
  );
}
