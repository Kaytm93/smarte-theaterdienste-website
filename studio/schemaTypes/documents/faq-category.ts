import { FolderIcon } from "@sanity/icons/Folder";
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
import { uniqueDocumentSourceKey } from "../shared/validation";

async function uniqueCategoryOrder(
  value: unknown,
  context: ValidationContext,
): Promise<true | string> {
  if (typeof value !== "number" || !context.document?._id) return true;

  const publishedId = getPublishedId(context.document._id);

  try {
    const isUnique = await context
      .getClient({ apiVersion: "2026-08-01" })
      .fetch<boolean>(
        `!defined(*[
          _type == "faqCategory" &&
          order == $order &&
          !sanity::versionOf($publishedId)
        ][0]._id)`,
        { order: value, publishedId },
      );

    return isUnique
      ? true
      : "Diese Position wird bereits von einer anderen FAQ-Kategorie verwendet.";
  } catch {
    return "Die Reihenfolge konnte nicht geprüft werden. Bitte Verbindung prüfen und erneut versuchen.";
  }
}

export const faqCategory = defineType({
  name: "faqCategory",
  title: "FAQ-Kategorie",
  type: "document",
  icon: FolderIcon,
  groups: [
    { name: "content", title: "Kategorie", default: true },
    { name: "technical", title: "Technik & Migration" },
  ],
  fields: [
    defineField({
      name: "sourceKey",
      title: "Stabiler Schlüssel",
      description: "Kleinbuchstaben, Ziffern und Bindestriche; bleibt dauerhaft stabil.",
      type: "string",
      group: "technical",
      validation: (rule) =>
        rule
          .required()
          .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
            name: "stabiler Schlüssel",
            invert: false,
          })
          .custom(uniqueDocumentSourceKey),
    }),
    defineField({
      name: "label",
      title: "Bezeichnung",
      type: "internationalizedArrayString",
      group: "content",
      validation: (rule) => [
        rule.required().custom(requireGerman),
        rule.custom(recommendEnglish).warning(),
      ],
    }),
    defineField({
      name: "order",
      title: "Reihenfolge",
      type: "number",
      group: "content",
      validation: (rule) =>
        rule.required().integer().min(0).custom(uniqueCategoryOrder),
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
    select: { label: "label", order: "order" },
    prepare({ label, order }) {
      const title = Array.isArray(label)
        ? label.find((item) => item?.language === "de")?.value
        : undefined;
      return { title: title || "FAQ-Kategorie", subtitle: `Position ${order ?? "–"}` };
    },
  },
});
