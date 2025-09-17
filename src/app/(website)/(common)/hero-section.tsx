"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface HeroDataTypes {
  mainTitle: string;
  topTitle: string;
  bottomTittle: string;
  description: string;
  buttonText?: string;
}

interface Decoration {
  left: string;
  top: string;
  duration: number;
  delay: number;
}

const PageHeroSection = ({
  mainTitle = "",
  topTitle = "",
  bottomTittle = "",
  description = "",
  buttonText = "",
}: HeroDataTypes) => {
  const navigate = useRouter();
  const [decorations, setDecorations] = useState<Decoration[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const generated = Array.from({ length: 20 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 5 + Math.random() * 5,
      delay: Math.random() * 5,
    }));
    setDecorations(generated);
  }, []);

  return (
    <div className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
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

      {/* Glowing orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-[128px] mix-blend-screen hidden sm:block" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-[128px] mix-blend-screen hidden sm:block" />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px] mix-blend-screen hidden sm:block" />

      <div className="relative w-full container mx-auto px-4 mt-10 sm:px-6 lg:px-8 py-20">
        {mounted && (
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            {decorations.map((p, i) => (
              <div
                key={i}
                className="absolute w-px h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent"
                style={{
                  left: p.left,
                  top: p.top,
                  opacity: 0.1,
                  animation: `moveUpDown ${p.duration}s linear infinite`,
                  animationDelay: `${p.delay}s`,
                }}
              />
            ))}
          </div>
        )}

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
              <span className="text-white/90">Welcome to Safe Solution</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                {topTitle || "Transforming Ideas"}{" "}
                <span className="block py-3 mt-1 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500">
                  {bottomTittle || "Into Digital Reality"}
                </span>
              </h1>

              <p className="text-xl text-white/80 max-w-xl">
                {description ||
                  "Learn who we are and why we excel in delivering innovative solutions that drive business growth and digital transformation."}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              {buttonText.length > 0 && (
                <button
                  className="relative group px-6 py-3 text-lg font-medium rounded-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 text-white shadow-lg"
                  onClick={() => navigate.push("/contact")}
                >
                  {buttonText}
                </button>
              )}
            </div>
          </motion.div>

          {/* Right content placeholder (you can add 3D / graphics here) */}
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
      `}</style>
    </div>
  );
};

export default PageHeroSection;
