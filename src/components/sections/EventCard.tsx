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
      <Card className="h-full border-border/60 bg-card/50">
        <CardContent className="flex h-full flex-col gap-4 p-6">
          <div className="flex flex-col gap-1">
            <time
              dateTime={event.startsAt}
              className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--accent-brand)]"
            >
              {dateLabel} · {timeLabel}
            </time>
            {event.location ? (
              <span className="text-xs text-foreground/55">{event.location}</span>
            ) : null}
          </div>

          <h3 className="text-lg font-semibold leading-tight tracking-tight">
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
