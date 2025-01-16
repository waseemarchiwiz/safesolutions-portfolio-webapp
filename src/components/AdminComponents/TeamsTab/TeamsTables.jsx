import CustomTable from "@/globals/CustomTable";
import axios from "axios";
import apiUrl from "../../../../baseUrl";
import { React, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { teamMemberValidationSchema } from "@/schemas/validationSchemas";
import { CustomInput } from "@/globals/CustomInput";
import { Formik, Form, Field } from "formik";
import apiInstance from "../../../../api-config";

export const TeamsTable = () => {
  const [teamsData, setTeamsData] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const userToken = localStorage.getItem("apiusertoken");
  const [previewImage, setPreviewImage] = useState(null);

  console.log("token2121", userToken);

  const fetchData = async () => {
    try {
      const response = await apiInstance.get("/get/team", {
        headers: {
          user_access_token: userToken,
        },
      });
      if (response?.data?.succes) {
        setTeamsData(response?.data?.Teams);
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

  const data = teamsData.map((team) => ({
    id: team.id,
    Image: (
      <img
        src={`https://safesolution-portfolio-backend-prod-h5h3g5fxa0bgfrcj.eastus-01.azurewebsites.net/${team.image}`}
        alt={team.name}
        width={80}
        className="rounded-[50%]"
      />
    ),
    name: team.name,
    role: team.role,
    githubUrl: team.github,
    linkedin: team.linkedin,
    twitter: team.twitter,
  }));

  const handleEdit = (row) => {
    setSelectedTeam({
      ...row,
      githubLink: row.githubUrl,
      linkedInLink: row.linkedin,
      twitterLink: row.twitter,
    });
    setPreviewImage(selectedTeam.Image.props.src);
    setIsEditModalOpen(true);
  };
  console.log(previewImage, "previ");
  const handleDelete = async (row) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the team member "${row.name}"?`
    );

    if (!isConfirmed) return;

    try {
      await apiInstance.delete(`/delete/team/${row?.id}`, {
        headers: {
          user_access_token: userToken,
        },
      });
      setTeamsData((prevTeams) =>
        prevTeams.filter((team) => team.id !== row.id)
      );
      toast.success("Team member deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete team member");
    }
  };

  const handleUpdate = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true); // Set Formik's submitting state to true

      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("role", values.role);
      formData.append("github", values.githubLink);
      formData.append("linkedin", values.linkedInLink);
      formData.append("twitter", values.twitterLink);

      if (values.image instanceof File) {
        formData.append("image", values.image);
      }

      const response = await apiInstance.put(
        `/update/team/${selectedTeam.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            user_access_token: userToken,
          },
        }
      );

      if (response.data.success) {
        toast.success("Team member updated successfully!");

        setTeamsData((prevTeams) =>
          prevTeams.map((team) =>
            team.id === selectedTeam.id
              ? {
                  ...team,
                  name: values.name,
                  role: values.role,
                  github: values.githubLink,
                  linkedin: values.linkedInLink,
                  twitter: values.twitterLink,
                  image: response.data.updatedTeam?.image || team.image,
                }
              : team
          )
        );

        setIsEditModalOpen(false);
      } else {
        throw new Error(
          response.data.message || "Failed to update team member"
        );
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.message || "An error occurred while updating");
    } finally {
      setSubmitting(false); // Make sure to set submitting to false in finally block
    }
  };

  // setPreviewImage(selectedTeam.Image.props.src)
  // console.log(previewImage,"previewImage");
  const EditModal = () => {
    if (!isEditModalOpen || !selectedTeam) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-lg w-full max-w-[50%]">
          <h2 className="text-2xl mb-4">Edit Team Member</h2>
          <Formik
            initialValues={{
              name: selectedTeam.name || "",
              role: selectedTeam.role || "",
              image:  previewImage,
              githubLink: selectedTeam.githubLink || "",
              linkedInLink: selectedTeam.linkedInLink || "",
              twitterLink: selectedTeam.twitterLink || "",
            }}
            validationSchema={teamMemberValidationSchema}
            onSubmit={handleUpdate}
            enableReinitialize
          >
            {({ isSubmitting, setFieldValue, errors, touched }) => (
              <Form className="space-y-4">
                <Field
                  name="name"
                  label="Name"
                  type="text"
                  as={CustomInput}
                  error={touched.name && errors.name}
                />
                <Field
                  name="role"
                  label="Role"
                  as={CustomInput}
                  error={touched.role && errors.role}
                />

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      setFieldValue("image", file);
                    }}
                    className="mt-1 block w-full p-2 border rounded-md"
                  />
                  {previewImage && (
                    <img
                      src={previewImage}
                      alt={selectedTeam.name}
                      width={200}
                    />
                  )}
                  {errors.image && touched.image && (
                    <p className="text-red-500 text-xs">{errors.image}</p>
                  )}
                </div>

                <Field
                  name="githubLink"
                  label="Github URL"
                  type="text"
                  as={CustomInput}
                  error={touched.githubLink && errors.githubLink}
                />
                <Field
                  name="twitterLink"
                  label="Twitter URL"
                  type="text"
                  as={CustomInput}
                  error={touched.twitterLink && errors.twitterLink}
                />
                <Field
                  name="linkedInLink"
                  label="LinkedIn URL"
                  type="text"
                  as={CustomInput}
                  error={touched.linkedInLink && errors.linkedInLink}
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

// import CustomTable from "@/globals/CustomTable";
// import apiInstance from "../../../../api-config";
// import { React, useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { teamMemberValidationSchema } from "@/schemas/validationSchemas";
// import { CustomInput } from "@/globals/CustomInput";
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
// export const TeamsTable = () => {
//   const [teamsData, setTeamsData] = useState([]);
//   const [selectedTeam, setSelectedTeam] = useState(null);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [previewImage, setPreviewImage] = useState(null);
//   const [existingImage, setExistingImage] = useState(null);
//   const userToken = localStorage.getItem("apiusertoken");

//   const updateTeamMemberValidationSchema = Yup.object().shape({
//     name: Yup.string().required("Name is required"),
//     role: Yup.string().required("Role is required"),
//     githubLink: Yup.string().url("Must be a valid URL"),
//     linkedInLink: Yup.string().url("Must be a valid URL"),
//     twitterLink: Yup.string().url("Must be a valid URL"),
//     // Make image optional
//     image: Yup.mixed().nullable(),
//   });

//   const fetchData = async () => {
//     try {
//       const response = await apiInstance.get("/get/team", {
//         headers: {
//           user_access_token: userToken,
//         },
//       });
//       if (response?.data?.succes) {
//         setTeamsData(response?.data?.Teams);
//       } else {
//         toast.error("Failed to fetch teams");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to fetch teams");
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const headers = [
//     "id",
//     "Image",
//     "Name",
//     "Role",
//     "Github Url",
//     "LinkedIn Url",
//     "Twitter Url",
//   ];

//   const data = teamsData.map((team) => ({
//     id: team.id,
//     Image: (
//       <img
//         src={`https://safesolution-portfolio-backend-prod-h5h3g5fxa0bgfrcj.eastus-01.azurewebsites.net/${team.image}`}
//         alt={team.name}
//         width={80}
//         className="rounded-[50%]"
//       />
//     ),
//     name: team.name,
//     role: team.role,
//     githubUrl: team.github,
//     linkedin: team.linkedin,
//     twitter: team.twitter,
//   }));

//   const handleEdit = (row) => {
//     // const imageUrl = `https://safesolution-portfolio-backend-prod-h5h3g5fxa0bgfrcj.eastus-01.azurewebsites.net/${row.Image.props.src}`;
//     setSelectedTeam({
//       ...row,
//       githubLink: row.githubUrl,
//       linkedInLink: row.linkedin,
//       twitterLink: row.twitter,
//     });
//     setPreviewImage(selectedTeam.Image.props.src);
//     setExistingImage(selectedTeam.Image.props.src);
//     setIsEditModalOpen(true);
//   };

//   const handleDelete = async (row) => {
//     const isConfirmed = window.confirm(
//       `Are you sure you want to delete the team member "${row.name}"?`
//     );

//     if (!isConfirmed) return;

//     try {
//       await apiInstance.delete(`/delete/team/${row?.id}`, {
//         headers: {
//           user_access_token: userToken,
//         },
//       });
//       setTeamsData((prevTeams) =>
//         prevTeams.filter((team) => team.id !== row.id)
//       );
//       toast.success("Team member deleted successfully!");
//     } catch (error) {
//       console.error("Delete error:", error);
//       toast.error("Failed to delete team member");
//     }
//   };

//   const handleUpdate = async (values, { setSubmitting }) => {
//     try {
//       setSubmitting(true);
  
//       const formData = new FormData();
//       formData.append("name", values.name);
//       formData.append("role", values.role);
//       formData.append("github", values.githubLink);
//       formData.append("linkedin", values.linkedInLink);
//       formData.append("twitter", values.twitterLink);
  
//       // Append new image if one was selected
//       if (values.image instanceof File) {
//         formData.append("image", values.image);
//       } else if (!values.image && existingImage) {
//         // Add a flag to indicate keeping the existing image
//         formData.append("keepExistingImage", "true");
//       }
  
//       const response = await apiInstance.put(
//         `/update/team/${selectedTeam.id}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             user_access_token: userToken,
//           },
//         }
//       );
  
//       if (response.data.success) {
//         toast.success("Team member updated successfully!");
//         console.log(response.data, "after Updation");
  
//         // Update the local state
//         setTeamsData((prevTeams) =>
//           prevTeams.map((team) =>
//             team.id === selectedTeam.id
//               ? {
//                   ...team,
//                   name: values.name,
//                   role: values.role,
//                   github: values.githubLink,
//                   linkedin: values.linkedInLink,
//                   twitter: values.twitterLink,
//                   image: response.data.updatedTeam?.image || team.image, // Use updated image or fallback to the current image
//                 }
//               : team
//           )
//         );
  
//         // Refresh the data and reset modal states
//         await fetchData();
//         setIsEditModalOpen(false);
//         setPreviewImage(null);
//         setExistingImage(null);
//       } else {
//         throw new Error(
//           response.data.message || "Failed to update team member"
//         );
//       }
//     } catch (error) {
//       console.error("Update error:", error);
//       toast.error(error.message || "An error occurred while updating");
//     } finally {
//       setSubmitting(false);
//     }
//   };
  

//   const EditModal = () => {
//     if (!isEditModalOpen || !selectedTeam) return null;

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//         <div className="bg-white p-8 rounded-lg w-full max-w-[50%]">
//           <h2 className="text-2xl mb-4">Edit Team Member</h2>
//           <Formik
//             initialValues={{
//               name: selectedTeam.name || "",
//               role: selectedTeam.role || "",
//               image: null, // Initialize as null since we handle the existing image separately
//               githubLink: selectedTeam.githubLink || "",
//               linkedInLink: selectedTeam.linkedInLink || "",
//               twitterLink: selectedTeam.twitterLink || "",
//             }}
//             validationSchema={updateTeamMemberValidationSchema}
//             onSubmit={handleUpdate}
//             enableReinitialize
//           >
//             {({ isSubmitting, setFieldValue, errors, touched }) => (
//               <Form className="space-y-4">
//                 <Field
//                   name="name"
//                   label="Name"
//                   type="text"
//                   as={CustomInput}
//                   error={touched.name && errors.name}
//                 />
//                 <Field
//                   name="role"
//                   label="Role"
//                   as={CustomInput}
//                   error={touched.role && errors.role}
//                 />

//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Image
//                   </label>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(event) => {
//                       const file = event.currentTarget.files[0];
//                       if (file) {
//                         setFieldValue("image", file);
//                         const previewUrl = URL.createObjectURL(file);
//                         setPreviewImage(previewUrl);
//                       }
//                     }}
//                     className="mt-1 block w-full p-2 border rounded-md"
//                   />
//                   {previewImage && (
//                     <div className="mt-2">
//                       <img
//                         src={previewImage}
//                         alt="Preview"
//                         className="w-32 h-32 object-cover rounded-full"
//                       />
//                     </div>
//                   )}
//                   {errors.image && touched.image && (
//                     <p className="text-red-500 text-xs">{errors.image}</p>
//                   )}
//                 </div>

//                 <Field
//                   name="githubLink"
//                   label="Github URL"
//                   type="text"
//                   as={CustomInput}
//                   error={touched.githubLink && errors.githubLink}
//                 />
//                 <Field
//                   name="linkedInLink"
//                   label="LinkedIn URL"
//                   type="text"
//                   as={CustomInput}
//                   error={touched.linkedInLink && errors.linkedInLink}
//                 />
//                 <Field
//                   name="twitterLink"
//                   label="Twitter URL"
//                   type="text"
//                   as={CustomInput}
//                   error={touched.twitterLink && errors.twitterLink}
//                 />

//                 <div className="flex justify-end space-x-2">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setIsEditModalOpen(false);
//                       setPreviewImage(null);
//                       setExistingImage(null);
//                     }}
//                     className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//                     disabled={isSubmitting}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
//                   >
//                     {isSubmitting ? "Updating..." : "Update"}
//                   </button>
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <>
//       <CustomTable
//         headers={headers}
//         data={data}
//         onEdit={handleEdit}
//         onDelete={handleDelete}
//         itemsPerPage={5}
//       />
//       <EditModal />
//     </>
//   );
// };
