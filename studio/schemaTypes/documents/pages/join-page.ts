import { UsersIcon } from "@sanity/icons/Users";
import { defineArrayMember, defineField, defineType } from "sanity";

export const joinPage = defineType({
  name: "joinPage",
  title: "Jetzt mitmachen",
  description: "Beteiligungs-Pitch, Netzwerkkarte und Einstiege in die nächsten Schritte.",
  type: "document",
  icon: UsersIcon,
  groups: [
    { name: "content", title: "Inhalt", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "intro", title: "Seiteneinstieg", type: "pageIntro", group: "content", validation: (rule) => rule.required() }),
    defineField({
      name: "sections",
      title: "Pitch-Abschnitte",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "textSection" })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({ name: "networkMap", title: "DACH-Netzwerkkarte", type: "mapEmbedCopy", group: "content", validation: (rule) => rule.required() }),
    defineField({
      name: "links",
      title: "Nächste Schritte",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "internalOrExternalLink" })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  preview: {
    prepare() {
      return { title: "Jetzt mitmachen", subtitle: "Feste Seite" };
    },
  },
});
