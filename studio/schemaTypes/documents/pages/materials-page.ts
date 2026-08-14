import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { defineArrayMember, defineField, defineType } from "sanity";

export const materialsPage = defineType({
  name: "materialsPage",
  title: "Materialien",
  description: "Geordnete Auswahl zentral gepflegter Werkzeuge und Folge-Links.",
  type: "document",
  icon: DocumentTextIcon,
  groups: [
    { name: "content", title: "Inhalt", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "intro", title: "Seiteneinstieg", type: "pageIntro", group: "content", validation: (rule) => rule.required() }),
    defineField({ name: "resources", title: "Materialien & Werkzeuge", type: "resourceSection", group: "content", validation: (rule) => rule.required() }),
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
      return { title: "Materialien", subtitle: "Feste Seite" };
    },
  },
});
