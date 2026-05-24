import { FadeInOnScroll } from "@/components/animations/FadeInOnScroll";

type Props = {
  eyebrow?: string;
  heading: string;
  caption?: string;
  mapUrl: string;
  title: string;
};

export function MapEmbed({ eyebrow, heading, caption, mapUrl, title }: Props) {
  return (
    <section className="border-y border-[var(--rule-strong)] bg-[var(--surface-1)]">
      <FadeInOnScroll className="mx-auto max-w-[var(--container-max)] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mb-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.45fr)] lg:items-end">
          <div className="space-y-3">
            {eyebrow ? <p className="editorial-kicker">{eyebrow}</p> : null}
            <h2 className="max-w-3xl text-balance font-serif text-[length:var(--text-h2)] font-semibold leading-[var(--leading-snug)] tracking-[var(--tracking-heading)]">
              {heading}
            </h2>
          </div>
          {caption ? (
            <p className="border-l-4 border-[var(--accent-brand)] pl-5 text-base leading-[var(--leading-relaxed)] text-foreground/72 md:text-lg">
              {caption}
            </p>
          ) : null}
        </div>

        <div className="relative overflow-hidden rounded-lg border border-[var(--rule-strong)] bg-[var(--surface-2)] shadow-[var(--shadow-md)]">
          <div className="relative aspect-[4/3] md:aspect-[16/9]">
            <iframe
              src={mapUrl}
              title={title}
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>
      </FadeInOnScroll>
    </section>
  );
}
