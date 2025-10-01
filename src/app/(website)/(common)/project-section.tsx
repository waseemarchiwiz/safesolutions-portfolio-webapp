"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ProjectTypes } from "@/app/(admin)/dashboard/(project-page)/projects/columns";
import Image from "next/image";

interface ProjectsComponentProps {
  background?: string;
  projects: ProjectTypes[];
}

const Projects = ({ background, projects }: ProjectsComponentProps) => {
  // get project link
  const getProjectLink = (project: (typeof projects)[number]) => {
    if (project.type === "external") {
      return {
        href: project.link,
        target: "_blank",
        rel: "noopener noreferrer",
      };
    }
    if (project.type === "detailed") {
      return {
        href: `/project/${project.slug}`,
      };
    }
    return null;
  };

  console.log("projects----", projects);

  return (
    <section className={cn(background, "p-16 bg-white dark:bg-black")}>
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 dark:bg-purple-500/20 border border-purple-500/20">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-purple-600 dark:text-white text-sm font-medium">
              Our Projects
            </span>
          </div>
          <p className="text-slate-600 dark:text-white text-[20px] md:text-[26px] leading-normal text-center p-7 max-w-5xl">
            At Safe Solution, we pride ourselves on delivering impactful
            solutions tailored to our clients&apos; unique needs. With a focus
            on innovation, precision, and excellence, we have successfully
            completed a diverse range of projects.
          </p>
        </div>

        {/* Carousel */}
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          plugins={[
            AutoScroll({
              speed: 1,
              direction: "backward",
              stopOnFocusIn: true,
              stopOnMouseEnter: true,
              stopOnInteraction: true,
            }),
          ]}
          className="w-full mx-auto mt-10"
        >
          <CarouselContent>
            {projects?.map((project, index) => {
              const linkProps = getProjectLink(project);
              const CardContent = (
                <div className="group relative overflow-hidden rounded-lg shadow-lg h-full transition-transform hover:scale-105">
                  <Image
                    width={200}
                    height={150}
                    src={`${project.img as string}`}
                    alt={project.name}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black/50 transition-opacity group-hover:bg-black/70 flex flex-col items-center justify-center p-4">
                    <h3 className="text-white text-lg font-semibold text-center">
                      {project.name}
                    </h3>
                    <p className="text-white text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity text-center">
                      {project.description}
                    </p>
                  </div>
                </div>
              );

              return (
                <CarouselItem
                  key={index}
                  className="md:basis-1/3 lg:basis-1/4 h-72"
                >
                  {linkProps ? (
                    <Link
                      href={linkProps.href as string}
                      rel={linkProps.rel}
                      target={linkProps.target}
                    >
                      {CardContent}
                    </Link>
                  ) : (
                    CardContent
                  )}
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default Projects;
