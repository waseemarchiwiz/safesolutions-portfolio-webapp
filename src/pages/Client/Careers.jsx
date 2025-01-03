import React, { useEffect, useState } from "react";
import { Briefcase, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import CustomButton from "../../globals/CustomButton";
import ScrollToTop from "../../globals/ScrollToTop";
import axios from "axios";
import Lottie from "lottie-react";
import loaderAnimation from "../../assets/lottie/loadanimate.json"; // Path to your Lottie JSON file

const Careers = () => {
  const [careersData, setCareersData] = useState([]);
  const [loading, setLoading] = useState(true); // Loader state to track data fetching

  // Function to fetch career data from API
  const userUrl = import.meta.env.VITE_USER_URL;
  const api_token = import.meta.env.VITE_API_TOKEN;

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

  // Fetch careers when the component mounts
  useEffect(() => {
    fetchCareers();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div
        style={{
          backgroundImage:
            "url('https://www.cedar.com/wp-content/uploads/2022/06/About-Us-Images-052022-05.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "60vh",
        }}
      >
        <motion.div
          className="container mx-auto px-6 py-16 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold mb-4 text-indigo-500 mt-40">
            Join Our <span className="text-white">Team</span>
          </h1>
          <p className="text-white text-lg mt-10">
            Join our team and be part of an inspiring journey. Explore
            opportunities to grow, learn, and make an impact.
          </p>
        </motion.div>
      </div>

      <div className="min-h-screen bg-gray-50 dark:bg-[#18181b] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xl text-gray-600 dark:text-white max-w-2xl mx-auto">
              We're building something amazing and we want you to be part of it.
              Explore our open positions and start your career journey with us.
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
                  className="bg-white dark:bg-black p-6 rounded-lg  border-2  hover:shadow-lg hover:shadow-slate-500 transition-shadow duration-300"
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
                      // onClick={() => window.open(job.link, "_blank")}
                      to={job.link}
                      target="_blank"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
};

export default Careers;
