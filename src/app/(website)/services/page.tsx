import { prisma } from "@/lib/prisma";
import Main from "./(client)";
import { serializePrisma } from "@/lib/utils";

export default async function ServicesPage() {
  // result
  const result = await prisma.service.findMany({});
  // services
  const services = serializePrisma(result);
  console.log("services:---", services);

  // main
  return <Main services={services} />;
}
