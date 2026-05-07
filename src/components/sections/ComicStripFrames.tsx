"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { registerScrollTrigger } from "@/lib/gsap/registerScrollTrigger";

type Frame = {
  caption: string;
  hue: number;
};

type Props = {
  frames: Frame[];
};

export function ComicStripFrames({ frames }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerScrollTrigger();
      const root = ref.current;
      if (!root) return;
      const items = root.querySelectorAll<HTMLElement>("[data-comic-frame]");

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(items, { y: 0, opacity: 1, clearProps: "all" });
        return;
      }

      gsap.from(items, {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: root,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      {frames.map((frame, i) => (
        <figure
          key={i}
          data-comic-frame
          className="group flex flex-col gap-3 overflow-hidden rounded-lg border border-border/60 bg-card/50 p-4 transition-colors duration-300 hover:border-border hover:shadow-sm motion-reduce:transition-none"
        >
          <div
            className="aspect-[4/3] rounded-md"
            style={{
              background: `linear-gradient(135deg, oklch(0.92 0.04 ${frame.hue}), oklch(0.78 0.08 ${frame.hue}))`,
            }}
            aria-hidden
          />
          <figcaption className="flex items-baseline gap-2 text-sm text-foreground/80">
            <span className="font-mono text-xs text-foreground/40">
              0{i + 1}
            </span>
            <span>{frame.caption}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
