import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, Code2, Cpu, Globe2 } from "lucide-react";
import axios from "axios";
import ScrollToTop from "@/globals/ScrollToTop";

const BlogsDetails = () => {
  const { slug } = useParams();
  const [blogData, setBlog] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const userUrl = import.meta.env.VITE_USER_URL;
  const api_token = import.meta.env.VITE_API_TOKEN;

  const fetchBlogDetails = async () => {
    try {
      const response = await axios.get(`${userUrl}/get/blog/detail/${slug}`, {
        headers: {
          api_token: api_token,
        },
      });

      setBlog(response?.data.blog);

      // console.log(response, "response");
    } catch (error) {
      console.error("Error fetching blog details:", error);
    }
  };

  useEffect(() => {
    fetchBlogDetails();
  }, []);

  console.log(blogData, "this is blog details");
  const images = blogData?.images;
  console.log(images, "images");

  // const { title, description, shortDescription, category, tags, images } = blogData;

  // Sample carousel data - replace with actual blog images
  const slides = [
    {
      image: "/api/placeholder/800/400",
      title: "Getting Started with Web Development",
      shortDescription: "Begin your journey into the world of web development",
      description:
        "Learn the fundamentals of HTML, CSS, and JavaScript to build modern web applications.",
    },
    {
      image: "/api/placeholder/800/400",
      title: "Mastering React Hooks",
      shortDescription: "Deep dive into React's powerful hooks system",
      description:
        "Understand how to use useState, useEffect, and custom hooks effectively.",
    },
    {
      image: "/api/placeholder/800/400",
      title: "Modern CSS Techniques",
      shortDescription: "Explore advanced CSS features",
      description:
        "Master modern CSS features including Grid, Flexbox, and CSS Variables.",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <>
      {/* Hero Section */}
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
                <span className="text-white/90">Join Our Team</span>
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

      <div className="w-full bg-white dark:bg-black py-16">
        <div className="container mx-auto px-4">
          <div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-2xl">
              {images?.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute w-full h-full transition-all duration-500 ease-in-out transform ${
                    index === currentSlide
                      ? "translate-x-0"
                      : "translate-x-full"
                  }`}
                  style={{ left: index === currentSlide ? "0%" : "100%" }}
                >
                  <img
                    // src={slide.image}
                    src={`https://safesolution-portfolio-backend-prod-h5h3g5fxa0bgfrcj.eastus-01.azurewebsites.net/${slide.image}`}
                    alt={slide.title}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}

              {/* Navigation buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Slide indicators */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentSlide ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className=" mt-5  space-y-10">
              <h1 className="mt-20 text-5xl">{blogData?.title}</h1>
              <h1 className="text-2xl">{blogData?.shortDescription}</h1>
              <p
                dangerouslySetInnerHTML={{ __html: blogData?.description }}
              ></p>
            </div>
          </div>
        </div>
      </div>
      <ScrollToTop />
    </>
  );
};

export default BlogsDetails;
