import { prisma } from "@/lib/prisma";
import { serializePrisma } from "@/lib/utils";

// -----------------------------
// Get Project By Slug Action
// -----------------------------
export async function GetProjectBySlug(slug: string) {
  try {
    const [projectsResult] = await Promise.all([
      await prisma.project.findUnique({
        where: { slug },
        include: {
          services: true,
          projectDetails: true,
          supports: true,
        },
      }),
    ]);

    // serialize data
    const project = serializePrisma(projectsResult);

    // return the Projects data
    return {
      success: true,
      message: "Project record fetched successfully.",
      data: project,
    };
  } catch (error) {
    console.log("error:- ", error);
    // return
    return {
      success: false,
      message: "Failed to fetch Project.",
      data: {},
    };
  }
}
