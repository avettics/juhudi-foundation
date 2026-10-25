import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon, MailIcon, PhoneIcon } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

import { Container } from "@/components/common/container";
import { resolveExternalHref } from "@/sanity/lib/links";
import { sanityFetch } from "@/sanity/lib/live";
import { getSiteSettings } from "@/sanity/lib/page-content";
import { CONTACT_INFORMATION_QUERY } from "@/sanity/queries/contact-information";

const exploreLinks = [
  { label: "About", href: "/about" },
  { label: "Our Work", href: "/our-work" },
  { label: "Projects", href: "/projects" },
] as const;

const involvementLinks = [
  { label: "Volunteer with us", href: "/get-involved/volunteer" },
  { label: "Partner with us", href: "/get-involved/partner" },
  { label: "Contribute", href: "/contribute" },
] as const;

const footerLinkClassName =
  "rounded-sm text-sm leading-6 text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60";

const contactLinkClassName =
  "min-w-0 rounded-sm text-sm leading-6 text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60";

const externalLinkClassName =
  "group inline-flex items-center gap-1 rounded-sm text-sm leading-6 text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60";

export async function SiteFooter() {
  const [settings, { data: contact }] = await Promise.all([
    getSiteSettings(),
    sanityFetch({ query: CONTACT_INFORMATION_QUERY }),
  ]);

  const description =
    settings?.footerDescription ?? settings?.siteDescription ?? null;

  const copyrightText =
    settings?.copyrightText?.trim() ||
    "Juhudi Foundation. All rights reserved.";

  const copyright = `© ${new Date().getFullYear()} ${copyrightText}`;

  return (
    <footer className="wrap-anywhere bg-black text-white">
      <Container>
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 py-12 *:min-w-0 sm:py-14 md:grid-cols-2 lg:grid-cols-[1.55fr_0.85fr_1fr_1.3fr] lg:gap-x-12 lg:py-16 xl:gap-x-16">
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
              <p className="mt-5 max-w-xs text-pretty text-sm leading-6 text-white/70">
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

            <div className="mt-5 flex flex-col gap-3.5">
              {contact?.primaryEmail ? (
                <ContactRow
                  icon={
                    <MailIcon
                      aria-hidden="true"
                      className="size-4 text-white/50"
                    />
                  }
                >
                  <a
                    href={`mailto:${contact.primaryEmail}`}
                    className={`${contactLinkClassName} wrap-break-word`}
                  >
                    {contact.primaryEmail}
                  </a>
                </ContactRow>
              ) : null}

              {contact?.primaryPhone ? (
                <ContactRow
                  icon={
                    <PhoneIcon
                      aria-hidden="true"
                      className="size-4 text-white/50"
                    />
                  }
                >
                  <a
                    href={`tel:${toTelephoneHref(contact.primaryPhone)}`}
                    className={contactLinkClassName}
                  >
                    {contact.primaryPhone}
                  </a>
                </ContactRow>
              ) : null}

              {contact?.whatsappNumber ? (
                <ContactRow
                  icon={
                    <FaWhatsapp
                      aria-hidden="true"
                      className="size-4 text-white/50"
                    />
                  }
                >
                  <a
                    href={`https://wa.me/${toWhatsAppHref(
                      contact.whatsappNumber,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={contactLinkClassName}
                    aria-label={`Chat with Juhudi Foundation on WhatsApp at ${contact.whatsappNumber}`}
                  >
                    {contact.whatsappNumber}
                  </a>
                </ContactRow>
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
                      className={externalLinkClassName}
                    >
                      {formatSocialPlatform(social.platform)}

                      <ArrowUpRightIcon
                        aria-hidden="true"
                        className="size-3.5 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
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
                className="group inline-flex items-center gap-1 rounded-sm font-medium text-white/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                Avettics Limited
                <ArrowUpRightIcon
                  aria-hidden="true"
                  className="size-3.5 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
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
    <h2 className="font-heading text-sm font-semibold tracking-wide text-white">
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

function ContactRow({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex min-w-0 items-start gap-2.5">
      <span aria-hidden="true" className="mt-1 flex shrink-0">
        {icon}
      </span>

      <div className="min-w-0">{children}</div>
    </div>
  );
}

function toTelephoneHref(phone: string) {
  return phone.replace(/[^\d+]/g, "");
}

function toWhatsAppHref(phone: string) {
  return phone.replace(/\D/g, "");
}

function formatSocialPlatform(platform: string) {
  const labels: Record<string, string> = {
    facebook: "Facebook",
    instagram: "Instagram",
    linkedin: "LinkedIn",
    x: "X",
    youtube: "YouTube",
    tiktok: "TikTok",
    whatsapp: "WhatsApp",
  };

  return labels[platform.toLowerCase()] ?? platform;
}
