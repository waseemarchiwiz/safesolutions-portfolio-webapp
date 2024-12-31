import CustomTable from "@/globals/CustomTable";
import axios from "axios";
import apiUrl from "../../../../baseUrl";
import { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import { blogValidationSchema } from "@/schemas/validationSchemas";
import { CustomInput } from "@/globals/CustomInput";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { toast } from "react-toastify";
import apiInstance from "../../../../api-config";
import * as Yup from "yup";

export const BlogsTable = () => {
  const [blogData, setBlogData] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const headers = ["ID", "Image", "Title", "Category", "Tags", "Description"];
  const userToken = localStorage.getItem("apiusertoken");

  const editBlogValidationSchema = Yup.object().shape({
    title: Yup.string()
      .required("Title is required")
      .min(3, "Title must be at least 3 characters")
      .max(100, "Title must be less than 100 characters"),
    category: Yup.string().required("Category is required"),
    tags: Yup.array()
      .min(1, "At least one tag is required")
      .of(
        Yup.object().shape({
          label: Yup.string().required(),
          value: Yup.string().required(),
        })
      ),
    description: Yup.string()
      .required("Description is required")
      .min(10, "Description must be at least 10 characters"),
    image: Yup.mixed()
      .test("fileSize", "File too large", function (value) {
        if (!value) return true;
        return value && value.size <= 5000000;
      })
      .test("fileFormat", "Unsupported file type", function (value) {
        if (!value) return true;
        return (
          value &&
          ["image/jpg", "image/jpeg", "image/png", "image/gif"].includes(
            value.type
          )
        );
      }),
  });

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

  const parseTags = (tags) => {
    try {
      if (Array.isArray(tags)) {
        return tags;
      }
      if (
        tags &&
        typeof tags === "string" &&
        tags.startsWith("[") &&
        tags.endsWith("]")
      ) {
        return JSON.parse(tags);
      }
      if (tags && typeof tags === "string") {
        return tags.split(",").map((tag) => tag.trim());
      }
      return [];
    } catch (error) {
      console.error("Error parsing tags:", error);
      return [];
    }
  };

  const data = blogData.map((blog) => ({
    id: blog.id,
    image: (
      <img
        src={`https://safesolution-portfolio-backend-prod-h5h3g5fxa0bgfrcj.eastus-01.azurewebsites.net/${blog.image}`}
        alt={blog.title}
        width={80}
        className="rounded-[50%]"
      />
    ),
    title: blog.title,
    category: blog.category,
    tags: parseTags(blog.tags).map((tag) => `#${tag}`),
    description: blog.description,
  }));

  const categoryOptions = [
    { value: "technology", label: "Technology" },
    { value: "science", label: "Science" },
    { value: "art", label: "Art" },
  ];

  const handleDelete = async (row) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the blog "${row.title}"?`
    );

    if (!isConfirmed) return;

    try {
      await apiInstance.delete(`/delete/blog/${row.id}`, {
        headers: {
          user_access_token: userToken,
        },
      });
      setBlogData((prevBlog) => prevBlog.filter((blog) => blog.id !== row.id));
      toast.success("Blog deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete blog");
    }
  };

  const handleEdit = (row) => {
    setSelectedBlog(row);
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (values, { setSubmitting, resetForm }) => {
    try {
      const formattedTags = values.tags.map((tag) => tag.value);
      const formData = new FormData();

      formData.append("title", values.title);
      formData.append("category", values.category);
      formData.append("description", values.description);
      formData.append("tags[]", JSON.stringify(formattedTags));

      if (values.image) {
        formData.append("image", values.image);
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

      if (response.data) {
        // Update the local state with the new data
        setBlogData((prevBlogs) =>
          prevBlogs.map((blog) =>
            blog.id === selectedBlog.id
              ? {
                  ...blog,
                  title: values.title,
                  category: values.category,
                  description: values.description,
                  tags: formattedTags,
                  image: response.data.image || blog.image, // Use new image if provided, otherwise keep existing
                }
              : blog
          )
        );

        toast.success("Blog updated successfully!");
        setIsEditModalOpen(false);
        resetForm();
        setSelectedBlog(null);

        // Refresh the data to ensure we have the latest version
        await fetchData();
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update blog");
    } finally {
      setSubmitting(false);
    }
  };

  const EditModal = () => {
    if (!isEditModalOpen || !selectedBlog) return null;

    const initialTags = selectedBlog.tags.map((tag) => ({
      label: tag.replace("#", ""),
      value: tag.replace("#", ""),
    }));

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-lg w-full max-w-[50%]">
          <h2 className="text-2xl mb-4">Edit Blog</h2>
          <Formik
            initialValues={{
              title: selectedBlog.title || "",
              category: selectedBlog.category || "",
              tags: initialTags,
              image: "",
              description: selectedBlog.description || "",
            }}
            validationSchema={editBlogValidationSchema}
            onSubmit={handleUpdate}
          >
            {({ isSubmitting, setFieldValue, values, errors, touched }) => (
              <Form className="space-y-4">
                <Field
                  name="title"
                  label="Title"
                  type="text"
                  as={CustomInput}
                />

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
                  {errors.category && touched.category && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.category}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Tags
                  </label>
                  <CreatableSelect
                    isMulti
                    value={values.tags}
                    onChange={(selectedOptions) =>
                      setFieldValue("tags", selectedOptions)
                    }
                    options={[]}
                    placeholder="Add or create tags"
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                  {errors.tags && touched.tags && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.tags}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      setFieldValue("image", file);
                    }}
                    className="mt-1 block w-full p-2 border rounded-md"
                  />
                  {errors.image && touched.image && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.image}
                    </div>
                  )}
                </div>

                <Field
                  name="description"
                  label="Description"
                  isTextarea={true}
                  as={CustomInput}
                />

                <div className="flex justify-end space-x-2 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setSelectedBlog(null);
                    }}
                    className="px-4 py-2 bg-gray-200 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
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

  return (
    <>
      <CustomTable
        headers={headers}
        data={data}
        onEdit={handleEdit}
        onDelete={handleDelete}
        itemsPerPage={5}
      />
      <EditModal />
    </>
  );
};
