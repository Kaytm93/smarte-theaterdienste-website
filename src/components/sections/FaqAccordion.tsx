"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Plus, Search, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { registerScrollTrigger } from "@/lib/gsap/registerScrollTrigger";
import type { FaqCategory } from "@/lib/content/loader";
import { cn } from "@/lib/utils";

type Props = {
  categories: FaqCategory[];
};

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper)]";

export function FaqAccordion({ categories }: Props) {
  const t = useTranslations("pages.faq");
  const rootRef = useRef<HTMLDivElement>(null);
  const refreshTimer = useRef<number | null>(null);
  const [query, setQuery] = useState("");
  const [activeKey, setActiveKey] = useState(categories[0]?.key ?? "");

  const normalized = query.trim().toLowerCase();
  const isFiltering = normalized.length > 0;

  const totalCount = useMemo(
    () => categories.reduce((n, cat) => n + cat.items.length, 0),
    [categories]
  );

  // Original-Nummerierung pro Kategorie bleibt auch in gefilterten Ansichten stabil.
  const numberById = useMemo(() => {
    const map = new Map<string, string>();
    for (const cat of categories) {
      cat.items.forEach((item, index) => {
        map.set(item.id, String(index + 1).padStart(2, "0"));
      });
    }
    return map;
  }, [categories]);

  const filtered = useMemo(() => {
    if (!isFiltering) {
      return categories.map((cat) => ({ ...cat, matches: cat.items }));
    }
    return categories.map((cat) => ({
      ...cat,
      matches: cat.items.filter((item) =>
        `${item.question} ${item.answer}`.toLowerCase().includes(normalized)
      ),
    }));
  }, [categories, isFiltering, normalized]);

  const shownCount = filtered.reduce((n, cat) => n + cat.matches.length, 0);

  // Höhenänderungen (Accordion, Filter) verschieben tiefere ScrollTrigger — debounced nachmessen.
  const scheduleScrollTriggerRefresh = () => {
    if (refreshTimer.current !== null) window.clearTimeout(refreshTimer.current);
    refreshTimer.current = window.setTimeout(() => ScrollTrigger.refresh(), 400);
  };
  useEffect(() => {
    return () => {
      if (refreshTimer.current !== null) window.clearTimeout(refreshTimer.current);
    };
  }, []);

  // Scroll-Entrance pro Kategorie: Heading + Fragen staggern beim ersten Sichtbarwerden.
  // Bei aktiver Suche wird der Kontext revertiert (Inline-Styles weg, Trigger tot) —
  // gefilterte Zeilen sind dadurch garantiert sichtbar.
  useGSAP(
    () => {
      registerScrollTrigger();
      if (isFiltering || prefersReducedMotion()) return;
      const sections = gsap.utils.toArray<HTMLElement>(
        "[data-faq-section]",
        rootRef.current
      );
      for (const section of sections) {
        const targets = section.querySelectorAll(
          "[data-faq-heading], [data-faq-row]"
        );
        gsap.from(targets, {
          y: 14,
          opacity: 0,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: section, start: "top 82%", once: true },
        });
      }
    },
    { dependencies: [isFiltering], revertOnUpdate: true, scope: rootRef }
  );

  // Scroll-Spy für die Quick-Nav: oberste sichtbare Kategorie gewinnt.
  // IntersectionObserver statt ScrollTrigger, weil Accordion-Höhen laufend wechseln.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const sections = Array.from(
      root.querySelectorAll<HTMLElement>("[data-faq-section]")
    );
    if (sections.length === 0) return;

    const tops = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          tops.set(
            entry.target.id,
            entry.isIntersecting
              ? entry.boundingClientRect.top
              : Number.POSITIVE_INFINITY
          );
        }
        let best: string | null = null;
        let bestTop = Number.POSITIVE_INFINITY;
        for (const [id, top] of tops) {
          if (top < bestTop) {
            bestTop = top;
            best = id;
          }
        }
        if (best) setActiveKey(best.replace("faq-", ""));
      },
      { rootMargin: "-140px 0px -55% 0px" }
    );
    sections.forEach((section) => io.observe(section));
    return () => io.disconnect();
  }, [normalized]);

  const jumpTo = (key: string) => {
    const el = document.getElementById(`faq-${key}`);
    if (!el) return;
    el.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
    window.history.replaceState(null, "", `#faq-${key}`);
  };

  const clearSearch = () => {
    setQuery("");
    scheduleScrollTriggerRefresh();
  };

  return (
    <div ref={rootRef}>
      {/* Suche — filtert Fragen und Antworten live. */}
      <div className="group/search flex items-center gap-3 border-b border-[var(--rule-strong)] pb-3 transition-colors duration-200 focus-within:border-[var(--accent-brand-ink)]">
        <Search
          aria-hidden
          className="size-4 shrink-0 text-foreground/45 transition-colors duration-200 group-focus-within/search:text-[var(--accent-brand-ink)]"
        />
        <label htmlFor="faq-search" className="sr-only">
          {t("search.label")}
        </label>
        <input
          id="faq-search"
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            scheduleScrollTriggerRefresh();
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape" && query) {
              event.preventDefault();
              clearSearch();
            }
          }}
          placeholder={t("search.placeholder")}
          autoComplete="off"
          className="min-h-11 w-full bg-transparent font-serif text-lg font-medium outline-none placeholder:font-sans placeholder:text-base placeholder:font-normal placeholder:text-foreground/40 [&::-webkit-search-cancel-button]:hidden"
        />
        {query ? (
          <button
            type="button"
            onClick={clearSearch}
            aria-label={t("search.clear")}
            className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-full border border-[var(--rule)] text-foreground/60 transition-colors duration-150 hover:border-[var(--accent-brand-ink)] hover:text-[var(--accent-brand-ink)] active:scale-[0.96]",
              FOCUS_RING
            )}
          >
            <X aria-hidden className="size-4" />
          </button>
        ) : null}
      </div>

      {/* Meta-/Ergebniszeile — announced Filteränderungen für Screenreader. */}
      <p
        role="status"
        aria-live="polite"
        className="mt-3 font-mono text-xs uppercase tracking-[0.1em] text-foreground/55"
      >
        {isFiltering
          ? t("search.results", { shown: shownCount, total: totalCount })
          : t("stats", { total: totalCount, categories: categories.length })}
      </p>

      {/* Sticky Quick-Nav mit Scroll-Spy. */}
      <nav
        aria-label={t("nav")}
        className="sticky top-[var(--header-height)] z-30 -mx-4 mt-6 border-b border-[var(--rule)] bg-[var(--paper)]/90 px-4 py-3 backdrop-blur-sm sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
      >
        <div className="flex flex-nowrap gap-2 overflow-x-auto [scrollbar-width:none] sm:flex-wrap">
          {filtered.map((cat) => {
            const disabled = isFiltering && cat.matches.length === 0;
            const active = !disabled && activeKey === cat.key;
            const count = isFiltering ? cat.matches.length : cat.items.length;
            return (
              <a
                key={cat.key}
                href={`#faq-${cat.key}`}
                aria-current={active ? "true" : undefined}
                aria-disabled={disabled || undefined}
                tabIndex={disabled ? -1 : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  if (!disabled) jumpTo(cat.key);
                }}
                className={cn(
                  "flex min-h-9 shrink-0 items-center gap-2 rounded-full border px-3.5 py-1 text-sm font-semibold transition-colors duration-150",
                  FOCUS_RING,
                  active
                    ? "border-[var(--accent-brand-ink)] bg-[var(--accent-brand-pale)] text-[var(--accent-brand-ink)]"
                    : disabled
                      ? "pointer-events-none border-[var(--rule-soft)] text-foreground/30"
                      : "border-[var(--rule-strong)] text-foreground/70 hover:border-[var(--accent-brand-ink)] hover:text-[var(--accent-brand-ink)]"
                )}
              >
                {cat.label}
                <span
                  className={cn(
                    "font-mono text-[11px] font-normal tabular-nums",
                    active ? "text-[var(--accent-brand-ink)]" : "text-foreground/45"
                  )}
                >
                  {String(count).padStart(2, "0")}
                </span>
              </a>
            );
          })}
        </div>
      </nav>

      {/* Kein-Treffer-Zustand der Suche. */}
      {isFiltering && shownCount === 0 ? (
        <div className="flex flex-col items-center px-6 py-20 text-center">
          <div
            aria-hidden
            className="mb-6 flex size-20 items-center justify-center rounded-full bg-[var(--accent-brand-pale)]"
          >
            <Search className="size-7 text-[var(--accent-brand-ink)]" />
          </div>
          <h2 className="font-serif text-2xl font-semibold">
            {t("search.noResultsTitle")}
          </h2>
          <p className="mt-2 max-w-md text-foreground/70">
            {t("search.noResults", { query: query.trim() })}
          </p>
          <button
            type="button"
            onClick={clearSearch}
            className={cn(
              "mt-6 min-h-11 rounded-full border border-[var(--rule-strong)] px-5 text-sm font-semibold transition-colors duration-150 hover:border-[var(--accent-brand-ink)] hover:text-[var(--accent-brand-ink)] active:scale-[0.98]",
              FOCUS_RING
            )}
          >
            {t("search.reset")}
          </button>
        </div>
      ) : null}

      <div className="mt-10 space-y-14">
        {filtered.map((cat) => {
          if (cat.matches.length === 0) return null;
          return (
            <section
              key={cat.key}
              id={`faq-${cat.key}`}
              data-faq-section
              className="scroll-mt-[calc(var(--header-height)+4.75rem)]"
            >
              <h2
                data-faq-heading
                className="mb-4 flex items-baseline justify-between gap-4 border-b border-[var(--rule-strong)] pb-2"
              >
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--accent-brand-ink)]">
                  {cat.label}
                </span>
                <span
                  aria-hidden
                  className="font-mono text-[11px] tabular-nums text-foreground/40"
                >
                  {String(cat.matches.length).padStart(2, "0")}
                </span>
              </h2>

              <AccordionPrimitive.Root
                type="single"
                collapsible
                onValueChange={scheduleScrollTriggerRefresh}
                className="divide-y divide-[var(--rule-strong)] border-b border-[var(--rule-strong)]"
              >
                {cat.matches.map((item, index) => (
                  <AccordionPrimitive.Item
                    key={item.id}
                    value={item.id}
                    data-faq-row
                    className={isFiltering ? "faq-rise" : undefined}
                    style={
                      isFiltering
                        ? { animationDelay: `${Math.min(index * 40, 320)}ms` }
                        : undefined
                    }
                  >
                    <AccordionPrimitive.Header asChild>
                      <h3 className="m-0">
                        <AccordionPrimitive.Trigger
                          className={cn(
                            "group flex w-full items-start gap-4 rounded-sm py-5 text-left",
                            FOCUS_RING
                          )}
                        >
                          <span
                            aria-hidden
                            className="pt-1 font-mono text-xs text-[var(--accent-brand-ink)]/80 transition-colors duration-150 group-hover:text-[var(--accent-brand-ink)] group-aria-expanded:text-[var(--accent-brand-ink)]"
                          >
                            {numberById.get(item.id)}
                          </span>
                          <span className="flex-1 text-pretty font-serif text-lg font-semibold leading-snug transition-colors duration-150 group-hover:text-[var(--accent-brand-ink)] group-aria-expanded:text-[var(--accent-brand-ink)] sm:text-xl">
                            {item.question}
                          </span>
                          <span
                            aria-hidden
                            className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-[var(--rule)] text-foreground/60 transition-[rotate,border-color,background-color,color] duration-300 ease-[var(--ease-spring)] group-hover:border-[var(--accent-brand-ink)] group-hover:text-[var(--accent-brand-ink)] group-aria-expanded:rotate-45 group-aria-expanded:border-[var(--accent-brand-ink)] group-aria-expanded:bg-[var(--accent-brand-pale)] group-aria-expanded:text-[var(--accent-brand-ink)]"
                          >
                            <Plus className="size-4" />
                          </span>
                        </AccordionPrimitive.Trigger>
                      </h3>
                    </AccordionPrimitive.Header>
                    <AccordionPrimitive.Content className="group/content overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down [--tw-duration:320ms] [--tw-ease:var(--ease-out)]">
                      {/* Zweischichtig: Radix/CSS animiert die Höhe, der Wrapper zieht den Text nach. */}
                      <div className="-translate-y-1.5 pb-6 pl-9 pr-12 opacity-0 transition-[opacity,translate] duration-300 ease-[var(--ease-out)] group-data-[state=open]/content:translate-y-0 group-data-[state=open]/content:opacity-100 group-data-[state=open]/content:delay-75 sm:pl-10">
                        <p className="max-w-[65ch] leading-[var(--leading-relaxed)] text-foreground/76">
                          {item.answer}
                        </p>
                      </div>
                    </AccordionPrimitive.Content>
                  </AccordionPrimitive.Item>
                ))}
              </AccordionPrimitive.Root>
            </section>
          );
        })}
      </div>
    </div>
  );
}
