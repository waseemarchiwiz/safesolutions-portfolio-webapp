import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { CustomInput } from "@/globals/CustomInput";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

const BlogModal = ({ openModal, selectedBlog, onClose, onUpdate }) => {
  if (!openModal || !selectedBlog) return null;

  const initialValues = {
    title: selectedBlog.title || "",
    shortDescription: selectedBlog.shortDescription || "",
    description: selectedBlog.description || "",
    images: selectedBlog.images || [],
  };

  const handleUpdate = async (values, { setSubmitting }) => {
    try {
      // Create form data for the API call
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("shortDescription", values.shortDescription);
      formData.append("description", values.description);

      // Append existing images that weren't changed
      if (values.images) {
        values.images.forEach((image, index) => {
          if (image instanceof File) {
            formData.append(`images`, image);
          }
        });
      }

      const userToken = localStorage.getItem("apiusertoken");

      await apiInstance.put(`/update/blog/${selectedBlog.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          user_access_token: userToken,
        },
      });

      toast.success("Blog updated successfully");
      onClose();
      onUpdate(); // Refresh the blog list
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update blog");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Edit Blog</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={editBlogValidationSchema}
          onSubmit={handleUpdate}
        >
          {({ isSubmitting, setFieldValue, values, errors, touched }) => (
            <Form className="space-y-6">
              <div>
                <Field
                  name="title"
                  label="Title"
                  type="text"
                  component={CustomInput}
                />
              </div>

              <div>
                <Field
                  name="shortDescription"
                  label="Short Description"
                  type="text"
                  component={CustomInput}
                  as="textarea"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <Editor
                  apiKey="your-tinymce-api-key"
                  value={values.description}
                  onEditorChange={(content) => {
                    setFieldValue("description", content);
                  }}
                  init={{
                    height: 400,
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
                />
                {errors.description && touched.description && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.description}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Images
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(event) => {
                    const files = Array.from(event.currentTarget.files);
                    setFieldValue("images", files);
                  }}
                  className="mt-1 block w-full"
                />
                {errors.images && touched.images && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.images}
                  </div>
                )}
                {/* Display existing images */}
                <div className="grid grid-cols-4 gap-4 mt-4">
                  {selectedBlog.images &&
                    selectedBlog.images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image}
                          alt={`Blog image ${index + 1}`}
                          className="w-full h-24 object-cover rounded"
                        />
                      </div>
                    ))}
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
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

export default BlogModal;
