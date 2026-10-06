import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Container } from "@/components/common/container";
import { Reveal } from "@/components/motion/reveal";
import { sanityFetch } from "@/sanity/lib/live";
import { PROGRAMMES_QUERY } from "@/sanity/queries/programmes";

export async function OurWork() {
  const { data: programmes } = await sanityFetch({
    query: PROGRAMMES_QUERY,
  });

  if (!programmes?.length) {
    return null;
  }

  return (
    <section
      className="bg-background py-16 sm:py-20 lg:py-24 xl:py-28"
      aria-labelledby="our-work-heading"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16 xl:gap-24">
          <Reveal>
            <div className="max-w-xl">
              <p className="text-xs font-semibold tracking-[0.18em] text-primary sm:text-sm">
                OUR WORK
              </p>

              <h2
                id="our-work-heading"
                className="mt-5 font-heading text-3xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-4xl lg:text-5xl xl:text-[3.5rem]"
              >
                Creating opportunities for people to thrive.
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="max-w-2xl lg:justify-self-end">
              <p className="text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                Across six areas of work, we help people build skills,
                strengthen their well-being, create opportunities, and
                contribute to stronger communities.
              </p>

              <Link
                href="/our-work"
                className="group mt-7 inline-flex min-h-11 items-center gap-2 rounded-sm font-semibold text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                Explore our work
                <ArrowRightIcon
                  aria-hidden="true"
                  className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid border-t border-border sm:mt-14 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {programmes.map((programme, index) => (
            <Reveal
              key={programme._id}
              delay={Math.min(index * 0.05, 0.2)}
              className="h-full"
            >
              <Link
                href={`/our-work/${programme.slug}`}
                className="group flex h-full flex-col border-b border-border py-7 transition-colors duration-200 hover:bg-muted/40 focus-visible:bg-muted/40 focus-visible:outline-none sm:px-6 sm:py-8 lg:px-8 lg:py-9"
              >
                <span className="font-heading text-sm font-semibold tracking-wide text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="mt-7">
                  <h3 className="max-w-sm font-heading text-xl font-semibold leading-snug tracking-tight text-balance text-foreground sm:text-2xl">
                    {programme.title}
                  </h3>

                  {programme.shortDescription ? (
                    <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                      {programme.shortDescription}
                    </p>
                  ) : null}
                </div>

                <div className="mt-auto flex justify-end pt-7">
                  <ArrowRightIcon
                    aria-hidden="true"
                    className="size-5 text-muted-foreground transition-[color,transform] duration-200 group-hover:translate-x-1 group-hover:text-primary group-focus-visible:text-primary"
                  />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
