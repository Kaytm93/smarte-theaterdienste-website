import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Fragment } from "react";
import { Phone, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { TeamMember } from "@/lib/content/loader";

const PORTRAIT_CROP: Record<string, string> = {
  "sina-schmidt": "scale-[1.1] origin-[50%_45%]",
  "peter-retzlaff": "scale-[1.08] origin-[50%_44%]",
  "claudia-groenniger": "scale-[1.1] origin-[50%_43%]",
  "madeleine-scheuerpflug": "scale-[1.08] origin-[50%_42%]",
};

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

function EmailText({ email }: { email: string }) {
  return email.split(/([@.])/g).map((part, index) => (
    <Fragment key={`${part}-${index}`}>
      {part}
      {part === "@" || part === "." ? <wbr /> : null}
    </Fragment>
  ));
}

export async function ContactCard({
  member,
  eagerImage = false,
}: {
  member: TeamMember;
  eagerImage?: boolean;
}) {
  const t = await getTranslations("team");

  return (
    <Card className="flex h-full gap-0 overflow-hidden rounded-md border border-[var(--rule-strong)] bg-[var(--surface-elevated)] py-0 shadow-[var(--shadow-xs)] ring-0 transition-[transform,box-shadow] duration-500 ease-[var(--ease-out)] hover:-translate-y-1 hover:shadow-[var(--shadow-md)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <div
        className="relative aspect-[4/5] w-full shrink-0 overflow-hidden bg-gradient-to-br from-[var(--surface-1)] via-[var(--surface-2)] to-[var(--surface-1)]"
        aria-label={member.portrait ? undefined : t("portraitFallback")}
      >
        {member.portrait ? (
          <Image
            src={member.portrait}
            alt={`${member.name} — ${member.role}`}
            fill
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 280px"
            loading={eagerImage ? "eager" : "lazy"}
            className={`object-cover grayscale ${PORTRAIT_CROP[member.id] ?? "scale-[1.08]"}`}
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-5xl font-semibold text-foreground/20">
            {initials(member.name)}
          </span>
        )}
        <span className="absolute bottom-2 right-2 rounded-sm bg-background/85 px-1.5 py-0.5 text-[9px] font-semibold uppercase text-foreground/55 shadow-[var(--shadow-xs)]">
          {t("photoCredit")}
        </span>
      </div>

      <CardContent className="flex flex-1 flex-col space-y-4 border-t border-[var(--rule-strong)] p-6">
        <div>
          <p className="font-serif text-2xl font-semibold tracking-[var(--tracking-heading)]">
            {member.name}
          </p>
          <p className="text-sm text-foreground/65">{member.role}</p>
        </div>

        {member.quote ? (
          <p className="border-l-4 border-[var(--accent-secondary)] pl-3 font-serif text-base italic leading-relaxed text-foreground/74">
            „{member.quote}“
          </p>
        ) : null}

        <dl className="mt-auto space-y-2 pt-1 text-sm">
          <div className="grid grid-cols-[1rem_minmax(0,1fr)] items-center gap-2">
            <dt className="sr-only">{t("phoneLabel")}</dt>
            <Phone aria-hidden className="h-3.5 w-3.5 text-foreground/40" />
            <dd className="min-w-0">
              <a
                href={telHref(member.phone)}
                className="text-foreground/80 transition-colors hover:text-[var(--accent-brand)]"
              >
                {member.phone}
              </a>
            </dd>
          </div>
          {member.email ? (
            <div className="grid grid-cols-[1rem_minmax(0,1fr)] items-start gap-2">
              <dt className="sr-only">{t("mailLabel")}</dt>
              <Mail aria-hidden className="mt-0.5 h-3.5 w-3.5 text-foreground/40" />
              <dd className="min-w-0">
                <a
                  href={`mailto:${member.email}`}
                  className="text-[13px] leading-snug text-foreground/80 transition-colors [overflow-wrap:anywhere] hover:text-[var(--accent-brand)]"
                >
                  <EmailText email={member.email} />
                </a>
              </dd>
            </div>
          ) : null}
        </dl>
      </CardContent>
    </Card>
  );
}
