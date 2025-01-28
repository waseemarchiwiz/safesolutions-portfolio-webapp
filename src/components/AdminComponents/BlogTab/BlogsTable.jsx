import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import apiInstance from "../../../../api-config";
import CustomTable from "@/globals/CustomTable";
import EditModal from "./EditModal";

export const BlogsTable = () => {
  const [blogData, setBlogData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const headers = ["ID", "Title", "Short Description"];
  const userToken = localStorage.getItem("apiusertoken");

  const fetchData = async () => {
    try {
      const response = await apiInstance.get("/get/blog", {
        headers: {
          "Content-Type": "multipart/form-data",
          user_access_token: userToken,
        },
      });
      setBlogData(response?.data?.blogs);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch blogs");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const data = blogData?.map((blog) => ({
    id: blog?.id,
    title: blog?.title,
    shortDescription: blog?.shortDescription,
  }));

  const handleEdit = (row) => {
    const completeBlogData = blogData.find((blog) => blog.id === row.id);
    if (completeBlogData) {
      setSelectedBlog({
        id: completeBlogData?.id,
        title: completeBlogData?.title,
        shortDescription: completeBlogData?.shortDescription,
        description: completeBlogData?.description,
        images:
          completeBlogData?.images?.map((img) => ({
            id: img.id,
            image: img.image,
            isExisting: true,
          })) || [],
      });
      setOpenModal(true);
    } else {
      toast.error("Blog data not found");
    }
  };

  const handleDelete = async (row) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the Blog "${row.title}"?`
    );
    if (!isConfirmed) return;

    try {
      await apiInstance.delete(`/delete/blog/${row.id}`, {
        headers: {
          user_access_token: userToken,
        },
      });
      setBlogData((prevBlog) => prevBlog.filter((blog) => blog.id !== row.id));
      toast.success("Blog deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete Blog");
    }
  };

  return (
    <div>
      <CustomTable
        headers={headers}
        data={data}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {openModal && selectedBlog && (
        <EditModal
          selectedBlog={selectedBlog}
          onClose={() => {
            setOpenModal(false);
            setSelectedBlog(null);
          }}
          onUpdate={fetchData}
        />
      )}
    </div>
  );
};

export default BlogsTable;
