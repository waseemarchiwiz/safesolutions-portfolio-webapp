import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { axiosServer } from "@/lib/api-config/client";
import { cookies } from "next/headers";
import { ReturnPayload } from "@/lib/types";
import { CareerTypes } from "./columns";
import MainCareers from "./(client)/main";

export interface PaginationUrlProps {
  searchParams: Promise<{ page?: string; limit?: string }>;
}

/**
 * Pagination
 * On Server Side
 * Pending
 * **/

export default async function AllTeamsPage({
  searchParams,
}: PaginationUrlProps) {
  // page limit
  // const params = await searchParams;
  // const page = Number(params?.page) || 1;
  // const limit = Number(params?.limit) || 5;
  // const skip = (page - 1) * limit;

  // cookies
  const cookieStore = await cookies();
  // Build Cookie header manually
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
  const api = await axiosServer(cookieHeader);

  const result: ReturnPayload = await api.get("/admin/get/career");
  console.log("result----: ", result);

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
            data={(result.data?.careers as CareerTypes[]) || []}
            page={1}
            limit={10}
            total={1}
            linkInfo={{ text: "Add career", link: "add-career" }}
          />
        </div>
      </div>
    </div>
  );
}
