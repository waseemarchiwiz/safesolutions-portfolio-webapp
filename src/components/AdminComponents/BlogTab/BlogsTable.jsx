// import CustomTable from "@/globals/CustomTable";
// import axios from "axios";
// import apiUrl from "../../../../baseUrl";
// import { useEffect, useState } from "react";
// import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
// import { blogValidationSchema } from "@/schemas/validationSchemas";
// import { CustomInput } from "@/globals/CustomInput";
// import CreatableSelect from "react-select/creatable";
// import Select from "react-select";

// export const BlogsTable = () => {
//   const [blogData, setBlogData] = useState([]);
//   const [selectedBlog, setSelectedBlog] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [previewImage, setPreviewImage] = useState("");
//   const headers = ["ID", "Image", "Title", "Category", "Tags"];

//   const FetchData = async () => {
//     try {
//       const response = await axios.get(`${apiUrl}/get/blog`);

//       setBlogData(response?.data?.blogs);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     FetchData();
//   }, []);

//   // Helper function to safely parse tags

//   const parseTags = (tags) => {
//     try {
//       // Check if tags are already an array
//       if (Array.isArray(tags)) {
//         return tags; // Return as is if already an array
//       }
//       // Check if tags are in JSON stringified array format
//       if (
//         tags &&
//         typeof tags === "string" &&
//         tags.startsWith("[") &&
//         tags.endsWith("]")
//       ) {
//         return JSON.parse(tags); // Parse the JSON string
//       }
//       // Handle comma-separated values (non-JSON format)
//       if (tags && typeof tags === "string") {
//         return tags.split(",").map((tag) => tag.trim()); // Split by commas and trim whitespace
//       }
//       return []; // Return empty array if tags is null, undefined, or invalid
//     } catch (error) {
//       console.error("Error parsing tags:", error);
//       return []; // Return empty array in case of any parsing error
//     }
//   };
//   const data = blogData.map((blog) => ({
//     id: blog.id,
//     image: (
//       <img
//         src={`https://safesolution-portfolio-backend-prod-h5h3g5fxa0bgfrcj.eastus-01.azurewebsites.net/${blog.image}`}
//         alt={blog.title}
//         width={80}
//         className="rounded-[50%]"
//       />
//     ),
//     title: blog.title,
//     category: blog.category,
//     tags: parseTags(blog.tags).map((tag) => `#${tag}`), // Safely parse and format tags
//     // description: blog.description,
//     // joinedAt: new Date(blog.joinedAt).toLocaleDateString() // You can handle the date conversion here if needed
//   }));
//   const handleEdit = (row) => {
//     setSelectedBlog(row);
//     console.log(selectedBlog);
//     setIsModalOpen(true);
//   };
//   const handleDelete = async (row) => {
//     const isConfirmed = window.confirm(
//       `Are you sure you want to delete the project "${row.name}"?`
//     );

//     if (!isConfirmed) return;

//     try {
//       await axios.delete(`${apiUrl}/delete/blog/${row?.id}`);

//       // Remove from local state
//       setBlogData((prevBlog) => prevBlog.filter((blog) => blog.id !== row.id));

//       toast.success("Blog deleted successfully!");
//     } catch (error) {
//       toast.error("Failed to delete project");
//     }
//   };
//   const categoryOptions = [
//     { value: "technology", label: "Technology" },
//     { value: "science", label: "Science" },
//     { value: "art", label: "Art" },
//   ];

//   const EditModal = () => {
//     if (!isModalOpen || !selectedBlog) return null;

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//         <div className="bg-white p-8 rounded-lg w-full max-w-[50%]">
//           <h2 className="text-2xl mb-4">Edit Blog</h2>
//           <Formik
//             initialValues={{
//               title: selectedBlog.title || "",
//               category: selectedBlog.category || "",
//               tags: selectedBlog.tags.map((tag) => ({
//                 label: tag,
//                 value: tag.replace("#", ""), // Example: remove '#' symbol for value
//               })),
//               image: "",
//               description: selectedBlog.description || "",
//             }}
//             validationSchema={blogValidationSchema}
//             onSubmit={(values, { setSubmitting }) => {
//               console.log(values); // Handle form submission here
//               setSubmitting(false);
//               // Close modal after successful update
//               closeModal();
//             }}
//           >
//             {({ isSubmitting, setFieldValue, values }) => (
//               <Form>
//                 {/* Title Field */}
//                 <div>
//                   <Field
//                     name="title"
//                     label="Title"
//                     type="text"
//                     placeholder="Title"
//                     as={CustomInput}
//                   />
//                 </div>

