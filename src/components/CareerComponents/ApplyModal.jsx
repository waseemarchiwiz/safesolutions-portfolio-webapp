// ApplyModal.js
import React from "react";
import { Formik, Form, Field } from "formik";
import { CustomInput } from "@/globals/CustomInput";
import { EasyApplyValidationSchema } from "@/schemas/validationSchemas";

const ApplyModal = ({
  modalOpen,
  setModalOpen,
  selectedJob,
  emails,
  handleSubmit,
  setSelectedEmail,
  selectEmail,
}) => {
  if (!modalOpen || !selectedJob) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ">
      <div className="bg-white dark:bg-[#18181b] p-8 rounded-lg w-full max-w-[90%] md:max-w-[50%] overflow-y-auto max-h-[90vh] z-50  mt-24 sm:mt-24 md:mt-12 lg:mt-12 xl:mt-20">
        <h2 className="text-2xl mb-4">{selectedJob.title}</h2>

        <div className="my-4 mt-1">
          <select
            onChange={(e) => setSelectedEmail(e.target.value)}
            className="mt-1 font-sans block w-full p-2 bg-[#f2f5f8] dark:bg-gray-800 text-black dark:text-white border border-gray-300 rounded-md"
          >
            <option value="">Select Email</option>
            {emails?.map((item, index) => (
              <option key={index} value={item.email}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <Formik
          initialValues={{
            name: "",
            email: "",
            phone: "",
            resume: null,
            experience: "",
            message: "",
            portfolioType: "",
            portfolioUrl: "",
            portfolioFile: null,
          }}
          onSubmit={handleSubmit}
          validationSchema={EasyApplyValidationSchema}
        >
          {({ isSubmitting, setFieldValue, values, errors, touched }) => (
            <Form className="space-y-4">
              <div className="flex flex-col md:flex-row justify-between gap-10">
                <div className="w-full md:w-[48%]">
                  <Field
                    name="name"
                    label="Full Name"
                    type="text"
                    as={CustomInput}
                  />
                </div>
                <div className="w-full md:w-[48%]">
                  <Field
                    name="email"
                    label="Email"
                    type="email"
                    as={CustomInput}
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between gap-10">
                <div className="w-full md:w-[48%]">
                  <Field
                    name="phone"
                    label="Phone"
                    type="number"
                    as={CustomInput}
                  />
                </div>
                <div className="w-full md:w-[48%]">
                  <Field
                    name="experience"
                    label="Experience Level"
                    type="text"
                    as={CustomInput}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
                  Upload CV
                </label>
                <input
                  name="resume"
                  type="file"
                  className="border rounded px-3 py-2 w-full"
                  onChange={(event) =>
                    setFieldValue("resume", event.currentTarget.files[0])
                  }
                />
                {errors.resume && touched.resume && (
                  <div className="text-red-500 text-sm">{errors.resume}</div>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
                  Portfolio Type
                </label>
                <Field
                  as="select"
                  name="portfolioType"
                  className="mt-1 block w-full p-2 bg-[#f2f5f8] dark:bg-gray-800 text-black dark:text-white border border-gray-300 rounded-md"
                >
                  <option value="">Select Portfolio Type</option>
                  <option value="url">URL</option>
                  <option value="file">File Upload</option>
                </Field>
                {errors.portfolioType && touched.portfolioType && (
                  <div className="text-red-500 text-sm">
                    {errors.portfolioType}
                  </div>
                )}
              </div>

              {values.portfolioType === "url" && (
                <Field
                  name="portfolioUrl"
                  label="Portfolio URL"
                  type="text"
                  as={CustomInput}
                />
              )}

              {values.portfolioType === "file" && (
                <div className="space-y-2">
                  <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
                    Upload Portfolio
                  </label>
                  <input
                    name="portfolioFile"
                    type="file"
                    className="border rounded px-3 py-2 w-full"
                    onChange={(event) =>
                      setFieldValue(
                        "portfolioFile",
                        event.currentTarget.files[0]
                      )
                    }
                  />
                  {errors.portfolioFile && touched.portfolioFile && (
                    <div className="text-red-500 text-sm">
                      {errors.portfolioFile}
                    </div>
                  )}
                </div>
              )}

              <Field
                name="message"
                label="Message"
                isTextarea={true}
                rows="4"
                as={CustomInput}
              />

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 rounded dark:text-black"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  {isSubmitting ? "Submitting" : "Submit"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ApplyModal;
