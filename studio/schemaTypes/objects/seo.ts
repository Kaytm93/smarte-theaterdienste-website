import { TrendUpwardIcon } from "@sanity/icons/TrendUpward";
import { defineField, defineType } from "sanity";

import { recommendEnglish } from "../shared/localized-validation";

export const seo = defineType({
  name: "seo",
  title: "Suchmaschinen & Social Media",
  type: "object",
  icon: TrendUpwardIcon,
  fields: [
    defineField({
      name: "title",
      title: "Seitentitel",
      type: "internationalizedArrayString",
      validation: (rule) => [
        rule.custom((items) => {
          if (!Array.isArray(items)) return true;
          const tooLong = items.find(
            (item) =>
              typeof item?.value === "string" && item.value.trim().length > 65,
          );
          return tooLong
            ? "Seitentitel sollten höchstens 65 Zeichen lang sein."
            : true;
        }).warning(),
        rule.custom(recommendEnglish).warning(),
      ],
    }),
    defineField({
      name: "description",
      title: "Beschreibung",
      type: "internationalizedArrayText",
      validation: (rule) =>
        rule.custom((items) => {
          if (!Array.isArray(items)) return true;
          const tooLong = items.find(
            (item) =>
              typeof item?.value === "string" && item.value.trim().length > 170,
          );
          return tooLong
            ? "Beschreibungen sollten höchstens 170 Zeichen lang sein."
            : true;
        }).warning(),
    }),
    defineField({
      name: "socialImage",
      title: "Optionales Social-Media-Bild",
      type: "imageWithMetadata",
    }),
  ],
});
