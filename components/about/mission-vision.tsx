import { defaultTagline } from "@/sanity/content/defaults";
import { getAboutContent, getSiteSettings } from "@/sanity/lib/page-content";
import { Container } from "@/components/common/container";
import { Reveal } from "@/components/motion/reveal";

export async function MissionVision() {
  const [{ purpose: copy }, settings] = await Promise.all([
    getAboutContent(),
    getSiteSettings(),
  ]);
  return (
    <section
      className="bg-muted/40 py-16 sm:py-20 lg:py-24"
      aria-labelledby="mission-vision-heading"
    >
      <Container>
        <Reveal>
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold tracking-[0.18em] text-primary sm:text-sm">
              OUR PURPOSE
            </p>

            <h2
              id="mission-vision-heading"
              className="mx-auto mt-5 max-w-3xl font-heading text-3xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-4xl lg:text-5xl"
            >
              {copy.title}
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
              {copy.description}
            </p>
          </div>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-5xl border-y border-border md:grid-cols-2 lg:mt-14">
          <Reveal className="min-w-0">
            <div className="flex h-full flex-col items-center py-10 text-center md:px-10 lg:px-14 lg:py-12">
              <p className="text-xs font-semibold tracking-[0.16em] text-primary">
                OUR MISSION
              </p>

              <h3 className="mt-5 max-w-lg font-heading text-2xl font-semibold leading-[1.2] tracking-tight text-balance sm:text-3xl">
                {copy.missionTitle}
              </h3>

              <p className="mt-4 max-w-md text-base leading-7 text-pretty text-muted-foreground">
                {copy.missionDescription}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="min-w-0">
            <div className="flex h-full flex-col items-center border-t border-border py-10 text-center md:border-l md:border-t-0 md:px-10 lg:px-14 lg:py-12">
              <p className="text-xs font-semibold tracking-[0.16em] text-primary">
                OUR VISION
              </p>

              <h3 className="mt-5 max-w-lg font-heading text-2xl font-semibold leading-[1.2] tracking-tight text-balance sm:text-3xl">
                {copy.visionTitle}
              </h3>

              <p className="mt-4 max-w-md text-base leading-7 text-pretty text-muted-foreground">
                {copy.visionDescription}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.14}>
          <div className="mx-auto mt-10 text-center">
            <p className="text-xs font-semibold tracking-[0.2em] text-primary sm:text-sm uppercase">
              {settings?.tagline ?? defaultTagline}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
