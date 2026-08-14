import { ComposeIcon } from "@sanity/icons/Compose";
import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { ListIcon } from "@sanity/icons/List";
import { NumberIcon } from "@sanity/icons/Number";
import { SparklesIcon } from "@sanity/icons/Sparkles";
import { defineArrayMember, defineField, defineType, type Rule } from "sanity";

import {
  germanString,
  recommendEnglish,
  recommendEnglishWhenPresent,
  requireGerman,
  requireGermanWhenPresent,
} from "../shared/localized-validation";
import { uniqueSourceKeys } from "../shared/validation";

const FEATURE_ICONS = [
  { title: "Funkeln / Automatisierung", value: "sparkles" },
  { title: "Megafon / Kommunikation", value: "megaphone" },
  { title: "Personengruppe / Netzwerk", value: "users" },
  { title: "Gebäude / Theaterleitung", value: "building" },
  { title: "Archiv", value: "archive" },
  { title: "Code / Entwicklung", value: "code" },
  { title: "Aktentasche / Beruf", value: "briefcase" },
] as const;

const featureIconValues = new Set(FEATURE_ICONS.map(({ value }) => value));

const requiredLocalized = (rule: Rule) => [
  rule.required().custom(requireGerman),
  rule.custom(recommendEnglish).warning(),
];

const optionalLocalized = (rule: Rule) => [
  rule.custom(requireGermanWhenPresent),
  rule.custom(recommendEnglishWhenPresent).warning(),
];

export const sectionHeading = defineType({
  name: "sectionHeading",
  title: "Abschnittsüberschrift",
  type: "object",
  icon: ComposeIcon,
  fields: [
    defineField({
      name: "eyebrow",
      title: "Rubrikzeile",
      type: "internationalizedArrayString",
      validation: requiredLocalized,
    }),
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
      validation: optionalLocalized,
    }),
  ],
  preview: {
    select: { title: "heading", subtitle: "eyebrow" },
    prepare({ title, subtitle }) {
      return {
        title: germanString(title) || "Abschnitt",
        subtitle: germanString(subtitle),
      };
    },
  },
});

export const textSection = defineType({
  name: "textSection",
  title: "Textabschnitt",
  type: "object",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "eyebrow",
      title: "Rubrikzeile",
      type: "internationalizedArrayString",
      validation: requiredLocalized,
    }),
    defineField({
      name: "heading",
      title: "Überschrift",
      type: "internationalizedArrayString",
      validation: requiredLocalized,
    }),
    defineField({
      name: "body",
      title: "Inhalt",
      type: "internationalizedArrayPortableText",
      validation: requiredLocalized,
    }),
    defineField({
      name: "image",
      title: "Optionales Abschnittsbild",
      type: "imageWithMetadata",
    }),
  ],
  preview: {
    select: { title: "heading", subtitle: "eyebrow", media: "image.image" },
    prepare({ title, subtitle, media }) {
      return {
        title: germanString(title) || "Textabschnitt",
        subtitle: germanString(subtitle),
        media,
      };
    },
  },
});

export const featureItem = defineType({
  name: "featureItem",
  title: "Nutzen / Anwendungsfall",
  type: "object",
  icon: SparklesIcon,
  fields: [
    defineField({
      name: "sourceKey",
      title: "Fachlicher Schlüssel",
      description: "Stabile fachliche Identität; unabhängig von der Symbolwahl.",
      type: "string",
      validation: (rule) =>
        rule.required().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
          name: "Fachschlüssel",
        }),
    }),
    defineField({
      name: "icon",
      title: "Symbol",
      description:
        "Optional für Abschnitte mit sichtbaren Piktogrammen; die Auswahl entspricht den unterstützten Frontend-Symbolen.",
      type: "string",
      options: { list: [...FEATURE_ICONS] },
      validation: (rule) =>
        rule.custom((value) =>
          !value || featureIconValues.has(value as (typeof FEATURE_ICONS)[number]["value"])
            ? true
            : "Dieses Symbol wird vom Frontend nicht unterstützt.",
        ),
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
  ],
  preview: {
    select: { title: "title", sourceKey: "sourceKey", icon: "icon" },
    prepare({ title, sourceKey, icon }) {
      return {
        title: germanString(title) || "Eintrag",
        subtitle: [sourceKey, icon].filter(Boolean).join(" · "),
      };
    },
  },
});

