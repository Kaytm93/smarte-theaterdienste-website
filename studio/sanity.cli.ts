import { defineCliConfig } from "sanity/cli";

import {
  dataset,
  projectId,
  studioHostname,
} from "./src/environment";

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  studioHost: studioHostname,
  deployment: {
    // Sanity 6 benötigt Node >=22.12. Automatische Major-Upgrades würden
    // die bewusste Node-20-Kompatibilitätsgrenze dieses Projekts umgehen.
    autoUpdates: false,
  },
  typegen: {
    path: "../src/**/*.{ts,tsx}",
    schema: "./schema.json",
    generates: "../src/types/sanity.types.ts",
    overloadClientMethods: true,
  },
});
