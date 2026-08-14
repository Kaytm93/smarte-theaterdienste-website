import { LockIcon } from "@sanity/icons/Lock";
import { defineField, defineType } from "sanity";

export const legal = defineType({
  name: "legal",
  title: "Rechtstexte",
  type: "document",
  icon: LockIcon,
  groups: [
    { name: "imprint", title: "Impressum", default: true },
    { name: "privacy", title: "Datenschutz" },
  ],
  fields: [
    defineField({
      name: "imprint",
      title: "Impressum",
      type: "legalPage",
      group: "imprint",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "privacy",
      title: "Datenschutz",
      type: "legalPage",
      group: "privacy",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { imprint: "imprint.status", privacy: "privacy.status" },
    prepare({ imprint, privacy }) {
      const approved = imprint === "approved" && privacy === "approved";
      return {
        title: "Rechtstexte",
        subtitle: approved ? "Beide Seiten freigegeben" : "Freigaben noch offen",
      };
    },
  },
});
