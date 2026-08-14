import { CalendarIcon } from "@sanity/icons/Calendar";
import { ComposeIcon } from "@sanity/icons/Compose";
import { EarthGlobeIcon } from "@sanity/icons/EarthGlobe";
import { ImageIcon } from "@sanity/icons/Image";
import { LinkIcon } from "@sanity/icons/Link";
import { MenuIcon } from "@sanity/icons/Menu";
import { SearchIcon } from "@sanity/icons/Search";
import { defineArrayMember, defineField, defineType, type Rule } from "sanity";

import {
  germanString,
  recommendEnglish,
  requireGerman,
  requireLocalizedTokens,
} from "../shared/localized-validation";
import { uniqueSourceKeys } from "../shared/validation";

const requiredLocalized = (rule: Rule) => [
  rule.required().custom(requireGerman),
  rule.custom(recommendEnglish).warning(),
];

export const navigationItem = defineType({
  name: "navigationItem",
  title: "Navigationseintrag",
  type: "object",
  icon: MenuIcon,
  fields: [
    defineField({
      name: "sourceKey",
      title: "Stabiler Schlüssel",
      type: "string",
      validation: (rule) =>
        rule.required().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
          name: "stabiler Schlüssel",
        }),
    }),
    defineField({
      name: "label",
      title: "Beschriftung",
      type: "internationalizedArrayString",
      validation: requiredLocalized,
    }),
    defineField({
      name: "route",
      title: "Zielseite",
      description: "Die lokalisierten DE/EN-Pfade leitet das Frontend aus diesem Routen-Key ab.",
      type: "string",
      options: {
        list: [
          { title: "Konzeption", value: "/konzeption" },
          { title: "Jetzt mitmachen", value: "/jetzt-mitmachen" },
          { title: "Materialien", value: "/materialien" },
          { title: "FAQ", value: "/faq" },
          { title: "Team", value: "/team" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "placements",
      title: "Platzierung",
      type: "array",
      of: [
        defineArrayMember({
          type: "string",
          options: {
            list: [
              { title: "Kopfzeile", value: "header" },
              { title: "Footer", value: "footer" },
            ],
          },
        }),
      ],
      validation: (rule) => rule.required().min(1).unique(),
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "route" },
    prepare({ title, subtitle }) {
      return { title: germanString(title) || "Navigation", subtitle };
    },
  },
});

export const languageSwitcherCopy = defineType({
  name: "languageSwitcherCopy",
  title: "Sprachwechsel",
  type: "object",
  icon: EarthGlobeIcon,
  fields: [
    defineField({
      name: "labelTemplate",
      title: "Zugängliche Beschriftung",
      description: "Muss {target} enthalten.",
      type: "internationalizedArrayString",
      validation: (rule) => [
        ...requiredLocalized(rule),
        rule.custom(requireLocalizedTokens(["{target}"])),
      ],
    }),
    defineField({
      name: "germanLabel",
      title: "Sprachname Deutsch",
      type: "internationalizedArrayString",
      validation: requiredLocalized,
    }),
    defineField({
      name: "englishLabel",
      title: "Sprachname Englisch",
      type: "internationalizedArrayString",
      validation: requiredLocalized,
    }),
  ],
});

export const footerLogo = defineType({
  name: "footerLogo",
  title: "Footer-Logo",
  type: "object",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "sourceKey",
      title: "Stabiler Schlüssel",
      type: "string",
      validation: (rule) =>
        rule.required().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
          name: "stabiler Schlüssel",
        }),
    }),
    defineField({
      name: "image",
      title: "Logodatei",
      type: "image",
      options: { hotspot: false },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Alternativtext",
      type: "internationalizedArrayString",
      validation: requiredLocalized,
    }),
    defineField({
      name: "website",
      title: "Optionale Website",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
  ],
  preview: {
    select: { title: "alt", subtitle: "sourceKey", media: "image" },
    prepare({ title, subtitle, media }) {
      return { title: germanString(title) || "Logo", subtitle, media };
    },
  },
});

