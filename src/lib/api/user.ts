import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { getCookie, removeCookie, setCookie } from "../../utils/cookies";

const user = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
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

  async function (error) {
    const nav = useNavigate()
    const originalConfig = error.config;
    try {
      const refreshToken = getCookie("refreshToken");
      const expire = getCookie("expire");

      const data = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/users/refresh-token`,
        null,
        {
          headers: {
            "Refresh-Token": `${refreshToken}`,
            "Access-Token-Expire-Time": `${expire}`,
          },
        }
      );

      const newInfo = data.headers["authorization"];
      const newToken = newInfo.split(" ")[1];
      removeCookie("token", { path: "/" });
      setCookie("token", newToken, { path: "/", maxAge: 1740 });

      return user.request(originalConfig);
    } catch (error) {
      // 이부분 이후 수정 예정
      // removeCookie("refreshToken", { path: "/" });
      // removeCookie("token", { path: "/" });
      // removeCookie("expire", { path: "/" });
      alert("다시 로그인해주세요!");
      nav('/')
    }

    return Promise.reject(error);
  }
);

export default user;
