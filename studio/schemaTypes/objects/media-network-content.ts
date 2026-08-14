import { EarthGlobeIcon } from "@sanity/icons/EarthGlobe";
import { HomeIcon } from "@sanity/icons/Home";
import { ImageIcon } from "@sanity/icons/Image";
import { LinkIcon } from "@sanity/icons/Link";
import { PlayIcon } from "@sanity/icons/Play";
import { defineArrayMember, defineField, defineType, type Rule } from "sanity";

import {
  germanString,
  recommendEnglish,
  requireGerman,
} from "../shared/localized-validation";

const requiredLocalized = (rule: Rule) => [
  rule.required().custom(requireGerman),
  rule.custom(recommendEnglish).warning(),
];

export const homeHero = defineType({
  name: "homeHero",
  title: "Startseiten-Hero",
  type: "object",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "technologyLabel",
      title: "Technologiezeile",
      description: "Kurze fachliche Einordnung, aktuell Schema.org + GND + JSON = ORIF.",
      type: "internationalizedArrayString",
      validation: requiredLocalized,
    }),
    defineField({
      name: "title",
      title: "Hauptüberschrift",
      type: "internationalizedArrayString",
      validation: requiredLocalized,
    }),
    defineField({
      name: "summary",
      title: "Kurzbeschreibung",
      type: "internationalizedArrayText",
      validation: requiredLocalized,
    }),
    defineField({
      name: "primaryAction",
      title: "Primäre Aktion",
      type: "internalOrExternalLink",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "secondaryAction",
      title: "Sekundäre Aktion",
      type: "internalOrExternalLink",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Hero-Bild",
      type: "imageWithMetadata",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "technologyLabel", media: "image.image" },
    prepare({ title, subtitle, media }) {
      return {
        title: germanString(title) || "Startseiten-Hero",
        subtitle: germanString(subtitle),
        media,
      };
    },
  },
});

export const videoSection = defineType({
  name: "videoSection",
  title: "Videoabschnitt",
  type: "object",
  icon: PlayIcon,
  fields: [
    defineField({
      name: "heading",
      title: "Abschnittsüberschrift",
      type: "sectionHeading",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Einordnung",
      type: "internationalizedArrayText",
      validation: requiredLocalized,
    }),
    defineField({
      name: "youtubeId",
      title: "YouTube-ID",
      description: "Nur die Video-ID, nicht die vollständige URL.",
      type: "string",
      validation: (rule) =>
        rule.required().regex(/^[A-Za-z0-9_-]{11}$/, {
          name: "YouTube-ID",
        }),
    }),
    defineField({
      name: "accessibleTitle",
      title: "Zugänglicher Player-Titel",
      type: "internationalizedArrayString",
      validation: requiredLocalized,
    }),
  ],
  preview: {
    select: { title: "heading.heading", subtitle: "youtubeId" },
    prepare({ title, subtitle }) {
      return { title: germanString(title) || "Video", subtitle };
    },
  },
});

export const comicFrame = defineType({
  name: "comicFrame",
  title: "Comic-Frame",
  type: "object",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "sourceKey",
      title: "Fachlicher Schlüssel",
      type: "string",
      validation: (rule) =>
        rule.required().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
          name: "Fachschlüssel",
        }),
    }),
    defineField({
      name: "image",
      title: "Bild",
      type: "imageWithMetadata",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Titel",
      type: "internationalizedArrayString",
      validation: requiredLocalized,
    }),
    defineField({
      name: "caption",
      title: "Erklärung",
      type: "internationalizedArrayText",
      validation: requiredLocalized,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "sourceKey", media: "image.image" },
    prepare({ title, subtitle, media }) {
      return { title: germanString(title) || "Comic-Frame", subtitle, media };
    },
  },
});

