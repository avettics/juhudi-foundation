import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Container } from "@/components/common/container";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ContributeBridge() {
  return (
    <section
      className="bg-muted/40 py-14 sm:py-16 lg:py-20 xl:py-24"
      aria-labelledby="contribute-bridge-heading"
    >
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold tracking-[0.18em] text-primary sm:text-sm">
              CONTRIBUTE
            </p>

            <h2
              id="contribute-bridge-heading"
              className="mx-auto mt-5 max-w-2xl text-balance font-heading text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl"
            >
              Prefer to support the work?
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              Your contribution can help us reach more people and communities.
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
