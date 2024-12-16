import {
  FaBriefcase,
  FaClipboardList,
  FaUsers,
  FaFileAlt,
  FaPhoneAlt,
  FaBoxOpen,
  FaBuilding,
  FaCog,
  FaCheck,
} from "react-icons/fa";

const backofficeServices = [
  {
    icon: <FaBriefcase className="w-12 h-12 text-blue-500" />,
    title: "Administrative Support",
    description:
      "Efficiently manage daily operations and administrative tasks to keep your business running smoothly.",
    features: [
      "Document Management",
      "Meeting Scheduling",
      "Data Entry & Organization",
    ],
  },
  {
    icon: <FaClipboardList className="w-12 h-12 text-purple-500" />,
    title: "Process Optimization",
    description:
      "Streamline your backoffice workflows for maximum productivity and minimal errors.",
    features: [
      "Workflow Analysis",
      "Automation Solutions",
      "Resource Planning",
    ],
  },
  {
    icon: <FaUsers className="w-12 h-12 text-green-500" />,
    title: "HR Assistance",
    description:
      "Support for HR activities, including recruitment, payroll, and employee engagement initiatives.",
    features: ["Recruitment Support", "Payroll Management", "Employee Records"],
  },
  {
    icon: <FaFileAlt className="w-12 h-12 text-red-500" />,
    title: "Compliance Management",
    description:
      "Ensure your operations comply with industry standards and regulatory requirements.",
    features: ["Policy Updates", "Audits & Reporting", "Risk Mitigation"],
  },
  {
    icon: <FaPhoneAlt className="w-12 h-12 text-yellow-500" />,
    title: "Customer Support",
    description:
      "Deliver exceptional service by handling customer inquiries, complaints, and feedback effectively.",
    features: ["Call Handling", "Email Support", "Customer Escalation"],
  },
  {
    icon: <FaBoxOpen className="w-12 h-12 text-orange-500" />,
    title: "Inventory Management",
    description:
      "Keep track of your assets and supplies with efficient inventory management solutions.",
    features: ["Stock Monitoring", "Reorder Alerts", "Record Keeping"],
  },
  {
    icon: <FaBuilding className="w-12 h-12 text-teal-500" />,
    title: "Facility Management",
    description:
      "Handle maintenance and operational aspects of your workplace for a better working environment.",
    features: [
      "Maintenance Scheduling",
      "Vendor Coordination",
      "Facility Audits",
    ],
  },
  {
    icon: <FaCog className="w-12 h-12 text-cyan-500" />,
    title: "Technical Support",
    description:
      "Provide technical assistance to ensure uninterrupted functionality of backoffice systems.",
    features: [
      "Software Troubleshooting",
      "IT Asset Management",
      "System Updates",
    ],
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

const BackofficeServicesTab = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-[#18181B] py-16 px-4">
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          Backoffice Support Services
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Comprehensive backoffice solutions to streamline operations and
          support your business growth.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {backofficeServices.map((service, index) => (
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
        <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors font-semibold">
          Get Started
        </button>
      </div>
    </div>
  </div>
);

export default BackofficeServicesTab;
