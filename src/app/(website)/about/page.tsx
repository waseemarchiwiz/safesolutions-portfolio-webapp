import { apiClient } from "@/lib/api-config/client";
import Main from "./(client)";
import { ProjectTypes } from "@/app/(admin)/dashboard/(project-page)/projects/columns";

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
  try {
    // api client

    const [teamsResult, projectsResult] = await Promise.all([
      // teams
      await apiClient.get<TeamsPayload>("/user/get/team"),
      // projects
      await apiClient.get<ProjectsPayload>("/user/get/projects"),
    ]);

    const teams = teamsResult?.Teams || [];
    const projects = projectsResult?.projects || [];

    return <Main teams={teams} projects={projects} />;
  } catch (error) {
    console.log("Error: ", error);
  }
}
