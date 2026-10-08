import { defineQuery } from "next-sanity";

/**
 * Story collection used by /stories, story cards,
 * featured sections, and other story listings.
 */
export const STORIES_QUERY = defineQuery(`
  *[_type == "story"] | order(publishedAt desc, title asc) {
    _id,
    title,
    "slug": slug.current,
    storyType,
    excerpt,
    publishedAt,

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

    campaign-> {
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
 * Full story content used by /stories/[slug].
 */
export const STORY_BY_SLUG_QUERY = defineQuery(`
  *[_type == "story" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    storyType,
    excerpt,

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

    publishedAt,

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

    campaign-> {
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
        crop,
        hotspot,
        alt
      },
      noIndex
    }
  }
`);
