import { LockIcon } from "@sanity/icons/Lock";
import { defineField, defineType } from "sanity";

import {
  recommendEnglish,
  requireGerman,
} from "../shared/localized-validation";

export const legal = defineType({
  name: "legal",
  title: "Rechtstexte",
  type: "document",
  icon: LockIcon,
  fields: [
    defineField({
      name: "todo",
      title: "Noch nicht final freigegeben",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "imprint",
      title: "Impressum",
      type: "internationalizedArrayPortableText",
      validation: (rule) => [
        rule.custom(requireGerman),
        rule.custom(recommendEnglish).warning(),
      ],
    }),
    defineField({
      name: "privacy",
      title: "Datenschutz",
      type: "internationalizedArrayPortableText",
      validation: (rule) => [
        rule.custom(requireGerman),
        rule.custom(recommendEnglish).warning(),
      ],
    }),
  ],
  preview: {
    select: { todo: "todo" },
    prepare({ todo }) {
      return {
        title: "Rechtstexte",
        subtitle: todo ? "Entwurf / Auftraggeber-Freigabe fehlt" : "Freigegeben",
      };
    },
  },
});
