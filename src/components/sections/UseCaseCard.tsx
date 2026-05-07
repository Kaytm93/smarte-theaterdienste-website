import { Megaphone, Archive, Briefcase, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { UseCase } from "@/lib/content/loader";

const ICONS = {
  megaphone: Megaphone,
  archive: Archive,
  briefcase: Briefcase,
} as const;

export function UseCaseCard({ useCase }: { useCase: UseCase }) {
  const Icon = ICONS[useCase.icon as keyof typeof ICONS] ?? Sparkles;

  return (
    <Card className="group/use h-full rounded-2xl border border-border/70 bg-[var(--surface-elevated)] shadow-[var(--shadow-xs)] ring-0 transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-out)] hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-[var(--shadow-md)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <CardContent className="space-y-5 p-7">
        <div className="relative inline-flex">
          <span
            aria-hidden
            className="absolute inset-0 -z-10 rounded-2xl bg-[var(--accent-brand)]/15 blur-md transition-opacity duration-500 group-hover/use:opacity-100 motion-reduce:transition-none"
            style={{ opacity: 0.5 }}
          />
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-brand)]/10 text-[var(--accent-brand)] ring-1 ring-[var(--accent-brand)]/15">
            <Icon className="h-5 w-5" aria-hidden />
          </span>
        </div>
        <h3 className="text-lg font-semibold leading-snug tracking-tight">
          {useCase.title}
        </h3>
        <p className="text-sm leading-[var(--leading-relaxed)] text-foreground/70">
          {useCase.body}
        </p>
      </CardContent>
    </Card>
  );
}
