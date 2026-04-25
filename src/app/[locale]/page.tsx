import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("hero");
  const tNav = await getTranslations("nav");

  return (
    <main className="flex-1">
      <section className="mx-auto flex min-h-[80vh] max-w-5xl flex-col justify-center gap-8 px-6 py-24">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-foreground/60">
          {t("kicker")}
        </p>
        <h1 className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
          {t("title")}
        </h1>
        <p className="max-w-2xl text-pretty text-lg leading-relaxed text-foreground/75 md:text-xl">
          {t("subtitle")}
        </p>
        <div className="flex flex-wrap gap-3 pt-4">
          <Link
            href="/beteiligung"
            className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            {t("ctaPrimary")}
          </Link>
          <Link
            href="/projekt"
            className="rounded-full border border-foreground/15 px-6 py-3 text-sm font-medium transition-colors hover:bg-foreground/5"
          >
            {t("ctaSecondary")}
          </Link>
        </div>
        <nav className="mt-16 flex flex-wrap gap-4 text-sm text-foreground/60">
          <Link href="/projekt" className="hover:text-foreground">
            {tNav("project")}
          </Link>
          <Link href="/beteiligung" className="hover:text-foreground">
            {tNav("participation")}
          </Link>
          <Link href="/blog" className="hover:text-foreground">
            {tNav("blog")}
          </Link>
          <Link href="/faq" className="hover:text-foreground">
            {tNav("faq")}
          </Link>
          <Link href="/ansprechpersonen" className="hover:text-foreground">
            {tNav("contact")}
          </Link>
        </nav>
      </section>
    </main>
  );
}
