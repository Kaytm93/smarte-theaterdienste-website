import { Card, CardContent } from "@/components/ui/card";

type Props = {
  step: number;
  title: string;
  body: string;
};

export function StepCard({ step, title, body }: Props) {
  const stepLabel = step.toString().padStart(2, "0");
  return (
    <Card className="h-full rounded-md border border-[var(--rule-strong)] bg-[var(--surface-elevated)] shadow-[var(--shadow-xs)] ring-0 transition-[transform,box-shadow] duration-500 ease-[var(--ease-out)] hover:-translate-y-1 hover:shadow-[var(--shadow-md)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <CardContent className="space-y-5 p-7">
        <div className="flex items-baseline justify-between border-b border-[var(--rule-strong)] pb-4">
          <span className="font-mono text-xs font-semibold uppercase text-[var(--accent-brand)]">
            Step
          </span>
          <span className="font-serif text-4xl font-semibold text-[var(--accent-secondary)]">
            {stepLabel}
          </span>
        </div>
        <h3 className="font-serif text-2xl font-semibold leading-snug tracking-[var(--tracking-heading)]">{title}</h3>
        <p className="text-sm leading-[var(--leading-relaxed)] text-foreground/70">
          {body}
        </p>
      </CardContent>
    </Card>
  );
}
