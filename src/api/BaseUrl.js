import axios from "axios";

export const ProxyUrl = axios.create({
  baseURL: "/api/proxy", // Proxy endpoint Next.js
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
