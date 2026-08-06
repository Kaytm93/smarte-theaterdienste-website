import { event } from "./documents/event";
import { faqCategory } from "./documents/faq-category";
import { faqItem } from "./documents/faq-item";
import { legal } from "./documents/legal";
import { locale } from "./documents/locale";
import {
  conceptPage,
  contributePage,
  homePage,
  joinPage,
  materialsPage,
  semanticStandardsPage,
  teamPage,
  technicalStandardsPage,
  useCasesPage,
} from "./documents/page-singletons";
import { partner } from "./documents/partner";
import { person } from "./documents/person";
import { post } from "./documents/post";
import { siteSettings } from "./documents/site-settings";
import { imageWithMetadata } from "./objects/image-with-metadata";
import { internalOrExternalLink } from "./objects/internal-or-external-link";
import { pageIntro } from "./objects/page-intro";
import { portableText } from "./objects/portable-text";
import { seo } from "./objects/seo";

export const schemaTypes = [
  portableText,
  imageWithMetadata,
  internalOrExternalLink,
  seo,
  pageIntro,
  siteSettings,
  homePage,
  conceptPage,
  technicalStandardsPage,
  semanticStandardsPage,
  joinPage,
  useCasesPage,
  contributePage,
  materialsPage,
  teamPage,
  legal,
  locale,
  person,
  faqCategory,
  faqItem,
  event,
  partner,
  post,
];
