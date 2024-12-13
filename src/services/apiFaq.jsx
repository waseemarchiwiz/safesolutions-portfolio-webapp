/*******faqs API Services********/

import apiInstance from "../../api-config";

// Get faqs
export const getAllFAQS = async () => {
  try {
    const response = await apiInstance.get("/faqs");
    console.log(response);
    return response.data;
  } catch (error) {
    return response.error;
  }
};

// Get Single faq
export const getFAQ = async (id) => {
  try {
    const response = await apiInstance.get(`/faq/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    return response.error;
  }
};

// Create FAQ
export const addFAQ = async (form) => {
  try {
    const response = await apiInstance.post("/faq", form);
    console.log(response);
    return response.data;
  } catch (error) {
    return response.error;
  }
};

// Update FAQ
export const updateFAQ = async (form, id) => {
  try {
    const response = await apiInstance.put(`/faq/${id}`, form);
    console.log(response);
    return response.data;
  } catch (error) {
    return response.error;
  }
};

// Delete FAQ
export const deleteFAQ = async (id) => {
  try {
    const response = await apiInstance.delete(`/faq/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    return response.error;
  }
};
