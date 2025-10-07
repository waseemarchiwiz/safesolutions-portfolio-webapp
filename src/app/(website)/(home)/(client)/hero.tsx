import React from "react";
import { motion } from "framer-motion";
import HeroSection from "@/components/hero-section";

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
  return <HeroSection />;
};

export default Hero;
