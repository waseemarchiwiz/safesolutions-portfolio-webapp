import { serializePrisma } from "@/lib/utils";
import Main from "./(client)";
import { prisma } from "@/lib/prisma";

/**
 * This page is dynamically generated at build time.
 * on Every request, the page is revalidated.
 * This is done to ensure that the page is always up-to-date.
 */

export const revalidate = 0;

export default async function HomePage() {
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

  // fetch the data and pass to the client
  return (
    <Main
      faqs={faqs}
      projects={projects}
      testimonials={testimonials}
      services={services}
    />
  );
}
