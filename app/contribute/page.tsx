import type { Metadata } from "next";

import { PageHeader } from "@/components/common/page-header";
import { pageContentDefaults } from "@/sanity/content/defaults";
import {
  getContributeContent,
  getSiteSettings,
} from "@/sanity/lib/page-content";
import { buildMetadata } from "@/sanity/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const [content, settings] = await Promise.all([
    getContributeContent(),
    getSiteSettings(),
  ]);

  return buildMetadata({
    seo: content.seo,
    defaultSeo: settings?.seo,
    fallbackTitle: "Contribute",
    fallbackDescription: pageContentDefaults.contribute.seo.metaDescription,
  });
}

export default async function ContributePage() {
  const { header } = await getContributeContent();

  return (
    <PageHeader
      eyebrow="CONTRIBUTE"
      title={header.title}
      description={header.description}
    />
  );
}
