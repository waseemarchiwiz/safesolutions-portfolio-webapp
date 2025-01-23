import { Formik, Form, Field } from "formik";
import { teamMemberValidationSchema } from "@/schemas/validationSchemas";
import { CustomInput } from "@/globals/CustomInput";
import { toast } from "react-toastify";
import apiInstance from "../../../../api-config";

const EditTeamModal = ({ team, onClose, onUpdate }) => {
  const userToken = localStorage.getItem("apiusertoken");

  console.log(team, "team");

  const handleUpdate = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
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
        `/update/team/${team.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            user_access_token: userToken,
          },
        }
      );

      if (response?.data?.success) {
        toast.success("Team member updated successfully!");
        onUpdate();
        onClose();
      } else {
        throw new Error(
          response.data.message || "Failed to update team member"
        );
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.message || "An error occurred while updating");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black justify-center items-center  bg-opacity-50 flex   z-50">
      <div className="bg-white p-8 rounded-lg w-[50%]  ">
        <h2 className="text-2xl mb-4">Edit Team Member</h2>
        <Formik
          initialValues={{
            name: team.name || "",
            role: team.role || "",
            image: "",
            githubLink: team.githubUrl || "",
            linkedInLink: team.linkedin || "",
            twitterLink: team.twitter || "",
          }}
          validationSchema={teamMemberValidationSchema}
          onSubmit={handleUpdate}
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
              <div className="flex flex-col gap-2">
                <label>Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFieldValue("image", e.target.files[0])}
                  name="image"
                />

                <img
                  src={team.Image.props.src}
                  alt="preview"
                  width="100"
                  height="100"
                />
              </div>
              <Field
                name="githubLink"
                label="Github URL"
                type="text"
                as={CustomInput}
              />
              <Field
                name="linkedInLink"
                label="LinkedIn URL"
                type="text"
                as={CustomInput}
              />
              <Field
                name="twitterLink"
                label="Twitter URL"
                type="text"
                as={CustomInput}
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={onClose}
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

export default EditTeamModal;
