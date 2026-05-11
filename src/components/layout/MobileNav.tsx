"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LanguageSwitcher } from "./LanguageSwitcher";

const NAV_ITEMS = [
  { href: "/projekt", key: "project" },
  { href: "/beteiligung", key: "participation" },
  { href: "/blog", key: "blog" },
  { href: "/termine", key: "events" },
  { href: "/faq", key: "faq" },
  { href: "/ansprechpersonen", key: "contact" },
] as const;

export function MobileNav() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={t("menu")}
          className="border border-[var(--rule)] bg-background/70 lg:hidden"
        >
          <Menu aria-hidden className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 border-l border-[var(--rule-strong)] bg-background p-0">
        <SheetHeader className="border-b border-[var(--rule-strong)]">
          <SheetTitle className="font-serif text-2xl font-semibold">
            {t("menu")}
          </SheetTitle>
          <SheetDescription className="sr-only">
            {t("menuDescription")}
          </SheetDescription>
        </SheetHeader>
        <nav className="flex flex-col p-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-border px-1 py-4 text-base font-semibold uppercase text-foreground/85 transition-colors hover:text-[var(--accent-secondary)]"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>
        <div className="mt-auto border-t border-[var(--rule-strong)] p-4">
          <LanguageSwitcher />
        </div>
      </SheetContent>
    </Sheet>
  );
}
