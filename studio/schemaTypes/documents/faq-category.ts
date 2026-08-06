import { FolderIcon } from "@sanity/icons/Folder";
import { defineField, defineType } from "sanity";

import {
  recommendEnglish,
  requireGerman,
} from "../shared/localized-validation";

export const faqCategory = defineType({
  name: "faqCategory",
  title: "FAQ-Kategorie",
  type: "document",
  icon: FolderIcon,
  fields: [
    defineField({
      name: "sourceKey",
      title: "Stabiler Schlüssel",
      description: "Kleinbuchstaben, Ziffern und Bindestriche; bleibt dauerhaft stabil.",
      type: "string",
      validation: (rule) =>
        rule.required().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
          name: "stabiler Schlüssel",
          invert: false,
        }),
    }),
    defineField({
      name: "label",
      title: "Bezeichnung",
      type: "internationalizedArrayString",
      validation: (rule) => [
        rule.custom(requireGerman),
        rule.custom(recommendEnglish).warning(),
      ],
    }),
    defineField({
      name: "order",
      title: "Reihenfolge",
      type: "number",
      validation: (rule) => rule.required().integer().min(0),
    }),
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
