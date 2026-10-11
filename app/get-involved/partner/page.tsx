import type { Metadata } from "next";

import { PageHeader } from "@/components/common/page-header";
import { pageContentDefaults } from "@/sanity/content/defaults";
import { getPartnerContent, getSiteSettings } from "@/sanity/lib/page-content";
import { buildMetadata } from "@/sanity/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const [content, settings] = await Promise.all([
    getPartnerContent(),
    getSiteSettings(),
  ]);

  return buildMetadata({
    seo: content.seo,
    defaultSeo: settings?.seo,
    fallbackTitle: "Partner With Us",
    fallbackDescription: pageContentDefaults.partner.seo.metaDescription,
  });
}

export default async function PartnerPage() {
  const { header } = await getPartnerContent();

  return (
    <PageHeader
      eyebrow="PARTNER WITH US"
      title={header.title}
      description={header.description}
    />
  );
}
