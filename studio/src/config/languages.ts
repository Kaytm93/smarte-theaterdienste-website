export const LANGUAGES = [
  { id: "de", title: "Deutsch" },
  { id: "en", title: "English" },
] as const;

export const BASE_LANGUAGE = "de";
export const FALLBACK_LANGUAGE = "de";

export const LOCALIZED_DOCUMENT_TYPES = [
  "siteSettings",
  "homePage",
  "conceptPage",
  "technicalStandardsPage",
  "semanticStandardsPage",
  "joinPage",
  "useCasesPage",
  "contributePage",
  "materialsPage",
  "teamPage",
  "faqPage",
  "legal",
  "person",
  "faqCategory",
  "faqItem",
  "event",
  "partner",
  "post",
  "resource",
  "comicStrip",
] as const;

export type LanguageId = (typeof LANGUAGES)[number]["id"];
