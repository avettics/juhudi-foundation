import { Container } from "@/components/common/container";
import { Reveal } from "@/components/motion/reveal";

export function OurStory() {
  return (
    <section
      className="bg-background py-16 sm:py-20 lg:py-24"
      aria-labelledby="our-story-heading"
    >
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16 xl:gap-24">
          <Reveal>
            <div className="max-w-lg">
              <p className="text-xs font-semibold tracking-[0.18em] text-primary sm:text-sm">
                OUR STORY
              </p>

              <h2
                id="our-story-heading"
                className="mt-5 font-heading text-3xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-4xl lg:text-5xl"
              >
                It began with a belief in people.
              </h2>

              <p className="mt-6 max-w-md text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                A foundation built around opportunity, potential, and the
                possibility of lasting progress.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="max-w-2xl">
              <p className="font-heading text-2xl font-medium leading-tight tracking-[-0.01em] text-balance text-foreground sm:text-3xl">
                Potential exists everywhere. Opportunity does not.
              </p>

              <div className="mt-7 space-y-5 text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                <p>
                  In 2026, Juhudi Foundation was established in Tanzania with a
                  simple conviction: people should have the opportunity to
                  develop their potential, strengthen their abilities, and shape
                  better futures for themselves and their communities.
                </p>

                <p>
                  From that belief, Juhudi began bringing together learning,
                  skills, mentorship, leadership, well-being, innovation, and
                  community action — creating pathways for people to grow in
                  confidence, become more self-reliant, and take an active role
                  in their future.
                </p>

                <p>
                  Today, we are building on that purpose by creating
                  opportunities that empower people and strengthen communities,
                  one initiative and one partnership at a time.
                </p>
              </div>

              <div className="mt-8 border-l-2 border-primary pl-5 sm:mt-10">
                <p className="font-heading text-xl font-semibold leading-8 tracking-tight text-balance text-foreground sm:text-2xl">
                  Our story is only beginning.
                </p>

                <p className="mt-2 text-sm font-medium tracking-[0.08em] text-primary sm:text-base">
                  UPLIFT • EMPOWER • INSPIRE
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
