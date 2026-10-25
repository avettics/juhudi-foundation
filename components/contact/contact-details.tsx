import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowUpRightIcon,
  ClockIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

import { Container } from "@/components/common/container";
import { Reveal } from "@/components/motion/reveal";
import { sanityFetch } from "@/sanity/lib/live";
import { CONTACT_INFORMATION_QUERY } from "@/sanity/queries/contact-information";

const contactLinkClassName =
  "max-w-full wrap-break-word rounded-sm text-sm leading-6 text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:text-base sm:leading-7";

function getPhoneHref(number: string) {
  return `tel:${number.replace(/[^\d+]/g, "")}`;
}

function getWhatsAppHref(number: string) {
  return `https://wa.me/${number.replace(/\D/g, "")}`;
}

export async function ContactDetails() {
  const { data: contact } = await sanityFetch({
    query: CONTACT_INFORMATION_QUERY,
  });

  if (!contact) {
    return null;
  }

  const location = [
    contact.addressLine,
    contact.district,
    contact.city,
    contact.country,
  ]
    .filter(Boolean)
    .join(", ");

  const hasContactDetails =
    location ||
    contact.primaryEmail ||
    contact.primaryPhone ||
    contact.whatsappNumber ||
    contact.officeHours?.length;

  if (!hasContactDetails) {
    return null;
  }

  return (
    <section
      className="bg-background py-12 sm:py-16 lg:py-20 xl:py-24"
      aria-label="Contact information"
    >
      <Container>
        <Reveal>
          <div className="mx-auto max-w-5xl border-y border-border">
            <div className="grid min-w-0 lg:grid-cols-[0.9fr_1.1fr]">
              {location ? (
                <div className="min-w-0 py-7 sm:py-9 lg:flex lg:flex-col lg:justify-center lg:py-10 lg:pr-12 xl:pr-16">
                  <div className="flex items-center gap-2.5 text-primary sm:gap-3">
                    <MapPinIcon
                      aria-hidden="true"
                      className="size-5 shrink-0"
                    />

                    <p className="text-xs font-semibold tracking-[0.16em] sm:text-sm sm:tracking-[0.18em]">
                      LOCATION
                    </p>
                  </div>

                  <p className="mt-4 max-w-md wrap-break-word text-pretty text-lg font-medium leading-7 text-foreground sm:mt-5 sm:text-xl sm:leading-8 lg:text-2xl lg:leading-9">
                    {location}
                  </p>

                  {contact.postalAddress ? (
                    <p className="mt-2 max-w-md wrap-break-word text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                      {contact.postalAddress}
                    </p>
                  ) : null}

                  {contact.mapUrl ? (
                    <Link
                      href={contact.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-5 inline-flex min-h-11 w-fit items-center gap-1.5 rounded-sm py-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:mt-6"
                    >
                      View on map
                      <ArrowUpRightIcon
                        aria-hidden="true"
                        className="size-3.5 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </Link>
                  ) : null}
                </div>
              ) : null}

              <div
                className={
                  location
                    ? "min-w-0 border-t border-border lg:border-t-0 lg:border-l lg:pl-12 xl:pl-16"
                    : "min-w-0"
                }
              >
                {contact.primaryEmail ? (
                  <ContactItem
                    icon={<MailIcon className="size-5" />}
                    label="Email"
                  >
                    <a
                      href={`mailto:${contact.primaryEmail}`}
                      className={contactLinkClassName}
                    >
                      {contact.primaryEmail}
                    </a>

                    {contact.secondaryEmail ? (
                      <a
                        href={`mailto:${contact.secondaryEmail}`}
                        className={contactLinkClassName}
                      >
                        {contact.secondaryEmail}
                      </a>
                    ) : null}
                  </ContactItem>
                ) : null}

                {contact.primaryPhone ? (
                  <ContactItem
                    icon={<PhoneIcon className="size-5" />}
                    label="Phone"
                  >
                    <a
                      href={getPhoneHref(contact.primaryPhone)}
                      className={contactLinkClassName}
                    >
                      {contact.primaryPhone}
                    </a>

                    {contact.secondaryPhone ? (
                      <a
                        href={getPhoneHref(contact.secondaryPhone)}
                        className={contactLinkClassName}
                      >
                        {contact.secondaryPhone}
                      </a>
                    ) : null}
                  </ContactItem>
                ) : null}

                {contact.whatsappNumber ? (
                  <ContactItem
                    icon={<FaWhatsapp className="size-5" />}
                    label="WhatsApp"
                  >
                    <a
                      href={getWhatsAppHref(contact.whatsappNumber)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={contactLinkClassName}
                      aria-label={`Chat with Juhudi Foundation on WhatsApp at ${contact.whatsappNumber}`}
                    >
                      {contact.whatsappNumber}
                    </a>
                  </ContactItem>
                ) : null}

                {contact.officeHours?.length ? (
                  <ContactItem
                    icon={<ClockIcon className="size-5" />}
                    label="Office hours"
                    last
                  >
                    {contact.officeHours.map((item, index) => (
                      <p
                        key={`${item.days ?? "office-hours"}-${index}`}
                        className="max-w-full wrap-break-word text-sm leading-6 text-foreground sm:text-base sm:leading-7"
                      >
                        {item.days}
                        {item.days && item.hours ? " · " : ""}
                        {item.hours}
                      </p>
                    ))}
                  </ContactItem>
                ) : null}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function ContactItem({
  icon,
  label,
  children,
  last = false,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
  last?: boolean;
}) {
  return (
    <div
      className={`flex min-w-0 gap-3 py-5 sm:gap-4 sm:py-6 lg:py-7 ${
        last ? "" : "border-b border-border"
      }`}
    >
      <span
        aria-hidden="true"
        className="mt-0.5 flex size-5 shrink-0 items-center justify-center text-primary"
      >
        {icon}
      </span>

      <div className="min-w-0 flex-1">
        <h2 className="font-heading text-sm font-semibold leading-5 text-muted-foreground">
          {label}
        </h2>

        <div className="mt-1.5 flex min-w-0 flex-col items-start gap-1">
          {children}
        </div>
      </div>
    </div>
  );
}
