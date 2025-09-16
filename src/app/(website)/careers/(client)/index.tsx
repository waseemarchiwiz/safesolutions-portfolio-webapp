"use client";

import React, { useState } from "react";
import { Briefcase, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import PageHeroSection from "../../(common)/hero-section";
import WhySafe from "./why-safe";
import Loading from "../loading";
import ApplyModal from "./application-dialog";
import ScrollToTop from "@/components/common/scroll-to-top";
import { Button } from "@/components/ui/button";
import { CareerTypes, EmailTypes } from "../page";
import { toast } from "sonner";
import { SubmitApplyAction } from "../(actions)/action";

interface CareersProps {
  careers: CareerTypes[];
  emails: EmailTypes[];
}

/**
 * Todo
 * Application
 * Submission fails
 * */

const Careers = ({ careers, emails }: CareersProps) => {
  const [selectEmail, setSelectedEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState<CareerTypes | {}>({}); // Loader state to track data fetching
  const [modalOpen, setModalOpen] = useState(false);

  const handleApply = (job: CareerTypes) => {
    setSelectedJob(job); // Update selected job for modal
    setModalOpen(true); // Open the modal
  };

  // const handleSubmit = async (values: any) => {
  //   console.log(values, "Submitted Values");
  //   console.log(selectEmail, "selectEmail");

  //   // Create FormData object
  //   const formData = new FormData();

  //   // Append basic fields
  //   formData.append("name", values.name);
  //   formData.append("email", values.email);
  //   formData.append("phone", values.phone);
  //   formData.append("message", values.message);
  //   formData.append("experience", values.experience);
  //   formData.append("sender_email", selectEmail);

  //   // Append resume file
  //   if (values.resume) {
  //     formData.append("file", values.resume);
  //   }

  //   // Append portfolio related fields
  //   formData.append("portfolioType", values.portfolioType);
  //   if (values.portfolioType === "url") {
  //     formData.append("portfolioUrl", values.portfolioUrl);
  //   } else if (values.portfolioType === "file" && values.portfolioFile) {
  //     formData.append("portfolioFile", values.portfolioFile);
  //   }

  //   try {
  //     const response = await SubmitApplyAction(formData);
  //     console.log(response, "response easy apply");
  //     if (response?.data?.success) {
  //       toast.success(response?.data?.message);
  //       setModalOpen(false); // Close the modal after submission
  //     } else {
  //       toast.error(response?.data?.message || "Something went wrong");
  //     }
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //     toast.error(
  //       error?.response?.data?.message || "Failed to submit application"
  //     );
  //   }
  // };

  // const onSave = () => {};

  return (
    <div>
      {/* Hero Section */}
      <PageHeroSection
        mainTitle="Join Our Team"
        topTitle="We Seek"
        bottomTittle="Dreamers."
        description="Learn who we are and why we excel in delivering innovative solutions that drive business growth and digital transformation."
        buttonText="Get Started"
      />
      <WhySafe />
      <div className="min-h-screen bg-[#FFFFFF] dark:bg-black py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 dark:bg-purple-500/20 border border-purple-500/20">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-purple-600 dark:text-purple-400 text-sm font-medium">
                Trending Oppurtunities
              </span>
            </div>

            <p className="text-xl text-gray-600 dark:text-white max-w-2xl mx-auto mt-4">
              We promise you a dynamic and collaborative work environment where
              innovation thrives, and every challenge becomes an opportunity to
              grow and excel
            </p>
          </div>

          {/* Loader Section */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loading />
            </div>
          ) : careers?.length === 0 ? (
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
                  className="bg-[#FFFFFF] dark:bg-black p-6 rounded-lg  border-2  hover:shadow-lg hover:shadow-slate-500 transition-shadow duration-300"
                >
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {job.title}
                  </h2>
                  <div className="space-y-2 mt-5 mb-4 text-gray-600 dark:text-white">
                    <div className="flex items-center">
                      <Briefcase className="h-5 w-5 mr-2 text-gray-500 dark:text-white" />
                      <span>{job.job_description}</span>
                    </div>
                  </div>
                  <div className="space-y-2 mt-[-10px] mb-4 text-gray-600 dark:text-white">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-gray-500 dark:text-white" />
                      <span>{job.location}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-white mb-4">
                    {job.short_description}
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
        emails={emails}
        setSelectedEmail={setSelectedEmail}
      />
      <ScrollToTop />
    </div>
  );
};

export default Careers;
