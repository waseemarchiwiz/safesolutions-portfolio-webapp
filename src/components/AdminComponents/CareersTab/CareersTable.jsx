import CustomTable from "@/globals/CustomTable";
import axios from "axios";
import apiUrl from "../../../../baseUrl";
import { React, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import { CustomInput } from "@/globals/CustomInput";
import { jobOpeningSchema } from "@/schemas/validationSchemas";
import apiInstance from "../../../../api-config";

export const CareersTable = () => {
  const [careersData, setCareersData] = useState([]);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const userToken = localStorage.getItem("apiusertoken");

  const headers = [
    "ID",
    "Job Title",
    "Job Description",
    "Location",
    "Short Descriiption",
    "Apply Link",
  ];

  const fetchCareers = async () => {
    try {
      const response = await apiInstance.get("/get/career", {
        headers: {
          user_access_token: userToken,
        },
      });
      console.log(response, "careers response");

      if (response?.data?.succes) {
        setCareersData(response?.data?.careers);
        toast.success("Careers fetched successfully");
      } else {
        toast.error("Failed to fetch careers");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to fetch careers");
    }
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  const data = careersData.map((career) => ({
    id: career.id,
    title: career.title,
    job_description: career.job_description,
    location: career.location,
    short_description: career.short_description,
    link: career.link,
  }));

  const handleEdit = (row) => {
    setSelectedCareer(row);
    setIsEditModalOpen(true);
    console.log(selectedCareer, "selectedCareersss");
  };

  const handleDelete = async (row) => {
    console.log(row, "delete");
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the job posting "${row.title}"?`
    );
    if (!isConfirmed) return;
    try {
      await apiInstance.delete(`/delete/career/${row.id}`, {
        headers: {
          user_access_token: userToken,
        },
      });
      setCareersData((prevCareers) =>
        prevCareers.filter((career) => career.id !== row.id)
      );
      toast.success("Job posting deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete job posting");
    }
  };

  const handleUpdate = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);

      const response = await apiInstance.put(
        `/update/career/${selectedCareer.id}`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
            user_access_token: userToken,
          },
        }
      );

      if (response?.data?.success) {
        toast.success("Job posting updated successfully!");

        setCareersData((prevCareers) =>
          prevCareers.map((career) =>
            career.id === selectedCareer.id
              ? {
                  ...career,
                  ...values,
                }
              : career
          )
        );

        setIsEditModalOpen(false);
      } else {
        throw new Error(
          response.data.message || "Failed to update job posting"
        );
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.message || "An error occurred while updating");
    } finally {
      setSubmitting(false);
    }
  };

  const EditModal = () => {
    if (!isEditModalOpen || !selectedCareer) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-lg w-full max-w-[50%]">
          <h2 className="text-2xl mb-4">Edit Job Posting</h2>
          <Formik
            initialValues={{
              title: selectedCareer.title || "",
              job_description: selectedCareer.job_description || "",
              location: selectedCareer.location || "",
              short_description: selectedCareer.short_description || "",
              link: selectedCareer.link || "",
            }}
            validationSchema={jobOpeningSchema}
            onSubmit={handleUpdate}
            enableReinitialize
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="space-y-4">
                <Field
                  name="title"
                  label="Job Title"
                  type="text"
                  as={CustomInput}
                  error={touched.jobTitle && errors.jobTitle}
                />
                <Field
                  name="job_description"
                  label="Job Description"
                  type="text"
                  as={CustomInput}
                  error={touched.job_description && errors.job_description}
                />
                <Field
                  name="location"
                  label="Location"
                  type="text"
                  as={CustomInput}
                  error={touched.location && errors.location}
                />
                <Field
                  name="short_description"
                  label="Short Description"
                  type="text"
                  as={CustomInput}
                  error={touched.short_description && errors.short_description}
                />
                <Field
                  name="link"
                  label="Easy Apply Link"
                  as={CustomInput}
                  isTextarea={true}
                  error={touched.link && errors.link}
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
