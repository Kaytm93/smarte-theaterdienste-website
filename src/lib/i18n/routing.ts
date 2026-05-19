import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["de", "en"],
  defaultLocale: "de",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/ansprechpersonen": {
      de: "/ansprechpersonen",
      en: "/contact-persons",
    },
    "/termine": {
      de: "/termine",
      en: "/events",
    },
    "/konzeption": {
      de: "/konzeption",
      en: "/concept",
    },
    "/konzeption/technische-standards": {
      de: "/konzeption/technische-standards",
      en: "/concept/technical-standards",
    },
    "/konzeption/semantische-standards": {
      de: "/konzeption/semantische-standards",
      en: "/concept/semantic-standards",
    },
    "/jetzt-mitmachen": {
      de: "/jetzt-mitmachen",
      en: "/join",
    },
    "/jetzt-mitmachen/anwendungsbeispiele": {
      de: "/jetzt-mitmachen/anwendungsbeispiele",
      en: "/join/use-cases",
    },
    "/jetzt-mitmachen/mitwirkung": {
      de: "/jetzt-mitmachen/mitwirkung",
      en: "/join/contribute",
    },
    "/materialien": {
      de: "/materialien",
      en: "/materials",
    },
    "/blog": "/blog",
    "/blog/[slug]": "/blog/[slug]",
    "/faq": "/faq",
    "/impressum": {
      de: "/impressum",
      en: "/imprint",
    },
    "/datenschutz": {
      de: "/datenschutz",
      en: "/privacy",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
