"use client";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import Statistics from "./card";

const Home = ({ stats }: { stats: any[] }) => {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          {/* <SectionCards /> */}
          <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            <Statistics
              title="Blogs"
              value={5}
              // value="2"
              change="5.2%"
            />
            <Statistics
              title="Careers"
              value={2}
              // value="1"
              change="5.2%"
            />

            <Statistics
              title="Testimonials"
              value={3}
              // value="3"
              change="5.2%"
            />
            <Statistics
              title="Teams"
              value={4}
              // value="3"
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
