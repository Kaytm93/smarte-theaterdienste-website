import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { defineArrayMember, defineField, defineType } from "sanity";

import { uniqueSourceKeys } from "../../shared/validation";

export const useCasesPage = defineType({
  name: "useCasesPage",
  title: "Anwendungsbeispiele",
  description: "Fachlich benannte Einsatzfelder maschinenlesbarer Spielpläne.",
  type: "document",
  icon: DocumentTextIcon,
  groups: [
    { name: "content", title: "Inhalt", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "intro", title: "Seiteneinstieg", type: "pageIntro", group: "content", validation: (rule) => rule.required() }),
    defineField({
      name: "useCases",
      title: "Anwendungsfälle",
      description: "Reihenfolge ist redaktionell; fachliche Identität und Symbol werden getrennt gepflegt.",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "featureItem" })],
      validation: (rule) => rule.required().min(1).custom(uniqueSourceKeys),
    }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  preview: {
    prepare() {
      return { title: "Anwendungsbeispiele", subtitle: "Feste Seite" };
    },
  },
});
