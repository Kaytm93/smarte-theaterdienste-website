import createMiddleware from "next-intl/middleware";
import { routing } from "./lib/i18n/routing";

export const proxy = createMiddleware(routing);

export const config = {
  // Exclude API routes, Next/Vercel internals, paths with a file extension
  // (sitemap.xml, robots.txt, ...), and root-level Metadata convention files
  // that must not be locale-prefixed (icon, apple-icon, opengraph-image,
  // twitter-image, manifest).
  matcher:
    "/((?!api|_next|_vercel|icon|apple-icon|opengraph-image|twitter-image|manifest|.*\\..*).*)",
};
