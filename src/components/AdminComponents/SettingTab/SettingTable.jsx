import CustomTable from "@/globals/CustomTable";
import apiInstance from "../../../../api-config";
import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import { CustomInput } from "@/globals/CustomInput";
import { emailSchema } from "@/schemas/validationSchemas";
import { Trash2, X, Pencil } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";

const SettingTable = () => {
  const userToken = localStorage.getItem("apiusertoken");
  const [emails, setEmails] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const headers = ["ID", "Name", "Email"];

  const fetchData = async () => {
    try {
      const response = await apiInstance.get("get/email", {
        headers: {
          user_access_token: userToken,
        },
      });
      setEmails(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching emails:", error);
      toast.error("Failed to fetch emails");
    }
  };

  const data = emails.map((email) => ({
    id: email.id,
    name: email.name,
    email: email.email,
  }));

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (row) => {
    console.log("Selected email for editing:", row);
    setSelectedEmail(row);
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (values, { setSubmitting, resetForm }) => {
    console.log("Form values:", values);
    setSubmitting(true);
    setIsSubmitting(true);

    try {
      const response = await apiInstance.put(
        `update/email/${selectedEmail.id}`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
            user_access_token: userToken,
          },
        }
      );

      console.log("Update response:", response.data);
      await fetchData();
      toast.success("Email updated successfully!");
      resetForm();
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating email:", error);
      toast.error(error.response?.data?.message || "Failed to update email");
    } finally {
      setSubmitting(false);
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (email) => {
    const emailId = email.id;
    if (window.confirm(`Are you sure you want to delete this ${emailId}`)) {
      try {
        const response = await apiInstance.delete(`delete/email/${emailId}`, {
          headers: {
            user_access_token: userToken,
          },
        });
        if (response.data.success === true) {
          await fetchData();
          toast.success("Email deleted successfully!");
        }
      } catch (error) {
        console.error("Error deleting email:", error);
        toast.error("Failed to delete email");
      }
    }
  };

  const EditModal = () => {
    if (!isEditModalOpen || !selectedEmail) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-lg w-full max-w-[50%]">
          <Formik
            initialValues={{
              name: selectedEmail.name,
              email: selectedEmail.email,
            }}
            validationSchema={emailSchema}
            onSubmit={handleUpdate}
            enableReinitialize
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="space-y-4">
                <Field
                  name="name"
                  label="Company Name"
                  type="text"
                  as={CustomInput}
                  error={touched.jobTitle && errors.jobTitle}
                />
                <Field
                  name="email"
                  label="Email"
                  type="text"
                  as={CustomInput}
                  error={touched.jobTitle && errors.jobTitle}
                />

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Updating..." : "Update"}
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

export default SettingTable;
