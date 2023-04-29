import axios from "axios";
import { getCookie } from "../../utils/cookies";
import { useError } from "../../hooks/useError";

const user = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

user.interceptors.request.use(
  function (config) {
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
    useError(error);
    return Promise.reject(error);
  }
);

export default user;
