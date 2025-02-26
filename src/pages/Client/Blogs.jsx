import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import loaderAnimation from "../../assets/lottie/loadanimate.json";
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "@/globals/CustomButton";
import ScrollToTop from "@/globals/ScrollToTop";
import SEOComponent from "@/components/SEOComponent";

const Blogs = () => {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true); // Loader state
  const navigate = useNavigate();
  const userUrl = import.meta.env.VITE_USER_URL;
  const api_token = import.meta.env.VITE_API_TOKEN;

  const fetchBlogs = async () => {
    try {
      setLoading(true); // Set loading to true before fetching
      const response = await axios.get(`${userUrl}/get/blog`, {
        headers: {
          api_token: api_token,
        },
      });
      if (response?.data.succes === true && response?.data.blogs.length > 0) {
        setBlogData(response?.data?.blogs);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      <SEOComponent
        title="Insights and Ideas to Elevate Your Blogging Journey | blogs"
        description="Insights and Ideas to Elevate Your Blogging Journey"
        keywords="our blogs,latest blogs"
      />
      <div className="  min-h-[85vh] flex items-center py-14 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
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

        {/* Enhanced glowing orbs */}
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

              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  <span className="text-white">
                    Insights and Ideas to Elevate Your{" "}
                  </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500">
                    Blogging Journey
                  </span>
                </h1>

                <p className="text-xl text-white/80 max-w-xl">
                  Join our team and be part of an inspiring journey. Explore
                  opportunities to grow, learn, and make an impact.
                </p>
              </div>
            </motion.div>

            {/* Right content - Carousel */}
          </div>
        </div>

        {/* Animations */}
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

      {/* Blog Section */}
      <div className="bg-white dark:bg-black">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 dark:bg-purple-500/20 border border-purple-500/20 mt-10">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-purple-600 dark:text-purple-400 text-sm font-medium">
              Latest Blogs
            </span>
          </div>
        </div>
        <div className="max-w-6xl mx-auto p-4">
          {loading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <Lottie
                animationData={loaderAnimation}
                loop={true}
                style={{ width: "50px", height: "50px" }}
              />
            </div>
          ) : blogData.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 max-lg:max-w-3xl max-md:max-w-md mx-auto">
                {blogData.map((blog) => (
                  <div
                    key={blog.slug}
                    className="bg-white cursor-pointer rounded-lg overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative group"
                  >
                    <img
                      src={`https://safesolution-portfolio-backend-h6a6esaxema6g4hm.eastus-01.azurewebsites.net/${blog.images[0].image}`}
                      alt={blog.images[0].image}
                      className="w-full h-96 object-cover"
                    />
                    <div className="p-6 absolute bottom-0 left-0 right-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 opacity-90">
                      <span className="text-sm block text-white mb-2">
                        {new Date(blog.createdAt).toISOString().split("T")[0]}
                      </span>
                      <h3 className="text-xl font-bold text-white">
                        {blog.shortDescription}
                      </h3>
                      <div className="h-0 overflow-hidden group-hover:h-16 group-hover:mt-4 transition-all duration-300">
                        <CustomButton
                          label="Read More"
                          className="mt-4"
                          handleClick={() => navigate(`/blog/${blog.slug}`)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center min-h-[300px]">
              <p className="text-lg font-semibold text-gray-500">
                Nothing to show
              </p>
            </div>
          )}
        </div>
      </div>

      <ScrollToTop />
    </div>
  );
};

export default Blogs;
