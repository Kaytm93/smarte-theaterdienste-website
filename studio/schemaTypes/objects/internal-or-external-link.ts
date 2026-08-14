import { LinkIcon } from "@sanity/icons/Link";
import { defineField, defineType } from "sanity";

import {
  germanString,
  recommendEnglish,
  requireGerman,
} from "../shared/localized-validation";

export const internalOrExternalLink = defineType({
  name: "internalOrExternalLink",
  title: "Link",
  type: "object",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "label",
      title: "Beschriftung",
      type: "internationalizedArrayString",
      validation: (rule) => [
        rule.required().custom(requireGerman),
        rule.custom(recommendEnglish).warning(),
      ],
    }),
    defineField({
      name: "kind",
      title: "Linkart",
      type: "string",
      options: {
        layout: "radio",
        list: [
          { title: "Interner Seiten-/Ankerlink", value: "internal" },
          { title: "Externe Website", value: "external" },
        ],
      },
      initialValue: "internal",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "internalTarget",
      title: "Interne Route / Anker",
      description: "Zum Beispiel /konzeption oder #zeitstrahl.",
      type: "string",
      hidden: ({ parent }) => parent?.kind !== "internal",
      validation: (rule) =>
        rule.custom((value, context) => {
          if ((context.parent as { kind?: string } | undefined)?.kind !== "internal") {
            return true;
          }
          if (!value) return "Für interne Links ist ein Ziel erforderlich.";
          return (value.startsWith("/") && !value.startsWith("//")) ||
            value.startsWith("#")
            ? true
            : "Interne Ziele beginnen mit genau einem / oder mit #.";
        }),
    }),
    defineField({
      name: "externalUrl",
      title: "Externe URL",
      type: "url",
      hidden: ({ parent }) => parent?.kind !== "external",
      validation: (rule) =>
        rule.custom((value, context) => {
          if ((context.parent as { kind?: string } | undefined)?.kind !== "external") {
            return true;
          }
          if (!value) return "Für externe Links ist eine URL erforderlich.";

          try {
            const url = new URL(value);
            return url.protocol === "http:" || url.protocol === "https:"
              ? true
              : "Externe URLs müssen mit http:// oder https:// beginnen.";
          } catch {
            return "Bitte eine vollständige externe URL eingeben.";
          }
        }),
    }),
    defineField({
      name: "openInNewTab",
      title: "In neuem Tab öffnen",
      type: "boolean",
      initialValue: false,
      hidden: ({ parent }) => parent?.kind !== "external",
    }),
  ],
  preview: {
    select: {
      label: "label",
      kind: "kind",
      internalTarget: "internalTarget",
      externalUrl: "externalUrl",
    },
    prepare({ label, kind, internalTarget, externalUrl }) {
      const target = kind === "external" ? externalUrl : internalTarget;

      return {
        title: germanString(label) || target || "Link",
        subtitle: target,
      };
    },
  },
});
