import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { internationalizedArray } from "sanity-plugin-internationalized-array";

import { schemaTypes } from "./schemaTypes";
import { LANGUAGES } from "./src/config/languages";
import { dataset, projectId, studioTitle } from "./src/environment";
import { structure } from "./src/structure";
import {
  SINGLETON_ACTIONS,
  SINGLETON_TYPES,
} from "./src/structure/singletons";

export default defineConfig({
  name: "default",
  title: studioTitle,
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: "2026-08-01" }),
    internationalizedArray({
      languages: [...LANGUAGES],
      defaultLanguages: LANGUAGES.map(({ id }) => id),
      fieldTypes: ["string", "text", "portableText"],
      buttonLocations: ["field"],
      languageDisplay: "titleAndCode",
    }),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !SINGLETON_TYPES.has(schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) =>
      SINGLETON_TYPES.has(schemaType)
        ? actions.filter(
            ({ action }) => (action ? SINGLETON_ACTIONS.has(action) : false),
          )
        : actions,
    newDocumentOptions: (options) =>
      options.filter(({ templateId }) => !SINGLETON_TYPES.has(templateId)),
  },
});
