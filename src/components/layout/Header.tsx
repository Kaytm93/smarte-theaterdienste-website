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
      className="sticky top-0 z-40 border-b border-border/60 bg-background/75 backdrop-blur-md supports-[backdrop-filter]:bg-background/60"
      style={{ minHeight: "var(--header-height)" }}
    >
      <div className="mx-auto flex h-[var(--header-height)] max-w-[var(--container-max)] items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-sm font-semibold tracking-tight transition-opacity hover:opacity-80"
        >
          <span
            aria-hidden
            className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[var(--accent-brand)] text-[var(--accent-brand-foreground)] font-mono text-[11px] font-semibold leading-none"
          >
            ST
          </span>
          <span>{tMeta("siteName")}</span>
        </Link>

        <nav
          aria-label={t("menu")}
          className="hidden lg:flex lg:items-center lg:gap-6"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-sm text-foreground/70 transition-colors hover:text-foreground"
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
    </header>
  );
}
