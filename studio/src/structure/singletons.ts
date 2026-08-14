import { CogIcon } from "@sanity/icons/Cog";
import { ControlsIcon } from "@sanity/icons/Controls";
import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { HomeIcon } from "@sanity/icons/Home";
import { LockIcon } from "@sanity/icons/Lock";
import { UsersIcon } from "@sanity/icons/Users";
import { WrenchIcon } from "@sanity/icons/Wrench";
import type { ComponentType } from "react";

export const SINGLETON_TYPES = new Set([
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
]);

export const SINGLETON_BLOCKED_ACTIONS = new Set([
  "delete",
  "duplicate",
  "unpublish",
]);

export type SingletonDefinition = {
  id: string;
  schemaType: string;
  title: string;
  icon: ComponentType;
};

export const PAGE_SINGLETONS: SingletonDefinition[] = [
  { id: "homePage", schemaType: "homePage", title: "Startseite", icon: HomeIcon },
  {
    id: "conceptPage",
    schemaType: "conceptPage",
    title: "Konzeption",
    icon: DocumentTextIcon,
  },
  {
    id: "technicalStandardsPage",
    schemaType: "technicalStandardsPage",
    title: "Technische Standards",
    icon: WrenchIcon,
  },
  {
    id: "semanticStandardsPage",
    schemaType: "semanticStandardsPage",
    title: "Semantische Standards",
    icon: ControlsIcon,
  },
  { id: "joinPage", schemaType: "joinPage", title: "Jetzt mitmachen", icon: UsersIcon },
  {
    id: "useCasesPage",
    schemaType: "useCasesPage",
    title: "Anwendungsbeispiele",
    icon: DocumentTextIcon,
  },
  {
    id: "contributePage",
    schemaType: "contributePage",
    title: "Mitwirkung",
    icon: UsersIcon,
  },
  {
    id: "materialsPage",
    schemaType: "materialsPage",
    title: "Materialien",
    icon: DocumentTextIcon,
  },
];

export const TEAM_PAGE_SINGLETON: SingletonDefinition = {
  id: "teamPage",
  schemaType: "teamPage",
  title: "Teamseite",
  icon: UsersIcon,
};

export const FAQ_PAGE_SINGLETON: SingletonDefinition = {
  id: "faqPage",
  schemaType: "faqPage",
  title: "FAQ-Seite",
  icon: DocumentTextIcon,
};

export const LEGAL_SINGLETON: SingletonDefinition = {
  id: "legal",
  schemaType: "legal",
  title: "Rechtstexte",
  icon: LockIcon,
};

export const SETTINGS_SINGLETON: SingletonDefinition = {
  id: "siteSettings",
  schemaType: "siteSettings",
  title: "Website-Einstellungen",
  icon: CogIcon,
};
