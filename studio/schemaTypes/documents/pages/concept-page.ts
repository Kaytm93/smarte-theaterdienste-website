import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { defineArrayMember, defineField, defineType } from "sanity";

export const conceptPage = defineType({
  name: "conceptPage",
  title: "Konzeption",
  description: "Projektbeschreibung, Zeitstrahl, Spielplan-Reise und Team-Verweis.",
  type: "document",
  icon: DocumentTextIcon,
  groups: [
    { name: "content", title: "Inhalt", default: true },
    { name: "timeline", title: "Zeitstrahl & Reise" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "intro", title: "Seiteneinstieg", type: "pageIntro", group: "content", validation: (rule) => rule.required() }),
    defineField({
      name: "sections",
      title: "Projektabschnitte",
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
    defineField({ name: "timeline", title: "Zeitstrahl & Spielplan-Reise", type: "timelineSection", group: "timeline", validation: (rule) => rule.required() }),
    defineField({
      name: "teamPage",
      title: "Wiederverwendete Teamsektion",
      description: "Verwendet Seiteneinstieg und Reihenfolge aus der zentralen Teamseite.",
      type: "reference",
      group: "content",
      to: [{ type: "teamPage" }],
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  preview: {
    prepare() {
      return { title: "Konzeption", subtitle: "Feste Seite" };
    },
  },
});
