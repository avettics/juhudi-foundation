import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/common/container";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HomeHero() {
  return (
    <section className="bg-background" aria-labelledby="home-hero-heading">
      <Container>
        <div className="grid items-center gap-10 py-12 sm:gap-12 sm:py-16 lg:min-h-160 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:py-20 xl:gap-20">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <Reveal>
              <p className="text-xs font-semibold tracking-[0.18em] text-primary sm:text-sm">
                UPLIFT • EMPOWER • INSPIRE
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <h1
                id="home-hero-heading"
                className="mt-5 max-w-2xl font-heading text-4xl font-semibold leading-[1.04] tracking-[-0.03em] text-balance sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[4rem]"
              >
                Empowering people. Strengthening communities.
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-6 max-w-xl text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                We create opportunities for youth and women through education,
                skills development, leadership, innovation, and community-led
                action.
              </p>
            </Reveal>

            <Reveal delay={0.24} className="w-full">
              <div className="mx-auto mt-8 flex w-full max-w-sm flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row lg:mx-0">
                <Link
                  href="/our-work"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "min-h-12 w-full px-6 font-semibold sm:w-auto",
                  )}
                >
                  Explore Our Work
                </Link>

                <Link
                  href="/get-involved"
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                      size: "lg",
                    }),
                    "min-h-12 w-full px-6 font-semibold sm:w-auto",
                  )}
                >
                  Get Involved
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="w-full">
            <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-muted sm:aspect-3/2 lg:aspect-4/3">
              <Image
                src="/images/home/juhudi-team.png"
                alt="Juhudi Foundation team members together in Dar es Salaam"
                fill
                priority
                sizes="(min-width: 1280px) 640px, (min-width: 1024px) 55vw, (min-width: 640px) 90vw, 100vw"
                className="object-cover object-center"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
