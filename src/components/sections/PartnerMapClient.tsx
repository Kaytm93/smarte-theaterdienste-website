"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";
import { ArrowUpRight, ExternalLink, MapPin } from "lucide-react";
import { Link } from "@/lib/i18n/navigation";
import type { Partner } from "@/lib/supabase/queries";
import { cn } from "@/lib/utils";

// Wikimedia "Germany_location_map.svg" — Equirectangular mit 150% N/S-Stretch.
// Lineares Mapping über die Bounding-Box trifft die Position auf dem Bild korrekt.
const BOUNDS = { N: 55.1, S: 47.2, W: 5.5, E: 15.5 } as const;

function projectLatLng(lat: number, lng: number) {
  const x = ((lng - BOUNDS.W) / (BOUNDS.E - BOUNDS.W)) * 100;
  const y = ((BOUNDS.N - lat) / (BOUNDS.N - BOUNDS.S)) * 100;
  return { x, y };
}

type Props = {
  partners: Partner[];
};

const STATUS_ORDER = ["partner", "pilot", "interested"] as const;

const STATUS_STYLES = {
  partner: {
    marker: "bg-[var(--accent-brand-ink)] text-[var(--paper)]",
    dot: "bg-[var(--accent-brand-ink)]",
    soft: "bg-[var(--accent-brand-pale)] text-[var(--accent-brand-ink)]",
  },
  pilot: {
    marker:
      "bg-[var(--accent-brand)] text-[var(--accent-brand-foreground)]",
    dot: "bg-[var(--accent-brand)]",
    soft: "bg-[var(--accent-brand-pale)] text-[var(--accent-brand-ink)]",
  },
  interested: {
    marker: "bg-foreground/55 text-background",
    dot: "bg-foreground/55",
    soft: "bg-foreground/10 text-foreground/70",
  },
} satisfies Record<
  Partner["status"],
  { marker: string; dot: string; soft: string }
>;

export function PartnerMapClient({ partners }: Props) {
  const t = useTranslations("pages.mitwirkung.map");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const placedPartners = partners.filter(
    (p): p is Partner & { lat: number; lng: number } =>
      p.lat !== null && p.lng !== null,
  );
  // Stabile Nummerierung: Marker und Liste teilen denselben Index.
  const numberOf = new Map(placedPartners.map((p, i) => [p.id, i + 1]));

  // Eindrop der Marker + sanftes Einblenden beim ersten Sichtbarwerden.
  useGSAP(
    () => {
      const root = containerRef.current;
      if (!root) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const markers = root.querySelectorAll<HTMLElement>("[data-marker]");
      if (markers.length === 0) return;

      gsap.from(markers, {
        y: -16,
        opacity: 0,
        scale: 0.6,
        duration: 0.6,
        ease: "back.out(1.7)",
        stagger: 0.12,
        delay: 0.15,
      });
    },
    { scope: containerRef, dependencies: [placedPartners.length] },
  );

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] lg:items-start"
    >
      {/* Karte */}
      <div className="relative mx-auto aspect-[1073/1272] w-full min-w-0 max-w-[420px] overflow-hidden rounded-lg border border-[var(--rule-strong)] bg-[var(--surface-1)] shadow-[var(--shadow-sm)] lg:mx-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/maps/germany.svg"
          alt={t("imageAlt")}
          className="absolute inset-0 size-full object-contain p-5 opacity-70 [filter:grayscale(1)_contrast(0.9)_brightness(1.03)]"
          draggable={false}
        />

        {placedPartners.map((partner) => {
          const { x, y } = projectLatLng(partner.lat, partner.lng);
          const isSelected = selectedId === partner.id;
          const statusStyle = STATUS_STYLES[partner.status];
          const num = numberOf.get(partner.id);

          return (
            <button
              key={partner.id}
              type="button"
              data-marker
              onClick={() => setSelectedId(isSelected ? null : partner.id)}
              aria-label={`${num}. ${partner.name} — ${t(`statuses.${partner.status}`)}`}
              aria-pressed={isSelected}
              className="group absolute z-10 -translate-x-1/2 -translate-y-1/2 outline-none"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              {isSelected ? (
                <span
                  aria-hidden
                  className="absolute left-1/2 top-1/2 size-9 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-[var(--accent-brand)]/40"
                />
              ) : null}
              <span
                className={cn(
                  "relative flex size-7 items-center justify-center rounded-full border-2 border-background text-[12px] font-bold shadow-[var(--shadow-sm)] transition-transform",
                  statusStyle.marker,
                  isSelected
                    ? "scale-125"
                    : "group-hover:scale-110 group-focus-visible:scale-110",
                )}
              >
                {num}
              </span>
            </button>
          );
        })}
      </div>

      {/* Begleit-Panel */}
      <div className="min-w-0 space-y-5">
        <div className="rounded-lg border border-[var(--rule-strong)] bg-[var(--surface-elevated)] p-5 shadow-[var(--shadow-xs)]">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--accent-brand-ink)]">
            {t("networkNote")}
          </p>
          <Link
            href="/"
            className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground underline-offset-4 hover:text-[var(--accent-brand-ink)] hover:underline"
          >
            {t("networkCta")}
            <ArrowUpRight aria-hidden className="size-4" />
          </Link>
        </div>

        {/* Legende */}
        <div
          aria-label={t("legendLabel")}
          className="flex flex-wrap gap-2 text-xs text-foreground/65"
        >
          {STATUS_ORDER.map((status) => (
            <span
              key={status}
              className="inline-flex items-center gap-2 rounded-md border border-border/60 bg-background/70 px-3 py-1"
            >
              <span
                aria-hidden
                className={cn("size-2.5 rounded-full", STATUS_STYLES[status].dot)}
              />
              {t(`statuses.${status}`)}
            </span>
          ))}
        </div>

        {/* Nummerierte Partnerliste */}
        <ul className="divide-y divide-border/60 overflow-hidden rounded-lg border border-[var(--rule-strong)] bg-background/95">
          {partners.map((partner) => {
            const isSelected = selectedId === partner.id;
            const statusStyle = STATUS_STYLES[partner.status];
            const num = numberOf.get(partner.id);

            return (
              <li key={partner.id}>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedId(isSelected ? null : partner.id)
                  }
                  aria-pressed={isSelected}
                  className={cn(
                    "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors",
                    isSelected ? "bg-[var(--surface-1)]" : "hover:bg-muted/50",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "flex size-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold",
                      num
                        ? statusStyle.marker
                        : "bg-muted text-foreground/40",
                    )}
                  >
                    {num ?? "–"}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-foreground">
                      {partner.name}
                    </span>
                    {isSelected ? (
                      <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-foreground/55">
                        <span className="inline-flex items-center gap-1">
                          <MapPin aria-hidden className="size-3" />
                          {partner.lat !== null && partner.lng !== null
                            ? `${partner.lat.toFixed(2)}° N · ${partner.lng.toFixed(2)}° E`
                            : t("noLocation")}
                        </span>
                        {partner.websiteUrl ? (
                          <a
                            href={partner.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 font-semibold text-[var(--accent-brand-ink)] hover:underline"
                          >
                            {t("viewWebsite")}
                            <ExternalLink aria-hidden className="size-3" />
                          </a>
                        ) : null}
                      </span>
                    ) : null}
                  </span>
                  <span
                    className={cn(
                      "shrink-0 rounded-md px-2.5 py-1 text-[11px] font-medium",
                      statusStyle.soft,
                    )}
                  >
                    {t(`statuses.${partner.status}`)}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
