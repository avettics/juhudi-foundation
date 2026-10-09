import { ContributionCTA } from "@/components/home/contribution-cta";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { GetInvolved } from "@/components/home/get-involved";
import { HomeHero } from "@/components/home/home-hero";
import { Impact } from "@/components/home/impact";
import { OurWork } from "@/components/home/our-work";
import { WhoWeAre } from "@/components/home/who-we-are";

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
