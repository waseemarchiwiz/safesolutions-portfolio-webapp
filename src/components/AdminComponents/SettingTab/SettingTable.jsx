import CustomTable from "@/globals/CustomTable";
import apiInstance from "../../../../api-config";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { EditModal } from "./EditModal";

const SettingTable = () => {
  const userToken = localStorage.getItem("apiusertoken");
  const [emails, setEmails] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);

  const headers = ["ID", "Name", "Email"];

  const fetchData = async () => {
    try {
      const response = await apiInstance.get("get/email", {
        headers: { user_access_token: userToken },
      });
      setEmails(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching emails:", error);
      toast.error("Failed to fetch emails");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (row) => {
    setSelectedEmail(row);
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (values, { setSubmitting, resetForm }) => {
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

      await fetchData();
      toast.success("Email updated successfully!");
      resetForm();
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating email:", error);
      toast.error(error.response?.data?.message || "Failed to update email");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (email) => {
    const emailId = email.id;
    if (window.confirm(`Are you sure you want to delete email ${emailId}?`)) {
      try {
        const response = await apiInstance.delete(`delete/email/${emailId}`, {
          headers: { user_access_token: userToken },
        });

        if (response.data.success) {
          await fetchData();
          toast.success("Email deleted successfully!");
        }
      } catch (error) {
        console.error("Error deleting email:", error);
        toast.error("Failed to delete email");
      }
    }
  };

  const data = emails.map((email) => ({
    id: email.id,
    name: email.name,
    email: email.email,
  }));

  return (
    <>
      <CustomTable
        headers={headers}
        data={data}
        onEdit={handleEdit}
        onDelete={handleDelete}
        itemsPerPage={5}
      />
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        selectedEmail={selectedEmail}
        onUpdate={handleUpdate}
      />
    </>
  );
};

export default SettingTable;
