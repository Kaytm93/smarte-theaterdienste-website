import { Card, CardContent } from "@/components/ui/card";

type Props = {
  step: number;
  title: string;
  body: string;
};

export function StepCard({ step, title, body }: Props) {
  return (
    <Card className="h-full border-border/60 bg-card/50">
      <CardContent className="space-y-4 p-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-brand)] text-sm font-semibold text-[var(--accent-brand-foreground)]">
          {step}
        </div>
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        <p className="text-sm leading-[var(--leading-relaxed)] text-foreground/70">
          {body}
        </p>
      </CardContent>
    </Card>
  );
}
