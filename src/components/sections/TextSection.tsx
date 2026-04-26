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
        "mx-auto max-w-[var(--container-max)] px-4 py-10 sm:px-6 lg:px-8",
        className
      )}
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,18rem)_1fr] lg:gap-16">
        <div className="space-y-2">
          {eyebrow ? (
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--accent-brand)]">
              {eyebrow}
            </p>
          ) : null}
          {heading ? (
            <h2 className="text-balance font-semibold leading-[var(--leading-snug)] tracking-tight text-[length:var(--text-h2)]">
              {heading}
            </h2>
          ) : null}
        </div>

        <div className="max-w-prose space-y-4 text-base leading-[var(--leading-relaxed)] text-foreground/80 md:text-lg">
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
