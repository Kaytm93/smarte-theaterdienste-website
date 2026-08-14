import { HelpCircleIcon } from "@sanity/icons/HelpCircle";
import {
  defineField,
  defineType,
  getPublishedId,
  type ValidationContext,
} from "sanity";

import {
  recommendEnglish,
  requireGerman,
} from "../shared/localized-validation";

type CategoryReference = {
  _ref?: string;
};

async function uniqueOrderWithinCategory(
  value: unknown,
  context: ValidationContext,
): Promise<true | string> {
  const categoryId = (context.document?.category as CategoryReference | undefined)?._ref;
  if (typeof value !== "number" || !context.document?._id || !categoryId) return true;

  const publishedId = getPublishedId(context.document._id);
  const publishedCategoryId = getPublishedId(categoryId);

  try {
    const isUnique = await context
      .getClient({ apiVersion: "2026-08-01" })
      .fetch<boolean>(
        `!defined(*[
          _type == "faqItem" &&
          category._ref in *[sanity::versionOf($publishedCategoryId)]._id &&
          order == $order &&
          !sanity::versionOf($publishedId)
        ][0]._id)`,
        { publishedCategoryId, order: value, publishedId },
      );

    return isUnique
      ? true
      : "Diese Position wird in der gewählten Kategorie bereits verwendet.";
  } catch {
    return "Die Reihenfolge konnte nicht geprüft werden. Bitte Verbindung prüfen und erneut versuchen.";
  }
}

export const faqItem = defineType({
  name: "faqItem",
  title: "FAQ-Eintrag",
  type: "document",
  icon: HelpCircleIcon,
  groups: [
    { name: "content", title: "Frage & Antwort", default: true },
    { name: "organization", title: "Kategorie & Reihenfolge" },
    { name: "technical", title: "Technik & Migration" },
  ],
  fields: [
    defineField({
      name: "sourceKey",
      title: "Migrationsschlüssel",
      type: "string",
      readOnly: true,
      group: "technical",
    }),
    defineField({
      name: "legacyId",
      title: "Historische Supabase-ID",
      type: "string",
      readOnly: true,
      group: "technical",
    }),
    defineField({
      name: "question",
      title: "Frage",
      type: "internationalizedArrayString",
      group: "content",
      validation: (rule) => [
        rule.required().custom(requireGerman),
        rule.custom(recommendEnglish).warning(),
      ],
    }),
    defineField({
      name: "answer",
      title: "Antwort",
      type: "internationalizedArrayPortableText",
      group: "content",
      validation: (rule) => [
        rule.required().custom(requireGerman),
        rule.custom(recommendEnglish).warning(),
      ],
    }),
    defineField({
      name: "category",
      title: "Kategorie",
      type: "reference",
      group: "organization",
      to: [{ type: "faqCategory" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Reihenfolge",
      type: "number",
      group: "organization",
      validation: (rule) =>
        rule.required().integer().min(0).custom(uniqueOrderWithinCategory),
    }),
  ],
  orderings: [
    {
      title: "Redaktionelle Reihenfolge",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
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
