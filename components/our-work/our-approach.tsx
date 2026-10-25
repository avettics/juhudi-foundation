import { Container } from "@/components/common/container";
import { Reveal } from "@/components/motion/reveal";
import { getOurWorkContent } from "@/sanity/lib/page-content";

export async function OurApproach() {
  const { approach } = await getOurWorkContent();

  return (
    <section
      className="bg-background py-16 sm:py-20 lg:py-24 xl:py-28"
      aria-labelledby="our-approach-heading"
    >
      <Container>
        <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-16 xl:gap-24">
          <Reveal className="min-w-0">
            <div className="max-w-xl">
              <p className="text-xs font-semibold tracking-[0.18em] text-primary sm:text-sm">
                OUR APPROACH
              </p>

              <h2
                id="our-approach-heading"
                className="mt-5 text-balance font-heading text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl"
              >
                {approach.title}
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="min-w-0">
            <div className="max-w-2xl lg:pt-9">
              <p className="wrap-break-word text-pretty text-lg font-medium leading-8 text-foreground sm:text-xl sm:leading-9">
                {approach.description}
              </p>

              <div className="mt-7 border-l-2 border-primary/30 pl-5 sm:mt-8 sm:pl-6">
                <p className="wrap-break-word text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                  {approach.supportingText}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
