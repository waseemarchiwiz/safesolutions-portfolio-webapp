import React from "react";
import { motion } from "framer-motion";
// Import LinkedinIcon
import { ScanText, LinkedinIcon } from "lucide-react";
import { TeamTypes } from "../page";
import Link from "next/link";
import Image from "next/image";

const Teams = ({ teams }: { teams: TeamTypes[] }) => {
  const headerVariants = {
    hidden: {
      opacity: 0,
      y: -50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <div className=" py-24">
      <div className="max-w-7xl mx-auto px-2">
        <motion.div
          className="px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={headerVariants}
        >
          {/* Header Section */}
          <div className="mb-12">
            {" "}
            {/* Increased margin-bottom for better spacing */}
            <div className="mb-3 flex items-center text-sm text-sky-600">
              <ScanText size={15} className="text-sky-600 mr-2" aria-hidden />
              <span className="font-semibold">Leadership</span>
            </div>
            <h2 className="text-4xl font-semibold text-slate-900 ">
              Meet Our <span className="text-sky-600">Leaders</span>
            </h2>
            <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
              Great teams are built on shared goals and a sense of purpose. When
              everyone is aligned with a clear mission, their combined efforts
              become more impactful.
            </p>
          </div>
        </motion.div>

        {teams.length > 0 ? (
          <div className="px-4 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {teams.map((team) => (
              <div
                key={team.name} // Use a unique key like name or ID
                className="group overflow-hidden rounded-lg border shadow-sm transition-shadow duration-300 hover:shadow-lg"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <Image
                    width={400} // Using a more standard 1:1 aspect ratio
                    height={400}
                    src={team.url}
                    alt={team.name} // Use the team member's name for alt text
                    className="aspect-square w-full object-cover object-top grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  {/* LinkedIn Icon Overlay */}
                  <Link
                    href={team.linkedin as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${team.name}'s LinkedIn`}
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/20 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 group-hover:bg-black/40"
                  >
                    <LinkedinIcon className="h-5 w-5" />
                  </Link>
                </div>

                {/* Text Content */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {team.name}
                  </h3>
                  <p className="text-sm text-sky-600">{team.role}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full shadow bg-white flex flex-col items-center justify-center py-16 text-center px-6">
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
            <p className="text-md font-medium text-slate-500">No Teams Yet</p>
            <p className="text-xs text-slate-400 mt-1">
              Check back later for new teams.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Teams;
