import { UsersIcon } from "@sanity/icons/Users";
import { defineArrayMember, defineField, defineType } from "sanity";

import {
  recommendEnglish,
  requireGerman,
  requireLocalizedTokens,
} from "../../shared/localized-validation";

export const teamPage = defineType({
  name: "teamPage",
  title: "Teamseite",
  description: "Seiteneinstieg, Personenreihenfolge und zugängliche Fallback-Texte.",
  type: "document",
  icon: UsersIcon,
  groups: [
    { name: "content", title: "Inhalt", default: true },
    { name: "ui", title: "Bild- und Fallback-Texte" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "intro", title: "Seiteneinstieg", type: "pageIntro", group: "content", validation: (rule) => rule.required() }),
    defineField({
      name: "people",
      title: "Personen",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "reference", to: [{ type: "person" }] })],
      validation: (rule) => rule.required().min(1).unique(),
    }),
    defineField({
      name: "portraitFallback",
      title: "Hinweis bei fehlendem Portrait",
      type: "internationalizedArrayString",
      group: "ui",
      validation: (rule) => [
        rule.required().custom(requireGerman),
        rule.custom(recommendEnglish).warning(),
      ],
    }),
    defineField({
      name: "stageAltTemplate",
      title: "Alternativtext-Vorlage für Bühnenfotos",
      description: "Muss {name} enthalten.",
      type: "internationalizedArrayString",
      group: "ui",
      validation: (rule) => [
        rule.required().custom(requireGerman),
        rule.custom(recommendEnglish).warning(),
        rule.custom(requireLocalizedTokens(["{name}"])),
      ],
    }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  preview: {
    prepare() {
      return { title: "Teamseite", subtitle: "Feste Seite" };
    },
  },
});
