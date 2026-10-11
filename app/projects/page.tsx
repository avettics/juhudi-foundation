import type { Metadata } from "next";

import { PageHeader } from "@/components/common/page-header";
import { pageContentDefaults } from "@/sanity/content/defaults";
import { getProjectsContent, getSiteSettings } from "@/sanity/lib/page-content";
import { buildMetadata } from "@/sanity/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const [content, settings] = await Promise.all([
    getProjectsContent(),
    getSiteSettings(),
  ]);

  return buildMetadata({
    seo: content.seo,
    defaultSeo: settings?.seo,
    fallbackTitle: "Projects",
    fallbackDescription: pageContentDefaults.projects.seo.metaDescription,
  });
}

export default async function ProjectsPage() {
  const { header } = await getProjectsContent();

  return (
    <PageHeader
      eyebrow="PROJECTS"
      title={header.title}
      description={header.description}
    />
  );
}
