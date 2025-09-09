import React from "react";
import { Formik, Form, Field } from "formik";
import { CustomInput } from "../../../globals/CustomInput";
import { jobOpeningSchema } from "../../../schemas/validationSchemas";
import { toast } from "react-toastify";
import apiInstance from "../../../../api-config";

// careers form
export const CareersForm = () => {
  const userToken = localStorage.getItem("apiusertoken");

  const initialValues = {
    title: "",
    job_description: "",
    location: "", // default value for location
    short_description: "",
    link: "",
  };
  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    console.log(values, "values1");
    try {
      const response = await apiInstance.post("/store/career", values, {
        headers: {
          "Content-Type": "application/json",
          user_access_token: userToken,
        },
      });
      if (response.data.success) {
        resetForm();
        setSubmitting(false);
        toast.success("Job added successfully");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="bg-gray-100 mt-10 p-6 rounded-md shadow-md">
      <Formik
        initialValues={initialValues}
        validationSchema={jobOpeningSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field
                name="title"
                label="Job Title"
                type="text"
                placeholder="Title"
                as={CustomInput}
              />
              <Field
                name="job_description"
                label="Job Description"
                type="text"
                placeholder="Enter Job Description"
                as={CustomInput}
              />
            </div>
            {/* <div className="  grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <Field
                  as="select"
                  name="location"
                  className="mt-1 block w-full p-2 border rounded-md"
                >
                  <option value="Remote">Remote</option>
                  <option value="Onsite">Onsite</option>
                </Field>
              </div>
              <Field
                name="type"
                label="Full Time or Contract"
                type="text"
                placeholder="Enter job type"
                as={CustomInput}
              />
            </div> */}
            <Field
              name="location"
              label="Location"
              // isTextarea={true}
              // rows="6"
              placeholder="Job Location"
              as={CustomInput}
            />
            <Field
              name="short_description"
              label="Short Description"
              isTextarea={true}
              rows="6"
              placeholder="Write a short description about job"
              as={CustomInput}
            />
            <Field
              name="link"
              label="Easy Apply Link"
              placeholder="Platform Link"
              as={CustomInput}
            />
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
