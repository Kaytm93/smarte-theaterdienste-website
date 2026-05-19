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
    <Card className="group/use h-full rounded-md border border-[var(--rule-strong)] bg-[var(--surface-elevated)] shadow-[var(--shadow-xs)] ring-0 transition-[transform,box-shadow] duration-500 ease-[var(--ease-out)] hover:-translate-y-1 hover:shadow-[var(--shadow-md)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <CardContent className="space-y-5 p-7">
        <div className="flex items-center justify-between border-b border-[var(--rule-strong)] pb-4">
          <span className="text-xs font-semibold uppercase text-[var(--accent-brand-ink)]">
            Use Case
          </span>
          <Icon className="h-5 w-5 text-[var(--accent-brand-ink)]" aria-hidden />
        </div>
        <h3 className="font-serif text-2xl font-semibold leading-snug tracking-[var(--tracking-heading)]">
          {useCase.title}
        </h3>
        <p className="text-sm leading-[var(--leading-relaxed)] text-foreground/70">
          {useCase.body}
        </p>
      </CardContent>
    </Card>
  );
}
