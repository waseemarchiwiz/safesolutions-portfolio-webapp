"use client";

import React from "react";
import { ArrowUpRight, ScanText } from "lucide-react";
import { motion, MotionConfig } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { CompanyTypes } from "@/app/(admin)/dashboard/(company-page)/companies/columns";

const PartnerCard = ({ partner }: { partner: CompanyTypes }) => {
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
        className="group relative block aspect-square w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100  transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg hover:shadow-sky-500/10"
      >
        {/* Full-cover background image */}
        <div className="absolute inset-0">
          <Image
            src={(partner.url as string) || "/placeholder.png"}
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

const PartnersSection = ({ partners }: { partners: CompanyTypes[] }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  console.log("partners---", partners);

  return (
    <div className="max-w-7xl mx-auto lg:px-6">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-3 flex items-center text-sm text-sky-600">
          <ScanText size={15} className="text-sky-600 mr-2" aria-hidden />
          <span className="font-semibold">Our Ecosystem</span>
        </div>
        <h2 className="text-4xl font-semibold text-slate-900">
          Explore Our <span className="text-sky-600">Strategic Partners</span>
        </h2>
        <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
          Each partner brings unique expertise, allowing us to build powerful,
          integrated solutions that drive success.
        </p>
      </div>

      {/* Partners Grid */}
      <MotionConfig reducedMotion="user">
        {partners.length > 0 ? (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {partners.map((partner) => (
              <PartnerCard key={partner.id} partner={partner} />
            ))}
          </motion.div>
        ) : (
          <div className="w-full shadow bg-white flex flex-col items-center justify-center py-16 text-center px-6">
            <div className="shadow flex items-center justify-center w-14 h-14 rounded-2xl mb-4">
              <svg
                className="w-10 h-10 text-sky-600"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
            </div>
            <p className="text-md font-medium text-slate-500">
              No Partners Yet
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Check back later for new partners.
            </p>
          </div>
        )}
      </MotionConfig>
    </div>
  );
};

export default PartnersSection;
