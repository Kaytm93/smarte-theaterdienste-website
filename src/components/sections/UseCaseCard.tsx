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
    <Card className="h-full border-border/60 bg-card/50 transition-colors hover:border-border">
      <CardContent className="space-y-4 p-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent-brand)]/10 text-[var(--accent-brand)]">
          <Icon className="h-5 w-5" aria-hidden />
        </div>
        <h3 className="text-lg font-semibold tracking-tight">
          {useCase.title}
        </h3>
        <p className="text-sm leading-[var(--leading-relaxed)] text-foreground/70">
          {useCase.body}
        </p>
      </CardContent>
    </Card>
  );
}
