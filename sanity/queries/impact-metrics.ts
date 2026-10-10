import { defineQuery } from "next-sanity";

/**
 * Verified public impact metrics used across the impact page,
 * programme/project context, and featured impact sections.
 */
export const IMPACT_METRICS_QUERY = defineQuery(`
  *[_type == "impactMetric"] | order(order asc, title asc) {
    _id,
    title,
    value,
    prefix,
    suffix,
    description,
    asOfDate,

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

    featured,
    order
  }
`);

export const FEATURED_IMPACT_METRICS_QUERY = defineQuery(`
  *[_type == "impactMetric" && featured == true && title != "" && defined(title) && defined(value)]
    | order(order asc, title asc)[0...4] {
      _id, title, value, prefix, suffix
    }
`);
