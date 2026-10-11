import { getHomeContent } from "@/sanity/lib/page-content";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Container } from "@/components/common/container";
import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";
import { sanityFetch } from "@/sanity/lib/live";
import { PROGRAMME_CARDS_QUERY } from "@/sanity/queries/programmes";

export async function OurWork() {
  const [{ work: copy }, { data: programmes }] = await Promise.all([
    getHomeContent(),
    sanityFetch({ query: PROGRAMME_CARDS_QUERY }),
  ]);

  const visibleProgrammes =
    programmes?.filter((programme) => programme.slug && programme.title) ?? [];

  if (!visibleProgrammes.length) {
    return null;
  }

  return (
    <section
      className="bg-muted/40 py-16 sm:py-20 lg:py-24 xl:py-28"
      aria-labelledby="our-work-heading"
    >
      <Container>
        <Reveal>
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold tracking-[0.18em] text-primary sm:text-sm">
              OUR WORK
            </p>

            <h2
              id="our-work-heading"
              className="mx-auto mt-5 max-w-3xl font-heading text-3xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-4xl lg:text-5xl xl:text-[3.5rem]"
            >
              {copy.title}
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              {copy.description}
            </p>

            <Link
              href="/our-work"
              className="group mt-7 inline-flex min-h-11 items-center gap-2 rounded-sm font-semibold text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              Explore all our work
              <ArrowRightIcon
                aria-hidden="true"
                className="size-4 transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid items-stretch gap-4 sm:mt-14 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-5">
          {visibleProgrammes.map((programme, index) => (
            <Reveal
              key={programme._id}
              delay={Math.min(index * 0.04, 0.16)}
              className="h-full min-w-0"
            >
              <Card className="h-full overflow-hidden border-border bg-background py-0 transition-[border-color,box-shadow] duration-200 hover:border-primary/30 hover:shadow-sm">
                <Link
                  href={`/our-work/${programme.slug}`}
                  className="group flex h-full min-w-0 flex-col rounded-xl focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-ring/50"
                >
                  <CardContent className="flex min-w-0 flex-1 flex-col p-5 sm:p-6 lg:p-7">
                    <h3 className="max-w-sm wrap-break-word font-heading text-xl font-semibold leading-[1.15] tracking-tight text-balance text-foreground transition-colors duration-200 group-hover:text-primary sm:text-2xl">
                      {programme.title}
                    </h3>

                    {programme.shortDescription ? (
                      <p className="mt-4 wrap-break-word text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                        {programme.shortDescription}
                      </p>
                    ) : null}

                    <div className="mt-auto pt-7">
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                        Explore programme
                        <ArrowRightIcon
                          aria-hidden="true"
                          className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                        />
                      </span>
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
