import { LockIcon } from "@sanity/icons/Lock";
import { defineField, defineType } from "sanity";

import {
  germanString,
  recommendEnglishWhenPresent,
  requireGerman,
  requireGermanWhenPresent,
} from "../shared/localized-validation";

export const legalPage = defineType({
  name: "legalPage",
  title: "Rechtliche Seite",
  type: "object",
  icon: LockIcon,
  fields: [
    defineField({
      name: "status",
      title: "Freigabestatus",
      type: "string",
      options: {
        layout: "radio",
        list: [
          { title: "Sichtbarer Platzhalter", value: "placeholder" },
          { title: "In Prüfung", value: "review" },
          { title: "Freigegeben", value: "approved" },
        ],
      },
      initialValue: "placeholder",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "intro",
      title: "Seiteneinstieg",
      type: "pageIntro",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Inhalt",
      type: "internationalizedArrayPortableText",
      validation: (rule) => [
        rule.custom((value, context) => {
          const status = (context.parent as { status?: string } | undefined)?.status;
          return status === "approved"
            ? requireGerman(value)
            : requireGermanWhenPresent(value);
        }),
        rule.custom(recommendEnglishWhenPresent).warning(),
      ],
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: {
    select: { title: "intro.title", subtitle: "status" },
    prepare({ title, subtitle }) {
      const statusLabels: Record<string, string> = {
        placeholder: "Platzhalter",
        review: "In Prüfung",
        approved: "Freigegeben",
      };
      return {
        title: germanString(title) || "Rechtliche Seite",
        subtitle: statusLabels[subtitle] || subtitle,
      };
    },
  },
});
