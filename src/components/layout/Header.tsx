import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileNav } from "./MobileNav";

const NAV_ITEMS = [
  { href: "/projekt", key: "project" },
  { href: "/beteiligung", key: "participation" },
  { href: "/blog", key: "blog" },
  { href: "/termine", key: "events" },
  { href: "/faq", key: "faq" },
  { href: "/ansprechpersonen", key: "contact" },
] as const;

export async function Header() {
  const t = await getTranslations("nav");
  const tMeta = await getTranslations("meta");

  return (
    <header
      className="sticky top-0 z-40 border-b border-[var(--rule-strong)] bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/80"
      style={{ minHeight: "var(--header-height)" }}
    >
      <div className="mx-auto flex h-[var(--header-height)] max-w-[var(--container-max)] flex-col justify-center gap-2 px-4 sm:px-6 lg:px-8">
        <div className="hidden w-full items-center justify-between border-b border-border pb-1 text-[11px] font-semibold uppercase text-foreground/65 sm:flex">
          <span>{t("edition")}</span>
          <span>{t("dateline")}</span>
          <span>JSON / ORIF / DRK</span>
        </div>

        <div className="flex w-full items-center justify-between gap-6">
          <Link
            href="/"
            className="group inline-flex items-baseline gap-2 transition-opacity hover:opacity-80"
          >
            <span
              aria-hidden
              className="inline-flex h-8 w-8 items-center justify-center border border-[var(--rule-strong)] bg-[var(--ink)] font-mono text-[11px] font-semibold leading-none text-[var(--paper)]"
            >
              ST
            </span>
            <span className="font-serif text-xl font-semibold leading-none text-foreground sm:text-2xl">
              {tMeta("siteName")}
            </span>
          </Link>

          <nav
            aria-label={t("menu")}
            className="hidden lg:flex lg:items-center lg:gap-5"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative border-b border-transparent pb-1 text-xs font-semibold uppercase text-foreground/70 transition-colors hover:border-[var(--rule-strong)] hover:text-foreground"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden lg:block">
              <LanguageSwitcher />
            </div>
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
