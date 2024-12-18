import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { CustomInput } from "../../../globals/CustomInput";
import { projectValidationSchema } from "../../../schemas/validationSchemas";
import axios from "axios";
import apiUrl from "../../../../baseUrl";
import { toast } from "react-toastify";

const ProjectForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    projectName: "",
    projectDescription: "",
    projectUrl: "",
    projectImage: null,
  };

  const handleSubmit = async (values, { resetForm }) => {
    // Start submission process
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", values.projectName);
    formData.append("description", values.projectDescription);
    formData.append("link", values.projectUrl);

    // Append image if exists
    if (values.projectImage) {
      formData.append("image", values.projectImage);
    }

    try {
      const response = await axios.post(`${apiUrl}/store/project`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Check the exact structure of your response
      console.log("Response:", response.data);

      if (response.data.succes === true || response.status === 200) {
        // Success toast
        toast.success("Project added successfully!");

        resetForm();
      } else {
        // Error toast for unsuccessful response
        toast.error("Failed to add project");
      }
    } catch (error) {
      // Error toast for network or server errors
      console.error("Error:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "An error occurred while adding the project"
      );
    } finally {
      // Always stop submitting
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100 mt-10 p-6 rounded-md shadow-md">
      <Formik
        initialValues={initialValues}
        validationSchema={projectValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="space-y-6">
            <div className="font-sans grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field
                name="projectName"
                label="Project Name"
                type="text"
                placeholder="Enter project name"
                as={CustomInput}
              />
              <Field
                name="projectUrl"
                label="Project URL"
                type="text"
                placeholder="Enter project URL"
                as={CustomInput}
              />
            </div>
            <Field
              name="projectDescription"
              label="Project Description"
              isTextarea={true}
              rows="6"
              placeholder="Describe the project"
              as={CustomInput}
            />
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Project Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(event) =>
                  setFieldValue("projectImage", event.target.files[0])
                }
                className="mt-1 block w-full p-2 border rounded-md"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`group relative h-[40px] inline-block overflow-hidden border rounded-lg text-white bg-black border-indigo-600 px-6 md:px-8 py-[6px] focus:outline-none focus:ring ${
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
    </div>
  );
};

export default ProjectForm;
