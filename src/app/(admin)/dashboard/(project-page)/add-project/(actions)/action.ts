"use server";

import { prisma } from "@/lib/prisma";
import { ReturnPayload } from "@/lib/types";
import {
  AddProjectFormValues,
  buildProjectSchema,
} from "../(validation)/validation";
import { deleteFile, uploadFile } from "@/lib/upload";

// -----------------------------
// Add Project Action (Azure)
// -----------------------------
export async function AddProjectAction(
  values: AddProjectFormValues
): Promise<ReturnPayload> {
  let uploadedPublicId: string | null = null;

  try {
    // Validate input
    const validation = buildProjectSchema(false).safeParse(values);
    if (!validation.success) {
      return {
        success: false,
        message: validation.error.issues.map((i) => i.message).join(", "),
      };
    }

    const {
      name,
      description,
      slug,
      type,
      link,
      services,
      projectDetails,
      supports,
      image,
    } = validation.data;

    // Check duplicate slug
    const existing = await prisma.project.findUnique({ where: { slug } });
    if (existing) {
      return { success: false, message: "Slug already exists" };
    }

    // Upload project image to Azure
    let imageUrl: string | null = null;

    if (image instanceof File) {
      const bytes = Buffer.from(await image.arrayBuffer());
      const uploadResult = await uploadFile(bytes, "projects");

      if (!uploadResult.success || !uploadResult.data) {
        return { success: false, message: "Failed to upload image to Azure." };
      }

      imageUrl = uploadResult.data.secure_url;
      uploadedPublicId = uploadResult.data.public_id;
    }

    // Create project with nested data
    const project = await prisma.project.create({
      data: {
        name,
        description,
        slug,
        type,
        link,
        url: imageUrl as string,
        publicId: uploadedPublicId as string, // ✅ store Azure blob ID
        services: services ? { create: services } : undefined,
        projectDetails: projectDetails ? { create: projectDetails } : undefined,
        supports: supports ? { create: supports } : undefined,
      },
      include: { services: true, projectDetails: true, supports: true },
    });

    return {
      success: true,
      message: "Project created successfully.",
      data: project,
    };
  } catch (error) {
    // Rollback uploaded image if DB fails
    if (uploadedPublicId) {
      try {
        await deleteFile(uploadedPublicId);
      } catch (err) {
        console.error("Azure rollback delete failed:", err);
      }
    }

    console.error("AddProjectAction error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error.",
    };
  }
}

// -----------------------------
// Update Project Action (Azure)
// -----------------------------
export async function UpdateProjectAction(
  id: number,
  values: AddProjectFormValues
): Promise<ReturnPayload> {
  let newPublicId: string | null = null;

  try {
    // Validate input
    const validation = buildProjectSchema(true).safeParse(values);
    if (!validation.success) {
      return {
        success: false,
        message: validation.error.issues.map((i) => i.message).join(", "),
      };
    }

    const {
      name,
      description,
      slug,
      type,
      link,
      services,
      projectDetails,
      supports,
      image,
    } = validation.data;

    // Find existing project
    const existing = await prisma.project.findUnique({
      where: { id },
      include: { services: true, projectDetails: true, supports: true },
    });
    if (!existing) {
      return { success: false, message: "Project not found." };
    }

    // Prevent duplicate slug (excluding current)
    const duplicate = await prisma.project.findFirst({
      where: { slug, NOT: { id } },
    });
    if (duplicate) {
      return {
        success: false,
        message: "Another project with this slug already exists.",
      };
    }

    let imageUrl = existing.url;
    let publicId = existing.publicId;

    // ✅ Replace image if a new one is uploaded
    if (image instanceof File) {
      const bytes = Buffer.from(await image.arrayBuffer());
      const uploadResult = await uploadFile(bytes, "projects");

      if (!uploadResult.success || !uploadResult.data) {
        return { success: false, message: "Failed to upload new image." };
      }

      imageUrl = uploadResult.data.secure_url;
      newPublicId = uploadResult.data.public_id;

      // Delete old image from Azure
      if (existing.publicId) {
        try {
          await deleteFile(existing.publicId);
        } catch (err) {
          console.error("Failed to delete old Azure project image:", err);
        }
      }

      publicId = newPublicId;
    }

    // Clear old nested relations
    await prisma.projectService.deleteMany({ where: { projectId: id } });
    await prisma.projectDetail.deleteMany({ where: { projectId: id } });
    await prisma.projectSupport.deleteMany({ where: { projectId: id } });

    // ✅ Update project record
    const updated = await prisma.project.update({
      where: { id },
      data: {
        name,
        description,
        slug,
        type,
        link,
        url: imageUrl,
        publicId,
        services: services ? { create: services } : undefined,
        projectDetails: projectDetails ? { create: projectDetails } : undefined,
        supports: supports ? { create: supports } : undefined,
      },
      include: { services: true, projectDetails: true, supports: true },
    });

    return {
      success: true,
      message: "Project updated successfully.",
      data: updated,
    };
  } catch (error) {
    // Rollback new upload if DB fails
    if (newPublicId) {
      try {
        await deleteFile(newPublicId);
      } catch (err) {
        console.error("Azure rollback delete failed:", err);
      }
    }

    console.error("UpdateProjectAction error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error.",
    };
  }
}
