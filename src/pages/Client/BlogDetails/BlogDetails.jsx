import React from "react";
import { motion } from "framer-motion";
import CustomButton from "@/globals/CustomButton";
import { useNavigate } from "react-router-dom";

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
    <div className="bg-gray-100 dark:bg-[#18181b]">
      {/* Hero Section */}
      <div
        style={{
          backgroundImage:
            "url('https://www.cedar.com/wp-content/uploads/2022/06/About-Us-Images-052022-05.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "60vh",
        }}
        className="h-60 flex items-center justify-center"
      >
        <motion.div
          className="text-center text-white px-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold mb-4 text-indigo-500">
            Our<span className="text-white"> Blogs</span>
          </h1>
          <p className="text-white text-lg mt-10">
            Join our team and be part of an inspiring journey. Explore
            opportunities to grow, learn, and make an impact.
          </p>
        </motion.div>
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
          <p className="text-black text-lg  ">
            Published on: {blogData.date} | Category: {blogData.category}
          </p>
          <h2 className="text-black text-2xl font-bold mt-5">
            {blogData.title}
          </h2>
          <p className="text-black text-lg mt-4">{blogData.description}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
