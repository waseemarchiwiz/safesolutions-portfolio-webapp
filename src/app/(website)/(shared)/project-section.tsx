"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { FolderKanban, ArrowRight } from "lucide-react";
import { ProjectTypes } from "@/app/(admin)/dashboard/(project-page)/projects/columns";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card } from "@/components/common/card-hover.effect";

interface ProjectsComponentProps {
  background?: string;
  projects: ProjectTypes[];
}

const Projects = ({ background, projects }: ProjectsComponentProps) => {
  return (
    <section className={cn(background, "py-24")}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 flex items-center text-sm text-sky-600">
            <FolderKanban size={15} className="text-sky-600 mr-2" aria-hidden />
            <span className="font-semibold">Projects</span>
          </div>
          <h2 className="text-4xl font-semibold text-slate-900">
            Showcasing Our <span className="text-sky-600">Creative Builds</span>
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Explore a selection of our recent projects — crafted with precision,
            creativity, and a focus on real-world results.
          </p>
        </div>

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {projects?.map((project, i) => {
              const isExternal = project.type === "external";
              const link =
                project.type === "detailed"
                  ? `/project/${project.slug}`
                  : project.link || "#";

              return (
                <motion.div
                  key={project.id || i}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={project.url as string}
                      alt={project.name}
                      width={600}
                      height={400}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-slate-900 group-hover:text-sky-600 transition-colors">
                      {project.name}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 line-clamp-3">
                      {project.description}
                    </p>

                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-xs text-slate-400">
                        {project.lastUpdated
                          ? `Updated ${project.lastUpdated}`
                          : ""}
                      </span>

                      <Link
                        href={link}
                        target={isExternal ? "_blank" : "_self"}
                        rel={isExternal ? "noopener noreferrer" : ""}
                        className="text-sky-600 hover:text-sky-800 text-sm font-medium flex items-center gap-1"
                      >
                        View Details
                        <ArrowRight size={15} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          // No Projects
          <div className="shadow bg-white flex flex-col items-center justify-center py-16 text-center px-6">
            <div className="shadow flex items-center justify-center w-14 h-14 rounded-2xl mb-4">
              <svg
                className="w-10 h-10 text-sky-600"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
            </div>
            <p className="text-md font-medium text-slate-500">
              No Projects Yet
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Check back later for new Projects.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
