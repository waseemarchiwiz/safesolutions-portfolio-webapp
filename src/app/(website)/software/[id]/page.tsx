import { prisma } from "@/lib/prisma";
import SoftwareDetails from "../(client)/main";
import { serializePrisma } from "@/lib/utils";

type ParamsProps = {
  params: Promise<{ id: number }>;
};

export default async function SoftwareDetailsPage({ params }: ParamsProps) {
  // id
  const { id } = await params;

  if (!id) {
    <div className="text-center py-12">No service found</div>;
  }

  const result = await prisma.service.findUnique({ where: { id: Number(id) } });

  const softwareService = serializePrisma(result);

  console.log("softwre service--", softwareService);

  return <SoftwareDetails serviceData={softwareService} />;
}
