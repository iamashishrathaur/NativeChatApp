import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://heavy-worlds-itch.loca.lt/api",
  withCredentials: true,
});
