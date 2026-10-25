import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, MapPinIcon } from "lucide-react";

import { Container } from "@/components/common/container";
import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { PROJECTS_QUERY } from "@/sanity/queries/projects";

function getProjectStatusLabel(status: string | null | undefined) {
  switch (status) {
    case "ongoing":
      return "Ongoing";
    case "completed":
      return "Completed";
    case "planned":
      return "Planned";
    default:
      return null;
  }
}

export async function ProjectsListing() {
  const { data: projects } = await sanityFetch({
    query: PROJECTS_QUERY,
  });

  if (!projects.length) {
    return null;
  }

  return (
    <section
      className="bg-background py-14 sm:py-16 lg:py-20 xl:py-24"
      aria-labelledby="projects-listing-heading"
    >
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold tracking-[0.18em] text-primary sm:text-sm">
              OUR PROJECTS
            </p>

            <h2
              id="projects-listing-heading"
              className="mt-5 text-balance font-heading text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl"
            >
              Work taking shape.
            </h2>
          </div>
        </Reveal>

        <div className="mt-10 grid items-stretch gap-5 sm:mt-12 md:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-6">
          {projects.map((project, index) => {
            const imageUrl = project.featuredImage?.asset
              ? urlFor(project.featuredImage)
                  .width(1200)
                  .height(800)
                  .fit("crop")
                  .url()
              : null;

            const statusLabel = getProjectStatusLabel(project.status);

            return (
              <Reveal
                key={project._id}
                delay={Math.min(index * 0.04, 0.16)}
                className="h-full min-w-0"
              >
                <Card className="group h-full overflow-hidden border-border bg-background py-0 transition-[border-color,box-shadow] duration-200 hover:border-primary/30 hover:shadow-sm">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="flex h-full min-w-0 flex-col rounded-xl focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-ring/50"
                  >
                    {imageUrl ? (
                      <div className="relative aspect-3/2 overflow-hidden bg-muted">
                        <Image
                          src={imageUrl}
                          alt={
                            project.featuredImage?.alt ||
                            `${project.title} project`
                          }
                          fill
                          sizes="(min-width: 1280px) 400px, (min-width: 1024px) 31vw, (min-width: 768px) 47vw, 100vw"
                          className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
                        />

                        {statusLabel ? (
                          <span className="absolute left-4 top-4 rounded-full bg-background/95 px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm backdrop-blur-sm">
                            {statusLabel}
                          </span>
                        ) : null}
                      </div>
                    ) : null}

                    <CardContent className="flex min-w-0 flex-1 flex-col p-5 sm:p-6 lg:p-7">
                      {project.programme?.title ? (
                        <p className="wrap-break-word text-xs font-semibold tracking-[0.14em] text-primary uppercase">
                          {project.programme.title}
                        </p>
                      ) : null}

                      <h3 className="mt-3 wrap-break-word text-balance font-heading text-xl font-semibold leading-[1.15] tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary sm:text-2xl">
                        {project.title}
                      </h3>

                      {project.shortDescription ? (
                        <p className="mt-4 wrap-break-word text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                          {project.shortDescription}
                        </p>
                      ) : null}

                      <div className="mt-auto pt-7">
                        {project.location ? (
                          <div className="flex min-w-0 items-start gap-2 text-sm leading-5 text-muted-foreground">
                            <MapPinIcon
                              aria-hidden="true"
                              className="mt-0.5 size-4 shrink-0"
                            />

                            <span className="min-w-0 wrap-break-word">
                              {project.location}
                            </span>
                          </div>
                        ) : null}

                        <div className="mt-5 border-t border-border/80 pt-4">
                          <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                            View project
                            <ArrowRightIcon
                              aria-hidden="true"
                              className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
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
