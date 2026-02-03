"use server";

import { prisma } from "@/lib/prisma";
import { ReturnPayload } from "@/lib/types";
import { deleteFile } from "@/lib/upload";
import { revalidatePath } from "next/cache";

// -----------------------------
// Delete Project Action (Azure Blob Storage)
// -----------------------------
export async function DeleteProjectAction(id: number): Promise<ReturnPayload> {
  try {
    // Check if project exists
    const existing = await prisma.project.findUnique({
      where: { id },
    });

    if (!existing) {
      return { success: false, message: "Project not found" };
    }

    // Delete image from Azure Blob Storage (if exists)
    if (existing.publicId) {
      try {
        await deleteFile(existing.publicId);
      } catch (error) {
        console.error("Failed to delete image from Azure Blob Storage:", error);
      }
    }

    // Delete the project from DB
    await prisma.project.delete({ where: { id } });

    // Revalidate page cache
    revalidatePath("/dashboard/projects");
    // update the projects page in website
    revalidatePath("/about");
    // update the home page
    revalidatePath("/");

    return {
      success: true,
      message: "Project deleted successfully.",
    };
  } catch (error) {
    console.error("DeleteProjectAction error:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Unknown error occurred.",
    };
  }
}
