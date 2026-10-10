import { defineQuery } from "next-sanity";

export const HOME_CONTENT_QUERY = defineQuery(`
  *[_type == "siteSettings" && _id == "siteSettings"][0].homePage {
    hero { title, description, imageAlt, image { asset, alt, crop, hotspot } },
    introduction { title, description },
    impact { title },
    work { title, description },
    projects { title, description },
    involvement { title, description, volunteerDescription, partnerDescription, supportDescription },
    contribution { title, description },
    seo { metaTitle, metaDescription, noIndex, socialImage { asset, alt, crop, hotspot } }
  }
`);

export const ABOUT_CONTENT_QUERY = defineQuery(`
  *[_type == "siteSettings" && _id == "siteSettings"][0].aboutPage {
    introduction { title, summary, description, imageAlt, image { asset, alt, crop, hotspot } },
    purpose { title, description, missionTitle, missionDescription, visionTitle, visionDescription },
    story { title, description, introduction, paragraph1, paragraph2, paragraph3, closing },
    principles { title, description, items[] { _key, title, description } },
    team { title, description },
    header { title, description },
    seo { metaTitle, metaDescription, noIndex, socialImage { asset, alt, crop, hotspot } }
  }
`);

export const OUR_WORK_CONTENT_QUERY = defineQuery(`
  *[_type == "siteSettings" && _id == "siteSettings"][0].ourWorkPage {
    header { title, description },
    seo { metaTitle, metaDescription, noIndex, socialImage { asset, alt, crop, hotspot } }
  }
`);
