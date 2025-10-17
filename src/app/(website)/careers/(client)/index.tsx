"use client";

import React, { useState } from "react";
import { Briefcase, MapPin, ScanText, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import PageHeroSection from "../../(common)/hero-section";
import WhySafe from "./why-safe";
import ApplyModal from "./application-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CompanyTypes } from "@/app/(admin)/dashboard/(company-page)/companies/columns";
import { CareerTypes } from "@/app/(admin)/dashboard/(career-page)/careers/columns";

interface CareersProps {
  careers: CareerTypes[];
  companies: CompanyTypes[];
}

/**
 * Todo
 * Application
 * Submission fails
 * */

const Careers = ({ careers, companies }: CareersProps) => {
  // selected job
  const [selectedJob, setSelectedJob] = useState<CareerTypes | null>(null); // Loader state to track data fetching
  const [modalOpen, setModalOpen] = useState(false);

  const handleApply = (job: CareerTypes) => {
    setSelectedJob(job); // Update selected job for modal
    setModalOpen(true); // Open the modal
  };

  const handleSubmit = async (success: boolean, message: string) => {
    if (success) {
      toast.success(message || "Success");
    } else {
      toast.error(message || "Something went wrong");
    }
  };

  return (
    <>
      {/* Hero Section */}
      <PageHeroSection
        tag="Careers"
        title="Top Opportunities"
        description="We provide opportunities for it professionals"
      />
      <WhySafe />
      <div className="my-10 bg-[#FFFFFF] dark:bg-black py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[76.5rem] mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <div className="mb-3 flex items-center text-sm text-sky-600">
              <ScanText size={15} className="text-sky-600 mr-2" aria-hidden />
              <span className="font-semibold">Job openings</span>
            </div>
            <h2 className="text-4xl font-semibold text-slate-900 dark:text-white">
              Current Available <span className="text-sky-600">Positions</span>
            </h2>
            <p className="mt-3 max-w-2xl text-slate-600 dark:text-gray-400">
              Great teams are built on shared goals and a sense of purpose. When
              everyone is aligned with a clear mission.
            </p>
          </div>

          {/* Loader Section */}
          {careers?.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-black rounded-lg shadow">
              <p className="text-xl text-gray-600 dark:text-white">
                No jobs available at the moment.
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              exit={{ opacity: 0, y: 50 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {careers?.map((job, index) => (
                <div
                  key={index}
                  className="group relative h-full bg-white dark:bg-black rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden transition-all duration-500 hover:border-sky-600"
                >
                  <div className="relative p-6 h-full flex flex-col">
                    {/* Title */}
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300 group-hover:text-sky-600">
                      {job.title}
                    </h2>

                    {/* Job Details */}
                    <div className="space-y-3 mb-4 flex-grow">
                      <div className="flex items-start text-gray-600 dark:text-gray-400 transition-all duration-300 group-hover:translate-x-1">
                        <div className="flex-shrink-0 w-5 h-5 mt-0.5 mr-3 rounded-full bg-sky-600/10 dark:bg-sky-600/20 flex items-center justify-center transition-all duration-300 group-hover:bg-sky-600 group-hover:scale-110">
                          <Briefcase className="w-3 h-3 text-sky-600 transition-colors duration-300 group-hover:text-white" />
                        </div>
                        <span className="text-sm leading-relaxed">
                          {job.jobDescription}
                        </span>
                      </div>

                      <div
                        className="flex items-start text-gray-600 dark:text-gray-400 transition-all duration-300 group-hover:translate-x-1"
                        style={{ transitionDelay: "50ms" }}
                      >
                        <div className="flex-shrink-0 w-5 h-5 mt-0.5 mr-3 rounded-full bg-sky-600/10 dark:bg-sky-600/20 flex items-center justify-center transition-all duration-300 group-hover:bg-sky-600 group-hover:scale-110">
                          <MapPin className="w-3 h-3 text-sky-600 transition-colors duration-300 group-hover:text-white" />
                        </div>
                        <span className="text-sm leading-relaxed">
                          {job.location}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mt-4 transition-all duration-300 group-hover:text-gray-800 dark:group-hover:text-gray-200">
                        {job.shortDescription}
                      </p>
                    </div>

                    {/* Apply Button */}
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                      <Button
                        variant="outline"
                        onClick={() => handleApply(job)}
                        className="w-full cursor-pointer relative overflow-hidden border-sky-600 text-white bg-sky-600 hover:bg-sky-700 hover:text-white"
                      >
                        <span className="relative z-10 flex items-center justify-center">
                          Apply Now
                          <ArrowRight className="w-4 h-4 ml-2 " />
                        </span>
                        <div className="absolute inset-0 bg-sky-600 transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300" />
                      </Button>
                    </div>
                  </div>

                  {/* Shimmer Effect on Hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
                    <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
      {/* check condition if model open show the form with formik  */}
      <ApplyModal
        modalOpen={modalOpen}
        onOpenChange={() => setModalOpen(false)}
        selectedJob={selectedJob as CareerTypes}
        companies={companies}
        onSave={handleSubmit}
      />
    </>
  );
};

export default Careers;
