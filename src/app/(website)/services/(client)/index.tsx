"use client";

import React from "react";
import { motion } from "framer-motion";
import PageHeroSection from "../../(common)/hero-section";
import BackofficeServicesTab from "./backoffice-services";
import SoftwareService from "./software-services";
import ArchiwizConstruction from "./archiwiz-construction";
import ArchiwizBuild from "./archiwiz-build";
import Architecture from "./architecture";
import Agriculture from "./agriculture";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { iconsMap } from "../data";

export type ServicesTypes = {
  id: number;
  tab: string;
  title: string;
  slug: string;
  icon: keyof typeof iconsMap;
  description: string;
  features: string[];
  link: string | null;
  overview: string | null;
  technologies: string[];
  industries: string[];
  useCases: string[];
  createdAt: string;
  updatedAt: string;
};

const fadeSlide = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.4 },
};

const Services = ({ services }: { services: ServicesTypes[] }) => {
  console.log("servics---", services);

  // software
  const softwares = services.filter((i) => i.tab === "Software Development");
  const backtelemed = services.filter((i) => i.tab === "Backtelemed");
  const architectures = services.filter(
    (i) => i.tab === "Architecture And Design"
  );
  const archiwzConstructions = services.filter(
    (i) => i.tab === "Archiwiz Construction"
  );
  const alphabuild = services.filter((i) => i.tab === "Alpha Build");
  const agriculture = services.filter((i) => i.tab === "Agriculture");

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
                  <BackofficeServicesTab data={backtelemed} />
                </motion.div>
              </TabsContent>

              <TabsContent value="software">
                <motion.div {...fadeSlide}>
                  <SoftwareService data={softwares} />
                </motion.div>
              </TabsContent>

              <TabsContent value="architecture">
                <motion.div {...fadeSlide}>
                  <Architecture data={architectures} />
                </motion.div>
              </TabsContent>

              <TabsContent value="construction">
                <motion.div {...fadeSlide}>
                  <ArchiwizConstruction data={archiwzConstructions} />
                </motion.div>
              </TabsContent>

              <TabsContent value="alphabuild">
                <motion.div {...fadeSlide}>
                  <ArchiwizBuild data={alphabuild} />
                </motion.div>
              </TabsContent>

              <TabsContent value="agriculture">
                <motion.div {...fadeSlide}>
                  <Agriculture data={agriculture} />
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
