import { CalendarDays, Network } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  eyebrow?: string | null;
  variant?: "card" | "article";
  className?: string;
};

export function PostCoverVisual({
  title,
  eyebrow,
  variant = "card",
  className,
}: Props) {
  const isArticle = variant === "article";

  return (
    <div
      aria-hidden
      className={cn(
        "relative flex size-full min-h-full overflow-hidden bg-[var(--surface-elevated)] text-foreground",
        className
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-grid-pattern opacity-55"
      />
      <div
        aria-hidden
        className="absolute -right-16 -top-16 size-48 rounded-full blur-3xl sm:size-64"
        style={{ backgroundColor: "var(--glow-blue)" }}
      />
      <div
        aria-hidden
        className="absolute -bottom-20 -left-12 size-48 rounded-full blur-3xl sm:size-60"
        style={{ backgroundColor: "var(--glow-magenta)" }}
      />

      <div className="relative z-10 flex size-full flex-col justify-between p-5 sm:p-7">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-foreground/10 bg-background/70 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-foreground/65 shadow-[var(--shadow-xs)] backdrop-blur">
          <CalendarDays aria-hidden className="size-3" />
          <span>{eyebrow ?? "Update"}</span>
        </div>

        <p
          className={cn(
            "max-w-[15rem] text-balance font-semibold leading-[var(--leading-snug)] tracking-tight",
            isArticle ? "text-2xl sm:text-4xl" : "text-lg sm:text-xl"
          )}
        >
          {title}
        </p>

        <div className="flex items-center justify-between gap-3 text-[11px] font-medium uppercase tracking-[0.18em] text-foreground/55">
          <span className="inline-flex items-center gap-1.5">
            <Network aria-hidden className="size-3.5 text-[var(--accent-brand)]" />
            ORIF
          </span>
          <span>Use Case 03</span>
        </div>
      </div>
    </div>
  );
}
