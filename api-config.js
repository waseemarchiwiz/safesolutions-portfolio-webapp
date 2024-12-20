// import axios from "axios";

// const apiUrl = import.meta.env.VITE_API_URL;
// console.log(apiUrl, "ksdjfskjd");

// const apiInstance = axios.create({
//   baseURL: apiUrl,
//   timeout: 4000,

// });

// export default apiInstance;

import axios from "axios";

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Base API URL
  headers: {
    "Content-Type": "application/json", // Default Content-Type
    api_token: import.meta.env.VITE_API_TOKEN, // Authorization token
  },
});

// Add request interceptors if needed
apiInstance.interceptors.request.use(
  (config) => {
    // Optionally modify config before sending the request
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Add response interceptors if needed
apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle response errors globally
    console.error("API Error:", error.message);
    return Promise.reject(error);
  }
);

export default apiInstance;
