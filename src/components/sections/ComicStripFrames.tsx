"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { registerScrollTrigger } from "@/lib/gsap/registerScrollTrigger";

type Frame = {
  image: string;
  alt: string;
  title: string;
  caption: string;
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
        y: 28,
        opacity: 0,
        duration: 0.75,
        ease: "power2.out",
        stagger: 0.14,
        scrollTrigger: {
          trigger: root,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      {frames.map((frame, i) => (
        <figure
          key={frame.image}
          data-comic-frame
          className="group relative flex flex-col overflow-hidden border border-[var(--rule-strong)] bg-[var(--surface-elevated)] p-2 shadow-[var(--shadow-xs)] transition-[transform,box-shadow] duration-500 ease-[var(--ease-out)] hover:-translate-y-1 hover:shadow-[var(--shadow-md)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-foreground/[0.04]">
            <Image
              src={frame.image}
              alt={frame.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
            />
            <span
              aria-hidden
              className="absolute left-3 top-3 inline-flex h-7 items-center justify-center border border-[var(--rule-strong)] bg-[var(--paper)] px-3 font-mono text-[10px] font-semibold text-foreground/80 shadow-[var(--shadow-xs)]"
            >
              0{i + 1}
            </span>
          </div>
          <figcaption className="flex flex-col gap-2 border-t border-[var(--rule-strong)] px-2 py-4 sm:px-3">
            <h3 className="font-serif text-xl font-semibold leading-snug tracking-[var(--tracking-heading)] text-foreground">
              {frame.title}
            </h3>
            <p className="text-sm leading-[var(--leading-relaxed)] text-foreground/70">
              {frame.caption}
            </p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
