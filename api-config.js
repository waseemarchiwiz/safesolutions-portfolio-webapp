import axios from "axios";

const apiInstance = axios.create({
    // baseURL: "http://localhost:3000/api",
    baseURL: 'https://dummyjson.com/',
    timeout: 4000,
    headers: {
        "Content-Type": "application/json"
    }
})

export default apiInstance;