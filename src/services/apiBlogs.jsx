/*******Blogs API Services********/

import apiInstance from "../../api-config";

// Get Blogs
export const getAllBlogs = async () => {
  try {
    // const response = await apiInstance.get("/blogs");
    // For testing Using dummy json posts data endpoint
    const response = await apiInstance.get("/posts");
    console.log(response);
    return response.data;
  } catch (error) {
    return response.error;
  }
};

// Get Single Blog
export const getBlog = async (id) => {
  try {
    const response = await apiInstance.get(`/blog/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    return response.error;
  }
};

// Create Blog
export const addBlog = async (form) => {
  try {
    const response = await apiInstance.post("/blog", form);
    console.log(response);
    return response.data;
  } catch (error) {
    return response.error;
  }
};

// Update Blog
export const updateBlog = async (form, id) => {
  try {
    const response = await apiInstance.put(`/blog/${id}`, form);
    console.log(response);
    return response.data;
  } catch (error) {
    return response.error;
  }
};

// Delete Blog
export const deleteBlog = async (id) => {
  try {
    const response = await apiInstance.delete(`/blog/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    return response.error;
  }
};
