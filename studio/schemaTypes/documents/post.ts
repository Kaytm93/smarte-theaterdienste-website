import { ComposeIcon } from "@sanity/icons/Compose";
import { defineField, defineType } from "sanity";

import {
  recommendEnglish,
  recommendEnglishWhenPresent,
  requireGerman,
  requireGermanWhenPresent,
} from "../shared/localized-validation";

export const post = defineType({
  name: "post",
  title: "Beitrag",
  type: "document",
  icon: ComposeIcon,
  groups: [
    { name: "content", title: "Inhalt", default: true },
    { name: "publication", title: "Veröffentlichung" },
    { name: "media", title: "Titelbild" },
    { name: "seo", title: "SEO" },
    { name: "technical", title: "Technik & Migration" },
  ],
  fields: [
    defineField({
      name: "sourceKey",
      title: "Migrationsschlüssel",
      type: "string",
      readOnly: true,
      group: "technical",
    }),
    defineField({
      name: "legacyId",
      title: "Historische Supabase-ID",
      type: "string",
      readOnly: true,
      group: "technical",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "technical",
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
      group: "content",
      validation: (rule) => [
        rule.required().custom(requireGerman),
        rule.custom(recommendEnglish).warning(),
      ],
    }),
    defineField({
      name: "excerpt",
      title: "Kurztext",
      type: "internationalizedArrayText",
      group: "content",
      validation: (rule) => [
        rule.custom(requireGermanWhenPresent),
        rule.custom(recommendEnglishWhenPresent).warning(),
      ],
    }),
    defineField({
      name: "body",
      title: "Inhalt",
      type: "internationalizedArrayPortableText",
      group: "content",
      validation: (rule) => [
        rule.required().custom(requireGerman),
        rule.custom(recommendEnglish).warning(),
      ],
    }),
    defineField({
      name: "status",
      title: "Redaktioneller Status",
      description:
        "Sanity-Drafts steuern unveröffentlichte Änderungen; dieser Status bewahrt zusätzlich Archiv- und Migrationszustand.",
      type: "string",
      group: "publication",
      options: {
        layout: "radio",
        list: [
          { title: "Entwurf", value: "draft" },
          { title: "Zur Veröffentlichung freigegeben", value: "published" },
          { title: "Archiviert", value: "archived" },
        ],
      },
      initialValue: "draft",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Veröffentlichungsdatum",
      type: "datetime",
      group: "publication",
      validation: (rule) =>
        rule.custom((value, context) =>
          (context.document?.status as string | undefined) === "published" && !value
            ? "Freigegebene Beiträge benötigen ein Veröffentlichungsdatum."
            : true,
        ),
    }),
    defineField({ name: "cover", title: "Titelbild", type: "imageWithMetadata", group: "media" }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  orderings: [
    {
      title: "Neueste zuerst",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", date: "publishedAt", media: "cover.image", status: "status" },
    prepare({ title, date, media, status }) {
      const germanTitle = Array.isArray(title)
        ? title.find((item) => item?.language === "de")?.value
        : undefined;
      const labels: Record<string, string> = {
        draft: "Entwurf",
        published: "Freigegeben",
        archived: "Archiviert",
      };
      return {
        title: germanTitle || "Beitrag",
        subtitle: [labels[status] || status, date?.slice?.(0, 10)]
          .filter(Boolean)
          .join(" · "),
        media,
      };
    },
  },
});
