import type { SchemaTypeDefinition } from "sanity";

// Documents
import { campaign } from "./documents/campaign";
import { contactInformation } from "./documents/contact-information";
import { event } from "./documents/event";
import { faq } from "./documents/faq";
import { impactMetric } from "./documents/impact-metric";
import { opportunity } from "./documents/opportunity";
import { partner } from "./documents/partner";
import { programme } from "./documents/programme";
import { project } from "./documents/project";
import { report } from "./documents/report";
import { siteSettings } from "./documents/site-settings";
import { story } from "./documents/story";
import { teamMember } from "./documents/team-member";
import { testimonial } from "./documents/testimonial";

// Objects
import { blockContent } from "./objects/block-content";
import { link } from "./objects/link";
import { seo } from "./objects/seo";
import { socialLink } from "./objects/social-link";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Documents
  siteSettings,
  contactInformation,
  programme,
  project,
  campaign,
  story,
  event,
  opportunity,
  teamMember,
  partner,
  impactMetric,
  testimonial,
  report,
  faq,

  // Objects
  blockContent,
  link,
  seo,
  socialLink,
];
