import { Check } from "lucide-react";
import Link from "next/link";

const ServiceCard = ({ icon, title, description, features, link }: any) => (
  <div className="group bg-[#FFFFFF] dark:bg-black p-6 rounded-lg  border-2  hover:shadow-lg hover:shadow-slate-500 transition-shadow duration-300 relative">
    <Link href={link} target="_blank">
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
            <Check className="w-5 h-5 mr-2 text-green-500" /> {feature}
          </li>
        ))}
      </ul>
    </Link>
    <Link
      href={link}
      target="_blank"
      className="absolute bottom-6 right-6 text-sm font-medium text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    >
      Learn More
    </Link>
  </div>
);

export default ServiceCard;
