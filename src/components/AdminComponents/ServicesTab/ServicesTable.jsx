import CustomTable from "@/globals/CustomTable";
import apiInstance from "../../../../api-config";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { servicesValidationSchema } from "@/schemas/validationSchemas";
import CreatableSelect from "react-select/creatable";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { CustomInput } from "@/globals/CustomInput";
// import { toast } from "react-hot-toast";

export const ServicesTable = () => {
  const headers = ["ID", "Title", "Key Points", "Description"];
  const [selectedService, setSelectedService] = useState();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [servicesData, setServicesData] = useState([]);
  const [previewImage, setPreviewImage] = useState();

  const userToken = localStorage.getItem("apiusertoken");

  const fetchServicesData = async () => {
    try {
      const response = await apiInstance.get("/get/service", {
        headers: {
          user_access_token: userToken,
        },
      });
      console.log(response?.data?.services, "services get");
      setServicesData(response?.data?.services);
    } catch (error) {
      console.error("Fetch services error:", error);
      // toast.error("Failed to fetch services");
    }
  };

  useEffect(() => {
    fetchServicesData();
  }, []);

  const parseKeyPoints = (keyPoint) => {
    try {
      if (Array.isArray(keyPoint)) {
        return keyPoint;
      }
      if (
        keyPoint &&
        typeof keyPoint === "string" &&
        keyPoint.startsWith("[") &&
        keyPoint.endsWith("]")
      ) {
        return JSON.parse(keyPoint);
      }
      if (keyPoint && typeof keyPoint === "string") {
        return keyPoint.split(",").map((point) => point.trim());
      }
      return [];
    } catch (error) {
      console.error("Error parsing key points:", error);
      return [];
    }
  };

  const data = servicesData.map((row) => {
    return {
      id: row.id,
      // image: (
      //   <img
      //     src={`https://safesolution-portfolio-backend-prod-h5h3g5fxa0bgfrcj.eastus-01.azurewebsites.net/${row.image}`}
      //     alt={row.title}
      //     className="h-12 w-12 object-cover rounded"
      //   />
      // ),
      title: row.title,
      key_points: parseKeyPoints(row.key_point).map((point) => `#${point} ,`),
      description: row.description,
    };
  });

  const handleEdit = (row) => {
    // console.log("Edit", row);
    setIsEditModalOpen(true);
    setSelectedService(row);
  };
  console.log("seleceted service", selectedService);

  const handleDelete = async (row) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the blog "${row.title}"?`
    );

    if (!isConfirmed) return;

    try {
      await apiInstance.delete(`/delete/service/${row.id}`, {
        headers: {
          user_access_token: userToken,
        },
      });
      setServicesData((prevSer) =>
        prevSer.filter((service) => service.id !== row.id)
      );
      toast.success("Services deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete Services");
    }
  };

  const handleUpdate = async (values, { setSubmitting }) => {
    console.log("Form Values:", values);
    setSubmitting(false);

    // Ensure keypoints are formatted correctly as an array or empty array
    const formattedPoints = Array.isArray(values.keypoints)
      ? values.keypoints
      : [];
    console.log(formattedPoints, "formattedPoints");

    // Prepare FormData with all fields
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("key_point[]", JSON.stringify(formattedPoints));
    if (values.image) {
      formData.append("image", values.image);
    }

    try {
      // Call API to update the service
      const response = await apiInstance.put(
        `/update/service/${selectedService.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            user_access_token: userToken,
          },
        }
      );

      // Update the state with updated service data
      const updatedService = response?.data?.service; // Adjust based on API response
      setServicesData((prevSer) =>
        prevSer.map((service) =>
          service.id === selectedService.id
            ? {
                ...service,
                ...updatedService,
                key_point: formattedPoints, // Ensure keypoints are updated in the state
              }
            : service
        )
      );

      // Close modal and show success toast
      setIsEditModalOpen(false);
      toast.success("Services updated successfully!");
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update Services");
    }
  };

  const EditModal = () => {
    if (!isEditModalOpen || !selectedService) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-lg w-full max-w-[50%]">
          <h2 className="text-2xl mb-4">Edit Services</h2>
          <Formik
            initialValues={{
              title: selectedService?.title || "",
              keypoints: selectedService?.key_points || [],
              // image: null,
              description: selectedService?.description || "",
            }}
            validationSchema={servicesValidationSchema}
            onSubmit={handleUpdate}
            enableReinitialize={true}
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <Form className="space-y-6">
                {/* Title */}
                <Field
                  name="title"
                  label="Title"
                  type="text"
                  placeholder="Title"
                  as={CustomInput}
                />
                {/* Image Upload */}
                {/* <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Project Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) =>
                      setFieldValue("projectImage", event.target.files[0])
                    }
                    className="mt-1 block w-full p-2 border rounded-md"
                  />
                </div> */}

                {/* Tags Input */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Key Points
                  </label>
                  <CreatableSelect
                    isMulti
                    onChange={(selectedOptions) =>
                      setFieldValue(
                        "keypoints",
                        selectedOptions
                          ? selectedOptions.map((option) => option.value)
                          : []
                      )
                    }
                    value={values.keypoints.map((keypoint) => ({
                      label: keypoint,
                      value: keypoint,
                    }))}
                    placeholder="Write Key Points"
                  />
                  <ErrorMessage
                    name="keypoints"
                    component="span"
                    className="text-red-500 text-xs"
                  />
                </div>

                {/* Content */}
                <Field
                  name="description"
                  label="Description"
                  isTextarea={true}
                  rows="6"
                  placeholder="Write your thoughts"
                  as={CustomInput}
                />

                {/* Submit Button */}
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

export default ServicesTable;
