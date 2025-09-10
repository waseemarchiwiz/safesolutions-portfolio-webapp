import React from "react";
import CustomButton from "@/globals/CustomButton";
import { FaCity, FaTree, FaLaptopCode, FaBuilding } from "react-icons/fa";
import {
  Handshake,
  Proportions,
  ScanQrCode,
  SwitchCamera,
  TvMinimal,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ServiceCard from "./cards/service.card";

const architectureServices = [
  {
    icon: <FaLaptopCode className="w-12 h-12 text-teal-500" />,
    title: "BIM Services",
    description:
      "Building Information Modeling improves collaboration, coordination, communication, reduces errors and rework, while saving cost",
    features: [
      "2D conceptual plan & details",
      "3D Structural, Architectural, MEP & Site Modelling (Coordination & Clash detection)",
      "4D Project Scheduling",
    ],
    link: "https://www.archiwiz.com/services/bim-services",
  },
  {
    icon: <TvMinimal className="w-12 h-12 text-blue-500" />,
    title: "Visualization",
    description:
      "Turn designs into immersive experiences through still renders, 360 views, and virtual tours, enhancing engagement while saving costs.",
    features: [
      "Still Render (Day/Night)",
      "Still Render (Exterior / Interior)",
      "360 Renders",
      "House Tour",
      "Multistage Tour",
    ],
    link: "https://www.archiwiz.com/services/visualization-services",
  },
  {
    icon: <ScanQrCode className="w-12 h-12 text-yellow-500" />,
    title: "Scanning",
    description:
      "Leverage BIM’s advanced 3D modeling capabilities for precise representations of structures, combined with realistic renderings for client presentations.",
    features: ["Lidar Scanning Survey", "Scan to BIM", "Scan to Visualize"],
    link: "https://www.archiwiz.com/services/scanning",
  },
  {
    icon: <Proportions className="w-12 h-12 text-green-500" />,
    title: "Landscape(yardvinyana)",
    description:
      "Complete landscape services to elevate your outdoor spaces with design and visualization expertise.",
    features: ["Basic Designing", "Takeoff & Costing", "Procurement", "Render"],
    link: "https://www.archiwiz.com/services/landscape",
  },
  {
    icon: <FaBuilding className="w-12 h-12 text-cyan-500" />,
    title: "Civil Works",
    description:
      "Comprehensive civil works solutions and stunning visual storytelling with advanced technology.",
    features: [
      "GIS Mapping Survey",
      "Drainage Plan",
      "Utility Map",
      "Flood Zone Map",
      "Country Information",
    ],
    link: "https://www.archiwiz.com/services/civil-works",
  },
  {
    icon: <SwitchCamera className="w-12 h-12 text-green-500" />,
    title: "Photogrammetry & Videography",
    description:
      "Capture and showcase properties with high-quality videos, virtual tours, and drone footage.",
    features: [
      "HDR Images",
      "HDR Bracketed",
      "360 Images",
      "Retail HD videos",
      "House Tours",
    ],
    link: "https://www.archiwiz.com/services/photography-&-videography",
  },
  {
    icon: <FaTree className="w-12 h-12 text-orange-500" />,
    title: "Drone Services",
    description:
      "Leverage aerial drone technology for surveying, inspection, and monitoring, offering unique perspectives and data for project evaluation.",
    features: [
      "Drone Inspection",
      "Drone Survey",
      "Aerial Shot",
      "Drone Videos",
      "Ortho Projection",
      "Drone Imagery to Model",
    ],
    link: "https://www.archiwiz.com/services/drone-services",
  },
  {
    icon: <Handshake className="w-12 h-12 text-green-500" />,

    title: "Vendor Management and Dealership",
    description:
      "Streamline your procurement process with our vendor management services, ensuring the best deals and quality products for your projects.",
    features: [
      "Data Analysis",
      "Market Research on Data Base",
      "Beginning the Pricing Process From different vendor",
      "Purchase Order",
      "Timely deliver on site",
      "Dealership Top Knobs",
      "Dealership Hardware's",
      "Dealership Windows and Doors",
    ],
    link: "https://www.archiwiz.com/services/vendor-management",
  },
  {
    icon: <FaCity className="w-12 h-12 text-red-500" />,
    title: "Project Management",
    description:
      "Expert project management services to oversee your projects from inception to completion, ensuring timelines, budgets, and quality are met.",
    features: [
      "Project Schedule",
      "Project Coordination",
      "Project Budgeting & Time Management",
      "Project Risk and Communication Plan",
    ],
    link: "https://www.archiwiz.com/services/project-management",
  },
];

const Archetecture = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#FFFFFF] dark:bg-black py-16 px-4">
      <div className="container mx-auto">
        {/* <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Architecture and Design Services
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Innovative architectural solutions to turn your dream projects into
            reality.
          </p>
        </div> */}
        <div className="grid md:grid-cols-3 gap-8">
          {architectureServices.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              features={service.features}
              link={service.link} // Link to service details
            />
          ))}
        </div>
        <div className="text-center mt-12">
          <CustomButton
            handleClick={() => navigate("/contact")}
            label="Get Started"
            to={"/contact"}
          />
        </div>
      </div>
    </div>
  );
};

export default Archetecture;
