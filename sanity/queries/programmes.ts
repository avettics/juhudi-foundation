import { defineQuery } from "next-sanity";

/**
 * Programme collection used by programme cards, overview sections,
 * navigation surfaces, and other programme listings.
 */
export const PROGRAMMES_QUERY = defineQuery(`
  *[_type == "programme"] | order(order asc, title asc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    focusAreas,
    featuredImage {
      asset,
      alt,
      hotspot,
      crop
    },
    featured,
    order
  }
`);

/**
 * Full programme content used by /our-work/[slug].
 */
export const PROGRAMME_BY_SLUG_QUERY = defineQuery(`
  *[_type == "programme" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
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

    focusAreas,

    featuredImage {
      asset,
      alt,
      hotspot,
      crop
    },

    featured,
    order,

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
