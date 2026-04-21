import MainQueries from "./(client)/main";
import { QueryTypes } from "./columns";
import { GetAllQueries } from "./(actions)/actions";

export interface PaginationUrlProps {
  searchParams: Promise<{ page?: string; limit?: string }>;
}

export default async function AllQueriesPage({
  searchParams,
}: PaginationUrlProps) {
  // page limit
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const limit = Number(params?.limit) || 5;
  const skip = (page - 1) * limit;
  // get Queries and total
  const { data: queries, total: totalQueries } = await GetAllQueries({
    skip,
    limit,
  });

  return (
    <div className="flex flex-1 flex-col">
      <div className="md:w-7xl md:mx-auto flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="flex justify-between items-center px-4 lg:px-6">
            <h1 className="text-lg">All Queries</h1>
          </div>
          {/* All Queries */}
          <MainQueries
            data={(queries as QueryTypes[]) || []}
            page={page}
            limit={limit}
            total={totalQueries as number}
          />
        </div>
      </div>
    </div>
  );
}
