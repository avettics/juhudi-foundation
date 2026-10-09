import type { Metadata } from "next";

import { PageHeader } from "@/components/common/page-header";

export const metadata: Metadata = {
  title: "Our Work | Juhudi Foundation",
  description:
    "Explore Juhudi Foundation’s work empowering people and strengthening communities.",
};

export default function OurWorkPage() {
  return (
    <PageHeader
      eyebrow="OUR WORK"
      title="Creating pathways for progress."
      description="Empowering people. Strengthening communities."
    />
  );
}
