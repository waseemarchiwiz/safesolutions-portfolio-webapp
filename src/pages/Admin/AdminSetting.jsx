import BreadCrumb from "@/components/AdminComponents/BreadCrumb";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import apiInstance from "../../../api-config";

const AdminSetting = () => {
  // State for managing emails and the email currently being edited
  const [emails, setEmails] = useState([]);
  const [editingEmail, setEditingEmail] = useState(null);

  // Get the user token from localStorage for authorization
  const userToken = localStorage.getItem("apiusertoken");

  // Validation schema using Yup for the email field
  const emailSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format") // Email must be a valid format
      .required("Email is required"), // Email is a required field
  });

  // Function to fetch the email data from the server
  const fetchEmail = async () => {
    try {
      const response = await apiInstance.get("/get/email", {
        headers: {
          user_access_token: userToken, // Send user token for authentication
        },
      });
      console.log(response, "email fetch");
      setEmails(response?.data.data.email); // Set the fetched emails in the state
    } catch (error) {
      console.error(error); // Log any errors
    }
  };

  // Function to handle form submission for adding/updating email
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await apiInstance.post("/update/email", values, {
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
          user_access_token: userToken, // Send user token for authentication
        },
      });
      fetchEmail();
      resetForm(); // Reset the form after successful submission
    } catch (error) {
      console.error(error); // Log any errors
    }
    console.log(data, "data"); // Log the response data
  };

  // Log the current emails in the state
  console.log(emails, "emailllls");

  // Fetch the email list when the component is mounted or when handleSubmit is called
  useEffect(() => {
    fetchEmail();
  }, [handleSubmit]);

  // Function to handle editing of an email
  const handleEdit = (emailToEdit) => {
    setEditingEmail(emailToEdit); // Set the email being edited
  };

  // Function to handle deleting an email (currently commented out)
  // const handleDelete = (emailToDelete) => {
  //   setEmails(emails.filter((e) => e !== emailToDelete)); // Remove email from the list
  // };

  return (
    <div>
      {/* Breadcrumb component */}
      <div className="p-10">
        <BreadCrumb page={"Setting"} />
      </div>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto p-6">
          {/* Card for email management */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Email Management
              </h2>

              {/* Formik form for email input */}
              <Formik
                initialValues={{ email: editingEmail || "" }} // Set initial value for the form
                validationSchema={emailSchema} // Apply validation schema
                onSubmit={handleSubmit} // Handle form submission
                enableReinitialize // Allow reinitialization of form values when editing
              >
                {({ isSubmitting,errors, touched }) => (
                  <Form className="space-y-4">
                    {/* Email input field */}
                    <div className="relative">
                      <Field
                        type="email"
                        name="email"
                        placeholder="Enter email address"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        {/* Email icon */}
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    </div>
                    {/* Error message for email field */}
                    {errors.email && touched.email && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </div>
                    )}
                    {/* Submit button */}
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
                        ) : editingEmail ? (
                          "Update Email"
                        ) : (
                          "Add Email"
                        )}
                      </span>
                    </button>
                  </Form>
                )}
              </Formik>

              {/* Display the list of emails */}
              {emails.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Email List
                  </h3>
                  <div className="space-y-3">
                    {/* Render the emails */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow duration-200">
                      <span className="text-gray-700">{emails}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSetting;
