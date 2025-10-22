import Main from "./(client)";
import { prisma } from "@/lib/prisma";
import { serializePrisma } from "@/lib/utils";

/**
 * This page is dynamically generated at build time.
 * on Every request, the page is revalidated.
 * This is done to ensure that the page is always up-to-date.
 */

export const revalidate = 0;

export default async function CareersPage() {
  // careers + Companies
  const [careersResult, companiesResult] = await Promise.all([
    await prisma.career.findMany(),
    await prisma.companies.findMany(),
  ]);

  const careers = serializePrisma(careersResult) || [];
  const companies = serializePrisma(companiesResult) || [];

  console.log("careers: ", careers);
  console.log("companies: ", companies);

  return <Main careers={careers} companies={companies} />;
}
