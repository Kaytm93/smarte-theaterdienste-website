import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/lib/i18n/request.ts");

const ROUTE_RENAMES: Array<{ from: string; to: string }> = [
  // Deutsch
  { from: "/de/projekt", to: "/de/konzeption" },
  { from: "/de/projekt/technische-standards", to: "/de/konzeption/technische-standards" },
  { from: "/de/projekt/semantische-standards", to: "/de/konzeption/semantische-standards" },
  { from: "/de/beteiligung", to: "/de/jetzt-mitmachen" },
  { from: "/de/beteiligung/anwendungsbeispiele", to: "/de/jetzt-mitmachen/anwendungsbeispiele" },
  { from: "/de/beteiligung/mitwirkung", to: "/de/jetzt-mitmachen/mitwirkung" },
  // English
  { from: "/en/project", to: "/en/concept" },
  { from: "/en/project/technical-standards", to: "/en/concept/technical-standards" },
  { from: "/en/project/semantic-standards", to: "/en/concept/semantic-standards" },
  { from: "/en/participation", to: "/en/join" },
  { from: "/en/participation/use-cases", to: "/en/join/use-cases" },
  { from: "/en/participation/contribute", to: "/en/join/contribute" },
];

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/lc7slax2/production/**",
      },
    ],
  },
  async redirects() {
    return ROUTE_RENAMES.map(({ from, to }) => ({
      source: from,
      destination: to,
      permanent: true,
    }));
  },
};

export default withNextIntl(nextConfig);
