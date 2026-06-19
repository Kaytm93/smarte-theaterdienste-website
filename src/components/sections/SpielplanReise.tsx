"use client";

import { useId, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import {
  ArrowLeft,
  ArrowRight,
  Braces,
  Files,
  Languages,
  RadioTower,
  Share2,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type ReiseStation = {
  tag: string;
  phase: string;
  title: string;
  body: string;
  chips: string[];
};

export type ReiseLabels = {
  hint: string;
  prev: string;
  next: string;
  /** ICU string with {current} and {total} placeholders */
  progressLabel: string;
};

// Eine Ikone pro Station — folgt der Reihenfolge der Stationen aus den Messages.
const ICONS: LucideIcon[] = [Files, Languages, Braces, Share2, RadioTower];

const ORBIT_STARS = [
  "left-1/2 top-3 -translate-x-1/2",
  "right-10 top-7",
  "right-4 top-1/2 -translate-y-1/2",
  "bottom-7 right-10",
  "bottom-3 left-1/2 -translate-x-1/2",
  "bottom-7 left-10",
  "left-4 top-1/2 -translate-y-1/2",
  "left-10 top-7",
] as const;

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

type Props = {
  stations: ReiseStation[];
  labels: ReiseLabels;
};

export function SpielplanReise({ stations, labels }: Props) {
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const baseId = useId();
  const total = stations.length;

  const go = (index: number) =>
    setActive((prev) => {
      const next = Math.max(0, Math.min(total - 1, index));
      return next === prev ? prev : next;
    });

  // Fortschrittslinie zum aktiven Knoten füllen.
  useGSAP(
    () => {
      if (!fillRef.current) return;
      const pct = total > 1 ? (active / (total - 1)) * 100 : 0;
      gsap.to(fillRef.current, {
        width: `${pct}%`,
        duration: prefersReducedMotion() ? 0 : 0.6,
        ease: "power3.out",
      });
    },
    { dependencies: [active], scope: rootRef },
  );

  // Inhalt der aktiven Station beim Wechsel sanft einblenden.
  useGSAP(
    () => {
      if (!stageRef.current || prefersReducedMotion()) return;
      const targets = stageRef.current.querySelectorAll("[data-reveal]");
      gsap.fromTo(
        targets,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: "power3.out", stagger: 0.06 },
      );
    },
    { dependencies: [active], scope: stageRef },
  );

  // Sanfter Dauer-Puls am aktiven Icon — Leben, aber dezent.
  useGSAP(
    () => {
      const ring = rootRef.current?.querySelector("[data-active-ring]");
      if (!ring || prefersReducedMotion()) return;
      gsap.fromTo(
        ring,
        { scale: 0.85, opacity: 0.5 },
        {
          scale: 1.9,
          opacity: 0,
          duration: 1.8,
          ease: "power2.out",
          repeat: -1,
          transformOrigin: "center",
        },
      );
    },
    { dependencies: [active], scope: rootRef, revertOnUpdate: true },
  );

  // Zentrierter Orbit-Core: sichtbar, ruhig, und nur transform/opacity animiert.
  useGSAP(
    () => {
      if (!orbitRef.current || prefersReducedMotion()) return;
      const orbit = orbitRef.current.querySelector("[data-orbit]");
      const core = orbitRef.current.querySelector("[data-core]");
      const glow = orbitRef.current.querySelector("[data-core-glow]");
      const stars = orbitRef.current.querySelectorAll("[data-orbit-star]");

      gsap.to(orbit, {
        rotate: 360,
        duration: 24,
        ease: "none",
        repeat: -1,
        transformOrigin: "center",
      });
      gsap.to(core, {
        scale: 1.045,
        duration: 1.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        transformOrigin: "center",
      });
      gsap.to(glow, {
        scale: 1.18,
        opacity: 0.85,
        duration: 2.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        transformOrigin: "center",
      });
      gsap.to(stars, {
        scale: 1.32,
        opacity: 1,
        duration: 0.95,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.13,
        transformOrigin: "center",
      });
    },
    { dependencies: [active], scope: orbitRef, revertOnUpdate: true },
  );

  const onTablistKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      const next = Math.min(total - 1, active + 1);
      go(next);
      rootRef.current
        ?.querySelector<HTMLButtonElement>(`#${baseId}-tab-${next}`)
        ?.focus();
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      const prev = Math.max(0, active - 1);
      go(prev);
      rootRef.current
        ?.querySelector<HTMLButtonElement>(`#${baseId}-tab-${prev}`)
        ?.focus();
    } else if (event.key === "Home") {
      event.preventDefault();
      go(0);
    } else if (event.key === "End") {
      event.preventDefault();
      go(total - 1);
    }
  };

  const station = stations[active];
  const StageIcon = ICONS[active % ICONS.length];
  const progress = labels.progressLabel
    .replace("{current}", String(active + 1))
    .replace("{total}", String(total));

  return (
    <div ref={rootRef} className="not-prose">
      {/* Stepper-Schiene */}
      <div
        role="tablist"
        aria-label={labels.hint}
        onKeyDown={onTablistKeyDown}
        className="relative"
      >
        {/* Grundlinie + Fortschrittsfüllung — von Knoten 1 bis Knoten 5 */}
        <div
          aria-hidden
          className="absolute left-[10%] right-[10%] top-5 h-0.5 -translate-y-1/2"
        >
          <span className="absolute inset-0 bg-[var(--rule)]" />
          <span
            ref={fillRef}
            className="absolute left-0 top-0 h-full bg-[var(--accent-brand-ink)]"
            style={{ width: 0 }}
          />
        </div>

        <ol className="relative m-0 grid list-none grid-cols-5 gap-1 p-0">
          {stations.map((item, index) => {
            const StepIcon = ICONS[index % ICONS.length];
            const isActive = index === active;
            const isDone = index < active;
            return (
              <li key={item.title} className="flex flex-col items-center">
                <button
                  type="button"
                  id={`${baseId}-tab-${index}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => go(index)}
                  className="group relative flex flex-col items-center rounded-full outline-none"
                >
                  {isActive ? (
                    <span
                      aria-hidden
                      data-active-ring
                      className="pointer-events-none absolute left-1/2 top-5 size-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent-brand)]"
                    />
                  ) : null}
                  <span
                    className={cn(
                      "relative z-10 flex size-10 items-center justify-center rounded-full border-2 bg-background transition-all duration-300",
                      "group-focus-visible:ring-2 group-focus-visible:ring-[var(--accent-brand)] group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-background",
                      isActive
                        ? "scale-110 border-[var(--accent-brand-ink)] bg-[var(--accent-brand-ink)] text-[var(--paper)] shadow-[var(--shadow-sm)]"
                        : isDone
                          ? "border-[var(--accent-brand-ink)] text-[var(--accent-brand-ink)]"
                          : "border-[var(--rule)] text-foreground/45 group-hover:border-[var(--accent-brand-ink)] group-hover:text-[var(--accent-brand-ink)]",
                    )}
                  >
                    <StepIcon aria-hidden className="size-4" />
                  </span>
                </button>
                <span
                  className={cn(
                    "mt-3 hidden text-center text-xs font-semibold leading-tight transition-colors sm:block",
                    isActive
                      ? "text-[var(--accent-brand-ink)]"
                      : "text-foreground/45",
                  )}
                >
                  {item.phase}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Bühne der aktiven Station */}
      <div
        ref={stageRef}
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active}`}
        className="mt-8 overflow-hidden rounded-lg border border-[var(--rule-strong)] bg-[color-mix(in_srgb,var(--surface-elevated)_92%,var(--accent-brand-pale)_8%)] px-5 py-7 shadow-[var(--shadow-md)] sm:mt-10 sm:px-8 sm:py-9"
      >
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          {/* Pulsierender Kern mit Stern-Orbit */}
          <div
            ref={orbitRef}
            data-reveal
            className="relative mx-auto flex min-h-[13rem] w-full max-w-[24rem] items-center justify-center overflow-hidden rounded-2xl border border-[var(--rule)] bg-[radial-gradient(circle_at_center,var(--paper)_0%,var(--accent-brand-pale)_42%,var(--paper-soft)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),var(--shadow-sm)]"
          >
            <span
              aria-hidden
              data-core-glow
              className="absolute size-32 rounded-full bg-[var(--accent-brand)]/45 blur-2xl"
            />
            <span
              aria-hidden
              data-orbit
              className="absolute size-40 rounded-full border border-dashed border-[var(--accent-brand-ink)]/38 sm:size-44"
            />
            <span
              aria-hidden
              className="absolute size-52 rounded-full border border-[var(--paper-elevated)]/80 shadow-[inset_0_0_30px_rgba(255,255,255,0.75)]"
            />
            {ORBIT_STARS.map((position, index) => (
              <span
                key={position}
                aria-hidden
                data-orbit-star
                className={cn(
                  "absolute size-2 rounded-full border border-[var(--accent-brand-ink)]/35 bg-[var(--paper-elevated)] opacity-70 shadow-[0_0_14px_color-mix(in_srgb,var(--accent-brand)_62%,transparent)]",
                  index % 2 === 0 ? "sm:size-2.5" : "sm:size-1.5",
                  position,
                )}
              />
            ))}
            <div
              data-core
              className="relative z-10 flex size-24 items-center justify-center rounded-full border border-[var(--rule-strong)] bg-[var(--paper-elevated)] text-[var(--accent-brand-ink)] shadow-[0_18px_38px_color-mix(in_srgb,var(--accent-brand)_30%,transparent)] sm:size-28"
            >
              <StageIcon aria-hidden className="size-10 sm:size-12" />
              <span
                aria-hidden
                className="absolute inset-2 rounded-full border border-[var(--accent-brand)]/55"
              />
            </div>
          </div>

          <span
            data-reveal
            className="mt-5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-foreground/58"
          >
            {progress}
          </span>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <span
              data-reveal
              className="inline-flex items-center rounded-full bg-[var(--accent-brand-pale)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--accent-brand-ink)]"
            >
              {station.tag}
            </span>
            <span
              data-reveal
              className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/50"
            >
              {station.phase}
            </span>
          </div>

          <h4
            data-reveal
            className="mt-3 text-balance font-serif text-2xl font-semibold leading-snug tracking-[var(--tracking-heading)] sm:text-3xl"
          >
            {station.title}
          </h4>
          <p
            data-reveal
            className="mx-auto mt-3 max-w-[62ch] text-pretty text-base leading-[var(--leading-relaxed)] text-foreground/82"
          >
            {station.body}
          </p>

          <ul
            data-reveal
            className="mt-5 flex flex-wrap justify-center gap-2"
            aria-hidden
          >
            {station.chips.map((chip) => (
              <li
                key={chip}
                className={cn(
                  "rounded-md border px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.08em]",
                  active === 0
                    ? "border-dashed border-[var(--rule)] text-foreground/45"
                    : "border-[var(--accent-brand)] bg-[color-mix(in_srgb,var(--accent-brand-pale)_50%,transparent)] text-[var(--accent-brand-ink)]",
                )}
              >
                {chip}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Steuerung */}
      <div className="mt-5 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => go(active - 1)}
          disabled={active === 0}
          className="inline-flex min-h-11 items-center gap-2 rounded-md border border-[var(--rule-strong)] px-4 py-2 text-sm font-semibold transition-[background-color,transform,opacity] hover:bg-[var(--surface-1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-px disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent disabled:active:translate-y-0"
        >
          <ArrowLeft aria-hidden className="size-4" />
          {labels.prev}
        </button>

        <p
          aria-live="polite"
          className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-foreground/55"
        >
          {progress}
        </p>

        <button
          type="button"
          onClick={() => go(active + 1)}
          disabled={active === total - 1}
          className="inline-flex min-h-11 items-center gap-2 rounded-md border border-[var(--accent-brand-ink)] bg-[var(--accent-brand-ink)] px-4 py-2 text-sm font-semibold text-[var(--paper)] transition-[background-color,transform,opacity] hover:bg-[var(--accent-brand-ink)]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-px disabled:cursor-not-allowed disabled:opacity-35 disabled:active:translate-y-0"
        >
          {labels.next}
          <ArrowRight aria-hidden className="size-4" />
        </button>
      </div>
    </div>
  );
}
