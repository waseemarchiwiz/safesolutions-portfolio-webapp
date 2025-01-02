import React from "react";
import { useParams } from "react-router-dom";
import BlogDetails from "./BlogDetails";
import { getProjectByBlog } from "@/lib/Blog";

const Blog = () => {
  const blogRoute = useParams();

  console.log(blogRoute.id, "dasdas");

  const blogData = getProjectByBlog(Number(blogRoute.id));

  if (!blogData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Blog Not Found
          </h2>
          <p className="mt-2 text-gray-600">
            The requested Blog could not be found.
          </p>
        </div>
      </div>
    );
  }

  return <BlogDetails data={blogData} />;
};

export default Blog;
