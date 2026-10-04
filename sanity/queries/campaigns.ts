import { defineQuery } from "next-sanity";

/**
 * Campaign collection used by contribution surfaces,
 * campaign cards, featured sections, and campaign listings.
 */
export const CAMPAIGNS_QUERY = defineQuery(`
  *[_type == "campaign"] | order(startDate desc, title asc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    status,
    startDate,
    endDate,
    goalAmount,
    currency,

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
 * Full campaign content used by /campaigns/[slug].
 *
 * Financial transactions, donors, payments, and amount raised
 * are intentionally not sourced from Sanity.
 */
export const CAMPAIGN_BY_SLUG_QUERY = defineQuery(`
  *[_type == "campaign" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    content,
    status,
    startDate,
    endDate,
    goalAmount,
    currency,

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
