import BreadCrumb from "@/components/AdminComponents/BreadCrumb";
import { CustomInput } from "@/globals/CustomInput";
import apiInstance from "../../../api-config";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Trash2, X, Pencil } from "lucide-react";

import { toast } from "react-toastify";

const CustomModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg w-full max-w-md mx-4 p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const AdminSetting = () => {
  const userToken = localStorage.getItem("apiusertoken");
  const [emails, setEmails] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);

  const emailSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const fetchData = async () => {
    try {
      const response = await apiInstance.get("get/email", {
        headers: {
          user_access_token: userToken,
        },
      });
      // setEmails(response.data?.data?.email);
      setEmails(response.data?.data || "");
      console.log(response, "all emails");
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  };
  console.log(emails, "emails");
  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await apiInstance.post("store/email", values, {
        headers: {
          "Content-Type": "application/json",
          user_access_token: userToken,
        },
      });
      resetForm();
      fetchData();
    } catch (error) {
      console.error("Error adding email:", error);
    }
  };

  const handleEdit = (email) => {
    setSelectedEmail(email);
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (values, { setSubmitting }) => {
    try {
      await apiInstance.put(`update/email/${selectedEmail.id}`, values, {
        headers: {
          "Content-Type": "application/json",
          user_access_token: userToken,
        },
      });
      setIsEditModalOpen(false);
      fetchData();
    } catch (error) {
      console.error("Error updating email:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (emailId) => {
    console.log(emailId, "emailId");
    if (window.confirm("Are you sure you want to delete this email?")) {
      try {
        await apiInstance.delete(`delete/email/${emailId}`, {
          headers: {
            user_access_token: userToken,
          },
        });
        fetchData();
        if (response.data.success === true) {
          toast.success("Email deleted successfully!");
        }
      } catch (error) {
        console.error("Error deleting email:", error);
      }
    }
  };

  return (
    <div className="p-10">
      <div>
        <BreadCrumb page="Setting" />
      </div>
      <div className="container flex flex-col justify-center items-center">
        <div className="w-[50%] mt-20">
          <Formik
            initialValues={{ email: "" }}
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
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Email List</h2>
            <div className="space-y-4">
              {emails.map((email) => (
                <div
                  key={email.id}
                  className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
                >
                  <span>{email.email}</span>
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
          </div>
        </div>
      </div>

      {/* Custom Edit Modal */}
      <CustomModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Email"
      >
        <Formik
          initialValues={{ email: selectedEmail?.email || "" }}
          validationSchema={emailSchema}
          onSubmit={handleUpdate}
          enableReinitialize
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

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded"
                >
                  {isSubmitting ? "Updating..." : "Update"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </CustomModal>
    </div>
  );
};

export default AdminSetting;
