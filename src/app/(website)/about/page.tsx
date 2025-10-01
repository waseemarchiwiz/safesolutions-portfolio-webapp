import { apiClient } from "@/lib/api-config/client";
import Main from "./(client)";
import { ProjectTypes } from "@/app/(admin)/dashboard/(project-page)/projects/columns";
import { prisma } from "@/lib/prisma";
import { serializePrisma } from "@/lib/utils";

export interface TeamTypes {
  id: number;
  name: string;
  role: string;
  image: string;
  github: string;
  linkedin: string;
  twitter: string;
  createdAt: string;
  updatedAt: string;
}

type TeamsPayload = {
  success: boolean;
  Teams: TeamTypes[];
};

type ProjectsPayload = {
  success: boolean;
  projects: ProjectTypes[];
};

export default async function AboutPage() {
  // fetch teams + projects
  const [teamsResult, projectsResult] = await Promise.all([
    // teams
    await prisma.team.findMany(),
    // projects
    await prisma.project.findMany(),
  ]);

  const teams = serializePrisma(teamsResult) || [];
  const projects = serializePrisma(projectsResult) || [];

  return <Main teams={teams} projects={projects} />;
}
