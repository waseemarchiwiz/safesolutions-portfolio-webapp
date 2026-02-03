"use server";

import { prisma } from "@/lib/prisma";
import { ReturnPayload } from "@/lib/types";
import { buildTeamSchema } from "../(validation)/validation";
import { deleteFile, uploadFile } from "@/lib/upload";
import { revalidatePath } from "next/cache";

// -----------------------------
// Add Team Action (with Azure Blob Storage)
// -----------------------------
export async function AddTeamAction(
  formData: FormData,
): Promise<ReturnPayload> {
  let uploadedPublicId: string | null = null;

  try {
    const dataToParse = {
      name: formData.get("name") as string,
      role: formData.get("role") as string,
      slug: formData.get("slug") as string,
      github: formData.get("github") as string,
      linkedin: formData.get("linkedin") as string,
      twitter: formData.get("twitter") as string,
      image: formData.get("image") as File | null,
    };

    // Validate inputs
    const validation = buildTeamSchema.safeParse(dataToParse);
    if (!validation.success) {
      return {
        success: false,
        message: validation.error.message,
      };
    }

    const { name, role, slug, github, linkedin, twitter, image } =
      validation.data;

    // Check duplicate team member by slug
    const existingTeam = await prisma.team.findFirst({ where: { slug } });
    if (existingTeam) {
      return { success: false, message: "Team member already exists" };
    }

    // Upload image to Azure Blob Storage
    let imageUrl: string | null = null;

    if (image) {
      const bytes = Buffer.from(await image.arrayBuffer());
      const uploadResult = await uploadFile(bytes, "teams"); // Folder name = teams

      if (!uploadResult.success || !uploadResult.data) {
        return { success: false, message: "Image upload failed" };
      }

      imageUrl = uploadResult.data.secure_url;
      uploadedPublicId = uploadResult.data.public_id;
    }

    // Create new team record in database
    const newTeam = await prisma.team.create({
      data: {
        name,
        role,
        slug,
        github: github ?? "",
        linkedin: linkedin ?? "",
        twitter: twitter ?? "",
        url: imageUrl as string,
        publicId: uploadedPublicId as string, // store publicId for future delete/update
      },
    });

    // update the about page
    revalidatePath("/about");

    return {
      success: true,
      message: "Team member added successfully",
      data: newTeam,
    };
  } catch (error) {
    // Cleanup Azure file if DB save fails
    if (uploadedPublicId) {
      try {
        await deleteFile(uploadedPublicId);
      } catch (err) {
        console.error("Failed to clean up Azure Blob file:", err);
      }
    }

    console.error("AddTeamAction error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
