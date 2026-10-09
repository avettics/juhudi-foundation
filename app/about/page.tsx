import type { Metadata } from "next";

import { AboutIntro } from "@/components/about/about-intro";
import { GuidingPrinciples } from "@/components/about/guiding-principles";
import { MissionVision } from "@/components/about/mission-vision";
import { OurTeam } from "@/components/about/our-team";
import { OurStory } from "@/components/about/our-story";
import { PageHeader } from "@/components/common/page-header";

export const metadata: Metadata = {
  title: "About Juhudi Foundation",
  description:
    "Discover Juhudi Foundation, our purpose, our story, and the people behind our work.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="ABOUT JUHUDI"
        title="Uplift, Empower, Inspire"
        description="Creating opportunities for people and communities to thrive."
      />

      <AboutIntro />
      <MissionVision />
      <OurStory />
      <GuidingPrinciples />
      <OurTeam />
    </>
  );
}
