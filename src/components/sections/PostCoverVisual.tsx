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
      <div aria-hidden className="absolute inset-0 bg-grid-pattern opacity-60" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-3 bg-[var(--accent-secondary)]" />

      <div className="relative z-10 flex size-full flex-col justify-between p-5 sm:p-7">
        <div className="inline-flex w-fit items-center gap-2 border border-[var(--rule-strong)] bg-background/85 px-3 py-1.5 text-[10px] font-semibold uppercase text-foreground/65 shadow-[var(--shadow-xs)]">
          <CalendarDays aria-hidden className="size-3" />
          <span>{eyebrow ?? "Update"}</span>
        </div>

        <p
          className={cn(
            "max-w-[15rem] text-balance font-serif font-semibold leading-[var(--leading-snug)] tracking-[var(--tracking-heading)]",
            isArticle ? "text-3xl sm:text-5xl" : "text-2xl"
          )}
        >
          {title}
        </p>

        <div className="flex items-center justify-between gap-3 border-t border-[var(--rule-strong)] pt-3 text-[11px] font-semibold uppercase text-foreground/55">
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
