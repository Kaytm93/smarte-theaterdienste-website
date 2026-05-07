import { Archive, Building2, Code2, Megaphone, Sparkles, Users } from "lucide-react";
import { FadeInOnScroll } from "@/components/animations/FadeInOnScroll";

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
  return (
    <FadeInOnScroll className="mx-auto max-w-[var(--container-max)] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mb-9 max-w-3xl space-y-3">
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
        {lead ? (
          <p className="text-base leading-[var(--leading-relaxed)] text-foreground/70 md:text-lg">
            {lead}
          </p>
        ) : null}
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => {
          const Icon = ICONS[feature.icon as keyof typeof ICONS] ?? Sparkles;
          return (
            <article
              key={feature.title}
              className="rounded-2xl border border-border/70 bg-[var(--surface-elevated)] p-6 shadow-[var(--shadow-xs)] transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-out)] hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-[var(--shadow-md)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-brand)]/10 text-[var(--accent-brand)] ring-1 ring-[var(--accent-brand)]/15">
                <Icon aria-hidden className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold leading-snug tracking-tight">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-[var(--leading-relaxed)] text-foreground/70">
                {feature.body}
              </p>
            </article>
          );
        })}
      </div>
    </FadeInOnScroll>
  );
}
