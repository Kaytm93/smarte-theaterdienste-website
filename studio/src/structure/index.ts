import { CalendarIcon } from "@sanity/icons/Calendar";
import { ComposeIcon } from "@sanity/icons/Compose";
import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { EarthGlobeIcon } from "@sanity/icons/EarthGlobe";
import { HelpCircleIcon } from "@sanity/icons/HelpCircle";
import { MarkerIcon } from "@sanity/icons/Marker";
import { TranslateIcon } from "@sanity/icons/Translate";
import { UsersIcon } from "@sanity/icons/Users";
import type {
  StructureBuilder,
  StructureResolver,
} from "sanity/structure";

import {
  LEGAL_SINGLETON,
  PAGE_SINGLETONS,
  SETTINGS_SINGLETON,
  TEAM_PAGE_SINGLETON,
  type SingletonDefinition,
} from "./singletons";

function singletonItem(S: StructureBuilder, singleton: SingletonDefinition) {
  return S.listItem()
    .id(singleton.id)
    .title(singleton.title)
    .icon(singleton.icon)
    .child(
      S.document()
        .schemaType(singleton.schemaType)
        .documentId(singleton.id)
        .title(singleton.title),
    );
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Smarte Theaterdienste")
    .items([
      singletonItem(S, PAGE_SINGLETONS[0]),
      S.listItem()
        .title("Weitere Seiten")
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .title("Weitere Seiten")
            .items(PAGE_SINGLETONS.slice(1).map((item) => singletonItem(S, item))),
        ),
      S.divider(),
      S.listItem()
        .title("Team")
        .icon(UsersIcon)
        .child(
          S.list()
            .title("Team")
            .items([
              singletonItem(S, TEAM_PAGE_SINGLETON),
              S.documentTypeListItem("person").title("Personen"),
            ]),
        ),
      S.listItem()
        .title("FAQ")
        .icon(HelpCircleIcon)
        .child(
          S.list()
            .title("FAQ")
            .items([
              S.documentTypeListItem("faqCategory").title("Kategorien"),
              S.documentTypeListItem("faqItem").title("Fragen & Antworten"),
            ]),
        ),
      S.documentTypeListItem("event").title("Termine").icon(CalendarIcon),
      S.documentTypeListItem("partner").title("Partner").icon(MarkerIcon),
      S.documentTypeListItem("post").title("Beiträge").icon(ComposeIcon),
      S.divider(),
      singletonItem(S, LEGAL_SINGLETON),
      S.listItem()
        .title("Einstellungen")
        .icon(EarthGlobeIcon)
        .child(
          S.list()
            .title("Einstellungen")
            .items([
              singletonItem(S, SETTINGS_SINGLETON),
              S.documentTypeListItem("locale").title("Sprachen").icon(TranslateIcon),
            ]),
        ),
    ]);
