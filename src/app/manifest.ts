import type { MetadataRoute } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/lib/i18n/routing";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const t = await getTranslations({
    locale: routing.defaultLocale,
    namespace: "meta",
  });
  const name = t("siteName");
  const description = t("siteDescription");

  return {
    name,
    short_name: name,
    description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2660d8",
    lang: routing.defaultLocale,
    dir: "ltr",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
    ],
  };
}
