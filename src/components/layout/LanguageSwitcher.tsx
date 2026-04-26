"use client";

import { useTransition } from "react";
import { useParams } from "next/navigation";
import { Globe } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "@/lib/i18n/navigation";
import { routing } from "@/lib/i18n/routing";
import { Button } from "@/components/ui/button";

export function LanguageSwitcher() {
  const t = useTranslations("langSwitcher");
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = useLocale();
  const [isPending, startTransition] = useTransition();

  const otherLocale = routing.locales.find((l) => l !== currentLocale)!;

  const handleSwitch = () => {
    startTransition(() => {
      router.replace(
        // @ts-expect-error — pathname-Union enthält dynamische Routen
        // (`/blog/[slug]`); next-intl validiert pathname/params zur Laufzeit.
        { pathname, params },
        { locale: otherLocale }
      );
    });
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={handleSwitch}
      disabled={isPending}
      aria-label={t("label", { target: t(otherLocale) })}
      className="gap-1.5"
    >
      <Globe aria-hidden className="size-4" />
      <span className="font-medium uppercase tracking-wider">{otherLocale}</span>
    </Button>
  );
}
