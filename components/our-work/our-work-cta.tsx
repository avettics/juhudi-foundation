import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Container } from "@/components/common/container";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function OurWorkCTA() {
  return (
    <section
      className="bg-background py-16 sm:py-20 lg:py-24 xl:py-28"
      aria-labelledby="our-work-cta-heading"
    >
      <Container>
        <Reveal>
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold tracking-[0.18em] text-primary sm:text-sm">
              NEXT
            </p>

            <h2
              id="our-work-cta-heading"
              className="mx-auto mt-5 max-w-3xl text-balance font-heading text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl"
            >
              See the work in action.
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              Explore the initiatives bringing our programme areas to life.
            </p>

            <Link
              href="/projects"
              className={cn(
                buttonVariants({ size: "lg" }),
                "group mt-8 min-h-12 px-6 font-semibold",
              )}
            >
              Explore projects
              <ArrowRightIcon
                aria-hidden="true"
                className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
