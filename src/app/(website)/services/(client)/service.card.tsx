import { Check } from "lucide-react";
import Link from "next/link";
import { ServicesTypes } from ".";
import { iconsMap } from "../../project/data";

// Pick only the required fields for ServiceCard
export type ServiceCardProps = Pick<
  ServicesTypes,
  "icon" | "title" | "description" | "features" | "link"
>;

const ServiceCard = ({
  icon,
  title,
  description,
  features,
  link,
}: ServiceCardProps) => {
  const Icon = iconsMap[icon];

  return (
    <Link href={link as string} target="_blank" className="block group">
      <div className="relative h-full bg-white dark:bg-black rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden transition-all duration-500 hover:border-sky-600 ">
        {/* Gradient Overlay on Hover */}

        <div className="relative p-8 h-full flex flex-col">
          {/* Icon Section */}
          <div className="mb-6 relative">
            <div className="w-14 h-14 rounded-xl bg-sky-600/10 dark:bg-sky-600/20 flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-sky-600/20 dark:group-hover:bg-sky-600/30">
              <Icon
                size={28}
                className="text-sky-600 transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            {/* Animated glow behind icon */}
            <div className="absolute inset-0 rounded-xl bg-sky-600/30 blur-xl opacity-0 group-hover:opacity-60 transition-all duration-500 -z-10" />
          </div>

          {/* Content Section */}
          <div className="flex-grow">
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-sky-600">
              {title}
            </h3>

            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed transition-all duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-300">
              {description}
            </p>

            {/* Features List */}
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start text-gray-700 dark:text-gray-300 transform transition-all duration-300 group-hover:translate-x-1"
                  style={{
                    transitionDelay: `${index * 50}ms`,
                  }}
                >
                  <div className="flex-shrink-0 w-5 h-5 mt-0.5 mr-3 rounded-full bg-sky-600/10 dark:bg-sky-600/20 flex items-center justify-center transition-all duration-300 group-hover:bg-sky-600 group-hover:scale-110">
                    <Check className="w-3 h-3 text-sky-600 transition-colors duration-300 group-hover:text-white" />
                  </div>
                  <span className="text-sm leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Learn More Button */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between text-sky-600 font-medium transition-all duration-300 group-hover:translate-x-2">
              <span className="text-sm">Learn More</span>
              <svg
                className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Shimmer Effect on Hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
          <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
