import Home from "./(client)";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs"; // force Node runtime (not Edge)

export default async function HomePage() {
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

  // recent messages
  const recentMessages = await prisma.contact.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  // serialized recent messages
  const recentSerialized = recentMessages.map((msg) => ({
    ...msg,
    createdAt: msg.createdAt.toISOString(),
  }));

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
        recentMessages={recentSerialized}
      />
    </div>
  );
}
