import { LinkIcon } from "@sanity/icons/Link";
import { defineArrayMember, defineField, defineType } from "sanity";

import { germanString } from "../shared/localized-validation";

export const resourcePlacement = defineType({
  name: "resourcePlacement",
  title: "Material-Verweis",
  description:
    "Verweist auf ein zentral gepflegtes Material. Overrides gelten pro Sprache und fallen sonst auf das Material derselben Sprache zurück.",
  type: "object",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "resource",
      title: "Material",
      type: "reference",
      to: [{ type: "resource" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "titleOverride",
      title: "Optionaler Titel nur auf dieser Seite",
      type: "internationalizedArrayString",
    }),
    defineField({
      name: "bodyOverride",
      title: "Optionale Beschreibung nur auf dieser Seite",
      type: "internationalizedArrayText",
    }),
    defineField({
      name: "labelOverride",
      title: "Optionale Linkbeschriftung nur auf dieser Seite",
      type: "internationalizedArrayString",
    }),
  ],
  preview: {
    select: {
      titleOverride: "titleOverride",
      resourceTitle: "resource.title",
      subtitle: "resource.sourceKey",
    },
    prepare({ titleOverride, resourceTitle, subtitle }) {
      return {
        title:
          germanString(titleOverride) ||
          germanString(resourceTitle) ||
          "Material-Verweis",
        subtitle,
      };
    },
  },
});

export const resourceSection = defineType({
  name: "resourceSection",
  title: "Materialien & Werkzeuge",
  type: "object",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "heading",
      title: "Abschnittsüberschrift",
      type: "sectionHeading",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "items",
      title: "Materialien",
      type: "array",
      of: [defineArrayMember({ type: "resourcePlacement" })],
      validation: (rule) => rule.required().min(1).unique(),
    }),
  ],
  preview: {
    select: { title: "heading.heading", items: "items" },
    prepare({ title, items }) {
      return {
        title: germanString(title) || "Materialien & Werkzeuge",
        subtitle: `${Array.isArray(items) ? items.length : 0} Verweise`,
      };
    },
  },
});
