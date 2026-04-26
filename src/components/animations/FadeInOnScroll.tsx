"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { registerScrollTrigger } from "@/lib/gsap/registerScrollTrigger";

type Props = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
};

export function FadeInOnScroll({
  children,
  delay = 0,
  y = 30,
  duration = 0.8,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerScrollTrigger();
      const el = ref.current;
      if (!el) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(el, { y: 0, opacity: 1, clearProps: "all" });
        return;
      }

      gsap.from(el, {
        y,
        opacity: 0,
        duration,
        delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
