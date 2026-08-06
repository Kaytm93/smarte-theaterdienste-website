import { defineArrayMember, defineField, defineType } from "sanity";

export const portableText = defineType({
  name: "portableText",
  title: "Formatierter Text",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Fließtext", value: "normal" },
        { title: "Zwischenüberschrift", value: "h2" },
        { title: "Kleine Überschrift", value: "h3" },
        { title: "Zitat", value: "blockquote" },
      ],
      lists: [
        { title: "Aufzählung", value: "bullet" },
        { title: "Nummerierung", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Fett", value: "strong" },
          { title: "Kursiv", value: "em" },
          { title: "Code", value: "code" },
        ],
        annotations: [
          {
            name: "link",
            title: "Link",
            type: "object",
            fields: [
              defineField({
                name: "href",
                title: "Zieladresse",
                type: "url",
                validation: (rule) =>
                  rule.uri({
                    allowRelative: true,
                    scheme: ["http", "https", "mailto", "tel"],
                  }),
              }),
              defineField({
                name: "openInNewTab",
                title: "In neuem Tab öffnen",
                type: "boolean",
                initialValue: false,
              }),
            ],
          },
        ],
      },
    }),
  ],
});
