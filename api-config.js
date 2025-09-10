import axios from "axios";

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_USER_URL,
  headers: {
    "Content-Type": "application/json",
    api_token: import.meta.env.VITE_API_TOKEN,
  },
});

export default apiInstance;
