import { prisma } from "@/lib/prisma";
import { serializePrisma } from "@/lib/utils";
import { Services } from "./(client)";

/**
 * This page is dynamically generated at build time.
 * on Every request, the page is revalidated.
 * This is done to ensure that the page is always up-to-date.
 */

export const revalidate = 0;

export default async function ServicesPage() {
  // result
  const result = await prisma.service.findMany({});
  // services
  const services = serializePrisma(result);
  console.log("services:---", services);

  // main
  return <Services view={false} services={services} />;
}
