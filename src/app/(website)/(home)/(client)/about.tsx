import React from "react";
import { motion, TargetAndTransition } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  containerVariants,
  floatingAnimation,
  itemVariants,
} from "../motion.settings";

const About = () => {
  const imageVariants = {
    hidden: {
      scale: 0.8,
      opacity: 0,
      x: -100,
    },
    visible: {
      scale: 1,
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
      },
    },
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      x: 100,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
      },
    },
  };

  const statsVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <motion.div
      className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {/* Animated background overlay */}
      <motion.div
        className="absolute inset-0 overflow-hidden hidden sm:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1 }}
        style={{
          backgroundImage: `linear-gradient(transparent 0%, transparent calc(100% - 1px), rgba(255, 255, 255, 0.1) calc(100% - 1px)),
                       linear-gradient(90deg, transparent 0%, transparent calc(100% - 1px), rgba(255, 255, 255, 0.1) calc(100% - 1px))`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Animated background blobs */}
      <motion.div
        animate={floatingAnimation}
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-[128px] mix-blend-screen hidden sm:block"
      />
      <motion.div
        animate={floatingAnimation}
        transition={{ delay: 0.5 }}
        className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-[128px] mix-blend-screen hidden sm:block"
      />
      <motion.div
        animate={floatingAnimation}
        transition={{ delay: 1 }}
        className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px] mix-blend-screen hidden sm:block"
      />

      {/* Main content */}
      <div className="relative min-h-[600px] container mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-12">
        {/* Left side - Image */}
        <motion.div className="w-full lg:w-1/2" variants={imageVariants}>
          <div className="relative">
            {/* Decorative elements */}
            <motion.div
              animate={floatingAnimation}
              className="absolute -top-4 -left-4 w-24 h-24 bg-purple-500/10 rounded-full blur-xl"
            />
            <motion.div
              animate={floatingAnimation}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"
            />

            {/* Image container */}
            <motion.div
              className="relative rounded-2xl overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.img
                src="https://readymadeui.com/cardImg.webp"
                alt="About SafeSolution"
                className="w-full h-[400px] object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              />

              {/* Stats overlay */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6"
                variants={statsVariants}
              >
                <div className="grid grid-cols-3 gap-4 text-white">
                  {[
                    { value: "5+", label: "Years Experience" },
                    { value: "100+", label: "Projects Done" },
                    { value: "99%", label: "Client Satisfaction" },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ y: -5 }}
                    >
                      <motion.div
                        className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.2 }}
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-sm text-gray-300">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right side - Content */}
        <motion.div className="w-full lg:w-1/2" variants={contentVariants}>
          <motion.div className="space-y-6" variants={itemVariants}>
            <motion.div
              className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10"
              whileHover={{ scale: 1.05 }}
            >
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-white/80 text-sm">About SafeSolution</span>
            </motion.div>

            <motion.h2
              className="text-4xl lg:text-5xl font-bold text-white leading-normal"
              variants={itemVariants}
            >
              Driving Excellence{" "}
              <motion.span
                className="block py-2 bg-gradient-to-r from-cyan-300 via-blue-500 to-purple-800 bg-clip-text text-transparent"
                animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{ backgroundSize: "200% auto" }}
              >
                Through Digital Solutions
              </motion.span>
            </motion.h2>

            <motion.p
              className="text-lg text-gray-300 leading-relaxed"
              variants={itemVariants}
            >
              SafeSolution Consultants is a premier IT services provider,
              enabling businesses to transform their digital strategies and
              achieve lasting success. We have been delivering innovative
              solutions that help companies navigate the complexities of the
              digital age.
            </motion.p>

            <motion.p
              className="text-lg text-gray-300 leading-relaxed"
              variants={itemVariants}
            >
              With a skilled team of experts, we design and implement tailored
              IT infrastructures that empower our clients to become leaders in
              their respective industries.
            </motion.p>

            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href={"/about"}>
                <Button className="bg-sky-600 mt-8 relative group overflow-hidden">
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;
