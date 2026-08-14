import { MarkerIcon } from "@sanity/icons/Marker";
import { defineField, defineType } from "sanity";

export const partner = defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  icon: MarkerIcon,
  groups: [
    { name: "content", title: "Partner", default: true },
    { name: "location", title: "Standort" },
    { name: "media", title: "Logo" },
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
      name: "name",
      title: "Name",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "technical",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        layout: "radio",
        list: [
          { title: "Projektpartner", value: "partner" },
          { title: "Pilotinstitution", value: "pilot" },
          { title: "Interessiert", value: "interested" },
        ],
      },
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "coordinates",
      title: "Koordinaten",
      type: "geopoint",
      description: "Optional; ohne Koordinaten erscheint der Partner in der Liste, aber nicht als Kartenpunkt.",
      group: "location",
    }),
    defineField({
      name: "website",
      title: "Website",
      type: "url",
      group: "content",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({ name: "logo", title: "Logo", type: "imageWithMetadata", group: "media" }),
  ],
  orderings: [
    {
      title: "Name A–Z",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", status: "status", media: "logo.image" },
    prepare({ title, status, media }) {
      const labels: Record<string, string> = {
        partner: "Projektpartner",
        pilot: "Pilotinstitution",
        interested: "Interessiert",
      };
      return { title, subtitle: labels[status] || status, media };
    },
  },
});
