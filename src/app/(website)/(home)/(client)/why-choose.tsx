import React from "react";
import { motion } from "framer-motion";
import { cardData } from "../data";
import Link from "next/link";
import Image from "next/image";
import { Zap } from "lucide-react";

const WhyChoose = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const headerVariants = {
    hidden: {
      opacity: 0,
      y: -50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 100,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-black py-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        className="container mx-auto px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* Header Section */}
        <motion.div className="text-center mb-20" variants={headerVariants}>
          <div className="flex flex-col justify-center items-center gap-6 mb-16">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-purple-500/10 dark:bg-purple-500/20 border border-purple-500/20 hover:bg-purple-500/20 transition-colors duration-300">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              <span className="text-purple-600 dark:text-purple-400 text-sm font-semibold">
                Why Choose us
              </span>
            </div>
            <p className="text-slate-600 dark:text-white text-[20px] md:text-[26px] leading-relaxed text-center p-5 max-w-7xl">
              We provide expert back-office support services, leveraging
              innovation, industry expertise, and emerging technologies to
              streamline operations and deliver tailored solutions.
            </p>
          </div>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cardData.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden
                       shadow-lg hover:shadow-2xl transition-shadow duration-500"
            >
              {/* Card Header with Image */}
              <div className="relative h-72 overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <Image
                  src={item?.image}
                  alt={item?.title || "Service image"}
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 3} // Load first 3 images with priority
                  unoptimized
                />
                {/* Floating Icon */}
                <motion.div
                  className="absolute top-4 right-4 p-3 bg-white/90 dark:bg-gray-800/90 rounded-xl
                           text-purple-600 dark:text-purple-400 backdrop-blur-sm
                           border border-white/20 z-20"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Zap />
                </motion.div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-gray-500 dark:text-white">
                  {item?.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {item?.description}
                </p>

                {/* Card Footer */}
                <motion.div
                  className="flex items-center justify-between"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center text-purple-600 dark:text-purple-400">
                    <Link href="/about" className="font-medium hover:underline">
                      Explore More
                    </Link>
                    <svg
                      className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default WhyChoose;
