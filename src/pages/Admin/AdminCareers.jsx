import React from "react";
import { jobOpeningSchema } from "@/schemas/validationSchemas";
import { Field, Form, Formik } from "formik";
import { CustomInput } from "@/globals/CustomInput";

const AdminCareers = () => {
  const initialValues = {
    title: "",
    department: "",
    location: "Remote", // default value for location
    type: "Full-time",
    description: "",
  };

  const handleSubmit = (values, { resetForm,setSubmitting }) => {
    console.log("Submitted Job Opening:", values);
    // Simulate a network request delay
    setTimeout(() => {
      setSubmitting(false);
      resetForm();
      alert("Job Opening Submitted!");
    }, 2000);
  };

  return (
    <div className="p-10">
      <h1 className="text-[30px] ml-5">Add Careers</h1>
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
                  name="department"
                  label="Department"
                  type="text"
                  placeholder="Enter Department"
                  as={CustomInput}
                />
              </div>
              <div className="  grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>
              <Field
                name="description"
                label="Job Description"
                isTextarea={true}
                rows="6"
                placeholder="Describe the job"
                as={CustomInput}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              >
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
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AdminCareers;
