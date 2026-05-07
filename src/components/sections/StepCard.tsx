import { Card, CardContent } from "@/components/ui/card";

type Props = {
  step: number;
  title: string;
  body: string;
};

export function StepCard({ step, title, body }: Props) {
  const stepLabel = step.toString().padStart(2, "0");
  return (
    <Card className="h-full rounded-2xl border border-border/70 bg-[var(--surface-elevated)] shadow-[var(--shadow-xs)] ring-0 transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-out)] hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-[var(--shadow-md)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <CardContent className="space-y-5 p-7">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-[var(--accent-brand)]">
            Step
          </span>
          <span className="font-mono text-2xl font-semibold tracking-tight text-foreground">
            {stepLabel}
          </span>
        </div>
        <h3 className="text-lg font-semibold leading-snug tracking-tight">{title}</h3>
        <p className="text-sm leading-[var(--leading-relaxed)] text-foreground/70">
          {body}
        </p>
      </CardContent>
    </Card>
  );
}
