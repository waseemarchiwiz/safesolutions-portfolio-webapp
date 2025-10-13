"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { FolderKanban, ArrowRight } from "lucide-react";
import { ProjectTypes } from "@/app/(admin)/dashboard/(project-page)/projects/columns";
import { motion } from "framer-motion";

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
                  <img
                    src={"/project-img.png"}
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
      </div>
    </section>
  );
};

export default Projects;
