import { WrenchIcon } from "@sanity/icons/Wrench";
import { defineArrayMember, defineField, defineType } from "sanity";

export const technicalStandardsPage = defineType({
  name: "technicalStandardsPage",
  title: "Technische Standards",
  description: "ORIF, Datenfluss, Video, Comic und technische Materialien.",
  type: "document",
  icon: WrenchIcon,
  groups: [
    { name: "content", title: "Inhalt", default: true },
    { name: "media", title: "Medien & Datenfluss" },
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
    defineField({ name: "dataFlow", title: "Datenfluss", type: "dataFlowSection", group: "media", validation: (rule) => rule.required() }),
    defineField({ name: "video", title: "Comic-Clip", type: "videoSection", group: "media", validation: (rule) => rule.required() }),
    defineField({ name: "comic", title: "Comic", type: "comicReferenceSection", group: "media", validation: (rule) => rule.required() }),
    defineField({ name: "resources", title: "Technische Materialien", type: "resourceSection", group: "content", validation: (rule) => rule.required() }),
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
      return { title: "Technische Standards", subtitle: "Feste Seite" };
    },
  },
});
