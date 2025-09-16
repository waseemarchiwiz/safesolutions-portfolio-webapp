"use client";

import React from "react";
import { motion } from "framer-motion"; // Animation library for smooth transitions
import { CheckCircle2, Users } from "lucide-react"; // Icon set for adding visual elements
import NumberTicker from "@/components/common/number-ticker";
import { achievements, features } from "../data";
import Image from "next/image";
import Teams from "./teams";
import PartnersSection from "./partners";
import ScrollToTop from "@/components/common/scroll-to-top";
import Projects from "../../(common)/project-section";
import { TeamTypes } from "../page";
import PageHeroSection from "../../(common)/hero-section";

interface AboutProps {
  teams: TeamTypes[];
}

const About = ({ teams }: AboutProps) => {
  return (
    <>
      {/* Hero Section */}
      <PageHeroSection
        mainTitle="Welcome to Safe Solution"
        topTitle="Transforming Ideas"
        bottomTittle="Into Digital Reality"
        description="Learn who we are and why we excel in delivering innovative solutions that drive business growth and digital transformation."
      />
      <div className="bg-[#FFFFFF] dark:bg-black dark:text-white">
        {/* Achievements Section */}
        <div className="bg-[#FFFFFF] dark:bg-black py-16 ">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {achievements.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center p-8 gap-5  bg-[#FFFFFF] dark:bg-black rounded-lg  border-2  hover:shadow-lg hover:shadow-slate-500 transition-shadow duration-300 "
                >
                  {/* Achievement Icon */}
                  <div className="text-purple-500  ">{item.icon}</div>
                  {/* Animated Number Display */}
                  <h3 className="whitespace-pre-wrap text-6xl font-medium tracking-tighter text-black dark:text-white  ">
                    <NumberTicker value={item.number} />
                  </h3>
                  {/* Achievement Label */}
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="container mx-auto px-6 py-24">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Text Content with Animation */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Section Header */}
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-purple-500/10 dark:bg-purple-500/20 border border-purple-500/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                <span className="text-purple-600 dark:text-purple-400 text-sm font-medium">
                  Our Story
                </span>
              </div>

              {/* Title */}
              <h2 className="text-3xl md:text-4xl font-bold mb-6 dark:text-white">
                Leading the Way in Digital Innovation
              </h2>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Safe Solutions Consultants specializes in delivering expert
                back-office solutions tailored to the unique needs of industries
                such as fintech, software development, architecture, and
                healthcare.
              </p>

              {/* Features List with Animation */}
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-5 h-5 text-purple-500" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Image with Floating Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Main Image */}
              <div className="aspect-square rounded-2xl overflow-hidden">
                <Image
                  width={500}
                  height={500}
                  src="/about-main.jpg"
                  alt="About Us"
                  className="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent" />
              </div>

              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute -bottom-6 -left-6 bg-white dark:bg-[#27272A] p-6 rounded-xl shadow-xl"
              >
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-500" />
                  </div>
                  {/* Client Information */}
                  <div>
                    <h4 className="font-bold text-xl mb-1">10+</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Satisfied Clients
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Other Components */}
        <Projects />
        <Teams teams={teams} />
        <PartnersSection />
        <ScrollToTop />
      </div>
    </>
  );
};

export default About;
