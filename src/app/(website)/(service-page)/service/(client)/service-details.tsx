"use client";

import React from "react";
import {
  ChevronRight,
  ExternalLink,
  Code,
  Layers,
  Briefcase,
  CircleSmall,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageHeroSection from "@/app/(website)/(common)/hero-section";
import { ServiceTypes } from "@/app/(admin)/dashboard/(service-page)/services/columns";

const ServiceDetails = ({ data }: { data: ServiceTypes }) => {
  return (
    <>
      {/* Page Hero Section */}
      <PageHeroSection
        tag="Service"
        title={data.title}
        description={data.description}
      />

      <section className="bg-white dark:bg-black py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* ---------- MAIN CONTENT ---------- */}
            <article className="flex-1">
              {/* Service Image */}
              <div className="mb-8 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800">
                <Image
                  src={data.url as string}
                  alt={data.title}
                  width={1200}
                  height={600}
                  className="w-full aspect-video object-cover"
                />
              </div>

              {/* Overview */}
              <div className="mb-8 p-6 bg-white dark:bg-black rounded-2xl border border-gray-200 dark:border-gray-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Overview
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {data.overview || data.description}
                </p>
              </div>

              {/* Tabs */}
              <Tabs defaultValue="features">
                <TabsList className="h-auto gap-2 bg-muted/50">
                  <TabsTrigger value="features" className="px-4 py-2">
                    Key Features
                  </TabsTrigger>
                  <TabsTrigger value="technologies" className="px-4 py-2">
                    Technologies
                  </TabsTrigger>
                  <TabsTrigger value="industries" className="px-4 py-2">
                    Industries
                  </TabsTrigger>
                </TabsList>

                {/* ---------- FEATURES ---------- */}
                <TabsContent value="features">
                  <div className="mt-6 space-y-4">
                    {data.features?.length ? (
                      <ul className="grid gap-3">
                        {data.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-start bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:border-sky-600 transition-all duration-300"
                          >
                            <CircleSmall className="w-5 h-5 text-sky-600 mr-3 mt-1 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                        No features listed for this service.
                      </p>
                    )}
                  </div>
                </TabsContent>

                {/* ---------- TECHNOLOGIES ---------- */}
                <TabsContent value="technologies">
                  <div className="mt-6 space-y-4">
                    {data.technologies?.length ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {data.technologies.map((tech, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl p-3 hover:border-sky-600 transition-all duration-300"
                          >
                            <Code className="w-4 h-4 text-sky-600" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {tech}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                        No technologies associated with this service.
                      </p>
                    )}
                  </div>
                </TabsContent>

                {/* ---------- INDUSTRIES / USE CASES ---------- */}
                <TabsContent value="industries">
                  <div className="mt-6 space-y-6">
                    {/* Industries */}
                    {data.industries?.length ? (
                      <div>
                        <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900 dark:text-white mb-4">
                          <Briefcase className="w-5 h-5 text-sky-600" />{" "}
                          Industries
                        </h3>
                        <ul className="space-y-2">
                          {data.industries.map((industry, i) => (
                            <li
                              key={i}
                              className="text-gray-700 dark:text-gray-300 flex items-start"
                            >
                              <CircleSmall className="w-4 h-4 text-sky-600 mr-2 mt-0.5" />
                              {industry}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400">
                        No industries listed.
                      </p>
                    )}

                    {/* Use Cases */}
                    {data.useCases?.length ? (
                      <div>
                        <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900 dark:text-white mt-8 mb-4">
                          <Layers className="w-5 h-5 text-sky-600" /> Use Cases
                        </h3>
                        <ul className="space-y-2">
                          {data.useCases.map((useCase, i) => (
                            <li
                              key={i}
                              className="text-gray-700 dark:text-gray-300 flex items-start"
                            >
                              <ChevronRight className="w-4 h-4 text-sky-600 mr-2 mt-0.5" />
                              {useCase}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400">
                        No use cases listed.
                      </p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </article>

            {/* ---------- SIDEBAR ---------- */}
            <aside className="lg:w-[320px]">
              <div className="sticky top-24 bg-white dark:bg-black rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Service Information
                </h3>

                <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
                  <div>
                    <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                      Service Title
                    </div>
                    <div>{data.title}</div>
                  </div>

                  {data.link && (
                    <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
                      <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                        Service Link
                      </div>
                      <Link
                        href={data.link}
                        target="_blank"
                        className="flex items-center gap-2 text-sky-600 hover:text-sky-700 transition-colors"
                      >
                        <span>Visit Service Page</span>
                        <ExternalLink className="w-4 h-4 flex-shrink-0" />
                      </Link>
                    </div>
                  )}

                  {data.features && data.features.length > 0 && (
                    <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
                      <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                        Included Features
                      </div>
                      <div>
                        {data.features.length} Feature
                        {data.features.length !== 1 ? "s" : ""}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceDetails;
