import {
  Map, // FaMapMarkedAlt
  Waves, // FaWater
  Leaf, // FaLeaf
  LineChart, // FaChartLine
  Tractor, // FaTractor
  Plane, // FaHelicopter (no helicopter, closest is Plane)
} from "lucide-react";

import ServiceCard from "./service.card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ServicesTypes } from ".";

const agricultureId = [
  {
    icon: <Plane className="w-12 h-12 text-blue-500" />,
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
    icon: <Map className="w-12 h-12 text-purple-500" />,
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
    icon: <Waves className="w-12 h-12 text-teal-500" />,
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
    icon: <Leaf className="w-12 h-12 text-green-600" />,
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
    icon: <LineChart className="w-12 h-12 text-red-500" />,
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
    icon: <Tractor className="w-12 h-12 text-yellow-500" />,
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
];

export default function Agriculture({ data }: { data: ServicesTypes[] }) {
  return (
    <div className="min-h-screen bg-[#FFFFFF] dark:bg-black py-16 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {data.map((service, index) => (
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
          <Link href={"/contact"}>
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
