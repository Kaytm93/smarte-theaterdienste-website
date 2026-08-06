import { CalendarIcon } from "@sanity/icons/Calendar";
import { defineField, defineType } from "sanity";

import {
  recommendEnglish,
  requireGerman,
} from "../shared/localized-validation";

export const event = defineType({
  name: "event",
  title: "Termin",
  type: "document",
  icon: CalendarIcon,
  fields: [
    defineField({
      name: "sourceKey",
      title: "Migrationsschlüssel",
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
      name: "description",
      title: "Beschreibung",
      type: "internationalizedArrayPortableText",
      validation: (rule) => [
        rule.custom(requireGerman),
        rule.custom(recommendEnglish).warning(),
      ],
    }),
    defineField({
      name: "startsAt",
      title: "Beginn",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "endsAt",
      title: "Ende",
      type: "datetime",
      validation: (rule) =>
        rule.min(rule.valueOfField("startsAt")).warning("Das Ende liegt vor dem Beginn."),
    }),
    defineField({
      name: "location",
      title: "Ort",
      type: "string",
    }),
    defineField({
      name: "registrationUrl",
      title: "Anmeldung / weitere Informationen",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        layout: "radio",
        list: [
          { title: "Bevorstehend", value: "upcoming" },
          { title: "Vergangen", value: "past" },
          { title: "Abgesagt", value: "cancelled" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "image", title: "Bild", type: "imageWithMetadata" }),
  ],
  preview: {
    select: { title: "title", date: "startsAt", media: "image.image", status: "status" },
    prepare({ title, date, media, status }) {
      const germanTitle = Array.isArray(title)
        ? title.find((item) => item?.language === "de")?.value
        : undefined;
      return {
        title: germanTitle || "Termin",
        subtitle: [date?.slice?.(0, 10), status].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
