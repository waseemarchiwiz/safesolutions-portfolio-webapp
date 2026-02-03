import { prisma } from "@/lib/prisma";
import { serializePrisma } from "@/lib/utils";
import { Services } from "./(client)";

export default async function ServicesPage() {
  // result
  const result = await prisma.service.findMany({});
  // services
  const services = serializePrisma(result);

  // main
  return <Services view={false} services={services} />;
}
