import React from "react";
import { Formik, Form, Field } from "formik";
import { CustomInput } from "@/globals/CustomInput";
import { testimonialSchema } from "@/schemas/validationSchemas";
import { toast } from "react-toastify";
import apiInstance from "../../../../api-config";

export const TestimonialForm = () => {
  const [preview, setPreview] = React.useState(null);
  const userToken = localStorage.getItem("apiusertoken");

  const initialValues = {
    name: "",
    image: null,
    description: "",
    designation: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    const formData = new FormData();

    // Append each field to the FormData instance
    formData.append("name", values.name);
    formData.append("designation", values.designation);
    formData.append("description", values.description);

    // Append the file if available
    if (values.image) {
      formData.append("image", values.image);
    }

    try {
      const response = await apiInstance.post(`/store/testimonial`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // This header is optional; Axios automatically sets it for FormData
          user_access_token: userToken,
        },
      });
      console.log(response);
      // alert("Testimonial submitted successfully!");
      if (response.data.success) {
        toast.success("Testimonial submitted successfully!");
        resetForm();
      }
    } catch (error) {
      console.error("Error submitting testimonial:", error.message);
      toast.error("Failed to submit testimonial. Please try again.");
    } finally {
      setPreview(null);
    }
  };

  return (
    <div className="bg-gray-100 mt-10 p-6 rounded-md shadow-md">
      <Formik
        initialValues={initialValues}
        validationSchema={testimonialSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field
                name="name"
                label="Name"
                type="text"
                placeholder="Enter Name"
                as={CustomInput}
              />
              <Field
                name="designation"
                label="Designation"
                type="text"
                placeholder="Enter Designation"
                as={CustomInput}
              />
            </div>
            <div className="grid ">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Image
                </label>
                <input
                  type="file"
                  name="image"
                  className="mt-1 block w-full p-2 border rounded-md"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setFieldValue("image", file);
                    if (file) {
                      const objectUrl = URL.createObjectURL(file);
                      setPreview(objectUrl);
                    } else {
                      setPreview(null);
                    }
                  }}
                />
              </div>
            </div>
            {preview && (
              <div className="mt-4">
                <img
                  src={preview}
                  alt="Preview"
                  className="h-64 object-cover w-64 rounded-md"
                />
              </div>
            )}
            <Field
              name="description"
              label="Description"
              isTextarea={true}
              rows="6"
              placeholder="Enter Testimonial Description"
              as={CustomInput}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className={`group relative h-[40px] inline-block overflow-hidden border rounded-lg text-white bg-black border-indigo-600 px-6 md:px-8 py-[6px] focus:outline-none focus:ring ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <span className="absolute inset-y-0 left-0 w-[2px] bg-[#2170B7] transition-all group-hover:w-full group-active:bg-[#2170b7]"></span>
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
