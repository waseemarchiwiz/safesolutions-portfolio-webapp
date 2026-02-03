import Main from "./(client)/main";
import { prisma } from "@/lib/prisma";
import { serializePrisma } from "@/lib/utils";

export default async function ContactPage() {
  // companies
  const companiesResult = await prisma.companies.findMany();
  // companies
  const companies = serializePrisma(companiesResult) || [];
  // companies
  return <Main companies={companies || []} />;
}
