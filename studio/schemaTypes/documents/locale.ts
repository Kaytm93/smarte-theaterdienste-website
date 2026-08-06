import { TranslateIcon } from "@sanity/icons/Translate";
import { defineField, defineType } from "sanity";

export const locale = defineType({
  name: "locale",
  title: "Sprache",
  type: "document",
  icon: TranslateIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tag",
      title: "Sprach-Tag",
      description: "IETF-Sprach-Tag, aktuell de oder en.",
      type: "string",
      options: {
        list: [
          { title: "Deutsch", value: "de" },
          { title: "English", value: "en" },
        ],
      },
      validation: (rule) => rule.required().lowercase().regex(/^(de|en)$/),
    }),
    defineField({
      name: "isDefault",
      title: "Basissprache",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "fallback",
      title: "Fallback-Sprache",
      type: "reference",
      to: [{ type: "locale" }],
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "tag" },
  },
});
