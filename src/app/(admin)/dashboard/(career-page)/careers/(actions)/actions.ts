"use server";

import { revalidatePath } from "next/cache";
import { ReturnPayload } from "@/lib/types";
import { prisma } from "@/lib/prisma";
import {
  buildJobSchema,
  JobFormValues,
} from "../../add-career/(validation)/validation";

// update job form values
interface CareerUpdateTypes extends JobFormValues {
  id: number;
}

// -----------------------------
// Update career Action
// -----------------------------
export async function UpdateCareerAction(
  values: CareerUpdateTypes,
): Promise<ReturnPayload> {
  try {
    // return when id not found
    if (!values.id) {
      return {
        success: false,
        message: "Please provide id",
      };
    }

    const validation = buildJobSchema.safeParse(values);

    if (!validation.success) {
      return {
        success: false,
        message: validation.error.issues.map((i) => i.message).join(", "),
      };
    }

    console.log("validtion:--", validation);

    const {
      id,
      title,
      slug,
      shortDescription,
      location,
      easyApply,
      description,
    } = values;

    // Check duplicate For the name + slug
    const existingCareer = await prisma.career.findUnique({ where: { id } });

    if (!existingCareer) {
      return { success: false, message: "Career record not found." };
    }

    // Update DB
    const updated = await prisma.career.update({
      where: { id },
      data: {
        id,
        title,
        slug,
        shortDescription,
        location,
        link: easyApply as string,
        jobDescription: description,
      },
    });

    // update the careers page in dashboard
    revalidatePath("/dashboard/careers");
    // update the careers page in website
    revalidatePath("/careers");

    return {
      success: true,
      message: "Job posting record updated successfully",
      data: updated,
    };
  } catch (error) {
    console.error("Update career Action error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Server-side validation for FormData
export async function DeleteCareerAction(id: number): Promise<ReturnPayload> {
  try {
    // Validate Id
    if (!id) {
      return {
        success: false,
        message: "please provide id",
      };
    }

    // delete career in the database
    const career = await prisma.career.findUnique({ where: { id } });

    if (!career) {
      return { success: false, message: "career record not found" };
    }

    // Delete
    const result = await prisma.career.delete({ where: { id } });

    if (!result) {
      return { success: false, message: "Failed to delete team member" };
    }

    // update the careers page in dashboard
    revalidatePath("/dashboard/careers");
    // update the careers page in website
    revalidatePath("/careers");

    return {
      success: true,
      message: `Career record deleted successfully`,
    };
  } catch (error) {
    console.error("delete career error:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to delete record",
    };
  }
}
