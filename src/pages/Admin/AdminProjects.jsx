import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import { CustomInput } from "@/globals/CustomInput";
import { projectValidationSchema } from "@/schemas/validationSchemas";
import BreadCrumb from "@/components/AdminComponents/BreadCrumb";
import TabComponent from "@/globals/TabComponents";
import CustomTable from "@/globals/CustomTable";
import ProjectTable from "../../components/AdminComponents/ProjectTab/ProjectTable";
import ProjectForm from '../../components/AdminComponents/ProjectTab/ProjectForm'

const AdminProjects = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { title: "VIEW PROJECTS", content: <ProjectTable /> },
    { title: "ADD PROJECTS", content: <ProjectForm /> },
  ];

  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  return (
    <div className="p-10">
      <div className="container flex flex-row justify-between align-center">
        <div>
          <BreadCrumb page={"Manage Blogs"} />
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

export default AdminProjects;
