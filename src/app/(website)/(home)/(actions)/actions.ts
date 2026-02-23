import { prisma } from "@/lib/prisma";
import { serializePrisma } from "@/lib/utils";

// -----------------------------
// Get Home Page Data Action
// -----------------------------
export async function GetHomePageData() {
  try {
    // fetch teams + projects
    const [faqsResult, projectsResult, testimonialResult, serviceResult] =
      await Promise.all([
        // teams
        await prisma.fAQ.findMany(),
        // projects
        await prisma.project.findMany(),
        // testimonials
        await prisma.testimonial.findMany(),
        // services
        await prisma.service.findMany(),
      ]);

    const faqs = serializePrisma(faqsResult) || [];
    const projects = serializePrisma(projectsResult) || [];
    const testimonials = serializePrisma(testimonialResult) || [];
    const services = serializePrisma(serviceResult) || [];

    // return the about page data
    return {
      success: true,
      message: "about page data fetched successfully.",
      data: { faqs, projects, testimonials, services },
    };
  } catch (error) {
    console.log("error:- ", error);
    // return
    return {
      success: false,
      message: "Failed to fetch Blogs.",
      data: { faqs: [], projects: [], testimonials: [], services: [] },
    };
  }
}
