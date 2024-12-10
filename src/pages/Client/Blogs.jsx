import React, { useState } from "react";
import { motion } from "framer-motion";
import CustomButton from "@/globals/CustomButton";
import { useNavigate } from "react-router-dom";

const BlogPage = () => {
  const navigate = useNavigate();
  const blogPosts = [
    {
      id: 1,
      title: "Best Treehouse Plans",
      date: "2024-12-01",

      category: "Architecture",
      description:
        "Integrate and build sustainable homes with our new plans. Explore modern techniques for eco-friendly and innovative structures.",
      image:
        "https://themes247.net/html5/construction-template/demo/assets/img/news/1.jpg",
    },
    {
      id: 2,
      title: "The Future of Buildings",
      date: "2024-12-05",

      category: "Construction",
      description:
        "A look into the innovations shaping the future of construction and sustainable development for buildings.",
      image:
        "https://themes247.net/html5/construction-template/demo/assets/img/news/2.jpg",
    },
    {
      id: 3,
      title: "Construction Safety Tips",
      date: "2024-12-03",

      category: "Safety",
      description:
        "Learn essential safety tips to ensure a secure working environment for construction projects.",
      image:
        "https://themes247.net/html5/construction-template/demo/assets/img/news/3.jpg",
    },
    {
      id: 4,
      title: "Modern Office Designs",
      date: "2024-12-02",

      category: "Architecture",
      description:
        "Explore modern office designs that boost productivity and promote sustainability in the workplace.",
      image: "https://via.placeholder.com/600x400",
    },
    {
      id: 5,
      title: "Green Energy Construction",
      date: "2024-12-07",

      category: "EcoBuilding",
      description:
        "Harness green energy for sustainable construction projects. Learn about solar and wind energy applications.",
      image: "https://via.placeholder.com/600x400",
    },
  ];

  const categories = [
    "All",
    "Architecture",
    "Construction",
    "Safety",
    "EcoBuilding",
  ];

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
    <div className="bg-gray-100 py-8 px-4">
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
      <div className="container  mx-auto w-[70%] grid grid-cols-1 lg:grid-cols-3 gap-8 mt-20">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Category Filter */}
          <div className="mb-6">
            <label className="font-semibold text-gray-700 mr-2">
              Category:
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="border w-52 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Blog Posts */}
          {selectedPosts.map((post, index) => (
            <div
              key={post?.id}
              className="bg-white shadow-md  overflow-hidden mb-6"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-[30em] object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  {post.title}
                </h2>
                <div className="text-gray-500 text-sm mt-2">
                  <span>{post.date}</span> | <span>{post.category}</span>
                </div>
                <p className="text-gray-600 mt-4">{post.description}</p>

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
            marginTop: "70px",
          }}
        >
          <div class="flex lg:ml-auto max-lg:w-full">
            <div class="flex xl:w-80 max-xl:w-full bg-gray-100 px-4 py-3 rounded outline outline-transparent border focus-within:border-blue-600 focus-within:bg-transparent transition-all">
              <input
                type="text"
                placeholder="Search something..."
                class="w-full text-sm bg-transparent rounded outline-none pr-2"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 192.904 192.904"
                width="16px"
                class="cursor-pointer fill-gray-400"
              >
                <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
              </svg>
            </div>
          </div>

          {/* Categories */}
          <div className="bg-white shadow-md p-4 rounded-md mb-6">
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((cat, idx) => (
                <li
                  key={idx}
                  className={`cursor-pointer text-blue-600 hover:underline ${
                    selectedCategory === cat ? "font-bold" : ""
                  }`}
                  onClick={() => handleCategoryChange(cat)}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </div>

          {/* Latest News */}
          <div className="bg-white shadow-md p-4 rounded-md mb-6">
            <h3 className="text-lg font-semibold mb-4">Latest News</h3>
            {latestNews.map((news, idx) => (
              <div key={idx} className="mb-4">
                <h4 className="text-blue-600 hover:underline">{news.title}</h4>
                <span className="text-sm text-gray-500">{news.date}</span>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="bg-white shadow-md p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-4">Tags Cloud</h3>
            <div className="flex flex-wrap gap-2">
              {["Buildings", "Architectural", "Interior", "Construction"].map(
                (tag, idx) => (
                  <span
                    key={idx}
                    className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogPage;
