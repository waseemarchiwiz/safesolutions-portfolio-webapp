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
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();
const architectureServices = [
  {
    icon: <FaDraftingCompass className="w-12 h-12 text-blue-500" />,
    title: "Architectural Planning",
    description:
      "Transform your vision into reality with meticulously crafted architectural plans.",
    features: [
      "Custom Building Design",
      "Site Analysis & Planning",
      "Space Optimization",
    ],
  },
  {
    icon: <FaPaintBrush className="w-12 h-12 text-purple-500" />,
    title: "Interior Design",
    description:
      "Create stunning interiors that blend functionality and aesthetic appeal.",
    features: ["Space Layout", "Color Schemes", "Furniture Selection"],
  },
  {
    icon: <FaRulerCombined className="w-12 h-12 text-green-500" />,
    title: "Structural Engineering",
    description:
      "Ensure the safety and stability of your projects with expert structural engineering.",
    features: ["Structural Analysis", "Load Calculations", "Foundation Design"],
  },
  {
    icon: <FaCity className="w-12 h-12 text-red-500" />,
    title: "Urban Planning",
    description:
      "Plan modern and sustainable urban environments tailored to community needs.",
    features: ["Zoning Plans", "Infrastructure Development", "Public Spaces"],
  },
  {
    icon: <FaCubes className="w-12 h-12 text-yellow-500" />,
    title: "3D Modeling & Rendering",
    description:
      "Visualize your projects with high-quality 3D models and realistic renderings.",
    features: ["Conceptual 3D Models", "Photo-realistic Renders", "Animation"],
  },
  {
    icon: <FaTree className="w-12 h-12 text-orange-500" />,
    title: "Landscape Design",
    description:
      "Integrate nature with architecture through innovative landscape designs.",
    features: ["Garden Planning", "Outdoor Spaces", "Eco-friendly Design"],
  },
  {
    icon: <FaLaptopCode className="w-12 h-12 text-teal-500" />,
    title: "BIM Services",
    description:
      "Utilize Building Information Modeling for accurate and efficient project execution.",
    features: ["BIM Modeling", "Clash Detection", "Project Coordination"],
  },
  {
    icon: <FaBuilding className="w-12 h-12 text-cyan-500" />,
    title: "Project Management",
    description:
      "Oversee your projects from concept to completion with our comprehensive management services.",
    features: ["Budget Planning", "Timeline Management", "Quality Control"],
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

const ArchitectureServicesTab = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#18181B] py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Architecture and Design Services
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Innovative architectural solutions to turn your dream projects into
            reality.
          </p>
        </div>
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
          />
        </div>
      </div>
    </div>
  );
};

export default ArchitectureServicesTab;
