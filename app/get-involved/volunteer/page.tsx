import type { Metadata } from "next";

import { PageHeader } from "@/components/common/page-header";
import { pageContentDefaults } from "@/sanity/content/defaults";
import {
  getSiteSettings,
  getVolunteerContent,
} from "@/sanity/lib/page-content";
import { buildMetadata } from "@/sanity/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const [content, settings] = await Promise.all([
    getVolunteerContent(),
    getSiteSettings(),
  ]);

  return buildMetadata({
    seo: content.seo,
    defaultSeo: settings?.seo,
    fallbackTitle: "Volunteer",
    fallbackDescription: pageContentDefaults.volunteer.seo.metaDescription,
  });
}

export default async function VolunteerPage() {
  const { header } = await getVolunteerContent();

  return (
    <PageHeader
      eyebrow="VOLUNTEER"
      title={header.title}
      description={header.description}
    />
  );
}
