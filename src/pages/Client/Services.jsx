import React, { useState } from "react";

import { motion } from "framer-motion";
import ScrollToTop from "../../globals/ScrollToTop";
import { ChevronRight, Code2, Cpu, Globe2 } from "lucide-react";

import BackofficeServicesTab from "@/components/servicescomponents/BackofficeServicesTab";
import SoftwareService from "../../components/servicescomponents/SoftwareServices";
import Archetecture from "@/components/servicescomponents/Archetecture";
import ArchiwizConstruction from "@/components/servicescomponents/ArchiwizConstruction";
import ArchiwizBuild from "@/components/servicescomponents/ArchiwizBuild";
import ServicesHero from "@/components/servicescomponents/ServicesHero";
import SEOComponent from "@/components/SEOComponent";

const Services = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      title: "Backoffice Support",
      content: <BackofficeServicesTab />,
    },
    {
      title: "Software Development",
      content: <SoftwareService />,
    },
    {
      title: "Archetecture and Design",
      content: <Archetecture />,
    },
    {
      title: "Archiwiz Construction",
      content: <ArchiwizConstruction />,
    },
    {
      title: "Alpha build",
      content: <ArchiwizBuild />,
    },
  ];
  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  return (
    <div className="bg-[#FFFFFF] dark:bg-black">
      <SEOComponent
        title="Turning Concepts Into Creations | services"
        description=" Process Optimization Streamline your backoffice workflows for maximum productivity and minimal errors.Workflow Analysis,Automation Solutions,Resource Planning"
        keywords="Services We Provide,BIM Services,Storing Inventory"
      />
      <ServicesHero />
      <div className="min-h-screen bg-[#FFFFFF] dark:bg-black flex flex-col  items-center       py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
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
          </div>
        </div>
        <div className="tabs flex flex-wrap justify-center gap-4 mb-8 p-4">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => handleTabClick(index)}
              className={`w-full sm:w-auto px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                activeTab === index
                  ? "bg-blue-600 text-white text-[20px] shadow-lg"
                  : "bg-white text-gray-700  hover:bg-blue-200"
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-[#FFFFFF] dark:bg-black p-8 rounded-2xl  "
        >
          {tabs[activeTab].content}
        </motion.div>
        <ScrollToTop />
      </div>
    </div>
  );
};
export default Services;
