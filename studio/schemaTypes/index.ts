import { comicStrip } from "./documents/comic-strip";
import { event } from "./documents/event";
import { faqCategory } from "./documents/faq-category";
import { faqItem } from "./documents/faq-item";
import { legal } from "./documents/legal";
import { locale } from "./documents/locale";
import { conceptPage } from "./documents/pages/concept-page";
import { contributePage } from "./documents/pages/contribute-page";
import { faqPage } from "./documents/pages/faq-page";
import { homePage } from "./documents/pages/home-page";
import { joinPage } from "./documents/pages/join-page";
import { materialsPage } from "./documents/pages/materials-page";
import { semanticStandardsPage } from "./documents/pages/semantic-standards-page";
import { teamPage } from "./documents/pages/team-page";
import { technicalStandardsPage } from "./documents/pages/technical-standards-page";
import { useCasesPage } from "./documents/pages/use-cases-page";
import { partner } from "./documents/partner";
import { person } from "./documents/person";
import { post } from "./documents/post";
import { resource } from "./documents/resource";
import { siteSettings } from "./documents/site-settings";
import {
  comingSoonCopy,
  emptyStateCopy,
  eventUiCopy,
  faqSearchCopy,
  footerCopy,
  footerLogo,
  languageSwitcherCopy,
  navigationItem,
  partnerMapCopy,
  postUiCopy,
} from "./objects/global-copy";
import { imageWithMetadata } from "./objects/image-with-metadata";
import { internalOrExternalLink } from "./objects/internal-or-external-link";
import { legalPage } from "./objects/legal-page";
import {
  brandLockup,
  comicFrame,
  comicReferenceSection,
  homeHero,
  mapEmbedCopy,
  networkSection,
  networkSegment,
  videoSection,
} from "./objects/media-network-content";
import { pageIntro } from "./objects/page-intro";
import { portableText } from "./objects/portable-text";
import {
  resourcePlacement,
  resourceSection,
} from "./objects/resource-content";
import {
  featureItem,
  featureSection,
  implementationSection,
  localizedListItem,
  numberedStep,
  quoteItem,
  quoteSection,
  sectionHeading,
  textSection,
} from "./objects/section-content";
import { seo } from "./objects/seo";
import {
  dataFlowItem,
  dataFlowSection,
  dataFlowStage,
  journeySection,
  journeyStation,
  timelineSection,
} from "./objects/timeline-data-flow";

export const schemaTypes = [
  portableText,
  imageWithMetadata,
  internalOrExternalLink,
  seo,
  pageIntro,
  sectionHeading,
  textSection,
  featureItem,
  featureSection,
  localizedListItem,
  numberedStep,
  implementationSection,
  quoteItem,
  quoteSection,
  homeHero,
  videoSection,
  comicFrame,
  comicReferenceSection,
  brandLockup,
  networkSegment,
  networkSection,
  mapEmbedCopy,
  journeyStation,
  journeySection,
  timelineSection,
  dataFlowItem,
  dataFlowStage,
  dataFlowSection,
  resourcePlacement,
  resourceSection,
  navigationItem,
  languageSwitcherCopy,
  footerLogo,
  footerCopy,
  emptyStateCopy,
  comingSoonCopy,
  postUiCopy,
  eventUiCopy,
  faqSearchCopy,
  partnerMapCopy,
  legalPage,
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
  faqPage,
  legal,
  locale,
  person,
  faqCategory,
  faqItem,
  event,
  partner,
  post,
  resource,
  comicStrip,
];
