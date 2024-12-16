import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
console.log(apiUrl, "ksdjfskjd");

const apiInstance = axios.create({
  baseURL: apiUrl,
  timeout: 4000,
  headers: {
    // "Content-Type": "application/    json",
  },
});

export default apiInstance;
