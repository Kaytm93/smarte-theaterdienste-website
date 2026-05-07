import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeInOnScroll } from "@/components/animations/FadeInOnScroll";

type ResourceLink = {
  title: string;
  body: string;
  href: string;
  label: string;
};

type Props = {
  eyebrow: string;
  heading: string;
  lead?: string;
  resources: ResourceLink[];
};

export function ResourceLinkGrid({ eyebrow, heading, lead, resources }: Props) {
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

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <article
            key={resource.title}
            className="flex h-full flex-col justify-between rounded-2xl border border-border/70 bg-[var(--surface-elevated)] p-6 shadow-[var(--shadow-xs)]"
          >
            <div>
              <h3 className="text-lg font-semibold leading-snug tracking-tight">
                {resource.title}
              </h3>
              <p className="mt-3 text-sm leading-[var(--leading-relaxed)] text-foreground/70">
                {resource.body}
              </p>
            </div>
            <Button asChild variant="outline" className="mt-6 self-start rounded-full">
              <a href={resource.href} target="_blank" rel="noopener noreferrer">
                {resource.label}
                <ExternalLink aria-hidden className="ml-1.5 h-3.5 w-3.5" />
              </a>
            </Button>
          </article>
        ))}
      </div>
    </FadeInOnScroll>
  );
}
