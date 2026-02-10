"use server";

import { revalidatePath } from "next/cache";
import { ReturnPayload } from "@/lib/types";
import { prisma } from "@/lib/prisma";

// Server-side validation for FormData
export async function DeleteQueryAction(id: number): Promise<ReturnPayload> {
  try {
    // Validate Id
    if (!id) {
      return {
        success: false,
        message: "please provide id",
      };
    }

    // delete contact in the database
    const contact = await prisma.contact.findUnique({ where: { id } });

    if (!contact) {
      return { success: false, message: "Query record not found" };
    }

    // Delete
    const result = await prisma.contact.delete({ where: { id } });

    if (!result) {
      return { success: false, message: "Failed to delete query record" };
    }

    // update the contacts page in dashboard
    revalidatePath("/dashboard/queries");

    return {
      success: true,
      message: `Query record deleted successfully`,
    };
  } catch (error) {
    console.error("delete query record error:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to delete record",
    };
  }
}
