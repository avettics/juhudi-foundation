import { getOurWorkContent, getSiteSettings } from "@/sanity/lib/page-content";
import { buildMetadata } from "@/sanity/lib/metadata";
import { pageContentDefaults } from "@/sanity/content/defaults";
import type { Metadata } from "next";

import { PageHeader } from "@/components/common/page-header";

export async function generateMetadata(): Promise<Metadata> {
  const [content, settings] = await Promise.all([
    getOurWorkContent(),
    getSiteSettings(),
  ]);
  return buildMetadata({
    seo: content.seo,
    defaultSeo: settings?.seo,
    fallbackTitle: "Our Work",
    fallbackDescription: pageContentDefaults.ourWork.seo.metaDescription,
  });
}

export default async function OurWorkPage() {
  const { header } = await getOurWorkContent();
  return (
    <PageHeader
      eyebrow="OUR WORK"
      title={header.title}
      description={header.description}
    />
  );
}
