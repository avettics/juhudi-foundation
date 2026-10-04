import { defineQuery } from "next-sanity";

/**
 * Project collection used by the projects page, project cards,
 * featured sections, and other project listings.
 */
export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project"] | order(startDate desc, title asc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    status,
    startDate,
    endDate,
    location,

    programme-> {
      _id,
      title,
      "slug": slug.current
    },

    featuredImage {
      asset,
      alt,
      hotspot,
      crop
    },

    featured
  }
`);

/**
 * Full project content used by /projects/[slug].
 */
export const PROJECT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    content,
    status,
    startDate,
    endDate,
    location,

    programme-> {
      _id,
      title,
      "slug": slug.current,
      shortDescription
    },

    featuredImage {
      asset,
      alt,
      hotspot,
      crop
    },

    featured,

    seo {
      metaTitle,
      metaDescription,
      socialImage {
        asset,
        alt
      },
      noIndex
    }
  }
`);
