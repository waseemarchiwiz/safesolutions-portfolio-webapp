import React, { useState } from "react";
import { jobOpeningSchema } from "@/schemas/validationSchemas";
import { Field, Form, Formik } from "formik";
import { CustomInput } from "@/globals/CustomInput";
import BreadCrumb from "@/components/AdminComponents/BreadCrumb";
import TabComponent from "@/globals/TabComponents";
import CustomTable from "@/globals/CustomTable";
import { CareersForm } from "@/components/AdminComponents/CareersTab/CareersForm";
import { CareersTable } from "@/components/AdminComponents/CareersTab/CareersTable";

const AdminCareers = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { title: "VIEW CAREERS", content: <CareersTable /> },
    { title: "ADD CAREERS", content: <CareersForm /> },
  ];
  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  return (
    <div className="p-10">
      <div className="container flex flex-row justify-between align-center">
        <div>
          <BreadCrumb page={"Careers"} />
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

export default AdminCareers;



