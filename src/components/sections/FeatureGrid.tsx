import { Archive, Building2, Code2, Megaphone, Sparkles, Users } from "lucide-react";
import { FadeInOnScroll } from "@/components/animations/FadeInOnScroll";
import { cn } from "@/lib/utils";

const ICONS = {
  archive: Archive,
  building: Building2,
  code: Code2,
  megaphone: Megaphone,
  sparkles: Sparkles,
  users: Users,
} as const;

type Feature = {
  icon: string;
  title: string;
  body: string;
};

type Props = {
  eyebrow: string;
  heading: string;
  lead?: string;
  features: Feature[];
};

export function FeatureGrid({ eyebrow, heading, lead, features }: Props) {
  const largeGridClass =
    features.length === 3
      ? "lg:grid-cols-3"
      : features.length === 2
        ? "lg:grid-cols-2"
        : "lg:grid-cols-4";

  const largeBorderClass =
    features.length === 3
      ? "lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0"
      : features.length === 4
        ? "lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(4n)]:border-r-0"
        : "";

  return (
    <FadeInOnScroll className="mx-auto max-w-[var(--container-max)] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mb-9 grid gap-6 border-t border-[var(--rule-strong)] pt-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(18rem,0.45fr)]">
        <div className="space-y-3">
          <p className="editorial-kicker">{eyebrow}</p>
          <h2 className="text-balance font-serif text-[length:var(--text-h2)] font-semibold leading-[var(--leading-snug)] tracking-[var(--tracking-heading)]">
            {heading}
          </h2>
        </div>
        {lead ? (
          <p className="border-l-4 border-[var(--accent-secondary)] pl-5 text-base leading-[var(--leading-relaxed)] text-foreground/72 md:text-lg">
            {lead}
          </p>
        ) : null}
      </div>

      <div
        className={cn(
          "grid border-t border-[var(--rule-strong)] md:grid-cols-2",
          largeGridClass
        )}
      >
        {features.map((feature, index) => {
          const Icon = ICONS[feature.icon as keyof typeof ICONS] ?? Sparkles;
          return (
            <article
              key={feature.title}
              className={cn(
                "group min-h-64 border-b border-border p-5 transition-colors duration-300 hover:bg-[var(--surface-1)] md:border-r md:[&:nth-child(2n)]:border-r-0",
                largeBorderClass
              )}
            >
              <div className="mb-8 flex items-center justify-between gap-4">
                <span className="font-mono text-xs font-semibold uppercase text-foreground/50">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Icon aria-hidden className="h-5 w-5 text-[var(--accent-brand)] transition-transform duration-300 group-hover:-translate-y-0.5 motion-reduce:transition-none" />
              </div>
              <h3 className="font-serif text-2xl font-semibold leading-snug tracking-[var(--tracking-heading)]">
                {feature.title}
              </h3>
              <p className="mt-4 text-sm leading-[var(--leading-relaxed)] text-foreground/72">
                {feature.body}
              </p>
            </article>
          );
        })}
      </div>
    </FadeInOnScroll>
  );
}
