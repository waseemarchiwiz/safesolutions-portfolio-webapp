import { serializePrisma } from "@/lib/utils";
import Main from "./(client)";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  // fetch teams + projects
  const [faqsResult, projectsResult, testimonialResult] = await Promise.all([
    // teams
    await prisma.fAQ.findMany(),
    // projects
    await prisma.project.findMany(),
    // testimonials
    await prisma.testimonial.findMany(),
  ]);

  const faqs = serializePrisma(faqsResult) || [];
  const projects = serializePrisma(projectsResult) || [];
  const testimonials = serializePrisma(testimonialResult) || [];

  // fetch the data and pass to the client
  return <Main faqs={faqs} projects={projects} testimonials={testimonials} />;
}
