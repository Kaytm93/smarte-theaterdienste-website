import { TranslateIcon } from "@sanity/icons/Translate";
import { defineField, defineType, getPublishedId } from "sanity";

import { BASE_LANGUAGE, FALLBACK_LANGUAGE } from "../../src/config/languages";

export const locale = defineType({
  name: "locale",
  title: "Sprache",
  description:
    "Administrativer Spiegel der Code-Konfiguration. Neue Website-Sprachen erfordern zusätzlich Routing-, Schema- und Frontend-Änderungen mit anschließendem Deploy.",
  type: "document",
  icon: TranslateIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tag",
      title: "Sprach-Tag",
      description: "IETF-Sprach-Tag, aktuell de oder en.",
      type: "string",
      readOnly: true,
      options: {
        list: [
          { title: "Deutsch", value: "de" },
          { title: "English", value: "en" },
        ],
      },
      validation: (rule) =>
        rule.required().lowercase().regex(/^(de|en)$/).custom(async (value, context) => {
          if (!value) return true;
          const publishedId = context.document?._id
            ? getPublishedId(context.document._id)
            : "";
          const client = context.getClient({
            apiVersion: "2026-08-01",
          }) as unknown as {
            fetch<T>(query: string, params: Record<string, unknown>): Promise<T>;
          };
          const duplicateCount = await client.fetch<number>(
              `count(*[_type == "locale" && tag == $tag && !sanity::versionOf($publishedId)])`,
              {
                tag: value,
                publishedId,
              },
            );
          return duplicateCount === 0 || "Dieser Sprach-Tag ist bereits vorhanden.";
        }),
    }),
    defineField({
      name: "isDefault",
      title: "Basissprache",
      type: "boolean",
      description: `Die Code-Basissprache ist aktuell ${BASE_LANGUAGE}.`,
      initialValue: false,
      readOnly: true,
      validation: (rule) =>
        rule.custom(async (value, context) => {
          if (!value) return true;
          const publishedId = context.document?._id
            ? getPublishedId(context.document._id)
            : "";
          const client = context.getClient({
            apiVersion: "2026-08-01",
          }) as unknown as {
            fetch<T>(query: string, params: Record<string, unknown>): Promise<T>;
          };
          const otherDefaults = await client.fetch<number>(
              `count(*[_type == "locale" && isDefault == true && !sanity::versionOf($publishedId)])`,
              {
                publishedId,
              },
            );
          return otherDefaults === 0 || "Es darf nur eine Basissprache geben.";
        }),
    }),
    defineField({
      name: "fallback",
      title: "Fallback-Sprache",
      type: "reference",
      description: `Der Code-Fallback ist aktuell ${FALLBACK_LANGUAGE}.`,
      to: [{ type: "locale" }],
      readOnly: true,
      validation: (rule) =>
        rule.custom((value, context) => {
          const reference = value as { _ref?: string } | undefined;
          const currentId = context.document?._id
            ? getPublishedId(context.document._id)
            : "";
          return reference?._ref && getPublishedId(reference._ref) === currentId
            ? "Eine Sprache kann nicht auf sich selbst zurückfallen."
            : true;
        }),
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "tag" },
  },
});
