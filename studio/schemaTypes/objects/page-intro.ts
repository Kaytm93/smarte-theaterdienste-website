import { defineField, defineType } from "sanity";

import {
  recommendEnglish,
  requireGerman,
} from "../shared/localized-validation";

export const pageIntro = defineType({
  name: "pageIntro",
  title: "Seiteneinstieg",
  type: "object",
  fields: [
    defineField({
      name: "kicker",
      title: "Rubrikzeile",
      type: "internationalizedArrayString",
      validation: (rule) => [
        rule.custom(requireGerman),
        rule.custom(recommendEnglish).warning(),
      ],
    }),
    defineField({
      name: "title",
      title: "Überschrift",
      type: "internationalizedArrayString",
      validation: (rule) => [
        rule.custom(requireGerman),
        rule.custom(recommendEnglish).warning(),
      ],
    }),
    defineField({
      name: "lead",
      title: "Einleitung",
      type: "internationalizedArrayText",
      validation: (rule) => [
        rule.custom(requireGerman),
        rule.custom(recommendEnglish).warning(),
      ],
    }),
  ],
});
