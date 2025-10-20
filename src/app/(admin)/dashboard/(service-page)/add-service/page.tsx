import { Breadcrumbs } from "@/components/common/breadcrumbs";
import AddServiceForm from "./(client)/main";
import { ServiceTypes } from "../services/columns";
import { prisma } from "@/lib/prisma";
import { serializePrisma } from "@/lib/utils";

interface AddServicePageProps {
  searchParams?: Promise<{ id?: string }>;
}

export default async function AddServicePage({
  searchParams,
}: AddServicePageProps) {
  const data = await searchParams;
  const Id = data?.id;
  console.log("id from query:", Id);

  let service: ServiceTypes | null = null;

  if (Id) {
    const result = await prisma.service.findFirst({
      where: { id: Number(Id) },
    });
    const processedService = serializePrisma(result);
    service = processedService;
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="md:w-7xl md:mx-auto flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="flex justify-between items-center px-4 lg:px-6">
            <h1 className="text-lg font-medium">
              {Id ? "Edit Service" : "Add Service"}
            </h1>
            <Breadcrumbs page={Id ? "Update service" : "add service"} />
          </div>
          <AddServiceForm service={service || undefined} />
        </div>
      </div>
    </div>
  );
}
