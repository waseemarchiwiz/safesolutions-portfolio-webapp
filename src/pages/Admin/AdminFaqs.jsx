import React from "react";
import { Formik, Form, Field } from "formik";

import { CustomInput } from "@/globals/CustomInput"; // Assuming you have a custom input component
import { faqSchema } from "@/schemas/validationSchemas";

// Define the validation schema for the FAQ form

const AdminFaqs = () => {
  const initialValues = {
    question: "",
    answer: "",
  };

  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    console.log("FAQ Submitted:", values);
    setTimeout(() => {
      setSubmitting(false);
      resetForm();
      alert("FAQ Submitted!");
    }, 2000);
  };

  return (
    <div className="p-10">
      <h1 className="text-[30px] ml-5">Add FAQ</h1>
      <div className="bg-gray-100 mt-10 p-6 rounded-md shadow-md">
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
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              >
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
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AdminFaqs;
