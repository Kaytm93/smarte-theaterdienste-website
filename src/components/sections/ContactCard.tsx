import { getTranslations } from "next-intl/server";
import { Card, CardContent } from "@/components/ui/card";
import type { TeamMember } from "@/lib/content/loader";

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("");
}

function telHref(phone: string): string {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

export async function ContactCard({ member }: { member: TeamMember }) {
  const t = await getTranslations("team");

  return (
    <Card className="overflow-hidden border-border/60 bg-card/50 transition-colors hover:border-border">
      <div
        className="relative aspect-[4/5] w-full bg-muted"
        aria-label={t("portraitFallback")}
      >
        <span className="absolute inset-0 flex items-center justify-center text-4xl font-semibold tracking-tight text-foreground/30">
          {initials(member.name)}
        </span>
        <span className="absolute bottom-2 right-3 text-[10px] uppercase tracking-[0.18em] text-foreground/40">
          {t("photoCredit")}
        </span>
      </div>

      <CardContent className="space-y-3 p-5">
        <div>
          <p className="text-base font-semibold tracking-tight">
            {member.name}
          </p>
          <p className="text-sm text-foreground/65">{member.role}</p>
        </div>

        {member.quote ? (
          <p className="border-l-2 border-[var(--accent-brand)]/60 pl-3 text-sm italic text-foreground/70">
            „{member.quote}“
          </p>
        ) : null}

        <dl className="space-y-1 pt-1 text-sm">
          <div>
            <dt className="sr-only">{t("phoneLabel")}</dt>
            <dd>
              <a
                href={telHref(member.phone)}
                className="text-foreground/80 transition-colors hover:text-[var(--accent-brand)]"
              >
                {member.phone}
              </a>
            </dd>
          </div>
          {member.email ? (
            <div>
              <dt className="sr-only">{t("mailLabel")}</dt>
              <dd>
                <a
                  href={`mailto:${member.email}`}
                  className="break-all text-foreground/80 transition-colors hover:text-[var(--accent-brand)]"
                >
                  {member.email}
                </a>
              </dd>
            </div>
          ) : null}
        </dl>
      </CardContent>
    </Card>
  );
}
