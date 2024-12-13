/*******services API Services********/

import apiInstance from "../../api-config";
// Get services
export const getAllServices = async () => {
  try {
    const response = await apiInstance.get("/services");
    console.log(response);
    return response.data;
  } catch (error) {
    return response.error;
  }
};

// Get Single service
export const getService = async (id) => {
  try {
    const response = await apiInstance.get(`/service/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    return response.error;
  }
};

// Create service
export const addService = async (form) => {
  try {
    const response = await apiInstance.post("/service", form);
    console.log(response);
    return response.data;
  } catch (error) {
    return response.error;
  }
};

// Update service
export const updateService = async (form, id) => {
  try {
    const response = await apiInstance.put(`/service/${id}`, form);
    console.log(response);
    return response.data;
  } catch (error) {
    return response.error;
  }
};

// Delete service
export const deleteService = async (id) => {
  try {
    const response = await apiInstance.delete(`/service/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    return response.error;
  }
};
