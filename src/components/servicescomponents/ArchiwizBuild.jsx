import React from "react";
import CustomButton from "@/globals/CustomButton";
import {
  FaTruck,
  FaClipboardCheck,
  FaBoxes,
  FaShippingFast,
  FaHeadset,
  FaRegClipboard,
} from "react-icons/fa";
import ServiceCard from "./cards/service.card";

const archiwizbuild = [
  {
    icon: <FaTruck className="w-12 h-12 text-blue-500" />, // Changed to truck icon for receiving inventory
    title: "Receiving Inventory",
    description:
      "Efficiently manage inventory upon arrival with streamlined processes for inspection and organization.",
    features: [
      "Container Unloading",
      "Product Categorization",
      "Initial Quality Check",
    ],
    link: "https://alphabuiltconsultants.com",
  },
  {
    icon: <FaClipboardCheck className="w-12 h-12 text-purple-500" />, // Changed to checkmark icon for inspection
    title: "Inspection and Quality Control",
    description:
      "Ensure that all products meet your quality standards through rigorous inspection processes.",
    features: [
      "Quality Standards Adherence",
      "Defect Detection",
      "Product Testing",
    ],
    link: "https://alphabuiltconsultants.com",
  },
  {
    icon: <FaBoxes className="w-12 h-12 text-green-500" />, // Changed to boxes icon for storing inventory
    title: "Storing Inventory",
    description:
      "Organize and manage your inventory storage efficiently for quick retrieval and easy access.",
    features: [
      "Shelf Organization",
      "Inventory Categorization",
      "Optimal Storage Space Utilization",
    ],
    link: "https://alphabuiltconsultants.com",
  },
  {
    icon: <FaShippingFast className="w-12 h-12 text-red-500" />, // Changed to shipping icon for order processing
    title: "Order Processing",
    description:
      "Streamline your order fulfillment processes, ensuring timely and accurate deliveries.",
    features: [
      "Order Verification",
      "Shipping Label Generation",
      "Real-Time Order Tracking",
    ],
    link: "https://alphabuiltconsultants.com",
  },
  {
    icon: <FaHeadset className="w-12 h-12 text-yellow-500" />, // Changed to headset icon for customer support
    title: "Customer Support System",
    description:
      "Enhance customer satisfaction with quick and effective customer service interactions.",
    features: ["Phone Support", "Email Correspondence", "Live Chat Support"],
    link: "https://alphabuiltconsultants.com",
  },
  {
    icon: <FaRegClipboard className="w-12 h-12 text-orange-500" />, // Changed to clipboard icon for inventory management
    title: "Inventory Management",
    description:
      "Keep track of your stock levels, manage inventory turnover, and prevent shortages or overstocking.",
    features: [
      "Stock Level Tracking",
      "Automated Reordering",
      "Inventory Audits",
    ],
    link: "https://alphabuiltconsultants.com",
  },
];

const ArchiwizBuild = () => (
  <div className="min-h-screen bg-[#FFFFFF] dark:bg-black py-16 px-4">
    <div className="container mx-auto">
      <div className="grid md:grid-cols-3 gap-8">
        {archiwizbuild.map((service, index) => (
          <ServiceCard
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
            features={service.features}
            link={service.link}
          />
        ))}
      </div>
      <div className="text-center mt-12">
        <CustomButton to={"/contact"} label="Get Started" />
      </div>
    </div>
  </div>
);

export default ArchiwizBuild;
