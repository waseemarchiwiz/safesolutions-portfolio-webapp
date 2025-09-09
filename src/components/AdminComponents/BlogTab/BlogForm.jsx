import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { CustomInput } from "../../../globals/CustomInput";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";
import apiInstance from "../../../../api-config";
import { blogValidationSchema } from "../../../schemas/validationSchemas";

export const BlogForm = () => {
  const initialValues = {
    title: "",
    shortDescription: "",
    description: "",
    images: [],
  };

  const [previewImages, setPreviewImages] = useState([]);

  const userToken = localStorage.getItem("apiusertoken");

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    console.log("Form Values:", {
      title: values.title,
      shortDescription: values.shortDescription,
      description: values.description,
      numberOfImages: values.images.length,
    });

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("shortDescription", values.shortDescription);
    formData.append("description", values.description);

    // Append multiple images
    values.images.forEach((image) => {
      formData.append(`image`, image);
    });

    try {
      const response = await apiInstance.post(`/store/blog`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          user_access_token: userToken,
        },
      });

      if (response?.data?.succes) {
        toast.success("Blog Added Successfully");
        resetForm();
        setPreviewImages([]);
      } else {
        toast.error("Failed to add blog");
      }
    } catch (e) {
      console.error("Error submitting form:", e.response?.data || e.message);
      toast.error("An error occurred while submitting the form.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageChange = (event, setFieldValue) => {
    const files = Array.from(event.currentTarget.files);

    // Validate number of files
    if (files.length > 5) {
      toast.error("Maximum 5 images allowed");
      return;
    }

    setFieldValue("images", files);

    // Clear previous preview URLs to avoid memory leaks
    previewImages.forEach((url) => URL.revokeObjectURL(url));

    // Create preview URLs for all selected images
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previewUrls);
  };

  // Cleanup preview URLs when component unmounts
  React.useEffect(() => {
    return () => {
      previewImages.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

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
            <div>
              <Field
                name="title"
                label="Title"
                type="text"
                placeholder="Enter blog title"
                as={CustomInput}
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-sm text-gray-700">
                Short Description
              </label>
              <Field
                as="textarea"
                name="shortDescription"
                placeholder="Enter a brief description"
                className="mt-1 block w-full p-2 bg-[#f0f1f2] text-black border border-gray-300 rounded-md"
                rows="3"
              />
              <ErrorMessage
                name="shortDescription"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {/* Multiple Images Upload */}
            <div>
              <label className="block text-sm text-gray-700">
                Images (Max 5)
              </label>
              <input
                type="file"
                multiple
                accept="image/jpeg,image/png"
                onChange={(e) => handleImageChange(e, setFieldValue)}
                className="mt-1 block w-full p-2 bg-[#f0f1f2] text-black border border-gray-300 rounded-md"
              />
              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                {previewImages.map((preview, index) => (
                  <img
                    key={index}
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-32 h-32 object-cover rounded-md"
                  />
                ))}
              </div>
              <ErrorMessage
                name="images"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {/* TinyMCE Editor */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Content
              </label>
              <Editor
                apiKey="25rzjhemppnwou2xw3w23icnmyrsexpc58qunidx0vh7uvgu"
                init={{
                  height: 300,
                  menubar: true,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                  ],
                  toolbar:
                    "undo redo | formatselect | " +
                    "bold italic backcolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                }}
                value={values.description}
                onEditorChange={(content) => {
                  setFieldValue("description", content);
                  console.log("Editor content:", content);
                }}
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

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
                {isSubmitting ? "Submitting..." : "Submit"}
              </span>
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BlogForm;
