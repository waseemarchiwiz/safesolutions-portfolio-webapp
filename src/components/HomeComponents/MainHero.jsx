import React, { useState, useEffect } from "react";
import { ChevronRight, Code2, Cpu, Globe2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import { motion } from "framer-motion";

const MainHero = () => {
  const [scrolled, setScrolled] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrolled(Math.min(position / 500, 1));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="relative min-h-screen flex items-center py-14 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
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
                <span className="text-white/90">
                  Next Generation Development
                </span>
              </div>

              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                  We Build
                  <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500">
                    Digital Future
                  </span>
                </h1>

                <p className="text-xl text-white/80 max-w-xl">
                  Empowering businesses with cutting-edge software solutions.
                  Where innovation meets excellence.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  className="relative group"
                  onClick={() => navigate("/contact")}
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt" />
                  <div className="relative px-8 py-3 bg-gray-900 rounded-lg leading-none flex items-center">
                    <span className="text-white">Start Building</span>
                    <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>

                <button
                  onClick={() => navigate("/about")}
                  className="px-8 py-3 rounded-lg border border-white/20 hover:bg-white/10 transition-colors backdrop-blur-sm"
                >
                  Learn More
                </button>
              </div>

              {/* Service cards */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                {[
                  { icon: Code2, label: "Custom Development" },
                  { icon: Cpu, label: "AI Solutions" },
                  { icon: Globe2, label: "Cloud Services" },
                ].map((service, index) => (
                  <div
                    key={index}
                    className="group p-4 rounded-lg bg-white/10 border border-white/20 hover:border-white/30 transition-colors backdrop-blur-sm"
                  >
                    <service.icon className="w-6 h-6 mb-2 text-blue-300 group-hover:text-blue-200 transition-colors" />
                    <p className="text-sm text-white/80 group-hover:text-white/90 transition-colors">
                      {service.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right content - 3D Grid */}
            <div className="relative aspect-square">
              <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-4">
                {[...Array(16)].map((_, i) => (
                  <div
                    key={i}
                    className="relative rounded-lg bg-white/10 border border-white/20 backdrop-blur-sm transform transition-all duration-500"
                    style={{
                      transform: `translateZ(${
                        Math.random() * 100
                      }px) rotateX(${Math.random() * 20}deg) rotateY(${
                        Math.random() * 20
                      }deg)`,
                      animation: `float ${
                        3 + Math.random() * 2
                      }s ease-in-out infinite`,
                      animationDelay: `${Math.random() * 2}s`,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/10 rounded-lg" />
                  </div>
                ))}
              </div>
            </div>
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
    </>
  );
};

export default MainHero;
