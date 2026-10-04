import { defineQuery } from "next-sanity";

/**
 * Public Juhudi Foundation reports and publications used by
 * report listings, impact resources, and featured sections.
 */
export const REPORTS_QUERY = defineQuery(`
  *[_type == "report"] | order(publicationDate desc, title asc) {
    _id,
    title,
    reportType,
    description,
    publicationDate,
    reportingPeriod,

    file {
      asset-> {
        _id,
        url,
        originalFilename,
        mimeType,
        size
      }
    },

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

    coverImage {
      asset,
      alt,
      hotspot,
      crop
    },

    featured,
    order
  }
`);
