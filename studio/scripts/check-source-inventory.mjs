import { readdir, readFile, stat } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import Ajv2020 from "ajv/dist/2020.js";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(scriptDirectory, "../..");
const reportPath = resolve(
  repositoryRoot,
  "migration/reports/phase-0-inventory.json",
);
const reportSchemaPath = resolve(
  repositoryRoot,
  "migration/reports/phase-0-inventory.schema.json",
);

const modeArgument = process.argv.find((argument) => argument.startsWith("--mode="));
const mode = modeArgument?.split("=")[1] || "verify";

if (!new Set(["dry-run", "verify"]).has(mode)) {
  throw new Error(`Unbekannter Modus: ${mode}`);
}

const [report, reportSchema] = await Promise.all(
  [reportPath, reportSchemaPath].map(async (path) =>
    JSON.parse(await readFile(path, "utf8")),
  ),
);
const errors = [];

function assert(condition, message) {
  if (!condition) errors.push(message);
}

const ajv = new Ajv2020({ allErrors: true, strict: true });
ajv.addFormat("date", {
  type: "string",
  validate: (value) =>
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    !Number.isNaN(Date.parse(`${value}T00:00:00Z`)),
});
const validateReport = ajv.compile(reportSchema);

if (!validateReport(report)) {
  for (const schemaError of validateReport.errors || []) {
    errors.push(
      `Report-Schema ${schemaError.instancePath || "/"}: ${schemaError.message || "ungültig"}`,
    );
  }
}

function valueType(value) {
  if (Array.isArray(value)) return "array";
  if (value === null) return "null";
  return typeof value;
}

async function collectSourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const path = resolve(directory, entry.name);
      return entry.isDirectory() ? collectSourceFiles(path) : [path];
    }),
  );

  return files.flat();
}

const stableFields = new Set([
  "id",
  "key",
  "href",
  "image",
  "portrait",
  "icon",
  "step",
  "status",
  "todo",
  "src",
  "videoId",
  "youtubeId",
]);

function compareLocalizedShape(left, right, path, findings) {
  const leftType = valueType(left);
  const rightType = valueType(right);

  if (leftType !== rightType) {
    findings.push(`${path}: Typ ${leftType} != ${rightType}`);
    return;
  }

  if (leftType === "array") {
    if (left.length !== right.length) {
      findings.push(`${path}: Arraylänge ${left.length} != ${right.length}`);
      return;
    }

    left.forEach((item, index) =>
      compareLocalizedShape(item, right[index], `${path}[${index}]`, findings),
    );
    return;
  }

  if (leftType === "object") {
    const leftKeys = Object.keys(left).sort();
    const rightKeys = Object.keys(right).sort();
    if (JSON.stringify(leftKeys) !== JSON.stringify(rightKeys)) {
      findings.push(`${path}: Schlüssel ${leftKeys.join(",")} != ${rightKeys.join(",")}`);
      return;
    }

    for (const key of leftKeys) {
      if (stableFields.has(key) && JSON.stringify(left[key]) !== JSON.stringify(right[key])) {
        findings.push(`${path}.${key}: stabiler Wert weicht ab`);
        continue;
      }
      compareLocalizedShape(left[key], right[key], `${path}.${key}`, findings);
    }
  }
}

const allPaths = report.sourceGroups.flatMap((group) => group.paths);
const uniquePaths = new Set(allPaths);

assert(
  allPaths.length === uniquePaths.size,
  "Die Inventur enthält doppelte lokale Quelldateien.",
);
assert(
  uniquePaths.size === report.summary.physicalLocalFiles,
  `Erwartet ${report.summary.physicalLocalFiles} lokale Dateien, Report enthält ${uniquePaths.size}.`,
);

for (const relativePath of uniquePaths) {
  try {
    const file = await stat(resolve(repositoryRoot, relativePath));
    assert(file.isFile(), `${relativePath} ist keine Datei.`);
  } catch {
    errors.push(`Quelldatei fehlt: ${relativePath}`);
  }
}

const localizedPairs = [
  ["src/messages/de.json", "src/messages/en.json"],
  ...[
    "beteiligung-anwendungsbeispiele.json",
    "beteiligung-mitwirkung.json",
    "beteiligung.json",
    "faq.json",
    "landing.json",
    "legal.json",
    "materialien.json",
    "projekt-semantische-standards.json",
    "projekt-technische-standards.json",
    "projekt.json",
    "team.json",
  ].map((fileName) => [
    `src/content/de/${fileName}`,
    `src/content/en/${fileName}`,
  ]),
];

