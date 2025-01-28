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
import ContactHero from "@/components/AdminComponents/ContactComponents/ContactHero";
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
          ...values,
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
        <ContactHero />
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
