"use server";

import { revalidatePath } from "next/cache";
import { ReturnPayload } from "@/lib/types";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";
import { EditTestimonialsSchema } from "../(validation)/validation";

// -----------------------------
// Update testimonials Action
// -----------------------------
export async function UpdateTestimonialsAction(
  formData: FormData
): Promise<ReturnPayload> {
  let uploadedFilePath: string | null = null;

  try {
    // Build data
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

    // Validate
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

    // Handle image update
    if (image instanceof File) {
      // upload new file
      const uploadDir = path.join(
        process.cwd(),
        "public",
        "uploads",
        "testimonials"
      );
      fs.mkdir(uploadDir, { recursive: true }, () =>
        console.log("image added")
      );

      const bytes = Buffer.from(await image.arrayBuffer());
      const fileName = `${Date.now()}-${image.name}`;
      uploadedFilePath = `/uploads/testimonials/${fileName}`;
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
    const updated = await prisma.testimonial.update({
      where: { id: editId },
      data: {
        name,
        slug,
        designation,
        description,
        image: uploadedFilePath,
      },
    });

    revalidatePath("/dashboard/testimonials");

    return {
      success: true,
      message: "Testimonials updated successfully",
      data: updated,
    };
  } catch (error) {
    // rollback new file if uploaded but update failed
    if (
      uploadedFilePath &&
      uploadedFilePath.startsWith("/uploads/testimonials/")
    ) {
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
export async function DeleteTestimonialsAction(
  id: number
): Promise<ReturnPayload> {
  try {
    // Validate Id
    if (!id) {
      return {
        success: false,
        message: "please provide id",
      };
    }

    // delete testimonials in the database
    const testimonials = await prisma.testimonial.findUnique({
      where: { id },
    });

    if (!testimonials) {
      return { success: false, message: "testimonials record not found" };
    }

    // Delete
    const result = await prisma.testimonial.delete({ where: { id } });

    if (!result) {
      // delete image
      fs.unlink(testimonials?.image as string, (err) => {
        if (err) console.error(`Failed to delete image: ${err.message}`);
      });
    }

    revalidatePath("/dashboard/testimonials");

    return {
      success: true,
      message: `testimonials record deleted successfully`,
    };
  } catch (error) {
    console.error("Add testimonials error:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to delete record",
    };
  }
}
