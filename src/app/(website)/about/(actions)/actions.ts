import { prisma } from "@/lib/prisma";
import { serializePrisma } from "@/lib/utils";

// -----------------------------
// Get Abouts Page Data Action
// -----------------------------
export async function GetAboutPageData() {
  try {
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

    // return the about page data
    return {
      success: true,
      message: "about page data fetched successfully.",
      data: { teams, projects, blogs, companies },
    };
  } catch (error) {
    console.log("error:- ", error);
    // return
    return {
      success: false,
      message: "Failed to fetch Blogs.",
      data: { teams: [], projects: [], blogs: [], companies: [] },
    };
  }
}
