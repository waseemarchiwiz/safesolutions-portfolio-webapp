import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import { CustomInput } from "../../globals/CustomInput";
import { teamMemberValidationSchema } from "../../schemas/validationSchemas";
import BreadCrumb from "@/components/AdminComponents/BreadCrumb";
import TabComponent from "@/globals/TabComponents";
import CustomTable from "@/globals/CustomTable";
import { TeamsForm } from "@/components/AdminComponents/TeamsTab/TeamForm";
import { TeamsTable } from "@/components/AdminComponents/TeamsTab/TeamsTables";

const AdminTeams = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { title: "VIEW TEAMS", content: <TeamsTable /> },
    { title: "ADD TEAMS", content: <TeamsForm /> },
  ];

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="p-10">
      <div className="container flex flex-row justify-between align-center">
        <div>
          <BreadCrumb page={"Teams"} />
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

export default AdminTeams;

 

