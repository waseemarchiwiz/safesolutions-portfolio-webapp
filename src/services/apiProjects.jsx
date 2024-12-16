/*******projects API Services********/

import apiInstance from "../../api-config";

// Get projects
export const getAllProjects = async () => {
  try {
    const response = await apiInstance.get("/projects");
    console.log(response);
    return response.data;
  } catch (error) {
    return response.error;
  }
};

// Get Single project
export const getProject = async (id) => {
  try {
    const response = await apiInstance.get(`/project/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    return response.error;
  }
};

// Create project
export const addProject = async (form) => {
  try {
    const response = await apiInstance.post("/project", form);
    console.log(response);
    return response.data;
  } catch (error) {
    return response.error;
  }
};

// Update project
export const updateProject = async (form, id) => {
  try {
    const response = await apiInstance.put(`/project/${id}`, form);
    console.log(response);
    return response.data;
  } catch (error) {
    return response.error;
  }
};

// Delete project
export const deleteProject = async (id) => {
  try {
    const response = await apiInstance.delete(`/project/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    return response.error;
  }
};
