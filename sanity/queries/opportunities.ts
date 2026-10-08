import { defineQuery } from "next-sanity";

/**
 * Opportunity collection used by /opportunities, /get-involved,
 * opportunity cards, featured sections, and other listings.
 */
export const OPPORTUNITIES_QUERY = defineQuery(`
  *[_type == "opportunity"] | order(deadline asc, title asc) {
    _id,
    title,
    "slug": slug.current,
    opportunityType,
    shortDescription,
    mode,
    location,
    deadline,

    programme-> {
      _id,
      title,
      "slug": slug.current
    },

    project-> {
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
 * Full opportunity content used by /opportunities/[slug].
 */
export const OPPORTUNITY_BY_SLUG_QUERY = defineQuery(`
  *[_type == "opportunity" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    opportunityType,
    shortDescription,

    content[] {
      ...,

      markDefs[] {
        ...,

        _type == "internalLink" => {
          ...,
          reference-> {
            _type,
            "slug": slug.current
          }
        }
      },

      _type == "image" => {
        asset,
        alt,
        caption,
        hotspot,
        crop
      }
    },

    mode,
    location,
    deadline,

    programme-> {
      _id,
      title,
      "slug": slug.current,
      shortDescription
    },

    project-> {
      _id,
      title,
      "slug": slug.current,
      shortDescription,
      status
    },

    applicationLink {
      label,
      linkType,
      internalLink-> {
        _type,
        "slug": slug.current
      },
      url,
      openInNewTab
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
        crop,
        hotspot,
        alt
      },
      noIndex
    }
  }
`);
