"use server";

import { prisma } from "@/lib/prisma";
import { ReturnPayload } from "@/lib/types";
import path from "path";
import fs from "fs/promises";
import { revalidatePath } from "next/cache";

// -----------------------------
// Delete Project Action
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

    // Remove project image if exists
    if (existing.img) {
      const fullPath = path.join(process.cwd(), "public", existing.img);
      await fs.unlink(fullPath).catch(() => {}); // don’t crash if missing
    }

    // Delete project
    await prisma.project.delete({ where: { id } });

    revalidatePath("/dashboard/projects");

    return {
      success: true,
      message: "Project deleted successfully",
    };
  } catch (error) {
    console.error("DeleteProjectAction error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
