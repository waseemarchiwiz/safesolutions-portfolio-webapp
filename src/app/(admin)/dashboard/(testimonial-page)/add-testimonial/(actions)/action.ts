"use server";

import { prisma } from "@/lib/prisma";
import { ReturnPayload } from "@/lib/types";
import { TestimonialsSchema } from "../(validation)/validation";
import { deleteFile, uploadFile } from "@/lib/upload";
import { revalidatePath } from "next/cache";

// -----------------------------
// Add Testimonials Action (Azure Blob Storage)
// -----------------------------
export async function AddTestimonialsAction(
  formData: FormData,
): Promise<ReturnPayload> {
  let uploadedPublicId: string | null = null; // for cleanup if needed

  try {
    const dataToParse = {
      name: formData.get("name") as string,
      slug: formData.get("slug") as string,
      designation: formData.get("designation") as string,
      description: formData.get("description") as string,
      image: formData.get("image") as File | null,
    };

    // Validation
    const validation = TestimonialsSchema.safeParse(dataToParse);
    if (!validation.success) {
      return {
        success: false,
        message: validation.error.message,
      };
    }

    const { name, slug, designation, description, image } = validation.data;

    // Check duplicate
    const existingTestimonials = await prisma.testimonial.findFirst({
      where: { slug },
    });
    if (existingTestimonials) {
      return {
        success: false,
        message: "Testimonial already exists",
      };
    }

    // Upload image to Azure
    let imageUrl: string | null = null;

    if (image) {
      const bytes = Buffer.from(await image.arrayBuffer());
      const uploadResult = await uploadFile(bytes, "testimonials");

      if (!uploadResult.success || !uploadResult.data) {
        return { success: false, message: "Failed to upload image" };
      }

      imageUrl = uploadResult.data.secure_url;
      uploadedPublicId = uploadResult.data.public_id;
    }

    // Save in database
    const newTestimonial = await prisma.testimonial.create({
      data: {
        name,
        slug,
        designation,
        description,
        url: imageUrl as string,
        publicId: uploadedPublicId as string, // store for future update/delete
      },
    });

    // update the careers page in website
    revalidatePath("/");

    return {
      success: true,
      message: "Testimonial added successfully",
      data: newTestimonial,
    };
  } catch (error) {
    // Rollback Azure image if DB fails
    if (uploadedPublicId) {
      try {
        await deleteFile(uploadedPublicId);
      } catch (err) {
        console.error("Azure rollback delete failed:", err);
      }
    }

    console.error("AddTestimonialsAction error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
