import { apiClient } from "@/lib/api-config/client";
import ProjectDetails from "../(client)/project-details";
import { ProjectTypes } from "../data";

type ParamsProps = {
  params: Promise<{ slug: string }>;
};

type ProjectPayload = {
  success: boolean;
  project: ProjectTypes;
};

export default async function ProjectDetailsPage({ params }: ParamsProps) {
  // slug
  const { slug } = await params;

  // Project data
  const data: ProjectPayload = await apiClient.get(
    `/user/get/project/detail/${slug}`
  );

  console.log("Project Data: ", data);

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Project Not Found
          </h2>
          <p className="mt-2 text-gray-600">
            The requested Project could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="dark:bg-[#18181b]">
      <ProjectDetails data={(data.project as ProjectTypes) || {}} />
    </div>
  );
}
