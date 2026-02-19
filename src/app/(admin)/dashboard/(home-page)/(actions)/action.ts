import { prisma } from "@/lib/prisma";
import { ReturnPayload } from "@/lib/types";

// -----------------------------
// Stats Action
// -----------------------------
export async function GetStats(): Promise<ReturnPayload> {
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
      recentMessages,
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
      // get recent messages
      prisma.contact.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

    // serialize data
    const stats = {
      totalBlogs,
      totalCareers,
      totalTestimonials,
      totalTeams,
      totalServices,
      totalProjects,
      totalFAQs,
      totalContacts,
      totalCompanies,
      recentMessages: recentMessages.map((msg) => ({
        ...msg,
        createdAt: msg.createdAt.toISOString(),
      })),
    };

    // return the stats data
    return {
      success: true,
      message: "Stats fetched successfully.",
      data: stats,
    };
  } catch (error) {
    console.log("error:- ", error);
    // return
    return {
      success: false,
      message: "Failed to fetch stats.",
      data: [],
      total: 0,
    };
  }
}
