import React from "react";
import TabComponent from "../../globals/TabComponents"; // Adjust the import path as needed
import BreadCrumb from "@/components/AdminComponents/BreadCrumb";

import { BlogForm } from "@/components/AdminComponents/BlogTab/BlogForm";
import { BlogsTable } from "@/components/AdminComponents/BlogTab/BlogsTable";

const AdminBlogs = () => {
  const [activeTab, setActiveTab] = React.useState(0);

  const tabs = [
    { title: "VIEW BLOGS", content: <BlogsTable /> },
    { title: "ADD BLOG", content: <BlogForm /> },
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

export default AdminBlogs;
