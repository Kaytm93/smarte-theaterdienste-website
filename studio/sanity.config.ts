import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { internationalizedArray } from "sanity-plugin-internationalized-array";

import { schemaTypes } from "./schemaTypes";
import {
  LANGUAGES,
  LOCALIZED_DOCUMENT_TYPES,
} from "./src/config/languages";
import { dataset, projectId, studioTitle } from "./src/environment";
import {
  ADMIN_ONLY_TYPES,
  isAdministrator,
  READ_ONLY_TYPES,
} from "./src/permissions";
import { structure } from "./src/structure";
import {
  SINGLETON_BLOCKED_ACTIONS,
  SINGLETON_TYPES,
} from "./src/structure/singletons";

export default defineConfig({
  name: "default",
  title: studioTitle,
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    ...(process.env.NODE_ENV === "development"
      ? [visionTool({ defaultApiVersion: "2026-08-01" })]
      : []),
    internationalizedArray({
      languages: [...LANGUAGES],
      defaultLanguages: LANGUAGES.map(({ id }) => id),
      fieldTypes: ["string", "text", "portableText"],
      buttonLocations: ["field"],
      languageDisplay: "titleAndCode",
      languageFilter: {
        documentTypes: [...LOCALIZED_DOCUMENT_TYPES],
        defaultLanguages: LANGUAGES.map(({ id }) => id),
      },
    }),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !SINGLETON_TYPES.has(schemaType)),
  },
  document: {
    actions: (actions, { schemaType, currentUser }) => {
      if (READ_ONLY_TYPES.has(schemaType)) {
        return [];
      }

      if (ADMIN_ONLY_TYPES.has(schemaType) && !isAdministrator(currentUser)) {
        return [];
      }

      return SINGLETON_TYPES.has(schemaType)
        ? actions.filter(
            ({ action }) =>
              !action || !SINGLETON_BLOCKED_ACTIONS.has(action),
          )
        : actions;
    },
    newDocumentOptions: (options, { currentUser }) =>
      options.filter(
        ({ templateId }) =>
          !SINGLETON_TYPES.has(templateId) &&
          !READ_ONLY_TYPES.has(templateId) &&
          (!ADMIN_ONLY_TYPES.has(templateId) || isAdministrator(currentUser)),
      ),
  },
});
