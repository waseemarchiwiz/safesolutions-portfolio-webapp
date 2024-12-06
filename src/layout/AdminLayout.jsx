import SideBar from "../components/AdminComponents/SideBar";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex">
      <div className="lg:flex hidden">
        {/* Sidebar for larger screens */}
        <SideBar isOpen={isSidebarOpen} />
      </div>
      <div className="flex-1 p-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden text-white bg-gray-800 p-2 mb-4 rounded"
        >
          {isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
        </button>

        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
