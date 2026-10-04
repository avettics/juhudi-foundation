import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/sanity/lib/image";
import { resolveInternalHref } from "@/sanity/lib/links";

type RichTextImageValue = {
  _type: "image";
  asset?: {
    _ref?: string;
    _type?: "reference";
  } | null;
  alt?: string | null;
  caption?: string | null;
  hotspot?: {
    x?: number;
    y?: number;
    height?: number;
    width?: number;
  } | null;
  crop?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  } | null;
};

type ExternalLinkValue = {
  href?: string | null;
  openInNewTab?: boolean | null;
};

type InternalLinkValue = {
  reference?: {
    _type: string;
    slug?: string | null;
  } | null;
};

const components: PortableTextComponents = {
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
      const link = value as ExternalLinkValue | undefined;

      if (!link?.href) {
        return <>{children}</>;
      }

      const openInNewTab = link.openInNewTab === true;

      return (
        <a
          href={link.href}
          target={openInNewTab ? "_blank" : undefined}
          rel={openInNewTab ? "noopener noreferrer" : undefined}
          className="font-medium underline underline-offset-4"
        >
          {children}
        </a>
      );
    },

    internalLink: ({ children, value }) => {
      const link = value as InternalLinkValue | undefined;
      const href = resolveInternalHref(link?.reference);

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
      const image = value as RichTextImageValue;

      if (!image.asset?._ref) {
        return null;
      }

      const src = urlFor(image).width(1600).auto("format").url();

      return (
        <figure className="my-8">
          <Image
            src={src}
            alt={image.alt ?? ""}
            width={1600}
            height={1000}
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
  value: PortableTextBlock[] | null | undefined;
};

export function RichText({ value }: RichTextProps) {
  if (!value || value.length === 0) {
    return null;
  }

  return <PortableText value={value} components={components} />;
}
