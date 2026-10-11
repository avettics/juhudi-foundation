import type { Metadata } from "next";

import { PageHeader } from "@/components/common/page-header";
import { pageContentDefaults } from "@/sanity/content/defaults";
import {
  getGetInvolvedContent,
  getSiteSettings,
} from "@/sanity/lib/page-content";
import { buildMetadata } from "@/sanity/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const [content, settings] = await Promise.all([
    getGetInvolvedContent(),
    getSiteSettings(),
  ]);

  return buildMetadata({
    seo: content.seo,
    defaultSeo: settings?.seo,
    fallbackTitle: "Get Involved",
    fallbackDescription: pageContentDefaults.getInvolved.seo.metaDescription,
  });
}

export default async function GetInvolvedPage() {
  const { header } = await getGetInvolvedContent();

  return (
    <PageHeader
      eyebrow="GET INVOLVED"
      title={header.title}
      description={header.description}
    />
  );
}