const parityFindings = [];
for (const [germanPath, englishPath] of localizedPairs) {
  const [german, english] = await Promise.all(
    [germanPath, englishPath].map(async (relativePath) =>
      JSON.parse(await readFile(resolve(repositoryRoot, relativePath), "utf8")),
    ),
  );
  compareLocalizedShape(german, english, germanPath, parityFindings);
}

assert(
  localizedPairs.length === report.parity.pairsChecked,
  `Erwartet ${report.parity.pairsChecked} Locale-Paare, geprüft wurden ${localizedPairs.length}.`,
);
assert(
  parityFindings.length === 0,
  `DE/EN-Paritätsfehler:\n${parityFindings.join("\n")}`,
);

const germanTeam = JSON.parse(
  await readFile(resolve(repositoryRoot, "src/content/de/team.json"), "utf8"),
);
const germanFaq = JSON.parse(
  await readFile(resolve(repositoryRoot, "src/content/de/faq.json"), "utf8"),
);
const [germanMaterials, englishMaterials, germanTechnical, englishTechnical, germanLanding] =
  await Promise.all(
    [
      "src/content/de/materialien.json",
      "src/content/en/materialien.json",
      "src/content/de/projekt-technische-standards.json",
      "src/content/en/projekt-technische-standards.json",
      "src/content/de/landing.json",
    ].map(async (relativePath) =>
      JSON.parse(await readFile(resolve(repositoryRoot, relativePath), "utf8")),
    ),
  );
const routingSource = await readFile(
  resolve(repositoryRoot, "src/lib/i18n/routing.ts"),
  "utf8",
);
const mapConfigSource = await readFile(
  resolve(repositoryRoot, "src/lib/maps.ts"),
  "utf8",
);
const localeListSource = routingSource.match(/locales\s*:\s*\[([^\]]+)\]/)?.[1];
const configuredLocales = localeListSource
  ? [...localeListSource.matchAll(/["']([^"']+)["']/g)].map((match) => match[1])
  : [];
const defaultLocale = routingSource.match(
  /defaultLocale\s*:\s*["']([^"']+)["']/,
)?.[1];

assert(
  germanTeam.members.length === report.summary.entities.person,
  `Personen: ${germanTeam.members.length} statt ${report.summary.entities.person}.`,
);
assert(
  germanFaq.categories.length === report.summary.entities.faqCategory,
  `FAQ-Kategorien: ${germanFaq.categories.length} statt ${report.summary.entities.faqCategory}.`,
);
assert(
  germanFaq.categories.reduce((sum, category) => sum + category.items.length, 0) ===
    report.summary.entities.faqItem,
  "Die FAQ-Anzahl weicht vom Report ab.",
);
assert(
  JSON.stringify(configuredLocales) === JSON.stringify(report.project.locales),
  `Routing-Locales ${configuredLocales.join(",")} weichen vom Report ab.`,
);
assert(
  configuredLocales.length === report.summary.entities.locale,
  `Locale-Dokumente: ${configuredLocales.length} statt ${report.summary.entities.locale}.`,
);
assert(
  defaultLocale === report.project.baseLocale,
  `Routing-Basissprache ${defaultLocale || "fehlt"} statt ${report.project.baseLocale}.`,
);
assert(
  mapConfigSource.includes("MYMAPS_EMBED_URL") &&
    mapConfigSource.includes("google.com/maps/d/embed"),
  "Die code-eigene Google-MyMaps-Konfiguration fehlt oder hat ein unerwartetes Format.",
);

