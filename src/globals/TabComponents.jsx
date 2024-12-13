import React from "react";

const TabComponent = ({ tabs, activeTab, onTabClick }) => {
  return (
    <div className="bg-[#2170b7] w-[40%] rounded-md flex justify-around py-2">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`px-6 py-2 w-full   rounded-md transition-colors duration-300 ${
            activeTab === index
              ? " bg-[#1e64a4]  text-white font-medium"
              : "text-gray-400 hover:bg-[#1e64a4]"
          }`}
          onClick={() => onTabClick(index)}
        >
          {tab.title}
        </button>
      ))}
    </div>
  );
};

export default TabComponent;
