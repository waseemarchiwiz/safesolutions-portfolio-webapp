import React from "react";
import { motion } from "framer-motion";
import { ScanText } from "lucide-react";
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
    <div className=" dark:bg-black py-24">
      <div className="max-w-7xl mx-auto px-2">
        <motion.div
          className="px-4 "
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={headerVariants}
        >
          {/* Header Section */}
          <div className="mb-8">
            <div className="mb-3 flex items-center text-sm text-sky-600">
              <ScanText size={15} className="text-sky-600 mr-2" aria-hidden />
              <span className="font-semibold">Leadership</span>
            </div>
            <h2 className="text-4xl font-semibold text-slate-900">
              Meet Our <span className="text-sky-600">Leaders</span>
            </h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              Great teams are built on shared goals and a sense of purpose. When
              everyone is aligned with a clear mission, their combined efforts
              become more impactful.
            </p>
          </div>
        </motion.div>
        {/* Team Grid */}
        <div className="px-4 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {teams.map((team, index) => (
            <div key={index} className="group overflow-hidden">
              <Image
                className="h-96 w-full rounded-md object-cover object-top grayscale transition-all duration-500 hover:grayscale-0 group-hover:h-[22.5rem] group-hover:rounded-xl"
                src={team.image}
                alt="team member"
                width="826"
                height="1239"
              />
              <div className="px-2 pt-2 sm:pb-0 sm:pt-4">
                <div className="flex justify-between">
                  <h3 className="text-base font-medium transition-all duration-500 group-hover:tracking-wider">
                    {team.name}
                  </h3>
                  <span className="text-xs">_0{index + 1}</span>
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-muted-foreground inline-block translate-y-6 text-sm opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    {team.role}
                  </span>
                  <Link
                    href={team.linkedin as string}
                    className="group-hover:text-primary-600 dark:group-hover:text-primary-400 inline-block translate-y-8 text-sm tracking-wide opacity-0 transition-all duration-500 hover:underline group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    {" "}
                    Linktree
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Teams;
