import React, { useState } from "react";
import {
  Check,
  Rocket,
  CodeIcon,
  PaletteIcon,
  ShieldCheckIcon,
  DatabaseIcon,
  ChartPieIcon,
  ServerIcon,
  GlobeIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import ScrollToTop from "../../globals/ScrollToTop";
import TabComponent from "@/globals/TabComponents";
import ServicesTab from "./ServicesTab";
import BackofficeServicesTab from "@/components/servicescomponents/BackofficeServicesTab";

const Services = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      title: "Backoffice Support",
      content: <BackofficeServicesTab />,
    },
    {
      title: "Software Development",
      content: <ServicesTab />,
    },
     {
      title: "Archetecture and Design",
      content: <BackofficeServicesTab />,
    },
  ];
  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  return (
    <div>
      <div
        style={{
          backgroundImage:
            "url('https://www.cedar.com/wp-content/uploads/2022/06/About-Us-Images-052022-05.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "60vh",
        }}
      >
        <motion.div
          className="container mx-auto px-6 py-16 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold mb-4 text-indigo-500 mt-40">
            Our <span className="text-white">Services</span>
          </h1>
          <p className="text-white text-lg mt-10">
            Join our team and be part of an inspiring journey. Explore
            opportunities to grow, learn, and make an impact.
          </p>
        </motion.div>
      </div>
      <div className="min-h-screen bg-gray-50 flex flex-col  items-center    dark:bg-[#18181B] py-16 px-4">
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
                  : "bg-gray-200 text-gray-700 hover:bg-blue-200"
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="tab-content bg-gray-100 p-6 rounded-lg shadow">
          {tabs[activeTab].content}
        </div>
        <ScrollToTop />
      </div>
    </div>
  );
};
export default Services;
