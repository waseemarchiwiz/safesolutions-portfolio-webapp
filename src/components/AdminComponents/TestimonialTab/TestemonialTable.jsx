import CustomTable from "@/globals/CustomTable";
import axios from "axios";
import apiUrl from "../../../../baseUrl";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Field, Form, Formik } from "formik";
import { testimonialSchema } from "@/schemas/validationSchemas";
import { CustomInput } from "@/globals/CustomInput";
import apiInstance from "../../../../api-config";

export const TestimonialTable = () => {
  const headers = ["Id", "Image", "Name", "Designation", "Description"];
  const [testemonailData, setTestimonialData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const userToken = localStorage.getItem("apiusertoken");

  const fetchData = async () => {
    try {
      const response = await apiInstance.get(`/get/testimonial`, {
        headers: {
          user_access_token: userToken,
        },
      });
      // setProjectsData(response?.data.projects);
      if (response.data.succes) {
        setTestimonialData(response.data.testimonials);
      }
      //  console.log(response,"testemonial Data")
    } catch (error) {
      console.error(error);
      // toast.error("Failed to fetch Testemonials");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const data = testemonailData.map((testemonial) => ({
    id: testemonial.id,
    image: (
      <img
        src={`https://safesolution-portfolio-backend-prod-h5h3g5fxa0bgfrcj.eastus-01.azurewebsites.net/${testemonial.image}`}
        alt={testemonial.image}
        height={50}
        width={50}
        className="rounded-[50%]"
      />
    ),
    name: testemonial.name,
    designation: testemonial.designation,
    description: testemonial.description,
  }));

  const handleEdit = (row) => {
    console.log("Edit", row);
    setSelectedTestimonial(row);
    setIsModalOpen(true);
  };
  const handleDelete = async (row) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the project "${row.name}"?`
    );

    if (!isConfirmed) return;

    try {
      await apiInstance.delete(`/delete/testimonial/${row?.id}`, {
        headers: {
          user_access_token: userToken,
        },
      });

      // Remove from local state
      setTestimonialData((prevProjects) =>
        prevProjects.filter((faq) => faq.id !== row.id)
      );

      toast.success("Project deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete project");
    }
  };

  const handleUpdate = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("designation", values.designation);
      formData.append("description", values.description);

      if (values.image) {
        formData.append("image", values.image);
      }

      const response = await apiInstance.put(
        `/update/testimonial/${selectedTestimonial.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            user_access_token: userToken,
          },
        }
      );

      if (response.data.success) {
        toast.success("Testimonial updated successfully!");

        // Update local state
        setTestimonialData((prevTestimonials) =>
          prevTestimonials.map((testimonial) =>
            testimonial.id === selectedTestimonial.id
              ? { ...testimonial, ...values }
              : testimonial
          )
        );

        // Close modal
        setIsModalOpen(false);
      } else {
        toast.error(response.data.message || "Failed to update testimonial");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const EditModal = () => {
    if (!isModalOpen || !selectedTestimonial) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-lg w-full max-w-[50%]">
          <h2 className="text-2xl mb-4">Edit Testimonial</h2>
          <Formik
            initialValues={{
              name: selectedTestimonial.name || "",
              description: selectedTestimonial.description || "",
              designation: selectedTestimonial.designation || "",
              image: selectedTestimonial.image || "",
            }}
            validationSchema={testimonialSchema}
            onSubmit={handleUpdate}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className="space-y-4">
                <Field name="name" label="Name" type="text" as={CustomInput} />
                <Field
                  name="description"
                  label="Description"
                  isTextarea={true}
                  as={CustomInput}
                />
                <Field
                  name="designation"
                  label="Designation"
                  type="text"
                  as={CustomInput}
                />
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Testimonial Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) =>
                      setFieldValue("image", event.target.files[0])
                    }
                    className="mt-1 block w-full p-2 border rounded-md"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
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
