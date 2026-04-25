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
    "/projekt": {
      de: "/projekt",
      en: "/project",
    },
    "/projekt/technische-standards": {
      de: "/projekt/technische-standards",
      en: "/project/technical-standards",
    },
    "/projekt/semantische-standards": {
      de: "/projekt/semantische-standards",
      en: "/project/semantic-standards",
    },
    "/beteiligung": {
      de: "/beteiligung",
      en: "/participation",
    },
    "/beteiligung/anwendungsbeispiele": {
      de: "/beteiligung/anwendungsbeispiele",
      en: "/participation/use-cases",
    },
    "/beteiligung/mitwirkung": {
      de: "/beteiligung/mitwirkung",
      en: "/participation/contribute",
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