function sourceKeyFromTitle(title) {
  return title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const materialResources = germanMaterials.resources.items;
const technicalResources = germanTechnical.resources.items;
const englishMaterialResources = new Map(
  englishMaterials.resources.items.map((resource) => [resource.href, resource]),
);
const englishTechnicalResources = englishTechnical.resources.items;
const materialResourceKeys = materialResources.map((resource) =>
  sourceKeyFromTitle(resource.title),
);
const materialResourceUrls = new Set(materialResources.map((resource) => resource.href));

assert(
  materialResources.length === report.summary.entities.resource,
  `Ressourcen: ${materialResources.length} statt ${report.summary.entities.resource}.`,
);
assert(
  materialResourceUrls.size === report.summary.entities.resource,
  "Die kanonischen Materialien enthalten doppelte Ressourcen-URLs.",
);
assert(
  JSON.stringify(materialResourceKeys) === JSON.stringify(report.expectedSourceKeys.resources),
  "Die stabilen Ressourcen-Keys weichen vom Material-Inventar ab.",
);
assert(
  technicalResources.length === report.phase2Coverage.reusedResourcePlacements,
  "Die Zahl der wiederverwendeten technischen Ressourcen weicht vom Report ab.",
);

for (const technicalResource of technicalResources) {
  const canonicalResource = materialResources.find(
    (resource) => resource.href === technicalResource.href,
  );
  assert(
    canonicalResource !== undefined,
    `Technische Ressource fehlt im kanonischen Material-Inventar: ${technicalResource.href}`,
  );
  assert(
    JSON.stringify(canonicalResource) === JSON.stringify(technicalResource),
    `Deutsche Ressourcen-Copy weicht zwischen Materialien und Technik ab: ${technicalResource.href}`,
  );
}

for (const technicalResource of englishTechnicalResources) {
  const canonicalResource = englishMaterialResources.get(technicalResource.href);
  assert(
    canonicalResource !== undefined,
    `Englische technische Ressource fehlt im Material-Inventar: ${technicalResource.href}`,
  );
  assert(
    JSON.stringify(canonicalResource) !== JSON.stringify(technicalResource),
    `Erwarteter englischer Placement-Override fehlt: ${technicalResource.href}`,
  );
}

assert(
  germanLanding.comicStrip.frames.length === report.phase2Coverage.sharedComicFrames,
  `Comic-Frames: ${germanLanding.comicStrip.frames.length} statt ${report.phase2Coverage.sharedComicFrames}.`,
);
assert(
  report.expectedSourceKeys.comicStrips.length === report.summary.entities.comicStrip,
  "Die Zahl der Comic-Source-Keys weicht von der Dokument-Sollzahl ab.",
);

const sqlSnapshot = await Promise.all(
  report.sourceGroups
    .filter((group) => group.kind.startsWith("sql-"))
    .flatMap((group) => group.paths)
    .map((relativePath) => readFile(resolve(repositoryRoot, relativePath), "utf8")),
).then((parts) => parts.join("\n"));

const sqlBackedSourceKeyGroups = new Set(["events", "partners", "posts"]);
for (const [entity, sourceKeys] of Object.entries(report.expectedSourceKeys)) {
  if (!sqlBackedSourceKeyGroups.has(entity)) continue;
  for (const sourceKey of sourceKeys) {
    assert(sqlSnapshot.includes(sourceKey), `${entity}: SQL-Quellschlüssel fehlt: ${sourceKey}`);
  }
}

const expectedDocumentCount =
  report.summary.singletonDocuments +
  Object.values(report.summary.entities).reduce((sum, count) => sum + count, 0);
assert(
  expectedDocumentCount === report.summary.documentsIncludingLocales,
  `Dokument-Sollzahl ist inkonsistent: ${expectedDocumentCount} statt ${report.summary.documentsIncludingLocales}.`,
);

const plannedAssetUploads =
  report.summary.assets.sanityMigratedPublicEditorial +
  report.summary.assets.remoteSanityImages;

const sourceFiles = await collectSourceFiles(resolve(repositoryRoot, "src"));
const sourceCorpus = await Promise.all(
  sourceFiles.map((path) => readFile(path, "utf8")),
).then((parts) => parts.join("\n"));
const publicEditorialAssets = report.sourceGroups.find(
  ({ id }) => id === "public-editorial-assets",
)?.paths;
const publicCodeOwnedAssets = report.sourceGroups.find(
  ({ id }) => id === "public-code-owned-assets",
)?.paths;
const referencedPublicEditorialAssets = (publicEditorialAssets || []).filter((path) =>
  sourceCorpus.includes(`/${path.replace(/^public\//, "")}`),
);
const unreferencedPublicEditorialAssets = (publicEditorialAssets || []).filter(
  (path) => !referencedPublicEditorialAssets.includes(path),
);
const remoteSanityImageUrls = new Set(
  sourceCorpus.match(
    /https:\/\/cdn\.sanity\.io\/images\/lc7slax2\/production\/[a-zA-Z0-9._-]+/g,
  ) || [],
);
const referencedCodeOwnedAssets = (publicCodeOwnedAssets || []).filter((path) =>
  sourceCorpus.includes(`/${path.replace(/^public\//, "")}`),
);
const derivedActiveImageSources =
  referencedPublicEditorialAssets.length +
  remoteSanityImageUrls.size +
  referencedCodeOwnedAssets.length;

assert(
  referencedPublicEditorialAssets.length ===
    report.summary.assets.sanityMigratedPublicEditorial,
  `Aktive öffentliche Sanity-Bilder: ${referencedPublicEditorialAssets.length} statt ${report.summary.assets.sanityMigratedPublicEditorial}.`,
);
assert(
  remoteSanityImageUrls.size === report.summary.assets.remoteSanityImages,
  `Eindeutige aktive Sanity-CDN-Bilder: ${remoteSanityImageUrls.size} statt ${report.summary.assets.remoteSanityImages}.`,
);
assert(
  referencedCodeOwnedAssets.length === report.summary.assets.codeOwnedPublicAssets,
  `Aktive code-eigene Karten-Assets: ${referencedCodeOwnedAssets.length} statt ${report.summary.assets.codeOwnedPublicAssets}.`,
);
assert(
  JSON.stringify(unreferencedPublicEditorialAssets) ===
    JSON.stringify(["public/logos/hamburg.png"]),
  `Unerwartete unreferenzierte öffentliche Bildkandidaten: ${unreferencedPublicEditorialAssets.join(", ") || "keine"}.`,
);
assert(
  derivedActiveImageSources === report.summary.assets.activeEditorialImageSources,
  `Aus Quellen abgeleitete aktive Bildquellen: ${derivedActiveImageSources} statt ${report.summary.assets.activeEditorialImageSources}.`,
);
assert(
  plannedAssetUploads + report.summary.assets.codeOwnedPublicAssets ===
    report.summary.assets.activeEditorialImageSources,
  "Sanity-Uploads und code-eigene aktive Assets sind im Report nicht verlustfrei getrennt.",
);
assert(
  report.sanityTarget.secretsStoredInReport === false &&
    report.validation.secretsStored === false,
  "Der Inventurreport darf keine Secrets enthalten.",
);

if (mode === "verify") {
  const sourceKeyEntityMap = {
    events: "event",
    partners: "partner",
    posts: "post",
    resources: "resource",
    comicStrips: "comicStrip",
  };

  for (const [sourceKeyGroup, entity] of Object.entries(sourceKeyEntityMap)) {
    assert(
      report.expectedSourceKeys[sourceKeyGroup].length ===
        report.summary.entities[entity],
      `${sourceKeyGroup}: Source-Key-Anzahl weicht von summary.entities.${entity} ab.`,
    );
  }

  const singletonSource = await readFile(
    resolve(repositoryRoot, "studio/src/structure/singletons.ts"),
    "utf8",
  );
  const singletonSetBody = singletonSource.match(
    /export const SINGLETON_TYPES = new Set\(\[([\s\S]*?)\]\);/,
  )?.[1];
  const singletonTypesInCode = singletonSetBody
    ? [...singletonSetBody.matchAll(/"([^"]+)"/g)].map((match) => match[1])
    : [];

  assert(singletonSetBody, "SINGLETON_TYPES konnte nicht aus dem Studio-Code gelesen werden.");
  assert(
    singletonTypesInCode.length === report.summary.singletonDocuments,
    `Singletons im Code: ${singletonTypesInCode.length} statt ${report.summary.singletonDocuments}.`,
  );
  assert(
    JSON.stringify(singletonTypesInCode) ===
      JSON.stringify(report.phase2Coverage.singletonTypes),
    "Singleton-Typen im Studio und im Inventurreport weichen voneinander ab.",
  );
  assert(
    report.validation.expectedCountsMatched === true,
    "Der Report bestätigt den strikten Sollzahlenabgleich nicht.",
  );
}

if (errors.length > 0) {
  console.error(`M19 Phase-0-Inventur fehlgeschlagen (${errors.length}):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  const prefix = mode === "dry-run" ? "Migrations-Dry-Run" : "Inventur-Verifikation";
  console.log(`${prefix} erfolgreich.`);
  console.log(
      `${uniquePaths.size} Dateien · ${localizedPairs.length} Locale-Paare · ` +
      `${report.summary.documentsIncludingLocales} erwartete Dokumente · ` +
      `${report.summary.assets.activeEditorialImageSources} aktive redaktionelle Bildquellen`,
  );
  console.log(
    "Keine Content-Lake-Schreiboperation und kein Sanity-Readback ausgeführt (lokale Phase 0–2).",
  );
  if (mode === "dry-run") {
    console.log(
      `Geplanter Erstimport: ${expectedDocumentCount} Dokumente · ${plannedAssetUploads} Sanity-Bilder · ` +
        `${report.summary.assets.codeOwnedPublicAssets} code-eigenes aktives Karten-Asset.`,
    );
  } else {
    console.log(
      "Strikter Verify-Modus: Source-Key-Gruppen und Studio-Singletons stimmen mit dem Report überein.",
    );
  }
}
