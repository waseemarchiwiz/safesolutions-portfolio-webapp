import CustomTable from "@/globals/CustomTable";
import axios from "axios";
import apiUrl from "../../../../baseUrl";
import { React, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { teamMemberValidationSchema } from "@/schemas/validationSchemas";
import { CustomInput } from "@/globals/CustomInput";
import { Formik, Form, Field } from "formik";

export const TeamsTable = () => {
  const [teamsData, setTeamsData] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/get/team`);
      console.log(response?.data?.Teams, "respos");
      if (response.data.succes) {
        setTeamsData(response?.data?.Teams); // Assuming `teams` is the key in the response containing team data
      } else {
        toast.error("Failed to fetch teams");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch teams");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const headers = [
    "id",
    "Image",
    "Name",
    "Role",
    "Github Url",
    "LinkedIn Url",
    "Twitter Url",
  ];
  console.log(teamsData, "tEAMS dA");
  const data = teamsData.map((team) => ({
    Image: (
      <img
        src={`https://safesolution-portfolio-backend-prod-h5h3g5fxa0bgfrcj.eastus-01.azurewebsites.net/${team.Image}`}
        alt={team.name}
        width={80}
        className="rounded-[50%]"
      />
    ),
    id: team.id,
    name: team.name,
    role: team.role,
    githubUrl: team.githubUrl,
    linkedin: team.linkedin,
    twitter: team.twitter,
  }));

  const handleEdit = (row) => {
    setSelectedTeam(row);
    console.log(selectedTeam, "selected team");
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("role", values.role);
      // formData.append("description", values.description);
      formData.append("linkedin", values.linkedin);
      formData.append("githubUrl", values.githubUrl);
      formData.append("twitter", values.twitter);

      if (values.image) {
        formData.append("image", values.image);
      }

      const response = await axios.put(
        `${apiUrl}/update/teams/${selectedTeam.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success("Team member updated successfully!");

        // Update local state
        setTeamsData((prevTeams) =>
          prevTeams.map((team) =>
            team.id === selectedTeam.id ? { ...team, ...values } : team
          )
        );

        // Close modal
        setIsEditModalOpen(false);
      } else {
        toast.error(response.data.message || "Failed to update team member");
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
      await axios.delete(`${apiUrl}/delete/team/${row?.id}`);

      // Remove from local state
      setTeamsData((prevProjects) =>
        prevProjects.filter((project) => project.id !== row.id)
      );

      toast.success("Project deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete project");
    }
  };
  const EditModal = () => {
    if (!isEditModalOpen || !selectedTeam) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-lg w-full max-w-[50%]">
          <h2 className="text-2xl mb-4">Edit Project</h2>
          <Formik
            initialValues={{
              name: selectedTeam.name || "",
              role: selectedTeam.role || "",
              // description: selectedTeam.description || "",
              linkedin: selectedTeam.linkedin || "",
              githubUrl: selectedTeam.githubUrl || "",
              twitter: selectedTeam.twitter || "",
              projectImage: null,
            }}
            validationSchema={teamMemberValidationSchema}
            onSubmit={handleUpdate}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className="space-y-4">
                <Field name="name" label="Name" type="text" as={CustomInput} />
                <Field
                  name="role"
                  label="Role"
                  isTextarea={true}
                  as={CustomInput}
                />
                {/* <Field
                  name="description"
                  label="Description"
                  isTextarea={true}
                  as={CustomInput}
                /> */}
                <Field
                  name="linkedin"
                  label="linkedin URL"
                  type="text"
                  as={CustomInput}
                />
                <Field
                  name="githubUrl"
                  label="githubUrl"
                  type="text"
                  as={CustomInput}
                />
                <Field
                  name="twitter"
                  label="twitter URL"
                  type="text"
                  as={CustomInput}
                />
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Image
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
