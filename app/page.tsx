import { FeaturedProjects } from "@/components/home/featured-projects";
import { HomeHero } from "@/components/home/home-hero";
import { OurWork } from "@/components/home/our-work";
import { WhoWeAre } from "@/components/home/who-we-are";

export default function Home() {
  return (
    <>
      <HomeHero />
      <WhoWeAre />
      <OurWork />
      <FeaturedProjects />
    </>
  );
}
