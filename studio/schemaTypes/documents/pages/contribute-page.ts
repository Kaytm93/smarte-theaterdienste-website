import { UsersIcon } from "@sanity/icons/Users";
import { defineArrayMember, defineField, defineType } from "sanity";

import { uniqueSourceKeys } from "../../shared/validation";

export const contributePage = defineType({
  name: "contributePage",
  title: "Mitwirkung",
  description: "Nutzen, Schritte, Checkliste, Zitat und Partnerkarte.",
  type: "document",
  icon: UsersIcon,
  groups: [
    { name: "content", title: "Inhalt", default: true },
    { name: "map", title: "Partnerkarte" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "intro", title: "Seiteneinstieg", type: "pageIntro", group: "content", validation: (rule) => rule.required() }),
    defineField({ name: "benefits", title: "Warum mitmachen?", type: "featureSection", group: "content", validation: (rule) => rule.required() }),
    defineField({
      name: "steps",
      title: "Schritte",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "numberedStep" })],
      validation: (rule) => rule.required().min(1).custom(uniqueSourceKeys),
    }),
    defineField({ name: "quote", title: "Stimme aus dem Netzwerk", type: "quoteItem", group: "content", validation: (rule) => rule.required() }),
    defineField({ name: "implementation", title: "Umsetzungscheckliste", type: "implementationSection", group: "content", validation: (rule) => rule.required() }),
    defineField({ name: "partnerMap", title: "Partnerkarte", type: "partnerMapCopy", group: "map", validation: (rule) => rule.required() }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  preview: {
    prepare() {
      return { title: "Mitwirkung", subtitle: "Feste Seite" };
    },
  },
});
