import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { CustomInput } from "../../globals/CustomInput";
import { blogValidationSchema } from "../../schemas/validationSchemas";

const AdminBlogs = () => {
  // Initial form values
  const initialValues = {
    title: "",
    name: "",
    date: "",
    technology: "",
    image: null,
    content: "",
  };

  // Form submission handler
  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    try {
      console.log("Blog Data:", values);
      alert("Blog submitted successfully!");
      resetForm();
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-[30px] ml-5">Create a Blog</h1>
      <div className="bg-gray-100 mt-10 p-6 rounded-md shadow-md">
        <Formik
          initialValues={initialValues}
          validationSchema={blogValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="space-y-6">
              {/* Title and Name */}
              <div className="font-sans  grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field
                  name="title"
                  label="Title"
                  type="text"
                  placeholder="Title"
                  as={CustomInput}
                />
                <Field
                  name="name"
                  label="Name"
                  type="text"
                  placeholder="Enter Your Name"
                  as={CustomInput}
                />
              </div>

              {/* Date and Technology */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
                <Field name="date" label="Date" type="date" as={CustomInput} />
                <Field
                  name="technology"
                  label="Technology"
                  type="text"
                  placeholder="Enter Technology"
                  as={CustomInput}
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Image
                </label>
                <input
                  type="file"
                  onChange={(event) => {
                    setFieldValue("image", event.currentTarget.files);
                  }}
                  className="mt-1 block w-full p-2 bg-[#f0f1f2] text-black border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="image"
                  component="span"
                  className="text-red-500 text-xs"
                />
              </div>

              {/* Content */}
              <Field
                name="content"
                label="Content"
                isTextarea={true}
                rows="6"
                placeholder="Write your thoughts"
                as={CustomInput}
              />

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AdminBlogs;
