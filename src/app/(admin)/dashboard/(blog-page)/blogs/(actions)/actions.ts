"use server";

import { ReturnPayload } from "@/lib/types";
import { prisma } from "@/lib/prisma";
import { deleteFile } from "@/lib/upload";
import { revalidatePath } from "next/cache";

// -----------------------------
// Delete Blog Action (Optional - with Azure cleanup)
// -----------------------------
export async function DeleteBlogAction(blogId: number): Promise<ReturnPayload> {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id: blogId },
      include: { images: true },
    });

    if (!blog) {
      return { success: false, message: "Blog not found" };
    }

    // Delete all images from Azure Blob Storage
    if (blog.images.length > 0) {
      await Promise.all(
        blog.images.map(async (img) => {
          try {
            if (img.publicId) {
              await deleteFile(img.publicId);
            }
          } catch (error) {
            console.error("Failed to delete image from Azure:", error);
          }
        })
      );
    }

    // Delete blog and related images from database (cascade delete)
    await prisma.blog.delete({ where: { id: blogId } });

    revalidatePath("/dashboard/blogs");

    return { success: true, message: "Blog deleted successfully" };
  } catch (error) {
    console.error("DeleteBlogAction error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
