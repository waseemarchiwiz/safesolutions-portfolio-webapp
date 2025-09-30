"use server";

import { prisma } from "@/lib/prisma";
import { ReturnPayload } from "@/lib/types";
import path from "path";
import fs from "fs/promises";
import {
  AddProjectFormValues,
  buildProjectSchema,
} from "../(validation)/validation";

// -----------------------------
// Add Project Action
// -----------------------------
export async function AddProjectAction(
  values: AddProjectFormValues
): Promise<ReturnPayload> {
  let uploadedFilePath: string | null = null;

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
      version,
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

    // Handle image upload
    if (image instanceof File) {
      const uploadDir = path.join(
        process.cwd(),
        "public",
        "uploads",
        "projects"
      );
      await fs.mkdir(uploadDir, { recursive: true });

      const bytes = Buffer.from(await image.arrayBuffer());
      const fileName = `${Date.now()}-${image.name}`;
      uploadedFilePath = `/uploads/projects/${fileName}`;
      const filePath = path.join(process.cwd(), "public", uploadedFilePath);

      await fs.writeFile(filePath, bytes);
    }

    // Create project with nested data
    const project = await prisma.project.create({
      data: {
        name,
        description,
        slug,
        img: uploadedFilePath as string,
        type,
        link,
        services: services ? { create: services } : undefined,
        projectDetails: projectDetails ? { create: projectDetails } : undefined,
        supports: supports ? { create: supports } : undefined,
      },
      include: { services: true, projectDetails: true, supports: true },
    });

    return {
      success: true,
      message: "Project created successfully",
      data: project,
    };
  } catch (error) {
    // rollback uploaded image if DB fails
    if (uploadedFilePath) {
      const fullPath = path.join(process.cwd(), "public", uploadedFilePath);
      await fs.unlink(fullPath).catch(() => {});
    }
    console.error("AddProjectAction error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// -----------------------------
// Update Project Action
// -----------------------------
export async function UpdateProjectAction(
  id: number,
  values: AddProjectFormValues
): Promise<ReturnPayload> {
  let uploadedFilePath: string | null = null;

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
      version,
      type,
      link,
      services,
      projectDetails,
      supports,
      image,
    } = validation.data;

    // Check existing project
    const existing = await prisma.project.findUnique({
      where: { id },
      include: { services: true, projectDetails: true, supports: true },
    });
    if (!existing) {
      return { success: false, message: "Project not found" };
    }

    // Handle image replacement
    if (image instanceof File) {
      // delete old image
      if (existing.img) {
        const oldPath = path.join(process.cwd(), "public", existing.img);
        await fs.unlink(oldPath).catch(() => {});
      }

      // save new image
      const uploadDir = path.join(
        process.cwd(),
        "public",
        "uploads",
        "projects"
      );
      await fs.mkdir(uploadDir, { recursive: true });

      const bytes = Buffer.from(await image.arrayBuffer());
      const fileName = `${Date.now()}-${image.name}`;
      uploadedFilePath = `/uploads/projects/${fileName}`;
      const filePath = path.join(process.cwd(), "public", uploadedFilePath);

      await fs.writeFile(filePath, bytes);
    }

    // Clear old nested relations
    await prisma.projectService.deleteMany({ where: { projectId: id } });
    await prisma.projectDetail.deleteMany({ where: { projectId: id } });
    await prisma.projectSupport.deleteMany({ where: { projectId: id } });

    // Update project
    const updated = await prisma.project.update({
      where: { id },
      data: {
        name,
        description,
        slug,
        img: uploadedFilePath || existing.img,
        type,
        link,
        services: services ? { create: services } : undefined,
        projectDetails: projectDetails ? { create: projectDetails } : undefined,
        supports: supports ? { create: supports } : undefined,
      },
      include: { services: true, projectDetails: true, supports: true },
    });

    return {
      success: true,
      message: "Project updated successfully",
      data: updated,
    };
  } catch (error) {
    // rollback uploaded image if DB fails
    if (uploadedFilePath) {
      const fullPath = path.join(process.cwd(), "public", uploadedFilePath);
      await fs.unlink(fullPath).catch(() => {});
    }
    console.error("UpdateProjectAction error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
