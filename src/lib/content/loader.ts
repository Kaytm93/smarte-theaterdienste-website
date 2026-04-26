import deTeam from "@/content/de/team.json";
import enTeam from "@/content/en/team.json";
import deProjekt from "@/content/de/projekt.json";
import enProjekt from "@/content/en/projekt.json";
import deTechnischeStandards from "@/content/de/projekt-technische-standards.json";
import enTechnischeStandards from "@/content/en/projekt-technische-standards.json";
import deSemantischeStandards from "@/content/de/projekt-semantische-standards.json";
import enSemantischeStandards from "@/content/en/projekt-semantische-standards.json";
import deBeteiligung from "@/content/de/beteiligung.json";
import enBeteiligung from "@/content/en/beteiligung.json";
import deAnwendungsbeispiele from "@/content/de/beteiligung-anwendungsbeispiele.json";
import enAnwendungsbeispiele from "@/content/en/beteiligung-anwendungsbeispiele.json";
import deMitwirkung from "@/content/de/beteiligung-mitwirkung.json";
import enMitwirkung from "@/content/en/beteiligung-mitwirkung.json";
import deLegal from "@/content/de/legal.json";
import enLegal from "@/content/en/legal.json";
import deLanding from "@/content/de/landing.json";
import enLanding from "@/content/en/landing.json";

import type { Locale } from "@/lib/i18n/routing";

const REGISTRY = {
  team: { de: deTeam, en: enTeam },
  projekt: { de: deProjekt, en: enProjekt },
  "projekt-technische-standards": {
    de: deTechnischeStandards,
    en: enTechnischeStandards,
  },
  "projekt-semantische-standards": {
    de: deSemantischeStandards,
    en: enSemantischeStandards,
  },
  beteiligung: { de: deBeteiligung, en: enBeteiligung },
  "beteiligung-anwendungsbeispiele": {
    de: deAnwendungsbeispiele,
    en: enAnwendungsbeispiele,
  },
  "beteiligung-mitwirkung": { de: deMitwirkung, en: enMitwirkung },
  legal: { de: deLegal, en: enLegal },
  landing: { de: deLanding, en: enLanding },
} as const;

export type ContentKey = keyof typeof REGISTRY;

export function loadContent<K extends ContentKey>(
  key: K,
  locale: Locale
): (typeof REGISTRY)[K]["de"] {
  const bundle = REGISTRY[key];
  return (bundle[locale] ?? bundle.de) as (typeof REGISTRY)[K]["de"];
}

export type TeamMember = (typeof deTeam)["members"][number];
export type ProjektContent = typeof deProjekt;
export type StandardsContent = typeof deTechnischeStandards;
export type BeteiligungContent = typeof deBeteiligung;
export type UseCase = (typeof deAnwendungsbeispiele)["useCases"][number];
export type MitwirkungContent = typeof deMitwirkung;
export type LegalContent = typeof deLegal;
export type LandingContent = typeof deLanding;
