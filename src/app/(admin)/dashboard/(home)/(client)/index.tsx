"use client";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import Statistics from "./card";
import { useEffect } from "react";
import { apiClient } from "@/lib/api-config/client";

interface StatTypes {
  counts: {
    totalBlogs: number;
    totalCareers: number;
    totalTestimonials: number;
    totalTeams: number;
  };
}

const Home = ({ counts }: { counts: any[] }) => {
  const fetchData = async () => {
    try {
      const reuslt = await apiClient.get("/admin/dashboard");
      console.log("client----: ", reuslt);
    } catch (error) {
      console.log("Error---: ", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          {/* <SectionCards /> */}
          <div className="grid grid-cols-1 gap-6 px-4 lg:px-6 sm:grid-cols-2 xl:grid-cols-4">
            <Statistics title="Blogs" value={5} change="5.2%" />
            <Statistics title="Careers" value={2} change="5.2%" />
            <Statistics title="Testimonials" value={3} change="5.2%" />
            <Statistics title="Teams" value={4} change="5.2%" />
          </div>

          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
          {/* <DataTable data={data || []} /> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
