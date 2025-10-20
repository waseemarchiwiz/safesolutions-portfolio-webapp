"use server";

import { revalidatePath } from "next/cache";
import { ReturnPayload } from "@/lib/types";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";
import { EditBuildTeamSchema } from "../(validation)/validation";

// -----------------------------
// Update Team Action
// -----------------------------
export async function UpdateTeamAction(
  formData: FormData
): Promise<ReturnPayload> {
  let uploadedFilePath: string | null = null;

  try {
    // Build data
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

    if (!editId) {
      return { success: false, message: "Please provide id" };
    }

    // Validate
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
    if (!existing) {
      return { success: false, message: "Team member not found" };
    }

    // Handle image update
    if (image instanceof File) {
      // upload new file
      const uploadDir = path.join(process.cwd(), "public", "uploads", "teams");
      fs.mkdir(uploadDir, { recursive: true }, () =>
        console.log("image added")
      );

      const bytes = Buffer.from(await image.arrayBuffer());
      const fileName = `${Date.now()}-${image.name}`;
      uploadedFilePath = `/uploads/teams/${fileName}`;
      const filePath = path.join(process.cwd(), "public", uploadedFilePath);
      fs.writeFile(filePath, bytes, () => console.log("image added"));

      // remove old image if exists
      if (existing.image) {
        const oldPath = path.join(process.cwd(), "public", existing.image);
        fs.unlink(oldPath, () => console.log("image added"));
      }
    } else if (typeof image === "string") {
      uploadedFilePath = image; // keep old string path
    } else {
      uploadedFilePath = existing.image; // no change
    }

    // Update DB
    const updated = await prisma.team.update({
      where: { id: editId },
      data: {
        name,
        role,
        slug,
        github,
        linkedin,
        twitter,
        image: uploadedFilePath,
      },
    });

    revalidatePath("/dashboard/teams");

    return {
      success: true,
      message: "Team member updated successfully",
      data: updated,
    };
  } catch (error) {
    // rollback new file if uploaded but update failed
    if (uploadedFilePath && uploadedFilePath.startsWith("/uploads/teams/")) {
      const fullPath = path.join(process.cwd(), "public", uploadedFilePath);
      fs.unlink(fullPath, () => console.log("image added"));
    }
    console.error("UpdateTeamAction error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Server-side validation for FormData
export async function DeleteTeamAction(id: number): Promise<ReturnPayload> {
  try {
    // Validate Id
    if (!id) {
      return {
        success: false,
        message: "please provide id",
      };
    }

    // delete Team in the database
    const team = await prisma.team.findUnique({ where: { id } });

    if (!team) {
      return { success: false, message: "Team record not found" };
    }

    // Delete
    const result = await prisma.team.delete({ where: { id } });

    if (!result) {
      // delete image
      fs.unlink(team.image as string, (err) => {
        if (err) console.error(`Failed to delete image: ${err.message}`);
      });
    }

    revalidatePath("/dashboard/teams");

    return {
      success: true,
      message: `Team record deleted successfully`,
    };
  } catch (error) {
    console.error("Add team error:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to delete record",
    };
  }
}
