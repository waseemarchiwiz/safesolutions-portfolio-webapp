"use server";

import { prisma } from "@/lib/prisma";
import { ReturnPayload } from "@/lib/types";
import path from "path";
import fs from "fs/promises";
import { FaqFormValues, FaqSchema } from "../(validation)/validation";

// -----------------------------
// Add FAQs Action
// -----------------------------
export async function AddFAQsAction(
  values: FaqFormValues
): Promise<ReturnPayload> {
  const uploadedFilePath: string | null = null; // track uploaded file path

  try {
    const validation = FaqSchema.safeParse(values);
    if (!validation.success) {
      return {
        success: false,
        message: validation.error.message,
      };
    }

    console.log("validtion:--", validation);

    const { question, answer } = validation.data;

    // Check duplicate For the name
    const existingFAQs = await prisma.fAQ.findFirst({ where: { question } });

    if (existingFAQs) {
      return { success: false, message: "Question already exists" };
    }

    const newFAQs = await prisma.fAQ.create({
      data: {
        question,
        answer,
      },
    });

    return {
      success: true,
      message: "Faq record added successfully",
      data: newFAQs,
    };
  } catch (error) {
    // Cleanup uploaded file if DB create fails
    if (uploadedFilePath) {
      const fullPath = path.join(process.cwd(), "public", uploadedFilePath);
      await fs.unlink(fullPath).catch(() => {});
    }
    console.error("AddFAQsAction error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
