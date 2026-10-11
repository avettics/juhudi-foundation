import type { Metadata } from "next";

import { PageHeader } from "@/components/common/page-header";
import { pageContentDefaults } from "@/sanity/content/defaults";
import { getContactContent, getSiteSettings } from "@/sanity/lib/page-content";
import { buildMetadata } from "@/sanity/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const [content, settings] = await Promise.all([
    getContactContent(),
    getSiteSettings(),
  ]);

  return buildMetadata({
    seo: content.seo,
    defaultSeo: settings?.seo,
    fallbackTitle: "Contact",
    fallbackDescription: pageContentDefaults.contact.seo.metaDescription,
  });
}

export default async function ContactPage() {
  const { header } = await getContactContent();

  return (
    <PageHeader
      eyebrow="CONTACT"
      title={header.title}
      description={header.description}
    />
  );
}
