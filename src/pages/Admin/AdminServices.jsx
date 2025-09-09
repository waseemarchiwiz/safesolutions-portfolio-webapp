import React from "react";
import BreadCrumb from "@/components/AdminComponents/BreadCrumb";
import TabComponent from "@/globals/TabComponents";
import ServicesForm from "../../components/AdminComponents/ServicesTab/ServicesForm";
import { ServicesTable } from "@/components/AdminComponents/ServicesTab/ServicesTable";

const AdminServices = () => {
  const [activeTab, setActiveTab] = React.useState(0);

  const tabs = [
    { title: "VIEW SERVICES", content: <ServicesTable /> },
    { title: "ADD SERVICES", content: <ServicesForm /> },
  ];
  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  // Initial form values
  return (
    <div className="p-10">
      <div className="container flex flex-row justify-between align-center">
        <div>
          <BreadCrumb page={"Services"} />
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

export default AdminServices;
