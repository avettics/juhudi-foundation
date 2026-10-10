import { getAboutContent, getSiteSettings } from "@/sanity/lib/page-content";
import { buildMetadata } from "@/sanity/lib/metadata";
import { pageContentDefaults } from "@/sanity/content/defaults";
import type { Metadata } from "next";

import { AboutIntro } from "@/components/about/about-intro";
import { GuidingPrinciples } from "@/components/about/guiding-principles";
import { MissionVision } from "@/components/about/mission-vision";
import { OurTeam } from "@/components/about/our-team";
import { OurStory } from "@/components/about/our-story";
import { PageHeader } from "@/components/common/page-header";

export async function generateMetadata(): Promise<Metadata> {
  const [content, settings] = await Promise.all([
    getAboutContent(),
    getSiteSettings(),
  ]);
  return buildMetadata({
    seo: content.seo,
    defaultSeo: settings?.seo,
    fallbackTitle: "About",
    fallbackDescription: pageContentDefaults.about.seo.metaDescription,
  });
}

export default async function AboutPage() {
  const { header } = await getAboutContent();
  return (
    <>
      <PageHeader
        eyebrow="ABOUT JUHUDI"
        title={header.title}
        description={header.description}
      />

      <AboutIntro />
      <MissionVision />
      <OurStory />
      <GuidingPrinciples />
      <OurTeam />
    </>
  );
}
