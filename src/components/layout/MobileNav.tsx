"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LanguageSwitcher } from "./LanguageSwitcher";

const NAV_ITEMS = [
  { href: "/projekt", key: "project" },
  { href: "/beteiligung", key: "participation" },
  { href: "/blog", key: "blog" },
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
          className="md:hidden"
        >
          <Menu aria-hidden className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72 p-0">
        <SheetHeader className="border-b">
          <SheetTitle className="text-base font-medium">
            {t("menu")}
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 p-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3 text-base text-foreground/85 transition-colors hover:bg-muted hover:text-foreground"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>
        <div className="mt-auto border-t p-4">
          <LanguageSwitcher />
        </div>
      </SheetContent>
    </Sheet>
  );
}
