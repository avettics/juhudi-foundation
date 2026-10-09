import Image from "next/image";
import type { ReactNode } from "react";

import { Container } from "@/components/common/container";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "relative isolate overflow-hidden border-b border-border bg-muted/60",
        className,
      )}
    >
      {/* Juhudi brand watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 -z-10 flex items-center overflow-hidden"
      >
        <div className="relative size-72 translate-x-1/4 shrink-0 sm:size-88 lg:size-105 lg:translate-x-1/5 xl:size-115">
          <Image
            src="/brand/juhudi-mark.svg"
            alt=""
            fill
            sizes="(min-width: 1280px) 460px, (min-width: 1024px) 420px, (min-width: 640px) 352px, 288px"
            className="object-contain opacity-[0.06] sm:opacity-[0.07] lg:opacity-[0.09]"
          />
        </div>
      </div>

      <Container>
        <div className="relative min-w-0 max-w-4xl py-10 sm:py-12 lg:py-14 xl:py-16">
          <Reveal>
            {eyebrow ? (
              <p className="text-xs font-semibold tracking-[0.18em] text-primary sm:text-sm">
                {eyebrow}
              </p>
            ) : null}

            <h1
              className={cn(
                "max-w-3xl font-heading text-4xl font-semibold leading-[1.04] tracking-[-0.03em] text-balance sm:text-5xl lg:text-6xl",
                eyebrow && "mt-4",
              )}
            >
              {title}
            </h1>
          </Reveal>

          {description ? (
            <Reveal delay={0.08}>
              <p className="mt-5 max-w-2xl text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                {description}
              </p>
            </Reveal>
          ) : null}

          {actions ? (
            <Reveal delay={0.14}>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                {actions}
              </div>
            </Reveal>
          ) : null}
        </div>
      </Container>
    </header>
  );
}
