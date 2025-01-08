import React from "react";
import { motion } from "framer-motion";
import CustomButton from "@/globals/CustomButton";
import { useNavigate } from "react-router-dom";
import hero from "../../../assets/hero.png";
const BlogDetails = ({ data }) => {
  console.log(data);
  const navigate = useNavigate();

  // Fallback data if `data` is not provided
  const fallbackData = {
    id: 0,
    title: "Default Blog Title",
    date: "2025-01-01",
    category: "Default Category",
    description: "No description available.",
    image: "https://via.placeholder.com/150", // Placeholder image if `data.image` is not available
  };

  // Use the fallback data if `data` is not provided
  const blogData = data || fallbackData;

  return (
    <div className="bg-[#FFFFFF] dark:bg-black">
      {/* Hero Section */}
      <div className="relative h-[80vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${hero})`,
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
              <span className="text-white text-sm font-medium">Our Blogs</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">
                Insights and Ideas to Elevate Your{" "}
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                Blogging Journey
              </span>
            </h1>

            <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
              Join our team and be part of an inspiring journey. Explore
              opportunities to grow, learn, and make an impact.
            </p>

            {/* <button className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg text-white font-medium hover:opacity-90 transition-all">
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button> */}
          </motion.div>
        </div>
      </div>

      {/* Blog Details */}
      <div className="container mx-auto w-[55%]   p-6 grid grid-cols-1 gap-16 mt-2">
        {/* Blog Image */}
        <div
          style={{
            backgroundImage: `url(${blogData.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "500px",
          }}
          className="rounded-md"
        ></div>

        {/* Blog Content */}
        <div>
          <p className="text-black text-lg dark:text-white ">
            Published on: {blogData.date} | Category: {blogData.category}
          </p>
          <h2 className="text-black dark:text-white text-2xl font-bold mt-5">
            {blogData.title}
          </h2>
          <p className="text-black dark:text-white text-lg mt-4">
            {blogData.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
