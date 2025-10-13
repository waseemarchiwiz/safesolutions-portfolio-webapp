import {
  ShieldCheckIcon,
  ServerIcon,
  GlobeIcon,
  Construction,
  Toilet,
  BrickWall,
  HandPlatter,
  SquareSquare,
  Trees,
  CookingPot,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ServiceCard from "./service.card";
import { ServicesTypes } from ".";

const services = [
  {
    icon: <Construction className="w-12 h-12 text-blue-500" />,
    title: "Roofings",
    description:
      "Expert roofing services to protect your home and enhance its durability with high-quality materials and craftsmanship.",
    features: ["New Roof Installation", "Roof Repair", "Regular Maintenance"],
    link: "https://archiwizbuild-portfolio-app-prod-g5hdfzcxhucwcsa2.eastus-01.azurewebsites.net/services/roofing", // Link to service details
  },
  {
    icon: <CookingPot className="w-12 h-12 text-purple-500" />,
    title: "Kitchen Remodeling",
    description:
      "Transform your kitchen with modern designs, functional layouts, and stylish finishes to create the perfect culinary space.",
    features: [
      "Custom Cabinets",
      "Countertops Installation",
      "Lighting Upgrades",
    ],
    link: "https://archiwizbuild-portfolio-app-prod-g5hdfzcxhucwcsa2.eastus-01.azurewebsites.net/services/kitchen-remodeling",
  },
  {
    icon: <Toilet className="w-12 h-12 text-green-500" />,
    title: "Bathroom Remodeling",
    description:
      "Upgrade your bathroom with elegant designs and practical solutions tailored to your style and comfort needs.",
    features: [
      "Shower and Tub Upgrades",
      "Tile Installation",
      "Plumbing and Fixtures",
    ],
    link: "https://archiwizbuild-portfolio-app-prod-g5hdfzcxhucwcsa2.eastus-01.azurewebsites.net/services/bathroom-remodeling",
  },
  {
    icon: <ShieldCheckIcon className="w-12 h-12 text-red-500" />,
    title: "Home Remodeling",
    description:
      "Comprehensive home remodeling services to enhance functionality and aesthetics, making your dream home a reality.",
    features: ["Room Additions", "Open Floor Plans", "Custom Interior Design"],
    link: "https://archiwizbuild-portfolio-app-prod-g5hdfzcxhucwcsa2.eastus-01.azurewebsites.net/services/home-remodeling",
  },
  {
    icon: <SquareSquare className="w-12 h-12 text-yellow-500" />,
    title: "Flooring",
    description:
      "Premium flooring solutions to elevate your space with a wide range of materials and expert installation.",
    features: ["Hardwood Flooring", "Tile Installation", "Carpet and Vinyl"],
    link: "https://archiwizbuild-portfolio-app-prod-g5hdfzcxhucwcsa2.eastus-01.azurewebsites.net/services/flooring",
  },
  {
    icon: <BrickWall className="w-12 h-12 text-orange-500" />,
    title: "Drywall",
    description:
      "Professional drywall installation and repair services to ensure smooth, durable walls and ceilings.",
    features: [
      "Drywall Installation",
      "Repairs and Patching",
      "Finishing and Texturing",
    ],
    link: "https://archiwizbuild-portfolio-app-prod-g5hdfzcxhucwcsa2.eastus-01.azurewebsites.net/services/drywall",
  },
  {
    icon: <ServerIcon className="w-12 h-12 text-teal-500" />,
    title: "Painting",
    description:
      "Expert interior and exterior painting services to refresh your home with vibrant colors and a flawless finish.",
    features: [
      "Custom Color Matching",
      "Wall Preparation",
      "Detailed Trim Work",
    ],
    link: "https://archiwizbuild-portfolio-app-prod-g5hdfzcxhucwcsa2.eastus-01.azurewebsites.net/services/painting",
  },
  {
    icon: <GlobeIcon className="w-12 h-12 text-cyan-500" />,
    title: "General Handy Services",
    description:
      "Reliable handyman services to address a variety of home improvement and repair needs with precision and care.",
    features: ["Minor Repairs", "Furniture Assembly", "Fixture Installation"],
    link: "https://archiwizbuild-portfolio-app-prod-g5hdfzcxhucwcsa2.eastus-01.azurewebsites.net/services/handy-services",
  },
  {
    icon: <GlobeIcon className="w-12 h-12 text-cyan-500" />,
    title: "Landscape Design and Installation",
    description:
      "Professional landscaping services to create stunning outdoor spaces that blend beauty and functionality.",
    features: ["Garden Design", "Hardscaping", "Irrigation Systems"],
    link: "https://archiwizbuild-portfolio-app-prod-g5hdfzcxhucwcsa2.eastus-01.azurewebsites.net/services/landscaping",
  },
  {
    icon: <Trees className="w-12 h-12 text-cyan-500" />,
    title: "Tree Trimming",
    description:
      "Enhance the health and appearance of your trees with expert trimming and maintenance services.",
    features: ["Crown Thinning", "Deadwood Removal", "Shaping and Pruning"],
    link: "https://archiwizbuild-portfolio-app-prod-g5hdfzcxhucwcsa2.eastus-01.azurewebsites.net/services/tree-trimming",
  },
  {
    icon: <HandPlatter className="w-12 h-12 text-green-500" />,
    title: "Hurricane Damage Recovery",
    description:
      "Comprehensive restoration services to repair and recover your property after hurricane damage.",
    features: [
      "Structural Repairs",
      "Water Damage Mitigation",
      "Debris Removal",
    ],
    link: "https://archiwizbuild-portfolio-app-prod-g5hdfzcxhucwcsa2.eastus-01.azurewebsites.net/services/hurricane-damage-recovery",
  },
];

const ArchiwizConstruction = ({ data }: { data: ServicesTypes[] }) => (
  <div className="bg-[#FFFFFF] dark:bg-black py-16">
    <div className="container mx-auto">
      {/* <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We provide cutting-edge digital solutions to help your business thrive in the modern world.
          </p>
        </div> */}
      <div className="grid md:grid-cols-3 gap-8">
        {data.map((service, index) => (
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
    </div>
  </div>
);

export default ArchiwizConstruction;
