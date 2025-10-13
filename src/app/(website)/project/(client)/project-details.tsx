"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Package,
  FileText,
  Phone,
  ChevronRight,
  Building2,
} from "lucide-react";
import { iconsMap, ProjectTypes } from "../data";
import Image from "next/image";

const ProjectDetails = ({ data }: { data: ProjectTypes }) => {
  const [activeTab, setActiveTab] = useState("services");
  const [hoveredCard, setHoveredCard] = useState<number>(-1);

  const tabs = [
    { id: "services", icon: Package, label: "Services" },
    { id: "details", icon: FileText, label: "Project Details" },
    { id: "support", icon: Phone, label: "Support" },
  ];

  console.log("data0-----", data);
  return (
    <div className="dark:bg-[#18181b]">
      <div className="container mx-auto px-4  ">
        <div className="w-full mx-auto p-4 space-y-6 bg-gray-50 dark:bg-[#18181b] min-h-screen">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white mt-32 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl">
              <div className="p-6 w-full bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900  rounded-t-xl">
                <div className="flex items-center justify-between">
                  <div className="text-white">
                    <h1 className="text-2xl">{data.name}</h1>
                    <p className="font-light text-[20px] md:text-[22px] leading-[50px] text-center w-auto">
                      {/* Version {data.version} |  */}
                      Last Updated: {data.lastupdated}
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
            <Image
              width={100}
              height={100}
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
          <div className="p-1 flex justify-center items-center bg-white dark:bg-[#18181b]">
            <div className="flex bg-white dark:bg-[#18181b] space-x-2 justify-center items-center mt-5">
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
                {data?.services?.map((service, index) => {
                  const Icon = iconsMap[service.icon];
                  return (
                    <div
                      key={index}
                      className={`bg-white dark:bg-[#18181b] rounded-xl shadow-md p-6 transform transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer
                  ${hoveredCard === index ? "border-l-4 border-blue-500" : ""}`}
                      onMouseEnter={() => setHoveredCard(index)}
                      onMouseLeave={() => setHoveredCard(0)}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold dark:text-white">
                          {service.title}
                        </h3>
                      </div>
                      <p className="text-gray-600  dark:text-white mb-4">
                        {service.description}
                      </p>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-gray-700 dark:text-white"
                          >
                            <ChevronRight className="w-4 h-4 text-blue-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Project Details Tab */}
            {activeTab === "details" && (
              <div className="bg-white dark:bg-[#18181b]  rounded-xl shadow-md p-8 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {data?.projectDetails?.map((detail, index) => (
                    <React.Fragment key={index}>
                      <div className="space-y-6 transform transition-all duration-300 hover:scale-105">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Building2 className="w-6 h-6 text-blue-600" />
                          </div>
                          <h3 className="text-xl font-semibold ">
                            Deployment Information
                          </h3>
                        </div>
                        <div className="space-y-3 pl-12">
                          <p className="flex items-center gap-2">
                            <span className="font-semibold ">Type:</span>
                            <span className="text-gray-600 dark:text-white">
                              {detail.deploymentType}
                            </span>
                          </p>
                          <p className="flex items-center gap-2">
                            <span className="font-semibold ">
                              Support Hours:
                            </span>
                            <span className="text-gray-600 dark:text-white">
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
              <div className="bg-white dark:bg-[#18181b] rounded-xl shadow-md p-8 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data?.supports?.map((item, index) => {
                    const Icon = iconsMap[item.icon];
                    return (
                      <div
                        key={index}
                        className="space-y-4 transform transition-all duration-300 hover:scale-105"
                      >
                        <div className="flex items-center gap-3 ">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Icon className="w-6 h-6 text-blue-600" />
                          </div>
                          <h3 className="text-xl font-semibold">
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-gray-600 dark:text-white">
                          {item.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
