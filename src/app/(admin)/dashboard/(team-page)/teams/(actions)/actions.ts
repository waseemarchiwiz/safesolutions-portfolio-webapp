"use server";

import { revalidatePath } from "next/cache";
import { ReturnPayload } from "@/lib/types";
import { prisma } from "@/lib/prisma";
import { EditBuildTeamSchema } from "../(validation)/validation";
import { deleteFile, uploadFile } from "@/lib/upload";

// -----------------------------
// Update Team Action (Azure)
// -----------------------------
export async function UpdateTeamAction(
  formData: FormData
): Promise<ReturnPayload> {
  let newPublicId: string | null = null;

  try {
    // Extract form data
    const dataToParse = {
      id: formData.get("id") as string,
      name: formData.get("name") as string,
      role: formData.get("role") as string,
      slug: formData.get("slug") as string,
      github: formData.get("github") as string,
      linkedin: formData.get("linkedin") as string,
      twitter: formData.get("twitter") as string,
      image: (formData.get("image") as File | string | null) ?? undefined,
    };

    const editId = Number(dataToParse.id);
    if (!editId) return { success: false, message: "Please provide ID" };

    // Validation
    const validation = EditBuildTeamSchema.safeParse(dataToParse);
    if (!validation.success) {
      return {
        success: false,
        message: validation.error.issues.map((i) => i.message).join(", "),
      };
    }

    const { name, role, slug, github, linkedin, twitter, image } =
      validation.data;

    const existing = await prisma.team.findUnique({ where: { id: editId } });
    if (!existing) return { success: false, message: "Team member not found" };

    let imageUrl = existing.url;
    let publicId = existing.publicId;

    // --- Replace image if a new file is uploaded ---
    if (image instanceof File) {
      // Upload new image
      const bytes = Buffer.from(await image.arrayBuffer());
      const uploadResult = await uploadFile(bytes, "teams");

      if (!uploadResult.success || !uploadResult.data)
        return { success: false, message: "Failed to upload image" };

      imageUrl = uploadResult.data.secure_url;
      newPublicId = uploadResult.data.public_id;

      // Delete old image from Azure if exists
      if (existing.publicId) {
        try {
          await deleteFile(existing.publicId);
        } catch (err) {
          console.error("Failed to delete old Azure file:", err);
        }
      }

      // Update publicId reference
      publicId = newPublicId;
    }

    // --- Update team record in DB ---
    const updated = await prisma.team.update({
      where: { id: editId },
      data: {
        name,
        role,
        slug,
        github,
        linkedin,
        twitter,
        url: imageUrl,
        publicId,
      },
    });

    revalidatePath("/dashboard/teams");

    return {
      success: true,
      message: "Team member updated successfully",
      data: updated,
    };
  } catch (error) {
    // Rollback new upload if something fails
    if (newPublicId) {
      try {
        await deleteFile(newPublicId);
      } catch (err) {
        console.error("Failed to rollback Azure upload:", err);
      }
    }

    console.error("UpdateTeamAction error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// -----------------------------
// Delete Team Action (Azure)
// -----------------------------
export async function DeleteTeamAction(id: number): Promise<ReturnPayload> {
  try {
    if (!id) return { success: false, message: "Please provide ID" };

    const team = await prisma.team.findUnique({ where: { id } });
    if (!team) return { success: false, message: "Team record not found" };

    // Delete from Azure Blob if exists
    if (team.publicId) {
      try {
        await deleteFile(team.publicId);
      } catch (error) {
        console.error("Failed to delete Azure file:", error);
      }
    }

    // Delete DB record
    await prisma.team.delete({ where: { id } });
    revalidatePath("/dashboard/teams");

    return {
      success: true,
      message: "Team member deleted successfully",
    };
  } catch (error) {
    console.error("DeleteTeamAction error:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to delete record",
    };
  }
}
