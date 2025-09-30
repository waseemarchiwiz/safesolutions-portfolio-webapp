"use server";

import { prisma } from "@/lib/prisma";
import { ReturnPayload } from "@/lib/types";
import path from "path";
import fs from "fs/promises";
import { TestimonialsSchema } from "../(validation)/validation";

// -----------------------------
// Add Testimonials Action
// -----------------------------
export async function AddTestimonialsAction(
  formData: FormData
): Promise<ReturnPayload> {
  let uploadedFilePath: string | null = null; // track uploaded file path

  try {
    const dataToParse = {
      name: formData.get("name") as string,
      slug: formData.get("slug") as string,
      designation: formData.get("designation") as string,
      description: formData.get("description") as string,
      image: formData.get("image") as File | null,
    };

    const validation = TestimonialsSchema.safeParse(dataToParse);
    if (!validation.success) {
      return {
        success: false,
        message: validation.error.message,
      };
    }

    console.log("validtion:--", validation);

    const { name, slug, designation, description, image } = validation.data;

    // Check duplicate For the name
    const existingTestimonials = await prisma.testimonial.findFirst({
      where: { slug },
    });
    if (existingTestimonials) {
      return { success: false, message: "Testimonials member already exists" };
    }

    // Save image
    if (image) {
      const uploadDir = path.join(
        process.cwd(),
        "public",
        "uploads",
        "testimonials"
      );
      await fs.mkdir(uploadDir, { recursive: true });

      const bytes = Buffer.from(await image.arrayBuffer());
      const fileName = `${Date.now()}-${image.name}`;
      uploadedFilePath = `/uploads/testimonials/${fileName}`;
      const filePath = path.join(process.cwd(), "public", uploadedFilePath);
      await fs.writeFile(filePath, bytes);
    }

    const newTestimonials = await prisma.testimonial.create({
      data: {
        name,
        slug,
        designation,
        description,
        image: uploadedFilePath as string,
      },
    });

    return {
      success: true,
      message: "Testimonials added successfully",
      data: newTestimonials,
    };
  } catch (error) {
    // Cleanup uploaded file if DB create fails
    if (uploadedFilePath) {
      const fullPath = path.join(process.cwd(), "public", uploadedFilePath);
      await fs.unlink(fullPath).catch(() => {});
    }
    console.error("Add TestimonialsAction error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
