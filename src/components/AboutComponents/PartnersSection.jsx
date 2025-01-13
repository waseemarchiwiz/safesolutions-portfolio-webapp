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
      name: "Archiwiz build",
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
      transition: {
        type: "spring",
        stiffness: 300,
      },
    },
  };

  return (
    <section className="bg-[#452484] py-16 overflow-hidden mt-10">
      <div className="container mx-auto px-4 my-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Our Trusted Partners
          </h2>
          <p className="text-white max-w-2xl mx-auto">
            We collaborate with industry leaders to deliver exceptional value
            and innovation.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center items-center gap-12"
        >
          {partners.map((partner, index) => (
            <motion.a
              key={index}
              href={partner.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={logoVariants}
              whileHover="hover"
              className="flex items-center justify-center"
            >
              <motion.img
                src={partner.logo}
                alt={`${partner.name} logo`}
                className="h-20 w-auto max-w-[220px] object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;
