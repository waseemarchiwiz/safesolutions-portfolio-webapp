"use server";

import { prisma } from "@/lib/prisma";
import { ReturnPayload } from "@/lib/types";
import path from "path";
import fs from "fs/promises";
import { CompanyFormValues, companySchema } from "../(validation)/validation";

// -----------------------------
// Add Company Action
// -----------------------------
export async function AddCompanyAction(
  values: CompanyFormValues
): Promise<ReturnPayload> {
  try {
    const validation = companySchema.safeParse(values);
    if (!validation.success) {
      return {
        success: false,
        message: validation.error.message,
      };
    }

    console.log("validtion:--", validation);

    const { name, email } = validation.data;

    // Check duplicate For the name
    const existingCompany = await prisma.companies.findFirst({
      where: {
        AND: {
          name,
          email,
        },
      },
    });

    if (existingCompany) {
      return { success: false, message: "Company already exists" };
    }

    const newCompany = await prisma.companies.create({
      data: {
        name,
        email,
      },
    });

    return {
      success: true,
      message: "Company added successfully",
      data: newCompany,
    };
  } catch (error) {
    console.error("Add Company Action error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
