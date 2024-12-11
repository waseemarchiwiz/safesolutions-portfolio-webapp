import React, { useEffect } from "react";
import { motion } from "framer-motion";
import about from "../../assets/about.webp";
import ProjectsComponent from "../../components/HomeComponents/ProjectsComponent";
import { Galley } from "../../components/AboutComponents/Gallery";
import WhyChoose from "../../components/HomeComponents/WhyChoose";
import BlogComponents from "../../components/BlogComponents";
import Teams from "../../components/AboutComponents/Teams";
import ScrollToTop from "../../globals/ScrollToTop";
import PartnersSection from "@/components/AboutComponents/PartnersSection";

 
 
const About = () => {
  

  return (
    <div className="dark:bg-[#18181B] dark:text-gray-200">
      {/* Hero Section */}
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
            About <span className="text-white">Us</span>
          </h1>
          <p className="text-white text-lg mt-10">
            Learn who we are and why we excel in what we do.
          </p>
        </motion.div>
      </div>

      {/* Section 1: Our Story */}
      <motion.div
        className="container mx-auto px-6 py-16 text-center"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }} // Trigger animation when 30% of the element is visible
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-bold mb-4 text-indigo-500">
          Meet Safe Solution
        </h1>
        <p className="text-black text-lg mt-10 dark:text-gray-200">
          Safe Solutions Consultants specializes in delivering expert
          back-office solutions tailored to the unique needs of industries such
          as fintech, software development, architecture, and healthcare. By
          combining innovation with operational excellence, we provide scalable
          and efficient services to streamline financial processes, develop
          secure and cutting-edge applications, support architectural project
          management, and enhance healthcare systems with integrated and
          compliant solutions.
        </p>
      </motion.div>

      {/* Section 2: Animated Cards */}
      <div className="flex flex-col md:flex-row justify-center items-center py-16 gap-10 px-4">
        {/* Image Card */}
        <motion.div
          className="h-60 md:h-96 w-full md:w-[30%] bg-gray-700 text-white flex justify-center rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }} // Trigger animation when 20% of the element is visible
          transition={{ duration: 0.8 }}
          style={{
            backgroundImage: `url(${about})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></motion.div>

        {/* Text Card */}
        <motion.div
          className="h-auto w-full md:w-[40%] text-white flex items-center justify-center p-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm md:text-lg text-black dark:text-gray-200 leading-relaxed">
            Safe Solutions Consultants is a team of expert developers and IT
            consultants dedicated to delivering innovative and customized IT
            solutions. With a focus on empowering businesses, we offer a diverse
            range of software development and IT services designed to help our
            clients achieve their objectives efficiently and effectively. Our
            mission is to provide cutting-edge, reliable, and cost-effective IT
            solutions tailored to meet the unique needs of our clients. We
            envision becoming a global leader in IT and software development
            services, consistently driving excellence and innovation. At the
            core of our operations are the values we hold dear: Innovation,
            Quality, Integrity, and Customer Satisfaction.
          </p>
        </motion.div>
      </div>

      <ProjectsComponent />
      <Teams />
      <PartnersSection />
      <ScrollToTop />
     
    </div>
  );
};

export default About;

