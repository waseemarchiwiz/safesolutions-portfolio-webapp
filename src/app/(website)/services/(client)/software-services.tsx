import { Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { iconsMap, softwareData } from "../data";

type Servicetypes = {
  id: number;
  icon: keyof typeof iconsMap; // Reference to the icon component
  title: string;
  description: string;
  features: string[];
};

const ServiceCard = ({
  icon,
  id,
  title,
  description,
  features,
}: Servicetypes) => {
  // icon
  const Icon = iconsMap[icon];
  return (
    <div className="group bg-[#FFFFFF] dark:bg-black p-6 rounded-lg  border-2  hover:shadow-lg hover:shadow-slate-500 transition-shadow duration-300 relative">
      <Link href={`/software/${id}`}>
        <div className="mb-4">
          <Icon className="w-12 h-12 text-blue-500" /> {/* Invoke the icon */}
        </div>
        <h3 className="text-xl font-bold mb-3 dark:text-white text-gray-800">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        <ul className="space-y-2">
          {features?.map((feature, index) => (
            <li
              key={index}
              className="flex items-center text-gray-700 dark:text-gray-300"
            >
              <Check className="w-5 h-5 mr-2 text-green-500" /> {feature}
            </li>
          ))}
        </ul>
      </Link>
      <Link
        href={`/software/${id}`}
        className="absolute bottom-6 right-6 text-sm font-medium text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        Learn More
      </Link>
    </div>
  );
};

const SoftwareService = () => (
  <div className="min-h-screen bg-[#FFFFFF] dark:bg-black py-16 px-4">
    <div className="container mx-auto">
      <div className="grid md:grid-cols-3 gap-8">
        {softwareData.map((service) => (
          <ServiceCard
            key={service.id}
            id={service.id} // Pass the id to the ServiceCard
            icon={service.icon} // Pass the icon component
            title={service.title}
            description={service.description}
            features={service.features}
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

export default SoftwareService;
