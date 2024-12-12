import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import { CustomInput } from "../../globals/CustomInput";
import { teamMemberValidationSchema } from "../../schemas/validationSchemas";

const AdminTeams = () => {
  const [previewImage, setPreviewImage] = useState(null);

  const initialValues = {
    name: "",
    role: "",
    image: null,
    githubLink: "",
    linkedInLink: "",
    twitterLink: "",
  };

  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    console.log("Team Member Data:", values);
    setTimeout(() => {
      setSubmitting(false);
      alert("Team member added successfully!");
      setPreviewImage(null);
      resetForm();
    }, 2000);
  };

  return (
    <div className="p-10">
      <h1 className="text-[30px] ml-5">Add Team Member</h1>
      <div className="bg-gray-100 mt-10 p-6 rounded-md shadow-md">
        <Formik
          initialValues={initialValues}
          validationSchema={teamMemberValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="space-y-6">
              <Field
                name="name"
                label="Name"
                type="text"
                placeholder="Enter team member's name"
                as={CustomInput}
              />
              <Field
                name="role"
                label="Role"
                type="text"
                placeholder="Enter team member's role"
                as={CustomInput}
              />
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Image
                </label>
                <input
                  type="file"
                  accept="image/jpeg, image/png"
                  onChange={(event) => {
                    const file = event.target.files[0];
                    setFieldValue("image", file);
                    if (file) {
                      const preview = URL.createObjectURL(file);
                      setPreviewImage(preview);
                    } else {
                      setPreviewImage(null);
                    }
                  }}
                  className="mt-1 block w-full p-2 border rounded-md"
                />
                {previewImage && (
                  <div className="mt-4">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-64 h-64 rounded-md"
                    />
                  </div>
                )}
              </div>
              <Field
                name="githubLink"
                label="Githuburl"
                type="text"
                placeholder="Enter github profile url"
                as={CustomInput}
              />
              <Field
                name="twitterLink"
                label="Twitterurl"
                type="text"
                placeholder="Enter twitter profile url"
                as={CustomInput}
              />
              <Field
                name="linkedInLink"
                label="LinkedInurl"
                type="text"
                placeholder="Enter linkedin profile url"
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
    </div>
  );
};

export default AdminTeams;
