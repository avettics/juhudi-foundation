import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, MapPinIcon } from "lucide-react";

import { Container } from "@/components/common/container";
import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";
import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";
import { FEATURED_PROJECTS_QUERY } from "@/sanity/queries/projects";

export async function FeaturedProjects() {
  const { data: featuredProjects } = await sanityFetch({
    query: FEATURED_PROJECTS_QUERY,
  });

  if (!featuredProjects.length) {
    return null;
  }

  return (
    <section
      className="bg-muted/40 py-16 sm:py-20 lg:py-24 xl:py-28"
      aria-labelledby="featured-projects-heading"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16 xl:gap-24">
          <Reveal>
            <div className="max-w-xl">
              <p className="text-xs font-semibold tracking-[0.18em] text-primary sm:text-sm">
                FEATURED PROJECTS
              </p>

              <h2
                id="featured-projects-heading"
                className="mt-5 font-heading text-3xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-4xl lg:text-5xl xl:text-[3.5rem]"
              >
                Turning ideas into action.
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="max-w-2xl lg:pt-1">
              <p className="text-lg leading-8 text-foreground sm:text-xl sm:leading-9">
                Explore initiatives that turn our areas of work into practical
                action alongside people and communities.
              </p>

              <Link
                href="/projects"
                className="group mt-7 inline-flex min-h-11 items-center gap-2 rounded-sm font-semibold text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                View all projects
                <ArrowRightIcon
                  aria-hidden="true"
                  className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid items-stretch gap-5 sm:mt-14 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {featuredProjects.map((project, index) => {
            const imageUrl = urlFor(project.featuredImage)
              .width(1200)
              .height(800)
              .fit("crop")
              .url();

            return (
              <Reveal
                key={project._id}
                delay={Math.min(index * 0.06, 0.12)}
                className="h-full min-w-0 wrap-anywhere"
              >
                <Card className="group h-full overflow-hidden border-border bg-background py-0 transition-[border-color,box-shadow] duration-200 hover:border-primary/30 hover:shadow-md">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="flex h-full flex-col rounded-xl focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-ring/50"
                  >
                    <div className="relative aspect-3/2 overflow-hidden bg-muted">
                      <Image
                        src={imageUrl}
                        alt={
                          project.featuredImage.alt ||
                          `${project.title} project`
                        }
                        fill
                        sizes="(min-width: 1280px) 400px, (min-width: 1024px) 31vw, (min-width: 768px) 47vw, 100vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      />
                    </div>

                    <CardContent className="flex flex-1 flex-col p-5 sm:p-6">
                      {project.programme?.title ? (
                        <p className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">
                          {project.programme.title}
                        </p>
                      ) : null}

                      <h3 className="mt-3 font-heading text-xl font-semibold leading-[1.15] tracking-tight text-balance text-foreground transition-colors duration-200 group-hover:text-primary sm:text-2xl">
                        {project.title}
                      </h3>

                      {project.shortDescription ? (
                        <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                          {project.shortDescription}
                        </p>
                      ) : null}

                      <div className="mt-auto pt-6">
                        {project.location ? (
                          <div className="flex items-start gap-2 text-sm leading-5 text-muted-foreground">
                            <MapPinIcon
                              aria-hidden="true"
                              className="mt-0.5 size-4 shrink-0"
                            />
                            <span>{project.location}</span>
                          </div>
                        ) : null}

                        <div className="mt-5 border-t border-border/80 pt-4">
                          <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                            View project
                            <ArrowRightIcon
                              aria-hidden="true"
                              className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                            />
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
