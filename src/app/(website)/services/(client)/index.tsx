"use client";

import React from "react";
import { motion } from "framer-motion";
// Assuming PageHeroSection is correctly defined and styled externally
import PageHeroSection from "../../(common)/hero-section";
import BackofficeServicesTab from "./backoffice-services";
import SoftwareService from "./software-services";
import ArchiwizConstruction from "./archiwiz-construction";
import ArchiwizBuild from "./archiwiz-build";
import Architecture from "./architecture";
import Agriculture from "./agriculture";
// Use the correct Shadcn UI imports
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { iconsMap } from "../data";
import { ScanText } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Type definition remains unchanged
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

// Simplified motion variant for content transitions
const fadeSlide = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

const Services = ({ services }: { services: ServicesTypes[] }) => {
  // Data filtering logic remains unchanged
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
      <PageHeroSection
        tag="Services"
        title="Our services"
        description="We offer best IT services from beginner to advance level"
      />
      {/* Services Section Wrapper: Padding controlled here. */}
      <section className="bg-white dark:bg-black py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            {...fadeSlide} // Reusing the fadeSlide transition for the header
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12 text-center"
          >
            {/* Header */}
            <div className="mb-3 flex justify-center items-center text-sm text-sky-600">
              <ScanText size={15} className="text-sky-600 mr-2" aria-hidden />
              <span className="font-semibold">Services</span>
            </div>
            <h2 className="text-4xl font-semibold text-slate-900">
              What we offer at{" "}
              <span className="text-sky-600">Safe Solutions</span>
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-center text-slate-600">
              We help businesses bring ideas to life with end-to-end software
              development. From planning to deployment and beyond.
            </p>
          </motion.div>

          {/* Tabs Component */}
          <Tabs defaultValue="backtelemed">
            <TabsList className="mx-auto h-auto gap-2 bg-muted/50">
              <TabsTrigger value="backtelemed" className="px-4 py-2">
                Backtelemed
              </TabsTrigger>
              <TabsTrigger value="software" className="px-4 py-2">
                Software Development
              </TabsTrigger>
              <TabsTrigger value="architecture" className="px-4 py-2">
                Architecture and Design
              </TabsTrigger>
              <TabsTrigger value="construction" className="px-4 py-2">
                Archiwiz Construction
              </TabsTrigger>
              <TabsTrigger value="alphabuild" className="px-4 py-2">
                Alpha Build
              </TabsTrigger>
              <TabsTrigger value="agriculture" className="px-4 py-2">
                Agriculture
              </TabsTrigger>
            </TabsList>

            {/* Tabs Content - Ensure no vertical padding/margins are added by default */}
            <TabsContent value="backtelemed" className="">
              <motion.div {...fadeSlide}>
                <BackofficeServicesTab data={backtelemed} />
              </motion.div>
            </TabsContent>

            <TabsContent value="software" className="">
              <motion.div {...fadeSlide}>
                <SoftwareService data={softwares} />
              </motion.div>
            </TabsContent>

            <TabsContent value="architecture" className="">
              <motion.div {...fadeSlide}>
                <Architecture data={architectures} />
              </motion.div>
            </TabsContent>

            <TabsContent value="construction" className="">
              <motion.div {...fadeSlide}>
                <ArchiwizConstruction data={archiwzConstructions} />
              </motion.div>
            </TabsContent>

            <TabsContent value="alphabuild" className="">
              <motion.div {...fadeSlide}>
                <ArchiwizBuild data={alphabuild} />
              </motion.div>
            </TabsContent>

            <TabsContent value="agriculture" className="">
              <motion.div {...fadeSlide}>
                <Agriculture data={agriculture} />
              </motion.div>
            </TabsContent>
          </Tabs>

          <div className="text-center mt-12">
            <Link href={"/contact"}>
              <Button
                variant="outline"
                size="lg"
                className="cursor-pointer bg-sky-600 hover:bg-sky-700 text-white hover:text-white"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
