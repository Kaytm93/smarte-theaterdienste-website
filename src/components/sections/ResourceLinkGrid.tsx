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

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <article
            key={resource.title}
            className="flex h-full flex-col justify-between rounded-md border border-[var(--rule-strong)] bg-[var(--surface-elevated)] p-6 shadow-[var(--shadow-xs)]"
          >
            <div>
              <h3 className="font-serif text-2xl font-semibold leading-snug tracking-[var(--tracking-heading)]">
                {resource.title}
              </h3>
              <p className="mt-3 text-sm leading-[var(--leading-relaxed)] text-foreground/70">
                {resource.body}
              </p>
            </div>
            <Button asChild variant="outline" className="mt-6 self-start">
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
