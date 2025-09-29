"use server";

import { prisma } from "@/lib/prisma";
import { ReturnPayload } from "@/lib/types";
import path from "path";
import fs from "fs/promises";
import { buildBlogSchema } from "../(validation)/validation";

// -----------------------------
// Add Blog Action
// -----------------------------
export async function AddBlogAction(
  formData: FormData
): Promise<ReturnPayload> {
  try {
    const dataToParse = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      content: formData.get("content") as string,
      slug: formData.get("slug") as string,
      images: formData.getAll("images") as File[], // ✅ fix
    };

    const validation = buildBlogSchema(false).safeParse(dataToParse);
    if (!validation.success) {
      return {
        success: false,
        message: validation.error.message,
      };
    }

    const { title, slug, description, content, images } = validation.data;

    const isBlog = await prisma.blog.findFirst({ where: { slug } });
    if (isBlog) {
      return { success: false, message: "Blog already exists" };
    }

    // Save files
    let imagePaths: string[] = [];
    if (images && images.length > 0) {
      const uploadDir = path.join(process.cwd(), "public", "uploads", "blogs");
      await fs.mkdir(uploadDir, { recursive: true });

      imagePaths = await Promise.all(
        images.map(async (file) => {
          const bytes = Buffer.from(await file.arrayBuffer());
          const fileName = `${Date.now()}-${file.name}`;
          const filePath = path.join(uploadDir, fileName);
          await fs.writeFile(filePath, bytes);
          return `/uploads/blogs/${fileName}`;
        })
      );
    }

    const blog = await prisma.blog.create({
      data: { title, slug, description, content },
    });

    if (imagePaths.length > 0) {
      await Promise.all(
        imagePaths.map((img) =>
          prisma.blogImage.create({ data: { blogId: blog.id, image: img } })
        )
      );
    }

    return { success: true, message: "Blog added successfully", data: blog };
  } catch (error) {
    console.error("AddBlogAction error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// -----------------------------
// Update Blog Action
// -----------------------------
export async function UpdateBlogAction(
  formData: FormData
): Promise<ReturnPayload> {
  try {
    const dataToParse = {
      id: formData.get("id") as string,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      content: formData.get("content") as string,
      slug: formData.get("slug") as string,
      images: formData.getAll("images") as File[], // ✅ fix
    };
    // id validation
    if (!dataToParse.id || dataToParse.id === null) {
      return { success: false, message: "Please provide edit id" };
    }
    // Validtion
    const validation = buildBlogSchema(true).safeParse(dataToParse);
    if (!validation.success) {
      return { success: false, message: validation.error.message };
    }

    const { title, slug, description, content, images } = validation.data;
    const blogId = Number(dataToParse.id);

    const existing = await prisma.blog.findUnique({ where: { id: blogId } });
    if (!existing) {
      return { success: false, message: "Blog not found" };
    }

    let imagePaths: string[] = [];
    if (images && images.length > 0) {
      const uploadDir = path.join(process.cwd(), "public", "uploads", "blogs");
      await fs.mkdir(uploadDir, { recursive: true });

      imagePaths = await Promise.all(
        images.map(async (file) => {
          const bytes = Buffer.from(await file.arrayBuffer());
          const fileName = `${Date.now()}-${file.name}`;
          const filePath = path.join(uploadDir, fileName);
          await fs.writeFile(filePath, bytes);
          return `/uploads/blogs/${fileName}`;
        })
      );
    }

    const updated = await prisma.blog.update({
      where: { id: blogId },
      data: { title, slug, description, content },
    });

    if (imagePaths.length > 0) {
      const oldImages = await prisma.blogImage.findMany({ where: { blogId } });
      await Promise.all(
        oldImages.map(async (img) => {
          const fullPath = path.join(process.cwd(), "public", img.image);
          await fs.unlink(fullPath).catch(() => {});
          await prisma.blogImage.delete({ where: { id: img.id } });
        })
      );

      await Promise.all(
        imagePaths.map((img) =>
          prisma.blogImage.create({ data: { blogId, image: img } })
        )
      );
    }

    return {
      success: true,
      message: "Blog updated successfully",
      data: updated,
    };
  } catch (error) {
    console.error("UpdateBlogAction error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
