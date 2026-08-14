import { HelpCircleIcon } from "@sanity/icons/HelpCircle";
import { defineField, defineType } from "sanity";

import {
  recommendEnglish,
  requireGerman,
  requireLocalizedTokens,
} from "../../shared/localized-validation";

export const faqPage = defineType({
  name: "faqPage",
  title: "FAQ-Seite",
  description: "Seiteneinstieg, Kategorienavigation, Statistik und Suchoberfläche.",
  type: "document",
  icon: HelpCircleIcon,
  groups: [
    { name: "content", title: "Inhalt", default: true },
    { name: "search", title: "Suche & Leerzustand" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "intro", title: "Seiteneinstieg", type: "pageIntro", group: "content", validation: (rule) => rule.required() }),
    defineField({
      name: "navigationLabel",
      title: "Kategorienavigation",
      type: "internationalizedArrayString",
      group: "content",
      validation: (rule) => [
        rule.required().custom(requireGerman),
        rule.custom(recommendEnglish).warning(),
      ],
    }),
    defineField({
      name: "statsTemplate",
      title: "Statistik-Vorlage",
      description: "Muss {total} und {categories} enthalten.",
      type: "internationalizedArrayString",
      group: "content",
      validation: (rule) => [
        rule.required().custom(requireGerman),
        rule.custom(recommendEnglish).warning(),
        rule.custom(requireLocalizedTokens(["{total}", "{categories}"])),
      ],
    }),
    defineField({ name: "search", title: "FAQ-Suche", type: "faqSearchCopy", group: "search", validation: (rule) => rule.required() }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  preview: {
    prepare() {
      return { title: "FAQ-Seite", subtitle: "Feste Seite" };
    },
  },
});
