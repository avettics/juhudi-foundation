import { urlFor } from "@/sanity/lib/image";
import { getAboutContent } from "@/sanity/lib/page-content";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Container } from "@/components/common/container";
import { Reveal } from "@/components/motion/reveal";

export async function AboutIntro() {
  const { introduction: copy } = await getAboutContent();
  return (
    <section
      className="bg-background py-16 sm:py-20 lg:py-24"
      aria-labelledby="about-intro-heading"
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 xl:gap-20">
          {/* Content */}
          <Reveal>
            <div className="max-w-xl">
              <p className="text-xs font-semibold tracking-[0.18em] text-primary sm:text-sm">
                WHO WE ARE
              </p>

              <h2
                id="about-intro-heading"
                className="mt-5 font-heading text-3xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-4xl lg:text-5xl"
              >
                {copy.title}
              </h2>

              <p className="mt-6 font-heading text-xl font-medium leading-8 tracking-[-0.01em] text-balance text-foreground sm:text-2xl sm:leading-9">
                {copy.summary}
              </p>

              <p className="mt-5 text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                {copy.description}
              </p>

              <Link
                href="/our-work"
                className="group mt-7 inline-flex min-h-11 items-center gap-2 rounded-sm font-semibold text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                Explore our work
                <ArrowRightIcon
                  aria-hidden="true"
                  className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </Reveal>

          {/* Image */}
          <Reveal delay={0.08} className="w-full min-w-0">
            <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-muted sm:aspect-3/2 lg:aspect-4/3">
              <Image
                src={
                  copy.image?.asset?._ref
                    ? urlFor(copy.image)
                        .width(1280)
                        .height(960)
                        .fit("crop")
                        .url()
                    : "/images/home/juhudifoundation.png"
                }
                alt={copy.image?.alt ?? copy.imageAlt}
                fill
                sizes="(min-width: 1280px) 620px, (min-width: 1024px) 52vw, 100vw"
                className="object-cover object-center"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
