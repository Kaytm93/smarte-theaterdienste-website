import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/lib/i18n/request.ts");

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co" },
      { protocol: "https", hostname: "images.unsplash.com" },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/lc7slax2/production/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
