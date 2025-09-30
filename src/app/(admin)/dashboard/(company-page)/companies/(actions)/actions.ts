"use server";

import { revalidatePath } from "next/cache";
import { ReturnPayload } from "@/lib/types";
import { prisma } from "@/lib/prisma";
import {
  CompanyFormValues,
  companySchema,
} from "../../add-company/(validation)/validation";

// update job form values
interface CompanyUpdateTypes extends CompanyFormValues {
  id: number;
}

// -----------------------------
// Update Company Action
// -----------------------------
export async function UpdateCompanyAction(
  values: CompanyUpdateTypes
): Promise<ReturnPayload> {
  try {
    const validation = companySchema.safeParse(values);

    if (!validation.success) {
      return {
        success: false,
        message: validation.error.issues.map((i) => i.message).join(", "),
      };
    }

    console.log("validtion:--", validation);

    const { id, name, email } = values;

    // Check duplicate For the name + slug
    const existingCompany = await prisma.companies.findUnique({
      where: { id },
    });

    if (!existingCompany) {
      return { success: false, message: "Company record not found." };
    }

    // Update DB
    const updated = await prisma.companies.update({
      where: { id },
      data: {
        name,
        email,
      },
    });

    revalidatePath("/dashboard/companies");

    return {
      success: true,
      message: "Companys record updated successfully",
      data: updated,
    };
  } catch (error) {
    console.error("Update Company Action error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
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
