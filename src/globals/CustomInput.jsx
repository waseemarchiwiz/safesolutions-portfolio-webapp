import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

export const CustomInput = ({ label, type, isTextarea, ...props }) => {
  const InputComponent = isTextarea ? "textarea" : "input";
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <InputComponent
        {...props}
        type={type}
        className="mt-1 font-sans block w-full p-2 bg-[#f2f5f8] text-black border border-gray-300 rounded-md"
      />
      <ErrorMessage
        name={props.name}
        component="span"
        className="text-red-500 text-xs"
      />
    </div>
  );
};
