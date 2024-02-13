import axios from "axios";
export const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});
export const apiFr = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});
export const apiMultForm = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "multipart/form/data",
  },
});

apiMultForm.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default function userAuthicate() {
  if (localStorage.getItem("token")) {
    return true;
  }
  return false;
}

export function getToken() {
  return localStorage.getItem("token");
}
export async function createHeadr() {
  const token = getToken();
  const payloadHeader = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return payloadHeader;
}
