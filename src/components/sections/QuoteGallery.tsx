import { FadeInOnScroll } from "@/components/animations/FadeInOnScroll";

type Quote = {
  body: string;
  source: string;
  role?: string;
};

type Props = {
  eyebrow: string;
  heading: string;
  quotes: Quote[];
};

export function QuoteGallery({ eyebrow, heading, quotes }: Props) {
  return (
    <section className="border-t border-[var(--rule-strong)]">
      <FadeInOnScroll className="mx-auto max-w-[var(--container-max)] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mb-10 space-y-3">
          <p className="editorial-kicker">{eyebrow}</p>
          <h2 className="max-w-3xl text-balance text-[length:var(--text-h2)] font-semibold leading-[var(--leading-snug)] tracking-[var(--tracking-heading)]">
            {heading}
          </h2>
        </div>

        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {quotes.map((quote, index) => (
            <li
              key={`${quote.source}-${index}`}
              className="relative flex h-full flex-col justify-between rounded-md border border-[var(--rule-strong)] bg-[var(--surface-elevated)] p-6 shadow-[var(--shadow-xs)]"
            >
              <span
                aria-hidden
                className="absolute left-5 top-0 -translate-y-1/2 bg-[var(--surface-elevated)] px-2 text-3xl leading-none text-[var(--accent-brand)]"
              >
                &ldquo;
              </span>
              <blockquote className="text-pretty text-base italic leading-[var(--leading-relaxed)] text-foreground/85 md:text-lg">
                {quote.body}
              </blockquote>
              <footer className="mt-6 border-t border-[var(--rule)] pt-3 text-xs uppercase tracking-[0.06em] text-foreground/65">
                <span className="font-semibold text-foreground">{quote.source}</span>
                {quote.role ? <span> · {quote.role}</span> : null}
              </footer>
            </li>
          ))}
        </ul>
      </FadeInOnScroll>
    </section>
  );
}
