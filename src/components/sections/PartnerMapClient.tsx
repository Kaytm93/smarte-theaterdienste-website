"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";
import { ExternalLink, MapPin } from "lucide-react";
import type { Partner } from "@/lib/supabase/queries";
import { cn } from "@/lib/utils";

// Wikimedia "Germany_location_map.svg" — Equirectangular mit 150% N/S-Stretch.
// Lineares Mapping ueber Bounding-Box trifft die Position auf dem Bild korrekt.
const BOUNDS = { N: 55.1, S: 47.2, W: 5.5, E: 15.5 } as const;

function projectLatLng(lat: number, lng: number) {
  const x = ((lng - BOUNDS.W) / (BOUNDS.E - BOUNDS.W)) * 100;
  const y = ((BOUNDS.N - lat) / (BOUNDS.N - BOUNDS.S)) * 100;
  return { x, y };
}

type Props = {
  partners: Partner[];
};

export function PartnerMapClient({ partners }: Props) {
  const t = useTranslations("pages.mitwirkung.map");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const placedPartners = partners.filter(
    (p): p is Partner & { lat: number; lng: number } =>
      p.lat !== null && p.lng !== null,
  );
  const selected = partners.find((p) => p.id === selectedId) ?? null;

  useGSAP(
    () => {
      const root = containerRef.current;
      if (!root) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const dots = root.querySelectorAll<HTMLElement>("[data-hotspot-pulse]");
      if (dots.length === 0) return;

      gsap.set(dots, { scale: 1, opacity: 0.55 });
      gsap.to(dots, {
        scale: 2.4,
        opacity: 0,
        duration: 1.8,
        ease: "power2.out",
        repeat: -1,
        transformOrigin: "center",
        stagger: { each: 0.35, from: "random", repeat: -1 },
      });
    },
    { scope: containerRef, dependencies: [placedPartners.length] },
  );

  return (
    <div
      ref={containerRef}
      className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]"
    >
      {/* Map */}
      <div className="relative aspect-[1073/1272] w-full overflow-hidden rounded-2xl border border-border/60 bg-muted/40">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/maps/germany.svg"
          alt={t("imageAlt")}
          className="absolute inset-0 size-full object-contain p-4"
          draggable={false}
        />
        {placedPartners.map((partner) => {
          const { x, y } = projectLatLng(partner.lat, partner.lng);
          const isSelected = selectedId === partner.id;
          return (
            <button
              key={partner.id}
              type="button"
              onClick={() => setSelectedId(partner.id)}
              aria-label={`${partner.name} — ${t(`statuses.${partner.status}`)}`}
              aria-pressed={isSelected}
              className="group absolute -translate-x-1/2 -translate-y-1/2 rounded-full p-2 outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <span
                aria-hidden
                data-hotspot-pulse
                className="absolute left-1/2 top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent-brand)]"
              />
              <span
                aria-hidden
                className={cn(
                  "block size-3.5 rounded-full border-2 border-background bg-[var(--accent-brand)] shadow-md transition-transform",
                  isSelected
                    ? "scale-125 ring-2 ring-[var(--accent-brand)] ring-offset-2 ring-offset-background"
                    : "group-hover:scale-110",
                )}
              />
            </button>
          );
        })}
      </div>

      {/* Detail panel */}
      <aside className="rounded-2xl border border-border/60 bg-background/95 p-6 lg:sticky lg:top-24 lg:self-start">
        {selected ? (
          <div className="space-y-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--accent-brand)]">
                {t(`statuses.${selected.status}`)}
              </p>
              <h3 className="mt-2 text-xl font-semibold leading-tight text-foreground">
                {selected.name}
              </h3>
            </div>
            <p className="flex items-center gap-1.5 text-sm text-foreground/60">
              <MapPin aria-hidden className="size-3.5" />
              {selected.lat !== null && selected.lng !== null
                ? `${selected.lat.toFixed(2)}° N · ${selected.lng.toFixed(2)}° E`
                : t("noLocation")}
            </p>
            {selected.websiteUrl && (
              <a
                href={selected.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent-brand)] hover:underline"
              >
                {t("viewWebsite")}
                <ExternalLink aria-hidden className="size-3.5" />
              </a>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-foreground/55">{t("selectHint")}</p>
            <ul className="space-y-1.5">
              {partners.map((partner) => (
                <li key={partner.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(partner.id)}
                    className="text-left text-sm text-foreground/85 transition-colors hover:text-[var(--accent-brand)]"
                  >
                    {partner.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>
    </div>
  );
}
