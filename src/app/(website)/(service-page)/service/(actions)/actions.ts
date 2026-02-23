import { prisma } from "@/lib/prisma";
import { serializePrisma } from "@/lib/utils";

// -----------------------------
// Get Service By Slug Action
// -----------------------------
export async function GetServiceBySlug(slug: string) {
  try {
    const [ServicesResult] = await Promise.all([
      await prisma.service.findUnique({
        where: { slug },
      }),
    ]);

    // serialize data
    const service = serializePrisma(ServicesResult);

    // return the Services data
    return {
      success: true,
      message: "Service record fetched successfully.",
      data: service,
    };
  } catch (error) {
    console.log("error:- ", error);
    // return
    return {
      success: false,
      message: "Failed to fetch Service.",
      data: {},
    };
  }
}
