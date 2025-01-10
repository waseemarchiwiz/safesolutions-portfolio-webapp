import React, { useEffect, useState } from "react";
import { Briefcase, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import CustomButton from "../../globals/CustomButton";
import ScrollToTop from "../../globals/ScrollToTop";
import axios from "axios";
import Lottie from "lottie-react";
import loaderAnimation from "../../assets/lottie/loadanimate.json"; // Path to your Lottie JSON file
import hero from "../../assets/hero.png";
import { Field, Form, Formik } from "formik";
import { CustomInput } from "@/globals/CustomInput";
import { EasyApplyValidationSchema } from "@/schemas/validationSchemas";
import { toast } from "react-toastify";
import WhySafe from "@/components/CareerComponents/WhySafe";

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

  const ApplyModal = () => {
    if (!modalOpen || !selectedJob) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white dark:bg-[#18181b] p-8 rounded-lg w-full max-w-[50%]">
          <h2 className="text-2xl mb-4">{selectedJob.title}</h2>

          <div className="my-4 mt-1">
            <select
              onChange={(e) => setSelectedEmail(e.target.value)}
              className="mt-1 font-sans block w-full p-2 bg-[#f2f5f8] dark:bg-gray-800 text-black dark:text-white border border-gray-300 rounded-md"
            >
              <option value="">Select Email</option>
              {emails?.map((item, index) => (
                <option key={index} value={item.email}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <Formik
            initialValues={{
              name: "",
              email: "",
              phone: "",
              resume: null,
              experience: "",
              message: "",
              portfolioType: "",
              portfolioUrl: "",
              portfolioFile: null,
            }}
            onSubmit={handleSubmit}
            validationSchema={EasyApplyValidationSchema}
          >
            {({ isSubmitting, setFieldValue, values, errors, touched }) => (
              <Form className="space-y-4">
                <div className="flex flex-row justify-between gap-10">
                  <div className="w-[50%]">
                    <Field
                      name="name"
                      label="Full Name"
                      type="text"
                      as={CustomInput}
                    />
                  </div>
                  <div className="w-[50%]">
                    <Field
                      name="email"
                      label="Email"
                      type="email"
                      as={CustomInput}
                    />
                  </div>
                </div>

                <div className="flex flex-row justify-between gap-10">
                  <div className="w-[50%]">
                    <Field
                      name="phone"
                      label="Phone"
                      type="number"
                      as={CustomInput}
                    />
                  </div>
                  <div className="w-[50%]">
                    <Field
                      name="experience"
                      label="Experience Level"
                      type="text"
                      as={CustomInput}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
                    Upload CV
                  </label>
                  <input
                    name="resume"
                    type="file"
                    className="border rounded px-3 py-2 w-full"
                    onChange={(event) =>
                      setFieldValue("resume", event.currentTarget.files[0])
                    }
                  />
                  {errors.resume && touched.resume && (
                    <div className="text-red-500 text-sm">{errors.resume}</div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
                    Portfolio Type
                  </label>
                  <Field
                    as="select"
                    name="portfolioType"
                    className="mt-1 block w-full p-2 bg-[#f2f5f8] dark:bg-gray-800 text-black dark:text-white border border-gray-300 rounded-md"
                  >
                    <option value="">Select Portfolio Type</option>
                    <option value="url">URL</option>
                    <option value="file">File Upload</option>
                  </Field>
                  {errors.portfolioType && touched.portfolioType && (
                    <div className="text-red-500 text-sm">
                      {errors.portfolioType}
                    </div>
                  )}
                </div>

                {values.portfolioType === "url" && (
                  <Field
                    name="portfolioUrl"
                    label="Portfolio URL"
                    type="text"
                    as={CustomInput}
                  />
                )}

                {values.portfolioType === "file" && (
                  <div className="space-y-2">
                    <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
                      Upload Portfolio
                    </label>
                    <input
                      name="portfolioFile"
                      type="file"
                      className="border rounded px-3 py-2 w-full"
                      onChange={(event) =>
                        setFieldValue(
                          "portfolioFile",
                          event.currentTarget.files[0]
                        )
                      }
                    />
                    {errors.portfolioFile && touched.portfolioFile && (
                      <div className="text-red-500 text-sm">
                        {errors.portfolioFile}
                      </div>
                    )}
                  </div>
                )}

                <Field
                  name="message"
                  label="Message"
                  isTextarea={true}
                  rows="4"
                  as={CustomInput}
                />

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 bg-gray-200 rounded dark:text-black"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    {isSubmitting ? "Submitting" : "Submit"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[80vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${hero})`,
          }}
        >
          <div className="absolute inset-0  bg-gradient-to-r from-gray-900 via-blue-900" />
        </div>

        <div className="relative h-full container mx-auto px-6 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-white text-sm font-medium">
                Join Our Team
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">We Seek </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500">
                Dreamers.
              </span>
            </h1>

            <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
              Discover our comprehensive range of services designed to transform
              your business and drive innovation in the digital age.
            </p>

            {/* <button className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg text-white font-medium hover:opacity-90 transition-all">
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button> */}
          </motion.div>
        </div>
      </div>
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
      <ApplyModal />
      <ScrollToTop />
    </div>
  );
};

export default Careers;
