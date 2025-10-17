import MainServices from "./(client)/main";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { ServiceTypes } from "./columns";
import { prisma } from "@/lib/prisma";
import { serializePrisma } from "@/lib/utils";

export interface PaginationUrlProps {
  searchParams: Promise<{ page?: string; limit?: string }>;
}

export default async function AllServicesPage({
  searchParams,
}: PaginationUrlProps) {
  // page limit
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const limit = Number(params?.limit) || 5;
  const skip = (page - 1) * limit;

  const result = await prisma.service.findMany({
    skip,
    take: limit,
  });

  const totalSerivces = await prisma.service.count();
  const services = serializePrisma(result);

  return (
    <div className="flex flex-1 flex-col">
      <div className="md:w-7xl md:mx-auto flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="flex justify-between items-center px-4 lg:px-6">
            <h1 className="text-lg">All Services</h1>
            <Breadcrumbs page="add Service" />
          </div>
          {/* All Services */}
          <MainServices
            data={services as ServiceTypes[]}
            page={page}
            limit={limit}
            total={totalSerivces}
            linkInfo={{ text: "Add Service", link: "add-service" }}
          />
        </div>
      </div>
    </div>
  );
}
