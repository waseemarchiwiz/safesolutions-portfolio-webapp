"use server";

import { prisma } from "@/lib/prisma";
import { ReturnPayload } from "@/lib/types";
import path from "path";
import fs from "fs/promises";
import { buildTeamSchema } from "../(validation)/validation";

// -----------------------------
// Add Team Action
// -----------------------------
export async function AddTeamAction(
  formData: FormData
): Promise<ReturnPayload> {
  let uploadedFilePath: string | null = null; // track uploaded file path

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

    const validation = buildTeamSchema.safeParse(dataToParse);
    if (!validation.success) {
      return {
        success: false,
        message: validation.error.message,
      };
    }

    console.log("validtion:--", validation);

    const { name, role, slug, github, linkedin, twitter, image } =
      validation.data;

    // Check duplicate For the name
    const existingTeam = await prisma.team.findFirst({ where: { slug } });
    if (existingTeam) {
      return { success: false, message: "Team member already exists" };
    }

    // Save image
    if (image) {
      const uploadDir = path.join(process.cwd(), "public", "uploads", "teams");
      await fs.mkdir(uploadDir, { recursive: true });

      const bytes = Buffer.from(await image.arrayBuffer());
      const fileName = `${Date.now()}-${image.name}`;
      uploadedFilePath = `/uploads/teams/${fileName}`;
      const filePath = path.join(process.cwd(), "public", uploadedFilePath);
      await fs.writeFile(filePath, bytes);
    }

    const newTeam = await prisma.team.create({
      data: {
        name,
        role,
        slug,
        github: github ?? "",
        linkedin: linkedin ?? "",
        twitter: twitter ?? "",
        image: uploadedFilePath as string,
      },
    });

    return {
      success: true,
      message: "Team member added successfully",
      data: newTeam,
    };
  } catch (error) {
    // Cleanup uploaded file if DB create fails
    if (uploadedFilePath) {
      const fullPath = path.join(process.cwd(), "public", uploadedFilePath);
      await fs.unlink(fullPath).catch(() => {});
    }
    console.error("AddTeamAction error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
