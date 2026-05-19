import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileNav } from "./MobileNav";

const NAV_ITEMS = [
  { href: "/konzeption", key: "project" },
  { href: "/jetzt-mitmachen", key: "participation" },
  { href: "/materialien", key: "materials" },
  { href: "/faq", key: "faq" },
] as const;

export async function Header() {
  const t = await getTranslations("nav");
  const tMeta = await getTranslations("meta");
  const tFooter = await getTranslations("footer");

  return (
    <header
      className="sticky top-0 z-40 border-b border-[var(--rule)] bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/80"
      style={{ minHeight: "var(--header-height)" }}
    >
      <div className="mx-auto flex h-[var(--header-height)] max-w-[var(--container-max)] items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group inline-flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <Image
            src="/logos/buehnenverein.png"
            alt={tFooter("logoAlt.buehnenverein")}
            width={88}
            height={32}
            priority
            className="h-7 w-auto sm:h-8"
          />
          <span className="hidden h-7 w-px bg-[var(--rule)] sm:block" aria-hidden />
          <span className="text-base font-semibold leading-none text-foreground sm:text-lg">
            {tMeta("siteName")}
          </span>
        </Link>

        <nav
          aria-label={t("menu")}
          className="ml-auto hidden lg:flex lg:items-center lg:gap-6"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative border-b-2 border-transparent pb-1 text-sm font-semibold text-foreground/75 transition-colors hover:border-[var(--accent-brand)] hover:text-foreground"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <div className="hidden lg:block">
            <LanguageSwitcher />
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
