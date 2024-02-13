import axios from "axios";
import { getToken } from "../auth/auth";

export const chatflech = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});
