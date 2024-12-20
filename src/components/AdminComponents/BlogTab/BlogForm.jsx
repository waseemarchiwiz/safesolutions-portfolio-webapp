import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { CustomInput } from "../../../globals/CustomInput";
import { blogValidationSchema } from "../../../schemas/validationSchemas";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import axios from "axios";
import apiUrl from "../../../../baseUrl";
import { toast } from "react-toastify";
export const BlogForm = () => {
  // Initial form values
  const initialValues = {
    title: "",
    category: "",
    tags: [],
    image: null,
    description: "",
  };

  const [previewImage, setPreviewImage] = useState(null);

  // Form submission handler
  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    console.log(values, "valuess");
    // Ensure tags is an array or an empty array if not
    const formattedTags = Array.isArray(values.tags) ? values.tags : [];

    // Convert tags to a JSON string
    const formattedTagsString = JSON.stringify(formattedTags);

    console.log(formattedTagsString); // Logs the correctly formatted tags array

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("category", values.category);
    formData.append("description", values.description);
    formData.append("tags[]", formattedTagsString); // Convert array to JSON string for Postman

    if (values.image) {
      formData.append("image", values.image);
    }

    try {
      const response = await axios.post(`${apiUrl}/store/blog`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response.data, "blog form values");
      if (response?.data?.succes) {
        toast.success("Blog Added Successfully");
        resetForm();
      } else {
        toast.error("Failed to add blog");
      }
    } catch (e) {
      console.error("Error submitting form:", e.response?.data || e.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Category options for the dropdown
  const categoryOptions = [
    { value: "technology", label: "Technology" },
    { value: "science", label: "Science" },
    { value: "art", label: "Art" },
  ];

  return (
    <div className="bg-gray-100 mt-10 p-6 rounded-md shadow-md">
      <Formik
        initialValues={initialValues}
        validationSchema={blogValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form className="space-y-6">
            {/* Title */}
            <Field
              name="title"
              label="Title"
              type="text"
              placeholder="Title"
              as={CustomInput}
            />

            {/* Category Dropdown */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Category
              </label>
              <Select
                options={categoryOptions}
                className="basic-single-select"
                classNamePrefix="select"
                onChange={(selectedOption) =>
                  setFieldValue(
                    "category",
                    selectedOption ? selectedOption.value : ""
                  )
                }
                value={categoryOptions.find(
                  (option) => option.value === values.category
                )}
                placeholder="Select Category"
              />
              <ErrorMessage
                name="category"
                component="span"
                className="text-red-500 text-xs"
              />
            </div>

            {/* Tags Input */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">Tags</label>
              <CreatableSelect
                isMulti
                onChange={(selectedOptions) =>
                  setFieldValue(
                    "tags",
                    selectedOptions
                      ? selectedOptions.map((option) => option.value)
                      : []
                  )
                }
                value={values.tags.map((tag) => ({ label: tag, value: tag }))}
                placeholder="Add tags"
              />
              <ErrorMessage
                name="tags"
                component="span"
                className="text-red-500 text-xs"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm text-gray-700">Image</label>
              <input
                type="file"
                onChange={(event) => {
                  const file = event.currentTarget.files[0];
                  setFieldValue("image", file);

                  if (file) {
                    // Create a blob URL for the image preview
                    const objectUrl = URL.createObjectURL(file);
                    setPreviewImage(objectUrl);

                    // Clean up the object URL when no longer needed
                    return () => URL.revokeObjectURL(objectUrl);
                  } else {
                    setPreviewImage(null);
                  }
                }}
                className="mt-1 block w-full p-2 bg-[#f0f1f2] text-black border border-gray-300 rounded-md"
              />
              {previewImage && (
                <div className="mt-4">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-64 h-64 rounded-md"
                  />
                </div>
              )}
              <ErrorMessage
                name="image"
                component="span"
                className="text-red-500 text-xs"
              />
            </div>

            {/* Content */}
            <Field
              name="description"
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
