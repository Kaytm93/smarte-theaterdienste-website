import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";

const PARTNER_LOGOS = [
  { key: "buehnenverein", src: "/logos/buehnenverein.png", aspect: "wide" as const },
  { key: "akademie", src: "/logos/akademie.png", aspect: "wide" as const },
  { key: "fraunhofer", src: "/logos/fraunhofer.png", aspect: "wide" as const },
  { key: "acatech", src: "/logos/acatech.png", aspect: "wide" as const },
  { key: "nfdi4culture", src: "/logos/nfdi4culture.png", aspect: "square" as const },
  { key: "bkm", src: "/logos/bkm.png", aspect: "wide" as const },
] as const;

export async function Footer() {
  const t = await getTranslations("footer");
  const tMeta = await getTranslations("meta");
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/60 bg-[var(--surface-1)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent"
      />

      <div className="mx-auto max-w-[var(--container-max)] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr_0.8fr]">
          <div className="space-y-3">
            <p className="text-sm font-semibold tracking-tight">
              {tMeta("siteName")}
            </p>
            <p className="max-w-sm text-sm text-foreground/65 leading-[var(--leading-relaxed)]">
              {t("rights")}
            </p>
          </div>

          <div className="space-y-5">
            <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-foreground/65">
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent-brand)]"
              />
              {t("supportedBy")}
            </p>
            <ul className="grid grid-cols-3 items-center gap-x-6 gap-y-6 sm:grid-cols-6">
              {PARTNER_LOGOS.map((logo) => (
                <li
                  key={logo.key}
                  className="relative flex h-12 items-center justify-center"
                  aria-label={t(`logoAlt.${logo.key}`)}
                >
                  <span
                    className="relative block h-full w-full opacity-70 transition-opacity duration-300 hover:opacity-100"
                    title={t(`logoAlt.${logo.key}`)}
                  >
                    <Image
                      src={logo.src}
                      alt={t(`logoAlt.${logo.key}`)}
                      fill
                      sizes="(max-width: 640px) 30vw, 120px"
                      className="object-contain object-center"
                    />
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
            <p className="mt-4 text-xs text-foreground/65">© {year}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
