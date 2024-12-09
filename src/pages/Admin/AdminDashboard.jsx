import KPICard from "@/components/AdminComponents/KpiCard";
import DashboardChart from "../../components/AdminComponents/DashboardLineCharts";
import React from "react";

const AdminDashboard = () => {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold text-gray-800 my-4 ml-6">
        Admin Dashboard
      </h1>
      <div className="flex flex-wrap gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
          <KPICard title="Blogs" value="42" change="5.2%" />
          <KPICard title="Testimonials" value="28" change="3.7%" />
          <KPICard title="Services" value="6" change="2.1%" />
          <KPICard title="Careers" value="12" change="4.5%" />
        </div>
      </div>
      <div className="ml-6">
        <DashboardChart />
      </div>
    </div>
  );
};

export default AdminDashboard;


