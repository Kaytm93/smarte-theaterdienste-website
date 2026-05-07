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
    <section className="relative isolate">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-1/2 bg-gradient-to-b from-[var(--surface-1)] to-transparent"
      />
      <div className="mx-auto max-w-[var(--container-max)] px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="mb-10 flex flex-col gap-3 sm:mb-14">
          <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-[var(--accent-secondary)]">
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent-secondary)]"
            />
            {eyebrow}
          </p>
          <h2 className="max-w-3xl text-balance font-semibold leading-[var(--leading-snug)] tracking-[var(--tracking-heading)] text-[length:var(--text-h2)]">
            {heading}
          </h2>
        </div>

        <ComicStripFrames frames={frames} />
      </div>
    </section>
  );
}
