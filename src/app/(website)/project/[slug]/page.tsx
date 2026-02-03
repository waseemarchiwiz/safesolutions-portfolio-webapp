import { prisma } from "@/lib/prisma";
import { serializePrisma } from "@/lib/utils";
import ProjectDetails from "../(client)/project-details";

type ParamsProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectDetailsPage({ params }: ParamsProps) {
  // slug
  const { slug } = await params;

  // Project data
  const result = await prisma.project.findUnique({
    where: { slug },
    include: {
      services: true,
      projectDetails: true,
      supports: true,
    },
  });
  const project = serializePrisma(result);

  if (!project) {
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

  return <ProjectDetails data={project || {}} />;
}
