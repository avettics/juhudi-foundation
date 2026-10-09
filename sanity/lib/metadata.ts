import type { Metadata } from "next";

import { urlFor } from "@/sanity/lib/image";

import type { SITE_SETTINGS_QUERY_RESULT } from "@/sanity.types";

type SeoData = NonNullable<SITE_SETTINGS_QUERY_RESULT>["seo"];
type SeoImage = NonNullable<SeoData>["socialImage"];

type BuildMetadataOptions = {
  seo?: SeoData | null;
  fallbackTitle: string;
  fallbackDescription?: string | null;
};

type SocialImage = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

export function buildMetadata({
  seo,
  fallbackTitle,
  fallbackDescription,
}: BuildMetadataOptions): Metadata {
  const title = seo?.metaTitle?.trim() || fallbackTitle.trim();

  const description =
    seo?.metaDescription?.trim() || fallbackDescription?.trim() || undefined;

  const socialImage = getSocialImage(seo?.socialImage);

  return {
    title,
    description,

    robots: seo?.noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,

    openGraph: {
      title,
      description,
      images: socialImage ? [socialImage] : undefined,
    },

    twitter: {
      card: socialImage ? "summary_large_image" : "summary",
      title,
      description,
      images: socialImage ? [socialImage.url] : undefined,
    },
  };
}

function getSocialImage(
  image: SeoImage | null | undefined,
): SocialImage | null {
  if (!image?.asset?._ref) {
    return null;
  }

  return {
    url: urlFor(image).width(1200).height(630).fit("crop").auto("format").url(),
    width: 1200,
    height: 630,
    alt: image.alt?.trim() || "",
  };
}
