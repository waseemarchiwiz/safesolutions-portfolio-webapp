import axios from "axios";

const user_token = localStorage.getItem("token");
const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    api_token: import.meta.env.VITE_API_TOKEN,
  },
});

export default apiInstance;
