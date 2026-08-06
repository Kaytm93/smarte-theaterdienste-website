import { ImageIcon } from "@sanity/icons/Image";
import { defineField, defineType } from "sanity";

import {
  hasGermanLocalizedValue,
  recommendEnglish,
} from "../shared/localized-validation";

export const imageWithMetadata = defineType({
  name: "imageWithMetadata",
  title: "Bild mit Metadaten",
  type: "object",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "image",
      title: "Bilddatei",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "decorative",
      title: "Rein dekoratives Bild",
      description:
        "Nur aktivieren, wenn das Bild keinerlei Information transportiert.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "alt",
      title: "Alternativtext",
      type: "internationalizedArrayString",
      hidden: ({ parent }) =>
        Boolean((parent as { decorative?: boolean } | undefined)?.decorative),
      validation: (rule) => [
        rule.custom((value, context) =>
          (context.parent as { decorative?: boolean } | undefined)?.decorative ||
          hasGermanLocalizedValue(value)
            ? true
            : "Für informative Bilder ist ein deutscher Alternativtext erforderlich.",
        ),
        rule
          .custom((value, context) =>
            (context.parent as { decorative?: boolean } | undefined)?.decorative
              ? true
              : recommendEnglish(value),
          )
          .warning(),
      ],
    }),
    defineField({
      name: "credit",
      title: "Bildnachweis",
      type: "string",
      validation: (rule) =>
        rule.custom((value) =>
          value?.trim()
            ? true
            : "Bildnachweis prüfen und ergänzen, sofern erforderlich.",
        ).warning(),
    }),
    defineField({
      name: "caption",
      title: "Bildunterschrift",
      type: "internationalizedArrayText",
    }),
  ],
  preview: {
    select: {
      media: "image",
      title: "credit",
    },
    prepare({ media, title }) {
      return {
        media,
        title: title || "Bild ohne hinterlegten Nachweis",
      };
    },
  },
});
