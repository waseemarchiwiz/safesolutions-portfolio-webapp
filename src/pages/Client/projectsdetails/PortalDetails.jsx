import React, { useState } from "react";
import {
  Building2,
  Users,
  FileText,
  Phone,
  ChevronRight,
  Files,
  Database,
  LayoutDashboard,
  Calculator,
} from "lucide-react";
import { motion } from "framer-motion";
import archiwiz from "../../../assets/portal.png";

const PortalDetails = () => {
  const [activeTab, setActiveTab] = useState("services");
  const [hoveredCard, setHoveredCard] = useState(null);

  const services = [
    {
      title: "Project Viewing & Management",
      description:
        "Advanced tools for viewing and managing architectural projects",
      features: [
        "3D Model Viewing (NWD files)",
        "Point Cloud Data Analysis",
        "Real-time Project Updates",
        "Collaborative Markup Tools",
      ],
      icon: LayoutDashboard,
    },
    {
      title: "Digital Assets Management",
      description:
        "Comprehensive system for managing construction digital assets",
      features: [
        "BIM File Management",
        "Document Version Control",
        "Asset Tracking System",
        "Secure File Sharing",
      ],
      icon: Database,
    },
    {
      title: "RSMeans Integration",
      description: "Cost estimation and building construction data",
      features: [
        "Cost Database Access",
        "Material Cost Updates",
        "Labor Cost Estimates",
        "Custom Cost Analysis",
      ],
      icon: Calculator,
    },
    {
      title: "Drawing Management",
      description: "View and manage architectural drawings and files",
      features: [
        "LAS File Viewing",
        "AutoCAD Integration",
        "Drawing Annotations",
        "Version History",
      ],
      icon: Files,
    },
  ];

  const projectDetails = {
    name: "Construction Client Portal",
    version: "2.0.1",
    lastUpdated: "2024-12-23",
    deploymentType: "Cloud-based",
    supportHours: "24/7",
  };

  return (
    <div className="container mx-auto px-4">
      <div className="w-full mx-auto p-4 space-y-6 bg-gray-50 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-white mt-32 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl">
            <div className="p-6 w-full bg-gradient-to-r from-blue-500 to-[#6366f1] rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="text-white">
                  <h1 className="text-2xl">{projectDetails.name}</h1>
                  <p className="font-light text-[20px] md:text-[22px] leading-[50px] text-center w-auto">
                    Version {projectDetails.version} | Last Updated:{" "}
                    {projectDetails.lastUpdated}
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
          <img src={archiwiz} alt="" className="w-full h-[50vh] object-fit" />
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <h2 className="text-3xl text-center text-gray-800 dark:text-white mt-10 md:text-left">
              About Our Client Portal
            </h2>
            <p className="font-light text-[20px] md:text-[22px] mt-5 w-auto">
              Our construction client portal is a state-of-the-art platform
              designed specifically for architecture and construction
              professionals. It provides comprehensive tools for viewing and
              managing architectural projects, including support for various
              file formats like LAS, NWD, and Point Cloud data. The portal
              integrates RSMeans data for accurate cost estimation and includes
              robust digital asset management capabilities.
            </p>

            <p className="font-light text-[20px] md:text-[22px] mt-5 w-auto">
              With our platform, clients can seamlessly collaborate on projects,
              view and comment on architectural designs, manage digital assets,
              and access detailed cost estimations. The system supports
              real-time updates and includes powerful tools for project
              management, documentation, and team collaboration.
            </p>
          </div>
        </div>

        <div className="p-1 flex justify-center items-center">
          <div className="flex bg-white space-x-2 justify-center items-center mt-5">
            {[
              { id: "services", icon: Building2, label: "Services" },
              { id: "details", icon: FileText, label: "Project Details" },
              { id: "support", icon: Phone, label: "Support" },
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                  activeTab === id
                    ? "bg-[#6366f1] text-white shadow-md transform scale-105"
                    : "text-black bg-[#bfdbfe]"
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

        <div className="mt-6">
          {activeTab === "services" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
              {services.map((service, index) => {
                const ServiceIcon = service.icon;
                return (
                  <div
                    key={index}
                    className={`bg-white rounded-xl shadow-md p-6 transform transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer ${
                      hoveredCard === index ? "border-l-4 border-blue-500" : ""
                    }`}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <ServiceIcon className="w-6 h-6 text-blue-600" />
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
                );
              })}
            </div>
          )}

          {activeTab === "details" && (
            <div className="bg-white rounded-xl shadow-md p-8 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6 transform transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Building2 className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold">Platform Features</h3>
                  </div>
                  <div className="space-y-3 pl-12">
                    <p className="flex items-center gap-2">
                      <span className="font-semibold">File Support:</span>
                      <span className="text-gray-600">
                        LAS, NWD, Point Cloud, CAD
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="font-semibold">Deployment:</span>
                      <span className="text-gray-600">Cloud-based</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="font-semibold">Storage:</span>
                      <span className="text-gray-600">Enterprise Cloud</span>
                    </p>
                  </div>
                </div>
                <div className="space-y-6 transform transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold">Access Management</h3>
                  </div>
                  <div className="space-y-3 pl-12">
                    <p className="flex items-center gap-2">
                      <span className="font-semibold">Access Levels:</span>
                      <span className="text-gray-600">
                        Client, Architect, Contractor
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="font-semibold">Security:</span>
                      <span className="text-gray-600">Enterprise-grade</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="font-semibold">Collaboration:</span>
                      <span className="text-gray-600">Real-time enabled</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "support" && (
            <div className="bg-white rounded-xl shadow-md p-8 animate-fadeIn">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold">Support Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-12">
                  <div className="space-y-4 transform transition-all duration-300 hover:scale-105">
                    <p className="flex items-center gap-2">
                      <span className="font-semibold">Hours:</span>
                      <span className="text-gray-600">
                        {projectDetails.supportHours}
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="font-semibold">Email:</span>
                      <span className="text-gray-600">
                        support@constructionportal.com
                      </span>
                    </p>
                  </div>
                  <div className="space-y-4 transform transition-all duration-300 hover:scale-105">
                    <p className="flex items-center gap-2">
                      <span className="font-semibold">Technical Support:</span>
                      <span className="text-gray-600">+1 (555) 123-4567</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="font-semibold">Resources:</span>
                      <span className="text-gray-600">
                        Knowledge Base Available
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortalDetails;

const customStyles = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out;
  }
`;
