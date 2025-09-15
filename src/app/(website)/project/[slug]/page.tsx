import { projects } from "@/app/(website)/project/data";
import ProjectDetails from "../(client)/project-details";

type ParamsProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectDetailsPage({ params }: ParamsProps) {
  // slug
  const paramsData = await params;

  console.log("slug: ", paramsData.slug);

  // project data
  const projectData = projects.filter(
    (item) => item.slug === paramsData.slug
  )?.[0];

  console.log("project Data: ", projectData);

  if (!projectData || projectData?.type !== "detailed") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Project Not Found
          </h2>
          <p className="mt-2 text-gray-600">
            The requested project could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="dark:bg-[#18181b]">
      <ProjectDetails data={projectData} />
    </div>
  );
}
