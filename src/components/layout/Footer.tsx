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

const FOOTER_NAV = [
  { href: "/projekt", key: "project" },
  { href: "/beteiligung", key: "participation" },
  { href: "/blog", key: "blog" },
  { href: "/termine", key: "events" },
  { href: "/faq", key: "faq" },
  { href: "/ansprechpersonen", key: "contact" },
] as const;

export async function Footer() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const tMeta = await getTranslations("meta");
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[var(--rule-strong)] bg-[var(--surface-1)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-35"
      />

      <div className="relative mx-auto max-w-[var(--container-max)] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 border-y border-[var(--rule-strong)] py-3 text-center font-serif text-4xl font-semibold leading-none sm:text-5xl">
          {tMeta("siteName")}
        </div>
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.8fr_1.8fr_0.7fr]">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase text-[var(--accent-secondary)]">
              {tMeta("siteName")}
            </p>
            <p className="max-w-sm text-sm text-foreground/65 leading-[var(--leading-relaxed)]">
              {t("rights")}
            </p>
          </div>

          <nav aria-label={t("siteMap")} className="space-y-4">
            <p className="text-xs font-semibold uppercase text-foreground/65">
              {t("siteMap")}
            </p>
            <ul className="grid grid-cols-2 gap-x-5 gap-y-2 text-sm text-foreground/65 lg:grid-cols-1">
              {FOOTER_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-foreground"
                  >
                    {tNav(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-5">
            <p className="editorial-kicker">
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
                    className="relative block h-full w-full grayscale opacity-70 transition-[filter,opacity] duration-300 hover:grayscale-0 hover:opacity-100"
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
