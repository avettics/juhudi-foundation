import { Container } from "@/components/common/container";
import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";

const principles = [
  {
    title: "People first",
    description:
      "We put people, their dignity, and their potential at the heart of our work.",
  },
  {
    title: "Opportunity",
    description:
      "We create pathways for people to learn, grow, participate, and lead.",
  },
  {
    title: "Self-reliance",
    description:
      "We strengthen skills and confidence that help people shape their own futures.",
  },
  {
    title: "Lasting progress",
    description:
      "We pursue change that strengthens people and communities beyond the present.",
  },
] as const;

export function GuidingPrinciples() {
  return (
    <section
      className="bg-muted/40 py-16 sm:py-20 lg:py-24"
      aria-labelledby="guiding-principles-heading"
    >
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold tracking-[0.18em] text-primary sm:text-sm">
              WHAT GUIDES US
            </p>

            <h2
              id="guiding-principles-heading"
              className="mx-auto mt-5 max-w-3xl font-heading text-3xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-4xl lg:text-5xl"
            >
              Principles behind how we work.
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
              The values we carry into every relationship, initiative, and
              community we serve.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid items-stretch gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-5">
          {principles.map((principle, index) => (
            <Reveal
              key={principle.title}
              delay={Math.min(index * 0.05, 0.15)}
              className="h-full min-w-0"
            >
              <Card className="h-full border-border bg-background py-0 shadow-none">
                <CardContent className="flex h-full min-h-56 flex-col items-center justify-center p-6 text-center lg:p-7">
                  <h3 className="font-heading text-xl font-semibold leading-[1.2] tracking-tight text-balance sm:text-2xl">
                    {principle.title}
                  </h3>

                  <p className="mt-4 max-w-xs text-sm leading-6 text-pretty text-muted-foreground sm:text-base sm:leading-7">
                    {principle.description}
                  </p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
