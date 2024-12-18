import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { CustomInput } from "../../../globals/CustomInput";
import { faqSchema } from "../../../schemas/validationSchemas";
import CreatableSelect from "react-select/creatable";
import apiUrl from "../../../../baseUrl";
import { toast } from "react-toastify";
import axios from "axios";
const FaqsForm = () => {
  const initialValues = {
    question: "",
    answer: "",
  };

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    console.log("Values being sent:", values); // Log the data being sent
    console.log("API URL:", `${apiUrl}/store/faq`); // Log the API endpoint

    try {
      const response = await axios.post(`${apiUrl}/store/faq`, values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response, "Faq1 Response");

      if (response.data.succes === true) {
        toast.success(response.data.message || "Faq Added Successfully");
        resetForm(); // Optional: Reset the form after successful submission
      } else {
        toast.error(response.data.message || "Failed to add Faq");
      }
    } catch (error) {
      console.error("Error details:", error); // Log error details
      toast.error(error.response?.data?.message || "Failed to add Faq");
    } finally {
      setSubmitting(false); // Ensure the form submission state is reset
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={faqSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-6">
          <Field
            name="question"
            label="Question"
            type="text"
            placeholder="Enter the question"
            as={CustomInput}
          />
          <Field
            name="answer"
            label="Answer"
            isTextarea={true}
            rows="6"
            placeholder="Enter the answer"
            as={CustomInput}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className={`group relative h-[40px] inline-block overflow-hidden border rounded-lg text-white bg-black border-[#2170B7] px-6 md:px-8 py-[6px] focus:outline-none focus:ring ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <span className="absolute inset-y-0 left-0 w-[2px] bg-[#2170B7] transition-all group-hover:w-full group-active:bg-[#2170B7]"></span>
            <span className="relative text-sm font-medium text-white transition-colors">
              {isSubmitting ? (
                <div className="flex justify-center items-center">
                  <svg
                    className="w-5 h-5 mr-2 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 1116 0A8 8 0 014 12z"
                    ></path>
                  </svg>
                  Loading...
                </div>
              ) : (
                "Submit"
              )}
            </span>
          </button>
        </Form>
      )}
    </Formik>
  );
};
export default FaqsForm;
