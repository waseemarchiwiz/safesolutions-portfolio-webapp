import { Breadcrumbs } from "@/components/common/breadcrumbs";
import AddProjectForm from "./(client)/main";
import { cookies } from "next/headers";
import { axiosServer } from "@/lib/api-config/client";
import { ReturnPayload } from "@/lib/types";
import { ProjectTypes } from "../projects/columns";

interface AddProjectPageProps {
  searchParams?: Promise<{ id?: string }>;
}

export default async function AddProjectPage({
  searchParams,
}: AddProjectPageProps) {
  const data = await searchParams;
  const Id = data?.id;
  console.log("id from query:", Id);

  let project: ProjectTypes | null = null;

  if (Id) {
    // cookies
    const cookieStore = await cookies();
    // Build Cookie header manually
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");
    const api = await axiosServer(cookieHeader);

    const result: ReturnPayload = await api.get(`/admin/project/${Id}`);
    console.log("result----: ", result.data);
    project = result.data?.project;
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="md:w-7xl md:mx-auto flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="flex justify-between items-center px-4 lg:px-6">
            <h1 className="text-lg font-medium">
              {Id ? "Edit Project" : "Add Project"}
            </h1>
            <Breadcrumbs page={Id ? "Update Project" : "add Project"} />
          </div>
          <AddProjectForm project={project || undefined} />
        </div>
      </div>
    </div>
  );
}
