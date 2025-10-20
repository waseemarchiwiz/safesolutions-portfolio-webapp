"use server";

import { prisma } from "@/lib/prisma";
import { ReturnPayload } from "@/lib/types";
import path from "path";
import fs from "fs/promises";

// Helper function to save uploaded file
async function saveUploadedFile(file: File): Promise<string> {
  const timestamp = Date.now();
  const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
  const fileName = `${timestamp}-${sanitizedName}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads", "services");

  // Ensure directory exists
  await fs.mkdir(uploadDir, { recursive: true });

  const filePath = path.join(uploadDir, fileName);
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filePath, buffer);

  return `/uploads/services/${fileName}`;
}

// Helper function to delete file
async function deleteFile(filePath: string): Promise<void> {
  try {
    const fullPath = path.join(process.cwd(), "public", filePath);
    await fs.unlink(fullPath);
  } catch (error) {
    console.error("Error deleting file:", error);
  }
}

// -----------------------------
// Add Service Action
// -----------------------------
export async function AddServiceAction(
  formData: FormData
): Promise<ReturnPayload> {
  let uploadedFilePath: string | null = null;

  try {
    // Extract form data
    const slug = formData.get("slug") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const overview = formData.get("overview") as string;
    const link = formData.get("link") as string;
    const features = JSON.parse((formData.get("features") as string) || "[]");
    const technologies = JSON.parse(
      (formData.get("technologies") as string) || "[]"
    );
    const industries = JSON.parse(
      (formData.get("industries") as string) || "[]"
    );
    const useCases = JSON.parse((formData.get("useCases") as string) || "[]");
    const imageFile = formData.get("image") as File | null;

    // Validate required fields
    if (!slug || !title || !description) {
      return {
        success: false,
        message: "Required fields are missing",
      };
    }

    if (!imageFile || imageFile.size === 0) {
      return {
        success: false,
        message: "Image is required",
      };
    }

    // Check duplicate service by slug
    const existingService = await prisma.service.findFirst({
      where: { slug },
    });
    if (existingService) {
      return {
        success: false,
        message: "Service with this slug already exists",
      };
    }

    // Upload image
    uploadedFilePath = await saveUploadedFile(imageFile);

    // Create new service
    const newService = await prisma.service.create({
      data: {
        slug,
        title,
        description,
        overview: overview || null,
        features,
        link: link || null,
        technologies,
        industries,
        useCases,
        image: uploadedFilePath,
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
      await deleteFile(uploadedFilePath);
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
  formData: FormData,
  id: number
): Promise<ReturnPayload> {
  let newUploadedFilePath: string | null = null;
  let oldImagePath: string | null = null;

  try {
    // Extract form data
    const slug = formData.get("slug") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const overview = formData.get("overview") as string;
    const link = formData.get("link") as string;
    const features = JSON.parse((formData.get("features") as string) || "[]");
    const technologies = JSON.parse(
      (formData.get("technologies") as string) || "[]"
    );
    const industries = JSON.parse(
      (formData.get("industries") as string) || "[]"
    );
    const useCases = JSON.parse((formData.get("useCases") as string) || "[]");
    const imageFile = formData.get("image") as File | null;
    const existingImage = formData.get("existingImage") as string | null;

    // Check if service exists
    const existing = await prisma.service.findUnique({
      where: { id },
    });
    if (!existing) {
      return { success: false, message: "Service not found" };
    }

    // Prevent duplicate slug (except itself)
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

    // Handle image update
    let imagePath = existing.image; // Keep existing by default

    if (imageFile && imageFile.size > 0) {
      // New image uploaded
      oldImagePath = existing.image;
      newUploadedFilePath = await saveUploadedFile(imageFile);
      imagePath = newUploadedFilePath;
    } else if (existingImage) {
      // Keep existing image
      imagePath = existingImage;
    }

    // Update service
    const updated = await prisma.service.update({
      where: { id },
      data: {
        slug,
        title,
        description,
        overview: overview || null,
        features,
        link: link || null,
        technologies,
        industries,
        useCases,
        image: imagePath as string,
      },
    });

    // Delete old image if new one was uploaded successfully
    if (oldImagePath && newUploadedFilePath) {
      await deleteFile(oldImagePath);
    }

    return {
      success: true,
      message: "Service updated successfully",
      data: updated,
    };
  } catch (error) {
    // Cleanup new uploaded file if DB fails
    if (newUploadedFilePath) {
      await deleteFile(newUploadedFilePath);
    }
    console.error("UpdateServiceAction error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
