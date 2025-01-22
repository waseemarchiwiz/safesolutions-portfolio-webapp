import React from "react";
import { GiArtificialIntelligence } from "react-icons/gi";
import { HoverEffect } from "../ui/card-hover-effect";
import CustomButton from "../../globals/CustomButton";
import { motion } from "framer-motion";

const ServicesComponent = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const backgroundBlobVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeOut",
      },
    },
  };

  const floatingAnimation = {
    y: [-10, 10],
    transition: {
      y: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className="relative overflow-hidden bg-[#FFFFFF] dark:bg-black"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      {/* Animated background decorations */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial="initial"
        animate="animate"
      >
        <motion.div
          variants={backgroundBlobVariants}
          animate={floatingAnimation}
          className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"
        />
        <motion.div
          variants={backgroundBlobVariants}
          animate={floatingAnimation}
          transition={{ delay: 0.3 }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"
        />
      </motion.div>

      <div className="relative container mx-auto px-4 py-24">
        <motion.div className="mx-auto">
          {/* Animated header section */}
          <motion.div
            className="space-y-6 text-center mb-16"
            variants={itemVariants}
          >
            <motion.div
              className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 dark:bg-purple-500/20 border border-purple-500/20"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-purple-600 dark:text-white text-sm font-medium">
                Our Services
              </span>
            </motion.div>

            <motion.h2
              className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white"
              variants={itemVariants}
            >
              Transforming Ideas into
              <motion.span
                className="block py-3 bg-gradient-to-r from-cyan-300 via-blue-500 to-purple-800 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0%", "100%", "0%"],
                }}
                style={{
                  backgroundSize: "200% auto",
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                Digital Reality
              </motion.span>
            </motion.h2>

            <motion.p
              className="text-slate-600 dark:text-white text-[20px] md:text-[26px] leading-relaxed text-center w-auto"
              variants={itemVariants}
            >
              Our services include Medical Billing and Coding, Web Development
              and Cloud Services, BIM services and Visualization services, and
              FINTECH. We provide robust, proactive and effective management of
              all problems related to our services to help our clients make the
              most of their investments.
            </motion.p>
          </motion.div>

          {/* Animated services grid */}
          <motion.div className="relative" variants={itemVariants}>
            {/* Animated grid lines */}
            <motion.div
              className="absolute inset-0 grid grid-cols-3 gap-4 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  // className="border-r border-t border-slate-200 dark:border-slate-800"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                />
              ))}
            </motion.div>

            <motion.div className="relative" variants={itemVariants}>
              <HoverEffect
                items={projects.map((project) => ({
                  ...project,
                  className:
                    "bg-white dark:bg-zinc-800 shadow-xl dark:shadow-zinc-700/20 border border-slate-200 dark:border-slate-700/50 rounded-xl transition-all duration-300 hover:scale-105",
                  icon: (
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <GiArtificialIntelligence className="w-10 h-10 text-purple-500 dark:text-purple-400" />
                    </motion.div>
                  ),
                }))}
              />
            </motion.div>
          </motion.div>

          {/* Animated CTA section */}
          <motion.div className="mt-16 text-center" variants={itemVariants}>
            <motion.div
              className="inline-flex flex-col items-center"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <CustomButton
                  label="Learn More"
                  className="relative group"
                  to="/services"
                />
              </motion.div>
              <motion.div
                className="mt-4 text-sm text-slate-600 dark:text-slate-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Discover our full range of services
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Animated decorative bottom line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
    </motion.div>
  );
};

export default ServicesComponent;

// Projects data remains the same
export const projects = [
  {
    title: "Artificial Intelligence",
    description:
      "Leverage cutting-edge AI technologies to automate processes, gain insights, and create intelligent solutions that drive business growth.",
    // link: "https://stripe.com",
  },
  {
    title: "Archetecture and Design",
    description:
      "Create stunning, responsive, and high-performance web applications using modern frameworks and best practices in development.",
    // link: "https://netflix.com",
  },
  {
    title: "ERP Management",
    description:
      "Streamline your business operations with comprehensive ERP solutions that integrate all aspects of your enterprise.",
    // link: "https://google.com",
  },
  {
    title: "DevOps",
    description:
      "Implement efficient CI/CD pipelines and automation tools to accelerate development and ensure reliable deployments.",
    // link: "https://meta.com",
  },
  {
    title: "IoT App Development",
    description:
      "Build connected solutions that bridge the physical and digital worlds, enabling smart automation and data-driven decisions.",
    // link: "https://amazon.com",
  },
  {
    title: "Backoffice support",
    description:
      "Create immersive experiences and virtual environments that revolutionize training, entertainment, and customer engagement.",
    // link: "https://microsoft.com",
  },
];
