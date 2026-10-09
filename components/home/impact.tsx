import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Container } from "@/components/common/container";
import { Reveal } from "@/components/motion/reveal";
import { sanityFetch } from "@/sanity/lib/live";
import { IMPACT_METRICS_QUERY } from "@/sanity/queries/impact-metrics";

export async function Impact() {
  const { data: metrics } = await sanityFetch({
    query: IMPACT_METRICS_QUERY,
  });

  const featuredMetrics =
    metrics
      ?.filter(
        (metric) =>
          metric.featured && metric.title && typeof metric.value === "number",
      )
      .slice(0, 4) ?? [];

  if (!featuredMetrics.length) {
    return null;
  }

  return (
    <section
      className="bg-background py-16 sm:py-20 lg:py-24 xl:py-28"
      aria-labelledby="impact-heading"
    >
      <Container>
        <Reveal>
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold tracking-[0.18em] text-primary sm:text-sm">
              OUR IMPACT
            </p>

            <h2
              id="impact-heading"
              className="mx-auto mt-5 max-w-3xl font-heading text-3xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-4xl lg:text-5xl xl:text-[3.5rem]"
            >
              Progress that matters.
            </h2>

            <Link
              href="/impact"
              className="group mt-7 inline-flex min-h-11 items-center gap-2 rounded-sm font-semibold text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              Explore our impact
              <ArrowRightIcon
                aria-hidden="true"
                className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 border-y border-border sm:mt-14 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {featuredMetrics.map((metric, index) => (
            <Reveal
              key={metric._id}
              delay={Math.min(index * 0.05, 0.15)}
              className="h-full min-w-0"
            >
              <div
                className={[
                  "flex h-full min-w-0 flex-col py-7 sm:py-8 lg:px-7 lg:py-9",
                  index > 0 ? "border-t border-border sm:border-t-0" : "",
                  index % 2 !== 0 ? "sm:border-l sm:border-border" : "",
                  index >= 2 ? "sm:border-t sm:border-border" : "",
                  index > 0 ? "lg:border-t-0 lg:border-l lg:border-border" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <p className="font-heading text-4xl font-semibold leading-none tracking-[-0.04em] text-primary tabular-nums sm:text-5xl lg:text-[3.25rem]">
                  {metric.prefix}
                  {metric.value.toLocaleString()}
                  {metric.suffix}
                </p>

                <h3 className="mt-4 wrap-break-word font-heading text-lg font-semibold leading-6 text-foreground">
                  {metric.title}
                </h3>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
