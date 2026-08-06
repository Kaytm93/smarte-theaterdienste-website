import { readFile, stat } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(scriptDirectory, "../..");
const reportPath = resolve(
  repositoryRoot,
  "migration/reports/phase-0-inventory.json",
);

const modeArgument = process.argv.find((argument) => argument.startsWith("--mode="));
const mode = modeArgument?.split("=")[1] || "verify";

if (!new Set(["dry-run", "verify"]).has(mode)) {
  throw new Error(`Unbekannter Modus: ${mode}`);
}

const report = JSON.parse(await readFile(reportPath, "utf8"));
const errors = [];

function assert(condition, message) {
  if (!condition) errors.push(message);
}

function valueType(value) {
  if (Array.isArray(value)) return "array";
  if (value === null) return "null";
  return typeof value;
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
const routingSource = await readFile(
  resolve(repositoryRoot, "src/lib/i18n/routing.ts"),
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

const sqlSnapshot = await Promise.all(
  report.sourceGroups
    .filter((group) => group.kind.startsWith("sql-"))
    .flatMap((group) => group.paths)
    .map((relativePath) => readFile(resolve(repositoryRoot, relativePath), "utf8")),
).then((parts) => parts.join("\n"));

for (const [entity, sourceKeys] of Object.entries(report.expectedSourceKeys)) {
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
      `${report.summary.assets.totalEditorialImageSources} redaktionelle Bildquellen`,
  );
  console.log(
    "Keine Content-Lake-Schreiboperation und kein Sanity-Readback ausgeführt (Phase 0/1).",
  );
}
