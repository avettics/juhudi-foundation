import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Container } from "@/components/common/container";
import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";
import { getGetInvolvedContent } from "@/sanity/lib/page-content";

export async function WaysToGetInvolved() {
  const { ways } = await getGetInvolvedContent();

  const involvementOptions = [
    {
      title: "Volunteer with us",
      href: "/get-involved/volunteer",
      description: ways.volunteerDescription,
      action: "Explore volunteering",
    },
    {
      title: "Partner with us",
      href: "/get-involved/partner",
      description: ways.partnerDescription,
      action: "Explore partnerships",
    },
  ] as const;

  return (
    <section
      className="bg-background py-14 sm:py-16 lg:py-20 xl:py-24"
      aria-labelledby="ways-to-get-involved-heading"
    >
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold tracking-[0.18em] text-primary sm:text-sm">
              GET INVOLVED
            </p>

            <h2
              id="ways-to-get-involved-heading"
              className="mt-5 text-balance font-heading text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl"
            >
              {ways.title}
            </h2>
          </div>
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-5xl items-stretch gap-5 sm:mt-12 md:grid-cols-2 lg:mt-14 lg:gap-6">
          {involvementOptions.map((option, index) => (
            <Reveal
              key={option.href}
              delay={index * 0.06}
              className="h-full min-w-0"
            >
              <Card className="group h-full overflow-hidden border-border bg-background py-0 transition-[border-color,box-shadow] duration-200 hover:border-primary/30 hover:shadow-sm">
                <Link
                  href={option.href}
                  className="flex h-full min-w-0 flex-col rounded-xl focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-ring/50"
                >
                  <CardContent className="flex min-w-0 flex-1 flex-col p-6 sm:p-7 lg:p-8">
                    <h3 className="max-w-md wrap-break-word text-balance font-heading text-2xl font-semibold leading-[1.1] tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary sm:text-3xl">
                      {option.title}
                    </h3>

                    <p className="mt-5 max-w-lg wrap-break-word text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                      {option.description}
                    </p>

                    <div className="mt-auto pt-8">
                      <div className="border-t border-border/80 pt-5">
                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                          {option.action}

                          <ArrowRightIcon
                            aria-hidden="true"
                            className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                          />
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
