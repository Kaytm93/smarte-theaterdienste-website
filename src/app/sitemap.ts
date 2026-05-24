import type { MetadataRoute } from "next";
import { getPathname } from "@/lib/i18n/navigation";
import { routing, type Locale } from "@/lib/i18n/routing";
import { getSiteUrl } from "@/lib/seo/site";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { listPublishedPostSitemapEntries } from "@/lib/supabase/queries";

const STATIC_HREFS = [
  "/",
  "/team",
  "/konzeption",
  "/konzeption/technische-standards",
  "/konzeption/semantische-standards",
  "/jetzt-mitmachen",
  "/jetzt-mitmachen/anwendungsbeispiele",
  "/jetzt-mitmachen/mitwirkung",
  "/materialien",
  "/faq",
  "/impressum",
  "/datenschutz",
] as const;

type StaticHref = (typeof STATIC_HREFS)[number];

const STATIC_CONTENT_LAST_MODIFIED = "2026-05-07T00:00:00.000Z";

function abs(site: string, locale: Locale, href: StaticHref) {
  return `${site}${getPathname({ locale, href })}`;
}

function absBlogPost(site: string, locale: Locale, slug: string) {
  return `${site}${getPathname({
    locale,
    href: { pathname: "/blog/[slug]", params: { slug } } as never,
  })}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = getSiteUrl();
  const posts = isSupabaseConfigured()
    ? await listPublishedPostSitemapEntries()
    : [];

  const staticEntries: MetadataRoute.Sitemap = STATIC_HREFS.flatMap((href) =>
    routing.locales.map((locale) => ({
      url: abs(site, locale, href),
      lastModified: STATIC_CONTENT_LAST_MODIFIED,
      changeFrequency: "monthly" as MetadataRoute.Sitemap[number]["changeFrequency"],
      priority: href === "/" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, abs(site, l, href)]),
        ),
      },
    })),
  );

  const postEntries: MetadataRoute.Sitemap = [];
  for (const post of posts) {
    for (const locale of routing.locales) {
      postEntries.push({
        url: absBlogPost(site, locale, post.slug),
        lastModified: post.publishedAt ?? STATIC_CONTENT_LAST_MODIFIED,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [
              l,
              absBlogPost(site, l, post.slug),
            ]),
          ),
        },
      });
    }
  }

  return [...staticEntries, ...postEntries];
}
