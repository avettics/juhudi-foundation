import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";

import { getImageDimensions, urlFor } from "@/sanity/lib/image";
import { resolveExternalHref, resolveInternalHref } from "@/sanity/lib/links";

import type { PROGRAMME_BY_SLUG_QUERY_RESULT } from "@/sanity.types";

type RichTextContent = NonNullable<PROGRAMME_BY_SLUG_QUERY_RESULT>["content"];

const components: PortableTextComponents<RichTextContent[number]> = {
  block: {
    normal: ({ children }) => (
      <p className="leading-7 not-first:mt-6">{children}</p>
    ),

    h2: ({ children }) => (
      <h2 className="mt-10 scroll-m-20 text-3xl font-semibold tracking-tight">
        {children}
      </h2>
    ),

    h3: ({ children }) => (
      <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        {children}
      </h3>
    ),

    h4: ({ children }) => (
      <h4 className="mt-6 scroll-m-20 text-xl font-semibold tracking-tight">
        {children}
      </h4>
    ),

    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-2 pl-6 italic">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="my-6 ml-6 list-disc space-y-2">{children}</ul>
    ),

    number: ({ children }) => (
      <ol className="my-6 ml-6 list-decimal space-y-2">{children}</ol>
    ),
  },

  marks: {
    externalLink: ({ children, value }) => {
      const href = resolveExternalHref(value?.href);

      if (!href) {
        return <>{children}</>;
      }

      const openInNewTab = value?.openInNewTab === true;

      return (
        <a
          href={href}
          target={openInNewTab ? "_blank" : undefined}
          rel={openInNewTab ? "noopener noreferrer" : undefined}
          className="font-medium underline underline-offset-4"
        >
          {children}
        </a>
      );
    },

    internalLink: ({ children, value }) => {
      const href = resolveInternalHref(value?.reference);

      if (!href) {
        return <>{children}</>;
      }

      return (
        <Link href={href} className="font-medium underline underline-offset-4">
          {children}
        </Link>
      );
    },
  },

  types: {
    image: ({ value }) => {
      const image = value;
      const dimensions = getImageDimensions(image);

      if (!image.asset?._ref || !dimensions) {
        return null;
      }

      const src = urlFor(image).width(1600).auto("format").url();

      return (
        <figure className="my-8">
          <Image
            src={src}
            alt={image.alt ?? ""}
            width={dimensions.width}
            height={dimensions.height}
            sizes="(max-width: 768px) 100vw, 768px"
            className="h-auto w-full rounded-lg object-cover"
          />

          {image.caption ? (
            <figcaption className="mt-2 text-sm text-muted-foreground">
              {image.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    },
  },
};

type RichTextProps = {
  value: RichTextContent | null | undefined;
};

export function RichText({ value }: RichTextProps) {
  if (!value || value.length === 0) {
    return null;
  }

  return <PortableText value={value} components={components} />;
}
