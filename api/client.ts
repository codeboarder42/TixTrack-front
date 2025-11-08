import axios, { AxiosRequestConfig } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Add interceptors for auth, errors, etc.
// axiosInstance.interceptors.request.use((config) => {
//   // Example: add auth token
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// Custom instance used by Orval
export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  return axiosInstance.request<T>(config).then(({ data }) => data);
};
