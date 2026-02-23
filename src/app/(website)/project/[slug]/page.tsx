import ProjectDetails from "../(client)/project-details";
import { GetProjectBySlug } from "../(actions)/actions";

type ParamsProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectDetailsPage({ params }: ParamsProps) {
  // slug
  const { slug } = await params;

  // Project data
  const { data: project } = await GetProjectBySlug(slug);

  // if no Project found return this page
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
  // return the component
  return <ProjectDetails data={project || {}} />;
}
