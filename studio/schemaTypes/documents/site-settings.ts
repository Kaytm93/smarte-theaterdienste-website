import { CogIcon } from "@sanity/icons/Cog";
import { defineArrayMember, defineField, defineType } from "sanity";

import {
  recommendEnglish,
  requireGerman,
} from "../shared/localized-validation";
import { uniqueNavigationItems } from "../shared/validation";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Website-Einstellungen",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "general", title: "Allgemein", default: true },
    { name: "navigation", title: "Navigation" },
    { name: "footer", title: "Footer" },
    { name: "ui", title: "Systemtexte" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "siteName",
      title: "Website-Name",
      type: "internationalizedArrayString",
      group: "general",
      validation: (rule) => [
        rule.required().custom(requireGerman),
        rule.custom(recommendEnglish).warning(),
      ],
    }),
    defineField({
      name: "siteDescription",
      title: "Globale Kurzbeschreibung",
      type: "internationalizedArrayText",
      group: "general",
      validation: (rule) => [
        rule.required().custom(requireGerman),
        rule.custom(recommendEnglish).warning(),
      ],
    }),
    defineField({
      name: "navigation",
      title: "Seiten-Navigation",
      description: "Ein Eintrag kann in Kopfzeile, Footer oder beiden Bereichen erscheinen.",
      type: "array",
      group: "navigation",
      of: [defineArrayMember({ type: "navigationItem" })],
      validation: (rule) => rule.required().min(1).custom(uniqueNavigationItems),
    }),
    defineField({
      name: "menuLabel",
      title: "Menü-Bezeichnung",
      type: "internationalizedArrayString",
      group: "navigation",
      validation: (rule) => [
        rule.required().custom(requireGerman),
        rule.custom(recommendEnglish).warning(),
      ],
    }),
    defineField({
      name: "menuDescription",
      title: "Zugängliche Menü-Beschreibung",
      type: "internationalizedArrayString",
      group: "navigation",
      validation: (rule) => [
        rule.required().custom(requireGerman),
        rule.custom(recommendEnglish).warning(),
      ],
    }),
    defineField({
      name: "languageSwitcher",
      title: "Sprachwechsel",
      type: "languageSwitcherCopy",
      group: "navigation",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "footer",
      title: "Footer",
      type: "footerCopy",
      group: "footer",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "comingSoon",
      title: "Allgemeiner In-Vorbereitung-Zustand",
      description: "Vor Migration redaktionell prüfen; der Alttext erwähnt noch eine Datenbank.",
      type: "comingSoonCopy",
      group: "ui",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "postUi",
      title: "Beiträge / Blog",
      description: "Detailseiten-Texte plus bewusst bewahrte Copy für eine mögliche Übersicht.",
      type: "postUiCopy",
      group: "ui",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "eventUi",
      title: "Termine",
      description: "Bewahrt die UI-Copy; die frühere Terminübersicht leitet aktuell zur Konzeption um.",
      type: "eventUiCopy",
      group: "ui",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "defaultSeo",
      title: "SEO-Standardwerte",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Website-Einstellungen", subtitle: "Singleton" };
    },
  },
});
