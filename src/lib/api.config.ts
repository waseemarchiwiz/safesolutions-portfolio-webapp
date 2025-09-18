import axios from "axios";

export const baseURL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;

// instance
export const apiClient = axios.create({
  baseURL: baseURL + "/api" || baseURL + "/api",
  withCredentials: true,
});

// add api token in every request
apiClient.interceptors.request.use((config) => {
  const access_token =
    process.env.NEXT_PUBLIC_API_TOKEN || process.env.API_TOKEN;
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
    config.headers.set("api_token", access_token);
    // user_access_token For admin
  }
  return config;
});

// send the response data to the client
apiClient.interceptors.response.use((response) => {
  return response.data;
});
