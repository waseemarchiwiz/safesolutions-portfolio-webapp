/*******teams API Services********/

import apiInstance from "../../api-config";

// Get teams
export const getAllTeams = async () => {
  try {
    const response = await apiInstance.get("/teams");
    console.log(response);
    return response.data;
  } catch (error) {
    return response.error;
  }
};

// Get Single team
export const getTeam = async (id) => {
  try {
    const response = await apiInstance.get(`/team/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    return response.error;
  }
};

// Create team
export const addTeam = async (form) => {
  try {
    const response = await apiInstance.post("/team", form);
    console.log(response);
    return response.data;
  } catch (error) {
    return response.error;
  }
};

// Update team
export const updateTeam = async (form, id) => {
  try {
    const response = await apiInstance.put(`/team/${id}`, form);
    console.log(response);
    return response.data;
  } catch (error) {
    return response.error;
  }
};

// Delete team
export const deleteTeam = async (id) => {
  try {
    const response = await apiInstance.delete(`/team/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    return response.error;
  }
};
