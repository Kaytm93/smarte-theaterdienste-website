import { ComicStripFrames } from "./ComicStripFrames";

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

      <ComicStripFrames frames={frames} />
    </section>
  );
}
