import Image from "next/image";
import { FadeInOnScroll } from "@/components/animations/FadeInOnScroll";

type NetworkSegment = {
  value: string;
  label: string;
};

type Props = {
  eyebrow: string;
  heading: string;
  lead: string;
  statValue: string;
  statLabel: string;
  image: string;
  imageAlt: string;
  segments: NetworkSegment[];
};

export function NetworkMapSection({
  eyebrow,
  heading,
  lead,
  statValue,
  statLabel,
  image,
  imageAlt,
  segments,
}: Props) {
  return (
    <FadeInOnScroll className="mx-auto max-w-[var(--container-max)] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-16">
        <div className="space-y-7">
          <div className="space-y-3">
            <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-[var(--accent-brand)]">
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent-brand)]"
              />
              {eyebrow}
            </p>
            <h2 className="text-balance font-semibold leading-[var(--leading-snug)] tracking-[var(--tracking-heading)] text-[length:var(--text-h2)]">
              {heading}
            </h2>
            <p className="max-w-prose text-base leading-[var(--leading-relaxed)] text-foreground/70 md:text-lg">
              {lead}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-[auto_1fr] sm:items-end">
            <p className="font-mono text-6xl font-semibold leading-none tracking-tight text-[var(--accent-brand)] sm:text-7xl">
              {statValue}
            </p>
            <p className="max-w-sm text-sm leading-[var(--leading-relaxed)] text-foreground/65">
              {statLabel}
            </p>
          </div>

          <dl className="grid gap-3 sm:grid-cols-2">
            {segments.map((segment) => (
              <div
                key={`${segment.value}-${segment.label}`}
                className="rounded-2xl border border-border/70 bg-[var(--surface-elevated)] p-4 shadow-[var(--shadow-xs)]"
              >
                <dt className="text-xs uppercase tracking-[0.18em] text-foreground/45">
                  {segment.label}
                </dt>
                <dd className="mt-2 font-mono text-2xl font-semibold text-foreground">
                  {segment.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className="overflow-hidden rounded-2xl border border-border/70 bg-[var(--surface-elevated)] shadow-[var(--shadow-md)]">
          <Image
            src={image}
            alt={imageAlt}
            width={2550}
            height={1514}
            sizes="(max-width: 1024px) 92vw, 640px"
            className="h-auto w-full"
          />
        </figure>
      </div>
    </FadeInOnScroll>
  );
}
