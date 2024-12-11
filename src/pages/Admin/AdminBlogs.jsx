import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { CustomInput } from "../../globals/CustomInput";
import { blogValidationSchema } from "../../schemas/validationSchemas";

const AdminBlogs = () => {
  // Initial form values
  const initialValues = {
    title: "",
    category: "",
    tags: [],
    image: null,
    content: "",
  };

  const [previewImage, setPreviewImage] = useState(null);

  // Form submission handler
  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    try {
      console.log("Blog Data:", values);
      alert("Blog submitted successfully!");
      resetForm();
      setPreviewImage(null);
    } catch (error) {
      console.error("Submission error:", error);
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
    <div className="p-10">
      <h1 className="text-[30px] ml-5">Create a Blog</h1>
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
              {/* <div>
                <label className="block text-sm text-gray-700">Image</label>
                <input
                  type="file"
                  onChange={(event) => {
                    const file = event.currentTarget.files[0];
                    setFieldValue("image", file);
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => {
                        setPreviewImage(reader.result);
                      };
                      reader.readAsDataURL(file);
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
                      className="max-w-full h-auto rounded-md"
                    />
                  </div>
                )}
                <ErrorMessage
                  name="image"
                  component="span"
                  className="text-red-500 text-xs"
                />
              </div> */}

              {/* Image Upload */}
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
