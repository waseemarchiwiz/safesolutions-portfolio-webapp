import {
  FileText,
  MessageCircle,
  Briefcase,
  UserCheck,
  Users,
  Layers,
  HelpCircle,
  Mail,
} from "lucide-react";
import React from "react";

interface StatisticsTypes {
  title: string;
  value: number;
  change: string;
}

const Statistics = ({ title, value, change = "5.2%" }: StatisticsTypes) => {
  const sectionConfig: Record<string, any> = {
    Blogs: {
      icon: <FileText />,
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
      iconBg: "bg-blue-100",
      textColor: "text-blue-600",
      description: "Total Published Posts",
    },
    Careers: {
      icon: <UserCheck />,
      bgColor: "bg-gradient-to-br from-orange-50 to-orange-100",
      iconBg: "bg-orange-100",
      textColor: "text-orange-600",
      description: "Open Positions",
    },
    Testimonials: {
      icon: <MessageCircle />,
      bgColor: "bg-gradient-to-br from-purple-50 to-purple-100",
      iconBg: "bg-purple-100",
      textColor: "text-purple-600",
      description: "Client Feedback",
    },
    Teams: {
      icon: <Users />,
      bgColor: "bg-gradient-to-br from-teal-50 to-teal-100",
      iconBg: "bg-teal-100",
      textColor: "text-teal-600",
      description: "Team Members",
    },
    Services: {
      icon: <Briefcase />,
      bgColor: "bg-gradient-to-br from-green-50 to-green-100",
      iconBg: "bg-green-100",
      textColor: "text-green-600",
      description: "Our Offered Services",
    },
    Projects: {
      icon: <Layers />,
      bgColor: "bg-gradient-to-br from-pink-50 to-pink-100",
      iconBg: "bg-pink-100",
      textColor: "text-pink-600",
      description: "Completed Projects",
    },
    Companies: {
      icon: <HelpCircle />,
      bgColor: "bg-gradient-to-br from-yellow-50 to-yellow-100",
      iconBg: "bg-yellow-100",
      textColor: "text-yellow-600",
      description: "Frequently Asked Questions",
    },
    Queries: {
      icon: <Mail />,
      bgColor: "bg-gradient-to-br from-indigo-50 to-indigo-100",
      iconBg: "bg-indigo-100",
      textColor: "text-indigo-600",
      description: "Customer Messages",
    },
  };

  const config = sectionConfig?.[title];

  return (
    <div
      className={`
        ${config.bgColor} 
        rounded-3xl p-6 shadow-lg border border-opacity-20 
        transform transition-all duration-300 
        hover:scale-[1.03] hover:shadow-xl relative overflow-hidden
      `}
    >
      <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/3 -translate-y-1/3">
        {React.cloneElement(config.icon, {
          className: "w-32 h-32 text-gray-200",
        })}
      </div>

      <div className="flex justify-between items-start mb-4 relative z-10">
        <div
          className={`${config.iconBg} ${config.textColor} p-3.5 rounded-2xl shadow-md`}
        >
          {React.cloneElement(config.icon, { className: "w-6 h-6" })}
        </div>
        <div
          className={`${config.textColor} text-sm bg-white bg-opacity-50 px-2.5 py-1 rounded-full shadow-sm`}
        >
          +{change}
        </div>
      </div>

      <div className="relative z-10">
        <h3
          className={`${config.textColor} opacity-70 text-sm mb-1 uppercase tracking-wider`}
        >
          {title}
        </h3>
        <div className="text-3xl font-bold text-gray-600 mb-1">{value}</div>
        <div className={`${config.textColor} text-xs opacity-60`}>
          {config.description}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
