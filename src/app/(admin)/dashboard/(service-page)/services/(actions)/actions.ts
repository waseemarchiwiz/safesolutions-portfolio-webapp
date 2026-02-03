"use server";

import { prisma } from "@/lib/prisma";
import { ReturnPayload } from "@/lib/types";
import { deleteFile } from "@/lib/upload";
import { revalidatePath } from "next/cache";

// -----------------------------
// Delete Service Action (Azure Blob Storage)
// -----------------------------
export async function DeleteServiceAction(id: number): Promise<ReturnPayload> {
  try {
    // Check if service exists
    const existing = await prisma.service.findUnique({
      where: { id },
    });

    if (!existing) {
      return { success: false, message: "Service not found" };
    }

    // Delete Azure Blob image if exists
    if (existing.publicId) {
      try {
        await deleteFile(existing.publicId);
      } catch (error) {
        console.error("Failed to delete image from Azure Blob:", error);
      }
    }

    // Delete the service record
    await prisma.service.delete({ where: { id } });

    // Revalidate dashboard services page

    // update the services page in website
    revalidatePath("/dashboard/services");
    // update the services page
    revalidatePath("/services");
    // update the home page
    revalidatePath("/");

    return {
      success: true,
      message: "Service deleted successfully.",
    };
  } catch (error) {
    console.error("DeleteServiceAction error:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to delete service.",
    };
  }
}
