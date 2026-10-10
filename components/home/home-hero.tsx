import { urlFor } from "@/sanity/lib/image";
import { defaultTagline } from "@/sanity/content/defaults";
import { getHomeContent, getSiteSettings } from "@/sanity/lib/page-content";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/common/container";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export async function HomeHero() {
  const [{ hero: copy }, settings] = await Promise.all([
    getHomeContent(),
    getSiteSettings(),
  ]);
  return (
    <section
      className="relative isolate overflow-hidden bg-background"
      aria-labelledby="home-hero-heading"
    >
      {/* Juhudi brand watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden"
      >
        <div className="relative size-112 shrink-0 sm:size-152 lg:size-208 xl:size-240">
          <Image
            src="/brand/juhudi-mark.svg"
            alt=""
            fill
            sizes="(min-width: 1280px) 960px, (min-width: 1024px) 832px, (min-width: 640px) 608px, 448px"
            className="object-contain opacity-[0.035] sm:opacity-[0.04] lg:opacity-[0.045]"
          />
        </div>
      </div>

      <Container>
        <div className="grid items-center gap-10 py-12 sm:gap-12 sm:py-16 lg:min-h-160 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:py-20 xl:gap-20">
          <div className="flex min-w-0 flex-col items-center text-center lg:items-start lg:text-left">
            <Reveal>
              <p className="text-xs font-semibold tracking-[0.18em] text-primary sm:text-sm uppercase">
                {settings?.tagline ?? defaultTagline}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <h1
                id="home-hero-heading"
                className="mt-5 max-w-2xl font-heading text-4xl font-semibold leading-[1.04] tracking-[-0.03em] text-balance sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[4rem]"
              >
                {copy.title}
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-6 max-w-lg text-base leading-7 text-pretty text-foreground/60 sm:text-lg sm:leading-8">
                {copy.description}
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
                  Explore our work
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
                  Get involved
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="w-full min-w-0">
            <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-muted sm:aspect-3/2 lg:aspect-4/3">
              <Image
                src={
                  copy.image?.asset?._ref
                    ? urlFor(copy.image)
                        .width(1280)
                        .height(960)
                        .fit("crop")
                        .url()
                    : "/images/home/juhudi-team.png"
                }
                alt={copy.image?.alt ?? copy.imageAlt}
                fill
                preload
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
