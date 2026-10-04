import { defineQuery } from "next-sanity";

/**
 * Public Juhudi Foundation partners used across partner sections,
 * programme/project context, and featured partnership displays.
 */
export const PARTNERS_QUERY = defineQuery(`
  *[_type == "partner"] | order(order asc, name asc) {
    _id,
    name,
    partnerType,
    description,
    websiteUrl,

    programmes[]-> {
      _id,
      title,
      "slug": slug.current
    },

    projects[]-> {
      _id,
      title,
      "slug": slug.current,
      status
    },

    logo {
      asset,
      alt,
      hotspot,
      crop
    },

    featured,
    order
  }
`);
