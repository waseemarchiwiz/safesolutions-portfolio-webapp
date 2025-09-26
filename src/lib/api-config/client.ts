// import axios from "axios";

// export const baseURL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;

// // instance
// export const apiClient = axios.create({
//   baseURL: baseURL + "/api" || baseURL + "/api",
//   withCredentials: true,
// });

// // add api token in every request
// apiClient.interceptors.request.use((config) => {
//   const access_token =
//     process.env.NEXT_PUBLIC_API_TOKEN || process.env.API_TOKEN;
//   if (access_token) {
//     config.headers.Authorization = `Bearer ${access_token}`;
//     config.headers.set("api_token", access_token);
//     // user_access_token For admin
//   }
//   return config;
// });

// // send the response data to the client
// apiClient.interceptors.response.use((response) => {
//   return response.data;
// });

import axios, { AxiosInstance } from "axios";

export const baseURL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;

// Create axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseURL + "/api",
  withCredentials: true,
});

// Add api token in every request
axiosInstance.interceptors.request.use((config) => {
  const access_token =
    process.env.NEXT_PUBLIC_API_TOKEN || process.env.API_TOKEN;
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
    (config.headers as any).api_token = access_token;
  }
  return config;
});

// 🔥 Make interceptor return *only response.data*
// and type it properly so TS knows apiClient.get<T>() returns T
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

// Export a typed client
export const apiClient = axiosInstance as Omit<
  AxiosInstance,
  "get" | "post" | "put" | "delete"
> & {
  get<T = any>(url: string, config?: any): Promise<T>;
  post<T = any>(url: string, data?: any, config?: any): Promise<T>;
  put<T = any>(url: string, data?: any, config?: any): Promise<T>;
  delete<T = any>(url: string, config?: any): Promise<T>;
};

// For server
export async function axiosServer(cookieHeader: string) {
  return axios.create({
    baseURL: process.env.API_URL + "/api",
    headers: {
      Cookie: cookieHeader, // 👈 now backend sees req.cookies.access_token
      api_token: process.env.API_TOKEN,
    },
    withCredentials: true,
  });
}
