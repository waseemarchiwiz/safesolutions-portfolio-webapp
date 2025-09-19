import { FileText, MessageCircle, Briefcase, UserCheck } from "lucide-react";
import React from "react";

const Statistics = ({
  title = "Blogs",
  value = 42,
  change = "5.2%",
  backgroundColor = "bg-gradient-to-br from-blue-50 to-blue-100",
  iconBackground = "bg-blue-100",
  textColor = "text-blue-600",
  icon = <FileText className="w-6 h-6" />,
  description = "Total Published Posts",
}) => {
  // Mapping of default icons and styles for different sections
  const sectionConfig = {
    Blogs: {
      icon: <FileText />,
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
      iconBg: "bg-blue-100",
      textColor: "text-blue-600",
      description: "Total Published Posts",
    },
    Testimonials: {
      icon: <MessageCircle />,
      bgColor: "bg-gradient-to-br from-purple-50 to-purple-100",
      iconBg: "bg-purple-100",
      textColor: "text-purple-600",
      description: "Client Feedback",
    },
    Services: {
      icon: <Briefcase />,
      bgColor: "bg-gradient-to-br from-green-50 to-green-100",
      iconBg: "bg-green-100",
      textColor: "text-green-600",
      description: "Offered Services",
    },
    Careers: {
      icon: <UserCheck />,
      bgColor: "bg-gradient-to-br from-orange-50 to-orange-100",
      iconBg: "bg-orange-100",
      textColor: "text-orange-600",
      description: "Open Positions",
    },
  };

  // Use section-specific config or fallback to provided props
  const config = sectionConfig[title] || {
    icon,
    bgColor: backgroundColor,
    iconBg: iconBackground,
    textColor,
    description,
  };

  return (
    <div
      className={`
        ${config.bgColor} 
        rounded-3xl 
        p-6 
        shadow-lg 
        border 
        border-opacity-20 
        border-gray-200 
        transform 
        transition-all 
        duration-300 
        hover:scale-[1.03] 
        hover:shadow-xl 
        relative 
        overflow-hidden 
      `}
    >
      {/* Subtle background effect */}
      <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/3 -translate-y-1/3">
        {React.cloneElement(config.icon, {
          className: "w-32 h-32 text-gray-200",
        })}
      </div>

      <div className="flex justify-between items-start mb-4 relative z-10">
        <div
          className={`
            ${config.iconBg} 
            ${config.textColor} 
            p-3.5 
            rounded-2xl 
            shadow-md
          `}
        >
          {React.cloneElement(config.icon, { className: "w-6 h-6" })}
        </div>
        <div
          className={`
            flex 
            items-center 
            ${config.textColor} 
            font-medium 
            bg-white 
            bg-opacity-50 
            px-2.5 
            py-1 
            rounded-full 
            shadow-sm
          `}
        >
          <span className="text-sm">+{change}</span>
        </div>
      </div>

      <div className="relative z-10">
        <h3
          className={`
            ${config.textColor} 
            opacity-70 
            text-sm 
            mb-1 
            uppercase 
            tracking-wider
          `}
        >
          {title}
        </h3>
        <div className="text-3xl font-bold text-gray-800 mb-1">{value}</div>
        <div
          className={`
            ${config.textColor} 
            text-xs 
            opacity-60
          `}
        >
          {config.description}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
