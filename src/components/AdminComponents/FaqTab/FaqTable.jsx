import CustomTable from "@/globals/CustomTable";
import React from "react";

import { Formik } from "formik";
import { faqSchema } from "@/schemas/validationSchemas";
import { CustomInput } from "@/globals/CustomInput";
import { Form, Field } from "formik";
import { toast } from "react-toastify";
import apiInstance from "../../../../api-config";
export const FaqsTable = () => {
  const [faqsData, setFaqsData] = React.useState([]);
  const [selectedFaq, setSelectedFaq] = React.useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const userToken = localStorage.getItem("apiusertoken");

  const headers = ["id", "Question", "Answer"];

  const fetchFaqsData = async () => {
    try {
      const response = await apiInstance.get("/get/faq", {
        headers: {
          user_access_token: userToken,
        },
      });
      console.log(response?.data?.faqs, "faq get");
      setFaqsData(response?.data?.faqs);
    } catch (error) {
      console.error("Fetch faqs error:", error);
      toast.error("Failed to fetch FAQs");
    }
  };

  React.useEffect(() => {
    fetchFaqsData();
  }, []);

  const data = faqsData.map((faq) => ({
    id: faq.id,
    question: faq.question,
    answer: faq.answer,
  }));

  const handleEdit = (row) => {
    console.log("Edit", row);
    setSelectedFaq(row);
    console.log(selectedFaq, "selectedFaqs");
    setIsEditModalOpen(true);
  };

  const handleDelete = async (row) => {
    console.log("Delete", row);
    const isConfirmed = window.confirm(
      `Are you sure you want to delete ${row.question}`
    );
    if (!isConfirmed) return;
    try {
      await apiInstance.delete(`/delete/faq/${row.id}`, {
        headers: {
          user_access_token: userToken,
        },
      });
      setFaqsData((prev) => prev.filter((faq) => faq.id !== row.id));
      toast.success("Project deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete FAQ");
    }
  };
  const handleUpdate = async (values) => {
    console.log(values, "update");
    try {
      await apiInstance.put(`/update/faq/${selectedFaq.id}`, values, {
        headers: {
          "Content-Type": "application/json",
          user_access_token: userToken,
        },
      });

      setFaqsData((prev) =>
        prev.map((faq) =>
          faq.id === selectedFaq.id ? { ...faq, ...values } : faq
        )
      );
      setIsEditModalOpen(false);
      toast.success("Faqs updated successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update FAQ");
    }
  };

  const EditModal = () => {
    if (!isEditModalOpen || !selectedFaq) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-lg w-full max-w-[50%]">
          <h2 className="text-2xl mb-4">Edit Faqs</h2>
          <Formik
            initialValues={{
              question: selectedFaq.question || "",
              answer: selectedFaq.answer || "",
            }}
            validationSchema={faqSchema}
            onSubmit={handleUpdate}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <Field
                  name="question"
                  label="Question"
                  type="text"
                  as={CustomInput}
                />
                <Field
                  name="answer"
                  label="Answer"
                  isTextarea={true}
                  as={CustomInput}
                />

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 bg-gray-200 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
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
