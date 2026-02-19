import MainProjects from "./(client)/main";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { ProjectTypes } from "./columns";
import { GetAllProjects } from "./(actions)/actions";

export interface PaginationUrlProps {
  searchParams: Promise<{ page?: string; limit?: string }>;
}

export default async function AllProjectsPage({
  searchParams,
}: PaginationUrlProps) {
  // page limit
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const limit = Number(params?.limit) || 5;
  const skip = (page - 1) * limit;
  // get projects and total
  const { data: projects, total: totalProjects } = await GetAllProjects({
    skip,
    limit,
  });

  return (
    <div className="flex flex-1 flex-col">
      <div className="md:w-7xl md:mx-auto flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="flex justify-between items-center px-4 lg:px-6">
            <h1 className="text-lg">All Projects</h1>
            <Breadcrumbs page="add Project" />
          </div>
          {/* All Projects */}
          <MainProjects
            data={projects as ProjectTypes[]}
            page={page}
            limit={limit}
            total={totalProjects as number}
            linkInfo={{ text: "Add Project", link: "add-project" }}
          />
        </div>
      </div>
    </div>
  );
}
