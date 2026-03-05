"use client";

import React from "react";
import { ChevronRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import PageHeroSection from "../../(shared)/hero-section";
import Link from "next/link";
import { ProjectTypes } from "@/app/(admin)/dashboard/(project-page)/projects/columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// Project Details
const ProjectDetails = ({ data }: { data: ProjectTypes }) => {
  return (
    <>
      {/* Page hero section */}
      <PageHeroSection
        tag="Project"
        title={data.name}
        description={data.description}
      />

      <section className="bg-white dark:bg-black py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <article className="flex-1">
              {/* Project Image */}
              <div className="mb-8 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800">
                <Image
                  src={data.url as string}
                  alt={data.name}
                  width={1200}
                  height={600}
                  className="w-full aspect-video object-cover"
                />
              </div>

              {/* About Section */}
              <div className="mb-5 p-6 bg-white dark:bg-black rounded-2xl border border-gray-200 dark:border-gray-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  About This Project
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {data.description}
                </p>
              </div>

              {/* Tabs Component */}
              <Tabs defaultValue="services">
                <TabsList className=" h-auto gap-2 bg-muted/50">
                  <TabsTrigger value="services" className="px-4 py-2">
                    Services
                  </TabsTrigger>
                  <TabsTrigger value="details" className="px-4 py-2">
                    Details
                  </TabsTrigger>
                  <TabsTrigger value="support" className="px-4 py-2">
                    Support
                  </TabsTrigger>
                </TabsList>

                {/* Services */}
                <TabsContent value="services">
                  <div className="">
                    {data?.services?.length > 0 ? (
                      data.services.map((service, index) => {
                        return (
                          <div
                            key={index}
                            className="bg-white my-4 dark:bg-black rounded-2xl border border-gray-200 dark:border-gray-800 p-6 hover:border-sky-600 transition-all duration-300"
                          >
                            <div className="flex items-center gap-3 mb-4">
                              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                {service.title}
                              </h3>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                              {service.description}
                            </p>
                            {service.features &&
                              service.features.length > 0 && (
                                <ul className="space-y-2">
                                  {service.features.map((feature, idx) => (
                                    <li
                                      key={idx}
                                      className="flex items-start text-gray-700 dark:text-gray-300"
                                    >
                                      <ChevronRight className="w-4 h-4 text-sky-600 mr-2 mt-0.5 flex-shrink-0" />
                                      <span className="text-sm">{feature}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center py-12 bg-white dark:bg-black rounded-2xl border border-gray-200 dark:border-gray-800">
                        <p className="text-gray-600 dark:text-gray-400">
                          No services available
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                {/* Details  */}
                <TabsContent value="details">
                  <div className="">
                    {data?.projectDetails?.length > 0 ? (
                      data.projectDetails.map((detail, index) => (
                        <div
                          key={index}
                          className="bg-white my-4 dark:bg-black rounded-2xl border border-gray-200 dark:border-gray-800 p-6"
                        >
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                            {detail.name || "Deployment Information"}
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">
                                Deployment Type
                              </div>
                              <div className="text-gray-900 dark:text-white">
                                {detail.deploymentType}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12 bg-white dark:bg-black rounded-2xl border border-gray-200 dark:border-gray-800">
                        <p className="text-gray-600 dark:text-gray-400">
                          No project details available
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                {/* Support */}
                <TabsContent value="support">
                  <div className="">
                    {data?.supports?.length > 0 ? (
                      data.supports.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="bg-white my-4 dark:bg-black rounded-2xl border border-gray-200 dark:border-gray-800 p-6 hover:border-sky-600 transition-all duration-300"
                          >
                            <div className="flex items-center gap-3 mb-3">
                              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                {item.title}
                              </h3>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center py-12 bg-white dark:bg-black rounded-2xl border border-gray-200 dark:border-gray-800">
                        <p className="text-gray-600 dark:text-gray-400">
                          No support information available
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </article>

            {/* Sidebar */}
            <aside className="lg:w-[320px]">
              <div className="sticky top-24 bg-white dark:bg-black rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Project Information
                </h3>

                <div className="space-y-4">
                  <div>
                    <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                      Project Name
                    </div>
                    <div className="text-sm text-gray-900 dark:text-white">
                      {data.name}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
                    <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                      Project Type
                    </div>
                    <div className="text-sm text-gray-900 dark:text-white capitalize">
                      {data.type}
                    </div>
                  </div>

                  {data.link && (
                    <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
                      <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                        Project Link
                      </div>
                      <Link
                        href={data.link}
                        target="_blank"
                        className="flex items-center gap-2 text-sm text-sky-600 hover:text-sky-700 transition-colors"
                      >
                        <span className="truncate">Visit Project</span>
                        <ExternalLink className="w-4 h-4 flex-shrink-0" />
                      </Link>
                    </div>
                  )}

                  <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
                    <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                      Last Updated
                    </div>
                    <div className="text-sm text-gray-900 dark:text-white">
                      {new Date(data.updatedAt ?? "").toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      )}
                    </div>
                  </div>

                  {data.services && data.services.length > 0 && (
                    <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
                      <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                        Services Included
                      </div>
                      <div className="text-sm text-gray-900 dark:text-white">
                        {data.services.length} service
                        {data.services.length !== 1 ? "s" : ""}
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

export default ProjectDetails;
