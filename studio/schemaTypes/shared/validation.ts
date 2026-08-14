import { getPublishedId, type ValidationContext } from "sanity";

const VALIDATION_API_VERSION = "2026-08-01";

type SourceKeyItem = {
  sourceKey?: unknown;
};

type NavigationItem = SourceKeyItem & {
  route?: unknown;
};

function duplicateStrings(values: string[]): string[] {
  return [...new Set(values.filter((value, index) => values.indexOf(value) !== index))];
}

export function uniqueSourceKeys(items: unknown): true | string {
  if (!Array.isArray(items)) return true;

  const sourceKeys = items.flatMap((item) => {
    const value = (item as SourceKeyItem | undefined)?.sourceKey;
    return typeof value === "string" && value.trim() ? [value] : [];
  });
  const duplicates = duplicateStrings(sourceKeys);

  return duplicates.length > 0
    ? `Fachliche Schlüssel müssen innerhalb der Liste eindeutig sein: ${duplicates.join(
        ", ",
      )}.`
    : true;
}

export function uniqueNavigationItems(items: unknown): true | string {
  if (!Array.isArray(items)) return true;

  const navigationItems = items as NavigationItem[];
  const sourceKeyResult = uniqueSourceKeys(navigationItems);
  if (sourceKeyResult !== true) return sourceKeyResult;

  const routes = navigationItems.flatMap(({ route }) =>
    typeof route === "string" && route.trim() ? [route] : [],
  );
  const duplicateRoutes = duplicateStrings(routes);

  return duplicateRoutes.length > 0
    ? `Zielseiten dürfen nur einmal in der Navigation vorkommen: ${duplicateRoutes.join(
        ", ",
      )}. Ein Eintrag kann Kopfzeile und Footer gemeinsam bedienen.`
    : true;
}

export async function uniqueDocumentSourceKey(
  value: unknown,
  context: ValidationContext,
): Promise<true | string> {
  if (typeof value !== "string" || !value.trim()) return true;

  const documentType = context.document?._type;
  const currentId = context.document?._id;
  if (!documentType || !currentId) return true;

  const publishedId = getPublishedId(currentId);

  try {
    const isUnique = await context
      .getClient({ apiVersion: VALIDATION_API_VERSION })
      .fetch<boolean>(
        `!defined(*[
          _type == $documentType &&
          sourceKey == $sourceKey &&
          !sanity::versionOf($publishedId)
        ][0]._id)`,
        { documentType, sourceKey: value, publishedId },
      );

    return isUnique
      ? true
      : "Dieser stabile Schlüssel wird bereits von einem anderen Dokument verwendet.";
  } catch {
    return "Die Eindeutigkeit konnte nicht geprüft werden. Bitte Verbindung prüfen und erneut versuchen.";
  }
}
