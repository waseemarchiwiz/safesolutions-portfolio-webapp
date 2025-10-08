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
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { FolderKanban } from "lucide-react";

interface ProjectsComponentProps {
  background?: string;
  projects: ProjectTypes[];
}

export function ThreeDCardDemo({
  project,
  linkProps,
}: {
  project: ProjectTypes;
  linkProps?: ReturnType<typeof GetProjectLink>;
}) {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-[20rem] sm:w-[25rem] md:w-[28rem] h-auto rounded-xl p-6 border">
        <CardItem
          translateZ="50"
          className="text-lg font-bold text-neutral-700 dark:text-white"
        >
          {project.name}
        </CardItem>

        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm mt-2 dark:text-neutral-300"
        >
          {project.description}
        </CardItem>

        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            width={300}
            height={200}
            src={`/project-img.png`}
            alt={project.name}
            className="h-48 w-full object-cover rounded-xl group-hover/card:shadow-xl"
          />
        </CardItem>

        <div className="flex justify-between items-center mt-8">
          <CardItem
            translateZ={20}
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-medium"
          >
            <Link
              href={linkProps?.href as string}
              target={linkProps?.target}
              rel={linkProps?.rel}
            >
              View Details →
            </Link>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}

// Helper: get project link
const GetProjectLink = (project: ProjectTypes) => {
  if (project.type === "external") {
    return {
      href: project.link,
      target: "_blank",
      rel: "noopener noreferrer",
    };
  }
  if (project.type === "detailed") {
    return { href: `/project/${project.slug}` };
  }
  return null;
};

const Projects = ({ background, projects }: ProjectsComponentProps) => {
  return (
    <section
      className={cn(background, "py-20 bg-zinc-100 dark:bg-transparent")}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Animated header section */}
        <div className="mb-3 flex items-center text-sm text-sky-600">
          <FolderKanban size={15} className="text-sky-600 mr-2" aria-hidden />
          <span className="font-semibold">Projects</span>
        </div>

        <h2 className="text-4xl font-semibold">
          Showcasing Our{" "}
          <span className="py-3 text-sky-600">Creative Builds</span>
        </h2>

        {/* Carousel */}
        <Carousel
          opts={{
            align: "start", // 👈 This fixes the center alignment
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
          className=" max-w-7xl mx-auto"
        >
          <CarouselContent className="md:ml-18">
            {projects?.map((project, index) => {
              const linkProps = GetProjectLink(project);

              return (
                <CarouselItem
                  key={index}
                  className="pl-4 basis-auto md:basis-1/3 lg:basis-1/4"
                >
                  {linkProps ? (
                    <ThreeDCardDemo project={project} linkProps={linkProps} />
                  ) : (
                    <ThreeDCardDemo project={project} />
                  )}
                </CarouselItem>
              );
            })}
          </CarouselContent>

          {/* Optional Nav buttons */}
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
};

export default Projects;
