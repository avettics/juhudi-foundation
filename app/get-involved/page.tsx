import type { Metadata } from "next";

import { PageHeader } from "@/components/common/page-header";
import { WaysToGetInvolved } from "@/components/get-involved/ways-to-get-involved";
import { ContributeBridge } from "@/components/get-involved/contribute-bridge";
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
    <>
      <PageHeader title={header.title} description={header.description} />

      <WaysToGetInvolved />
      <ContributeBridge />
    </>
  );
}
