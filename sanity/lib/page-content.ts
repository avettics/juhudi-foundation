import "server-only";

import { cache } from "react";
import { pageContentDefaults } from "@/sanity/content/defaults";
import { sanityFetch } from "@/sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@/sanity/queries/site-settings";
import {
  HOME_CONTENT_QUERY,
  ABOUT_CONTENT_QUERY,
  OUR_WORK_CONTENT_QUERY,
} from "@/sanity/queries/page-content";

export const getSiteSettings = cache(async () => {
  const { data } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
  return data;
});

export const getHomeContent = cache(async () => {
  const { data } = await sanityFetch({ query: HOME_CONTENT_QUERY });
  return {
    hero: {
      title: data?.hero?.title ?? pageContentDefaults.home.hero.title,
      description:
        data?.hero?.description ?? pageContentDefaults.home.hero.description,
      imageAlt: data?.hero?.imageAlt ?? pageContentDefaults.home.hero.imageAlt,
      image: data?.hero?.image,
    },
    introduction: {
      title:
        data?.introduction?.title ??
        pageContentDefaults.home.introduction.title,
      description:
        data?.introduction?.description ??
        pageContentDefaults.home.introduction.description,
    },
    impact: {
      title: data?.impact?.title ?? pageContentDefaults.home.impact.title,
    },
    work: {
      title: data?.work?.title ?? pageContentDefaults.home.work.title,
      description:
        data?.work?.description ?? pageContentDefaults.home.work.description,
    },
    projects: {
      title: data?.projects?.title ?? pageContentDefaults.home.projects.title,
      description:
        data?.projects?.description ??
        pageContentDefaults.home.projects.description,
    },
    involvement: {
      title:
        data?.involvement?.title ?? pageContentDefaults.home.involvement.title,
      description:
        data?.involvement?.description ??
        pageContentDefaults.home.involvement.description,
      volunteerDescription:
        data?.involvement?.volunteerDescription ??
        pageContentDefaults.home.involvement.volunteerDescription,
      partnerDescription:
        data?.involvement?.partnerDescription ??
        pageContentDefaults.home.involvement.partnerDescription,
      supportDescription:
        data?.involvement?.supportDescription ??
        pageContentDefaults.home.involvement.supportDescription,
    },
    contribution: {
      title:
        data?.contribution?.title ??
        pageContentDefaults.home.contribution.title,
      description:
        data?.contribution?.description ??
        pageContentDefaults.home.contribution.description,
    },
    seo: data?.seo,
  };
});

export const getAboutContent = cache(async () => {
  const { data } = await sanityFetch({ query: ABOUT_CONTENT_QUERY });
  return {
    introduction: {
      title:
        data?.introduction?.title ??
        pageContentDefaults.about.introduction.title,
      summary:
        data?.introduction?.summary ??
        pageContentDefaults.about.introduction.summary,
      description:
        data?.introduction?.description ??
        pageContentDefaults.about.introduction.description,
      imageAlt:
        data?.introduction?.imageAlt ??
        pageContentDefaults.about.introduction.imageAlt,
      image: data?.introduction?.image,
    },
    purpose: {
      title: data?.purpose?.title ?? pageContentDefaults.about.purpose.title,
      description:
        data?.purpose?.description ??
        pageContentDefaults.about.purpose.description,
      missionTitle:
        data?.purpose?.missionTitle ??
        pageContentDefaults.about.purpose.missionTitle,
      missionDescription:
        data?.purpose?.missionDescription ??
        pageContentDefaults.about.purpose.missionDescription,
      visionTitle:
        data?.purpose?.visionTitle ??
        pageContentDefaults.about.purpose.visionTitle,
      visionDescription:
        data?.purpose?.visionDescription ??
        pageContentDefaults.about.purpose.visionDescription,
    },
    story: {
      title: data?.story?.title ?? pageContentDefaults.about.story.title,
      description:
        data?.story?.description ?? pageContentDefaults.about.story.description,
      introduction:
        data?.story?.introduction ??
        pageContentDefaults.about.story.introduction,
      paragraph1:
        data?.story?.paragraph1 ?? pageContentDefaults.about.story.paragraph1,
      paragraph2:
        data?.story?.paragraph2 ?? pageContentDefaults.about.story.paragraph2,
      paragraph3:
        data?.story?.paragraph3 ?? pageContentDefaults.about.story.paragraph3,
      closing: data?.story?.closing ?? pageContentDefaults.about.story.closing,
    },
    principles: {
      title:
        data?.principles?.title ?? pageContentDefaults.about.principles.title,
      description:
        data?.principles?.description ??
        pageContentDefaults.about.principles.description,
      items:
        data?.principles?.items ?? pageContentDefaults.about.principles.items,
    },
    team: {
      title: data?.team?.title ?? pageContentDefaults.about.team.title,
      description:
        data?.team?.description ?? pageContentDefaults.about.team.description,
    },
    header: {
      title: data?.header?.title ?? pageContentDefaults.about.header.title,
      description:
        data?.header?.description ??
        pageContentDefaults.about.header.description,
    },
    seo: data?.seo,
  };
});

export const getOurWorkContent = cache(async () => {
  const { data } = await sanityFetch({ query: OUR_WORK_CONTENT_QUERY });
  return {
    header: {
      title: data?.header?.title ?? pageContentDefaults.ourWork.header.title,
      description:
        data?.header?.description ??
        pageContentDefaults.ourWork.header.description,
    },
    seo: data?.seo,
  };
});