export const footerCopy = defineType({
  name: "footerCopy",
  title: "Footer",
  type: "object",
  icon: LinkIcon,
  fields: [
    defineField({ name: "imprintLabel", title: "Impressum", type: "internationalizedArrayString", validation: requiredLocalized }),
    defineField({ name: "privacyLabel", title: "Datenschutz", type: "internationalizedArrayString", validation: requiredLocalized }),
    defineField({ name: "supportedByLabel", title: "Förderhinweis", type: "internationalizedArrayString", validation: requiredLocalized }),
    defineField({ name: "sitemapLabel", title: "Sitemap", type: "internationalizedArrayString", validation: requiredLocalized }),
    defineField({ name: "rightsStatement", title: "Projekt-Hinweis", type: "internationalizedArrayString", validation: requiredLocalized }),
    defineField({
      name: "copyrightTemplate",
      title: "Copyright-Zeile",
      description: "Muss {year} enthalten.",
      type: "internationalizedArrayString",
      validation: (rule) => [
        ...requiredLocalized(rule),
        rule.custom(requireLocalizedTokens(["{year}"])),
      ],
    }),
    defineField({
      name: "logos",
      title: "Partner- und Förderlogos",
      type: "array",
      of: [defineArrayMember({ type: "footerLogo" })],
      validation: (rule) => rule.required().min(1).custom(uniqueSourceKeys),
    }),
  ],
});

export const emptyStateCopy = defineType({
  name: "emptyStateCopy",
  title: "Leerzustand",
  type: "object",
  icon: ComposeIcon,
  fields: [
    defineField({ name: "kicker", title: "Rubrikzeile", type: "internationalizedArrayString", validation: requiredLocalized }),
    defineField({ name: "title", title: "Überschrift", type: "internationalizedArrayString", validation: requiredLocalized }),
    defineField({ name: "body", title: "Erklärung", type: "internationalizedArrayText", validation: requiredLocalized }),
  ],
  preview: {
    select: { title: "title", subtitle: "kicker" },
    prepare({ title, subtitle }) {
      return { title: germanString(title) || "Leerzustand", subtitle: germanString(subtitle) };
    },
  },
});

export const comingSoonCopy = defineType({
  name: "comingSoonCopy",
  title: "In Vorbereitung",
  type: "object",
  icon: ComposeIcon,
  fields: [
    defineField({ name: "kicker", title: "Rubrikzeile", type: "internationalizedArrayString", validation: requiredLocalized }),
    defineField({ name: "title", title: "Überschrift", type: "internationalizedArrayString", validation: requiredLocalized }),
    defineField({ name: "body", title: "Erklärung", type: "internationalizedArrayText", validation: requiredLocalized }),
    defineField({ name: "backToHomeLabel", title: "Zurück-Link", type: "internationalizedArrayString", validation: requiredLocalized }),
  ],
});

export const postUiCopy = defineType({
  name: "postUiCopy",
  title: "Beitragsoberfläche",
  type: "object",
  icon: ComposeIcon,
  fields: [
    defineField({ name: "intro", title: "Übersichtsseite", type: "pageIntro", validation: (rule) => rule.required() }),
    defineField({ name: "readMoreLabel", title: "Weiterlesen", type: "internationalizedArrayString", validation: requiredLocalized }),
    defineField({ name: "publishedAtLabel", title: "Datumsbezeichnung", type: "internationalizedArrayString", validation: requiredLocalized }),
    defineField({ name: "backToListLabel", title: "Zurück zur Übersicht", type: "internationalizedArrayString", validation: requiredLocalized }),
    defineField({ name: "empty", title: "Leerzustand", type: "emptyStateCopy", validation: (rule) => rule.required() }),
  ],
});

export const eventUiCopy = defineType({
  name: "eventUiCopy",
  title: "Terminoberfläche",
  type: "object",
  icon: CalendarIcon,
  fields: [
    defineField({ name: "intro", title: "Übersichtsseite", type: "pageIntro", validation: (rule) => rule.required() }),
    defineField({ name: "upcomingHeading", title: "Bevorstehende Termine", type: "internationalizedArrayString", validation: requiredLocalized }),
    defineField({ name: "pastHeading", title: "Vergangene Termine", type: "internationalizedArrayString", validation: requiredLocalized }),
    defineField({ name: "registerLabel", title: "Anmeldung", type: "internationalizedArrayString", validation: requiredLocalized }),
    defineField({ name: "noUpcoming", title: "Keine kommenden Termine", type: "internationalizedArrayText", validation: requiredLocalized }),
    defineField({ name: "empty", title: "Leerzustand", type: "emptyStateCopy", validation: (rule) => rule.required() }),
  ],
});

