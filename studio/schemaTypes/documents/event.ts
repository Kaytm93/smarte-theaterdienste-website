import { CalendarIcon } from "@sanity/icons/Calendar";
import { defineField, defineType } from "sanity";

import {
  recommendEnglish,
  recommendEnglishWhenPresent,
  requireGerman,
  requireGermanWhenPresent,
} from "../shared/localized-validation";

export const event = defineType({
  name: "event",
  title: "Termin",
  type: "document",
  icon: CalendarIcon,
  groups: [
    { name: "content", title: "Inhalt", default: true },
    { name: "schedule", title: "Zeit & Ort" },
    { name: "media", title: "Bild" },
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
      name: "description",
      title: "Beschreibung",
      type: "internationalizedArrayPortableText",
      group: "content",
      validation: (rule) => [
        rule.custom(requireGermanWhenPresent),
        rule.custom(recommendEnglishWhenPresent).warning(),
      ],
    }),
    defineField({
      name: "startsAt",
      title: "Beginn",
      type: "datetime",
      group: "schedule",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "endsAt",
      title: "Ende",
      type: "datetime",
      group: "schedule",
      validation: (rule) =>
        rule.min(rule.valueOfField("startsAt")).error("Das Ende darf nicht vor dem Beginn liegen."),
    }),
    defineField({
      name: "location",
      title: "Ort",
      type: "string",
      group: "schedule",
    }),
    defineField({
      name: "registrationUrl",
      title: "Anmeldung / weitere Informationen",
      type: "url",
      group: "schedule",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        layout: "radio",
        list: [
          { title: "Geplant / durchgeführt", value: "scheduled" },
          { title: "Abgesagt", value: "cancelled" },
        ],
      },
      initialValue: "scheduled",
      group: "schedule",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "image", title: "Bild", type: "imageWithMetadata", group: "media" }),
  ],
  orderings: [
    {
      title: "Neueste zuerst",
      name: "startsAtDesc",
      by: [{ field: "startsAt", direction: "desc" }],
    },
    {
      title: "Älteste zuerst",
      name: "startsAtAsc",
      by: [{ field: "startsAt", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", date: "startsAt", media: "image.image", status: "status" },
    prepare({ title, date, media, status }) {
      const germanTitle = Array.isArray(title)
        ? title.find((item) => item?.language === "de")?.value
        : undefined;
      return {
        title: germanTitle || "Termin",
        subtitle: [
          date?.slice?.(0, 10),
          status === "cancelled" ? "Abgesagt" : "Geplant / durchgeführt",
        ].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
