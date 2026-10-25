import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import { Container } from "@/components/common/container";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ComingSoonPage() {
  return (
    <main>
      <section
        className="flex min-h-[calc(100svh-4rem)] items-center bg-background py-12 sm:py-16 lg:py-20"
        aria-labelledby="contribute-coming-soon-heading"
      >
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold tracking-[0.18em] text-primary sm:text-sm">
                COMING SOON
              </p>

              <h1
                id="contribute-coming-soon-heading"
                className="mx-auto mt-5 max-w-2xl text-balance font-heading text-4xl font-semibold leading-[1.04] tracking-[-0.03em] sm:text-5xl lg:text-6xl"
              >
                Support our work.
              </h1>

              <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                We&apos;re preparing a secure way to contribute to Juhudi
                Foundation.
              </p>

              <Link
                href="/"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "group mt-8 min-h-11 px-5 font-semibold sm:min-h-12 sm:px-6",
                )}
              >
                <ArrowLeftIcon
                  aria-hidden="true"
                  className="size-4 shrink-0 transition-transform duration-200 group-hover:-translate-x-1"
                />
                Back home
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
