"use client";

import React, { useState } from "react";
import { Briefcase, MapPin, ScanText } from "lucide-react";
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
  const [selectedJob, setSelectedJob] = useState<CareerTypes | {}>({}); // Loader state to track data fetching
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
    <div>
      {/* Hero Section */}
      <PageHeroSection />
      <WhySafe />
      <div className="my-10 bg-[#FFFFFF] dark:bg-black py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <div className="mb-3 flex items-center text-sm text-sky-600">
              <ScanText size={15} className="text-sky-600 mr-2" aria-hidden />
              <span className="font-semibold">Job openings</span>
            </div>
            <h2 className="text-4xl font-semibold text-slate-900">
              Current Available <span className="text-sky-600">Positions</span>
            </h2>
            <p className="mt-3 max-w-2xl text-slate-600">
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
                  className="mb-10 bg-[#FFFFFF] dark:bg-black p-6 rounded-lg  border-2  hover:shadow-lg hover:shadow-slate-500 transition-shadow duration-300"
                >
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {job.title}
                  </h2>
                  <div className="space-y-2 mt-5 mb-4 text-gray-600 dark:text-white">
                    <div className="flex items-center">
                      <Briefcase className="h-5 w-5 mr-2 text-gray-500 dark:text-white" />
                      <span>{job.jobDescription}</span>
                    </div>
                  </div>
                  <div className="space-y-2 mt-[-10px] mb-4 text-gray-600 dark:text-white">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-gray-500 dark:text-white" />
                      <span>{job.location}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-white mb-4">
                    {job.shortDescription}
                  </p>
                  <div className="mt-4">
                    <Button
                      variant="outline"
                      // to={job.link}
                      // target="_blank"
                      onClick={() => handleApply(job)}
                    >
                      Apply Now
                    </Button>
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
    </div>
  );
};

export default Careers;