export const comicReferenceSection = defineType({
  name: "comicReferenceSection",
  title: "Comicabschnitt",
  type: "object",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "heading",
      title: "Abschnittsüberschrift",
      type: "sectionHeading",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "comic",
      title: "Comic",
      type: "reference",
      to: [{ type: "comicStrip" }],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "heading.heading", subtitle: "comic.internalName" },
    prepare({ title, subtitle }) {
      return {
        title: germanString(title) || "Comicabschnitt",
        subtitle,
      };
    },
  },
});

export const brandLockup = defineType({
  name: "brandLockup",
  title: "Projekt-Absender",
  type: "object",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "label",
      title: "Einleitung",
      type: "internationalizedArrayString",
      validation: requiredLocalized,
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "imageWithMetadata",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "label", media: "logo.image" },
    prepare({ title, media }) {
      return { title: germanString(title) || "Projekt-Absender", media };
    },
  },
});

export const networkSegment = defineType({
  name: "networkSegment",
  title: "Netzwerksegment",
  type: "object",
  icon: EarthGlobeIcon,
  fields: [
    defineField({
      name: "value",
      title: "Anzahl",
      type: "number",
      validation: (rule) => rule.required().integer().min(0),
    }),
    defineField({
      name: "label",
      title: "Bezeichnung",
      type: "internationalizedArrayString",
      validation: requiredLocalized,
    }),
  ],
  preview: {
    select: { title: "label", value: "value" },
    prepare({ title, value }) {
      return { title: germanString(title) || "Netzwerksegment", subtitle: String(value ?? "–") };
    },
  },
});

export const networkSection = defineType({
  name: "networkSection",
  title: "Netzwerkabschnitt",
  type: "object",
  icon: EarthGlobeIcon,
  fields: [
    defineField({
      name: "heading",
      title: "Abschnittsüberschrift",
      type: "sectionHeading",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "total",
      title: "Gesamtzahl",
      type: "number",
      validation: (rule) =>
        rule
          .required()
          .integer()
          .min(0)
          .custom((value, context) => {
            const segments = (
              context.parent as { segments?: Array<{ value?: number }> } | undefined
            )?.segments;
            if (typeof value !== "number" || !Array.isArray(segments)) return true;

            const segmentValues = segments.map(({ value: segmentValue }) => segmentValue);
            if (segmentValues.some((segmentValue) => typeof segmentValue !== "number")) {
              return true;
            }

            const segmentTotal = segments.reduce(
              (sum, { value: segmentValue }) =>
                sum + (typeof segmentValue === "number" ? segmentValue : 0),
              0,
            );
            return segmentTotal === value
              ? true
              : `Die Gesamtzahl muss der Summe der Segmente entsprechen (${segmentTotal}).`;
          }),
    }),
    defineField({
      name: "totalLabel",
      title: "Beschreibung der Gesamtzahl",
      type: "internationalizedArrayString",
      validation: requiredLocalized,
    }),
    defineField({
      name: "mapTitle",
      title: "Zugänglicher Kartentitel",
      type: "internationalizedArrayString",
      validation: requiredLocalized,
    }),
    defineField({
      name: "mapCaption",
      title: "Kartenunterschrift",
      type: "internationalizedArrayString",
      validation: requiredLocalized,
    }),
    defineField({
      name: "segments",
      title: "Segmente",
      type: "array",
      of: [defineArrayMember({ type: "networkSegment" })],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "heading.heading", total: "total" },
    prepare({ title, total }) {
      return { title: germanString(title) || "Netzwerk", subtitle: `${total ?? 0} Institutionen` };
    },
  },
});

export const mapEmbedCopy = defineType({
  name: "mapEmbedCopy",
  title: "Netzwerkkarte",
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
      name: "caption",
      title: "Kartenbeschreibung",
      type: "internationalizedArrayText",
      validation: requiredLocalized,
    }),
    defineField({
      name: "accessibleTitle",
      title: "Zugänglicher Embed-Titel",
      type: "internationalizedArrayString",
      validation: requiredLocalized,
    }),
  ],
  preview: {
    select: { title: "heading.heading" },
    prepare({ title }) {
      return { title: germanString(title) || "Netzwerkkarte" };
    },
  },
});
