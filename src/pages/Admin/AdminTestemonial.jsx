import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { CustomInput } from "@/globals/CustomInput";

import { testimonialSchema } from "@/schemas/validationSchemas";

// Define validation schema for the testimonial form

const AdminTestimonial = () => {
  const [preview, setPreview] = useState(null);

  const initialValues = {
    name: "",
    image: null,
    description: "",
    designation: "",
  };

  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    console.log("Testimonial Submitted:", values);
    setTimeout(() => {
      setSubmitting(false);
      resetForm();
      alert("Testimonial Submitted!");
      setPreview(null);
    }, 2000);
  };

  return (
    <div className="p-10">
      <h1 className="text-[30px] ml-5">Admin Testimonials</h1>
      <div className="bg-gray-100 mt-10 p-6 rounded-md shadow-md">
        <Formik
          initialValues={initialValues}
          validationSchema={testimonialSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field
                  name="name"
                  label="Name"
                  type="text"
                  placeholder="Enter Name"
                  as={CustomInput}
                />
                <Field
                  name="designation"
                  label="Designation"
                  type="text"
                  placeholder="Enter Designation"
                  as={CustomInput}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    className="mt-1 block w-full p-2 border rounded-md"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setFieldValue("image", file);
                      if (file) {
                        const objectUrl = URL.createObjectURL(file);
                        setPreview(objectUrl);
                      } else {
                        setPreview(null);
                      }
                    }}
                  />
                </div>
              </div>
              {preview && (
                <div className="mt-4">
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-64 object-cover w-64 rounded-md"
                  />
                </div>
              )}
              <Field
                name="description"
                label="Description"
                isTextarea={true}
                rows="6"
                placeholder="Enter Testimonial Description"
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

export default AdminTestimonial;
