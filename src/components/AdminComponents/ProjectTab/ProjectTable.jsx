import CustomTable from "@/globals/CustomTable";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import { projectValidationSchema } from "../../../schemas/validationSchemas";
import { CustomInput } from "../../../globals/CustomInput";
import apiInstance from "../../../../api-config";

const ProjectTable = () => {
  const [projectsData, setProjectsData] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const apiusertoken = localStorage.getItem("apiusertoken");

  // Fetch projects data from the server
  const fetchProjects = async () => {
    try {
      const response = await apiInstance.get("/get/project", {
        headers: {
          user_access_token: apiusertoken,
        },
      });
      setProjectsData(response.data.projects);
      toast.success("Projects fetched successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch projects");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const headers = ["ID", "Image", "Name", "URL", "Description"];

  const data = projectsData.map((project) => ({
    id: project.id,
    image: (
      <img
        src={`https://safesolution-portfolio-backend-h6a6esaxema6g4hm.eastus-01.azurewebsites.net/${project.image}`}
        alt={project.title}
        width={80}
        className="rounded-[50%]"
      />
    ),
    name: project.title,
    url: project.link,
    description: project.description,
  }));

  const handleEdit = (row) => {
    setSelectedProject(row);
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append("title", values.projectName);
      formData.append("description", values.projectDescription);
      formData.append("link", values.projectUrl);

      if (values.projectImage) {
        formData.append("image", values.projectImage);
      }

      const response = await apiInstance.put(
        `/update/project/${selectedProject.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            user_access_token: apiusertoken,
          },
        }
      );

      if (response.data.success) {
        toast.success("Project updated successfully!");
        await fetchProjects(); // Refetch data to ensure consistency
        setIsEditModalOpen(false);
      } else {
        toast.error(response.data.message || "Failed to update project");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (row) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the project "${row.name}"?`
    );

    if (!isConfirmed) return;

    try {
      await apiInstance.delete(`/delete/project/${row.id}`, {
        headers: {
          user_access_token: apiusertoken,
        },
      });

      toast.success("Project deleted successfully!");
      await fetchProjects(); // Refetch data after deletion
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete project");
    }
  };

  const EditModal = () => {
    if (!isEditModalOpen || !selectedProject) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-lg w-full max-w-[50%]">
          <h2 className="text-2xl mb-4">Edit Project</h2>
          <Formik
            initialValues={{
              projectName: selectedProject.name || "",
              projectDescription: selectedProject.description || "",
              projectUrl: selectedProject.url || "",
              projectImage: null,
            }}
            validationSchema={projectValidationSchema}
            onSubmit={handleUpdate}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className="space-y-4">
                <Field
                  name="projectName"
                  label="Project Name"
                  type="text"
                  as={CustomInput}
                />
                <Field
                  name="projectDescription"
                  label="Project Description"
                  isTextarea={true}
                  as={CustomInput}
                />
                <Field
                  name="projectUrl"
                  label="Project URL"
                  type="text"
                  as={CustomInput}
                />
                <div className="mb-4">
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
                </div>
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

export default ProjectTable;
