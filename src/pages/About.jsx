import React from "react";
import { motion } from "framer-motion";
import about from '../../src/assets/about.webp'
import ProjectsComponent from '../components/HomeComponents/ProjectsComponent'
import { Galley } from "../components/AboutComponents/Gallery";
import WhyChoose from "../components/HomeComponents/WhyChoose";
import BlogComponents from "../components/BlogComponents";
import Teams from "../components/Teams";

const About = () => {
  return (
    <div className="dark:bg-gray-800 dark:text-gray-200">
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
      <div className="flex flex-row justify-center items-center py-16">
        <div className="flex flex-row justify-center items-center gap-10 w-[50%] h-auto   ">
          {/* Card 1 */}
          <motion.div
            className="h-96 w-[60%] bg-gray-700 text-white flex   justify-center "
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }} // Trigger animation when 20% of the element is visible
            transition={{ duration: 0.8 }}
            style={{
              backgroundImage: `url(${about})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
           
            }}
          >
            
          </motion.div>

          {/* Card 2 */}
          <motion.div
            className="h-96 w-[40%]  text-white flex     "
            initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}// Add delay for staggered effect
          >
            <p className="text-black text-lg   dark:text-gray-200">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Laboriosam laborum facere quibusdam, ratione corrupti et officia
              totam perferendis distinctio modi animi, aliquid impedit
              perspiciatis vero eaque? Laboriosam culpa minima atque!
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Laboriosam laborum facere quibusdam, ratione corrupti et officia
              totam perferendis distinctio modi animi, aliquid impedit
              perspiciatis vero eaque? Laboriosam culpa minima atque!Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Laboriosam laborum facere quibusdam, ratione corrupti et officia
              totam perferendis distinctio modi animi 
            </p>
          </motion.div>

        </div>
      </div>
      <ProjectsComponent />
      <Teams />
      <BlogComponents />

    </div>
  );
};

export default About;
