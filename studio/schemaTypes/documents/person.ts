import { UserIcon } from "@sanity/icons/User";
import { defineField, defineType } from "sanity";

import {
  recommendEnglish,
  recommendEnglishWhenPresent,
  requireGerman,
  requireGermanWhenPresent,
} from "../shared/localized-validation";

export const person = defineType({
  name: "person",
  title: "Person",
  type: "document",
  icon: UserIcon,
  groups: [
    { name: "content", title: "Person", default: true },
    { name: "media", title: "Bilder" },
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
      name: "name",
      title: "Name",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Rolle",
      type: "internationalizedArrayString",
      group: "content",
      validation: (rule) => [
        rule.required().custom(requireGerman),
        rule.custom(recommendEnglish).warning(),
      ],
    }),
    defineField({
      name: "portrait",
      title: "Portrait",
      type: "imageWithMetadata",
      group: "media",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "stageImage",
      title: "Bühnenfoto für Hover",
      type: "imageWithMetadata",
      group: "media",
    }),
    defineField({
      name: "quote",
      title: "Optionales Zitat",
      type: "internationalizedArrayText",
      group: "content",
      validation: (rule) => [
        rule.custom(requireGermanWhenPresent),
        rule.custom(recommendEnglishWhenPresent).warning(),
      ],
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
