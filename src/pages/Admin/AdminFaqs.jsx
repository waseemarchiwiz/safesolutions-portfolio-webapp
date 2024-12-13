import React, { useState } from "react";
import { Formik, Form, Field } from "formik";

import { CustomInput } from "@/globals/CustomInput"; // Assuming you have a custom input component
import { faqSchema } from "@/schemas/validationSchemas";
import CustomButton from "@/globals/CustomButton";
import BreadCrumb from "@/components/AdminComponents/BreadCrumb";
import TabComponent from "@/globals/TabComponents";
import CustomTable from "@/globals/CustomTable";
import FaqsForm from "@/components/AdminComponents/FaqTab/FaqForm";
import { FaqsTable } from "@/components/AdminComponents/FaqTab/FaqTable";

// Define the validation schema for the FAQ form

const AdminFaqs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { title: "Add FAQ", content: <FaqsForm /> },
    { title: "VIEW FAQ", content: <FaqsTable /> },
  ];
  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  return (
    <div className="p-10">
      <div className="container flex flex-row justify-between align-center">
        <div>
          <BreadCrumb page={"Faqs"} />
        </div>
        <TabComponent
          tabs={tabs}
          activeTab={activeTab}
          onTabClick={handleTabClick}
        />
      </div>
      <div className="p-4">{tabs[activeTab].content}</div>
    </div>
  );
};

export default AdminFaqs;
