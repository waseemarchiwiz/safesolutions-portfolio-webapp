"use server";

import { prisma } from "@/lib/prisma";
import { ReturnPayload } from "@/lib/types";
import { deleteFile, uploadFile } from "@/lib/upload";

// -----------------------------
// Add Service Action (Azure)
// -----------------------------
export async function AddServiceAction(
  formData: FormData
): Promise<ReturnPayload> {
  let uploadedPublicId: string | null = null;

  try {
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

    // Basic validation
    if (!slug || !title || !description) {
      return { success: false, message: "Required fields are missing." };
    }

    if (!imageFile || imageFile.size === 0) {
      return { success: false, message: "Image is required." };
    }

    // Prevent duplicate slug
    const existing = await prisma.service.findFirst({ where: { slug } });
    if (existing) {
      return {
        success: false,
        message: "Service with this slug already exists.",
      };
    }

    // ✅ Upload image to Azure
    const bytes = Buffer.from(await imageFile.arrayBuffer());
    const uploadResult = await uploadFile(bytes, "services");

    if (!uploadResult.success || !uploadResult.data) {
      return { success: false, message: "Failed to upload image to Azure." };
    }

    const imageUrl = uploadResult.data.secure_url;
    uploadedPublicId = uploadResult.data.public_id;

    // ✅ Create DB record
    const newService = await prisma.service.create({
      data: {
        slug,
        title,
        description,
        overview: overview || null,
        link: link || null,
        features,
        technologies,
        industries,
        useCases,
        url: imageUrl,
        publicId: uploadedPublicId, // ✅ store Azure publicId for future updates/deletes
      },
    });

    return {
      success: true,
      message: "Service added successfully.",
      data: newService,
    };
  } catch (error) {
    // Rollback Azure upload if DB fails
    if (uploadedPublicId) {
      try {
        await deleteFile(uploadedPublicId);
      } catch (err) {
        console.error("Azure rollback delete failed:", err);
      }
    }

    console.error("AddServiceAction error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error.",
    };
  }
}

// -----------------------------
// Update Service Action (Azure)
// -----------------------------
export async function UpdateServiceAction(
  formData: FormData,
  id: number
): Promise<ReturnPayload> {
  let newPublicId: string | null = null;

  try {
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

    // ✅ Check if service exists
    const existing = await prisma.service.findUnique({ where: { id } });
    if (!existing) {
      return { success: false, message: "Service not found." };
    }

    // ✅ Prevent duplicate slug (exclude current)
    const duplicate = await prisma.service.findFirst({
      where: { slug, NOT: { id } },
    });
    if (duplicate) {
      return {
        success: false,
        message: "Another service with this slug already exists.",
      };
    }

    let imageUrl = existing.url;
    let publicId = existing.publicId;

    // ✅ Handle new image upload (replace old one)
    if (imageFile && imageFile.size > 0) {
      const bytes = Buffer.from(await imageFile.arrayBuffer());
      const uploadResult = await uploadFile(bytes, "services");

      if (!uploadResult.success || !uploadResult.data) {
        return { success: false, message: "Failed to upload new image." };
      }

      imageUrl = uploadResult.data.secure_url;
      newPublicId = uploadResult.data.public_id;

      // Delete old Azure image
      if (existing.publicId) {
        try {
          await deleteFile(existing.publicId);
        } catch (err) {
          console.error("Failed to delete old service image:", err);
        }
      }

      publicId = newPublicId;
    } else if (existingImage) {
      imageUrl = existingImage; // Keep old image
    }

    // ✅ Update record
    const updatedService = await prisma.service.update({
      where: { id },
      data: {
        slug,
        title,
        description,
        overview: overview || null,
        link: link || null,
        features,
        technologies,
        industries,
        useCases,
        url: imageUrl,
        publicId,
      },
    });

    return {
      success: true,
      message: "Service updated successfully.",
      data: updatedService,
    };
  } catch (error) {
    // Rollback new upload if DB update fails
    if (newPublicId) {
      try {
        await deleteFile(newPublicId);
      } catch (err) {
        console.error("Azure rollback delete failed:", err);
      }
    }

    console.error("UpdateServiceAction error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error.",
    };
  }
}
