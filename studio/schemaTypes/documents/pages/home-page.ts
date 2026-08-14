import { HomeIcon } from "@sanity/icons/Home";
import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Startseite",
  description: "Hero, Nutzen, Netzwerk, Medien, Stimmen und Projekt-Pitch.",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "content", title: "Inhalt", default: true },
    { name: "media", title: "Medien" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "hero", title: "Hero", type: "homeHero", group: "content", validation: (rule) => rule.required() }),
    defineField({ name: "benefits", title: "Hauptnutzen", type: "featureSection", group: "content", validation: (rule) => rule.required() }),
    defineField({ name: "video", title: "Image-Video", type: "videoSection", group: "media", validation: (rule) => rule.required() }),
    defineField({ name: "network", title: "DACH-Netzwerk", type: "networkSection", group: "content", validation: (rule) => rule.required() }),
    defineField({ name: "comic", title: "Comic", type: "comicReferenceSection", group: "media", validation: (rule) => rule.required() }),
    defineField({ name: "stakeholders", title: "Nutzen nach Zielgruppe", type: "featureSection", group: "content", validation: (rule) => rule.required() }),
    defineField({ name: "quotes", title: "Stimmen aus dem Netzwerk", type: "quoteSection", group: "content", validation: (rule) => rule.required() }),
    defineField({ name: "pitch", title: "Projekt-Pitch", type: "textSection", group: "content", validation: (rule) => rule.required() }),
    defineField({ name: "trust", title: "Projekt-Absender", type: "brandLockup", group: "media", validation: (rule) => rule.required() }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  preview: {
    prepare() {
      return { title: "Startseite", subtitle: "Feste Seite" };
    },
  },
});
