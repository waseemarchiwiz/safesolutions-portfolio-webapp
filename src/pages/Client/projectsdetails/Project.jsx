import React from "react";
import { useParams } from "react-router-dom";
import ProjectDetails from "./ProjectDetails";
import { getProjectByRoute } from "@/lib/Project";

const Project = () => {
  const projectRoute = useParams();

  console.log(projectRoute.project);

  const projectData = getProjectByRoute(`/${projectRoute.project}`);

  if (!projectData || projectData.type !== "detailed") {
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
};

export default Project;
