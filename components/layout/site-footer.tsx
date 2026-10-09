import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";

import { Container } from "@/components/common/container";
import { resolveExternalHref } from "@/sanity/lib/links";
import { sanityFetch } from "@/sanity/lib/live";
import { CONTACT_INFORMATION_QUERY } from "@/sanity/queries/contact-information";
import { SITE_SETTINGS_QUERY } from "@/sanity/queries/site-settings";

const exploreLinks = [
  { label: "About", href: "/about" },
  { label: "Our Work", href: "/our-work" },
  { label: "Projects", href: "/projects" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
] as const;

const involvementLinks = [
  { label: "Volunteer with us", href: "/get-involved/volunteer" },
  { label: "Partner with us", href: "/get-involved/partner" },
  { label: "Support us", href: "/get-involved/support" },
] as const;

const footerLinkClassName =
  "rounded-sm text-sm leading-6 text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60";

const contactLinkClassName =
  "min-w-0 rounded-sm text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60";

export async function SiteFooter() {
  const [{ data: settings }, { data: contact }] = await Promise.all([
    sanityFetch({ query: SITE_SETTINGS_QUERY }),
    sanityFetch({ query: CONTACT_INFORMATION_QUERY }),
  ]);

  const description =
    settings?.footerDescription ?? settings?.siteDescription ?? null;

  const location = [
    contact?.addressLine,
    contact?.district,
    contact?.city,
    contact?.country,
  ]
    .filter(Boolean)
    .join(", ");

  const copyright = `© ${new Date().getFullYear()} ${
    settings?.copyrightText?.trim() || "Juhudi Foundation. All rights reserved."
  }`;

  return (
    <footer className="wrap-anywhere bg-black text-white">
      <Container>
        <div className="grid gap-x-8 gap-y-10 py-12 sm:py-14 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.25fr] lg:gap-x-10 lg:py-16">
          <div className="max-w-sm">
            <Link
              href="/"
              aria-label="Juhudi Foundation home"
              className="inline-flex rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
            >
              <Image
                src="/brand/juhudi-logo-white.svg"
                alt="Juhudi Foundation"
                width={2993}
                height={1683}
                className="h-auto w-40 sm:w-44"
              />
            </Link>

            {description ? (
              <p className="mt-5 max-w-xs text-sm leading-6 text-white/70">
                {description}
              </p>
            ) : null}

            {settings?.tagline ? (
              <p className="mt-4 text-sm font-semibold tracking-wide text-white">
                {settings.tagline}
              </p>
            ) : null}
          </div>

          <FooterSection title="Explore">
            {exploreLinks.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterSection>

          <FooterSection title="Get Involved">
            {involvementLinks.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterSection>

          <div>
            <FooterHeading>Contact</FooterHeading>

            <div className="mt-5 flex flex-col gap-3.5 text-sm leading-6 text-white/70">
              {location ? (
                <div className="flex items-start gap-2.5">
                  <MapPinIcon
                    aria-hidden="true"
                    className="mt-1 size-4 shrink-0 text-white/50"
                  />
                  <p className="max-w-xs text-pretty">{location}</p>
                </div>
              ) : null}

              {contact?.primaryEmail ? (
                <div className="flex min-w-0 items-start gap-2.5">
                  <MailIcon
                    aria-hidden="true"
                    className="mt-1 size-4 shrink-0 text-white/50"
                  />
                  <a
                    href={`mailto:${contact.primaryEmail}`}
                    className={`${contactLinkClassName} wrap-break-word`}
                  >
                    {contact.primaryEmail}
                  </a>
                </div>
              ) : null}

              {contact?.primaryPhone ? (
                <div className="flex min-w-0 items-start gap-2.5">
                  <PhoneIcon
                    aria-hidden="true"
                    className="mt-1 size-4 shrink-0 text-white/50"
                  />
                  <a
                    href={`tel:${toTelephoneHref(contact.primaryPhone)}`}
                    className={contactLinkClassName}
                  >
                    {contact.primaryPhone}
                  </a>
                </div>
              ) : null}
            </div>

            {settings?.socialLinks?.length ? (
              <nav
                aria-label="Social media"
                className="mt-6 flex flex-wrap gap-x-4 gap-y-2"
              >
                {settings.socialLinks.map((social) => {
                  const href = resolveExternalHref(social?.url);

                  if (!social?.platform || !href) {
                    return null;
                  }

                  return (
                    <a
                      key={`${social.platform}-${social.url}`}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={footerLinkClassName}
                    >
                      {social.platform}
                    </a>
                  );
                })}
              </nav>
            ) : null}
          </div>
        </div>

        <div className="border-t border-white/15 py-5">
          <div className="flex flex-col items-center gap-1 text-center text-xs leading-5 text-white/60 sm:flex-row sm:justify-between sm:gap-6 sm:text-left sm:text-sm">
            <p>{copyright}</p>

            <p className="shrink-0">
              Built by{" "}
              <a
                href="https://avettics.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm font-medium text-white/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                Avettics Limited
              </a>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <FooterHeading>{title}</FooterHeading>

      <div className="mt-5 flex flex-col items-start gap-3">{children}</div>
    </div>
  );
}

function FooterHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-heading text-sm font-semibold text-white">
      {children}
    </h2>
  );
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className={footerLinkClassName}>
      {children}
    </Link>
  );
}

function toTelephoneHref(phone: string) {
  return phone.replace(/[^\d+]/g, "");
}
