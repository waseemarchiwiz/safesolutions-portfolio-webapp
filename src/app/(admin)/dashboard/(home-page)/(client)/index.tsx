"use client";

import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import Statistics from "./card";

export interface StatTypes {
  counts: {
    totalBlogs: number;
    totalCareers: number;
    totalTestimonials: number;
    totalTeams: number;
  };
}

const Home = ({ counts }: { counts: StatTypes }) => {
  const { counts: totalCounts } = counts;

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          {/* <SectionCards /> */}
          <div className="grid grid-cols-1 gap-6 px-4 lg:px-6 sm:grid-cols-2 xl:grid-cols-4">
            <Statistics
              title="Blogs"
              value={totalCounts.totalBlogs}
              change="5.2%"
            />
            <Statistics
              title="Careers"
              value={totalCounts.totalCareers}
              change="5.2%"
            />
            <Statistics
              title="Testimonials"
              value={totalCounts.totalTestimonials}
              change="5.2%"
            />
            <Statistics
              title="Teams"
              value={totalCounts.totalTeams}
              change="5.2%"
            />
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
