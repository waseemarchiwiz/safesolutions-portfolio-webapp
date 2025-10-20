"use server";

import { prisma } from "@/lib/prisma";
import { ReturnPayload } from "@/lib/types";
import path from "path";
import fs from "fs/promises";
import { revalidatePath } from "next/cache";
import { EditCompanySchema } from "../(validation)/validation";

// -----------------------------
// Update Company Action
// -----------------------------
export async function UpdateCompanyAction(
  formData: FormData
): Promise<ReturnPayload> {
  let uploadedFilePath: string | null = null;

  try {
    const dataToParse = {
      id: formData.get("id") as string,
      name: formData.get("name") as string,
      slug: formData.get("slug") as string,
      link: formData.get("link") as string,
      email: formData.get("email") as string,
      description: formData.get("description") as string,
      image: formData.get("image") as File | null,
    };

    const validation = EditCompanySchema.safeParse(dataToParse);
    if (!validation.success) {
      return {
        success: false,
        message: validation.error.message,
      };
    }

    const { id, name, slug, link, email, description, image } = dataToParse;

    // Check if company exists
    const existingCompany = await prisma.companies.findUnique({
      where: { id: Number(id) },
    });

    if (!existingCompany) {
      return { success: false, message: "Company record not found." };
    }

    // Check duplicate slug (excluding current company)
    const duplicate = await prisma.companies.findFirst({
      where: {
        slug,
        NOT: { id: Number(id) },
      },
    });

    if (duplicate) {
      return {
        success: false,
        message: "Another company with this slug already exists.",
      };
    }

    // If new image uploaded
    if (image && image.size > 0) {
      const uploadDir = path.join(
        process.cwd(),
        "public",
        "uploads",
        "company"
      );
      await fs.mkdir(uploadDir, { recursive: true });

      const bytes = Buffer.from(await image.arrayBuffer());
      const fileName = `${Date.now()}-${image.name}`;
      uploadedFilePath = `/uploads/company/${fileName}`;
      const filePath = path.join(process.cwd(), "public", uploadedFilePath);
      await fs.writeFile(filePath, bytes);

      // Delete old image (if exists)
      if (existingCompany.image) {
        const oldImagePath = path.join(
          process.cwd(),
          "public",
          existingCompany.image
        );
        await fs.unlink(oldImagePath).catch(() => {});
      }
    }

    // Update company record
    const updatedCompany = await prisma.companies.update({
      where: { id: Number(id) },
      data: {
        name,
        slug,
        link,
        email,
        description,
        image: uploadedFilePath || existingCompany.image,
      },
    });

    // Revalidate dashboard page
    revalidatePath("/dashboard/companies");

    return {
      success: true,
      message: "Company record updated successfully.",
      data: updatedCompany,
    };
  } catch (error) {
    // Cleanup uploaded file if DB update fails
    if (uploadedFilePath) {
      const fullPath = path.join(process.cwd(), "public", uploadedFilePath);
      await fs.unlink(fullPath).catch(() => {});
    }

    console.error("Update Company Action error:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Unknown error occurred.",
    };
  }
}

// Server-side validation for FormData
export async function DeleteCompanyAction(id: number): Promise<ReturnPayload> {
  try {
    // Validate Id
    if (!id) {
      return {
        success: false,
        message: "please provide id",
      };
    }

    // delete Company in the database
    const Company = await prisma.companies.findUnique({ where: { id } });

    if (!Company) {
      return { success: false, message: "Company record not found" };
    }

    // Delete
    const result = await prisma.companies.delete({ where: { id } });

    if (!result) {
      return { success: false, message: "Failed to delete team member" };
    }

    revalidatePath("/dashboard/companies");

    return {
      success: true,
      message: `Company record deleted successfully`,
    };
  } catch (error) {
    console.error("delete Company error:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to delete record",
    };
  }
}
