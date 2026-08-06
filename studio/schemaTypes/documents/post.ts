import { ComposeIcon } from "@sanity/icons/Compose";
import { defineField, defineType } from "sanity";

import {
  recommendEnglish,
  requireGerman,
} from "../shared/localized-validation";

export const post = defineType({
  name: "post",
  title: "Beitrag",
  type: "document",
  icon: ComposeIcon,
  fields: [
    defineField({
      name: "sourceKey",
      title: "Migrationsschlüssel",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "legacyId",
      title: "Historische Supabase-ID",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: (document) => {
          const title = document.title;
          return Array.isArray(title)
            ? title.find((item) => item?.language === "de")?.value || ""
            : "";
        },
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Titel",
      type: "internationalizedArrayString",
      validation: (rule) => [
        rule.custom(requireGerman),
        rule.custom(recommendEnglish).warning(),
      ],
    }),
    defineField({
      name: "excerpt",
      title: "Kurztext",
      type: "internationalizedArrayText",
      validation: (rule) => [
        rule.custom(requireGerman),
        rule.custom(recommendEnglish).warning(),
      ],
    }),
    defineField({
      name: "body",
      title: "Inhalt",
      type: "internationalizedArrayPortableText",
      validation: (rule) => [
        rule.custom(requireGerman),
        rule.custom(recommendEnglish).warning(),
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Veröffentlichungsdatum",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "cover", title: "Titelbild", type: "imageWithMetadata" }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  orderings: [
    {
      title: "Neueste zuerst",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", date: "publishedAt", media: "cover.image" },
    prepare({ title, date, media }) {
      const germanTitle = Array.isArray(title)
        ? title.find((item) => item?.language === "de")?.value
        : undefined;
      return { title: germanTitle || "Beitrag", subtitle: date?.slice?.(0, 10), media };
    },
  },
});
