import { FadeInOnScroll } from "@/components/animations/FadeInOnScroll";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  heading?: string;
  body: string | string[];
  className?: string;
};

export function TextSection({ eyebrow, heading, body, className }: Props) {
  const paragraphs = Array.isArray(body) ? body : [body];

  return (
    <FadeInOnScroll
      className={cn(
        "mx-auto max-w-[var(--container-max)] px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24",
        className
      )}
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-20">
        <div className="space-y-3 lg:sticky lg:top-[calc(var(--header-height)+2rem)] lg:self-start">
          {eyebrow ? (
            <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-[var(--accent-brand)]">
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent-brand)]"
              />
              {eyebrow}
            </p>
          ) : null}
          {heading ? (
            <h2 className="text-balance font-semibold leading-[var(--leading-snug)] tracking-[var(--tracking-heading)] text-[length:var(--text-h2)]">
              {heading}
            </h2>
          ) : null}
        </div>

        <div className="max-w-prose space-y-5 text-base leading-[var(--leading-relaxed)] text-foreground/75 md:text-lg">
          {paragraphs.map((paragraph, i) => (
            <p key={i} className="text-pretty">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </FadeInOnScroll>
  );
}
