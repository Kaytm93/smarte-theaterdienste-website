import ReactMarkdown from "react-markdown";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FadeInOnScroll } from "@/components/animations/FadeInOnScroll";
import type { EventListItem } from "@/lib/supabase/queries";
import type { Locale } from "@/lib/i18n/routing";

type Props = {
  event: EventListItem;
  locale: Locale;
  registerLabel: string;
};

export function EventCard({ event, locale, registerLabel }: Props) {
  const start = new Date(event.startsAt);
  const day = start.toLocaleDateString(locale, { day: "2-digit" });
  const monthShort = start
    .toLocaleDateString(locale, { month: "short" })
    .replace(/\.$/, "");
  const dateLabel = start.toLocaleDateString(locale, {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const timeLabel = start.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });
  const isPast = event.status === "past" || event.status === "cancelled";

  return (
    <FadeInOnScroll className="h-full">
      <Card className="h-full rounded-2xl border border-border/70 bg-[var(--surface-elevated)] shadow-[var(--shadow-xs)] ring-0 transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-out)] hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-[var(--shadow-sm)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
        <CardContent className="flex h-full flex-col gap-5 p-6">
          <div className="flex items-start gap-4">
            <div
              aria-hidden
              className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl border border-[var(--accent-brand)]/20 bg-[var(--accent-brand)]/[0.07] text-[var(--accent-brand)]"
            >
              <span className="text-base font-semibold leading-none">{day}</span>
              <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.16em]">
                {monthShort}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <time
                dateTime={event.startsAt}
                className="text-xs font-medium uppercase tracking-[0.16em] text-foreground/55"
              >
                {dateLabel} · {timeLabel}
              </time>
              {event.location ? (
                <span className="text-sm text-foreground/70">{event.location}</span>
              ) : null}
            </div>
          </div>

          <h3 className="text-lg font-semibold leading-snug tracking-tight">
            {event.title}
          </h3>

          {event.descriptionMd ? (
            <div className="text-sm leading-[var(--leading-relaxed)] text-foreground/70 [&_a]:text-[var(--accent-brand)] [&_a]:underline [&_a]:underline-offset-4 [&_p]:my-2 [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5">
              <ReactMarkdown>{event.descriptionMd}</ReactMarkdown>
            </div>
          ) : null}

          {!isPast && event.registrationUrl ? (
            <div className="mt-auto pt-2">
              <Button asChild className="rounded-full">
                <a
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {registerLabel} →
                </a>
              </Button>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </FadeInOnScroll>
  );
}
