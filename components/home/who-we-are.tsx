import { getHomeContent } from "@/sanity/lib/page-content";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Container } from "@/components/common/container";
import { Reveal } from "@/components/motion/reveal";

export async function WhoWeAre() {
  const { introduction: copy } = await getHomeContent();
  return (
    <section
      className="bg-muted/40 py-16 sm:py-20 lg:py-24 xl:py-28"
      aria-labelledby="who-we-are-heading"
    >
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.18em] text-primary sm:text-sm">
              WHO WE ARE
            </p>

            <h2
              id="who-we-are-heading"
              className="mx-auto mt-5 max-w-3xl font-heading text-3xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-4xl lg:text-5xl xl:text-[3.5rem]"
            >
              {copy.title}
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-pretty text-foreground sm:text-xl sm:leading-9">
              {copy.description}
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <Link
              href="/about"
              className="group mt-8 inline-flex min-h-11 items-center gap-2 rounded-sm font-semibold text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              Discover our story
              <ArrowRightIcon
                aria-hidden="true"
                className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
