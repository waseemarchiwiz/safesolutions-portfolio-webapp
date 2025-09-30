"use server";

import { prisma } from "@/lib/prisma";
import { ReturnPayload } from "@/lib/types";
import { revalidatePath } from "next/cache";

// -----------------------------
// Delete Service Action
// -----------------------------
export async function DeleteServiceAction(id: number): Promise<ReturnPayload> {
  try {
    // ✅ Check if service exists
    const existing = await prisma.service.findUnique({
      where: { id },
    });

    if (!existing) {
      return { success: false, message: "Service not found" };
    }

    // ✅ Delete service
    await prisma.service.delete({ where: { id } });

    revalidatePath("/dashboard/services");

    return {
      success: true,
      message: "Service deleted successfully",
    };
  } catch (error) {
    console.error("DeleteServiceAction error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
