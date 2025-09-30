"use server";

import { prisma } from "@/lib/prisma";
import { ReturnPayload } from "@/lib/types";
import path from "path";
import fs from "fs/promises";
import {
  AddServiceFormValues,
  buildServiceSchema,
} from "../(validation)/validation";

// -----------------------------
// Add Service Action
// -----------------------------
export async function AddServiceAction(
  values: AddServiceFormValues
): Promise<ReturnPayload> {
  let uploadedFilePath: string | null = null;

  try {
    // Validate input
    const validation = buildServiceSchema(false).safeParse(values);
    if (!validation.success) {
      return {
        success: false,
        message: validation.error.issues.map((i) => i.message).join(", "),
      };
    }

    const {
      tab,
      slug,
      title,
      icon,
      description,
      overview,
      features,
      link,
      technologies,
      industries,
      useCases,
    } = validation.data;

    // Check duplicate service by slug
    const existingService = await prisma.service.findFirst({ where: { slug } });
    if (existingService) {
      return { success: false, message: "Service already exists" };
    }

    // Create new service
    const newService = await prisma.service.create({
      data: {
        tab,
        slug,
        title,
        icon,
        description,
        overview,
        features,
        link,
        technologies,
        industries,
        useCases,
      },
    });

    return {
      success: true,
      message: "Service added successfully",
      data: newService,
    };
  } catch (error) {
    // Cleanup uploaded file if DB fails
    if (uploadedFilePath) {
      const fullPath = path.join(process.cwd(), "public", uploadedFilePath);
      await fs.unlink(fullPath).catch(() => {});
    }
    console.error("AddServiceAction error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// -----------------------------
// Update Service Action
// -----------------------------
export async function UpdateServiceAction(
  values: AddServiceFormValues,
  id: number
): Promise<ReturnPayload> {
  try {
    // ✅ Validate input
    const validation = buildServiceSchema(true).safeParse(values);
    if (!validation.success) {
      return {
        success: false,
        message: validation.error.issues.map((i) => i.message).join(", "),
      };
    }

    const {
      tab,
      slug,
      title,
      icon,
      description,
      overview,
      features,
      link,
      technologies,
      industries,
      useCases,
    } = validation.data;

    // ✅ Check if service exists
    const existing = await prisma.service.findUnique({
      where: { id },
    });
    if (!existing) {
      return { success: false, message: "Service not found" };
    }

    // ✅ Prevent duplicate title/slug (except itself)
    const duplicate = await prisma.service.findFirst({
      where: {
        slug,
        NOT: { id },
      },
    });
    if (duplicate) {
      return {
        success: false,
        message: "Another service with this slug already exists",
      };
    }

    // ✅ Update service
    const updated = await prisma.service.update({
      where: { id },
      data: {
        tab,
        slug,
        title,
        icon,
        description,
        overview,
        features,
        link,
        technologies,
        industries,
        useCases,
      },
    });

    return {
      success: true,
      message: "Service updated successfully",
      data: updated,
    };
  } catch (error) {
    console.error("UpdateServiceAction error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
