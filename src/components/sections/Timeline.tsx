import Image from "next/image";

import { FadeInOnScroll } from "@/components/animations/FadeInOnScroll";
import type { EventListItem } from "@/lib/supabase/queries";
import type { Locale } from "@/lib/i18n/routing";

export type TimelineLabels = {
  eyebrow: string;
  heading: string;
  lead?: string;
  locationLabel: string;
  sourceLabel: string;
  geniallyHeading: string;
  geniallyCaption?: string;
  geniallyTitle: string;
};

function formatDateRange(
  startsAt: string,
  endsAt: string | null,
  locale: Locale,
): string {
  const fmt = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const start = new Date(startsAt);
  if (!endsAt) return fmt.format(start);
  const end = new Date(endsAt);
  if (start.toDateString() === end.toDateString()) return fmt.format(start);
  return `${fmt.format(start)} – ${fmt.format(end)}`;
}

type Props = {
  events: EventListItem[];
  labels: TimelineLabels;
  locale: Locale;
  geniallyUrl: string;
};

export function Timeline({ events, labels, locale, geniallyUrl }: Props) {
  return (
    <section id="zeitstrahl" className="border-t border-[var(--rule-strong)]">
      <FadeInOnScroll className="mx-auto max-w-[var(--container-max)] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mb-10 space-y-3">
          <p className="editorial-kicker">{labels.eyebrow}</p>
          <h2 className="max-w-3xl text-balance font-serif text-[length:var(--text-h2)] font-semibold leading-[var(--leading-snug)] tracking-[var(--tracking-heading)]">
            {labels.heading}
          </h2>
          {labels.lead ? (
            <p className="max-w-2xl text-pretty text-base leading-[var(--leading-relaxed)] text-foreground/72 md:text-lg">
              {labels.lead}
            </p>
          ) : null}
        </div>

        {events.length > 0 ? (
          <ol className="relative m-0 list-none space-y-10 border-l-2 border-[var(--rule-strong)] p-0 pl-6 sm:pl-8">
            {events.map((event) => (
              <li key={event.slug} className="relative">
                <span
                  aria-hidden
                  className="absolute -left-[1.6rem] top-1.5 h-3 w-3 rounded-full border-2 border-[var(--accent-brand)] bg-background sm:-left-[2.1rem]"
                />
                <time className="font-mono text-xs font-semibold uppercase tracking-[0.08em] text-[var(--accent-brand-ink)]">
                  {formatDateRange(event.startsAt, event.endsAt, locale)}
                </time>
                <h3 className="mt-1 font-serif text-2xl font-semibold leading-snug tracking-[var(--tracking-heading)]">
                  {event.title}
                </h3>
                {event.location ? (
                  <p className="mt-1 text-sm text-foreground/60">
                    {labels.locationLabel}: {event.location}
                  </p>
                ) : null}
                {event.descriptionMd ? (
                  <p className="mt-3 max-w-[60ch] text-pretty text-base leading-[var(--leading-relaxed)] text-foreground/78">
                    {event.descriptionMd}
                  </p>
                ) : null}
                {event.imageUrl ? (
                  <figure className="mt-4 max-w-md overflow-hidden rounded-lg border border-[var(--rule-strong)] bg-foreground/[0.04] shadow-[var(--shadow-xs)]">
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      width={640}
                      height={360}
                      sizes="(max-width: 640px) 100vw, 28rem"
                      className="block aspect-[16/9] w-full object-cover"
                    />
                  </figure>
                ) : null}
                {event.registrationUrl ? (
                  <a
                    href={event.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm font-semibold text-[var(--accent-brand-ink)] underline-offset-4 hover:underline"
                  >
                    {labels.sourceLabel} →
                  </a>
                ) : null}
              </li>
            ))}
          </ol>
        ) : null}

        <div className="mt-14 border-t border-[var(--rule)] pt-10">
          <h3 className="mb-2 font-serif text-2xl font-semibold leading-snug tracking-[var(--tracking-heading)]">
            {labels.geniallyHeading}
          </h3>
          {labels.geniallyCaption ? (
            <p className="mb-6 max-w-2xl text-pretty text-base leading-[var(--leading-relaxed)] text-foreground/72">
              {labels.geniallyCaption}
            </p>
          ) : null}
          <div className="relative overflow-hidden rounded-lg border border-[var(--rule-strong)] bg-black shadow-[var(--shadow-md)]">
            <div className="relative aspect-video">
              <iframe
                src={geniallyUrl}
                title={labels.geniallyTitle}
                loading="lazy"
                allow="fullscreen"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
        </div>
      </FadeInOnScroll>
    </section>
  );
}
