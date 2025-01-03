import React from "react";
import CustomButton from "@/globals/CustomButton";
import {
  FaDraftingCompass,
  FaPaintBrush,
  FaRulerCombined,
  FaCity,
  FaCubes,
  FaTree,
  FaLaptopCode,
  FaBuilding,
  FaCheck,
} from "react-icons/fa";

const architectureServices = [
  {
    icon: <FaLaptopCode className="w-12 h-12 text-teal-500" />,
    title: "Introduction to BIM",
    description:
      "Building Information Modeling (BIM) is revolutionizing the architecture and construction industry. It provides a digital representation of the physical and functional characteristics of a building, ensuring better collaboration and decision-making.",
    features: [
      "Comprehensive Digital Models",
      "Multi-Disciplinary Collaboration",
      "Improved Project Visualization",
    ],
  },
  {
    icon: <FaDraftingCompass className="w-12 h-12 text-blue-500" />,
    title: "BIM for Design and Planning",
    description:
      "BIM enhances design and planning processes by enabling accurate simulations and analyses before construction begins, reducing errors and costly rework.",
    features: [
      "Design Validation",
      "Simulations for Energy Efficiency",
      "Space Optimization Insights",
    ],
  },
  {
    icon: <FaCubes className="w-12 h-12 text-yellow-500" />,
    title: "3D Modeling & Rendering in BIM",
    description:
      "Leverage BIM’s advanced 3D modeling capabilities for precise representations of structures, combined with realistic renderings for client presentations.",
    features: [
      "3D Conceptual Models",
      "Photo-realistic Visualizations",
      "Virtual Walkthroughs",
    ],
  },
  {
    icon: <FaRulerCombined className="w-12 h-12 text-green-500" />,
    title: "BIM for Construction Management",
    description:
      "BIM supports construction management by integrating schedules, costs, and resource data into a cohesive model, enhancing efficiency and reducing delays.",
    features: [
      "Integrated Scheduling (4D BIM)",
      "Cost Estimation (5D BIM)",
      "Resource Management",
    ],
  },
  {
    icon: <FaBuilding className="w-12 h-12 text-cyan-500" />,
    title: "Compliance and Regulations",
    description:
      "BIM ensures adherence to building standards and legal requirements, streamlining approvals and minimizing risks associated with regulatory non-compliance.",
    features: [
      "Regulatory Compliance Checks",
      "Automated Documentation",
      "Seamless Approval Processes",
    ],
  },
  {
    icon: <FaCheck className="w-12 h-12 text-green-500" />,
    title: "Quality Assurance with BIM",
    description:
      "BIM facilitates quality assurance by identifying potential issues early in the project lifecycle, reducing risks and ensuring superior outcomes.",
    features: [
      "Clash Detection",
      "Error Reduction",
      "Enhanced Quality Control",
    ],
  },
  {
    icon: <FaTree className="w-12 h-12 text-orange-500" />,
    title: "Sustainability and BIM",
    description:
      "Integrating BIM with sustainability goals enables eco-friendly designs by analyzing energy consumption and optimizing material use.",
    features: [
      "Energy Efficiency Analysis",
      "Material Optimization",
      "Carbon Footprint Reduction",
    ],
  },
  {
    icon: <FaCity className="w-12 h-12 text-red-500" />,
    title: "Urban Planning with BIM",
    description:
      "BIM extends its capabilities to urban planning, helping design sustainable and smart cities with efficient infrastructure management.",
    features: [
      "Zoning and Infrastructure Planning",
      "Simulation of Urban Environments",
      "Community-Centric Design",
    ],
  },
];

const ServiceCard = ({ icon, title, description, features }) => (
  <div className="bg-white dark:bg-[#18181B] p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-3 dark:text-white text-gray-800">
      {title}
    </h3>
    <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
    <ul className="space-y-2">
      {features.map((feature, index) => (
        <li
          key={index}
          className="flex items-center text-gray-700 dark:text-gray-300"
        >
          <FaCheck className="w-5 h-5 mr-2 text-green-500" /> {feature}
        </li>
      ))}
    </ul>
  </div>
);

const Archetecture = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#18181B] py-16 px-4">
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
