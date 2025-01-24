 

import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import { Trash2, Pencil } from "lucide-react";
import { toast } from "react-toastify";

import CustomTable from "@/globals/CustomTable";
import { CustomInput } from "@/globals/CustomInput";
import apiInstance from "../../../../api-config";
import { emailSchema } from "@/schemas/validationSchemas";

// Separate EditModal Component
export const EditModal = ({ 
  isOpen, 
  onClose, 
  selectedEmail, 
  onUpdate 
}) => {
  if (!isOpen || !selectedEmail) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-[50%]">
        <Formik
          initialValues={{
            name: selectedEmail.name,
            email: selectedEmail.email,
          }}
          validationSchema={emailSchema}
          onSubmit={onUpdate}
          enableReinitialize
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="space-y-4">
              <Field
                name="name"
                label="Company Name"
                type="text"
                as={CustomInput}
                error={touched.name && errors.name}
              />
              <Field
                name="email"
                label="Email"
                type="text"
                as={CustomInput}
                error={touched.email && errors.email}
              />

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={onClose}
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
