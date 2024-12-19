import CustomTable from "@/globals/CustomTable";
import axios from "axios";
import apiUrl from "../../../../baseUrl";
import { useEffect, useState } from "react";

export const BlogsTable = () => {
  const [blogData, setBlogData] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const headers = ["ID", "Image", "Title", "Category", "Tags"];

  const FetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/get/blog`);
      console.log(response?.data?.blogs, "blog response ");
      setBlogData(response?.data?.blogs);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    FetchData();
  }, []);

  // Helper function to safely parse tags
  const parseTags = (tags) => {
    try {
      // Check if tags are already an array
      if (Array.isArray(tags)) {
        return tags; // Return as is if already an array
      }
      // Check if tags are in JSON stringified array format
      if (
        tags &&
        typeof tags === "string" &&
        tags.startsWith("[") &&
        tags.endsWith("]")
      ) {
        return JSON.parse(tags); // Parse the JSON string
      }
      // Handle comma-separated values (non-JSON format)
      if (tags && typeof tags === "string") {
        return tags.split(",").map((tag) => tag.trim()); // Split by commas and trim whitespace
      }
      return []; // Return empty array if tags is null, undefined, or invalid
    } catch (error) {
      console.error("Error parsing tags:", error);
      return []; // Return empty array in case of any parsing error
    }
  };

  const data = blogData.map((blog) => ({
    id: blog.id,
    image: (
      <img
        src={`https://safesolution-portfolio-backend-prod-h5h3g5fxa0bgfrcj.eastus-01.azurewebsites.net/${blog.image}`}
        alt={blog.title}
        width={80}
        className="rounded-[50%]"
      />
    ),
    title: blog.title,
    category: blog.category,
    tags: parseTags(blog.tags).map((tag) => `#${tag}`), // Safely parse and format tags
    // description: blog.description,
    // joinedAt: new Date(blog.joinedAt).toLocaleDateString() // You can handle the date conversion here if needed
  }));

  const handleEdit = (row) => {
    setSelectedBlog(row);
    setIsModalOpen(true);
  };
  const handleDelete = async (row) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the project "${row.name}"?`
    );

    if (!isConfirmed) return;

    try {
      await axios.delete(`${apiUrl}/delete/blog/${row?.id}`);

      // Remove from local state
      setBlogData((prevBlog) => prevBlog.filter((blog) => blog.id !== row.id));

      toast.success("Blog deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete project");
    }
  };

  return (
    <CustomTable
      headers={headers}
      data={data}
      onEdit={handleEdit}
      onDelete={handleDelete}
      itemsPerPage={5}
    />
  );
};
