import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Container } from "@/components/common/container";
import { Reveal } from "@/components/motion/reveal";

export function WhoWeAre() {
  return (
    <section
      className="bg-muted/40 py-16 sm:py-20 lg:py-24 xl:py-28"
      aria-labelledby="who-we-are-heading"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16 xl:gap-24">
          <Reveal>
            <div className="max-w-xl">
              <p className="text-xs font-semibold tracking-[0.18em] text-primary sm:text-sm">
                WHO WE ARE
              </p>

              <h2
                id="who-we-are-heading"
                className="mt-5 font-heading text-3xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-4xl lg:text-5xl xl:text-[3.5rem]"
              >
                Building potential. Creating possibility.
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="max-w-2xl lg:pt-1">
              <p className="text-lg leading-8 text-foreground sm:text-xl sm:leading-9">
                Juhudi Foundation creates opportunities for youth and women to
                learn, grow, lead, and build stronger futures.
              </p>

              <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                Through education, mentorship, skills development, innovation,
                and community engagement, we work alongside communities to
                strengthen self-reliance and support lasting progress.
              </p>

              <Link
                href="/about"
                className="group mt-7 inline-flex min-h-11 items-center gap-2 rounded-sm font-semibold text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                Discover our story
                <ArrowRightIcon
                  aria-hidden="true"
                  className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
