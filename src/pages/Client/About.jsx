import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Users,
  Building,
  Gitlab,
} from "lucide-react";
import ProjectsComponent from "@/components/HomeComponents/ProjectsComponent";
import Teams from "@/components/AboutComponents/Teams";
import PartnersSection from "@/components/AboutComponents/PartnersSection";
import ScrollToTop from "@/globals/ScrollToTop";
import { useNavigate } from "react-router-dom";
import CustomButton from "@/globals/CustomButton";

const About = () => {
  const navigate = useNavigate();
  const achievements = [
    {
      number: "10+",
      label: "Years Experience",
      icon: <Building className="w-6 h-6" />,
    },
    {
      number: "500+",
      label: "Projects Completed",
      icon: <Gitlab className="w-6 h-6" />,
    },
    {
      number: "200+",
      label: "Happy Clients",
      icon: <Users className="w-6 h-6" />,
    },
  ];

  const features = [
    "Expert development team",
    "Innovative solutions",
    "24/7 Support",
    "Custom-tailored approach",
  ];

  return (
    <div className="dark:bg-[#18181B] dark:text-white">
      {/* Enhanced Hero Section */}
      <div className="relative h-[80vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://www.cedar.com/wp-content/uploads/2022/06/About-Us-Images-052022-05.png')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-blue-900 " />
        </div>

        <div className="relative h-full container mx-auto px-6 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-white text-sm font-medium">
                Welcome to Safe Solution
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">Transforming Ideas into </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
                Digital Reality
              </span>
            </h1>

            <p className="text-lg text-gray-200 mb-8 max-w-xl">
              Learn who we are and why we excel in delivering innovative
              solutions that drive business growth and digital transformation.
            </p>

            <CustomButton
              onClick={() => navigate("/contact")}
              // className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg text-white font-medium hover:opacity-90 transition-all"
            >
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </CustomButton>
          </motion.div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="bg-white dark:bg-[#1F1F23] py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center p-8 rounded-2xl bg-gray-50 dark:bg-[#27272A] hover:shadow-xl transition-all"
              >
                <div className="text-purple-500 mb-4">{item.icon}</div>
                <h3 className="text-4xl font-bold mb-2">{item.number}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Our Story Section */}
      <div className="container mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-purple-500/10 dark:bg-purple-500/20 border border-purple-500/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-purple-600 dark:text-purple-400 text-sm font-medium">
                Our Story
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6 dark:text-white">
              Leading the Way in Digital Innovation
            </h2>

            <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Safe Solutions Consultants specializes in delivering expert
              back-office solutions tailored to the unique needs of industries
              such as fintech, software development, architecture, and
              healthcare.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5 text-purple-500" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden">
              <img
                src="https://img.freepik.com/free-photo/top-view-unrecognizable-hacker-performing-cyberattack-night_1098-18706.jpg?semt=ais_hybrid"
                alt="About Us"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent" />
            </div>

            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute -bottom-6 -left-6 bg-white dark:bg-[#27272A] p-6 rounded-xl shadow-xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">200+</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Satisfied Clients
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Keep your existing components */}
      <ProjectsComponent />
      <Teams />
      <PartnersSection />
      <ScrollToTop />
    </div>
  );
};

export default About;
