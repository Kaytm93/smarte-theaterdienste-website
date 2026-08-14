import { CalendarIcon } from "@sanity/icons/Calendar";
import { ComposeIcon } from "@sanity/icons/Compose";
import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { EarthGlobeIcon } from "@sanity/icons/EarthGlobe";
import { FolderIcon } from "@sanity/icons/Folder";
import { HelpCircleIcon } from "@sanity/icons/HelpCircle";
import { MarkerIcon } from "@sanity/icons/Marker";
import { ImageIcon } from "@sanity/icons/Image";
import { LinkIcon } from "@sanity/icons/Link";
import { TranslateIcon } from "@sanity/icons/Translate";
import { UsersIcon } from "@sanity/icons/Users";
import type {
  StructureBuilder,
  StructureResolver,
} from "sanity/structure";

import {
  FAQ_PAGE_SINGLETON,
  LEGAL_SINGLETON,
  PAGE_SINGLETONS,
  SETTINGS_SINGLETON,
  TEAM_PAGE_SINGLETON,
  type SingletonDefinition,
} from "./singletons";
import { isAdministrator } from "../permissions";

type FaqCategoryNavigationEntry = {
  _id: string;
  order?: number;
  sourceKey?: string;
  title?: string;
};

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

export const structure: StructureResolver = (S, { currentUser, getClient }) => {
  const settingsItems = [singletonItem(S, SETTINGS_SINGLETON)];

  if (isAdministrator(currentUser)) {
    settingsItems.push(
      S.documentTypeListItem("locale").title("Sprachen").icon(TranslateIcon),
    );
  }

  return S.list()
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
              singletonItem(S, FAQ_PAGE_SINGLETON),
              S.listItem()
                .title("Kategorien")
                .child(
                  S.documentTypeList("faqCategory")
                    .title("Kategorien")
                    .defaultOrdering([{ field: "order", direction: "asc" }]),
                ),
              S.listItem()
                .title("Fragen & Antworten")
                .child(
                  S.documentTypeList("faqItem")
                    .title("Fragen & Antworten")
                    .defaultOrdering([{ field: "order", direction: "asc" }]),
                ),
              S.listItem()
                .title("Fragen nach Kategorie")
                .icon(FolderIcon)
                .child(async () => {
                  const categories = await getClient({ apiVersion: "2026-08-01" }).fetch<
                    FaqCategoryNavigationEntry[]
                  >(`*[_type == "faqCategory" && !(_id in path("versions.**"))] | order(order asc, _createdAt asc) {
                    _id,
                    order,
                    sourceKey,
                    "title": coalesce(label[language == "de"][0].value, sourceKey)
                  }`);
                  const categoriesByPublishedId = new Map<
                    string,
                    FaqCategoryNavigationEntry
                  >();

                  for (const category of categories) {
                    const publishedId = category._id.replace(/^drafts\./, "");
                    const existing = categoriesByPublishedId.get(publishedId);
                    if (!existing || category._id.startsWith("drafts.")) {
                      categoriesByPublishedId.set(publishedId, category);
                    }
                  }

                  return S.list()
                    .title("Fragen nach Kategorie")
                    .items(
                      [...categoriesByPublishedId.entries()]
                        .sort(
                          ([, left], [, right]) =>
                            (left.order ?? Number.MAX_SAFE_INTEGER) -
                            (right.order ?? Number.MAX_SAFE_INTEGER),
                        )
                        .map(
                          ([publishedId, category]) => {
                            const title = category.title || "FAQ-Kategorie";
                            return S.listItem()
                              .id(
                                `faq-category-${publishedId.replace(/[^a-zA-Z0-9_-]/g, "-")}`,
                              )
                              .title(title)
                              .child(
                                S.documentTypeList("faqItem")
                                  .title(title)
                                  .filter(
                                    '_type == "faqItem" && category->sourceKey == $sourceKey',
                                  )
                                  .apiVersion("2026-08-01")
                                  .params({ sourceKey: category.sourceKey })
                                  .defaultOrdering([
                                    { field: "order", direction: "asc" },
                                  ]),
                              );
                          },
                        ),
                    );
                }),
            ]),
        ),
      S.listItem()
        .title("Termine")
        .icon(CalendarIcon)
        .child(
          S.documentTypeList("event")
            .title("Termine")
            .defaultOrdering([{ field: "startsAt", direction: "desc" }]),
        ),
      S.listItem()
        .title("Partner")
        .icon(MarkerIcon)
        .child(
          S.documentTypeList("partner")
            .title("Partner")
            .defaultOrdering([{ field: "name", direction: "asc" }]),
        ),
      S.listItem()
        .title("Beiträge")
        .icon(ComposeIcon)
        .child(
          S.documentTypeList("post")
            .title("Beiträge")
            .defaultOrdering([{ field: "publishedAt", direction: "desc" }]),
        ),
      S.listItem()
        .title("Medien & Materialien")
        .icon(ImageIcon)
        .child(
          S.list()
            .title("Medien & Materialien")
            .items([
              S.documentTypeListItem("resource").title("Materialien").icon(LinkIcon),
              S.documentTypeListItem("comicStrip").title("Comics").icon(ImageIcon),
            ]),
        ),
      S.divider(),
      singletonItem(S, LEGAL_SINGLETON),
      S.listItem()
        .title("Einstellungen")
        .icon(EarthGlobeIcon)
        .child(
          S.list()
            .title("Einstellungen")
            .items(settingsItems),
        ),
    ]);
};