export const featureSection = defineType({
  name: "featureSection",
  title: "Nutzenabschnitt",
  type: "object",
  icon: SparklesIcon,
  fields: [
    defineField({
      name: "heading",
      title: "Abschnittsüberschrift",
      type: "sectionHeading",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "items",
      title: "Einträge",
      type: "array",
      of: [defineArrayMember({ type: "featureItem" })],
      validation: (rule) => rule.required().min(1).custom(uniqueSourceKeys),
    }),
  ],
  preview: {
    select: { title: "heading.heading", items: "items" },
    prepare({ title, items }) {
      return {
        title: germanString(title) || "Nutzenabschnitt",
        subtitle: `${Array.isArray(items) ? items.length : 0} Einträge`,
      };
    },
  },
});

export const localizedListItem = defineType({
  name: "localizedListItem",
  title: "Listeneintrag",
  type: "object",
  icon: ListIcon,
  fields: [
    defineField({
      name: "text",
      title: "Text",
      type: "internationalizedArrayString",
      validation: requiredLocalized,
    }),
  ],
  preview: {
    select: { title: "text" },
    prepare({ title }) {
      return { title: germanString(title) || "Listeneintrag" };
    },
  },
});

export const numberedStep = defineType({
  name: "numberedStep",
  title: "Schritt",
  type: "object",
  icon: NumberIcon,
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
  ],
  preview: {
    select: { title: "title", subtitle: "sourceKey" },
    prepare({ title, subtitle }) {
      return { title: germanString(title) || "Schritt", subtitle };
    },
  },
});

export const implementationSection = defineType({
  name: "implementationSection",
  title: "Umsetzungscheckliste",
  type: "object",
  icon: ListIcon,
  fields: [
    defineField({
      name: "heading",
      title: "Abschnittsüberschrift",
      type: "sectionHeading",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Einordnung",
      type: "internationalizedArrayText",
      validation: requiredLocalized,
    }),
    defineField({
      name: "items",
      title: "Prüfpunkte",
      type: "array",
      of: [defineArrayMember({ type: "localizedListItem" })],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "heading.heading", items: "items" },
    prepare({ title, items }) {
      return {
        title: germanString(title) || "Umsetzungscheckliste",
        subtitle: `${Array.isArray(items) ? items.length : 0} Prüfpunkte`,
      };
    },
  },
});

export const quoteItem = defineType({
  name: "quoteItem",
  title: "Zitat",
  type: "object",
  icon: ComposeIcon,
  fields: [
    defineField({
      name: "body",
      title: "Zitat",
      type: "internationalizedArrayText",
      validation: requiredLocalized,
    }),
    defineField({
      name: "source",
      title: "Quelle / Person",
      type: "internationalizedArrayString",
      validation: requiredLocalized,
    }),
    defineField({
      name: "role",
      title: "Rolle / Organisation",
      type: "internationalizedArrayString",
      validation: optionalLocalized,
    }),
  ],
  preview: {
    select: { title: "source", subtitle: "role" },
    prepare({ title, subtitle }) {
      return {
        title: germanString(title) || "Zitat",
        subtitle: germanString(subtitle),
      };
    },
  },
});

export const quoteSection = defineType({
  name: "quoteSection",
  title: "Zitatabschnitt",
  type: "object",
  icon: ComposeIcon,
  fields: [
    defineField({
      name: "heading",
      title: "Abschnittsüberschrift",
      type: "sectionHeading",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "items",
      title: "Zitate",
      type: "array",
      of: [defineArrayMember({ type: "quoteItem" })],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: "heading.heading", items: "items" },
    prepare({ title, items }) {
      return {
        title: germanString(title) || "Zitatabschnitt",
        subtitle: `${Array.isArray(items) ? items.length : 0} Zitate`,
      };
    },
  },
});
