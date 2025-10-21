"use server";

import { prisma } from "@/lib/prisma";
import { ReturnPayload } from "@/lib/types";
import { companySchema } from "../(validation)/validation";
import { deleteFile, uploadFile } from "@/lib/upload";

// -----------------------------
// Add Company Action (Azure Blob Storage)
// -----------------------------
export async function AddCompanyAction(
  formData: FormData
): Promise<ReturnPayload> {
  let uploadedPublicId: string | null = null; // Track uploaded blob for rollback

  try {
    // Parse and validate incoming form data
    const dataToParse = {
      name: formData.get("name") as string,
      slug: formData.get("slug") as string,
      link: formData.get("link") as string,
      email: formData.get("email") as string,
      description: formData.get("description") as string,
      image: formData.get("image") as File | null,
    };

    const validation = companySchema.safeParse(dataToParse);
    if (!validation.success) {
      return { success: false, message: validation.error.message };
    }

    const { name, slug, email, link, description, image } = validation.data;

    // Check duplicate company by slug
    const existingCompany = await prisma.companies.findFirst({
      where: { slug },
    });
    if (existingCompany) {
      return { success: false, message: "Company already exists" };
    }

    // Upload logo image to Azure Blob Storage
    let imageUrl: string | null = null;
    if (image) {
      const bytes = Buffer.from(await image.arrayBuffer());
      const uploadResult = await uploadFile(bytes, "companies"); // Folder name = companies

      if (!uploadResult.success || !uploadResult.data) {
        return { success: false, message: "Failed to upload image" };
      }

      imageUrl = uploadResult.data.secure_url;
      uploadedPublicId = uploadResult.data.public_id;
    }

    // Save to database
    const newCompany = await prisma.companies.create({
      data: {
        name,
        slug,
        link: link as string,
        email,
        description,
        url: imageUrl as string,
        publicId: uploadedPublicId as string,
      },
    });

    return {
      success: true,
      message: "Company added successfully",
      data: newCompany,
    };
  } catch (error) {
    // Rollback uploaded blob if DB create fails
    if (uploadedPublicId) {
      try {
        await deleteFile(uploadedPublicId);
      } catch (err) {
        console.error("Azure rollback delete failed:", err);
      }
    }

    console.error("AddCompanyAction error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
