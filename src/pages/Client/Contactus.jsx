import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CustomButton from "../../globals/CustomButton";
import ScrollToTop from "../../globals/ScrollToTop";
import { Formik, Form, Field } from "formik";

import { CustomInput } from "@/globals/CustomInput";
import { contactValidationSchema } from "@/schemas/validationSchemas";
import axios from "axios";
import { toast } from "react-toastify";
import SEOComponent from "@/components/SEOComponent";
const Contactus = () => {
  const [emails, setEmails] = useState([]);
  const [selectEmail, setSelectedEmail] = useState("");
  const initialValues = {
    name: "",
    subject: "",
    email: "",
    message: "",
  };
  const userUrl = import.meta.env.VITE_USER_URL;
  const api_token = import.meta.env.VITE_API_TOKEN;

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
  
  useEffect(() => {
    // fetch emails when component mounts
    fetchEmails();
  }, []);

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    console.log(values);

    try {
      const response = await axios.post(
        `${userUrl}/contact`,
        {
          ...values, // Include all values from the form
          sender_email: selectEmail, // Add the selected email to the request body
        },
        {
          headers: {
            "Content-Type": "application/json",
            api_token: api_token,
          },
        }
      );
      if (response?.data?.success) {
        toast.success(response?.data?.message || "message sent successfully");
        resetForm();
        setSubmitting(false);
      } else {
        toast.error(response?.data?.message || "Failed to send message");
      }
      console.log(response);
    } catch (error) {}
  };
  console.log(selectEmail, "selectemail");
  return (
    <>
      <SEOComponent
        title="Get In Touch | contact "
        description="We are always ready to help you"
        keywords="Have a specific inquiry or looking.,Message"
      />

      <div className="bg-[#FFFFFF] dark:bg-black dark:text-gray-200">
        <div className="relative  min-h-[85vh] flex items-center py-14 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
          {/* Animated grid background */}
          <div
            className="absolute inset-0 overflow-hidden hidden sm:block"
            style={{
              backgroundImage: `linear-gradient(transparent 0%, transparent calc(100% - 1px), rgba(255, 255, 255, 0.1) calc(100% - 1px)),
                         linear-gradient(90deg, transparent 0%, transparent calc(100% - 1px), rgba(255, 255, 255, 0.1) calc(100% - 1px))`,
              backgroundSize: "50px 50px",
              opacity: 0.2,
            }}
          />

          {/* Enhanced glowing orbs with better blend modes */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-[128px] mix-blend-screen hidden sm:block" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-[128px] mix-blend-screen hidden sm:block" />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px] mix-blend-screen hidden sm:block" />
          <div className="relative w-full container mx-auto px-4 mt-10 sm:px-6 lg:px-8 py-20">
            {/* Tech decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-px h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    opacity: 0.1,
                    animation: `moveUpDown ${
                      5 + Math.random() * 5
                    }s linear infinite`,
                    animationDelay: `${Math.random() * 5}s`,
                  }}
                />
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-white/90"> Contact us</span>
                </div>

                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  <span className="text-white">We are always ready </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500">
                    to help you
                  </span>
                </h1>

                <p className="text-lg text-gray-200 mb-8 max-w-xl">
                  Learn who we are and why we excel in delivering innovative
                  solutions that drive business growth and digital
                  transformation.
                </p>

                {/* Service cards */}
              </motion.div>

              {/* Right content - 3D Grid */}
            </div>
          </div>

          {/* Add some CSS animations */}
          <style jsx>{`
            @keyframes moveUpDown {
              0%,
              100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(100px);
              }
            }
            @keyframes float {
              0%,
              100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-20px);
              }
            }
          `}</style>
        </div>
        <div className=" p-10">
          <div className="grid md:grid-cols-2 gap-16 items-center relative overflow-hidden p-8 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-3xl max-w-6xl mx-auto bg-[#FFFFFF] dark:bg-black mt-4   before:absolute before:right-0 before:w-[300px] before:bg-blue-400 before:h-full max-md:before:hidden">
            <div>
              <h2 className="text-gray-800 dark:text-white text-3xl font-extrabold">
                Get In Touch
              </h2>
              <p className="text-sm text-gray-500 mt-4 leading-relaxed">
                Have a specific inquiry or looking to explore new opportunities?
                Our experienced team is ready to engage with you.
              </p>

              <div className="mt-10 w-full">
                <select
                  onChange={(e) => {
                    console.log("Selected email:", e.target.value);
                    setSelectedEmail(e.target.value);
                  }}
                  className="mt-1 font-sans block w-full p-2 bg-[#f2f5f8] dark:bg-gray-800 text-black dark:text-white border border-gray-300 rounded-md"
                >
                  <option value="">Select your preferred Email</option>

                  {emails &&
                    emails.length > 0 &&
                    emails.map((item, index) => (
                      <option key={index} value={item.email}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>

              <Formik
                initialValues={initialValues}
                validationSchema={contactValidationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form>
                    <div className="space-y-4 mt-8">
                      <Field
                        name="name"
                        label="Full Name"
                        type="text"
                        placeholder="Enter Full Name"
                        as={CustomInput}
                      />
                      {errors.fullName && touched.fullName && (
                        <div className="text-red-600">{errors.fullName}</div>
                      )}

                      <Field
                        name="subject"
                        label="Subject"
                        type="text"
                        placeholder="Subject"
                        as={CustomInput}
                      />
                      {errors.subject && touched.subject && (
                        <div className="text-red-600">{errors.subject}</div>
                      )}

                      <Field
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="Enter your email address"
                        as={CustomInput}
                      />
                      {errors.email && touched.email && (
                        <div className="text-red-600">{errors.email}</div>
                      )}

                      <Field
                        name="message"
                        label="Message"
                        isTextarea={true}
                        rows="6"
                        placeholder="Write your thoughts"
                        as={CustomInput}
                      />
                      {errors.message && touched.message && (
                        <div className="text-red-600">{errors.message}</div>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`group relative h-[40px] inline-block overflow-hidden border rounded-lg text-white bg-black border-indigo-600 px-6 md:px-8 py-[6px] focus:outline-none focus:ring ${
                          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        {isSubmitting ? "Submitting..." : "Submit"}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>

              {/* <ul className="mt-4 flex flex-wrap justify-center gap-6">
              <li className="flex items-center text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16px"
                  height="16px"
                  fill="currentColor"
                  viewBox="0 0 479.058 479.058"
                >
                  <path
                    d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z"
                    data-original="#000000"
                  />
                </svg>
                <a href="javascript:void(0)" className="text-sm ml-4">
                  <strong>info@example.com</strong>
                </a>
              </li>
              <li className="flex items-center text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16px"
                  height="16px"
                  fill="currentColor"
                  viewBox="0 0 482.6 482.6"
                >
                  <path
                    d="M98.339 320.8c47.6 56.9 104.9 101.7 170.3 133.4 24.9 11.8 58.2 25.8 95.3 28.2 2.3.1 4.5.2 6.8.2 24.9 0 44.9-8.6 61.2-26.3.1-.1.3-.3.4-.5 5.8-7 12.4-13.3 19.3-20 4.7-4.5 9.5-9.2 14.1-14 21.3-22.2 21.3-50.4-.2-71.9l-60.1-60.1c-10.2-10.6-22.4-16.2-35.2-16.2-12.8 0-25.1 5.6-35.6 16.1l-35.8 35.8c-3.3-1.9-6.7-3.6-9.9-5.2-4-2-7.7-3.9-11-6-32.6-20.7-62.2-47.7-90.5-82.4-14.3-18.1-23.9-33.3-30.6-48.8 9.4-8.5 18.2-17.4 26.7-26.1 3-3.1 6.1-6.2 9.2-9.3 10.8-10.8 16.6-23.3 16.6-36s-5.7-25.2-16.6-36l-29.8-29.8c-3.5-3.5-6.8-6.9-10.2-10.4-6.6-6.8-13.5-13.8-20.3-20.1-10.3-10.1-22.4-15.4-35.2-15.4-12.7 0-24.9 5.3-35.6 15.5l-37.4 37.4c-13.6 13.6-21.3 30.1-22.9 49.2-1.9 23.9 2.5 49.3 13.9 80 17.5 47.5 43.9 91.6 83.1 138.7zm-72.6-216.6c1.2-13.3 6.3-24.4 15.9-34l37.2-37.2c5.8-5.6 12.2-8.5 18.4-8.5 6.1 0 12.3 2.9 18 8.7 6.7 6.2 13 12.7 19.8 19.6 3.4 3.5 6.9 7 10.4 10.6l29.8 29.8c6.2 6.2 9.4 12.5 9.4 18.7s-3.2 12.5-9.4 18.7c-3.1 3.1-6.2 6.3-9.3 9.4-9.3 9.4-18 18.3-27.6 26.8l-.5.5c-8.3 8.3-7 16.2-5 22.2.1.3.2.5.3.8 7.7 18.5 18.4 36.1 35.1 57.1 30 37 61.6 65.7 96.4 87.8 4.3 2.8 8.9 5 13.2 7.2 4 2 7.7 3.9 11 6 .4.2.7.4 1.1.6 3.3 1.7 6.5 2.5 9.7 2.5 8 0 13.2-5.1 14.9-6.8l37.4-37.4c5.8-5.8 12.1-8.9 18.3-8.9 7.6 0 13.8 4.7 17.7 8.9l60.3 60.2c12 12 11.9 25-.3 37.7-4.2 4.5-8.6 8.8-13.3 13.3-7 6.8-14.3 13.8-20.9 21.7-11.5 12.4-25.2 18.2-42.9 18.2-1.7 0-3.5-.1-5.2-.2-32.8-2.1-63.3-14.9-86.2-25.8-62.2-30.1-116.8-72.8-162.1-127-37.3-44.9-62.4-86.7-79-131.5-10.3-27.5-14.2-49.6-12.6-69.7z"
                    data-original="#000000"
                  />
                </svg>
                <a href="javascript:void(0)" className="text-sm ml-4">
                  <strong>+158 996 888</strong>
                </a>
              </li>
            </ul> */}
            </div>
            <div className="z-10 relative h-full max-md:min-h-[350px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3523.017166976897!2d-82.4013096878559!3d27.99337117591978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88c2c5a705cc0d59%3A0x2f450356ee611c06!2s5187%20Shadowlawn%20Ave%2C%20Tampa%2C%20FL%2033610%2C%20USA!5e0!3m2!1sen!2s!4v1736933560082!5m2!1sen!2s"
                className="left-0 top-0 h-full w-full rounded-t-lg lg:rounded-tr-none lg:rounded-bl-lg"
                allowfullscreen=""
                loading="lazy"
                // referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
        <ScrollToTop />
      </div>
    </>
  );
};

export default Contactus;
