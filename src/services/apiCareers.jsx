/*******careers API Services********/

import apiInstance from "../../api-config";

// Get careers
export const getAllCareers = async () => {
  try {
    const response = await apiInstance.get("/careers");
    console.log(response);
    return response.data;
  } catch (error) {
    return response.error;
  }
};

// Get Single Career
export const getCareer = async (id) => {
  try {
    const response = await apiInstance.get(`/career/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    return response.error;
  }
};

// Create career
export const addCareer = async (form) => {
  try {
    const response = await apiInstance.post("/career", form);
    console.log(response);
    return response.data;
  } catch (error) {
    return response.error;
  }
};

// Update career
export const updateCareer = async (form, id) => {
  try {
    const response = await apiInstance.put(`/career/${id}`, form);
    console.log(response);
    return response.data;
  } catch (error) {
    return response.error;
  }
};

// Delete career
export const deleteCareer = async (id) => {
  try {
    const response = await apiInstance.delete(`/career/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    return response.error;
  }
};
