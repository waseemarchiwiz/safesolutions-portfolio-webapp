import Main from "./(client)";
import { prisma } from "@/lib/prisma";
import { serializePrisma } from "@/lib/utils";

/**
 * This page is dynamically generated at build time.
 * on Every request, the page is revalidated.
 * This is done to ensure that the page is always up-to-date.
 */

export const revalidate = 0;

export interface TeamTypes {
  id: number;
  name: string;
  role: string;
  url: string;
  publicId: string;
  github: string;
  linkedin: string;
  twitter: string;
  createdAt: string;
  updatedAt: string;
}

export default async function AboutPage() {
  // fetch teams + projects
  const [teamsResult, projectsResult, blogsResult, companiesResult] =
    await Promise.all([
      // teams
      await prisma.team.findMany(),
      // projects
      await prisma.project.findMany(),
      // blogs
      await prisma.blog.findMany(),
      // companies
      await prisma.companies.findMany(),
    ]);

  const teams = serializePrisma(teamsResult) || [];
  const projects = serializePrisma(projectsResult) || [];
  const blogs = serializePrisma(blogsResult) || [];
  const companies = serializePrisma(companiesResult) || [];

  return (
    <Main
      teams={teams}
      projects={projects}
      blogs={blogs}
      partners={companies}
    />
  );
}
