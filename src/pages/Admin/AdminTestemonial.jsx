import React, { useState } from "react";

import BreadCrumb from "@/components/AdminComponents/BreadCrumb";
import TabComponent from "@/globals/TabComponents";

import { TestimonialTable } from "@/components/AdminComponents/TestimonialTab/TestemonialTable";
import { TestimonialForm } from "@/components/AdminComponents/TestimonialTab/TestemonailForm";

const AdminTestimonial = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { title: "VIEW TESTIMONIALS", content: <TestimonialTable /> },
    { title: "ADD TESTIMONIAL", content: <TestimonialForm /> },
  ];

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="p-10">
      <div className="container flex flex-row justify-between align-center">
        <div>
          <BreadCrumb page={"Testemonials"} />
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

export default AdminTestimonial;
