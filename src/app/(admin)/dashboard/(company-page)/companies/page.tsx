import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { axiosServer } from "@/lib/api-config/client";
import { cookies } from "next/headers";
import { ReturnPayload } from "@/lib/types";
import { CompanyTypes } from "./columns";
import MainCompany from "./(client)/main";
import { prisma } from "@/lib/prisma";
import { serializePrisma } from "@/lib/utils";

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

  const result = await prisma.companies.findMany({
    skip,
    take: limit,
  });

  const totalCompanies = await prisma.companies.count();

  const companies = serializePrisma(result);

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
            total={totalCompanies}
            linkInfo={{ text: "Add Company", link: "add-company" }}
          />
        </div>
      </div>
    </div>
  );
}
