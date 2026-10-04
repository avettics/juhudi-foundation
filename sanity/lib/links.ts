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
  return type in INTERNAL_ROUTE_PREFIXES;
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

  if (link.linkType === "external" && link.url) {
    return {
      href: link.url,
      external: true,
      openInNewTab: link.openInNewTab === true,
    };
  }

  return null;
}
