import React, { useState } from "react";

import { motion } from "framer-motion";
import ScrollToTop from "../../globals/ScrollToTop";
import {
  ArrowRight,
  CheckCircle2,
  Users,
  Building,
  Gitlab,
} from "lucide-react";

import BackofficeServicesTab from "@/components/servicescomponents/BackofficeServicesTab";
import SoftwareService from "../../components/servicescomponents/SoftwareServices";
import Archetecture from "@/components/servicescomponents/Archetecture";

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
  ];
  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  return (
    <div>
      <div className="relative h-[80vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://www.cedar.com/wp-content/uploads/2022/06/About-Us-Images-052022-05.png')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-blue-900 " />
        </div>

        <div className="relative h-full container mx-auto px-6 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-white text-sm font-medium">
                Digital Journey
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">Empowering Your </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                Digital Journey
              </span>
            </h1>

            <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
              Discover our comprehensive range of services designed to transform
              your business and drive innovation in the digital age.
            </p>

            {/* <button className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg text-white font-medium hover:opacity-90 transition-all">
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button> */}
          </motion.div>
        </div>
      </div>
      <div className="min-h-screen bg-[#F1F5F9] flex flex-col  items-center    dark:bg-[#18181B] py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              Our Services
            </h1>
            <p className="text-xl text-gray-600 dark:text-white max-w-2xl mx-auto">
              We provide cutting-edge digital solutions to help your business
              thrive in the modern world.
            </p>
          </div>
        </div>
        <div className="tabs flex justify-center mb-8">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => handleTabClick(index)}
              className={`px-6 py-2 mx-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                activeTab === index
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-[#F1F5F9] text-gray-700 hover:bg-blue-200"
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
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl"
        >
          {tabs[activeTab].content}
        </motion.div>
        <ScrollToTop />
      </div>
    </div>
  );
};
export default Services;
