import KPICard from "@/components/AdminComponents/KpiCard";
import DashboardChart from "../../components/AdminComponents/DashboardLineCharts";
import React, { useEffect, useState } from "react";
import axios from "axios";
import apiInstance from "../../../api-config";

const AdminDashboard = () => {
  const [kpiData, setKpiData] = useState();
  const userToken = localStorage.getItem("apiusertoken");
  const fetchKpi = async () => {
    try {
      const response = await apiInstance.get("/dashboard", {
        headers: {
          user_access_token: userToken,
        },
      });
      console.log(response, "kpi response: ");
      if (response?.data?.success) {
        setKpiData(response?.data?.counts);
      } else {
        toast.error("Failed to fetch KPI data");
      }
    } catch (error) {}
  };
  console.log(kpiData, "kpi data");
  useEffect(() => {
    fetchKpi();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-[30px] text-black ml-5  ">Admin Dashboard</h1>
      <div className=" p-5  mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-5 sm:gap-5 md:gap-2 lg:gap-8 xl:gap-10">
        <KPICard
          title="Blogs"
          value={kpiData?.getTotalBlogCount?.totalBlogs || 5}
          // value="2"
          change="5.2%"
        />
        <KPICard
          title="Careers"
          value={kpiData?.getTotalCareerCount?.totalCareer || 2}
          // value="1"
          change="5.2%"
        />

        <KPICard
          title="Testimonials"
          value={kpiData?.getTotalTestimonialCount?.totalTestimonial || 3}
          // value="3"
          change="5.2%"
        />
        <KPICard
          title="Teams"
          value={kpiData?.getTotalTeamCount?.totalTeam || 4}
          // value="3"
          change="5.2%"
        />
      </div>

      <div className="p-5">
        <DashboardChart />
      </div>
    </div>
  );
};

export default AdminDashboard;
