type LocalizedItem = {
  language?: string;
  value?: unknown;
};

function hasContent(value: unknown): boolean {
  if (typeof value === "string") {
    return value.trim().length > 0;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return true;
  }

  if (Array.isArray(value)) {
    return value.some(hasContent);
  }

  if (value && typeof value === "object") {
    return Object.entries(value).some(
      ([key, nestedValue]) =>
        !key.startsWith("_") && key !== "style" && hasContent(nestedValue),
    );
  }

  return false;
}

function localizedItem(items: unknown, language: string): LocalizedItem | undefined {
  if (!Array.isArray(items)) {
    return undefined;
  }

  return items.find(
    (item): item is LocalizedItem =>
      Boolean(item) &&
      typeof item === "object" &&
      "language" in item &&
      (item as LocalizedItem).language === language,
  );
}

export function requireGerman(items: unknown): true | string {
  return hasContent(localizedItem(items, "de")?.value)
    ? true
    : "Der deutsche Basisinhalt ist erforderlich.";
}

export function recommendEnglish(items: unknown): true | string {
  return hasContent(localizedItem(items, "en")?.value)
    ? true
    : "Die englische Übersetzung fehlt; im Frontend wird Deutsch verwendet.";
}

export function hasGermanLocalizedValue(items: unknown): boolean {
  return hasContent(localizedItem(items, "de")?.value);
}
