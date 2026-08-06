import { UserIcon } from "@sanity/icons/User";
import { defineField, defineType } from "sanity";

import {
  recommendEnglish,
  requireGerman,
} from "../shared/localized-validation";

export const person = defineType({
  name: "person",
  title: "Person",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "sourceKey",
      title: "Migrationsschlüssel",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Rolle",
      type: "internationalizedArrayString",
      validation: (rule) => [
        rule.custom(requireGerman),
        rule.custom(recommendEnglish).warning(),
      ],
    }),
    defineField({
      name: "portrait",
      title: "Portrait",
      type: "imageWithMetadata",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "stageImage",
      title: "Bühnenfoto für Hover",
      type: "imageWithMetadata",
    }),
    defineField({
      name: "quote",
      title: "Optionales Zitat",
      type: "internationalizedArrayText",
    }),
  ],
  preview: {
    select: { title: "name", media: "portrait.image", role: "role" },
    prepare({ title, media, role }) {
      const subtitle = Array.isArray(role)
        ? role.find((item) => item?.language === "de")?.value
        : undefined;
      return { title, subtitle, media };
    },
  },
});
