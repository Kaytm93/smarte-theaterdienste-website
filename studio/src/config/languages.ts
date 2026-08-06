export const LANGUAGES = [
  { id: "de", title: "Deutsch" },
  { id: "en", title: "English" },
] as const;

export const BASE_LANGUAGE = "de";
export const FALLBACK_LANGUAGE = "de";

export type LanguageId = (typeof LANGUAGES)[number]["id"];
