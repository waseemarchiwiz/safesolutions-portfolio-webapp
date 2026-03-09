"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import PageHeroSection from "../../../(shared)/hero-section";
import { Card } from "@/components/ui/card";
import { ScanText } from "lucide-react";
import { ServiceTypes } from "@/app/(admin)/dashboard/(service-page)/services/columns";
import Link from "next/link";

interface ServicePropsTypes {
  services: ServiceTypes[];
  view: boolean;
}

export function Services({ services, view }: ServicePropsTypes) {
  return (
    <>
      {view === false && (
        <PageHeroSection
          tag="Services"
          title="Our Expertise"
          description="We turn ideas into reliable, scalable, and user-centric digital products."
        />
      )}

      <div className="max-w-7xl mx-auto px-6 py-20">
        {view === false ? (
          <div className="text-center mb-14">
            <h2 className="text-4xl font-semibold text-slate-900 dark:text-white">
              What We Offer
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto">
              Explore a range of digital solutions crafted to empower your
              business with performance, scalability, and innovation.
            </p>
          </div>
        ) : (
          <div className="space-y-3 mb-5">
            <div className="mb-3 flex items-center text-sm text-sky-600">
              <ScanText size={15} className="mr-2" aria-hidden />
              <span className="font-semibold tracking-wide">Services</span>
            </div>
            <h2 className="text-4xl font-semibold text-slate-900">
              Our <span className="text-sky-600">Services</span>
            </h2>
            <p className="text-slate-500 max-w-2xl">
              We build our products using the latest technologies and frameworks
              to deliver secure, scalable, and innovative solutions.
            </p>
          </div>
        )}

        {/* Services Grid */}
        {services.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              // add slug here
              <Link href={`/service/${service.slug}`} key={service.id}>
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Card className="group relative overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 bg-white/60 backdrop-blur-sm rounded-2xl h-[400px] flex flex-col">
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={service.url}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-70"></div>
                    </div>

                    <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                      <h3 className="text-lg font-semibold text-slate-900 ">
                        {service.title}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {service.description}
                      </p>
                    </div>

                    <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-sky-400/30 transition-all duration-500"></div>
                  </Card>
                </motion.div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="shadow flex flex-col items-center justify-center py-16 text-center px-6">
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
              No Services Yet
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Check back later for new services.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
