import { MarkerIcon } from "@sanity/icons/Marker";
import { defineField, defineType } from "sanity";

export const partner = defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  icon: MarkerIcon,
  fields: [
    defineField({
      name: "sourceKey",
      title: "Migrationsschlüssel",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "coordinates",
      title: "Koordinaten",
      type: "geopoint",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "website",
      title: "Website",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({ name: "logo", title: "Logo", type: "imageWithMetadata" }),
  ],
  preview: {
    select: { title: "name", subtitle: "status", media: "logo.image" },
  },
});
