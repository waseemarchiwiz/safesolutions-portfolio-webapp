import React, { useState } from "react";
import { motion } from "framer-motion";
import CustomButton from "@/globals/CustomButton";
import { useNavigate } from "react-router-dom";
import ScrollToTop from "@/globals/ScrollToTop";
import { blogPosts } from "../../lib/Blog";
import hero from "../../assets/hero.png";


const BlogPage = () => {
  const navigate = useNavigate();
  console.log(blogPosts, "blog posts");

  const categories = ["All", "Architecture", "Construction", "Safety"];

  // State for pagination and category filtering
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const postsPerPage = 3;

  // Filtered blog posts based on category
  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const selectedPosts = filteredPosts.slice(
    startIndex,
    startIndex + postsPerPage
  );
  // Change category handler
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };
  // Change page handler
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const latestNews = blogPosts
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return (
    <div className="bg-[#FFFFFF] dark:bg-black ">
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
      <div className="container bg-[#FFFFFF] dark:bg-black  mx-auto w-[75%] grid grid-cols-1 lg:grid-cols-3 gap-16 mt-20">
        {/* Main Content */}
        <div className="lg:col-span-2 bg-[#FFFFFF] dark:bg-black ">
          {/* Blog Posts */}
          {selectedPosts.map((post, index) => (
            <div
              key={post?.id}
              className="bg-[#FFFFFF] dark:bg-black  shadow-md  overflow-hidden mb-6"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-[30em] object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {post.article.title}
                </h2>
                <div className="text-gray-500 text-sm mt-2 dark:text-white">
                  <span>{post.date}</span> | <span>{post.category}</span>
                </div>
                <p className="text-gray-600 mt-4 dark:text-white">
                  {post.article.introduction.summary}
                </p>

                <CustomButton
                  label="Read More"
                  className="mt-4"
                  handleClick={() => navigate(`/blog/${post.id}`)}
                />
              </div>
            </div>
          ))}

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`mx-1 px-4 py-2 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside
          style={{
            marginTop: "5px",
          }}
        >
          {/* <div class="flex lg:ml-auto max-lg:w-full">
            <div class="flex xl:w-80 max-xl:w-full bg-gray-100 dark:bg-[#18181b] dark:text-white px-4 py-3 rounded outline outline-transparent border focus-within:border-blue-600 focus-within:bg-transparent transition-all">
              <input
                type="text"
                placeholder="Search something..."
                class="w-full text-sm bg-transparent rounded outline-none pr-2"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 192.904 192.904"
                width="16px"
                class="cursor-pointer fill-gray-400 hover:fill-[#4f46e5]"
              >
                <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
              </svg>
            </div>
          </div> */}

          {/* Categories */}
          <div className="bg-[#FFFFFF] dark:bg-black dark:text-white    w-[70%]  mb-6   ml-1">
            <h3 className="text-lg hover:text-[#4f46e5] dark:text-white tracking-wide  mb-4">
              Categories
            </h3>
            <ul className="space-y-1">
              {categories.map((cat, idx) => (
                <div className="flex flex-row w-full justify-between border-b border-s-gray-100">
                  <li
                    key={idx}
                    className={`cursor-pointer  py-3 dark:text-white   text-gray-500 hover:text-[#4f46e5] ${
                      selectedCategory === cat ? "" : ""
                    }`}
                    onClick={() => handleCategoryChange(cat)}
                  >
                    {cat}
                  </li>
                  {/* <h3 className="  text-gray-500 dark:text-white hover:text-[#216eb5]  mb-4">
                   
                  </h3> */}
                </div>
              ))}
            </ul>
          </div>

          {/* Latest News */}
          <div className="bg-[#FFFFFF] dark:bg-black   ml-1  rounded-md mb-6">
            <h3 className="text-xl hover:text-[#4f46e5]  tracking-wide   dark:text-white  mb-4">
              Latest News
            </h3>
            {latestNews.map((news, idx) => (
              <div className="flex gap-4 mt-5">
                <div>
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-[150px] h-[90px] object-cover rounded-md"
                  />
                </div>
                <div key={idx} className="mb-4 ">
                  <h4 className="text-[#4f46e5] dark:text-white hover:underline">
                    {news.title}
                  </h4>
                  <span className="text-sm text-gray-500 dark:text-white">
                    {news.date}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="bg-[#FFFFFF] dark:bg-black   p-4 rounded-md">
            {/* <h3 className="text-lg font-semibold dark:text-white mb-4">
              Tags Cloud
            </h3> */}
            {/* <div className="flex flex-wrap gap-2 ">
              {["Buildings", "Architectural", "Interior", "Construction"].map(
                (tag, idx) => (
                  <span
                    key={idx}
                    className="text-sm bg-gray-200 dark:bg-[#18181b]  hover:bg-[#4f46e5] px-3 py-1 rounded cursor-pointer hover:text-white  "
                  >
                    {tag}
                  </span>
                )
              )}
            </div> */}
          </div>
        </aside>
      </div>
      <ScrollToTop />
    </div>
  );
};

export default BlogPage;
