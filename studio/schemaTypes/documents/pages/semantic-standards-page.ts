import { ControlsIcon } from "@sanity/icons/Controls";
import { defineArrayMember, defineField, defineType } from "sanity";

export const semanticStandardsPage = defineType({
  name: "semanticStandardsPage",
  title: "Semantische Standards",
  description: "Datenmodell, gemeinsame Vokabulare und weiterführende Verweise.",
  type: "document",
  icon: ControlsIcon,
  groups: [
    { name: "content", title: "Inhalt", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "intro", title: "Seiteneinstieg", type: "pageIntro", group: "content", validation: (rule) => rule.required() }),
    defineField({
      name: "sections",
      title: "Fachabschnitte",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "textSection" })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "links",
      title: "Weiterführende Seiten",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "internalOrExternalLink" })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  preview: {
    prepare() {
      return { title: "Semantische Standards", subtitle: "Feste Seite" };
    },
  },
});
