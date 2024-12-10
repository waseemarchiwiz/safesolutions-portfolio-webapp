import React from "react";
import { Field, Form, Formik } from "formik";
import { CustomInput } from "../../globals/CustomInput";
import { teamMemberValidationSchema } from "../../schemas/validationSchemas";

const AdminTeams = () => {
  const initialValues = {
    name: "",
    role: "",
    image: null,
  };

  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    console.log("Team Member Data:", values);
    setTimeout(() => {
      setSubmitting(false);
      alert("Team member added successfully!");
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
                  onChange={(event) =>
                    setFieldValue("image", event.target.files[0])
                  }
                  className="mt-1 block w-full p-2 border rounded-md"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
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
                    Submitting...
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

export default AdminTeams;
