import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { CompanyTypes } from "./columns";
import MainCompany from "./(client)/main";
import { prisma } from "@/lib/prisma";
import { serializePrisma } from "@/lib/utils";
import { GetAllCompanies } from "./(actions)/actions";

export interface PaginationUrlProps {
  searchParams: Promise<{ page?: string; limit?: string }>;
}

export default async function AllCompanysPage({
  searchParams,
}: PaginationUrlProps) {
  // page limit
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const limit = Number(params?.limit) || 5;
  const skip = (page - 1) * limit;

  // get all companies
  const { data: companies, total } = await GetAllCompanies({ skip, limit });

  return (
    <div className="flex flex-1 flex-col">
      <div className="md:w-7xl md:mx-auto flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="flex justify-between items-center px-4 lg:px-6">
            <h1 className="text-lg">All Company</h1>
            <Breadcrumbs page="add Company" />
          </div>
          {/* All Companys */}
          <MainCompany
            data={(companies as CompanyTypes[]) || []}
            page={page}
            limit={limit}
            total={total as number}
            linkInfo={{ text: "Add Company", link: "add-company" }}
          />
        </div>
      </div>
    </div>
  );
}
