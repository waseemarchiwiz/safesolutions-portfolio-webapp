import React from "react";
import { CustomInput } from "@/globals/CustomInput";
import apiInstance from "../../../../api-config";
import { Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import { emailSchema } from "../../../schemas/validationSchemas";

const SettingForm = () => {
  const userToken = localStorage.getItem("apiusertoken");

  const handleSubmit = async (values, { resetForm }) => {
    console.log(values, "valuees");

    try {
      const response = await apiInstance.post("store/email", values, {
        headers: {
          "Content-Type": "application/json",
          user_access_token: userToken,
        },
      });
      console.log(response);
      resetForm();

      if (response?.data?.success) {
        toast.success("Email added successfully!");
      }
      // toast.success("Email added successfully!");
    } catch (error) {
      console.error("Error adding email:", error);
      // toast.error("Failed to add email");
    }
  };

  return (
    <div className="container flex flex-col  ">
      <div className="w-[50%] mt-20">
        <Formik
          initialValues={{ email: "", name: "" }}
          validationSchema={emailSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <Field
                name="email"
                label="Email"
                type="text"
                placeholder="Enter email address"
                as={CustomInput}
              />

              <Field
                name="name"
                label="Company Name"
                type="text"
                placeholder="Enter company name"
                as={CustomInput}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className={`group relative h-[40px] inline-block overflow-hidden border rounded-lg text-white bg-black border-[#2170B7] px-6 md:px-8 py-[6px] focus:outline-none focus:ring ${
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

        {/* Email List */}
        {/* <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Email List</h2>
          <div className="space-y-4">
            {emails.map((email) => (
              <div
                key={email.id}
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
              >
                <div>
                  <p className="font-medium">{email.email}</p>
                  <p className="text-sm text-gray-600">{email.companyName}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(email)}
                    className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(email.id)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default SettingForm;
