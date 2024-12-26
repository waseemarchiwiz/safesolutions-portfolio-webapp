import React, { useState } from "react";
import {
  BarChart3,
  Users,
  Package,
  Settings,
  Clock,
  Building2,
  FileText,
  Phone,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import erpimage from "../../../assets/erp.webp";

const ERPDetails = () => {
  const [activeTab, setActiveTab] = useState("services");
  const [hoveredCard, setHoveredCard] = useState(null);

  const services = [
    {
      title: "Financial Management",
      description:
        "Complete accounting, budgeting, and financial reporting solutions",
      features: [
        "General Ledger",
        "Accounts Payable/Receivable",
        "Asset Management",
      ],
      icon: BarChart3,
    },
    {
      title: "Human Resources",
      description:
        "Comprehensive HR management and employee self-service portal",
      features: ["Payroll Processing", "Time & Attendance", "Employee Records"],
      icon: Users,
    },
    {
      title: "Inventory Management",
      description: "Real-time inventory tracking and optimization",
      features: ["Stock Control", "Purchase Orders", "Warehouse Management"],
      icon: Package,
    },
    {
      title: "Customer Relations",
      description: "Integrated CRM with customer support features",
      features: ["Contact Management", "Support Tickets", "Customer Portal"],
      icon: Phone,
    },
  ];

  const projectDetails = {
    name: "Enterprise ERP Solution",
    version: "2.0.1",
    lastUpdated: "2024-12-23",
    deploymentType: "Cloud-based",
    supportHours: "24/7",
  };

  return (
    <div className="container mx-auto px-4">
      <div className=" w-full    mx-auto p-4 space-y-6 bg-gray-50 min-h-screen">
        {/* Header Section */}
        <motion.div
          //   className=" mx-auto px-6 py-16 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-white  mt-32 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl">
            <div className="p-6 w-full bg-gradient-to-r from-blue-500 to-[#6366f1] rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="text-white">
                  <h1 className="text-2xl">{projectDetails.name}</h1>
                  <p className=" font-light text-[20px] md:text-[22px] leading-[50px] text-center   w-auto">
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
          <img src={erpimage} alt="" className="w-full h-[40vh] object-cover" />
        </motion.div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Text Section */}
          <div className="flex-1">
            <h2 className="text-3xl   text-center text-gray-800 dark:text-white mt-10 md:text-left ">
              About Our ERP System
            </h2>
            <p className=" font-light text-[20px] md:text-[22px] mt-5 w-auto">
              Our ERP system is a comprehensive solution designed to streamline
              business processes, enhance efficiency, and improve
              decision-making through real-time data access and reporting. It
              integrates key business functions such as finance, human
              resources, inventory management, and sales into a unified
              platform, providing seamless collaboration and communication
              across all departments.
            </p>

            <p className=" font-light text-[20px] md:text-[22px] mt-5 w-auto">
              Our ERP system is cloud-based, allowing for remote access, and it
              is designed to integrate seamlessly with other business
              applications. Whether you're looking to improve operational
              efficiency, reduce costs, or gain better insights into your
              business, our ERP solution is the ideal choice for optimizing your
              organization's performance.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="   p-1 flex justify-center items-center">
          <div className="flex bg-white w- space-x-2 justify-center items-center mt-5    ">
            {[
              { id: "services", icon: Package, label: "Services" },
              { id: "details", icon: FileText, label: "Project Details" },
              { id: "support", icon: Phone, label: "Support" },
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                  activeTab === id
                    ? "bg-[#6366f1] text-white shadow-md transform scale-105"
                    : "text-black  bg-[#bfdbfe]"
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
          {activeTab === "services" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
              {services.map((service, index) => {
                const ServiceIcon = service.icon;
                return (
                  <div
                    key={index}
                    className={`bg-white rounded-xl shadow-md p-6 transform transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer
                    ${
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
                    <h3 className="text-xl font-semibold">
                      Deployment Information
                    </h3>
                  </div>
                  <div className="space-y-3 pl-12">
                    <p className="flex items-center gap-2">
                      <span className="font-semibold">Type:</span>
                      <span className="text-gray-600">
                        {projectDetails.deploymentType}
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="font-semibold">Environment:</span>
                      <span className="text-gray-600">Production</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="font-semibold">Infrastructure:</span>
                      <span className="text-gray-600">AWS Cloud</span>
                    </p>
                  </div>
                </div>
                <div className="space-y-6 transform transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold">User Management</h3>
                  </div>
                  <div className="space-y-3 pl-12">
                    <p className="flex items-center gap-2">
                      <span className="font-semibold">Access Control:</span>
                      <span className="text-gray-600">Role-based</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="font-semibold">Authentication:</span>
                      <span className="text-gray-600">SSO enabled</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="font-semibold">User Roles:</span>
                      <span className="text-gray-600">
                        Admin, Manager, Employee
                      </span>
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
                      <span className="text-gray-600">support@example.com</span>
                    </p>
                  </div>
                  <div className="space-y-4 transform transition-all duration-300 hover:scale-105">
                    <p className="flex items-center gap-2">
                      <span className="font-semibold">Phone:</span>
                      <span className="text-gray-600">+1 (555) 123-4567</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="font-semibold">Documentation:</span>
                      <span className="text-gray-600">
                        Available in Help Center
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

export default ERPDetails;

// Add this to your CSS/Tailwind config
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
