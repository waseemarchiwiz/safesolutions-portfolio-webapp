
import CustomButton from "@/globals/CustomButton";
import {
  FaCheck,
  FaMapMarkedAlt,
  FaWater,
  FaLeaf,
  FaChartLine,
  FaTractor,
  FaHelicopter,
} from "react-icons/fa";
import { Link } from "react-router-dom";


const agricultureId = [
     {
    icon:<FaHelicopter className="w-12 h-12 text-blue-500" />,
    title: "Drone-Based Monitoring",
    description:
      "Capture high-resolution aerial imagery for early detection of crop stress, pests, and diseases.",
    features: [
      "Early Stress Detection",
      "Pest & Disease Identification",
      "Comprehensive Field Insights",
    ],
    link: "https://archiwiz.com/services/precision-agriculture",
  },
  {
    icon: <FaMapMarkedAlt className="w-12 h-12 text-purple-500" />,
    title: "Field Mapping & Analysis",
    description:
      "Detailed GIS mapping to identify soil variation, topography, and crop performance across your land.",
    features: [
      "Soil Type Identification",
      "Management Zone Creation",
      "Per-Acre Insights",
    ],
    link: "https://archiwiz.com/services/precision-agriculture",
  },
  {
    icon: <FaWater className="w-12 h-12 text-teal-500" />,
    title: "Irrigation Management",
    description:
      "Optimize water use with soil sensors, weather data, and smart irrigation prescriptions.",
    features: [
      "Soil Moisture Monitoring",
      "Weather-Based Irrigation Plans",
      "Water Conservation",
    ],
    link: "https://archiwiz.com/services/precision-agriculture",
  },
  {
    icon: <FaLeaf className="w-12 h-12 text-green-600" />,
    title: "Crop Health Assessment",
    description:
      "Use multispectral and thermal imaging to detect nutrient deficiencies and disease before symptoms appear.",
    features: [
      "Nutrient Deficiency Detection",
      "Thermal Stress Monitoring",
      "Targeted Intervention",
    ],
    link: "https://archiwiz.com/services/precision-agriculture",
  },
  {
    icon: <FaChartLine className="w-12 h-12 text-red-500" />,
    title: "Data Collection & Analysis",
    description:
      "Integrate data from drones, sensors, and weather stations into one actionable platform.",
    features: [
      "Centralized Data Hub",
      "Correlations & Patterns",
      "Evidence-Based Decisions",
    ],
    link: "https://archiwiz.com/services/precision-agriculture",
  },
  {
    icon: <FaTractor className="w-12 h-12 text-yellow-500" />,
    title: "Yield Performance Analytics",
    description:
      "Track and analyze yield trends across seasons to improve productivity and profitability.",
    features: [
      "Historical Yield Tracking",
      "Input-to-Output Correlation",
      "Continuous Improvement",
    ],
    link: "https://archiwiz.com/services/precision-agriculture",
  },
]

const ServiceCard = ({ icon, title, description, features, link }) => (
  <div className="group bg-[#FFFFFF] dark:bg-black p-6 rounded-lg  border-2  hover:shadow-lg hover:shadow-slate-500 transition-shadow duration-300 relative">
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
    <Link
      to={link}
      target="_blank"
      className="absolute bottom-6 right-6 text-sm font-medium text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    >
      Learn More
    </Link>
  </div>
);

export default function Agriculture() {
  return (
   <div className="min-h-screen bg-[#FFFFFF] dark:bg-black py-16 px-4">
    <div className="container mx-auto">
      <div className="grid md:grid-cols-3 gap-8">
        {agricultureId.map((service, index) => (
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
  )
}
