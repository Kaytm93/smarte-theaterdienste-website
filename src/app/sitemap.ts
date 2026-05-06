import type { MetadataRoute } from "next";
import { getPathname } from "@/lib/i18n/navigation";
import { routing, type Locale } from "@/lib/i18n/routing";
import { getSiteUrl } from "@/lib/seo/site";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { listAllPostSlugs } from "@/lib/supabase/queries";

const STATIC_HREFS = [
  "/",
  "/ansprechpersonen",
  "/projekt",
  "/projekt/technische-standards",
  "/projekt/semantische-standards",
  "/beteiligung",
  "/beteiligung/anwendungsbeispiele",
  "/beteiligung/mitwirkung",
  "/blog",
  "/faq",
  "/termine",
  "/impressum",
  "/datenschutz",
] as const;

type StaticHref = (typeof STATIC_HREFS)[number];

function abs(site: string, locale: Locale, href: StaticHref) {
  return `${site}${getPathname({ locale, href })}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = getSiteUrl();
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_HREFS.flatMap((href) =>
    routing.locales.map((locale) => ({
      url: abs(site, locale, href),
      lastModified: now,
      changeFrequency: (href === "/blog"
        ? "weekly"
        : "monthly") as MetadataRoute.Sitemap[number]["changeFrequency"],
      priority: href === "/" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, abs(site, l, href)]),
        ),
      },
    })),
  );

  const postEntries: MetadataRoute.Sitemap = [];
  if (isSupabaseConfigured()) {
    const slugs = await listAllPostSlugs();
    for (const slug of slugs) {
      for (const locale of routing.locales) {
        postEntries.push({
          url: `${site}/${locale}/blog/${slug}`,
          lastModified: now,
          changeFrequency: "monthly",
          priority: 0.6,
          alternates: {
            languages: Object.fromEntries(
              routing.locales.map((l) => [l, `${site}/${l}/blog/${slug}`]),
            ),
          },
        });
      }
    }
  }

  return [...staticEntries, ...postEntries];
}
