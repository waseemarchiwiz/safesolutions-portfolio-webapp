import React from "react";
import { motion } from "framer-motion";
import archiwiz from "../../assets/projectlogos/archiwizdark.png";
import alphabuilt from "../../assets/projectlogos/alphabuilt.png";
import lumsden from "../../assets/projectlogos/lumsdenlogo.webp";
import archiwizbuild from "../../assets/projectlogos/ArchiWizBuild_jpg.jpg";

const PartnersSection = () => {
  // Partner data with placeholder images
  const partners = [
    {
      name: "Archiwiz",
      logo: archiwiz,
      link: "https://archiwiz.com/",
    },
    {
      name: "Alphabuilt",
      logo: alphabuilt,
      link: "#",
    },
    {
      name: "Lumsden Trading",
      logo: lumsden,
      link: "https://lumsdentrading.com/",
    },
    {
      name: "Archiwiz Build",
      logo: archiwizbuild,
      link: "https://archiwizbuild-portfolio-app-prod-g5hdfzcxhucwcsa2.eastus-01.azurewebsites.net/",
    },
  ];

  // Container variant for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  // Logo item variant for individual animations
  const logoVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)", // Added shadow on hover
      transition: {
        type: "spring",
        stiffness: 300,
      },
    },
  };

  return (
    <section className="relative bg-gradient-to-r from-purple-700 to-indigo-800 overflow-hidden mt-16 py-16">
      {/* Background Decorations */}
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

      {/* Tech Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.1,
              animation: `moveUpDown ${5 + Math.random() * 5}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Content Section */}
      <div className="relative w-full container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-extrabold text-white mb-4 tracking-wide">
            Our Trusted Partners
          </h2>
          <p className="text-lg text-white max-w-2xl mx-auto">
            We collaborate with industry leaders to deliver exceptional value
            and innovation.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-16"
        >
          {partners.map((partner, index) => (
            <motion.a
              key={index}
              href={partner.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={logoVariants}
              whileHover="hover"
              className="flex items-center justify-center  rounded-lg p-4 transition-transform duration-300 transform hover:scale-105"
            >
              <motion.img
                src={partner.logo}
                alt={`${partner.name} logo`}
                className="h-24 w-auto max-w-[220px] object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;
