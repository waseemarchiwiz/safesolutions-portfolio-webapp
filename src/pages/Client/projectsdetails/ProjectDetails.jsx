import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Package,
  FileText,
  Phone,
  ChevronRight,
  Building2,
} from "lucide-react";
import ScrollToTop from "@/globals/ScrollToTop";

const ProjectDetails = ({ data }) => {
  const [activeTab, setActiveTab] = useState("services");
  const [hoveredCard, setHoveredCard] = useState(null);

  const tabs = [
    { id: "services", icon: Package, label: "Services" },
    { id: "details", icon: FileText, label: "Project Details" },
    { id: "support", icon: Phone, label: "Support" },
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="w-full mx-auto p-4 space-y-6 bg-gray-50 min-h-screen">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-white mt-32 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl">
            <div className="p-6 w-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="text-white">
                  <h1 className="text-2xl">{data.name}</h1>
                  <p className="font-light text-[20px] md:text-[22px] leading-[50px] text-center w-auto">
                    Version {data.version} | Last Updated: {data.lastupdated}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={data.img}
            alt={data.name}
            className="w-full h-[40vh] object-cover"
          />
        </motion.div>

        {/* About Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <h2 className="text-3xl text-center text-gray-800 dark:text-white mt-10 md:text-left">
              About {data.name}
            </h2>
            <p className="font-light text-[20px] md:text-[22px] mt-5 w-auto">
              {data.description}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="p-1 flex justify-center items-center">
          <div className="flex bg-white space-x-2 justify-center items-center mt-5">
            {tabs.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                  activeTab === id
                    ? "bg-indigo-500 text-white shadow-md transform scale-105"
                    : "text-black bg-blue-100"
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    activeTab === id ? "animate-pulse" : ""
                  }`}
                />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="mt-6">
          {/* Services Tab */}
          {activeTab === "services" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
              {data.tabs.services.map((service, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-xl shadow-md p-6 transform transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer
                  ${hoveredCard === index ? "border-l-4 border-blue-500" : ""}`}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      {React.createElement(service.icon, {
                        className: "w-6 h-6 text-blue-600",
                      })}
                    </div>
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-gray-700"
                      >
                        <ChevronRight className="w-4 h-4 text-blue-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Project Details Tab */}
          {activeTab === "details" && (
            <div className="bg-white rounded-xl shadow-md p-8 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {data.tabs.projectDetails.map((detail, index) => (
                  <React.Fragment key={index}>
                    <div className="space-y-6 transform transition-all duration-300 hover:scale-105">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Building2 className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold">
                          Deployment Information
                        </h3>
                      </div>
                      <div className="space-y-3 pl-12">
                        <p className="flex items-center gap-2">
                          <span className="font-semibold">Type:</span>
                          <span className="text-gray-600">
                            {detail.deploymentType}
                          </span>
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="font-semibold">Support Hours:</span>
                          <span className="text-gray-600">
                            {detail.supportHours}
                          </span>
                        </p>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

          {/* Support Tab */}
          {activeTab === "support" && (
            <div className="bg-white rounded-xl shadow-md p-8 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.tabs.support.map((item, index) => (
                  <div
                    key={index}
                    className="space-y-4 transform transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        {React.createElement(item.icon, {
                          className: "w-6 h-6 text-blue-600",
                        })}
                      </div>
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                    </div>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
};

export default ProjectDetails;
