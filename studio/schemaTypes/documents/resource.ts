import { LinkIcon } from "@sanity/icons/Link";
import { defineField, defineType } from "sanity";

import {
  germanString,
  recommendEnglish,
  requireGerman,
} from "../shared/localized-validation";
import { uniqueDocumentSourceKey } from "../shared/validation";

export const resource = defineType({
  name: "resource",
  title: "Material / Werkzeug",
  type: "document",
  icon: LinkIcon,
  groups: [
    { name: "content", title: "Inhalt", default: true },
    { name: "technical", title: "Technik & Migration" },
  ],
  fields: [
    defineField({
      name: "sourceKey",
      title: "Stabiler Schlüssel",
      description:
        "Für Import und Referenzen. Muss dauerhaft stabil und dokumentweit eindeutig bleiben.",
      type: "string",
      group: "technical",
      validation: (rule) =>
        rule
          .required()
          .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
            name: "stabiler Schlüssel",
          })
          .custom(uniqueDocumentSourceKey),
    }),
    defineField({
      name: "title",
      title: "Titel",
      type: "internationalizedArrayString",
      group: "content",
      validation: (rule) => [
        rule.required().custom(requireGerman),
        rule.custom(recommendEnglish).warning(),
      ],
    }),
    defineField({
      name: "body",
      title: "Beschreibung",
      type: "internationalizedArrayText",
      group: "content",
      validation: (rule) => [
        rule.required().custom(requireGerman),
        rule.custom(recommendEnglish).warning(),
      ],
    }),
    defineField({
      name: "link",
      title: "Ziel & Beschriftung",
      type: "internalOrExternalLink",
      group: "content",
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Titel A–Z",
      name: "titleAsc",
      by: [{ field: "sourceKey", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "sourceKey" },
    prepare({ title, subtitle }) {
      return { title: germanString(title) || "Material", subtitle };
    },
  },
});
