import { ControlsIcon } from "@sanity/icons/Controls";
import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { HomeIcon } from "@sanity/icons/Home";
import { UsersIcon } from "@sanity/icons/Users";
import { WrenchIcon } from "@sanity/icons/Wrench";
import type { ComponentType } from "react";
import { defineField, defineType } from "sanity";

type PageSingletonDefinition = {
  name:
    | "homePage"
    | "conceptPage"
    | "technicalStandardsPage"
    | "semanticStandardsPage"
    | "joinPage"
    | "useCasesPage"
    | "contributePage"
    | "materialsPage"
    | "teamPage";
  title: string;
  description: string;
  icon: ComponentType;
};

function pageSingleton({
  name,
  title,
  description,
  icon,
}: PageSingletonDefinition) {
  return defineType({
    name,
    title,
    description,
    type: "document",
    icon,
    fields: [
      defineField({
        name: "intro",
        title: "Seiteneinstieg",
        type: "pageIntro",
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: "seo",
        title: "SEO",
        type: "seo",
      }),
    ],
    preview: {
      prepare() {
        return { title, subtitle: "Feste Seite" };
      },
    },
  });
}

export const homePage = pageSingleton({
  name: "homePage",
  title: "Startseite",
  description:
    "Hero und Seiteneinstieg. Die fachlichen Startseiten-Sektionen folgen in M19 Phase 2.",
  icon: HomeIcon,
});

export const conceptPage = pageSingleton({
  name: "conceptPage",
  title: "Konzeption",
  description:
    "Konzept, Zeitstrahl und Spielplan-Reise. Die Abschnittsfelder folgen in M19 Phase 2.",
  icon: DocumentTextIcon,
});

export const technicalStandardsPage = pageSingleton({
  name: "technicalStandardsPage",
  title: "Technische Standards",
  description:
    "ORIF, Datenfluss und technische Ressourcen. Die Abschnittsfelder folgen in M19 Phase 2.",
  icon: WrenchIcon,
});

export const semanticStandardsPage = pageSingleton({
  name: "semanticStandardsPage",
  title: "Semantische Standards",
  description:
    "Datenmodell und semantische Verweise. Die Abschnittsfelder folgen in M19 Phase 2.",
  icon: ControlsIcon,
});

export const joinPage = pageSingleton({
  name: "joinPage",
  title: "Jetzt mitmachen",
  description:
    "Beteiligungs-Pitch und Einstiege. Die Abschnittsfelder folgen in M19 Phase 2.",
  icon: UsersIcon,
});

export const useCasesPage = pageSingleton({
  name: "useCasesPage",
  title: "Anwendungsbeispiele",
  description:
    "Drei fachliche Anwendungsfälle. Die strukturierten Felder folgen in M19 Phase 2.",
  icon: DocumentTextIcon,
});

export const contributePage = pageSingleton({
  name: "contributePage",
  title: "Mitwirkung",
  description:
    "Nutzen, Schritte und Umsetzung. Die strukturierten Felder folgen in M19 Phase 2.",
  icon: UsersIcon,
});

export const materialsPage = pageSingleton({
  name: "materialsPage",
  title: "Materialien",
  description:
    "ORIF-Werkzeuge und Folge-Links. Die Ressourcenfelder folgen in M19 Phase 2.",
  icon: DocumentTextIcon,
});

export const teamPage = pageSingleton({
  name: "teamPage",
  title: "Teamseite",
  description:
    "Seiteneinstieg und sortierte Personen-Referenzen. Die Referenzliste folgt in M19 Phase 2.",
  icon: UsersIcon,
});
