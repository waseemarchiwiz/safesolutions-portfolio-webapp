import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, TwitchIcon } from "lucide-react";
import { TeamTypes } from "../page";
import { baseURL } from "@/lib/api.config";
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

  // const [isMounted, setIsMounted] = useState(false);

  // useEffect(() => {
  //   setIsMounted(true);
  // }, []);

  return (
    <div className="min-h-[95vh]  bg-white dark:bg-black py-24">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="container mx-auto px-4 "
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={headerVariants}
        >
          {/* Header Section */}

          <div className="max-w-6xl mx-auto text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-black shadow-md mb-6">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-semibold">
                Meet Our Team
              </span>
            </div>

            {/* <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            The Minds Behind Our Vision
          </h2> */}

            <p className="text-lg text-slate-600 dark:text-white  text-[20px] md:text-[26px] leading-normal text-center    ">
              Great teams are built on shared goals and a sense of purpose. When
              everyone is aligned with a clear mission, their combined efforts
              become more impactful.
            </p>
          </div>
        </motion.div>
        {/* Team Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 px-4">
          {teams.map((member, index) => (
            <div key={index} className="group relative">
              <div
                className="relative bg-white dark:bg-black rounded-2xl p-8 transition-all duration-300 
                             hover:-translate-y-2 overflow-hidden
                              border-2  hover:shadow-lg hover:shadow-slate-500  
                            "
              >
                {/* Decorative Background Elements */}
                <div
                  className="absolute top-0 left-0 w-full h-40 bg-gradient-to-r from-purple-100 to-blue-100 
                              dark:from-purple-900/30 dark:to-blue-900/30 opacity-50"
                ></div>

                {/* Profile Section */}
                <div className="relative">
                  <div className="w-48 h-48 mx-auto mb-8">
                    <div className="w-full h-full rounded-full p-1 bg-gradient-to-r from-purple-500 to-blue-500">
                      <div className="w-full h-full rounded-full p-2 bg-white dark:bg-gray-800">
                        <Image
                          width={500}
                          height={500}
                          src={
                            `${baseURL}/${member.image}` ||
                            ("/600x400.png" as string)
                          }
                          alt={member.name}
                          className="w-full h-full  object-cover rounded-full"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                      {member.name}
                    </h3>
                    <p
                      className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r 
                                from-purple-500 to-blue-500 text-white mb-6"
                    >
                      {member.role}
                    </p>

                    {/* Social Links */}
                    <div className="flex justify-center items-center gap-4 mt-6">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-icon-link"
                        >
                          <div
                            className="w-12 h-12 flex items-center justify-center rounded-full 
                                      bg-blue-50 dark:bg-blue-900/30 group-hover:bg-blue-100 
                                      dark:group-hover:bg-blue-900/50 transition-colors"
                          >
                            <Linkedin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                          </div>
                        </a>
                      )}
                      {member.github && (
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-icon-link"
                        >
                          <div
                            className="w-12 h-12 flex items-center justify-center rounded-full 
                                      bg-gray-50 dark:bg-gray-700 group-hover:bg-gray-100 
                                      dark:group-hover:bg-gray-600 transition-colors"
                          >
                            <Github className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                          </div>
                        </a>
                      )}
                      {member.twitter && (
                        <a
                          href={member.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-icon-link"
                        >
                          <div
                            className="w-12 h-12 flex items-center justify-center rounded-full 
                                      bg-blue-50 dark:bg-blue-900/30 group-hover:bg-blue-100 
                                      dark:group-hover:bg-blue-900/50 transition-colors"
                          >
                            <TwitchIcon className="w-6 h-6 text-blue-400" />
                          </div>
                        </a>
                      )}
                    </div>
                  </div>
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
