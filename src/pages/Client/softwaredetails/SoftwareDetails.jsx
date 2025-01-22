import React from "react";
import { Software } from "./Software";
import { useParams, Link } from "react-router-dom";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import ScrollToTop from "@/globals/ScrollToTop";
const SoftwareDetails = () => {
  const { id } = useParams(); // Call useParams to retrieve route parameters

  // Convert id to a number if necessary, as it might be a string from the URL
  const softwareService = Software.find((software) => software.id === id);

  console.log(softwareService, "softwareService");

  if (!softwareService)
    return <div className="text-center py-12">No service found</div>;

  return (
    <>
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
                <span className="text-white/90">Software Development</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  <span className="text-white">Turning Concepts </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500">
                    Into Creations
                  </span>
                </h1>

                <p className="text-xl text-white/80 max-w-xl">
                  Safe Solution simplifies the challenges of digital
                  transformation, providing you with innovative tools to
                  navigate the industry effortlessly.
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
      <div className="min-h-screen bg-[#FFFFFF] dark:bg-black py-16 px-6 ">
        <div className="container mx-auto max-w-3xl ">
          <div className="flex justify-between items-center mb-6">
            {/* <Link
              to="/software"
              className="text-blue-500 hover:underline text-lg cursor-pointer"
            >
              ← Back to Services
            </Link> */}
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            {/* Software Title */}
            <h1 className="text-3xl font-bold mb-4 dark:text-white text-gray-800">
              {softwareService.title}
            </h1>

            {/* Software Description */}
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              {softwareService.description}
            </p>

            {/* Software Features */}
            <div>
              <h2 className="text-xl font-semibold mb-4 dark:text-white text-gray-800">
                Key Features:
              </h2>
              <ul className="space-y-2">
                {softwareService.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center text-gray-700 dark:text-gray-300"
                  >
                    <Check className="w-5 h-5 mr-2 text-green-500" /> {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Button */}
            <div className="text-center mt-8">
              <Link
                to="/contact"
                className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
              >
                Contact Us for More Info
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ScrollToTop />
    </>
  );
};

export default SoftwareDetails;
