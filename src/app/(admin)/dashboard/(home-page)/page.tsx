import { GetStats } from "./(actions)/action";
import Home from "./(client)";

export const runtime = "nodejs"; // force Node runtime (not Edge)

export default async function HomePage() {
  // get stats data
  const {
    data: {
      totalBlogs,
      totalCareers,
      totalTestimonials,
      totalTeams,
      totalServices,
      totalProjects,
      totalFAQs,
      totalContacts,
      totalCompanies,
      recentMessages,
    },
  } = await GetStats();

  return (
    <div className="w-full max-w-7xl mx-auto">
      <Home
        totalBlogs={totalBlogs}
        totalCareers={totalCareers}
        totalTestimonials={totalTestimonials}
        totalTeams={totalTeams}
        totalServices={totalServices}
        totalProjects={totalProjects}
        totalFAQs={totalFAQs}
        totalContacts={totalContacts}
        totalCompanies={totalCompanies}
        recentMessages={recentMessages}
      />
    </div>
  );
}