export const faqSearchCopy = defineType({
  name: "faqSearchCopy",
  title: "FAQ-Suche",
  type: "object",
  icon: SearchIcon,
  fields: [
    defineField({ name: "label", title: "Suchfeld-Beschriftung", type: "internationalizedArrayString", validation: requiredLocalized }),
    defineField({ name: "placeholder", title: "Platzhalter", type: "internationalizedArrayString", validation: requiredLocalized }),
    defineField({ name: "clearLabel", title: "Suche löschen", type: "internationalizedArrayString", validation: requiredLocalized }),
    defineField({
      name: "resultsTemplate",
      title: "Treffer-Vorlage",
      description: "Muss {shown} und {total} enthalten.",
      type: "internationalizedArrayString",
      validation: (rule) => [
        ...requiredLocalized(rule),
        rule.custom(requireLocalizedTokens(["{shown}", "{total}"])),
      ],
    }),
    defineField({ name: "noResultsTitle", title: "Kein-Treffer-Titel", type: "internationalizedArrayString", validation: requiredLocalized }),
    defineField({
      name: "noResultsTemplate",
      title: "Kein-Treffer-Erklärung",
      description: "Muss {query} enthalten.",
      type: "internationalizedArrayText",
      validation: (rule) => [
        ...requiredLocalized(rule),
        rule.custom(requireLocalizedTokens(["{query}"])),
      ],
    }),
    defineField({ name: "resetLabel", title: "Suche zurücksetzen", type: "internationalizedArrayString", validation: requiredLocalized }),
  ],
});

export const partnerMapCopy = defineType({
  name: "partnerMapCopy",
  title: "Partnerkarte",
  type: "object",
  icon: EarthGlobeIcon,
  fields: [
    defineField({ name: "heading", title: "Überschrift", type: "internationalizedArrayString", validation: requiredLocalized }),
    defineField({ name: "lead", title: "Einleitung", type: "internationalizedArrayText", validation: requiredLocalized }),
    defineField({ name: "networkNote", title: "Netzwerk-Hinweis", type: "internationalizedArrayString", validation: requiredLocalized }),
    defineField({ name: "networkActionLabel", title: "Netzwerk-Link", type: "internationalizedArrayString", validation: requiredLocalized }),
    defineField({ name: "mapImageAlt", title: "Karten-Alternativtext", type: "internationalizedArrayString", validation: requiredLocalized }),
    defineField({ name: "statusLabel", title: "Statusbezeichnung", type: "internationalizedArrayString", validation: requiredLocalized }),
    defineField({ name: "partnerStatus", title: "Projektpartner", type: "internationalizedArrayString", validation: requiredLocalized }),
    defineField({ name: "pilotStatus", title: "Pilotinstitution", type: "internationalizedArrayString", validation: requiredLocalized }),
    defineField({ name: "interestedStatus", title: "Interessiert", type: "internationalizedArrayString", validation: requiredLocalized }),
    defineField({ name: "websiteLabel", title: "Website-Link", type: "internationalizedArrayString", validation: requiredLocalized }),
    defineField({ name: "noLocation", title: "Fehlender Standort", type: "internationalizedArrayString", validation: requiredLocalized }),
    defineField({ name: "empty", title: "Leere Karte", type: "internationalizedArrayText", validation: requiredLocalized }),
    defineField({ name: "selectionHint", title: "Auswahlhinweis", type: "internationalizedArrayString", validation: requiredLocalized }),
    defineField({ name: "locationSingular", title: "Ein Standort", type: "internationalizedArrayString", validation: requiredLocalized }),
    defineField({ name: "locationPlural", title: "Mehrere Standorte", type: "internationalizedArrayString", validation: requiredLocalized }),
    defineField({ name: "legendLabel", title: "Legende", type: "internationalizedArrayString", validation: requiredLocalized }),
  ],
});
