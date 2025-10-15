"use client";

import React from "react";
import { ArrowUpRight, ScanText } from "lucide-react";
import { motion, MotionConfig } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export type PartnerType = {
  id: number;
  name: string;
  slug: string;
  logo: string;
  description: string;
  link: string;
};

const partnersData: PartnerType[] = [
  {
    id: 1,
    name: "Backtelemed",
    slug: "backtelemed",
    logo: "/archiwizbuild.png",
    description:
      "Pioneering telehealth solutions for modern healthcare providers and patients.",
    link: "/partners/backtelemed",
  },
  {
    id: 3,
    name: "Archiwiz Construction",
    slug: "archiwiz-construction",
    logo: "/archiwizfrontpage.png",
    description:
      "Bringing architectural visions to life with precision engineering and quality craftsmanship.",
    link: "/partners/archiwiz-construction",
  },
  {
    id: 4,
    name: "Alpha Build",
    slug: "alpha-build",
    logo: "/alpha-build.png",
    description:
      "End-to-end construction management software for efficient and scalable project delivery.",
    link: "/partners/alpha-build",
  },
  {
    id: 5,
    name: "Agro Futures",
    slug: "agro-futures",
    logo: "/hero.jpg",
    description:
      "Sustainable agriculture technology to optimize yield and promote environmental stewardship.",
    link: "/partners/agro-futures",
  },
  {
    id: 6,
    name: "Lumsden Trading",
    slug: "lumsden-trading",
    logo: "/lumsden.png",
    description:
      "Your primary partner for custom software development and IT consultancy.",
    link: "/services",
  },
];

const PartnerCard = ({ partner }: { partner: PartnerType }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  } as const;

  return (
    <motion.div variants={cardVariants}>
      <Link
        href={partner.link}
        className="group relative block aspect-square w-full overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg hover:shadow-sky-500/10"
      >
        {/* Full-cover background image */}
        <div className="absolute inset-0">
          <Image
            src={partner.logo}
            alt={partner.name}
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        {/* Text Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-5 text-white opacity-0 translate-y-5 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{partner.name}</h3>
            <ArrowUpRight className="h-5 w-5 opacity-70 transition-transform duration-300 group-hover:rotate-45" />
          </div>
          <p className="mt-1 text-sm text-slate-200 line-clamp-2">
            {partner.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

const PartnersSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  return (
    <div className="max-w-7xl mx-auto lg:px-6">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-3 flex items-center text-sm text-sky-600">
          <ScanText size={15} className="text-sky-600 mr-2" aria-hidden />
          <span className="font-semibold">Our Ecosystem</span>
        </div>
        <h2 className="text-4xl font-semibold text-slate-900 dark:text-white">
          Explore Our <span className="text-sky-600">Strategic Partners</span>
        </h2>
        <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
          Each partner brings unique expertise, allowing us to build powerful,
          integrated solutions that drive success.
        </p>
      </div>

      {/* Partners Grid */}
      <MotionConfig reducedMotion="user">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {partnersData.map((partner) => (
            <PartnerCard key={partner.id} partner={partner} />
          ))}
        </motion.div>
      </MotionConfig>
    </div>
  );
};

export default PartnersSection;
