import type { Metadata } from "next";
import { getPathname } from "@/lib/i18n/navigation";
import { routing, type Locale } from "@/lib/i18n/routing";
import { getSiteUrl } from "./site";

type Pathnames = typeof routing.pathnames;
export type InternalHref = keyof Pathnames;

type DynamicHref = {
  pathname: InternalHref;
  params?: Record<string, string | number>;
};

export type AlternatesHref = InternalHref | DynamicHref;

export function buildAlternates(locale: Locale, href: AlternatesHref) {
  const site = getSiteUrl();
  const toAbs = (l: Locale) =>
    `${site}${getPathname({ locale: l, href: href as never })}`;

  return {
    canonical: toAbs(locale),
    languages: {
      de: toAbs("de"),
      en: toAbs("en"),
      "x-default": toAbs(routing.defaultLocale),
    },
  } as const;
}

export function pageMetadata(args: {
  locale: Locale;
  href: AlternatesHref;
  /** When set, replaces the layout's title.template (use absolute=true for the home page). */
  title?: string;
  titleAbsolute?: string;
  description?: string;
}): Metadata {
  const alternates = buildAlternates(args.locale, args.href);
  const ogTitle = args.titleAbsolute ?? args.title;
  return {
    ...(args.titleAbsolute
      ? { title: { absolute: args.titleAbsolute } }
      : args.title
        ? { title: args.title }
        : {}),
    description: args.description,
    alternates,
    openGraph: {
      type: "website",
      url: alternates.canonical,
      title: ogTitle,
      description: args.description,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: args.description,
    },
  };
}
