import { defineQuery } from "next-sanity";

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings" && _id == "siteSettings"][0] {
    _id,
    siteTitle,
    tagline,
    siteDescription,

    contributionCta {
      label,
      linkType,
      internalLink-> {
        _type,
        "slug": slug.current
      },
      url,
      openInNewTab
    },

    getInvolvedCta {
      label,
      linkType,
      internalLink-> {
        _type,
        "slug": slug.current
      },
      url,
      openInNewTab
    },

    socialLinks[] {
      platform,
      url
    },

    footerDescription,
    copyrightText,

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
