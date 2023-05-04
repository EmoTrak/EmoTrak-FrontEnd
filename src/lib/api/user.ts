import { getCookie } from "../../utils/cookies";
import { error } from "../../utils/error";
import axios, { InternalAxiosRequestConfig } from "axios";

const user = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true,
});

user.interceptors.request.use(
  function (config: InternalAxiosRequestConfig) {
    const token = getCookie("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

user.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    error(error);
    return Promise.reject(error);
  }
);

export default user;
