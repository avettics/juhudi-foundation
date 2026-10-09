import Image from "next/image";

import { Container } from "@/components/common/container";
import { Reveal } from "@/components/motion/reveal";
import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";
import { TEAM_MEMBERS_QUERY } from "@/sanity/queries/team-members";

export async function OurTeam() {
  const { data: teamMembers } = await sanityFetch({
    query: TEAM_MEMBERS_QUERY,
  });

  const visibleTeamMembers =
    teamMembers?.filter(
      (member) => member.name && member.role && member.photo?.asset,
    ) ?? [];

  if (!visibleTeamMembers.length) {
    return null;
  }

  return (
    <section
      className="bg-background py-16 sm:py-20 lg:py-24 xl:py-28"
      aria-labelledby="our-team-heading"
    >
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold tracking-[0.18em] text-primary sm:text-sm">
              OUR TEAM
            </p>

            <h2
              id="our-team-heading"
              className="mx-auto mt-5 max-w-3xl font-heading text-3xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-4xl lg:text-5xl"
            >
              The people behind Juhudi.
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-pretty text-muted-foreground sm:text-lg sm:leading-8">
              United by a shared commitment to people, opportunity, and
              progress.
            </p>
          </div>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-x-5 gap-y-10 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-12">
          {visibleTeamMembers.map((member, index) => (
            <Reveal
              key={member._id}
              delay={Math.min(index * 0.04, 0.16)}
              className="min-w-0"
            >
              <article className="group mx-auto w-full max-w-sm text-center sm:max-w-none">
                <div className="relative aspect-4/5 overflow-hidden rounded-xl border border-border bg-muted">
                  <Image
                    src={urlFor(member.photo)
                      .width(800)
                      .height(1000)
                      .fit("crop")
                      .url()}
                    alt={member.photo.alt || member.name}
                    fill
                    sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  />
                </div>

                <div className="mt-6 text-center">
                  <h3 className="font-heading text-lg font-semibold leading-snug tracking-tight text-balance text-foreground sm:text-xl">
                    {member.name}
                  </h3>

                  <p className="mt-2 text-sm font-medium leading-6 text-primary">
                    {member.role}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
