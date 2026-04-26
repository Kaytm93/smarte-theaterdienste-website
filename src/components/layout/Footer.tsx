import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";

const PARTNER_LOGOS = [
  { key: "buehnenverein", src: "/logos/buehnenverein.svg" },
  { key: "akademie", src: "/logos/akademie.svg" },
  { key: "fraunhofer", src: "/logos/fraunhofer.svg" },
  { key: "acatech", src: "/logos/acatech.svg" },
  { key: "nfdi4culture", src: "/logos/nfdi4culture.svg" },
  { key: "bkm", src: "/logos/bkm.svg" },
] as const;

export async function Footer() {
  const t = await getTranslations("footer");
  const tMeta = await getTranslations("meta");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto grid max-w-[var(--container-max)] gap-12 px-4 py-16 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="space-y-3">
          <p className="text-sm font-semibold tracking-tight">
            {tMeta("siteName")}
          </p>
          <p className="max-w-sm text-sm text-foreground/65 leading-relaxed">
            {t("rights")}
          </p>
        </div>

        <div className="space-y-3 lg:col-span-1">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/55">
            {t("supportedBy")}
          </p>
          <ul className="grid grid-cols-3 gap-x-4 gap-y-3">
            {PARTNER_LOGOS.map((logo) => (
              <li
                key={logo.key}
                className="flex h-10 items-center justify-start text-xs text-foreground/55"
                aria-label={t(`logoAlt.${logo.key}`)}
                title={t(`logoAlt.${logo.key}`)}
              >
                {/* Placeholder bis SVGs in M3 geliefert werden.
                    `<img>` mit graceful 404, kein next/image (Optimize ohne File). */}
                <span className="block truncate">
                  {t(`logoAlt.${logo.key}`)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3 text-sm text-foreground/65 lg:items-end">
          <Link
            href="/impressum"
            className="transition-colors hover:text-foreground"
          >
            {t("imprint")}
          </Link>
          <Link
            href="/datenschutz"
            className="transition-colors hover:text-foreground"
          >
            {t("privacy")}
          </Link>
          <p className="mt-4 text-xs text-foreground/50">© {year}</p>
        </div>
      </div>
    </footer>
  );
}
