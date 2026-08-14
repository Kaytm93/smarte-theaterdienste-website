import { MasterDetailIcon } from "@sanity/icons/MasterDetail";
import { defineField, defineType } from "sanity";

import {
  germanString,
  recommendEnglish,
  requireGerman,
} from "../shared/localized-validation";

export const pageIntro = defineType({
  name: "pageIntro",
  title: "Seiteneinstieg",
  type: "object",
  icon: MasterDetailIcon,
  fields: [
    defineField({
      name: "kicker",
      title: "Rubrikzeile",
      type: "internationalizedArrayString",
      validation: (rule) => [
        rule.required().custom(requireGerman),
        rule.custom(recommendEnglish).warning(),
      ],
    }),
    defineField({
      name: "title",
      title: "Überschrift",
      type: "internationalizedArrayString",
      validation: (rule) => [
        rule.required().custom(requireGerman),
        rule.custom(recommendEnglish).warning(),
      ],
    }),
    defineField({
      name: "lead",
      title: "Einleitung",
      type: "internationalizedArrayText",
      validation: (rule) => [
        rule.required().custom(requireGerman),
        rule.custom(recommendEnglish).warning(),
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "kicker" },
    prepare({ title, subtitle }) {
      return {
        title: germanString(title) || "Seiteneinstieg",
        subtitle: germanString(subtitle),
      };
    },
  },
});
