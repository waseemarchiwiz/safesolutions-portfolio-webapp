import React, { useState } from "react";
import { motion } from "framer-motion";
import { Clock, User, Tag } from "lucide-react";
import ScrollToTop from "../../globals/ScrollToTop";

const BlogDetails = () => {
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const blogPost = {
    title: "Exploring the Future of Web Development",
    author: "Sarah Johnson",
    date: "December 4, 2024",
    category: "Technology",
    readTime: "5 min read",
    coverImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKimrjFWdSL-1d7EGY0excHnxtFU0AN29WNw&s",
    content: [
      "The landscape of web development continues to evolve at an unprecedented pace. As we dive deeper into the era of interactive and performant web applications, new technologies and frameworks are reshaping how we build digital experiences.",
      "Modern web development is no longer just about creating static pages. It's about crafting dynamic, responsive, and engaging interfaces that provide seamless user interactions.",
      "From advanced state management to serverless architectures, the possibilities seem endless.",
    ],
    tags: ["React", "Framer Motion", "Tailwind CSS", "Web Development"],
  };

  return (
    <div className="bg-gray-100   flex flex-col">
      {/* Header Section */}
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

      {/* Blog Content Section */}
      <div className="flex-grow bg-white dark:bg-[#18181B] py-10 px-6">
        <div className="max-w-4xl mx-auto bg-white dark:bg-[#18181B]     p-6">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 dark:bg-[#18181B] "
          >
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              {blogPost.title}
            </h1>
            <div className="flex items-center space-x-4 text-gray-600 dark:text-white mb-6">
              <div className="flex items-center space-x-2">
                <User size={20} />
                <span className="dark:text-white">{blogPost.author}</span>
              </div>
              <div className="flex items-center space-x-2 dark:text-white">
                <Clock size={20} />
                <span className="dark:text-white">{blogPost.date}</span>
              </div>
              <div className="flex items-center space-x-2 dark:text-white">
                <Tag size={20} />
                <span>{blogPost.category}</span>
              </div>
            </div>
            <motion.div
              onClick={() => setIsImageExpanded(!isImageExpanded)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="cursor-pointer"
            >
              <motion.img
                src={blogPost.coverImage}
                alt="Blog Cover"
                initial={{ borderRadius: "10px" }}
                animate={{
                  scale: isImageExpanded ? 1.1 : 1,
                  borderRadius: isImageExpanded ? "20px" : "10px",
                }}
                className="w-full h-96 object-cover shadow-md dark:text-white"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {blogPost.content.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.2 }}
                className="text-lg text-gray-700  dark:text-white mb-4 leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 flex flex-wrap gap-2 dark:text-white"
          >
            {blogPost.tags.map((tag) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.1 }}
                className="bg-blue-100  text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                #{tag}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
};

export default BlogDetails;
