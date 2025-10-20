"use server";

import { revalidatePath } from "next/cache";
import { ReturnPayload } from "@/lib/types";
import { prisma } from "@/lib/prisma";
import {
  FaqFormValues,
  FaqSchema,
} from "../../add-faq/(validation)/validation";

// update job form values
interface fAQUpdateTypes extends FaqFormValues {
  id: number;
}

// -----------------------------
// Update fAQ Action
// -----------------------------
export async function UpdateFAQAction(
  values: fAQUpdateTypes
): Promise<ReturnPayload> {
  try {
    const validation = FaqSchema.safeParse(values);

    if (!validation.success) {
      return {
        success: false,
        message: validation.error.issues.map((i) => i.message).join(", "),
      };
    }

    console.log("validtion:--", validation);

    const { id, question, answer } = values;

    // Check duplicate For the name + slug
    const existingfAQ = await prisma.fAQ.findUnique({ where: { id } });

    if (!existingfAQ) {
      return { success: false, message: "fAQ record not found." };
    }

    // Update DB
    const updated = await prisma.fAQ.update({
      where: { id },
      data: {
        question,
        answer,
      },
    });

    revalidatePath("/dashboard/faqs");

    return {
      success: true,
      message: "Faqs record updated successfully",
      data: updated,
    };
  } catch (error) {
    console.error("Update fAQ Action error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Server-side validation for FormData
export async function DeleteFAQAction(id: number): Promise<ReturnPayload> {
  try {
    // Validate Id
    if (!id) {
      return {
        success: false,
        message: "please provide id",
      };
    }

    // delete fAQ in the database
    const fAQ = await prisma.fAQ.findUnique({ where: { id } });

    if (!fAQ) {
      return { success: false, message: "fAQ record not found" };
    }

    // Delete
    const result = await prisma.fAQ.delete({ where: { id } });

    if (!result) {
      return { success: false, message: "Failed to delete team member" };
    }

    revalidatePath("/dashboard/faqs");

    return {
      success: true,
      message: `Faq record deleted successfully`,
    };
  } catch (error) {
    console.error("delete fAQ error:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to delete record",
    };
  }
}
