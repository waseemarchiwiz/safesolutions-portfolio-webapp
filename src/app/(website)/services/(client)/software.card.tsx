import Link from "next/link";
import { ServicesTypes } from ".";
import { iconsMap } from "../../project/data";
import { Check } from "lucide-react";

// Pick only the required fields for ServiceCard
type ServiceCardProps = Pick<
  ServicesTypes,
  "id" | "icon" | "title" | "description" | "features"
>;

const SoftwareServiceCard = ({
  icon,
  id,
  title,
  description,
  features,
}: ServiceCardProps) => {
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

export default SoftwareServiceCard;
