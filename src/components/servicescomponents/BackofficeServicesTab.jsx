import CustomButton from "@/globals/CustomButton";
import {
  FaBriefcase,
  FaClipboardList,
  FaUsers,
  FaFileAlt,
  FaPhoneAlt,
  FaBoxOpen,
  FaBuilding,
  FaCog,
} from "react-icons/fa";
import ServiceCard from "./cards/service.card";

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
    link: "https://bactelemed.com/",
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
    link: "https://bactelemed.com/",
  },
  {
    icon: <FaUsers className="w-12 h-12 text-green-500" />,
    title: "HR Assistance",
    description:
      "Support for HR activities, including recruitment, payroll, and employee engagement initiatives.",
    features: ["Recruitment Support", "Payroll Management", "Employee Records"],
    link: "https://bactelemed.com/",
  },
  {
    icon: <FaFileAlt className="w-12 h-12 text-red-500" />,
    title: "Compliance Management",
    description:
      "Ensure your operations comply with industry standards and regulatory requirements.",
    features: ["Policy Updates", "Audits & Reporting", "Risk Mitigation"],
    link: "https://bactelemed.com/",
  },
  {
    icon: <FaPhoneAlt className="w-12 h-12 text-yellow-500" />,
    title: "Customer Support",
    description:
      "Deliver exceptional service by handling customer inquiries, complaints, and feedback effectively.",
    features: ["Call Handling", "Email Support", "Customer Escalation"],
    link: "https://bactelemed.com/",
  },
  {
    icon: <FaBoxOpen className="w-12 h-12 text-orange-500" />,
    title: "Inventory Management",
    description:
      "Keep track of your assets and supplies with efficient inventory management solutions.",
    features: ["Stock Monitoring", "Reorder Alerts", "Record Keeping"],
    link: "https://bactelemed.com/",
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
    link: "https://bactelemed.com/",
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
    link: "https://bactelemed.com/",
  },
];

const BackofficeServicesTab = () => (
  <div className="min-h-screen bg-[#FFFFFF] dark:bg-black py-16 px-4">
    <div className="container mx-auto">
      <div className="grid md:grid-cols-3 gap-8">
        {backofficeServices.map((service, index) => (
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
);

export default BackofficeServicesTab;
