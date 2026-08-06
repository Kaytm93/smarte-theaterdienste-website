import { CogIcon } from "@sanity/icons/Cog";
import { defineArrayMember, defineField, defineType } from "sanity";

import {
  recommendEnglish,
  requireGerman,
} from "../shared/localized-validation";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Website-Einstellungen",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "siteName",
      title: "Website-Name",
      type: "internationalizedArrayString",
      validation: (rule) => [
        rule.custom(requireGerman),
        rule.custom(recommendEnglish).warning(),
      ],
    }),
    defineField({
      name: "siteDescription",
      title: "Globale Kurzbeschreibung",
      type: "internationalizedArrayText",
      validation: (rule) => [
        rule.custom(requireGerman),
        rule.custom(recommendEnglish).warning(),
      ],
    }),
    defineField({
      name: "navigation",
      title: "Hauptnavigation",
      type: "array",
      of: [
        defineArrayMember({
          name: "navigationItem",
          title: "Navigationseintrag",
          type: "object",
          fields: [
            defineField({
              name: "key",
              title: "Stabiler Schlüssel",
              type: "slug",
              options: { source: "href", maxLength: 80 },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "label",
              title: "Beschriftung",
              type: "internationalizedArrayString",
              validation: (rule) => [
                rule.custom(requireGerman),
                rule.custom(recommendEnglish).warning(),
              ],
            }),
            defineField({
              name: "href",
              title: "Interner Pfad",
              type: "string",
              validation: (rule) =>
                rule.required().custom((value) =>
                  value?.startsWith("/") && !value.startsWith("//")
                    ? true
                    : "Interne Pfade beginnen mit genau einem /.",
                ),
            }),
          ],
          preview: {
            select: { label: "label", subtitle: "href" },
            prepare({ label, subtitle }) {
              const title = Array.isArray(label)
                ? label.find((item) => item?.language === "de")?.value
                : undefined;
              return { title: title || subtitle, subtitle };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "footerCopyright",
      title: "Copyright-Zeile",
      type: "internationalizedArrayString",
      validation: (rule) => [
        rule.custom(requireGerman),
        rule.custom(recommendEnglish).warning(),
      ],
    }),
    defineField({
      name: "defaultSeo",
      title: "SEO-Standardwerte",
      type: "seo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Website-Einstellungen", subtitle: "Singleton" };
    },
  },
});
