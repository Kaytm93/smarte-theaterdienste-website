"use client";

import { useRef } from "react";
import Image, { type ImageProps } from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { registerScrollTrigger } from "@/lib/gsap/registerScrollTrigger";
import { cn } from "@/lib/utils";

type Props = Omit<ImageProps, "className"> & {
  className?: string;
  imageClassName?: string;
  amount?: number;
};

export function ParallaxImage({
  className,
  imageClassName,
  amount = 15,
  alt,
  ...imageProps
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerScrollTrigger();
      const el = ref.current;
      const inner = el?.querySelector<HTMLDivElement>("[data-parallax-inner]");
      if (!el || !inner) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(inner, { yPercent: 0, clearProps: "all" });
        return;
      }

      gsap.fromTo(
        inner,
        { yPercent: -amount / 2 },
        {
          yPercent: amount / 2,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
    >
      <div
        data-parallax-inner
        className="absolute inset-[-10%] will-change-transform"
      >
        <Image
          alt={alt}
          {...imageProps}
          className={cn("h-full w-full object-cover", imageClassName)}
        />
      </div>
    </div>
  );
}
