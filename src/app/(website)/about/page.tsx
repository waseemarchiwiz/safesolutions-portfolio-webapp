import Main from "./(client)";
import { prisma } from "@/lib/prisma";
import { serializePrisma } from "@/lib/utils";

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
      await prisma.blog.findMany({ include: { images: true } }),
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
