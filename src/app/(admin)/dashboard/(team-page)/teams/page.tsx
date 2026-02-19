import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { TeamTypes } from "./columns";
import MainTeams from "./(client)/main";
import { GetAllTeams } from "./(actions)/actions";

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
  const { data: teams, total: totalTeams } = await GetAllTeams({ skip, limit });

  return (
    <div className="flex flex-1 flex-col">
      <div className="md:w-7xl md:mx-auto flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="flex justify-between items-center px-4 lg:px-6">
            <h1 className="text-lg">All Teams</h1>
            <Breadcrumbs page="add team" />
          </div>
          {/* All teams */}
          <MainTeams
            data={teams as TeamTypes[]}
            page={page}
            limit={limit}
            total={totalTeams}
            linkInfo={{ text: "Add team", link: "add-team" }}
          />
        </div>
      </div>
    </div>
  );
}
