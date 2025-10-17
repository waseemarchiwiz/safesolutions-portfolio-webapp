"use server";

import { prisma } from "@/lib/prisma";
import { ReturnPayload } from "@/lib/types";
import path from "path";
import fs from "fs/promises";
import { companySchema } from "../(validation)/validation";

// -----------------------------
// Add company Action
// -----------------------------
export async function AddCompanyAction(
  formData: FormData
): Promise<ReturnPayload> {
  let uploadedFilePath: string | null = null; // track uploaded file path

  try {
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
      return {
        success: false,
        message: validation.error.message,
      };
    }

    console.log("validtion:--", validation);

    const { name, slug, email, link, description, image } = validation.data;

    // Check duplicate For the name
    const existingcompany = await prisma.companies.findFirst({
      where: { slug },
    });
    if (existingcompany) {
      return { success: false, message: "company member already exists" };
    }

    // Save image
    if (image) {
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
    }

    const newcompany = await prisma.companies.create({
      data: {
        name,
        slug,
        link: link as string,
        email,
        description,
        image: uploadedFilePath as string,
      },
    });

    return {
      success: true,
      message: "Company added successfully",
      data: newcompany,
    };
  } catch (error) {
    // Cleanup uploaded file if DB create fails
    if (uploadedFilePath) {
      const fullPath = path.join(process.cwd(), "public", uploadedFilePath);
      await fs.unlink(fullPath).catch(() => {});
    }
    console.error("Add companyAction error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
