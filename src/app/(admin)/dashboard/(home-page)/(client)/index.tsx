"use client";

import Statistics from "./card";

export interface StatTypes {
  counts: {
    totalBlogs: number;
    totalCareers: number;
    totalTestimonials: number;
    totalTeams: number;
    totalServices: number;
    totalProjects: number;
    totalFAQs: number;
    totalContacts: number;
  };
}

const Home = ({ counts }: { counts: StatTypes }) => {
  const { counts: c } = counts;

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 px-4 lg:px-6">
          <Statistics title="Blogs" value={c.totalBlogs} change="5.2%" />
          <Statistics title="Careers" value={c.totalCareers} change="3.8%" />
          <Statistics
            title="Testimonials"
            value={c.totalTestimonials}
            change="4.1%"
          />
          <Statistics title="Teams" value={c.totalTeams} change="2.4%" />
          <Statistics title="Services" value={c.totalServices} change="6.9%" />
          <Statistics title="Projects" value={c.totalProjects} change="7.5%" />
          <Statistics title="Companies" value={0} change="1.2%" />
          <Statistics title="Queries" value={c.totalContacts} change="8.0%" />
        </div>
      </div>
    </div>
  );
};

export default Home;
