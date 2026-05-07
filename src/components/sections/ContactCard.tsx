import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Phone, Mail } from "lucide-react";
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
    <Card className="overflow-hidden rounded-2xl border border-border/70 bg-[var(--surface-elevated)] shadow-[var(--shadow-xs)] ring-0 transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-out)] hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-[var(--shadow-md)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <div
        className="relative aspect-[4/5] w-full bg-gradient-to-br from-[var(--surface-1)] via-[var(--surface-2)] to-[var(--surface-1)]"
        aria-label={member.portrait ? undefined : t("portraitFallback")}
      >
        {member.portrait ? (
          <Image
            src={member.portrait}
            alt={`${member.name} — ${member.role}`}
            fill
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 280px"
            className="object-cover grayscale"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-5xl font-semibold tracking-tight text-foreground/20">
            {initials(member.name)}
          </span>
        )}
        <span className="absolute bottom-2 right-3 text-[10px] uppercase tracking-[0.18em] text-foreground/40">
          {t("photoCredit")}
        </span>
      </div>

      <CardContent className="space-y-4 p-6">
        <div>
          <p className="text-base font-semibold tracking-tight">
            {member.name}
          </p>
          <p className="text-sm text-foreground/65">{member.role}</p>
        </div>

        {member.quote ? (
          <p className="border-l-2 border-[var(--accent-secondary)]/60 pl-3 text-sm italic text-foreground/70">
            „{member.quote}“
          </p>
        ) : null}

        <dl className="space-y-2 pt-1 text-sm">
          <div className="flex items-center gap-2">
            <dt className="sr-only">{t("phoneLabel")}</dt>
            <Phone aria-hidden className="h-3.5 w-3.5 text-foreground/40" />
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
            <div className="flex items-center gap-2">
              <dt className="sr-only">{t("mailLabel")}</dt>
              <Mail aria-hidden className="h-3.5 w-3.5 text-foreground/40" />
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
