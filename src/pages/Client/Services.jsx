import React from "react";
import {
  Check,
  Rocket,
  CodeIcon,
  PaletteIcon,
  ShieldCheckIcon,
  DatabaseIcon,
  ChartPieIcon,
  ServerIcon,
  GlobeIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import ScrollToTop from "../../globals/ScrollToTop";



const services = [
  {
    icon: <CodeIcon className="w-12 h-12 text-blue-500" />,
    title: "Web Development",
    description:
      "Custom web solutions tailored to your business needs, using modern technologies and responsive design.",
    features: [
      "Full-stack Development",
      "Responsive Design",
      "Performance Optimization",
    ],
  },
  {
    icon: <PaletteIcon className="w-12 h-12 text-purple-500" />,
    title: "UI/UX Design",
    description:
      "Creating intuitive and engaging user interfaces that enhance user experience and drive conversion.",
    features: ["User Research", "Wireframing", "Interactive Prototypes"],
  },
  {
    icon: <Rocket className="w-12 h-12 text-green-500" />,
    title: "Digital Strategy",
    description:
      "Comprehensive digital transformation strategies to help your business grow and adapt in the digital landscape.",
    features: [
      "Business Analysis",
      "Technology Consulting",
      "Digital Roadmapping",
    ],
  },
  {
    icon: <ShieldCheckIcon className="w-12 h-12 text-red-500" />,
    title: "Cybersecurity Services",
    description:
      "Protect your digital assets with advanced security solutions and risk management strategies.",
    features: [
      "Risk Assessment",
      "Data Protection",
      "Threat Monitoring & Response",
    ],
  },
  {
    icon: <DatabaseIcon className="w-12 h-12 text-yellow-500" />,
    title: "Cloud Solutions",
    description:
      "Scalable and secure cloud infrastructure to streamline your business operations.",
    features: ["Cloud Migration", "Serverless Computing", "Data Backups"],
  },

  {
    icon: <ChartPieIcon className="w-12 h-12 text-orange-500" />,
    title: "Data Analytics",
    description:
      "Harness the power of data with actionable insights and advanced analytics tools.",
    features: ["Data Visualization", "Predictive Analytics", "Big Data"],
  },
  {
    icon: <ServerIcon className="w-12 h-12 text-teal-500" />,
    title: "DevOps Services",
    description:
      "Accelerate your software development lifecycle with continuous integration and delivery solutions.",
    features: ["CI/CD Pipeline", "Infrastructure Automation", "Monitoring"],
  },

  {
    icon: <GlobeIcon className="w-12 h-12 text-cyan-500" />,
    title: "SEO & Digital Marketing",
    description:
      "Increase your online visibility and drive organic traffic with proven SEO and marketing strategies.",
    features: [
      "SEO Optimization",
      "Social Media Marketing",
      "Content Creation",
    ],
  },
];

const ServiceCard = ({ icon, title, description, features }) => (
  <div className="bg-white dark:bg-[#18181B] p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-3 dark:text-white text-gray-800">
      {title}
    </h3>
    <p className="text-gray-600 dark:text-white mb-4">{description}</p>
    <ul className="space-y-2">
      {features.map((feature, index) => (
        <li
          key={index}
          className="flex items-center text-gray-700 dark:text-white"
        >
          <Check className="w-5 h-5 mr-2 text-green-500 dark:text-white" />{" "}
          {feature}
        </li>
      ))}
    </ul>
  </div>
);
const Services = () => {
  return (
    <div>
      <div
        style={{
          backgroundImage:
            "url('https://www.cedar.com/wp-content/uploads/2022/06/About-Us-Images-052022-05.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "60vh",
        }}
      >
        <motion.div
          className="container mx-auto px-6 py-16 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold mb-4 text-indigo-500 mt-40">
            Our <span className="text-white">Services</span>
          </h1>
          <p className="text-white text-lg mt-10">
            Join our team and be part of an inspiring journey. Explore
            opportunities to grow, learn, and make an impact.
          </p>
        </motion.div>
      </div>
      <div className="min-h-screen bg-gray-50  dark:bg-[#18181B] py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              Our Services
            </h1>
            <p className="text-xl text-gray-600 dark:text-white max-w-2xl mx-auto">
              We provide cutting-edge digital solutions to help your business
              thrive in the modern world.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 dark:bg-[#18181B]">
            {services.map((service, index) => (
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
      <ScrollToTop />
    </div>
  );
};
export default Services;
