// import KPICard from "@/components/AdminComponents/KpiCard";
// import DashboardChart from "../../components/AdminComponents/DashboardLineCharts";
// import React from "react";

// const AdminDashboard = () => {
//   return (
//     <div className="p-10">
//       <h1 className="text-[30px] ml-5">Admin Dashboard</h1>
//       <div className="flex flex-wrap gap-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6   ">
//           <KPICard title="Blogs" value="42" change="5.2%"  />
//           <KPICard title="Testimonials" value="28" change="3.7%" />
//           <KPICard title="Services" value="6" change="2.1%" />
//           <KPICard title="Careers" value="12" change="4.5%" />
//         </div>
//       </div>
//       <div className="ml-6">
//         <DashboardChart />
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import KPICard from "@/components/AdminComponents/KpiCard";
import DashboardChart from "../../components/AdminComponents/DashboardLineCharts";
import React from "react";

const AdminDashboard = () => {
  return (
    <div className="   p-10 ">
      <h1 className="text-[30px] text-black ml-5  ">Admin Dashboard</h1>
      <div className=" p-5  mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-5 sm:gap-5 md:gap-2 lg:gap-8 xl:gap-10">
        <KPICard title="Blogs" value="42" change="5.2%" />
        <KPICard title="Blogs" value="42" change="5.2%" />
        <KPICard title="Blogs" value="42" change="5.2%" />
        <KPICard title="Blogs" value="42" change="5.2%" />
      </div>

      <div className="p-5">
        <DashboardChart />
      </div>
    </div>
  );
};

export default AdminDashboard;
