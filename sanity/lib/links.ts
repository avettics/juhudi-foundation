type InternalLinkTarget = {
  _type: string;
  slug?: string | null;
};

const INTERNAL_ROUTE_PREFIXES = {
  programme: "/our-work",
  project: "/projects",
  campaign: "/campaigns",
  story: "/stories",
  event: "/events",
  opportunity: "/opportunities",
} as const;

type InternalLinkType = keyof typeof INTERNAL_ROUTE_PREFIXES;

export function resolveInternalHref(
  target: InternalLinkTarget | null | undefined,
): string | null {
  if (!target?.slug) {
    return null;
  }

  if (!isInternalLinkType(target._type)) {
    return null;
  }

  return `${INTERNAL_ROUTE_PREFIXES[target._type]}/${target.slug}`;
}

function isInternalLinkType(type: string): type is InternalLinkType {
  return Object.prototype.hasOwnProperty.call(INTERNAL_ROUTE_PREFIXES, type);
}

type SanityLink = {
  linkType?: "internal" | "external" | null;
  internalLink?: InternalLinkTarget | null;
  url?: string | null;
  openInNewTab?: boolean | null;
};

export type ResolvedLink = {
  href: string;
  external: boolean;
  openInNewTab: boolean;
};

export function resolveLink(
  link: SanityLink | null | undefined,
): ResolvedLink | null {
  if (!link) {
    return null;
  }

  if (link.linkType === "internal") {
    const href = resolveInternalHref(link.internalLink);

    if (!href) {
      return null;
    }

    return {
      href,
      external: false,
      openInNewTab: false,
    };
  }

  const href = resolveExternalHref(link.url);
  if (link.linkType === "external" && href) {
    return {
      href,
      external: true,
      openInNewTab: link.openInNewTab === true,
    };
  }

  return null;
}

/** Studio validation does not cover imports or direct API writes. */
export function resolveExternalHref(
  value: string | null | undefined,
): string | null {
  const href = value?.trim();
  if (!href || /[\u0000-\u0020\u007f]/.test(href)) return null;
  try {
    const url = new URL(href);
    return ["http:", "https:", "mailto:", "tel:"].includes(url.protocol)
      ? href
      : null;
  } catch {
    return null;
  }
}
