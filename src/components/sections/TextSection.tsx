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
        "mx-auto max-w-[var(--container-max)] px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-20",
        className
      )}
    >
      <div className="grid gap-8 border-t border-[var(--rule-strong)] pt-6 lg:grid-cols-[minmax(0,18rem)_1fr] lg:gap-16">
        <div className="space-y-3 lg:sticky lg:top-[calc(var(--header-height)+2rem)] lg:self-start">
          {eyebrow ? (
            <p className="editorial-kicker">{eyebrow}</p>
          ) : null}
          {heading ? (
            <h2 className="text-balance font-serif text-[length:var(--text-h2)] font-semibold leading-[var(--leading-snug)] tracking-[var(--tracking-heading)]">
              {heading}
            </h2>
          ) : null}
        </div>

        <div className="editorial-copy max-w-[66ch] space-y-5 text-base leading-[var(--leading-relaxed)] text-foreground/78 md:text-lg">
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
