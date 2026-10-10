import { getHomeContent } from "@/sanity/lib/page-content";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Container } from "@/components/common/container";
import { Reveal } from "@/components/motion/reveal";

export async function GetInvolved() {
  const { involvement: copy } = await getHomeContent();
  const involvementOptions = [
    {
      title: "Volunteer with us",
      description: copy.volunteerDescription,
      href: "/get-involved/volunteer",
      action: "Volunteer with us",
    },
    {
      title: "Partner with us",
      description: copy.partnerDescription,
      href: "/get-involved/partner",
      action: "Partner with us",
    },
    {
      title: "Support our work",
      description: copy.supportDescription,
      href: "/get-involved/support",
      action: "Ways to support",
    },
  ] as const;

  return (
    <section
      className="bg-muted/40 py-16 sm:py-20 lg:py-24 xl:py-28"
      aria-labelledby="get-involved-heading"
    >
      <Container>
        <Reveal>
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold tracking-[0.18em] text-primary sm:text-sm">
              GET INVOLVED
            </p>

            <h2
              id="get-involved-heading"
              className="mx-auto mt-5 max-w-3xl font-heading text-3xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-4xl lg:text-5xl xl:text-[3.5rem]"
            >
              {copy.title}
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              {copy.description}
            </p>
          </div>
        </Reveal>

        <div className="mt-12 border-y border-border sm:mt-14 lg:mt-16">
          <div className="grid lg:grid-cols-3">
            {involvementOptions.map((option, index) => (
              <Reveal
                key={option.href}
                delay={Math.min(index * 0.06, 0.12)}
                className="h-full min-w-0"
              >
                <div
                  className={[
                    "flex h-full min-w-0 flex-col py-8 sm:py-10 lg:px-8 lg:py-12 xl:px-10",
                    index > 0
                      ? "border-t border-border lg:border-t-0 lg:border-l"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <h3 className="wrap-break-word font-heading text-2xl font-semibold leading-[1.15] tracking-tight text-balance text-foreground sm:text-[1.75rem]">
                    {option.title}
                  </h3>

                  <p className="mt-4 max-w-sm wrap-break-word text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                    {option.description}
                  </p>

                  <div className="mt-auto pt-7">
                    <Link
                      href={option.href}
                      className="group inline-flex min-h-11 items-center gap-2 rounded-sm font-semibold text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      {option.action}
                      <ArrowRightIcon
                        aria-hidden="true"
                        className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
