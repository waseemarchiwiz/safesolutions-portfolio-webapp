import Main from "./(client)/main";
import { prisma } from "@/lib/prisma";
import { serializePrisma } from "@/lib/utils";

export default async function ContactPage() {
  const companiesResult = await prisma.companies.findMany();
  // companies
  const companies = serializePrisma(companiesResult) || [];

  console.log("companies: ", companies);

  // Contact
  return <Main companies={companies || []} />;
}
