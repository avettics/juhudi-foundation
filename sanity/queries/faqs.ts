import { defineQuery } from "next-sanity";

/**
 * Public frequently asked questions used across FAQ sections,
 * contribution guidance, opportunities, partnerships, and general help.
 */
export const FAQS_QUERY = defineQuery(`
  *[_type == "faq"] | order(category asc, order asc, question asc) {
    _id,
    question,
    answer,
    category,
    featured,
    order
  }
`);
