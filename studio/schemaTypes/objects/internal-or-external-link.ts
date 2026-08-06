import { LinkIcon } from "@sanity/icons/Link";
import { defineField, defineType } from "sanity";

import {
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
        rule.custom(requireGerman),
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
      name: "href",
      title: "Ziel",
      description:
        "Intern: /konzeption oder #zeitstrahl. Extern: vollständige HTTPS-Adresse.",
      type: "string",
      validation: (rule) =>
        rule.required().custom((href, context) => {
          const kind = (context.parent as { kind?: string } | undefined)?.kind;

          if (!href) return true;
          if (kind === "internal") {
            const isInternalTarget =
              (href.startsWith("/") && !href.startsWith("//")) ||
              href.startsWith("#");
            return isInternalTarget
              ? true
              : "Interne Ziele beginnen mit genau einem / oder mit #.";
          }

          try {
            const url = new URL(href);
            return url.protocol === "https:" || url.protocol === "http:"
              ? true
              : "Externe Ziele müssen HTTP(S)-Adressen sein.";
          } catch {
            return "Bitte eine vollständige externe URL eintragen.";
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
      href: "href",
    },
    prepare({ label, href }) {
      const germanLabel = Array.isArray(label)
        ? label.find((item) => item?.language === "de")?.value
        : undefined;

      return {
        title: germanLabel || href || "Link",
        subtitle: href,
      };
    },
  },
});
