import React from "react";
import { toast } from "react-toastify";
import apiInstance from "../../../../api-config";

import { CustomInput } from "@/globals/CustomInput";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { Editor } from "@tinymce/tinymce-react";
import { editBlogValidationSchema } from "@/schemas/validationSchemas";

// Constants for image handling
const MAX_IMAGES = 5;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/gif",
];

const EditModal = ({ selectedBlog, onClose, onUpdate }) => {
  const userToken = localStorage.getItem("apiusertoken");

  const validateImage = (file) => {
    if (file.size > MAX_FILE_SIZE) {
      toast.error(
        `File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`
      );
      return false;
    }
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      toast.error("Unsupported file type. Please use JPG, PNG, or GIF");
      return false;
    }
    return true;
  };

  const handleImageChange = (e, setFieldValue, currentImages) => {
    const files = Array.from(e.target.files).filter(validateImage);

    if (files.length === 0) return;

    if (files.length + (currentImages?.length || 0) > MAX_IMAGES) {
      toast.error(`Maximum ${MAX_IMAGES} images allowed`);
      return;
    }

    currentImages.forEach((image) => {
      if (image.file) {
        URL.revokeObjectURL(image.image);
      }
    });

    const newImages = files.map((file) => ({
      id: Math.random().toString(),
      image: URL.createObjectURL(file),
      file: file,
      isNew: true,
    }));

    setFieldValue("images", newImages);
  };

  const handleUpdate = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append("id", selectedBlog.id);
      formData.append("title", values.title);
      formData.append("shortDescription", values.shortDescription);
      formData.append("description", values.description);

      if (values.images && values.images.length > 0) {
        const newImages = values.images.filter((img) => !img.isExisting);
        newImages.forEach((image) => {
          if (image.file) {
            formData.append("image", image.file);
          }
        });

        const existingImages = values.images.filter((img) => img.isExisting);
        if (existingImages.length > 0) {
          formData.append(
            "existingImageIds",
            JSON.stringify(existingImages.map((img) => img.id))
          );
        }
      }

      const response = await apiInstance.put(
        `/update/blog/${selectedBlog.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            user_access_token: userToken,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Blog updated successfully");
        onClose();
        onUpdate();
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error(error.response?.data?.message || "Failed to update blog");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-[#18181b] p-8 rounded-lg w-full max-w-[90%] md:max-w-[50%] overflow-y-auto max-h-[90vh] z-50">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Edit Blog</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-5xl"
          >
            ×
          </button>
        </div>

        <Formik
          initialValues={{
            title: selectedBlog?.title || "",
            shortDescription: selectedBlog.shortDescription || "",
            description: selectedBlog.description || "",
            images: selectedBlog.images || [],
          }}
          validationSchema={editBlogValidationSchema}
          onSubmit={handleUpdate}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form className="space-y-6">
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

              <div>
                <label className="block text-sm text-gray-700">
                  Images (Max {MAX_IMAGES})
                </label>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {values.images.map((image, index) => (
                    <div key={image.id || index} className="relative group">
                      <img
                        src={
                          image.file
                            ? image.image
                            : `https://safesolution-portfolio-backend-h6a6esaxema6g4hm.eastus-01.azurewebsites.net/${image.image}`
                        }
                        alt={`Preview ${index + 1}`}
                        className="w-32 h-32 object-cover rounded-md"
                      />
                    </div>
                  ))}
                </div>
                <input
                  type="file"
                  multiple
                  accept={ALLOWED_FILE_TYPES.join(",")}
                  onChange={(e) =>
                    handleImageChange(e, setFieldValue, values.images)
                  }
                  className="mt-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

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
                      "advlist autolink lists link image charmap preview anchor",
                      "searchreplace visualblocks code fullscreen",
                      "insertdatetime media table code help wordcount",
                    ],
                    toolbar:
                      "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                  }}
                  value={values.description}
                  onEditorChange={(content) =>
                    setFieldValue("description", content)
                  }
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Updating..." : "Update Blog"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditModal;
