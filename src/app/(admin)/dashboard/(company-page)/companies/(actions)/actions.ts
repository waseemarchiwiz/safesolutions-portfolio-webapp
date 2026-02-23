"use server";

import { prisma } from "@/lib/prisma";
import { ReturnPayload } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { EditCompanySchema } from "../(validation)/validation";
import { deleteFile, uploadFile } from "@/lib/upload";
import { serializePrisma } from "@/lib/utils";

// -----------------------------
// Get All Companies Action
// -----------------------------
export async function GetAllCompanies({
  skip,
  limit,
}: {
  skip: number;
  limit: number;
}) {
  try {
    const [result, totalCompanies] = await Promise.all([
      prisma.companies.findMany({
        skip,
        take: limit,
      }),
      prisma.companies.count(),
    ]);
    // serialize data
    const companies = serializePrisma(result);
    // return the companies data
    return {
      success: true,
      message: "Companies fetched successfully.",
      data: companies,
      total: totalCompanies,
    };
  } catch (error) {
    console.log("error:- ", error);
    // return
    return {
      success: false,
      message: "Failed to fetch companies.",
      data: [],
      total: 0,
    };
  }
}

// -----------------------------
// Update Company Action
// -----------------------------

export async function UpdateCompanyAction(
  formData: FormData,
): Promise<ReturnPayload> {
  let newPublicId: string | null = null;

  try {
    // Extract form data
    const dataToParse = {
      id: formData.get("id") as string,
      name: formData.get("name") as string,
      slug: formData.get("slug") as string,
      link: formData.get("link") as string,
      email: formData.get("email") as string,
      description: formData.get("description") as string,
      image: formData.get("image") as File | null,
    };

    // Validate inputs
    const validation = EditCompanySchema.safeParse(dataToParse);
    if (!validation.success) {
      return { success: false, message: validation.error.message };
    }

    const { id, name, slug, link, email, description, image } = dataToParse;
    const companyId = Number(id);

    // Find existing record
    const existingCompany = await prisma.companies.findUnique({
      where: { id: companyId },
    });
    if (!existingCompany) {
      return { success: false, message: "Company record not found." };
    }

    // Prevent slug duplication
    const duplicate = await prisma.companies.findFirst({
      where: { slug, NOT: { id: companyId } },
    });
    if (duplicate) {
      return {
        success: false,
        message: "Another company with this slug already exists.",
      };
    }

    let imageUrl = existingCompany.url;
    let publicId = existingCompany.publicId;

    // If new image uploaded, replace the old one
    if (image && image.size > 0) {
      const bytes = Buffer.from(await image.arrayBuffer());
      const uploadResult = await uploadFile(bytes, "companies");

      if (!uploadResult.success || !uploadResult.data) {
        return { success: false, message: "Failed to upload image." };
      }

      imageUrl = uploadResult.data.secure_url;
      newPublicId = uploadResult.data.public_id;

      // Delete old image from Azure
      if (existingCompany.publicId) {
        try {
          await deleteFile(existingCompany.publicId);
        } catch (error) {
          console.error("Failed to delete old company logo:", error);
        }
      }

      publicId = newPublicId;
    }

    // Update the company record
    const updatedCompany = await prisma.companies.update({
      where: { id: companyId },
      data: {
        name,
        slug,
        link,
        email,
        description,
        url: imageUrl,
        publicId,
      },
    });

    // update the teams page in dashboard
    revalidatePath("/dashboard/companies");
    revalidatePath("/contact");
    revalidatePath("/about");

    return {
      success: true,
      message: "Company record updated successfully.",
      data: updatedCompany,
    };
  } catch (error) {
    // Rollback if upload succeeded but DB failed
    if (newPublicId) {
      try {
        await deleteFile(newPublicId);
      } catch (err) {
        console.error("Azure rollback delete failed:", err);
      }
    }

    console.error("UpdateCompanyAction error:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Unknown error occurred.",
    };
  }
}

// -----------------------------
// Delete Company Action
// -----------------------------
export async function DeleteCompanyAction(id: number): Promise<ReturnPayload> {
  try {
    if (!id) {
      return { success: false, message: "Please provide id." };
    }

    const company = await prisma.companies.findUnique({ where: { id } });
    if (!company) {
      return { success: false, message: "Company record not found." };
    }

    // Delete logo from Azure if exists
    if (company.publicId) {
      try {
        await deleteFile(company.publicId);
      } catch (error) {
        console.error("Failed to delete Azure blob:", error);
      }
    }

    // Delete record from DB
    await prisma.companies.delete({ where: { id } });

    // update the teams page in dashboard
    revalidatePath("/dashboard/companies");
    revalidatePath("/contact");
    revalidatePath("/about");

    return {
      success: true,
      message: "Company record deleted successfully.",
    };
  } catch (error) {
    console.error("DeleteCompanyAction error:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to delete record.",
    };
  }
}
