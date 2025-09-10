import React from "react";

import BreadCrumb from "@/components/AdminComponents/BreadCrumb";
import TabComponent from "@/globals/TabComponents";
import SettingTable from "@/components/AdminComponents/SettingTab/SettingTable";
import SettingForm from "@/components/AdminComponents/SettingTab/SettingForm";

const Setting = () => {
  const [activeTab, setActiveTab] = React.useState(0);

  const tabs = [
    { title: "Emails", content: <SettingTable /> },
    { title: "ADD Emails", content: <SettingForm /> },
  ];

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="p-10">
      <div className="container flex flex-row justify-between align-center">
        <div>
          <BreadCrumb page={"Setting"} />
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

export default Setting;
