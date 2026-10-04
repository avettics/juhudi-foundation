import { defineQuery } from "next-sanity";

/**
 * Event collection used by /events, event cards,
 * featured sections, and other event listings.
 */
export const EVENTS_QUERY = defineQuery(`
  *[_type == "event"] | order(startAt asc, title asc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    startAt,
    endAt,
    format,
    venue,
    location,

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
 * Full event content used by /events/[slug].
 */
export const EVENT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "event" && slug.current == $slug][0] {
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

    startAt,
    endAt,
    format,
    venue,
    location,
    onlineUrl,

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

    participationLink {
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
        alt
      },
      noIndex
    }
  }
`);
