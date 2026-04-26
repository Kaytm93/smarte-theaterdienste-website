"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { registerScrollTrigger } from "@/lib/gsap/registerScrollTrigger";
import { cn } from "@/lib/utils";

type Props = {
  children: string;
  className?: string;
  stagger?: number;
  duration?: number;
};

export function RevealText({
  children,
  className,
  stagger = 0.06,
  duration = 0.7,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const words = children.split(/\s+/).filter(Boolean);

  useGSAP(
    () => {
      registerScrollTrigger();
      const el = ref.current;
      if (!el) return;
      const targets = el.querySelectorAll<HTMLSpanElement>("[data-reveal-word]");

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(targets, { y: 0, opacity: 1, clearProps: "all" });
        return;
      }

      gsap.from(targets, {
        y: "0.4em",
        opacity: 0,
        duration,
        ease: "power3.out",
        stagger,
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: ref }
  );

  return (
    <span ref={ref} className={cn("inline-block", className)}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-baseline"
        >
          <span data-reveal-word className="inline-block will-change-transform">
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </span>
  );
}
