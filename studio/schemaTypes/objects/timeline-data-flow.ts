import { CalendarIcon } from "@sanity/icons/Calendar";
import { DashboardIcon } from "@sanity/icons/Dashboard";
import { EarthGlobeIcon } from "@sanity/icons/EarthGlobe";
import { defineArrayMember, defineField, defineType, type Rule } from "sanity";

import {
  germanString,
  recommendEnglish,
  recommendEnglishWhenPresent,
  requireGerman,
  requireGermanWhenPresent,
  requireLocalizedTokens,
} from "../shared/localized-validation";
import { uniqueSourceKeys } from "../shared/validation";

const requiredLocalized = (rule: Rule) => [
  rule.required().custom(requireGerman),
  rule.custom(recommendEnglish).warning(),
];

const optionalLocalized = (rule: Rule) => [
  rule.custom(requireGermanWhenPresent),
  rule.custom(recommendEnglishWhenPresent).warning(),
];

export const journeyStation = defineType({
  name: "journeyStation",
  title: "Reisestation",
  type: "object",
  icon: EarthGlobeIcon,
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
      name: "tag",
      title: "Etappe",
      type: "internationalizedArrayString",
      validation: requiredLocalized,
    }),
    defineField({
      name: "phase",
      title: "Phase",
      type: "internationalizedArrayString",
      validation: requiredLocalized,
    }),
    defineField({
      name: "title",
      title: "Titel",
      type: "internationalizedArrayString",
      validation: requiredLocalized,
    }),
    defineField({
      name: "body",
      title: "Beschreibung",
      type: "internationalizedArrayText",
      validation: requiredLocalized,
    }),
    defineField({
      name: "chips",
      title: "Fachbegriffe",
      type: "array",
      of: [defineArrayMember({ type: "localizedListItem" })],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "phase" },
    prepare({ title, subtitle }) {
      return { title: germanString(title) || "Reisestation", subtitle: germanString(subtitle) };
    },
  },
});

export const journeySection = defineType({
  name: "journeySection",
  title: "Spielplan-Reise",
  type: "object",
  icon: EarthGlobeIcon,
  fields: [
    defineField({
      name: "heading",
      title: "Überschrift",
      type: "internationalizedArrayString",
      validation: requiredLocalized,
    }),
    defineField({
      name: "lead",
      title: "Einleitung",
      type: "internationalizedArrayText",
      validation: requiredLocalized,
    }),
    defineField({
      name: "selectionHint",
      title: "Auswahlhinweis",
      type: "internationalizedArrayString",
      validation: requiredLocalized,
    }),
    defineField({
      name: "previousLabel",
      title: "Zurück-Schaltfläche",
      type: "internationalizedArrayString",
      validation: requiredLocalized,
    }),
    defineField({
      name: "nextLabel",
      title: "Weiter-Schaltfläche",
      type: "internationalizedArrayString",
      validation: requiredLocalized,
    }),
    defineField({
      name: "progressLabel",
      title: "Fortschrittsvorlage",
      description: "Muss {current} und {total} enthalten.",
      type: "internationalizedArrayString",
      validation: (rule) => [
        ...requiredLocalized(rule),
        rule.custom(requireLocalizedTokens(["{current}", "{total}"])),
      ],
    }),
    defineField({
      name: "stations",
      title: "Stationen",
      type: "array",
      of: [defineArrayMember({ type: "journeyStation" })],
      validation: (rule) => rule.required().min(1).custom(uniqueSourceKeys),
    }),
  ],
  preview: {
    select: { title: "heading", stations: "stations" },
    prepare({ title, stations }) {
      return {
        title: germanString(title) || "Spielplan-Reise",
        subtitle: `${Array.isArray(stations) ? stations.length : 0} Stationen`,
      };
    },
  },
});

export const timelineSection = defineType({
  name: "timelineSection",
  title: "Projekt-Zeitstrahl",
  type: "object",
  icon: CalendarIcon,
  fields: [
    defineField({
      name: "heading",
      title: "Abschnittsüberschrift",
      type: "sectionHeading",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "locationLabel",
      title: "Ortsbezeichnung",
      type: "internationalizedArrayString",
      validation: requiredLocalized,
    }),
    defineField({
      name: "sourceLabel",
      title: "Linkbezeichnung",
      type: "internationalizedArrayString",
      validation: requiredLocalized,
    }),
    defineField({
      name: "journey",
      title: "Spielplan-Reise",
      type: "journeySection",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "heading.heading" },
    prepare({ title }) {
      return { title: germanString(title) || "Projekt-Zeitstrahl" };
    },
  },
});

export const dataFlowItem = defineType({
  name: "dataFlowItem",
  title: "Datenfluss-Eintrag",
  type: "object",
  icon: DashboardIcon,
  fields: [
    defineField({
      name: "label",
      title: "Bezeichnung",
      type: "internationalizedArrayString",
      validation: requiredLocalized,
    }),
    defineField({
      name: "format",
      title: "Format / Standard",
      type: "internationalizedArrayString",
      validation: optionalLocalized,
    }),
    defineField({
      name: "channelKind",
      title: "Kanalart",
      type: "string",
      options: {
        layout: "radio",
        list: [
          { title: "Allgemeiner Kanal", value: "standard" },
          { title: "ORIF / Datenraum Kultur", value: "orif" },
        ],
      },
      initialValue: "standard",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "format" },
    prepare({ title, subtitle }) {
      return { title: germanString(title) || "Datenfluss", subtitle: germanString(subtitle) };
    },
  },
});

export const dataFlowStage = defineType({
  name: "dataFlowStage",
  title: "Datenfluss-Stufe",
  type: "object",
  icon: DashboardIcon,
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
      name: "heading",
      title: "Überschrift",
      type: "internationalizedArrayString",
      validation: requiredLocalized,
    }),
    defineField({
      name: "subheading",
      title: "Einordnung",
      type: "internationalizedArrayString",
      validation: requiredLocalized,
    }),
    defineField({
      name: "items",
      title: "Einträge",
      type: "array",
      of: [defineArrayMember({ type: "dataFlowItem" })],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "heading", subtitle: "subheading" },
    prepare({ title, subtitle }) {
      return { title: germanString(title) || "Datenfluss-Stufe", subtitle: germanString(subtitle) };
    },
  },
});

export const dataFlowSection = defineType({
  name: "dataFlowSection",
  title: "Datenfluss",
  type: "object",
  icon: DashboardIcon,
  fields: [
    defineField({
      name: "heading",
      title: "Abschnittsüberschrift",
      type: "sectionHeading",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "stages",
      title: "Stufen",
      type: "array",
      of: [defineArrayMember({ type: "dataFlowStage" })],
      validation: (rule) => rule.required().min(1).custom(uniqueSourceKeys),
    }),
    defineField({
      name: "caption",
      title: "Quellenhinweis",
      type: "internationalizedArrayText",
      validation: requiredLocalized,
    }),
  ],
  preview: {
    select: { title: "heading.heading", stages: "stages" },
    prepare({ title, stages }) {
      return {
        title: germanString(title) || "Datenfluss",
        subtitle: `${Array.isArray(stages) ? stages.length : 0} Stufen`,
      };
    },
  },
});
