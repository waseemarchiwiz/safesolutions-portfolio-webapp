import Home from "./(client)";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs"; // force Node runtime (not Edge)

export default async function HomePage() {
  try {
    const [
      totalBlogs,
      totalCareers,
      totalTestimonials,
      totalTeams,
      totalServices,
      totalProjects,
      totalFAQs,
      totalContacts,
      totalCompanies,
    ] = await Promise.all([
      prisma.blog.count(),
      prisma.career.count(),
      prisma.testimonial.count(),
      prisma.team.count(),
      prisma.service.count(),
      prisma.project.count(),
      prisma.fAQ.count(),
      prisma.contact.count(),
      prisma.companies.count(),
    ]);

    return (
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
      />
    );
  } catch (error) {
    console.error("Dashboard count fetch failed:", error);
    return <div>Something went wrong loading dashboard stats.</div>;
  }
}
