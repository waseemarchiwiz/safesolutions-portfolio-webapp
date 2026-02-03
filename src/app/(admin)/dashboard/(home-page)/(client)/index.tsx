"use client";

import Statistics from "./card";

export interface StatTypes {
  totalBlogs: number;
  totalCareers: number;
  totalTestimonials: number;
  totalTeams: number;
  totalServices: number;
  totalProjects: number;
  totalFAQs: number;
  totalContacts: number;
  totalCompanies: number;
}

const Home = ({
  totalBlogs,
  totalCareers,
  totalTestimonials,
  totalTeams,
  totalServices,
  totalProjects,
  totalContacts,
  totalCompanies,
}: StatTypes) => {
  return (
    <div className="w-full flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 px-4 lg:px-6">
        <Statistics title="Blogs" value={totalBlogs} change="5.2%" />
        <Statistics title="Careers" value={totalCareers} change="3.8%" />
        <Statistics
          title="Testimonials"
          value={totalTestimonials}
          change="4.1%"
        />
        <Statistics title="Teams" value={totalTeams} change="2.4%" />
        <Statistics title="Services" value={totalServices} change="6.9%" />
        <Statistics title="Projects" value={totalProjects} change="7.5%" />
        <Statistics title="Companies" value={totalCompanies} change="1.2%" />
        <Statistics title="Queries" value={totalContacts} change="8.0%" />
      </div>
    </div>
  );
};

export default Home;