//                 {/* Category Field */}
//                 <div className="mt-4">
//                   <label className="block text-sm text-gray-700 mb-2">
//                     Category
//                   </label>
//                   <Select
//                     options={categoryOptions}
//                     className="basic-single-select"
//                     classNamePrefix="select"
//                     onChange={(selectedOption) =>
//                       setFieldValue(
//                         "category",
//                         selectedOption ? selectedOption.value : ""
//                       )
//                     }
//                     value={categoryOptions.find(
//                       (option) => option.value === values.category
//                     )}
//                     placeholder="Select Category"
//                   />
//                 </div>

//                 {/* Tags Field */}
//                 {/* <div className="mt-4">
//                   <FieldArray
//                     name="tags"
//                     render={(arrayHelpers) => (
//                       <div>
//                         {values.tags.map((tag, index) => (
//                           <div key={index} className="flex items-center gap-4">
//                             <Field
//                               name={`tags[${index}].label`}
//                               placeholder="Tag"
//                               className="border p-2 rounded w-full"
//                             />
//                             <button
//                               type="button"
//                               onClick={() => arrayHelpers.remove(index)}
//                               className="text-red-500"
//                             >
//                               Remove
//                             </button>
//                           </div>
//                         ))}
//                         <button
//                           type="button"
//                           onClick={() =>
//                             arrayHelpers.push({ label: "", value: "" })
//                           }
//                           className="mt-2 text-blue-500"
//                         >
//                           Add Tag
//                         </button>
//                       </div>
//                     )}
//                   />
//                 </div> */}

//                 <div className="mt-4">
//                   <label className="block text-sm text-gray-700 mb-2">
//                     Tags
//                   </label>
//                   <CreatableSelect
//                     isMulti
//                     value={values.tags}
//                     onChange={(selectedOptions) =>
//                       setFieldValue("tags", selectedOptions)
//                     }
//                     options={[]}
//                     placeholder="Add or create tags"
//                     className="basic-multi-select"
//                     classNamePrefix="select"
//                   />
//                 </div>

//                 {/* Image Field */}
//                 <div className="mt-4">
//                   <label className="block text-sm text-gray-700">Image</label>
//                   <input
//                     type="file"
//                     onChange={(event) => {
//                       const file = event.currentTarget.files[0];
//                       setFieldValue("image", file);

//                       if (file) {
//                         // Create a blob URL for the image preview
//                         const objectUrl = URL.createObjectURL(file);
//                         setPreviewImage(objectUrl);

//                         // Clean up the object URL when no longer needed
//                         return () => URL.revokeObjectURL(objectUrl);
//                       } else {
//                         setPreviewImage(null);
//                       }
//                     }}
//                     className="mt-1 block w-full p-2 bg-[#f0f1f2] text-black border border-gray-300 rounded-md"
//                   />
//                   {previewImage && (
//                     <div className="mt-4">
//                       <img
//                         src={previewImage}
//                         alt="Preview"
//                         className="w-64 h-64 rounded-md"
//                       />
//                     </div>
//                   )}
//                 </div>

//                 {/* Description Field */}
//                 <div className="mt-4">
//                   <Field
//                     name="description"
//                     label="Description"
//                     as="textarea"
//                     placeholder="Description"
//                     rows="4"
//                     className="border p-2 rounded w-full"
//                   />
//                 </div>

//                 {/* Submit Button */}
//                 <div className="mt-6 flex justify-end">
//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="bg-blue-500 text-white px-4 py-2 rounded"
//                   >
//                     {isSubmitting ? "Updating..." : "Update Blog"}
//                   </button>
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <>
//       <CustomTable
//         headers={headers}
//         data={data}
//         onEdit={handleEdit}
//         onDelete={handleDelete}
//         itemsPerPage={5}
//       />
//       <EditModal />
//     </>
//   );
// };

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

export const BlogsTable = () => {
  const [blogData, setBlogData] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const headers = ["ID", "Image", "Title", "Category", "Tags", "Description"];

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/get/blog`);
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
      await axios.delete(`${apiUrl}/delete/blog/${row.id}`);
      setBlogData((prevBlog) => prevBlog.filter((blog) => blog.id !== row.id));
      toast.success("Blog deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete blog");
    }
  };

  const handleEdit = (row) => {
    setSelectedBlog(row);
    console.log(selectedBlog);
    setIsEditModalOpen(true);
  };

  const handleUpdate = (values, { setSubmitting }) => {
    alert("HandleUpdate triggered");
    console.log("HandleUpdate triggered", values);

    // Your update logic here
    setTimeout(() => {
      setSubmitting(false);
      setIsEditModalOpen(false);
      console.log("Update complete");
    }, 1000);
  };

  const EditModal = () => {
    if (!isEditModalOpen || !selectedBlog) return null;

    // Convert tags array to format expected by CreatableSelect
    const initialTags = selectedBlog.tags.map((tag) => ({
      label: tag,
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
            validationSchema={blogValidationSchema}
            onSubmit={handleUpdate}
          >
            {({ isSubmitting, setFieldValue, values }) => (
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
                    onClick={() => setIsEditModalOpen(false)}
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
