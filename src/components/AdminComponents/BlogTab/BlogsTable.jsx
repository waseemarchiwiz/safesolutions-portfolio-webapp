import { toast } from "react-toastify";
import apiInstance from "../../../../api-config";
import React, { useEffect, useState } from "react";
import CustomTable from "@/globals/CustomTable";
import * as Yup from "yup";
import { CustomInput } from "@/globals/CustomInput";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { Editor } from "@tinymce/tinymce-react";

// Constants
const MAX_IMAGES = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/gif",
];

export const BlogsTable = () => {
  const [blogData, setBlogData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const editBlogValidationSchema = Yup.object().shape({
    title: Yup.string()
      .required("Title is required")
      .min(3, "Title must be at least 3 characters")
      .max(100, "Title must be less than 100 characters"),
    shortDescription: Yup.string()
      .required("Short description is required")
      .min(10, "Short description must be at least 10 characters")
      .max(200, "Short description must not exceed 200 characters"),
    description: Yup.string()
      .required("Content is required")
      .min(50, "Content must be at least 50 characters"),
  });

  const headers = ["ID", "Title", "Short Description"];
  const userToken = localStorage.getItem("apiusertoken");

  const fetchData = async () => {
    try {
      const response = await apiInstance.get("/get/blog", {
        headers: {
          "Content-Type": "multipart/form-data",
          user_access_token: userToken,
        },
      });
      setBlogData(response?.data?.blogs);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch blogs");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const data = blogData?.map((blog) => ({
    id: blog?.id,
    title: blog?.title,
    shortDescription: blog?.shortDescription,
  }));

  const handleEdit = (row) => {
    const completeBlogData = blogData.find((blog) => blog.id === row.id);
    if (completeBlogData) {
      setSelectedBlog({
        id: completeBlogData?.id,
        title: completeBlogData?.title,
        shortDescription: completeBlogData?.shortDescription,
        description: completeBlogData?.description,
        images:
          completeBlogData?.images?.map((img) => ({
            id: img.id,
            image: img.image,
            isExisting: true,
          })) || [],
      });
      setOpenModal(true);
    } else {
      toast.error("Blog data not found");
    }
  };

  const handleUpdate = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append("id", selectedBlog.id);
      formData.append("title", values.title);
      formData.append("shortDescription", values.shortDescription);
      formData.append("description", values.description);

      // Handle images
      values.images.forEach((image, index) => {
        if (image.file) {
          formData.append(`images[${index}]`, image.file);
        } else if (image.isExisting) {
          formData.append(`existingImages[${index}]`, image.image);
        }
      });

      await apiInstance.put(`/update/blog/${selectedBlog.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          user_access_token: userToken,
        },
      });

      toast.success("Blog updated successfully");
      setOpenModal(false);
      setSelectedBlog(null);
      fetchData();
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update blog");
    } finally {
      setSubmitting(false);
    }
  };

  const EditModal = () => {
    if (!openModal || !selectedBlog) return null;

    const validateImage = (file) => {
      if (file.size > MAX_FILE_SIZE) {
        toast.error("File too large");
        return false;
      }
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        toast.error("Unsupported file type");
        return false;
      }
      return true;
    };

    const handleImageChange = (e, setFieldValue, currentImages) => {
      const files = Array.from(e.target.files).filter(validateImage);

      if (currentImages.length + files.length > MAX_IMAGES) {
        toast.error(`Maximum ${MAX_IMAGES} images allowed`);
        return;
      }

      const newImages = files.map((file) => ({
        id: Math.random(),
        image: URL.createObjectURL(file),
        file,
      }));

      setFieldValue("images", [...currentImages, ...newImages]);
    };

    const removeImage = (index, setFieldValue, values) => {
      const updatedImages = [...values.images];
      if (updatedImages[index]?.file) {
        URL.revokeObjectURL(updatedImages[index].image);
      }
      updatedImages.splice(index, 1);
      setFieldValue("images", updatedImages);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-lg w-full max-w-2xl my-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Edit Blog</h2>
            <button
              onClick={() => {
                setOpenModal(false);
                setSelectedBlog(null);
              }}
              className="text-gray-500 hover:text-gray-700"
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
                      <div key={image.id} className="relative group">
                        <img
                          src={
                            image.file
                              ? image.image
                              : `https://safesolution-portfolio-backend-prod-h5h3g5fxa0bgfrcj.eastus-01.azurewebsites.net/${image.image}`
                          }
                          alt={`Preview ${index + 1}`}
                          className="w-32 h-32 object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            removeImage(index, setFieldValue, values)
                          }
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  {values.images.length < MAX_IMAGES && (
                    <input
                      type="file"
                      multiple
                      accept={ALLOWED_FILE_TYPES.join(",")}
                      onChange={(e) =>
                        handleImageChange(e, setFieldValue, values.images)
                      }
                      className="mt-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  )}
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
                    onClick={() => {
                      setOpenModal(false);
                      setSelectedBlog(null);
                    }}
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

  const handleDelete = async (row) => {
    console.log(row, "delete");
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the job posting "${row.title}"?`
    );
    if (!isConfirmed) return;
    try {
      await apiInstance.delete(`/delete/blog/${row.id}`, {
        headers: {
          user_access_token: userToken,
        },
      });
      setBlogData((prevBlog) =>
        prevBlog.filter((blog) => blog.id !== row.id)
      );
      toast.success("Job posting deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete job posting");
    }
  };

  return (
    <div>
      <CustomTable
        headers={headers}
        data={data}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {EditModal()}
    </div>
  );
};

export default BlogsTable;
