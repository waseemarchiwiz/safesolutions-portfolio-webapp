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
      <div className="relative h-[90vh] flex items-center py-14 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
        {/* Animated grid background */}
        <div
          className="absolute inset-0 overflow-hidden hidden sm:block"
          style={{
            backgroundImage: `linear-gradient(transparent 0%, transparent calc(100% - 1px), rgba(255, 255, 255, 0.1) calc(100% - 1px)),
                         linear-gradient(90deg, transparent 0%, transparent calc(100% - 1px), rgba(255, 255, 255, 0.1) calc(100% - 1px))`,
            backgroundSize: "50px 50px",
            opacity: 0.2,
          }}
        />

        {/* Enhanced glowing orbs with better blend modes */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-[128px] mix-blend-screen hidden sm:block" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-[128px] mix-blend-screen hidden sm:block" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px] mix-blend-screen hidden sm:block" />
        <div className="relative w-full container mx-auto px-4 mt-10 sm:px-6 lg:px-8 py-20">
          {/* Tech decorations */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-px h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: 0.1,
                  animation: `moveUpDown ${
                    5 + Math.random() * 5
                  }s linear infinite`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-white/90">Our Blogs</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="text-white">
                  Insights and Ideas to Elevate Your{" "}
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                  Blogging Journey
                </span>
              </h1>

              <p className="text-xl text-white/80 max-w-xl">
                Join our team and be part of an inspiring journey. Explore
                opportunities to grow, learn, and make an impact.
              </p>

              {/* Service cards */}
            </motion.div>

            {/* Right content - 3D Grid */}
          </div>
        </div>

        {/* Add some CSS animations */}
        <style jsx>{`
          @keyframes moveUpDown {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(100px);
            }
          }
          @keyframes float {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-20px);
            }
          }
        `}</style>
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
            {blogData.article.title}
          </h2>
          <p className="text-black dark:text-white text-lg mt-4">
            {blogData.article.introduction.summary}
          </p>
        </div>
        {/* Blog Body */}
        <div>
          <h1 className="text-[26px]">{blogData.article.sec1.title}</h1>
          <h1>{blogData.article.sec1.content}</h1>
        </div>
        <div>
          <h1 className="text-[26px]">{blogData.article.sec2.title}</h1>
          {blogData.article.sec2.services.map((item, index) => (
            <div key={index}>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
        <div>
          <h1 className="text-[26px]">{blogData.article.sec3.title}</h1>
          {blogData.article.sec3.benefits.map((item, index) => (
            <div key={index}>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
        <div>
          <h1 className="text-[26px]">{blogData.article.sec4.title}</h1>
          {blogData.article.sec4.cases.map((item, index) => (
            <div key={index}>
              <h2>{item.location}</h2>
              <h2>{item.project}</h2>

              <p>{item.description}</p>
            </div>
          ))}
        </div>
        <div>
          <h1 className="text-[26px]">Conclusion</h1>
          <p>{blogData.article.conclusion}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
