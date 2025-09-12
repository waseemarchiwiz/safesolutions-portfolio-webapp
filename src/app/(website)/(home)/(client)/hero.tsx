import React, { useEffect, useState } from "react";
import {
  ChevronRight,
  Code2,
  Cpu,
  Database,
  Globe2,
  Terminal,
  Binary,
  Blocks,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const CodeBlock = ({ delay = 0 }) => (
  <div className="flex flex-col space-y-1">
    <motion.div
      className="h-1.5 bg-blue-400/30 rounded-full w-16"
      animate={{ width: ["2rem", "4rem", "2rem"] }}
      transition={{ duration: 2, delay, repeat: Infinity }}
    />
    <motion.div
      className="h-1.5 bg-purple-400/30 rounded-full w-12"
      animate={{ width: ["4rem", "2rem", "4rem"] }}
      transition={{ duration: 2, delay: delay + 0.3, repeat: Infinity }}
    />
    <motion.div
      className="h-1.5 bg-cyan-400/30 rounded-full w-20"
      animate={{ width: ["3rem", "5rem", "3rem"] }}
      transition={{ duration: 2, delay: delay + 0.6, repeat: Infinity }}
    />
  </div>
);

const Hero = () => {
  const [scrolled, setScrolled] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrolled(Math.min(position / 500, 1));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const router = useRouter();

  return (
    <div className="relative min-h-screen flex items-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      {/* Previous background elements remain the same */}
      <div
        className="absolute inset-0 overflow-hidden hidden sm:block"
        style={{
          backgroundImage: `linear-gradient(transparent 0%, transparent calc(100% - 1px), rgba(255, 255, 255, 0.1) calc(100% - 1px)),
                       linear-gradient(90deg, transparent 0%, transparent calc(100% - 1px), rgba(255, 255, 255, 0.1) calc(100% - 1px))`,
          backgroundSize: "50px 50px",
          opacity: 0.2,
        }}
      />

      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-[128px] mix-blend-screen hidden sm:block" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-[128px] mix-blend-screen hidden sm:block" />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px] mix-blend-screen hidden sm:block" />

      <div className="relative w-full container mx-auto px-4 mt-10 sm:px-6 lg:px-8 py-20">
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
                Modern Development Solutions
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl    md:text-6xl lg:text-7xl font-bold tracking-tight">
                We Build
                <span className="block py-2 mt-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500">
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
                onClick={() => router.push("/contact")}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt" />
                <div className="relative px-8 py-3 bg-gray-900 rounded-lg leading-none flex items-center">
                  <span className="text-white">Start Project</span>
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              <button
                onClick={() => router.push("/about")}
                className="px-8 py-3 rounded-lg border border-white/20 hover:bg-white/10 transition-colors backdrop-blur-sm"
              >
                Learn More
              </button>
            </div>

            {/* Service cards */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              {[
                { icon: Code2, label: "Software Developement" },
                { icon: Database, label: "Design And Archetecture" },
                { icon: Globe2, label: "Backoffice Support" },
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

          {/* Right content - Development Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-full aspect-square hidden lg:block"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Central Terminal Window */}
              <motion.div
                animate={{
                  y: [-10, 10, -10],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative w-96 h-96"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl opacity-20 blur-xl" />
                <div className="absolute inset-0 backdrop-blur-sm bg-black/30 border border-white/20 rounded-2xl p-4">
                  {/* Terminal Header */}
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>

                  {/* Code Lines */}
                  <div className="space-y-6">
                    <CodeBlock delay={0} />
                    <CodeBlock delay={0.5} />
                    <CodeBlock delay={1} />
                  </div>

                  {/* Floating Tech Icons */}
                  {[Terminal, Binary, Blocks, Cpu].map((Icon, index) => (
                    <motion.div
                      key={index}
                      className="absolute"
                      animate={{
                        x: [0, 20, 0],
                        y: [0, -20, 0],
                      }}
                      transition={{
                        duration: 3,
                        delay: index * 0.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                      style={{
                        top: `${20 + index * 20}%`,
                        left: `${80 + (index % 2) * 10}%`,
                      }}
                    >
                      <Icon className="w-8 h-8 text-blue-300/60" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
