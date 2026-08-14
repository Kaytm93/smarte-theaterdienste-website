import { ImageIcon } from "@sanity/icons/Image";
import { defineArrayMember, defineField, defineType } from "sanity";

import {
  uniqueDocumentSourceKey,
  uniqueSourceKeys,
} from "../shared/validation";

export const comicStrip = defineType({
  name: "comicStrip",
  title: "Comic",
  type: "document",
  icon: ImageIcon,
  groups: [
    { name: "content", title: "Frames", default: true },
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
      name: "internalName",
      title: "Interner Name",
      description: "Nur für die Studio-Navigation, nicht öffentlich sichtbar.",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "frames",
      title: "Frames",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "comicFrame" })],
      validation: (rule) => rule.required().min(1).custom(uniqueSourceKeys),
    }),
  ],
  preview: {
    select: { title: "internalName", subtitle: "sourceKey", media: "frames.0.image.image" },
  },
});
