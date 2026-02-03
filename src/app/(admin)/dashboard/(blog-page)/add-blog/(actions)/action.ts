"use server";

import { prisma } from "@/lib/prisma";
import { ReturnPayload } from "@/lib/types";
import { buildBlogSchema } from "../(validation)/validation";
import { deleteFile, uploadFile } from "@/lib/upload";
import { revalidatePath } from "next/cache";

// -----------------------------
// Add Blog Action
// -----------------------------
export async function AddBlogAction(
  formData: FormData,
): Promise<ReturnPayload> {
  try {
    const dataToParse = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      content: formData.get("content") as string,
      slug: formData.get("slug") as string,
      images: formData.getAll("images") as File[],
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

    // Upload files to Azure Blob Storage
    let imageUrls: string[] = [];
    let publicIds: string[] = [];

    if (images && images.length > 0) {
      const uploadResults = await Promise.all(
        images.map(async (file) => {
          try {
            // Convert File to Buffer
            const bytes = Buffer.from(await file.arrayBuffer());

            // Upload to Azure
            const result = await uploadFile(bytes, "blogs");

            if (result.success && result.data) {
              return {
                url: result.data.secure_url,
                publicId: result.data.public_id,
              };
            }
            throw new Error("Upload failed");
          } catch (error) {
            console.error("Failed to upload image:", error);
            throw error;
          }
        }),
      );

      imageUrls = uploadResults.map((r) => r.url);
      publicIds = uploadResults.map((r) => r.publicId);
    }

    const blog = await prisma.blog.create({
      data: { title, slug, description, content },
    });

    if (imageUrls.length > 0) {
      await Promise.all(
        imageUrls.map((url, index) =>
          prisma.blogImage.create({
            data: {
              blogId: blog.id,
              url: url as string,
              publicId: publicIds[index], // Store public_id for deletion
            },
          }),
        ),
      );
    }

    // update blog count
    revalidatePath("/dashboard/blogs");
    revalidatePath("/blogs");
    revalidatePath("/about");

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
  formData: FormData,
): Promise<ReturnPayload> {
  try {
    const dataToParse = {
      id: formData.get("id") as string,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      content: formData.get("content") as string,
      slug: formData.get("slug") as string,
      images: formData.getAll("images") as File[],
    };

    if (!dataToParse.id) {
      return { success: false, message: "Please provide edit id" };
    }

    // Validate data
    const validation = buildBlogSchema(true).safeParse(dataToParse);
    if (!validation.success) {
      return { success: false, message: validation.error.message };
    }

    const { title, slug, description, content, images } = validation.data;
    const blogId = Number(dataToParse.id);

    const existing = await prisma.blog.findUnique({
      where: { id: blogId },
      include: { images: true },
    });

    if (!existing) {
      return { success: false, message: "Blog not found" };
    }

    // --- Update core fields ---
    const updated = await prisma.blog.update({
      where: { id: blogId },
      data: { title, slug, description, content },
    });

    // --- Handle image update (replace previous image) ---
    if (images && images.length > 0) {
      const newImageFile = images[0]; // take only the first image

      // Upload new image to Azure
      const bytes = Buffer.from(await newImageFile.arrayBuffer());
      const result = await uploadFile(bytes, "blogs");

      if (!result.success || !result.data) {
        return { success: false, message: "Image upload failed" };
      }

      const newImageUrl = result.data.secure_url;
      const newPublicId = result.data.public_id;

      // Delete old image if exists
      if (existing.images.length > 0) {
        const oldImg = existing.images[0];
        if (oldImg.publicId) {
          try {
            await deleteFile(oldImg.publicId); // remove from Azure
          } catch (error) {
            console.error("Failed to delete old image from Azure:", error);
          }
        }
        await prisma.blogImage.deleteMany({ where: { blogId } }); // remove from DB
      }

      // Save new image in DB
      await prisma.blogImage.create({
        data: {
          blogId,
          url: newImageUrl,
          publicId: newPublicId,
        },
      });
    }

    // update blog count
    revalidatePath("/blogs");
    revalidatePath("/about");

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
