import React, { useState, useEffect } from "react";
import { GiArtificialIntelligence } from "react-icons/gi";
import { HoverEffect } from "../ui/card-hover-effect";
import CustomButton from "../../globals/CustomButton";
import { motion } from "framer-motion";

const ServicesComponent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative overflow-hidden bg-[#FFFFFF] dark:bg-black">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 py-24  ">
        <div className="    mx-auto">
          {/* Header section */}
          <div className="space-y-6 text-center mb-16">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 dark:bg-purple-500/20 border border-purple-500/20">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-purple-600 dark:text-white text-sm font-medium">
                Our Services
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white">
              Transforming Ideas into
              <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-blue-500 to-purple-800 bg-clip-text text-transparent">
                Digital Reality
              </span>
            </h2>

            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
              Our services include Medical Billing and Coding, Web Development
              and Cloud Services, BIM services and Visualization services, and
              FINTECH. We provide robust, proactive and effective management of
              all problems related to our services to help our clients make the
              most of their investments.
            </p>
          </div>

          {/* Services grid with enhanced hover effect */}
          <div className="relative">
            {/* Decorative grid lines */}
            <div className="absolute inset-0 grid grid-cols-3 gap-4 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="border-r border-t border-slate-200 dark:border-slate-800"
                />
              ))}
            </div>

            <div className="relative">
              <HoverEffect
                items={projects.map((project) => ({
                  ...project,
                  className:
                    "bg-white dark:bg-zinc-800 shadow-xl dark:shadow-zinc-700/20 border border-slate-200 dark:border-slate-700/50 rounded-xl transition-all duration-300",
                  icon: (
                    <GiArtificialIntelligence className="w-10 h-10 text-purple-500 dark:text-purple-400" />
                  ),
                }))}
              />
            </div>
          </div>

          {/* CTA section */}
          <div className="mt-16 text-center">
            <div className="inline-flex flex-col items-center">
              <CustomButton
                label="Learn More"
                className="relative group"
                to="/services"
              />
              <div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                Discover our full range of services
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent" />
    </div>
  );
};

export default ServicesComponent;

// Updated projects data with enhanced descriptions
export const projects = [
  {
    title: "Artificial Intelligence",
    description:
      "Leverage cutting-edge AI technologies to automate processes, gain insights, and create intelligent solutions that drive business growth.",
    link: "https://stripe.com",
  },
  {
    title: "Web Development",
    description:
      "Create stunning, responsive, and high-performance web applications using modern frameworks and best practices in development.",
    link: "https://netflix.com",
  },
  {
    title: "ERP Management",
    description:
      "Streamline your business operations with comprehensive ERP solutions that integrate all aspects of your enterprise.",
    link: "https://google.com",
  },
  {
    title: "DevOps",
    description:
      "Implement efficient CI/CD pipelines and automation tools to accelerate development and ensure reliable deployments.",
    link: "https://meta.com",
  },
  {
    title: "IoT App Development",
    description:
      "Build connected solutions that bridge the physical and digital worlds, enabling smart automation and data-driven decisions.",
    link: "https://amazon.com",
  },
  {
    title: "AR/VR Development",
    description:
      "Create immersive experiences and virtual environments that revolutionize training, entertainment, and customer engagement.",
    link: "https://microsoft.com",
  },
];
