import { toast } from "react-toastify";
import apiInstance from "../../../../api-config";
import React, { useEffect, useState } from "react";
import CustomTable from "@/globals/CustomTable";
import * as Yup from "yup";
import { CustomInput } from "@/globals/CustomInput";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { Editor } from "@tinymce/tinymce-react";

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
    images: Yup.array()
      .of(
        Yup.mixed()
          .test("fileSize", "File too large", (value) =>
            value ? value.size <= 5000000 : true
          )
          .test("fileFormat", "Unsupported file type", (value) =>
            value
              ? ["image/jpg", "image/jpeg", "image/png", "image/gif"].includes(
                  value.type
                )
              : true
          )
      )
      .nullable(),
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
        images: completeBlogData?.images || [],
      });
      setOpenModal(true);
    } else {
      toast.error("Blog data not found");
    }
  };

  const handleUpdate = async (values) => {
    return;
    try {
      const formData = new FormData();
      formData.append("id", selectedBlog.id);
      formData.append("title", values.title);
      formData.append("shortDescription", values.shortDescription);
      formData.append("description", values.description);

      values.images.forEach((image, index) => {
        if (image.file) {
          formData.append(`images[${index}]`, image.file);
        }
      });

      await apiInstance.post("/update/blog", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          user_access_token: userToken,
        },
      });

      toast.success("Blog updated successfully");
      setOpenModal(false);
      fetchData();
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update blog");
    }
  };

  const EditModal = () => {
    if (!openModal || !selectedBlog) return null;

    const handleImageChange = (e, setFieldValue) => {
      const files = Array.from(e.target.files);
      const newImages = files.map((file) => ({
        id: Math.random(),
        image: URL.createObjectURL(file),
        file,
      }));
      setFieldValue("images", [...selectedBlog.images, ...newImages]);
    };

    const removeImage = (index, setFieldValue) => {
      const updatedImages = selectedBlog.images.filter((_, i) => i !== index);
      setFieldValue("images", updatedImages);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-lg w-full max-w-[50%]">
          <h2 className="text-2xl mb-4">Edit Blog</h2>
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
                    Images (Max 5)
                  </label>
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                    {values.images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image.file ? image.image : image}
                          alt={`Preview ${index + 1}`}
                          className="w-32 h-32 object-cover rounded-md"
                        />
                        <div>
                        src={image.file ? image.image : image}

                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(index, setFieldValue)}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/jpeg,image/png"
                    onChange={(e) => handleImageChange(e, setFieldValue)}
                    className="mt-1 block w-full p-2 bg-[#f0f1f2] text-black border border-gray-300 rounded-md"
                  />
                  <ErrorMessage
                    name="images"
                    component="div"
                    className="text-red-500 text-xs mt-1"
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

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setOpenModal(false);
                      setSelectedBlog(null);
                    }}
                    className="px-4 py-2 bg-gray-200 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                      isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  };

  return (
    <div>
      <CustomTable headers={headers} data={data} onEdit={handleEdit} />
      {EditModal()}
    </div>
  );
};
