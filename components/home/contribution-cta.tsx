import { getHomeContent } from "@/sanity/lib/page-content";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Container } from "@/components/common/container";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export async function ContributionCTA() {
  const { contribution: copy } = await getHomeContent();
  return (
    <section
      className="bg-background py-16 sm:py-20 lg:py-24 xl:py-28"
      aria-labelledby="contribution-heading"
    >
      <Container>
        <Reveal>
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold tracking-[0.18em] text-primary sm:text-sm">
              CONTRIBUTE
            </p>

            <h2
              id="contribution-heading"
              className="mx-auto mt-5 max-w-3xl font-heading text-3xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-4xl lg:text-5xl xl:text-[3.5rem]"
            >
              {copy.title}
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
              {copy.description}
            </p>

            <Link
              href="/contribute"
              className={cn(
                buttonVariants({ size: "lg" }),
                "group mt-8 min-h-12 px-6 font-semibold",
              )}
            >
              Contribute
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
