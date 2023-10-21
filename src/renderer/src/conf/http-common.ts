import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.RENDERER_VITE_API_URL ?? "http://localhost:4000",
  headers: {
    "Content-type": "application/json",
  },
});

http.interceptors.response.use(
  undefined,
  (error) => {
    return Promise.reject(error.response.data);
  },
  {
    synchronous: true, // optimise interceptor handling
  },
);

export default http;
