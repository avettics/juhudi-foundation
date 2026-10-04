import { defineQuery } from "next-sanity";

/**
 * Approved public testimonials used across the website,
 * including impact, programme, project, and featured sections.
 */
export const TESTIMONIALS_QUERY = defineQuery(`
  *[_type == "testimonial"] | order(order asc, name asc) {
    _id,
    quote,
    name,
    testimonialType,
    role,
    organisation,

    programme-> {
      _id,
      title,
      "slug": slug.current
    },

    project-> {
      _id,
      title,
      "slug": slug.current,
      status
    },

    photo {
      asset,
      alt,
      hotspot,
      crop
    },

    featured,
    order
  }
`);
