import type { Metadata } from "next";

import { PageHeader } from "@/components/common/page-header";
import { pageContentDefaults } from "@/sanity/content/defaults";
import { getGalleryContent, getSiteSettings } from "@/sanity/lib/page-content";
import { buildMetadata } from "@/sanity/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const [content, settings] = await Promise.all([
    getGalleryContent(),
    getSiteSettings(),
  ]);

  return buildMetadata({
    seo: content.seo,
    defaultSeo: settings?.seo,
    fallbackTitle: "Gallery",
    fallbackDescription: pageContentDefaults.gallery.seo.metaDescription,
  });
}

export default async function GalleryPage() {
  const { header } = await getGalleryContent();

  return (
    <PageHeader
      eyebrow="GALLERY"
      title={header.title}
      description={header.description}
    />
  );
}
