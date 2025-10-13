"use client";

import React from "react";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ServicesTypes } from "../../services/(client)";

const SoftwareDetails = ({ serviceData }: { serviceData: ServicesTypes }) => {
  // icon
  // const Icon = iconsMap[serviceData?.icon];
  console.log("sserviceData--", serviceData);

  return (
    <>
      {/* Hero Section (Kept from previous implementation) */}
      <div className="min-h-[85vh] flex items-center py-14 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
        <div className="relative w-full container mx-auto px-4 mt-10 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-white/90">Software Development</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  <span className="text-white">{serviceData?.title} </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500">
                    Services
                  </span>
                </h1>

                <p className="text-xl text-white/80 max-w-xl">
                  {serviceData?.description}
                </p>
              </div>
            </motion.div>

            {/* Optional: Add service icon or illustration */}
            <div className="hidden lg:flex justify-center items-center">
              {/* <Icon
                className="w-64 h-64 text-white/20 opacity-30"
                strokeWidth={1}
              /> */}
            </div>
          </div>
        </div>
      </div>
      {/* Detailed Service Information */}
      <div className=" bg-white dark:bg-black py-16 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl mx-auto">
          {/* Overview Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
              Service Overview
            </h2>
            <div className="bg-[#FFFFFF] dark:bg-black rounded-lg  border-2  hover:shadow-lg hover:shadow-slate-500 transition-shadow duration-300 p-8">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {serviceData?.overview}
              </p>
            </div>
          </section>

          {/* Features Grid */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
              Key Features
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {serviceData?.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#FFFFFF] dark:bg-black rounded-lg  border-2  hover:shadow-lg hover:shadow-slate-500 transition-shadow duration-300 p-6 flex items-center"
                >
                  <Check className="w-6 h-6 text-green-500 mr-4 flex-shrink-0" />
                  <span className="text-gray-800 dark:text-white text-lg">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Technologies Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
              Technologies We Use
            </h2>
            <div className="bg-[#FFFFFF] dark:bg-black rounded-lg  border-2  hover:shadow-lg hover:shadow-slate-500 transition-shadow duration-300 p-8">
              <div className="flex flex-wrap gap-4">
                {serviceData?.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-blue-50 dark:bg-gray-700 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Use Cases or Industries Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
              {serviceData?.useCases ? "Use Cases" : "Industries Served"}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {(serviceData?.useCases || serviceData?.industries)?.map(
                (item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-[#FFFFFF] dark:bg-black rounded-lg p-6 border-2  hover:shadow-lg hover:shadow-slate-500 transition-shadow duration-300 flex items-center"
                  >
                    <ArrowRight className="w-5 h-5 text-blue-500 mr-4 flex-shrink-0" />
                    <span className="text-gray-800 dark:text-white text-lg">
                      {item}
                    </span>
                  </motion.div>
                )
              )}
            </div>
          </section>

          {/* Call to Action */}
          <div className="text-center">
            <Link href="/contact">
              <Button
                variant="outline"
                className="bg-indigo-500 px-20 py-5 text-white hover:bg-indigo-400 hover:text-white"
              >
                Discuss your project
                <ArrowRight className="ml-3 -mr-1 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SoftwareDetails;
