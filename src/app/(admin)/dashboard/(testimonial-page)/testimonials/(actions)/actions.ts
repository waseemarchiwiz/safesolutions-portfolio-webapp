"use server";

import { revalidatePath } from "next/cache";
import { ReturnPayload } from "@/lib/types";
import { prisma } from "@/lib/prisma";

import { EditTestimonialsSchema } from "../(validation)/validation";
import { deleteFile, uploadFile } from "@/lib/upload";

// -----------------------------
// Update testimonials Action
// -----------------------------

export async function UpdateTestimonialsAction(
  formData: FormData
): Promise<ReturnPayload> {
  let newPublicId: string | null = null;

  try {
    // Extract data
    const dataToParse = {
      id: formData.get("id") as string,
      name: formData.get("name") as string,
      slug: formData.get("slug") as string,
      designation: formData.get("designation") as string,
      description: formData.get("description") as string,
      image: (formData.get("image") as File | string | null) ?? undefined,
    };

    const editId = Number(dataToParse.id);
    if (!editId) {
      return { success: false, message: "Please provide id" };
    }

    // ✅ Validate input
    const validation = EditTestimonialsSchema.safeParse(dataToParse);
    if (!validation.success) {
      return {
        success: false,
        message: validation.error.issues.map((i) => i.message).join(", "),
        data: dataToParse,
      };
    }

    const { name, slug, designation, description, image } = validation.data;

    const existing = await prisma.testimonial.findUnique({
      where: { id: editId },
    });
    if (!existing) {
      return { success: false, message: "Testimonial not found" };
    }

    let imageUrl = existing.url;
    let publicId = existing.publicId;

    // ✅ Replace image if new File uploaded
    if (image instanceof File) {
      const bytes = Buffer.from(await image.arrayBuffer());
      const uploadResult = await uploadFile(bytes, "testimonials");

      if (!uploadResult.success || !uploadResult.data) {
        return { success: false, message: "Failed to upload image" };
      }

      imageUrl = uploadResult.data.secure_url;
      newPublicId = uploadResult.data.public_id;

      // Delete old image from Azure
      if (existing.publicId) {
        try {
          await deleteFile(existing.publicId);
        } catch (err) {
          console.error("Failed to delete old image:", err);
        }
      }

      publicId = newPublicId;
    }

    // ✅ Update DB record
    const updated = await prisma.testimonial.update({
      where: { id: editId },
      data: {
        name,
        slug,
        designation,
        description,
        url: imageUrl,
        publicId,
      },
    });

    revalidatePath("/dashboard/testimonials");

    return {
      success: true,
      message: "Testimonial updated successfully",
      data: updated,
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

    console.error("UpdateTestimonialsAction error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// -----------------------------
// Delete Testimonials Action (Azure)
// -----------------------------
export async function DeleteTestimonialsAction(
  id: number
): Promise<ReturnPayload> {
  try {
    if (!id) {
      return { success: false, message: "Please provide id" };
    }

    const testimonial = await prisma.testimonial.findUnique({ where: { id } });
    if (!testimonial) {
      return { success: false, message: "Testimonial record not found" };
    }

    // ✅ Delete image from Azure if it exists
    if (testimonial.publicId) {
      try {
        await deleteFile(testimonial.publicId);
      } catch (err) {
        console.error("Failed to delete image from Azure:", err);
      }
    }

    // ✅ Delete DB record
    await prisma.testimonial.delete({ where: { id } });
    revalidatePath("/dashboard/testimonials");

    return {
      success: true,
      message: "Testimonial deleted successfully",
    };
  } catch (error) {
    console.error("DeleteTestimonialsAction error:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to delete record",
    };
  }
}
