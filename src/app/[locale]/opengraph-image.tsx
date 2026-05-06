import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing, type Locale } from "@/lib/i18n/routing";

export const alt = "Smarte Theaterdienste";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ACCENT = "#2660d8";
const BACKGROUND = "#0b0f1a";
const FOREGROUND = "#f5f7fb";

const KICKER_BY_LOCALE: Record<Locale, string> = {
  de: "Datenraum Kultur · Use Case 3",
  en: "Cultural Data Space · Use Case 3",
};

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: Locale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;
  const t = await getTranslations({ locale: safeLocale, namespace: "meta" });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: `linear-gradient(135deg, ${BACKGROUND} 0%, #14213d 100%)`,
          color: FOREGROUND,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: 24,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: ACCENT,
          }}
        >
          <span
            style={{
              display: "flex",
              width: 14,
              height: 14,
              borderRadius: 9999,
              background: ACCENT,
            }}
          />
          {KICKER_BY_LOCALE[safeLocale]}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            {t("siteName")}
          </div>
          <div
            style={{
              fontSize: 32,
              lineHeight: 1.35,
              maxWidth: 920,
              color: "rgba(245,247,251,0.78)",
            }}
          >
            {t("siteDescription")}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "rgba(245,247,251,0.55)",
          }}
        >
          <span>smarte-theaterdienste.de</span>
          <span style={{ textTransform: "uppercase", letterSpacing: "0.18em" }}>
            {safeLocale}
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
