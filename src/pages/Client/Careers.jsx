import React, { useEffect, useState } from "react";
import { Briefcase, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import CustomButton from "../../globals/CustomButton";
import ScrollToTop from "../../globals/ScrollToTop";
import axios from "axios";
import Lottie from "lottie-react";
import loaderAnimation from "../../assets/lottie/loadanimate.json"; // Path to your Lottie JSON file

import { toast } from "react-toastify";
import WhySafe from "@/components/CareerComponents/WhySafe";

import CareerHero from "@/components/CareerComponents/CareerHero";
import ApplyModal from "@/components/CareerComponents/ApplyModal";
import SEOComponent from "@/components/SEOComponent";

const Careers = () => {
  const [emails, setEmails] = useState([]);
  const [selectEmail, setSelectedEmail] = useState("");
  const [careersData, setCareersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(""); // Loader state to track data fetching
  const [modalOpen, setModalOpen] = useState(false);

  // Function to fetch career data from API
  const userUrl = import.meta.env.VITE_USER_URL;
  const api_token = import.meta.env.VITE_API_TOKEN;
  // State to toggle between URL and file input

  //fetching careers
  const fetchCareers = async () => {
    try {
      const response = await axios.get(`${userUrl}/get/careers`, {
        headers: {
          api_token: api_token,
        },
      });
      console.log(response, "careers response");

      if (response?.data?.succes) {
        setCareersData(response?.data?.careers);
      } else {
        setCareersData(jobOpenings); // Fallback to a default set of job openings
      }
    } catch (error) {
      setCareersData(jobOpenings); // Fallback if API call fails
    } finally {
      setLoading(false); // Stop the loader once the data is fetched (or fallback is used)
    }
  };

  //fetch emails
  const fetchEmails = async () => {
    try {
      const response = await axios.get(`${userUrl}/get/emails`, {
        headers: {
          api_token: api_token,
        },
      });
      console.log(response?.data?.emails, "emailsss");
      if (response?.data?.emails?.length > 0) {
        setEmails(response?.data?.emails);
      } else {
        setEmails([]);
      }
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  };

  // Fetch careers when the component mounts
  useEffect(() => {
    fetchCareers();
    fetchEmails(); // Fetch emails when the component mounts
  }, []);

  const handleApply = (job) => {
    setSelectedJob(job); // Update selected job for modal
    setModalOpen(true); // Open the modal
  };

  const handleSubmit = async (values) => {
    console.log(values, "Submitted Values");
    console.log(selectEmail, "selectEmail");

    // Create FormData object
    const formData = new FormData();

    // Append basic fields
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("message", values.message);
    formData.append("experience", values.experience);
    formData.append("sender_email", selectEmail);

    // Append resume file
    if (values.resume) {
      formData.append("file", values.resume);
    }

    // Append portfolio related fields
    formData.append("portfolioType", values.portfolioType);
    if (values.portfolioType === "url") {
      formData.append("portfolioUrl", values.portfolioUrl);
    } else if (values.portfolioType === "file" && values.portfolioFile) {
      formData.append("portfolioFile", values.portfolioFile);
    }

    try {
      const response = await axios.post(
        `${userUrl}/easy/apply`,
        formData, // Send formData directly, don't spread it
        {
          headers: {
            "Content-Type": "multipart/form-data",
            api_token: api_token,
          },
        }
      );

      console.log(response, "response easy apply");

      if (response?.data?.success) {
        toast.success(response?.data?.message);
        setModalOpen(false); // Close the modal after submission
      } else {
        toast.error(response?.data?.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        error?.response?.data?.message || "Failed to submit application"
      );
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <SEOComponent
        title="We Seek Dreamers | careers"
        description="SafeSolution Consultants is a premier IT services provider, enabling businesses to transform their digital strategies and achieve lasting success. We have been delivering innovative solutions that help companies navigate the complexities of the digital age."
        keywords="Join Our Team, SafeSolution Consultants is a premier IT services provider "
      />
      <CareerHero />
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
              <Lottie
                animationData={loaderAnimation}
                loop
                style={{ height: "50px", width: "50px" }}
              />
            </div>
          ) : careersData.length === 0 ? (
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
              {careersData.map((job, index) => (
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
                    <CustomButton
                      label="Apply Now"
                      // to={job.link}
                      // target="_blank"
                      handleClick={() => handleApply(job)}
                    />
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
        setModalOpen={setModalOpen}
        selectedJob={selectedJob}
        emails={emails}
        handleSubmit={handleSubmit}
        setSelectedEmail={setSelectedEmail}
        selectEmail={selectEmail}
      />
      <ScrollToTop />
    </div>
  );
};

export default Careers;
