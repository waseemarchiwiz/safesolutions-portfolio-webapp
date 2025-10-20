import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { CareerTypes } from "./columns";
import { prisma } from "@/lib/prisma";
import { serializePrisma } from "@/lib/utils";
import MainCareers from "./(client)/main";

export interface PaginationUrlProps {
  searchParams: Promise<{ page?: string; limit?: string }>;
}

export default async function AllTeamsPage({
  searchParams,
}: PaginationUrlProps) {
  // page limit
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const limit = Number(params?.limit) || 5;
  const skip = (page - 1) * limit;

  // result
  const result = await prisma.career.findMany({
    orderBy: { createdAt: "desc" },
    skip,
    take: limit,
  });

  // count
  const totalCareers = await prisma.team.count();
  // convert date objects to string
  const careers = serializePrisma(result);

  return (
    <div className="flex flex-1 flex-col">
      <div className="md:w-7xl md:mx-auto flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="flex justify-between items-center px-4 lg:px-6">
            <h1 className="text-lg">All Careers</h1>
            <Breadcrumbs page="add team" />
          </div>
          {/* All teams */}
          <MainCareers
            data={(careers as CareerTypes[]) || []}
            page={page}
            limit={limit}
            total={totalCareers}
            linkInfo={{ text: "Add career", link: "add-career" }}
          />
        </div>
      </div>
    </div>
  );
}
