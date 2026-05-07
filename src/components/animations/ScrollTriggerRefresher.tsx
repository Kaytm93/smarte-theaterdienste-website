"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "@/lib/i18n/navigation";
import { registerScrollTrigger } from "@/lib/gsap/registerScrollTrigger";

export function ScrollTriggerRefresher() {
  const pathname = usePathname();

  useEffect(() => {
    registerScrollTrigger();
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
