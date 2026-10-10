import { defaultTagline } from "@/sanity/content/defaults";
import { getAboutContent, getSiteSettings } from "@/sanity/lib/page-content";
import { Container } from "@/components/common/container";
import { Reveal } from "@/components/motion/reveal";

export async function OurStory() {
  const [{ story: copy }, settings] = await Promise.all([
    getAboutContent(),
    getSiteSettings(),
  ]);
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
                {copy.title}
              </h2>

              <p className="mt-6 max-w-md text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                {copy.description}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="max-w-2xl">
              <p className="font-heading text-2xl font-medium leading-tight tracking-[-0.01em] text-balance text-foreground sm:text-3xl">
                {copy.introduction}
              </p>

              <div className="mt-7 space-y-5 text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
                <p>{copy.paragraph1}</p>

                <p>{copy.paragraph2}</p>

                <p>{copy.paragraph3}</p>
              </div>

              <div className="mt-8 border-l-2 border-primary pl-5 sm:mt-10">
                <p className="font-heading text-xl font-semibold leading-8 tracking-tight text-balance text-foreground sm:text-2xl">
                  {copy.closing}
                </p>

                <p className="mt-2 text-sm font-medium tracking-[0.08em] text-primary sm:text-base uppercase">
                  {settings?.tagline ?? defaultTagline}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
