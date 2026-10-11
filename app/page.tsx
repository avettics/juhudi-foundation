import type { Metadata } from "next";
import { getHomeContent, getSiteSettings } from "@/sanity/lib/page-content";
import { buildMetadata } from "@/sanity/lib/metadata";
import { pageContentDefaults } from "@/sanity/content/defaults";
import { ContributionCTA } from "@/components/home/contribution-cta";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { GetInvolved } from "@/components/home/get-involved";
import { HomeHero } from "@/components/home/home-hero";
import { Impact } from "@/components/home/impact";
import { OurWork } from "@/components/home/our-work";
import { WhoWeAre } from "@/components/home/who-we-are";

export async function generateMetadata(): Promise<Metadata> {
  const [content, settings] = await Promise.all([
    getHomeContent(),
    getSiteSettings(),
  ]);
  const metadata = buildMetadata({
    seo: content.seo ?? settings?.seo,
    defaultSeo: settings?.seo,
    fallbackTitle: settings?.siteTitle || "Juhudi Foundation",
    fallbackDescription:
      settings?.siteDescription ?? pageContentDefaults.home.seo.metaDescription,
  });
  return {
    ...metadata,
    title: {
      absolute:
        content.seo?.metaTitle?.trim() ||
        settings?.seo?.metaTitle?.trim() ||
        settings?.siteTitle ||
        "Juhudi Foundation",
    },
  };
}

export default function Home() {
  return (
    <>
      <HomeHero />
      <WhoWeAre />
      <Impact />
      <OurWork />
      <FeaturedProjects />
      <GetInvolved />
      <ContributionCTA />
    </>
  );
}
