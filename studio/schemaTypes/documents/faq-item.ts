import { HelpCircleIcon } from "@sanity/icons/HelpCircle";
import { defineField, defineType } from "sanity";

import {
  recommendEnglish,
  requireGerman,
} from "../shared/localized-validation";

export const faqItem = defineType({
  name: "faqItem",
  title: "FAQ-Eintrag",
  type: "document",
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: "sourceKey",
      title: "Migrationsschlüssel",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "legacyId",
      title: "Historische Supabase-ID",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "question",
      title: "Frage",
      type: "internationalizedArrayString",
      validation: (rule) => [
        rule.custom(requireGerman),
        rule.custom(recommendEnglish).warning(),
      ],
    }),
    defineField({
      name: "answer",
      title: "Antwort",
      type: "internationalizedArrayPortableText",
      validation: (rule) => [
        rule.custom(requireGerman),
        rule.custom(recommendEnglish).warning(),
      ],
    }),
    defineField({
      name: "category",
      title: "Kategorie",
      type: "reference",
      to: [{ type: "faqCategory" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Reihenfolge",
      type: "number",
      validation: (rule) => rule.required().integer().min(0),
    }),
  ],
  preview: {
    select: { question: "question", category: "category.label", order: "order" },
    prepare({ question, category, order }) {
      const localized = (value: unknown) =>
        Array.isArray(value)
          ? value.find((item) => item?.language === "de")?.value
          : undefined;
      return {
        title: localized(question) || "FAQ-Eintrag",
        subtitle: `${localized(category) || "Ohne Kategorie"} · ${order ?? "–"}`,
      };
    },
  },
});
