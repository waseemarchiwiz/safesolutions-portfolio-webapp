"use server";

import { prisma } from "@/lib/prisma";
import { ReturnPayload } from "@/lib/types";
import path from "path";
import fs from "fs/promises";
import { buildJobSchema, JobFormValues } from "../(validation)/validation";

// -----------------------------
// Add Career Action
// -----------------------------
export async function AddCareerAction(
  values: JobFormValues
): Promise<ReturnPayload> {
  const uploadedFilePath: string | null = null; // track uploaded file path

  try {
    const validation = buildJobSchema.safeParse(values);
    if (!validation.success) {
      return {
        success: false,
        message: validation.error.message,
      };
    }

    console.log("validtion:--", validation);

    const { title, slug, shortDescription, location, easyApply, description } =
      validation.data;

    // Check duplicate For the name
    const existingCareer = await prisma.career.findFirst({ where: { slug } });

    if (existingCareer) {
      return { success: false, message: "Career member already exists" };
    }

    const newCareer = await prisma.career.create({
      data: {
        title,
        slug,
        shortDescription,
        location,
        link: easyApply,
        jobDescription: description,
      },
    });

    return {
      success: true,
      message: "Career member added successfully",
      data: newCareer,
    };
  } catch (error) {
    // Cleanup uploaded file if DB create fails
    if (uploadedFilePath) {
      const fullPath = path.join(process.cwd(), "public", uploadedFilePath);
      await fs.unlink(fullPath).catch(() => {});
    }
    console.error("AddCareerAction error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
