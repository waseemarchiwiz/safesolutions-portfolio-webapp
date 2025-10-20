import { Breadcrumbs } from "@/components/common/breadcrumbs";
import AddProjectForm from "./(client)/main";
import { ProjectTypes } from "../projects/columns";
import { prisma } from "@/lib/prisma";
import { serializePrisma } from "@/lib/utils";

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
    const result = await prisma.project.findUnique({
      where: { id: Number(Id) },
      include: { projectDetails: true, services: true, supports: true },
    });
    const processedProject = serializePrisma(result);
    project = processedProject;
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
