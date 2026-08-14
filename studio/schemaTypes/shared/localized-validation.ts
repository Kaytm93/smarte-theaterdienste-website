type LocalizedItem = {
  _key?: string;
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

function hasAnyLocalizedContent(items: unknown): boolean {
  return Array.isArray(items) && items.some((item) =>
    Boolean(item) &&
    typeof item === "object" &&
    "value" in item &&
    hasContent((item as LocalizedItem).value),
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

export function requireGermanWhenPresent(items: unknown): true | string {
  return hasAnyLocalizedContent(items) ? requireGerman(items) : true;
}

export function recommendEnglishWhenPresent(items: unknown): true | string {
  return hasAnyLocalizedContent(items) ? recommendEnglish(items) : true;
}

export function requireLocalizedTokens(tokens: string[]) {
  return (items: unknown): true | string => {
    if (!Array.isArray(items)) return true;

    const invalidLanguages = items.flatMap((item) => {
      if (!item || typeof item !== "object") return [];

      const localized = item as LocalizedItem;
      if (typeof localized.value !== "string" || !localized.value.trim()) {
        return [];
      }

      const localizedValue = localized.value;
      const missing = tokens.filter((token) => !localizedValue.includes(token));
      return missing.length > 0
        ? [`${localized.language || localized._key || "?"}: ${missing.join(", ")}`]
        : [];
    });

    return invalidLanguages.length > 0
      ? `Erforderliche Platzhalter fehlen (${invalidLanguages.join("; ")}).`
      : true;
  };
}

export function germanString(items: unknown): string | undefined {
  const value = localizedItem(items, "de")?.value;
  return typeof value === "string" && value.trim() ? value : undefined;
}

export function hasGermanLocalizedValue(items: unknown): boolean {
  return hasContent(localizedItem(items, "de")?.value);
}
