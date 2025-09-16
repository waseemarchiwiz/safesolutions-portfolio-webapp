"use client";

import React from "react";
import { motion } from "framer-motion";
import PageHeroSection from "../../(common)/hero-section";
import ScrollToTop from "@/components/common/scroll-to-top";
import BackofficeServicesTab from "./backoffice-services";
import SoftwareService from "./software-services";
import ArchiwizConstruction from "./archiwiz-construction";
import ArchiwizBuild from "./archiwiz-build";
import Architecture from "./architecture";
import Agriculture from "./agriculture";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const fadeSlide = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.4 },
};

const Services = () => {
  return (
    <>
      {/* Animate Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <PageHeroSection
          mainTitle="Digital Journey"
          topTitle="Turning Concepts"
          bottomTittle="Into Creations"
          description="Through comprehensive solutions, Safe Solution empowers you to overcome the complexities of health tech with ease"
        />
      </motion.div>

      <div className="min-h-screen bg-[#FFFFFF] dark:bg-black flex flex-col items-center py-16 px-4">
        <div className="bg-white dark:bg-black w-full">
          <div className="min-h-screen flex flex-col items-center py-16 px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="container mx-auto text-center mb-12"
            >
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 dark:bg-purple-500/20 border border-purple-500/20">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                <span className="text-purple-600 dark:text-purple-400 text-sm font-medium">
                  Services We Provide
                </span>
              </div>
              <p className="text-xl text-gray-600 dark:text-white max-w-2xl mx-auto mt-5">
                We provide cutting-edge digital solutions to help your business
                thrive in the modern world.
              </p>
            </motion.div>

            <Tabs defaultValue="backtelemed" className="w-full">
              <TabsList className="flex flex-wrap justify-center mx-auto gap-4">
                <TabsTrigger value="backtelemed">Backtelemed</TabsTrigger>
                <TabsTrigger value="software">Software Development</TabsTrigger>
                <TabsTrigger value="architecture">
                  Architecture and Design
                </TabsTrigger>
                <TabsTrigger value="construction">
                  Archiwiz Construction
                </TabsTrigger>
                <TabsTrigger value="alphabuild">Alpha Build</TabsTrigger>
                <TabsTrigger value="agriculture">Agriculture</TabsTrigger>
              </TabsList>

              <TabsContent value="backtelemed">
                <motion.div {...fadeSlide}>
                  <BackofficeServicesTab />
                </motion.div>
              </TabsContent>

              <TabsContent value="software">
                <motion.div {...fadeSlide}>
                  <SoftwareService />
                </motion.div>
              </TabsContent>

              <TabsContent value="architecture">
                <motion.div {...fadeSlide}>
                  <Architecture />
                </motion.div>
              </TabsContent>

              <TabsContent value="construction">
                <motion.div {...fadeSlide}>
                  <ArchiwizConstruction />
                </motion.div>
              </TabsContent>

              <TabsContent value="alphabuild">
                <motion.div {...fadeSlide}>
                  <ArchiwizBuild />
                </motion.div>
              </TabsContent>

              <TabsContent value="agriculture">
                <motion.div {...fadeSlide}>
                  <Agriculture />
                </motion.div>
              </TabsContent>
            </Tabs>

            <ScrollToTop />
          </div>
        </div>
        <ScrollToTop />
      </div>
    </>
  );
};

export default Services;
