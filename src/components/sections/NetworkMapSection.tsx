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
      <div className="grid gap-10 border-y border-[var(--rule-strong)] py-6 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-start lg:gap-12">
        <div className="space-y-7">
          <div className="space-y-3">
            <p className="editorial-kicker">{eyebrow}</p>
            <h2 className="text-balance font-serif text-[length:var(--text-h2)] font-semibold leading-[var(--leading-snug)] tracking-[var(--tracking-heading)]">
              {heading}
            </h2>
            <p className="max-w-prose text-base leading-[var(--leading-relaxed)] text-foreground/72 md:text-lg">
              {lead}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-[auto_1fr] sm:items-end">
            <p className="font-serif text-7xl font-semibold leading-none text-[var(--accent-secondary)] sm:text-8xl">
              {statValue}
            </p>
            <p className="max-w-sm border-l border-[var(--rule-strong)] pl-4 text-sm leading-[var(--leading-relaxed)] text-foreground/68">
              {statLabel}
            </p>
          </div>

          <dl className="grid border-t border-[var(--rule-strong)] sm:grid-cols-2">
            {segments.map((segment) => (
              <div
                key={`${segment.value}-${segment.label}`}
                className="border-b border-border p-4 sm:border-r sm:[&:nth-child(2n)]:border-r-0"
              >
                <dt className="text-xs font-semibold uppercase text-foreground/48">
                  {segment.label}
                </dt>
                <dd className="mt-2 font-serif text-3xl font-semibold text-foreground">
                  {segment.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className="paper-panel overflow-hidden p-3">
          <Image
            src={image}
            alt={imageAlt}
            width={2550}
            height={1514}
            sizes="(max-width: 1024px) 92vw, 640px"
            className="h-auto w-full"
          />
          <figcaption className="border-t border-[var(--rule-strong)] pt-3 text-xs font-semibold uppercase text-foreground/55">
            DACH-Netzwerk · Datenraum Kultur
          </figcaption>
        </figure>
      </div>
    </FadeInOnScroll>
  );
}
