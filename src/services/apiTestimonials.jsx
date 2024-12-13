/*******testimonials API Services********/

import apiInstance from "../../api-config";

// Get testimonials
export const getAllTestimonials = async () => {
  try {
    const response = await apiInstance.get("/testimonials");
    console.log(response);
    return response.data;
  } catch (error) {
    return response.error;
  }
};

// Get Single testimonial
export const getTestimonial = async (id) => {
  try {
    const response = await apiInstance.get(`/testimonial/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    return response.error;
  }
};

// Create testimonial
export const addTestimonial = async (form) => {
  try {
    const response = await apiInstance.post("/testimonial", form);
    console.log(response);
    return response.data;
  } catch (error) {
    return response.error;
  }
};

// Update testimonial
export const updateTestimonial = async (form, id) => {
  try {
    const response = await apiInstance.put(`/testimonial/${id}`, form);
    console.log(response);
    return response.data;
  } catch (error) {
    return response.error;
  }
};

// Delete testimonial
export const deleteTestimonial = async (id) => {
  try {
    const response = await apiInstance.delete(`/testimonial/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    return response.error;
  }
};
